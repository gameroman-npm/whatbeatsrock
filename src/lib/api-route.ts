export type Params = Record<
  string,
  string | number | boolean | null | undefined
>;

const API_URL = "https://www.whatbeatsrock.com/api";

function buildUrl(path: string, params?: Params): URL {
  const url = new URL(`${API_URL}${path}`);

  if (params) {
    for (const [key, value] of Object.entries(params)) {
      if (value !== null && value !== undefined) {
        url.searchParams.append(key, String(value));
      }
    }
  }

  return url;
}

type HTTPMethod = "GET" | "POST" | "PUT" | "DELETE";

interface RouteConfig<
  TMethod extends HTTPMethod,
  TPathObj extends Record<string, unknown> = {},
> {
  path: string | ((args: TPathObj) => string);
  method: TMethod;
}

type HasRequiredKeys<T> = [T] extends [never]
  ? false
  : [T] extends [undefined]
    ? false
    : {} extends T
      ? false
      : true;

export type Payload = Record<string, unknown>;

export type RequestOptionsBase<
  TParams extends Params = Params,
  TPayload extends Payload = Payload,
> = (HasRequiredKeys<TParams> extends true
  ? { params: TParams }
  : { params?: TParams }) &
  (HasRequiredKeys<TPayload> extends true
    ? { payload: TPayload }
    : { payload?: TPayload });

export type RequestOptions<
  TParams extends Params = Params,
  TPayload extends Payload = Payload,
  TPathObj extends Record<string, unknown> = {},
> = RequestOptionsBase<TParams, TPayload> & TPathObj;

type IsOptionsRequired<
  TParams extends Params,
  TPayload extends Payload,
  TPathObj extends Record<string, unknown>,
> =
  HasRequiredKeys<TPathObj> extends true
    ? true
    : HasRequiredKeys<TParams> extends true
      ? true
      : HasRequiredKeys<TPayload> extends true
        ? true
        : false;

type ExtractSuccess<T> = T extends { error: unknown } ? never : T;
type ExtractError<T> = T extends { error: unknown } ? T : never;

export type ApiSuccess<T> = {
  ok: true;
  status: number;
  data: ExtractSuccess<T>;
};

export type ApiError<T> = {
  ok: false;
  status: number;
  data: ExtractError<T>;
};

export type ApiResponse<T> = [ExtractError<T>] extends [never]
  ? ApiSuccess<T> | { ok: never; status: never; data: never }
  : ApiSuccess<T> | ApiError<T>;

export type ApiRoute<
  TResponse,
  TParams extends Params = Params,
  TPayload extends Payload = Payload,
  TPathObj extends Record<string, unknown> = {},
> =
  IsOptionsRequired<TParams, TPayload, TPathObj> extends true
    ? (
        options: RequestOptions<TParams, TPayload, TPathObj>,
      ) => Promise<ApiResponse<TResponse>>
    : (
        options?: RequestOptions<TParams, TPayload, TPathObj>,
      ) => Promise<ApiResponse<TResponse>>;

export function defineApiRoute<
  TResponse,
  TParams extends Params = Params,
  TPayload extends Payload = Payload,
  TPathObj extends Record<string, unknown> = {},
  TMethod extends HTTPMethod = HTTPMethod,
>(
  config: RouteConfig<TMethod, TPathObj>,
): ApiRoute<TResponse, TParams, TPayload, TPathObj> {
  // oxlint-disable-next-line no-explicit-any
  return async (options?: any): Promise<ApiResponse<TResponse>> => {
    const opts = options ?? {};
    const resolvedPath =
      typeof config.path === "function" ? config.path(opts) : config.path;

    const url = buildUrl(resolvedPath, opts.params);
    const isGet = config.method === "GET";

    const response = await fetch(url, {
      method: config.method,
      headers: isGet ? undefined : { "Content-Type": "application/json" },
      body: isGet ? undefined : JSON.stringify(opts.payload ?? {}),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return {
        ok: false,
        status: response.status,
        data: errorData,
      } as ApiResponse<TResponse>;
    }

    const data = await response.json();
    return { ok: true, status: response.status, data: data };
  };
}

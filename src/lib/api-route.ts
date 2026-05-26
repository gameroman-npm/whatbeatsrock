export type Params = Record<
  string,
  string | number | boolean | null | undefined
>;

const API_URL = "https://www.whatbeatsrock.coma/api";

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

interface RouteConfig<
  TMethod extends "GET" | "POST",
  TPathObj extends Record<string, unknown> = {},
> {
  path: string | ((args: TPathObj) => string);
  method: TMethod;
}

export type Payload = Record<string, unknown>;

export interface RequestOptionsBase<
  TParams extends Params = Params,
  TPayload extends Payload = Payload,
> {
  params?: TParams;
  payload?: TPayload;
}

export type RequestOptions<
  TParams extends Params = Params,
  TPayload extends Payload = Payload,
  TPathObj extends Record<string, unknown> = {},
> = RequestOptionsBase<TParams, TPayload> & TPathObj;

type ResponseData<TResponse> = { data: TResponse };

type HasRequiredKeys<T> = {} extends T ? false : true;

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

export type ApiRoute<
  TResponse,
  TParams extends Params = Params,
  TPayload extends Payload = Payload,
  TPathObj extends Record<string, unknown> = {},
> =
  IsOptionsRequired<TParams, TPayload, TPathObj> extends true
    ? (
        options: RequestOptions<TParams, TPayload, TPathObj>,
      ) => Promise<ResponseData<TResponse>>
    : (
        options?: RequestOptions<TParams, TPayload, TPathObj>,
      ) => Promise<ResponseData<TResponse>>;

export function defineApiRoute<
  TResponse,
  TParams extends Params = Params,
  TPayload extends Payload = Payload,
  TPathObj extends Record<string, unknown> = {},
  TMethod extends "GET" | "POST" = "GET" | "POST",
>(
  config: RouteConfig<TMethod, TPathObj>,
): ApiRoute<TResponse, TParams, TPayload, TPathObj> {
  // oxlint-disable-next-line no-explicit-any
  return async (options?: any): Promise<ResponseData<TResponse>> => {
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
      throw new Error(`HTTP ${response.status} - ${response.statusText}`);
    }

    return response.json() as Promise<ResponseData<TResponse>>;
  };
}

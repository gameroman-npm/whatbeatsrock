import {
  defineApiRoute,
  type ApiRoute,
  type Params,
  type Payload,
} from "#lib/api-route";
import type { StringUserHandle, StringUUID } from "#types/shared";

import type { CustomGameAttributeData } from "./custom";

interface UserInfoData {
  id: StringUUID;
  handle: StringUserHandle;
  avatar_url: string;
}

interface UserProfileData extends UserInfoData {
  nux_step: number;
}

export const getUserProfile: ApiRoute<
  UserProfileData,
  Params,
  Payload,
  { userId: string }
> = defineApiRoute<UserProfileData, Params, Payload, { userId: string }>({
  path: ({ userId }) => `/users/${userId}/profile`,
  method: "GET",
});

export const getUserInfo: ApiRoute<UserInfoData, { handle: string }, Payload> =
  defineApiRoute<UserInfoData, { handle: string }, Payload>({
    path: "/users",
    method: "GET",
  });

interface UserCustomGame {
  id: StringUserHandle;
  attribute_data: CustomGameAttributeData;
  execution_count: number;
  denormalized_vote_count: number;
  vote: { is_upvote: true }[];
}

export const getUserCustomGame: ApiRoute<
  UserCustomGame,
  Params,
  Payload,
  { userId: string }
> = defineApiRoute<UserCustomGame, Params, Payload, { userId: string }>({
  path: ({ userId }) => `/users/${userId}/custom`,
  method: "GET",
});

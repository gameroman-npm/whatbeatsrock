import { defineApiRoute, type ApiRoute } from "#lib/api-route";
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
  never,
  never,
  { userId: string }
> = defineApiRoute<UserProfileData, never, never, { userId: string }>({
  path: ({ userId }) => `/users/${userId}/profile`,
  method: "GET",
});

export const getUserInfo: ApiRoute<UserInfoData, { handle: string }> =
  defineApiRoute<UserInfoData, { handle: string }>({
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
  never,
  never,
  { userId: string }
> = defineApiRoute<UserCustomGame, never, never, { userId: string }>({
  path: ({ userId }) => `/users/${userId}/custom`,
  method: "GET",
});

import { defineApiRoute, type ApiRoute } from "#lib/api-route";
import type { StringEmoji, StringUUID, SuccessResponse } from "#types/shared";

interface MyCustomGamePrivateAttributeData {
  prev1: string;
  prev2: string;
  prev3: string;
  wins1: boolean;
  wins2: boolean;
  wins3: boolean;
  guess1: string;
  guess2: string;
  guess3: string;
  reason1: string;
  reason2: string;
  reason3: string;
  character: string;
  punishReward: string;
  additionalRules: string;
  adjectiveCommentary: string;
  adjectiveExplanation: string;
}

interface MyCustomGameAttributeData extends MyCustomGamePrivateAttributeData {
  title: string;
  startWord: string;
  startEmoji: StringEmoji;
  judgingCriteria: string;
  judgingCriteriaLoss: string;
}

interface MyCustomGameData {
  attribute_data: MyCustomGameAttributeData;
  private_attribute_data: MyCustomGamePrivateAttributeData;
  execution_count: number;
}

export const getMyCustomGame: ApiRoute<MyCustomGameData> =
  defineApiRoute<MyCustomGameData>({ path: "/me/custom", method: "GET" });

type MyCustomGamePayload = Omit<
  MyCustomGameAttributeData & { gameTitle: string },
  "title"
>;

export const saveMyCustomGame: ApiRoute<
  SuccessResponse,
  never,
  MyCustomGamePayload
> = defineApiRoute<SuccessResponse, never, MyCustomGamePayload>({
  path: "/me/custom",
  method: "POST",
});

type LikeCustomGamePayload = {
  fid: StringUUID;
  is_upvote: true;
};

export const likeCustomGame: ApiRoute<
  SuccessResponse,
  never,
  LikeCustomGamePayload
> = defineApiRoute<SuccessResponse, never, LikeCustomGamePayload>({
  path: "/me/custom/like",
  method: "PUT",
});

type UnikeCustomGamePayload = {
  fid: StringUUID;
};

export const unlikeCustomGame: ApiRoute<
  SuccessResponse,
  never,
  UnikeCustomGamePayload
> = defineApiRoute<SuccessResponse, never, UnikeCustomGamePayload>({
  path: "/me/custom/like",
  method: "DELETE",
});

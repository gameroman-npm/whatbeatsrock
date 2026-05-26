import { defineApiRoute, type ApiRoute } from "#lib/api-route";
import type {
  StringEmoji,
  StringTimestamp,
  StringUserHandle,
  StringUUID,
} from "#types/shared";

export interface CustomGameAttributeData {
  title: string;
  startWord: string;
  startEmoji: StringEmoji;
  judgingCriteria: string;
  judgingCriteriaLoss: string;
}

interface CustomGameData {
  id: StringUUID;
  execution_count: number;
  updated_at: StringTimestamp;
  attribute_data: CustomGameAttributeData;
  user_handle: StringUserHandle;
  denormalized_vote_count: number;
}

export const getCustomGames: ApiRoute<CustomGameData[], { sort?: "PLAYS" }> =
  defineApiRoute<CustomGameData[], { sort?: "PLAYS" }>({
    path: "/custom",
    method: "GET",
  });

import {
  defineApiRoute,
  type ApiRoute,
  type Params,
  type Payload,
} from "#lib/api-route";
import type { StringUserHandle, StringUserInitials } from "#types/shared";

interface LeaderboarScoreData {
  score_numeric: number;
  arcade_initials: StringUserHandle | StringUserInitials;
  score_text: string;
  user: null | { handle: StringUserHandle };
}

export const getLeaderboardScores: ApiRoute<
  LeaderboarScoreData[],
  { all?: true }
> = defineApiRoute<LeaderboarScoreData[], { all?: true }>({
  path: "/scores",
  method: "GET",
});

interface UserScore {
  score_numeric: number;
  score_text: string;
}

export const getUserScores: ApiRoute<
  UserScore,
  Params,
  Payload,
  { userId: string }
> = defineApiRoute<UserScore, Params, Payload, { userId: string }>({
  path: ({ userId }) => `/trophies/${userId}`,
  method: "GET",
});

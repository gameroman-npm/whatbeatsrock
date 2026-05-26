import { defineApiRoute, type ApiRoute } from "#lib/api-route";
import type {
  StringUserHandle,
  StringUserInitials,
  StringUUID,
  SuccessResponse,
} from "#types/shared";

interface LeaderboarScoreData extends UserScore {
  arcade_initials: StringUserHandle | StringUserInitials;
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
  never,
  never,
  { userId: string }
> = defineApiRoute<UserScore, never, never, { userId: string }>({
  path: ({ userId }) => `/scores/${userId}`,
  method: "GET",
});

type SaveScorePayload = {
  score: number;
  text: string;
  gid: StringUUID;
};

interface SaveScoreError {
  error: "where what?";
}

type SaveScoreResponse = SuccessResponse | SaveScoreError;

export const saveScore: ApiRoute<SaveScoreResponse, never, SaveScorePayload> =
  defineApiRoute<SaveScoreResponse, never, SaveScorePayload>({
    path: "/scores",
    method: "POST",
  });

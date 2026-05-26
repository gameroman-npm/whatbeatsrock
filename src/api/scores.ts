import { defineApiRoute, type ApiRoute } from "#lib/api-route";
import type {
  StringUserHandle,
  StringUserInitials,
  StringUUID,
} from "#types/shared";

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

export const saveScore: ApiRoute<{ success: true }, never, SaveScorePayload> =
  defineApiRoute<{ success: true }, never, SaveScorePayload>({
    path: "/scores",
    method: "POST",
  });

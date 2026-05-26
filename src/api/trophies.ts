import { defineApiRoute, type ApiRoute } from "#lib/api-route";
import type { StringEmoji } from "#types/shared";

interface UserGuess {
  text: string;
  emoji: StringEmoji | null;
}

interface UserTrophy {
  prev: UserGuess;
  guess: UserGuess;
}

export const getUserTrophies: ApiRoute<
  UserTrophy[],
  never,
  never,
  { userId: string }
> = defineApiRoute<UserTrophy[], never, never, { userId: string }>({
  path: ({ userId }) => `/trophies/${userId}`,
  method: "GET",
});

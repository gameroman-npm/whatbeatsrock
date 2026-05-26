import {
  defineApiRoute,
  type ApiRoute,
  type Params,
  type Payload,
} from "#lib/api-route";
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
  Params,
  Payload,
  { userId: string }
> = defineApiRoute<UserTrophy[], Params, Payload, { userId: string }>({
  path: ({ userId }) => `/trophies/${userId}`,
  method: "GET",
});

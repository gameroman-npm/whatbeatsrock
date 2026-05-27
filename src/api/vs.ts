import { defineApiRoute, type ApiRoute } from "#lib/api-route";
import type { StringEmoji, StringUUID } from "#types/shared";

interface FightCached {
  guess_wins: boolean;
  guess_emoji: StringEmoji;
  reason: string;
  cached: true;
  cache_count: number;
}

interface FightUncached {
  guess_wins: boolean;
  guess_emoji: StringEmoji;
  reason: string;
  cached: false;
  cache_count: null;
}

interface FightBadGuessError {
  error: "negative aura";
  status: 422;
}

interface FightRatelimitError {
  error: "RATE_LIMIT_EXCEEDED";
  status: 418;
}

interface FightRepeatedAnswerError {
  error: "give (hint: you already used this answer)";
  status: 400;
}

type FightError =
  | FightBadGuessError
  | FightRatelimitError
  | FightRepeatedAnswerError;

export type FightResult = FightCached | FightUncached;
type FightResponseData = FightResult | FightError;

type FightPayloadCustom = { prev: string; guess: string; oid: StringUUID };
type FightPayloadDefault = { prev: string; guess: string; gid: StringUUID };
type FightPayload = FightPayloadCustom | FightPayloadDefault;

export const submitGuess: ApiRoute<FightResponseData, never, FightPayload> =
  defineApiRoute<FightResponseData, never, FightPayload>({
    path: "/vs",
    method: "POST",
  });

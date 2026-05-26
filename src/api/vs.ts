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

type FightErrorMessage = "negative aura" | "RATE_LIMIT_EXCEEDED";

interface FightError {
  error: FightErrorMessage;
}

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

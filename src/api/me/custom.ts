import { defineApiRoute, type ApiRoute } from "#lib/api-route";
import type { StringEmoji } from "#types/shared";

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

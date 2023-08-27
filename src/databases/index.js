import { createRealmContext } from "@realm/react";

import { AreaSchema } from "./schemas/AreaSchema";
import { PhraseSchema } from "./schemas/PhraseSchema";

export const { RealmProvider, useRealm, useQuery, useObject } =
  createRealmContext({
    schema: [AreaSchema, PhraseSchema],
  });

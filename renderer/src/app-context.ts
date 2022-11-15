import { createContext, SetStateAction } from "react";
import { Dispatch } from "react";
import { AdventureType, LevelType } from "./types";
import { HedyResponse } from "./types";
export const LANGUAGES = ["en", "nl", "fr", "de"] as const;

const AppContext = createContext<{
  lang: typeof LANGUAGES[number];
  setLang?: Dispatch<SetStateAction<typeof LANGUAGES[number]>>;
  setAdventureId?: Dispatch<SetStateAction<string>>;
  setLevelId?: Dispatch<SetStateAction<string>>;
  setHedy?: Dispatch<SetStateAction<string>>;
  hedy?: string;
  levelId: string;
  languages: typeof LANGUAGES;
  adventures: {
    [key: string]: AdventureType;
  };
  adventure: AdventureType;
  level: LevelType;
}>({
  lang: null,
  languages: LANGUAGES,
  adventures: null,
  level: null,
  adventure: null,
  hedy: null,
  levelId: null,
});

export default AppContext;

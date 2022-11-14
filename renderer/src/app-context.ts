import { createContext, SetStateAction } from "react";
import { Dispatch } from "react";
import { AdventureType, LevelType } from "./types";
import { MutableRefObject } from "react";

export const LANGUAGES = ["en", "nl", "fr", "de"] as const;

const AppContext = createContext<{
  lang: typeof LANGUAGES[number];
  setLang?: Dispatch<SetStateAction<typeof LANGUAGES[number]>>;
  setAdventureId?: Dispatch<SetStateAction<string>>;
  setLevelId?: Dispatch<SetStateAction<string>>;
  code: MutableRefObject<string>;
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
  code: null,
  levelId: null,
});

export default AppContext;

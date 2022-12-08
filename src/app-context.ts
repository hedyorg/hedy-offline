import { createContext, SetStateAction, Dispatch } from "react";
export const LANGUAGES = ["en", "nl"] as const;

const AppContext = createContext<{
  lang: typeof LANGUAGES[number];
  setHedy: Dispatch<SetStateAction<string>>;
  hedy: string;
  levelId: string;
  adventure: AdventureType;
  adventureId: string;
  level: LevelType;
}>(null);

export default AppContext;

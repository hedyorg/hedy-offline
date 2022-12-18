import { createContext, SetStateAction, Dispatch } from "react";

const EditorContext = createContext<{
  setHedy: Dispatch<SetStateAction<string>>;
  hedy: string;
  levelId: string;
  adventure: AdventureType;
  adventureId: string;
  level: LevelType;
  lang: string;
  languages: string[];
}>(null);

export default EditorContext;

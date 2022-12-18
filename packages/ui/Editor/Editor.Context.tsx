import { createContext, SetStateAction, Dispatch } from "react";

const EditorContext = createContext<{
  setHedy: Dispatch<SetStateAction<string>>;
  setLang: (lang: string) => void;
  hedy: string;
  levelId: string;
  adventure: AdventureType;
  adventureId: string;
  level: LevelType;
  lang: string;
  languages: string[];
  port: string;
  useOnline: boolean;
  skulpt: any;
} | null>(null);

export default EditorContext;

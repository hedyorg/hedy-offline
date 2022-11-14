import Header from "../../components/header/header";
import InfoPanel from "../../components/info-panel/InfoPanel";
import CodePanel from "../../components/code-panel/code-panel";
import { useRef, useState } from "react";
import AppContext, { LANGUAGES } from "../../app-context";
import { Props } from "../../types";

const Editor: React.FC<Props> = (props) => {
  const [lang, setLang] = useState<typeof LANGUAGES[number]>("en");
  const [adventureId, setAdventureId] = useState<string>("default");
  const [levelId, setLevelId] = useState<string>("1");
  const code = useRef<string>("");
  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        code,
        adventure: props.languages[lang][adventureId],
        level: props.languages[lang][adventureId].levels[levelId],
        levelId,
        setAdventureId,
        setLevelId,
        adventures: props.languages[lang],
        languages: LANGUAGES,
      }}
    >
      <App />
    </AppContext.Provider>
  );
};

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="grid grid-cols-2 h-screen">
        <CodePanel />
        <InfoPanel />
      </div>
    </div>
  );
};

export default Editor;

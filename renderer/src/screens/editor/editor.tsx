import Header from "../../components/header/header";
import InfoPanel from "../../components/info-panel/InfoPanel";
import CodePanel from "../../components/code-panel/code-panel";
import { useRef, useState } from "react";
import AppContext, { LANGUAGES } from "../../app-context";
import { Props } from "../../types";
import useResize from "../../hooks/useResize";

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
  const buttonRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const resize = useResize(containerRef, buttonRef, true);

  console.log(resize);
  return (
    <div>
      <Header />
      <div ref={containerRef} className="flex h-screen">
        <div className="flex-1">
          <CodePanel />
        </div>
        <div style={{ width: resize.distribution ? `${100 - resize.distribution * 100}%` : "50%" }} className="relative">
          <div ref={buttonRef} className="h-full cursor-col-resize z-20 w-4 absolute left-0 top-0 -translate-x-1/2" />
          <InfoPanel />
        </div>
      </div>
    </div>
  );
};

export default Editor;

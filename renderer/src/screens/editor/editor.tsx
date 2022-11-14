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

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <div ref={containerRef} className="w-full flex-1 overflow-hidden">
        <div className="flex h-full">
          {/* EDITOR */}
          <div className="flex-1 h-full">
            <CodePanel />
          </div>

          {/* INFO PANEL */}
          <div style={{ width: resize.distribution ? `${100 - resize.distribution * 100}%` : "50%" }} className="relative h-full">
            <div ref={buttonRef} className="h-full z-50 cursor-col-resize w-12 absolute left-0 top-0 -translate-x-1/2 " />
            <div className="relative overflow-scroll h-full z-10 border-l border-neutral-100/40 min-h-full">
              <InfoPanel />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;

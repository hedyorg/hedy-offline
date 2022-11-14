import Header from "../../components/header/header";
import InfoPanel from "../../components/info-panel/InfoPanel";
import CodePanel from "../../components/code-panel/code-panel";
import { RefObject, useRef, useState } from "react";
import AppContext, { LANGUAGES } from "../../app-context";
import { Props } from "../../types";
import useResize from "../../hooks/useResize";
import { TbCheckupList, TbListCheck } from "react-icons/tb";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";

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
  const containerRef = useRef<HTMLDivElement>(null);

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
          <RightEditor containerRef={containerRef} />
        </div>
      </div>
    </div>
  );
};

const RightEditor: React.FC<{ containerRef: RefObject<HTMLDivElement> }> = (props) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const resize = useResize(props.containerRef, buttonRef, true);

  return (
    <div style={{ width: resize.distribution ? `${100 - resize.distribution * 100}%` : "50%" }} className="relative border-l border-neutral-100/40 h-full">
      <div ref={buttonRef} className="h-full z-50 cursor-col-resize w-12 absolute left-0 top-0 -translate-x-1/2 " />

      <Tab.Group>
        <Tab.List className={"flex gap-4 pt-6 pb-4  px-6 pr-12"}>
          <Tab as={Fragment}>
            {({ selected }) => (
              /* Use the `selected` state to conditionally style the selected tab. */
              <button className={`font-bold flex items-center gap-2 text-neutral-300 text-[18px] tracking-normal px-5 py-2 rounded-3xl ${selected ? "bg-[#E1EBFF]" : ""} `}>
                <TbCheckupList size={24} />
                Instructions
              </button>
            )}
          </Tab>

          <Tab as={Fragment}>
            {({ selected }) => (
              <button className={`font-bold flex items-center gap-2 text-neutral-300 text-[18px] tracking-normal px-5 py-2 rounded-3xl ${selected ? "bg-[#E1EBFF]" : ""} `}>
                <TbListCheck size={24} />
                Results
              </button>
            )}
          </Tab>
        </Tab.List>
        <Tab.Panels className="relative overflow-scroll h-full z-10 min-h-full">
          <Tab.Panel>
            <InfoPanel />
          </Tab.Panel>
          <Tab.Panel>Content 2</Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
};

export default Editor;

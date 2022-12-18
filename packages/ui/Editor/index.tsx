import { useContext, useEffect, useRef, useState } from "react";
import EditorContainer from "./Editor.Container";
import EditorContext from "./Editor.Context";
import Header from "./Editor.Header";
import EditorCode from "./Editor.Code";
import { FiZap } from "react-icons/fi";
import { TbListCheck, TbCheckupList } from "react-icons/tb";
import EditorInfo from "./Editor.Info";
import EditorResults from "./Editor.Results";

interface EditorProps {
  adventure: AdventureType;
  level: LevelType;
  setLang: (lang: string) => void;
  lang: string;
  levelId: string;
  adventureId: string;
  languages: string[];
  port: string;
  useOnline: boolean;
  skulpt: any;
  backButton: React.ReactNode;
}

const Editor: React.FC<EditorProps> = (props) => {
  const [hedy, setHedy] = useState<string>("");
  return (
    <EditorContext.Provider value={{ hedy, setHedy, ...props }}>
      <div className="w-full h-full flex flex-col">
        <Header backButton={props.backButton} />
        <EditorContainer left={<Left />} right={<Right />} />
      </div>
    </EditorContext.Provider>
  );
};

const Left = () => {
  const editorContext = useContext(EditorContext)!;
  const [code, setCode] = useState(editorContext.level?.start_code ?? "");
  const prevCode = useRef<string>("");

  return (
    <div className="w-full h-full relative">
      <EditorCode setCode={(code) => setCode(code)} code={code} />
      <button
        onClick={async () => {
          prevCode.current = code;
          editorContext.setHedy(code);
        }}
        disabled={code === prevCode.current}
        className={` px-6 group flex items-center gap-2 text-xl tracking-wide font-semibold py-2 absolute bottom-8 right-12 bg-white border disabled:border-neutral-100 disabled:text-neutral-100 border-neutral-300 rounded-lg`}
      >
        <FiZap className={`${code === prevCode.current ? "" : "group-hover:fill-[#E6D706] group-hover:text-[#E6D706]"} transition-all`} size={"24px"} />
        <span>Execute</span>
      </button>
    </div>
  );
};

const Right: React.FC = () => {
  const appContext = useContext(EditorContext)!;
  const [panel, setPanel] = useState<"info" | "results">("info");

  useEffect(() => {
    if (appContext.hedy) {
      setPanel("results");
    }
  }, [appContext.hedy]);

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className={"flex gap-4 pt-6  px-6 pr-12"}>
        <button onClick={() => setPanel("info")} className={`font-bold flex items-center gap-2 text-neutral-300 text-[18px] tracking-normal px-5 py-2 rounded-3xl ${panel === "info" ? "bg-[#E1EBFF]" : ""} `}>
          <TbCheckupList size={24} />
          Instructions
        </button>

        <button onClick={() => setPanel("results")} className={`font-bold flex items-center gap-2 text-neutral-300 text-[18px] tracking-normal px-5 py-2 rounded-3xl ${panel === "results" ? "bg-[#E1EBFF]" : ""} `}>
          <TbListCheck size={24} />
          Results
        </button>
      </div>

      {/* CONTENT */}
      <div className="relative h-full ">
        <div className={panel != "info" ? "hidden" : ""}>
          <EditorInfo />
        </div>
        <div className={panel != "results" ? "hidden" : "h-full"}>
          <EditorResults />
        </div>
      </div>
    </div>
  );
};

export default Editor;

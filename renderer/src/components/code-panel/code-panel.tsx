import { useContext, useEffect, useState } from "react";
import AppContext from "../../app-context";
import { FiZap } from "react-icons/fi";
import dynamic from "next/dynamic";
import { fetchHedy } from "../../helpers/fetchHedy";
import getSkulpt from "../../helpers/getSkulpt";
import { runPython } from "../../helpers/runPython";
const CodeEditor = dynamic(() => import("../code-editor/code-editor"), { ssr: false });

interface CodePanelType {}

const CodePanel: React.FC<CodePanelType> = (props) => {
  const appContext = useContext(AppContext);
  const [code, setCode] = useState(appContext.level.start_code);

  return (
    <div className="w-full h-full relative">
      <CodeEditor setCode={(code) => setCode(code)} code={code} />

      <button
        onClick={async () => {
          appContext.setHedy(code);
        }}
        className="px-6 group flex items-center gap-2 text-xl tracking-wide font-semibold py-2 absolute bottom-8 right-12 bg-white border border-neutral-300 rounded-lg"
      >
        <FiZap className="group-hover:fill-[#E6D706] group-hover:text-[#E6D706] transition-all" size={"24px"} />
        <span>Execute</span>
      </button>
    </div>
  );
};

export default CodePanel;

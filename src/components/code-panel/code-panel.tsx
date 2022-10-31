import { useContext, useEffect, useState } from "react";
import AppContext from "../../app-context";

interface CodePanelType {}

const CodePanel: React.FC<CodePanelType> = (props) => {
  const appContext = useContext(AppContext);
  const [code, setCode] = useState(appContext.level.start_code);

  useEffect(() => {
    appContext.code.current = code;
  }, [code]);

  return (
    <div className="w-full h-full relative">
      <textarea
        className="p-4 w-full"
        onChange={(value) => setCode(value.target.value)}
        value={code}
      />

      <button
        onClick={() => {
          alert(appContext.code.current);
        }}
        className="px-2 absolute bottom-12 right-4 py-1 bg-gray-200"
      >
        Run Code
      </button>
    </div>
  );
};

export default CodePanel;

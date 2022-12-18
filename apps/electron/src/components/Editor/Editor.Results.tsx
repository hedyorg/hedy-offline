import React, { createContext, MutableRefObject, useContext, useEffect, useRef, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { runPython } from "utils";
import EditorContext from "./Editor.Context";
import { ipcRenderer } from "electron";

const states = {
  unTouched: "unTouched",
  loading: "loading",
  running: "running",
  complete: "complete",
  error: "error",
} as const;

type State = typeof states[keyof typeof states];

const EditorResultsContext = createContext<{
  state: State;
  onInputSubmit?: MutableRefObject<(text: string) => void>;
  showInput: boolean;
  inputPromt: string;
  output: string;
  hasTurtle: boolean;
  errorMessage: string;
  errorLines: number[];
}>(null);

const EditorResults: React.FC = () => {
  const editorContext = useContext(EditorContext);

  const [output, setOutput] = useState<string>("");
  const [hasTurtle, setHasTurtle] = useState<boolean>(false);
  const [state, setState] = useState<State>("unTouched");
  const [showInput, setShowInput] = useState<boolean>(false);
  const [inputPromt, setInputPromt] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorLines, setErrorLines] = useState<number[]>([]);

  const onInputSubmit = useRef<(text: string) => void>();

  // FUNCTIONS
  const onError = (error: string, lines?: number[]) => {
    setErrorMessage(error);
    setErrorLines(lines);
    setState("error");
  };

  const onComplete = () => {
    setState("complete");
  };

  async function setInput(promt: string): Promise<string> {
    setState("running");
    setShowInput(true);

    const userInput = new Promise<string>((res) => {
      setInputPromt(promt);
      onInputSubmit.current = (text: string) => {
        setShowInput(false);
        res(text);
      };
    });

    const defaultInput = new Promise<string>((res) => {
      setTimeout(() => {
        res("Default Input");
      }, 20000);
    });

    const input = await Promise.race([userInput, defaultInput]);
    setShowInput(false);
    return input;
  }

  useEffect(() => {
    if (editorContext.hedy) {
      runCode();
    }
  }, [editorContext.hedy]);

  const runCode = async () => {
    const code = editorContext.hedy;
    const level = editorContext.levelId;
    const port = await ipcRenderer.invoke("getPort");

    setState("loading");

    // Wait 1.2 second to simulate loading
    await new Promise((res) => setTimeout(res, 300));
    setHasTurtle(false);
    setOutput("");
    setErrorMessage("");
    setErrorLines([]);
    await new Promise((res) => setTimeout(res, 300));

    runPython({
      sk: window.Sk,
      code,
      level,
      port,
      onSleep: () => setState("running"),
      setOutput: (output: string) => setOutput((prev) => prev + output),
      setInput: (promt: string) => setInput(promt),
      setHasTurtle: (hasTurtle: boolean) => {
        setState("running");
        setHasTurtle(hasTurtle);
      },
      onError,
      onComplete,
    });
  };

  // RENDER

  return (
    <EditorResultsContext.Provider
      value={{
        state,
        output,
        hasTurtle,
        onInputSubmit,
        inputPromt,
        showInput,
        errorMessage,
        errorLines,
      }}
    >
      <Content />
    </EditorResultsContext.Provider>
  );
};

const Content = () => {
  const editorResultsContext = useContext(EditorResultsContext);
  const loadingOrUntouched = ["loading", "unTouched"].includes(editorResultsContext.state);

  return (
    <div className="w-full h-full p-6 pt-2">
      <div className={`${loadingOrUntouched ? "block" : "hidden"}`}>
        <Loading />
      </div>

      <div className={`${loadingOrUntouched ? "hidden" : "block"} pb-6 flex flex-col gap-4`}>
        <Banner />
        {editorResultsContext.showInput && <UserInput />}

        {editorResultsContext.output && <Output />}

        <div className={`${editorResultsContext.hasTurtle ? "block" : "hidden"}`}>
          <Turtle />
        </div>
        {editorResultsContext.state === "error" && <Error />}
        <Code />
      </div>
    </div>
  );
};

export default EditorResults;

const Banner: React.FC = () => {
  const editorResultsContext = useContext(EditorResultsContext);
  const { state } = editorResultsContext;

  return (
    <div
      className={`w-full rounded-xl h-ful relative p-4 
      ${state == "complete" ? "bg-[#cefad0]" : ""} 
      ${state == "error" ? "bg-[#FDEAEA]" : ""} 
      ${state == "running" ? "bg-[#f7e3b7]" : ""}`}
    >
      <p className="w-full text-center text-neutral-300 ">
        {state == "complete" ? "Code ran successfully" : ""}
        {state == "error" ? "Code ran with errors" : ""}
        {state == "running" ? "Code is running" : ""}
      </p>
    </div>
  );
};

const Loading: React.FC = () => {
  const editorResultsContext = useContext(EditorResultsContext)!;

  return (
    <div className="flex gap-4 py-6  flex-col items-center justify-center w-full">
      <IoSettingsOutline className={`text-neutral-100 transition-all ${editorResultsContext.state === "loading" ? "animate-spin-slow text-neutral-300" : ""} `} size={40} />
      <p className="text-neutral-300 max-w-md font-extrabold text-xl">{editorResultsContext.state === "loading" ? "Running your code..." : "Run Execute to check your code"}</p>
      {editorResultsContext.state === "unTouched" && <p className="text-xl max-w-md text-neutral-100 text-center">We'll run your code and then show you the results here.</p>}
    </div>
  );
};

const Error = () => {
  const editorResultsContext = useContext(EditorResultsContext)!;

  return (
    <Container title="Error Message">
      <p>{editorResultsContext.errorMessage}</p>
    </Container>
  );
};

const Code = () => {
  const editorResultsContext = useContext(EditorResultsContext)!;
  const editorContext = useContext(EditorContext)!;

  return (
    <Container title="Hedy Code">
      <div className="relative">
        {editorContext.hedy.split("\n").map((line, i) => {
          const hasError = editorResultsContext.errorLines?.includes(i + 1);

          if (hasError) {
            return (
              <div key={i} className="relative">
                <div className="w-[104%] translate-x-[-2%] h-full absolute top-0 left-0 bg-[#FDEAEA] rounded-xl" />
                <p className="relative my-1 py-1">{line}</p>
              </div>
            );
          }
          return <p key={i}>{line}</p>;
        })}
      </div>
    </Container>
  );
};

const Output = () => {
  const editorResultsContext = useContext(EditorResultsContext)!;
  return (
    <Container title="Output">
      <pre className="font-mono">{editorResultsContext.output}</pre>
    </Container>
  );
};

const UserInput: React.FC = () => {
  const editorResultsContext = useContext(EditorResultsContext)!;

  return (
    <Container title="Input Promt">
      <input
        id="input"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            editorResultsContext?.onInputSubmit?.current(e.currentTarget.value);
          }
        }}
        className="font-mono bg-transparent outline-none placeholder:font-mono"
        placeholder="Write input here"
      />
    </Container>
  );
};

const Turtle: React.FC = () => {
  return (
    <Container title="Turtle Graphic">
      <div id="turtlecanvas" className="w-full h-[300px]">
        Turtle Graphic
      </div>
    </Container>
  );
};

const Container: React.FC<{ children: React.ReactNode; title: string }> = ({ children, title }) => {
  return (
    <div className="flex gap-2 flex-col">
      <p className="text-neutral-300 text-sm font-bold font-mono uppercase">{title}</p>
      <div className="bg-gray-100 w-full min-h-[100px] px-4 py-4 border rounded-xl">{children}</div>
    </div>
  );
};

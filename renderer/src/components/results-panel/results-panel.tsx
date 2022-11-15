import { useEffect, useContext, useState } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import AppContext from "../../app-context";
import { fetchHedy } from "../../helpers/fetchHedy";
import getSkulpt from "../../helpers/getSkulpt";

const ResultsPanel = () => {
  const appContext = useContext(AppContext);
  const [output, setOutput] = useState<string | undefined>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<"error" | "succes" | "waiting">("succes");
  const [errorLines, setErrorLines] = useState<number[]>([]);

  const run = async () => {
    const res = await fetchHedy(appContext.hedy, appContext.levelId);

    // TODO CHECK FOR ERRORS

    if (res.Error) {
      setStatus("error");
      setOutput(res.Error);
      setErrorLines(res.Location);
      return;
    }

    setStatus("succes");

    const Sk = getSkulpt();
    if (!Sk) return null;

    const outf = (text: string) => {
      setOutput((prev) => {
        prev = prev ? prev : "";
        return prev + text;
      });
    };

    Sk.configure({ output: outf });

    Sk.misceval.asyncToPromise(function () {
      return Sk.importMainWithBody("<stdin>", false, res.Code, true);
    });
  };

  useEffect(() => {
    setOutput(undefined);
    if (appContext.hedy) {
      setLoading(true);
      run();
    }
  }, [appContext.hedy]);

  useEffect(() => {
    if (loading == false) setLoading(false); // Weird bug fix
    if (output) {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [output]);

  return (
    <div className="w-full h-full relative px-6">
      {(!output || loading) && (
        <div className="flex gap-4 py-6  flex-col items-center justify-center w-full">
          <IoSettingsOutline className={`text-neutral-100 transition-all ${loading ? "animate-spin-slow text-neutral-300" : ""} `} size={40} />
          <p className="text-neutral-300 max-w-md font-extrabold text-xl">{loading ? "Running your code..." : "Run Execute to check your code"}</p>
          {!loading && <p className="text-xl max-w-md text-neutral-100 text-center">We'll run your code and then show you the results here.</p>}
        </div>
      )}

      {output && !loading && (
        <div className="py-2 flex flex-col  gap-4">
          <Banner status={status} />
          <Result errorLines={status === "error" ? errorLines : []} code={appContext.hedy} output={output} isError={false} />
        </div>
      )}
    </div>
  );
};

const Banner: React.FC<{
  status: "succes" | "error" | "waiting";
}> = ({ status }) => {
  return (
    <div className={`w-full rounded-xl h-ful relative p-4 ${status == "succes" ? "bg-[#cefad0]" : ""} ${status == "error" ? "bg-[#FDEAEA]" : ""} ${status == "waiting" ? "bg-[#cefad0]" : ""}`}>
      <p className="w-full text-center text-neutral-300 ">
        {status == "succes" ? "Your code ran succesfully!" : ""}
        {status == "error" ? "Your code failed to run!" : ""}
        {status == "waiting" ? "Waiting for your input..." : ""}
      </p>
    </div>
  );
};

interface ResultType {
  code: string;
  output: string;
  isError: boolean;
  errorLines?: number[];
}

const Result: React.FC<ResultType> = (props) => {
  return (
    <div className="p-4 rounded-xl flex gap-2 flex-col bg-gray-100">
      <p className="text-neutral-300 text-sm font-bold font-mono uppercase">Code Run</p>
      <Code>
        {props.code.split("\n").map((line, i) => {
          const hasError = props.errorLines?.includes(i + 1);

          if (hasError) {
            return (
              <div className="relative">
                <div className="w-[110%] -translate-x-[5%] h-full absolute top-0 left-0 bg-[#FDEAEA] rounded-xl"></div>

                <p className="relative my-1 py-1">{line}</p>
              </div>
            );
          }

          return <p>{line}</p>;
        })}
      </Code>
      <p className="text-neutral-300 mt-4 text-sm font-bold font-mono uppercase">{props.isError ? "Error" : "Output"}</p>
      <Code>{props.output}</Code>
    </div>
  );
};

const Code: React.FC<{ children: React.ReactNode }> = (props) => {
  return <pre className="font-mono rounded-lg bg-white p-8">{props.children}</pre>;
};

export default ResultsPanel;

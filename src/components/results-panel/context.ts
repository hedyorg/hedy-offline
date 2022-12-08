import { createContext, Dispatch, SetStateAction } from "react";

const ResultsContext = createContext<{
  output: string;
  setOutput: Dispatch<SetStateAction<string>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  status: "error" | "succes" | "pending";
  setStatus: Dispatch<SetStateAction<"error" | "succes" | "pending">>;
  errorLines: number[];
  setErrorLines: Dispatch<SetStateAction<number[]>>;
  showInput: boolean;
  setShowInput: Dispatch<SetStateAction<boolean>>;
  onSubmit: any;
  promt: any;
  hasTurtle: boolean;
  setHasTurtle: Dispatch<SetStateAction<boolean>>;
}>(null);

export default ResultsContext;

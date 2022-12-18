declare const fetchHedy: (code: string, level: string, port: string, isOnline: boolean) => Promise<HedyResponse>;

interface runPythonProps {
    sk: any;
    code: string;
    level: string;
    port: string;
    setOutput: (output: string) => void;
    setInput: (promt: string) => Promise<string>;
    setHasTurtle: (hasTurtle: boolean) => void;
    onError: (error: string, lines?: number[]) => void;
    onSleep: (time: number) => void;
    onComplete: () => void;
    isOnline: boolean;
}
declare const runPython: (props: runPythonProps) => Promise<void>;

export { fetchHedy, runPython };

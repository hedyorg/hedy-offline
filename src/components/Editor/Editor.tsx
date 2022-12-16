import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import EditorContext from "./Editor.Context";
import Header from "./Editor.Header";

interface EditorProps {
  adventure: AdventureType;
  level: LevelType;
  lang: string;
  levelId: string;
  adventureId: string;
  languages: string[];
}

const Editor: React.FC<EditorProps> = (props) => {
  const [hedy, setHedy] = useState<string>("");
  return (
    <EditorContext.Provider value={{ hedy, setHedy, ...props }}>
      <Header />
      <App />
    </EditorContext.Provider>
  );
};

export default Editor;

const App: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const r = useRef<HTMLElement>(null);
  const editorContext = useContext(EditorContext);

  const onMouseDown = () => {
    if (!r.current) return;
    r.current.style.setProperty("--text-selection", "none");
    setIsMouseDown(true);
  };

  const onMouseUp = () => {
    r.current.style.setProperty("--text-selection", "text");
    setIsMouseDown(false);
  };

  useEffect(() => {
    r.current = document.querySelector(":root");
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown && container.current) {
      animate(x, container.current.getBoundingClientRect().width - e.clientX);
    }
  };

  const x = useMotionValue(600);

  const width = useTransform(x, (value) => {
    if (x.get() < 300) {
      return 300;
    }

    if (container.current) {
      if (x.get() > container.current.getBoundingClientRect().width - 200) {
        return container.current.getBoundingClientRect().width - 200;
      }
    }

    return value;
  });

  useEffect(() => {
    if (x.get() < 600) {
      animate(x, 600, { ease: "easeOut" });
    }
  }, [editorContext.hedy]);

  return (
    <div onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp} className="h-screen flex flex-col overflow-hidden">
      <div ref={container} className="w-full flex-1 overflow-hidden">
        <div className="flex h-full">
          <div className="overflow-y-hidden flex-1">
            <div className="w-full h-full bg-blue" />
          </div>
          <div onMouseDown={onMouseDown} className={`h-full rounded-2xl transition-colors ${isMouseDown ? "bg-neutral-100" : ""} hover:bg-neutral-100 bg-gray-100 cursor-col-resize relative z-50 w-3`}>
            <div className={`absolute w-full h-full scale-x-[100] z-50 ${isMouseDown ? "block" : "hidden"}`} />
          </div>
          <motion.div id="right-panel" layout className="overflow-y-auto  relative" style={{ width }}>
            <div className="min-w-[600px] h-full">
              <div className="w-full h-full bg-[#123123]" />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

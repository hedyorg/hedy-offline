import { useContext } from "react";
import { FiChevronLeft } from "react-icons/fi";
import LanguagePicker from "../LanguagePicker";
import EditorContext from "./Editor.Context";

interface HeaderProps {
  backButton: React.ReactNode;
}

const Header: React.FC<HeaderProps> = (props) => {
  const editorContext = useContext(EditorContext)!;
  return (
    <header className="bg-white relative flex justify-between items-center border-b px-12 border-neutral-100 pt-6 pb-4">
      <div>{props.backButton}</div>

      <div className="absolute text-neutral-100 font-mono flex gap-4 left-1/2 -translate-x-1/2 ">
        <span>Level {editorContext.levelId}</span>
        <span>/</span>
        <span className="text-neutral-300">{editorContext.adventure.name}</span>
      </div>

      <div className="">
        <LanguagePicker
          setLang={(lang) => {
            editorContext.setLang(lang);
          }}
          languages={["en", "nl"]}
          lang={editorContext.lang}
        />
      </div>
    </header>
  );
};

export default Header;

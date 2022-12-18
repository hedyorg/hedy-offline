import { useContext } from "react";
import { FiChevronLeft } from "react-icons/fi";
import LanguagePicker from "../LanguagePicker";
import EditorContext from "./Editor.Context";
import Link from "next/link";
import { useRouter } from "next/router";

const Header: React.FC = () => {
  const editorContext = useContext(EditorContext);
  const router = useRouter();
  return (
    <header className="bg-white relative flex justify-between items-center border-b px-12 border-neutral-100 pt-6 pb-4">
      <div>
        <Link href={`/home`}>
          <button className="flex group hover:text-neutral-300 transition-colors text-neutral-100 font-mono items-center gap-4">
            <FiChevronLeft className="group-hover:-translate-x-2 transition-transform" size="24px" />
            Back to exercises
          </button>
        </Link>
      </div>

      <div className="absolute text-neutral-100 font-mono flex gap-4 left-1/2 -translate-x-1/2 ">
        <span>Level {editorContext.levelId}</span>
        <span>/</span>
        <span className="text-neutral-300">{editorContext.adventure.name}</span>
      </div>

      <div className="">
        <LanguagePicker
          setLang={(lang) => {
            router.push(`/level/${lang}/${editorContext.levelId}/${editorContext.adventureId}`);
          }}
          languages={["en", "nl"]}
          lang={editorContext.lang}
        />
      </div>
    </header>
  );
};

export default Header;

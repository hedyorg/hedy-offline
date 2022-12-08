import { useContext } from "react";
import AppContext from "../../app-context";
import { FiChevronLeft } from "react-icons/fi";
import LanguagePicker from "../language-picker/language-picker";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const appContext = useContext(AppContext);

  return (
    <header className="bg-white relative flex justify-between items-center border-b px-12 border-neutral-100 pt-6 pb-4">
      <div>
        <Link to={`/level-picker/${appContext.levelId}`}>
          <button className="flex group hover:text-neutral-300 transition-colors text-neutral-100 font-mono items-center gap-4">
            <FiChevronLeft className="group-hover:-translate-x-2 transition-transform" size="24px" />
            Back to exercises
          </button>
        </Link>
      </div>

      <div className="absolute text-neutral-100 font-mono flex gap-4 left-1/2 -translate-x-1/2 ">
        <span>Level {appContext.levelId}</span>
        <span>/</span>
        <span className="text-neutral-300">{appContext.adventure.name}</span>
      </div>

      <div className="">
        <LanguagePicker />
      </div>
    </header>
  );
};

export default Header;

import { useContext } from "react";
import AppContext, { LANGUAGES } from "../../app-context";

interface HeaderType {}

const Header: React.FC<HeaderType> = (props) => {
  const appContext = useContext(AppContext);
  return (
    <header>
      {LANGUAGES.map((l) => {
        return (
          <button className="px-12" onClick={() => appContext.setLang(l)}>
            {l}
          </button>
        );
      })}

      <div className="w-12"></div>

      {appContext.adventure.name}
    </header>
  );
};

export default Header;

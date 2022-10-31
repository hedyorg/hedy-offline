import { useContext } from "react";
import { AppContext } from "../../pages/_app";

interface HeaderType {}

const Header: React.FC<HeaderType> = (props) => {
  const appContext = useContext(AppContext);
  return (
    <header>
      <button
        onClick={() => {
          appContext.setLang("nl");
        }}
      >
        NL
      </button>
      <button
        onClick={() => {
          appContext.setLang("en");
        }}
      >
        EN
      </button>
    </header>
  );
};

export default Header;

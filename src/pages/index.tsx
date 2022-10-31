import { GetStaticProps } from "next";
import { useRef, useState } from "react";
import Header from "../components/header/header";
import { type AdventureType } from "../types";
import yaml from "js-yaml";
import AppContext, { LANGUAGES } from "../app-context";
import InfoPanel from "../components/info-panel/InfoPanel";
import CodePanel from "../components/code-panel/code-panel";

type Props = {
  languages: {
    en?: {
      [key: string]: AdventureType;
    };
    nl?: {
      [key: string]: AdventureType;
    };
  };
};

const App: React.FC<Props> = (props) => {
  const [lang, setLang] = useState<typeof LANGUAGES[number]>("en");
  const [adventureId, setAdventureId] = useState<string>("default");
  const [levelId, setLevelId] = useState<string>("1");
  const code = useRef<string>("");
  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        code,
        adventure: props.languages[lang][adventureId],
        level: props.languages[lang][adventureId].levels[levelId],
        setAdventureId,
        setLevelId,
        adventures: props.languages[lang],
        languages: LANGUAGES,
      }}
    >
      <div>
        <Header />
        <div className="grid grid-cols-2 h-screen">
          <CodePanel />
          <InfoPanel />
        </div>
      </div>
    </AppContext.Provider>
  );
};

export default App;

export const getStaticProps: GetStaticProps<Props> = async () => {
  let data: any = {
    languages: {},
  };

  for (let i = 0; i < LANGUAGES.length; i++) {
    const lang = LANGUAGES[i];
    const ldata = await fetch(
      `https://raw.githubusercontent.com/hedyorg/hedy/main/content/adventures/${lang}.yaml`
    ).then((response) => response.text());

    const { adventures } = await yaml.load(ldata);
    data.languages[lang] = adventures;
  }

  return {
    props: data,
  };
};

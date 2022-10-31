import { GetStaticProps } from "next";
import { useContext } from "react";
import Header from "../components/header/header";
import { type AdventureType } from "../types";
import { AppContext, LANGUAGES } from "./_app";
import yaml from "js-yaml";

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
  const appContent = useContext(AppContext);

  return (
    <div>
      <Header />
      {appContent.lang}
    </div>
  );
};

export default App;

export const getStaticProps: GetStaticProps<Props> = async () => {
  let data: Props = {
    languages: {
      en: undefined,
      nl: undefined,
    },
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

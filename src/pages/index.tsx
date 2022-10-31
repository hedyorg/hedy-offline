import { GetStaticProps } from "next";
const yaml = require("js-yaml");
import { type AdventureType } from "../types";

const LANGUAGES = ["en", "nl"];

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
  return (
    <div>
      {Object.keys(props.languages).map((lang) => {
        return Object.keys(props.languages[lang]).map((adventure) => {
          return Object.keys(props.languages[lang][adventure]).map((levels) => {
            return (
              <p>
                {lang} {adventure} {levels}
              </p>
            );
          });
        });
      })}
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

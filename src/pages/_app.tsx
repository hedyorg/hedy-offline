import type { AppProps } from "next/app";
import { createContext, Dispatch, SetStateAction, useState } from "react";
import "../styles/global.css";

export const LANGUAGES = ["en", "nl"] as const;

export const AppContext = createContext<{
  lang: typeof LANGUAGES[number];
  setLang?: Dispatch<SetStateAction<"en" | "nl">>;
  languages: typeof LANGUAGES;
}>({
  lang: "en",
  setLang: undefined,
  languages: LANGUAGES,
});

export default function MyApp({ Component, pageProps }: AppProps) {
  const [lang, setLang] = useState<typeof LANGUAGES[number]>("en");

  return (
    <AppContext.Provider
      value={{
        lang: lang,
        setLang: setLang,
        languages: LANGUAGES,
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}

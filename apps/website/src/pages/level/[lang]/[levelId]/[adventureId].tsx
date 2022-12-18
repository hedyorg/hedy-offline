/* eslint-disable @next/next/no-sync-scripts */
import Head from "next/head";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FiChevronLeft } from "react-icons/fi";
import getAdventures from "../../../../helpers/getAdventures";

const Editor = dynamic(() => import("ui/Editor").then((mod) => mod), { ssr: false });

interface AdventureProps {
  adventure: AdventureType;
  levelId: string;
  adventureId: string;
  level: LevelType;
  lang: string;
  languages: string[];
}

const Adventure: React.FC<AdventureProps> = (props) => {
  const [skulpt, setSkulpt] = useState<any>(null);
  const router = useRouter();

  const getSkulpt = async () => {
    while (true) {
      if (window.Sk) {
        setSkulpt(window.Sk);
        break;
      }
      await new Promise((r) => setTimeout(r, 10));
    }
  };

  const setLang = (lang: string) => {
    router.push(`/level/${lang}/${props.levelId}/${props.adventureId}`);
  };

  useEffect(() => {
    getSkulpt();
  }, []);

  return (
    <>
      <Head>
        <title>Hedy Offline</title>
        <link rel="icon" href="/images/icon/favicon.ico" />
        <script type="text/javascript" src="/skulpt.js"></script>
      </Head>

      <main className="h-screen w-screen">
        <Editor backButton={<BackButton lang={props.lang} level={props.levelId} adventure={props.adventureId} />} setLang={setLang} skulpt={skulpt} useOnline={true} port={"4444"} {...props} />
      </main>
    </>
  );
};

export default Adventure;

export const getStaticPaths = async () => {
  const adventures = getAdventures();
  const pairs: { params: { levelId: string; adventureId: string; lang: string } }[] = [];

  Object.entries(adventures).forEach(([lang, adventure]) => {
    Object.entries(adventure.adventures).forEach(([adventureId, adventure]) => {
      Object.entries(adventure.levels).forEach(([level, _]) => {
        pairs.push({ params: { levelId: level, adventureId, lang } });
      });
    });
  });

  return {
    paths: pairs,
    fallback: false,
  };
};

export const getStaticProps = async (context: any) => {
  const { levelId, adventureId, lang } = context.params;
  const adventures = getAdventures();
  const adventure = adventures[lang].adventures[adventureId];
  const level = adventure.levels[levelId];

  return {
    props: {
      levelId,
      adventureId,
      lang,
      adventure,
      level,
      languages: ["en", "nl"],
    },
  };
};

const BackButton: React.FC<{ level: string; lang: string; adventure: string }> = (props) => {
  return (
    <a href={`https://www.hedycode.com/hedy/${props.level}#${props.adventure}`}>
      <button className="flex group hover:text-neutral-300 transition-colors text-neutral-100 font-mono items-center gap-4">
        <FiChevronLeft className="group-hover:-translate-x-2 transition-transform" size="24px" />
        To Hedy Original
      </button>
    </a>
  );
};

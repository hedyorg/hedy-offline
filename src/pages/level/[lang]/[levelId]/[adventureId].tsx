import getAdventures from "../../../../helpers/getAdventures";

import dynamic from "next/dynamic";
import Head from "next/head";
import Script from "next/script";

const Editor = dynamic(() => import("../../../../components/Editor"), { ssr: false });

interface AdventureProps {
  adventure: AdventureType;
  levelId: string;
  adventureId: string;
  level: LevelType;
  lang: string;
  languages: string[];
}

const Adventure: React.FC<AdventureProps> = (props) => {
  return (
    <>
      <Head>
        <script type="text/javascript" src="/skulpt.js"></script>
      </Head>

      <main className="h-screen w-screen">
        <Editor {...props} />
      </main>
    </>
  );
};

export default Adventure;

export const getStaticPaths = async () => {
  const adventures = await getAdventures();
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

export const getStaticProps = async (context) => {
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

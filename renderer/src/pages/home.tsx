import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Props } from "../types";
import yaml from "js-yaml";
import { LANGUAGES } from "../app-context";
import Editor from "../screens/editor/editor";
import Loading from "../screens/loading/loading";
import { motion, AnimatePresence, delay } from "framer-motion";
import Head from "next/head";

const App: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const isConnected = async () => {
    var raw = JSON.stringify({
      code: "print hello world!",
      level: "1",
    });

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    try {
      const res = await fetch("http://localhost:4444/parse", {
        method: "POST",
        body: raw,
        redirect: "follow",
        headers: myHeaders,
      });
      return res.status === 200;
    } catch (error) {
      return false;
    }
  };

  const load = async () => {
    let reachable = await isConnected();
    while (!reachable) {
      reachable = await isConnected();
      await new Promise((r) => setTimeout(r, 1000));
    }
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Head>
        <script type="text/javascript" src="skulpt.js"></script>
        <script type="text/javascript" src="skulpt-stdlib.js"></script>
        <script type="text/javascript">window.Sk = Sk;</script>
      </Head>
      <main>
        <AnimatePresence>
          {loading && (
            <motion.div transition={{ duration: 0.5 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <Loading text={"Loading"} {...props} />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!loading && (
            <motion.div transition={{ delay: 0.5, duration: 0.5 }} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
              <Editor {...props} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default App;

export const getStaticProps: GetStaticProps<Props> = async () => {
  let data: any = {
    languages: {},
  };

  for (let i = 0; i < LANGUAGES.length; i++) {
    const lang = LANGUAGES[i];
    const ldata = await fetch(`https://raw.githubusercontent.com/hedyorg/hedy/main/content/adventures/${lang}.yaml`).then((response) => response.text());

    const { adventures } = await yaml.load(ldata);
    data.languages[lang] = adventures;
  }

  return {
    props: data,
  };
};

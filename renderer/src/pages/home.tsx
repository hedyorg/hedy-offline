import { GetStaticProps } from "next";
import { useEffect, useState } from "react";
import { Props } from "../types";
import yaml from "js-yaml";
import { LANGUAGES } from "../app-context";
import Editor from "../screens/editor/editor";
import Loading from "../screens/loading/loading";
import { ipcRenderer } from "electron";

const isPythonInstalled = async () => {
  return await ipcRenderer.invoke("has-python3");
};

const doesVenvFolderExist = async () => {
  return await ipcRenderer.invoke("has-venv");
};

const createVenv = async () => {
  return await ipcRenderer.invoke("create-venv");
};

const App: React.FC<Props> = (props) => {
  const [loading, setLoading] = useState<boolean>(true);

  const load = async () => {
    const exists = await doesVenvFolderExist();

    if (!exists) {
      console.log("Creating venv");
      const created = await createVenv();
      if (!created) {
        console.log("Failed to create venv");
      } else {
        console.log("Created venv");
      }
    } else {
      console.log("venv exists");
    }

    const hedy = ipcRenderer.invoke("run-hedy-server");

    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  if (loading) return <Loading />;

  return <Editor {...props} />;
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

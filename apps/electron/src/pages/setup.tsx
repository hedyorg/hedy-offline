import { ipcRenderer } from "electron";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Loading: React.FC = () => {
  const navigate = useRouter();

  const isConnected = async () => {
    const raw = JSON.stringify({
      code: "print hello world!",
      level: "1",
    });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const port = await ipcRenderer.invoke("getPort");

    try {
      const res = await fetch(`http://localhost:${port}/parse`, {
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
    navigate.push("/home");
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Head>
        <title>Hedy Offline</title>
      </Head>
      <div className="h-screen w-screen grid place-items-center">
        <div className="flex flex-col items-center gap-6">
          <img className="w-28 animate-bounce h-28" src="/images/logo.png" alt="Hedy Logo" />
          <div>
            <p className="text-3xl font-bold">Loading...</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;

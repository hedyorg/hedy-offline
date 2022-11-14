import React from "react";
import "@fontsource/source-code-pro";
import "@fontsource/poppins";
import type { AppProps } from "next/app";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

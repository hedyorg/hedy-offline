import type { AppProps } from "next/app";
import "../styles/globals.css";

import "@fontsource/source-code-pro";
import "@fontsource/source-code-pro/700.css";

import "@fontsource/poppins";
import "@fontsource/poppins/700.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;

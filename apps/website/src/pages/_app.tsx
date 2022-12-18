import "../styles/globals.css";
import type { AppProps } from "next/app";

import "@fontsource/source-code-pro";
import "@fontsource/source-code-pro/700.css";

import "@fontsource/poppins";
import "@fontsource/poppins/700.css";

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

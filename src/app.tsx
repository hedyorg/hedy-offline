import React from "react";
import ReactDOM from "react-dom/client";

import "@fontsource/source-code-pro";
import "@fontsource/source-code-pro/700.css";

import "@fontsource/poppins";
import "@fontsource/poppins/700.css";

import "./styles/globals.css";

import { createHashRouter, RouterProvider } from "react-router-dom";
import Loading from "./pages/loading";
import Editor from "./pages/editor";
import Home from "./pages/home";

const router = createHashRouter([
  {
    path: "/level-picker/:level",
    element: <Home />,
    loader: async ({ params }) => {
      const adventures = await window.info.getAdventures();
      return {
        adventures: adventures,
        level: params.level,
      };
    },
  },
  {
    path: "/",
    element: <Loading />,
  },
  {
    path: "/editor/:lang/:adventureId/:levelId",
    element: <Editor />,
    loader: async ({ params }) => {
      const adventures = await window.info.getAdventures();

      if (params.adventureId && params.levelId && params.lang) {
        return {
          adventure: adventures[params.lang].adventures[params.adventureId],
          level: adventures[params.lang].adventures[params.adventureId].levels[params.levelId],
          levelId: params.levelId,
          lang: params.lang,
          adventureId: params.adventureId,
        };
      }

      return {
        adventure: adventures["en"].adventures["default"],
        level: adventures["en"].adventures["default"].levels[0],
        levelId: 0,
        lang: "en",
        adventureId: "default",
      };
    },
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

import React from 'react'
import ReactDOM from 'react-dom/client'

import Loading from './pages/loading'
import '@fontsource/source-code-pro'
import '@fontsource/source-code-pro/700.css'

import '@fontsource/poppins'
import '@fontsource/poppins/700.css'

import './styles/globals.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Editor from './pages/editor'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Loading />,
  },
  {
    path: '/editor/:lang/:adventureId/:levelId',
    element: <Editor />,
    loader: async ({ params }) => {
      const adventures = await window.info.getAdventures()

      if (params.adventureId && params.levelId && params.lang) {
        return {
          adventure: adventures['en'].adventures[params.adventureId],
          level: adventures['en'].adventures[params.adventureId].levels[params.levelId],
          levelId: params.levelId,
          lang: params.lang,
        }
      }

      return {
        adventure: adventures['en'].adventures['default'],
        level: adventures['en'].adventures['default'].levels[0],
        levelId: 0,
        lang: 'en',
      }
    },
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

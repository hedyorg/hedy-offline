import { createContext, SetStateAction } from 'react'
import { Dispatch } from 'react'
export const LANGUAGES = ['en', 'nl'] as const

const AppContext = createContext<{
  lang: typeof LANGUAGES[number]
  setLang: Dispatch<SetStateAction<typeof LANGUAGES[number]>>
  setAdventureId: Dispatch<SetStateAction<string>>
  setLevelId: Dispatch<SetStateAction<string>>
  setHedy: Dispatch<SetStateAction<string>>
  hedy: string
  levelId: string
  languages: typeof LANGUAGES
  adventures: {
    [key: string]: AdventureType
  }
  adventure: AdventureType
  level: LevelType
} | null>(null)

export default AppContext

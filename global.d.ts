export {}

declare global {
  interface Window {
    info: {
      getPort: () => Promise<number>
      getAdventures: () => Promise<AdventureCollectionType>
    }
    Sk: any
  }

  interface AdventureCollectionType {
    [key: string]: {
      adventures: {
        [key: string]: AdventureType
      }
    }
  }

  interface AdventureType {
    name: string
    description: string
    default_save_name: string
    levels: {
      [key: string]: LevelType
    }
  }

  interface LevelType {
    intro_text?: string
    story_text?: string
    example_code?: string
    story_text_2?: string
    example_code_2?: string
    start_code: string
    story_text_3?: string
    example_code_3?: string
    story_text_4?: string
    example_code_4?: string
    story_text_5?: string
    example_code_5?: string
    story_text_6?: string
    example_code_6?: string
  }

  interface HedyResponse {
    Code: string
    has_sleep?: boolean
    has_turtle?: boolean
    Error?: string
    Location?: number[]
  }
}

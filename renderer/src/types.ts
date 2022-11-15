export interface AdventureType {
  name: string;
  description: string;
  default_save_name: string;
  levels: {
    [key: string]: LevelType;
  };
}

export interface LevelType {
  intro_text?: string;
  story_text?: string;
  example_code?: string;
  story_text_2?: string;
  example_code_2?: string;
  start_code: string;
  story_text_3?: string;
  example_code_3?: string;
  story_text_4?: string;
  example_code_4?: string;
  story_text_5?: string;
  example_code_5?: string;
  story_text_6?: string;
  example_code_6?: string;
}

export interface HedyResponse {
  Code: string;
  has_sleep: boolean;
  Error?: string;
  Location?: number[];
}

export type Props = {
  languages: {
    en?: {
      [key: string]: AdventureType;
    };
    nl?: {
      [key: string]: AdventureType;
    };
  };
};

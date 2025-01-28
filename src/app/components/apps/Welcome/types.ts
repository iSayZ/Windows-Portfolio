export type Language = 'fr' | 'en';

export interface WelcomeContent {
  title: string;
  messages: string[];
}

export type ContentDictionary = {
  [key in Language]: WelcomeContent;
};

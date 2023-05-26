export interface Lyric {
  time: number;
  text: string;
}
export interface Line extends Lyric {
  words: Lyric[] | null;
}

export interface Tags {
  ar?: string;
  ti?: string;
  al?: string;
  au?: string;
  by?: string;
  length?: string;
  offset?: string;
  re?: string;
  ve?: string;
}

export interface LyricData {
  enhanced: boolean;
  lines: Line[];
  tags: Tags;
}

export type EventName = 'load' | 'sync';

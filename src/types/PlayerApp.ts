export interface ICurrentPlay {
  id: string;
  url: string;
  name: string;
  picUrl?: string;
}

export interface ILrc {
  version?: number;
  lyric: string;
}
export interface ILyricRes {
  tlyric: ILrc;
  lrc: ILrc;
}
export interface ILangLyric {
  cnLyric: string;
  enLyric: string;
}
export interface IParams {
  id: string;
}

export interface IPlayItem {
  id: string;
  name: string;
  al?: {
    picUrl: string;
  };
}

export interface IPlayParam {
  id: string;
  limit: number;
}

export interface IPlayListRes {
  songs: IPlayItem[];
}
export type IPlayList = IPlayItem[];

export interface IPlayUrlParam {
  id: string;
  br?: number;
}
export interface IPlayUrlRes {
  data: {
    id: string;
    url: string;
  };
}

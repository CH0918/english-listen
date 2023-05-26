import { makeAutoObservable, runInAction } from 'mobx';

import type {
  ICurrentPlay,
  ILangLyric,
  IPlayListRes,
} from '@/types/PlayerApp.ts';
import { getLyric, getPlayList, getPlayUrl } from '@/api/music.ts';
import { OLD_FRIEND_PLAY_ID, ONE_PAGE_SIZE } from '@/enum/index.ts';
import React from 'react';
import { Line } from '@/types/Liricle';
type IPlayList = IPlayListRes['songs'];
class Store {
  constructor() {
    makeAutoObservable(this);
  }

  // 当前播放歌曲
  currentPlay: ICurrentPlay | null = null;
  setCurrentPlay = async (id?: string) => {
    if (this.playList.length === 0) return;
    let currentPlay: ICurrentPlay | null = null;
    const firstPlay = this.playList[2];
    const targetPlay =
      this.playList.find((play) => play.id === id) || firstPlay;
    const urlRes = await getPlayUrl({ id: targetPlay.id });

    if (urlRes.code === 200) {
      currentPlay = {
        id: targetPlay.id,
        name: targetPlay.name,
        url: urlRes.data.url,
        picUrl:
          targetPlay.al?.picUrl ||
          'https://p2.music.126.net/S4i5yhLfH2be6GTFo7Q4-Q==/109951165994185109.jpg',
      };
      runInAction(() => {
        this.currentPlay = currentPlay;
      });
    }
  };

  // 歌单歌曲播放列表
  playList: IPlayList = [];
  setPlayList = async () => {
    const res = await getPlayList({
      id: OLD_FRIEND_PLAY_ID,
      limit: ONE_PAGE_SIZE,
    });
    if (res.code === 200 && res.songs.length > 0) {
      runInAction(() => {
        this.playList = res.songs;
      });
    }
  };

  // 是否显示歌词
  isShowLyric = false;
  toggleIsShowLyric() {
    this.isShowLyric = !this.isShowLyric;
  }
  // 听不清的歌词
  notClearLyricList: string[] = [];
  addNotClearLyric(text: string) {
    this.notClearLyricList.push(text);
  }
  cleanNotClearLyric() {
    this.notClearLyricList = [];
  }
  // 获取歌词
  lyric: ILangLyric | null = null;
  setLyric = async () => {
    if (!this.currentPlay?.id) return;
    const lyricRes = await getLyric({ id: this.currentPlay.id });
    if (lyricRes.code === 200) {
      // 英文歌词
      const { lyric } = lyricRes.lrc || '';
      // 中文歌词
      const { lyric: tlyric } = lyricRes.tlyric || '';
      this.lyric = {
        enLyric: lyric,
        cnLyric: tlyric,
      };
    }
  };
  // 当前歌词
  currentLyric: Line = { time: 0, text: '', words: [] };
  setCurrentLyric(currentLyric: Line | null) {
    this.currentLyric = currentLyric || { time: 0, text: '', words: [] };
  }
  // 是否展示歌单卡片
  isShowPlayListPopCard = false;
  toggleIsShowPlayListPopCard() {
    this.isShowPlayListPopCard = !this.isShowPlayListPopCard;
  }
}
const store = new Store();

const context = React.createContext(store);
const useStore = () => React.useContext(context);

export default useStore;

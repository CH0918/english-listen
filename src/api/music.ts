import type { AxiosRequestConfig } from 'axios';

import { request } from './request.ts';
import {
  ILyricRes,
  IParams,
  IPlayListRes,
  IPlayParam,
  IPlayUrlParam,
  IPlayUrlRes,
} from '@/types/PlayerApp.ts';

/**
 * 获取歌词
 */
export const getLyric = (data: IParams, config: AxiosRequestConfig = {}) =>
  request<ILyricRes>('get', '/lyric', data, config);

/**
 * 获取歌单
 */
export const getPlayList = (data: IPlayParam) =>
  request<IPlayListRes>('get', '/playlist/track/all', data);

/**
 * 获取歌曲的播放地址
 */
export const getPlayUrl = (data: IPlayUrlParam) =>
  request<IPlayUrlRes>('get', '/song/download/url', data);

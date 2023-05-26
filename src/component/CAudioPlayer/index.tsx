import { useEffect, useRef, useState } from 'react';

import { observer } from 'mobx-react-lite';
import useStore from '@/store/index.ts';

import Liricle from 'liricle';
import CLoading from '@/component/CLoading/index.tsx';
import { Line } from '@/types/Liricle.ts';

function CAudioPlayer() {
  const store = useStore();
  const [liricle] = useState(() => {
    return new Liricle();
  });
  const [audioUrl, setAudioUrl] = useState(() => {
    return store.currentPlay?.url;
  });
  // 是否正在播放
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  // 进度条
  const [progress, setProgress] = useState<number>(0);
  // 开始时间
  const [audioCurentTime, setAudioCurrentTime] = useState<string>();
  // 总时间
  const [audioTotalTime, setAudioTotalTime] = useState<string>();
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const initData = async () => {
      await store.setPlayList();
      await store.setCurrentPlay();
      await store.setLyric();
      if (store.currentPlay) {
        liricle.load({
          text: store.lyric?.enLyric,
        });
      }
      liricle.on('sync', (line: Line) => {
        store.setCurrentLyric(line);
      });
    };
    initData();
  }, [liricle]);
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener('timeupdate', updateProgress);
      audioRef.current.addEventListener('ended', onAudioEnded);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('timeupdate', updateProgress);
        audioRef.current.removeEventListener('ended', onAudioEnded);
      }
    };
  }, [audioRef.current]);
  useEffect(() => {
    if (store.currentPlay?.url) {
      store
        .setLyric()
        .then(() => {
          setAudioUrl(store.currentPlay?.url);
        })
        .then(() => {
          liricle.load({
            text: store.lyric?.enLyric,
          });
          audioRef.current?.pause();
          audioRef.current?.load();
          audioRef.current?.play();
          setProgress(0);
          store.toggleIsShowLyric();
          store.setCurrentLyric(null);
          store.cleanNotClearLyric();
          audioRef.current && setIsPlaying(true);
        });
    }
  }, [store.currentPlay]);

  const onTimeUpdate = () => {
    if (audioRef.current) {
      const time = audioRef.current.currentTime;
      setAudioCurrentTime((time / 60).toFixed(2));
      setAudioTotalTime(getAudioTotalTime());
      liricle.sync(time, false);
    }
  };
  const updateProgress = () => {
    if (audioRef.current) {
      const currentProgress =
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };
  const onProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;

    const progressBar = e.currentTarget;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const clickPositionPercentage =
      (clickPosition / progressBar.offsetWidth) * 100;

    const newCurrentTime =
      (clickPositionPercentage * audioRef.current.duration) / 100;
    audioRef.current.currentTime = newCurrentTime;
  };

  const onAudioEnded = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    setProgress(0);
    setIsPlaying(false);
    store.cleanNotClearLyric();
    store.setCurrentLyric(null);
  };
  const onChangePlay = (type: 'pre' | 'next') => {
    const { playList, currentPlay, setCurrentPlay } = store;
    const index = playList.findIndex((play) => currentPlay?.id === play.id);
    const preOrNextIndex = type === 'pre' ? index - 1 : index + 1;
    if (type === 'pre' && preOrNextIndex < 0) {
      alert('已经是第一首啦~');
      return;
    }
    if (type === 'next' && preOrNextIndex > playList.length - 1) {
      alert('已经是最后一首啦~');
      return;
    }
    setCurrentPlay(playList[preOrNextIndex].id);
  };
  const onAddToLyricList = () => {
    const isExist =
      store.notClearLyricList.indexOf(store.currentLyric.text) > -1;
    if (isExist) return;
    store.addNotClearLyric(store.currentLyric.text);
  };
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const toggleIsShowLyric = () => {
    store.toggleIsShowLyric();
  };
  // 获取视屏的总时长
  const getAudioTotalTime = () => {
    const audio = audioRef.current;
    if (!audio || !audio.duration || Number.isNaN(audio.duration)) {
      return;
    }
    return (audio.duration / 60).toFixed(2);
  };

  return (
    <>
      <div className='w-95% rounded-2 flex flex-col items-center absolute bottom-5 left-50% -translate-x-50% '>
        {audioUrl ? (
          <audio onTimeUpdate={onTimeUpdate} ref={audioRef}>
            <source src={audioUrl} />
          </audio>
        ) : (
          <CLoading />
        )}

        {/* progress */}
        <div className='flex justify-between w-90vw items-center mb-8'>
          <div className='text-gray w-15 text-xs text-center'>
            {audioCurentTime}
          </div>
          <div
            className='w-70 bg-fontColor rounded-5px overflow-hidden '
            onClick={onProgressBarClick}
          >
            <div
              className='h-2px rounded-l-5px bg-primary'
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className='text-gray text-xs w-15 text-right text-center'>
            {/* {audioRef.current?.duration} */}
            {audioTotalTime}
          </div>
        </div>

        <div className='flex'>
          {/* left control */}
          <div
            className='flex items-center m-r-5'
            onClick={() => onChangePlay('pre')}
          >
            <div className='w-3px h-20px bg-primary rounded-3px -m-r-2'></div>
            <div className='border-transparent border-r-primary border-12'></div>
          </div>
          {/* play control */}
          <div
            className='w-12 h-12 rounded-full bg-primary flex justify-center items-center'
            onClick={togglePlay}
          >
            {isPlaying ? (
              <div className='flex gap-5px'>
                <span className='w-3px h-20px bg-white rounded-3px'></span>
                <span className='w-3px h-20px bg-white rounded-3px'></span>
              </div>
            ) : (
              <span className='w-0 h-0  border-transparent border-l-white translate-x-30% border-y-10 border-x-18'></span>
            )}
          </div>
          {/* right control */}
          <div
            className='flex items-center m-l-5'
            onClick={() => onChangePlay('next')}
          >
            <div className='border-transparent border-l-primary border-12'></div>
            <div className='w-3px h-20px bg-primary rounded-3px -m-l-2'></div>
          </div>
          <div
            className={`line-height-48px absolute left-15% w-10 ${
              store.isShowLyric ? 'text-primary' : 'text-gray'
            }`}
            onClick={toggleIsShowLyric}
          >
            词
          </div>
          <div
            className={`line-height-48px absolute right-10% text-secondary`}
            onClick={onAddToLyricList}
          >
            听不懂
          </div>
        </div>
      </div>
    </>
  );
}

export default observer(CAudioPlayer);

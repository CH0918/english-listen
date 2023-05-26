import useStore from '@/store/index.ts';
import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';

function CLyricArea() {
  const store = useStore();

  const notClearRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!notClearRef.current) return;
    notClearRef.current.scrollTop = notClearRef.current.scrollHeight;
  }, [store.notClearLyricList.length]);

  return (
    <div className='h-75vh text-center  flex flex-col items-center'>
      <div className='text-primary text-base min-h-10vh flex items-center p-2'>
        {store.isShowLyric && store.currentLyric.text}
      </div>
      <div
        className={`flex-1 w-95vw text-left bg-blend-multiply p-1 text-bgColor  overflow-auto rounded-2 bg-[url(https://p2.music.126.net/S4i5yhLfH2be6GTFo7Q4-Q==/109951165994185109.jpg)] bg-contain  relative`}
      >
        <div className='w-full h-full glassMask absolute top-0 left-0'></div>
        <div
          className='absolute w-full h-full top-0 left-0 z-1 text-primary p-2 font-bold overflow-auto'
          ref={notClearRef}
        >
          {store.notClearLyricList.map((lyric, index) => (
            <p key={index}>{`${index + 1}：${lyric}`}</p>
          ))}
        </div>
      </div>
    </div>
  );
}
export default observer(CLyricArea);

import { observer } from 'mobx-react-lite';
import useStore from '@/store/index.ts';

import CircumBoxList from '~icons/circum/box-list';

import CAudioPlayer from './component/CAudioPlayer/index.tsx';
import CLyricArea from './component/CLyricArea/index.tsx';
import CPlayListPopCard from './component/CPlayListPopCard/index.tsx';

const App = () => {
  const store = useStore();

  return (
    <>
      <div className='h-screen overflow-hidden relative'>
        <CLyricArea />
        <CAudioPlayer />
        {/* 弹出歌单icon */}
        <CircumBoxList
          className='text-xl m-l-auto m-r-4 m-t-3  text-fontColor'
          onClick={() => store.toggleIsShowPlayListPopCard()}
        />
        {store.isShowPlayListPopCard && <CPlayListPopCard />}
      </div>
    </>
  );
};

export default observer(App);

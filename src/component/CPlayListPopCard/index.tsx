import { observer } from 'mobx-react-lite';
import useStore from '@/store/index.ts';
import { IPlayItem } from '@/types/PlayerApp';
import { createPortal } from 'react-dom';

function CPlayListPopCard() {
  const store = useStore();
  const onChangeCurrentPlay = (item: IPlayItem) => {
    store.setCurrentPlay(item.id);
    store.toggleIsShowPlayListPopCard();
  };
  return (
    <>
      {createPortal(
        <>
          <div
            className='mask '
            onClick={() => store.toggleIsShowPlayListPopCard()}
          ></div>
          <div className='bg-white h-60vh w-100vw absolute bottom-0 rounded-t-5 left-50%  -translate-x-50% p-4 overflow-auto z-2'>
            {store.playList?.map((item) => (
              <div
                key={item.id}
                className='p-y-1 flex'
                onClick={() => onChangeCurrentPlay(item)}
              >
                <div
                  className={`flex-1 text-omit ${
                    store.currentPlay?.id == item.id
                      ? 'text-primary font-bold'
                      : 'text-black'
                  }`}
                >
                  {item.name}
                </div>
              </div>
            ))}
          </div>
        </>,
        document.body
      )}
    </>
  );
}
export default observer(CPlayListPopCard);

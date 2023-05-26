import EosIconsBubbleLoading from '~icons/eos-icons/bubble-loading';
import { createPortal } from 'react-dom';
function CLoading() {
  return (
    <>
      {createPortal(
        <div className='w-screen h-screen absolute top-0'>
          <div className='mask'></div>
          <EosIconsBubbleLoading className='text-5xl text-primary absolute top-50% left-50% -translate-50%' />
        </div>,
        document.body
      )}
    </>
  );
}
export default CLoading;

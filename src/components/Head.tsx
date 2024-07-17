import { ReactSVG } from 'react-svg';
import svg from '@/assets/svg/yh.svg';

const Head = () => {
  return (
    <div className="fixed inset-0 text-white z-10 flex justify-center items-center h-8 my-4">
      <ReactSVG
        src={svg}
        className="h-full"
        wrapper="span"
        beforeInjection={(svg) => {
          svg.classList.add('h-full');
          svg.classList.add('w-fit')
        }}
      />
    </div>
  );
};

export default Head;

import { Link, useLocation } from 'react-router-dom';
import { maxPage } from '@/constants/index';
import { useEffect } from 'react';
const Foot = () => {
  const { pathname } = useLocation();

  const nameArr = pathname.split('day').filter(Boolean);

  const currentPage = Number(nameArr[nameArr.length - 1] || 0);

  const prev = () => {
    return currentPage === 1 ? pathname : `day${currentPage - 1}`;
  };

  const next = () => {
    return currentPage < maxPage ? `/day${currentPage + 1}` : pathname;
  };

  return (
    <div className="fixed w-full text-white z-10 flex justify-between items-center h-12 bottom-0">
      <Link
        to={prev()}
        className={`mx-10 text-sm font-bold transition-all hover:-translate-x-1 ${
          currentPage === 1 ? 'opacity-70' : 'hover:text-orange-500'
        }`}
      >
        Previous
      </Link>
      <Link
        to={next()}
        className={`mx-10 text-sm font-bold transition-all  hover:translate-x-1 ${
          currentPage < maxPage ? 'hover:text-orange-500' : 'opacity-70'
        }`}
      >
        Next
      </Link>
    </div>
  );
};

export default Foot;

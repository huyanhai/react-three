import { Link, useOutlet, Outlet } from 'react-router-dom';

const Foot = () => {
  return (
    <div className="fixed w-full text-white z-10 flex justify-center items-center h-12 bottom-0">
      <Link to={'/'} className='mx-4 text-sm opacity-40 hover:opacity-100 transition-opacity'>Prev</Link>
      <Link to={'/'} className='mx-4 text-sm opacity-40 hover:opacity-100 transition-opacity'>Next</Link>
    </div>
  );
};

export default Foot;

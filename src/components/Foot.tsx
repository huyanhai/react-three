import { Link, useParams } from 'react-router-dom';
const Foot = () => {
  const params = useParams();
  return (
    <div className="fixed w-full text-white z-10 flex justify-between items-center h-12 bottom-0">
      <Link
        to={'/day1'}
        className="mx-10 text-sm font-bold transition-all hover:-translate-x-1 hover:text-orange-500"
      >
        Previous
      </Link>
      <Link
        to={'/day2'}
        className="mx-10 text-sm font-bold transition-all hover:translate-x-1 hover:text-orange-500"
      >
        Next
      </Link>
    </div>
  );
};

export default Foot;

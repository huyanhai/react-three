import Foot from '@/components/Foot';
import Head from '@/components/Head';
import { Link, useOutlet, Outlet } from 'react-router-dom';

const Index = () => {
  return (
    <>
      <Head />
      <Outlet />
      <Foot />
    </>
  );
};

export default Index;

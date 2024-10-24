import { FC, PropsWithChildren, useEffect } from 'react';
import Navbar from './Navbar';
import { useLayout } from '../hooks/useLayout';
import { getTelegram } from '../services/telegram';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  const { loading } = useLayout();
  const { tg } = getTelegram();

  useEffect(() => {
    tg.ready();
    tg.expand();
  }, [tg]);

  if (loading) {
    return (
      <div className='flex flex-col items-center h-screen mt-5'>
        LOADING...
        <progress className='progress w-72'></progress>
      </div>
    );
  }

  return (
    <main className='flex flex-col justify-between h-screen box-border overflow-hidden'>
      {children}
      <Navbar />
    </main>
  );
};

export default Layout;

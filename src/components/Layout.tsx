import { FC, PropsWithChildren } from 'react';
import Navbar from './Navbar';
import { useLayout } from '../hooks/useLayout';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  useLayout();
  return (
    <main className='flex flex-col justify-between h-screen box-border overflow-hidden'>
      {children}
      <Navbar />
    </main>
  );
};

export default Layout;

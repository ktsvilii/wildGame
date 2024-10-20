import { FC, PropsWithChildren } from 'react';
import Navbar from './Navbar';

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main className='min-h-screen box-border overflow-hidden'>
      {children}
      <Navbar />
    </main>
  );
};

export default Layout;

import React, { ReactNode } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

interface Props {
  children: ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div className='flex'>
      <Sidebar />
      <div className='w-full'>
        <Header />
        <main className='p-10'>{children}</main>
      </div>
    </div>
  );
};

export default MainLayout;

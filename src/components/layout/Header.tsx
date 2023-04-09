import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';

const Header = () => {
  const router = useRouter();
  const handleLogout = () => {
    router.push('/login');
  };

  return (
    <header className=' top-0 left-0 w-full flex justify-end items-center bg-slate-100 text-black p-4 '>
      <div className='mr-2 rounded-full overflow-hidden'>
        <Image
          src='/assets/img/user-icon.png'
          alt='Icon user'
          width={24}
          height={24}
        />
      </div>
      <div className='mr-4'>
        <p className='font-medium'>Elkin</p>
      </div>
      <button type='button' onClick={handleLogout}>
        <ArrowRightOnRectangleIcon className='h-5 w-5 text-black mr-2' />
      </button>
    </header>
  );
};

export default Header;

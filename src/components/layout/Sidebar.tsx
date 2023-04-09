import React, { ReactElement, useState } from 'react';
import {
  PaintBrushIcon,
  ArrowsRightLeftIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/solid';
import { useRouter } from 'next/router';
import Image from 'next/image';
import SidebarItem from './SidebarItem';

interface Menu {
  text: string;
  icon: ReactElement;
  redirectTo: string;
}

const MENUS: Menu[] = [
  { text: 'Puntos', icon: <PaintBrushIcon />, redirectTo: '/Puntos' },
  {
    text: 'Palíndromo',
    icon: <ArrowsRightLeftIcon />,
    redirectTo: '/Palindromo',
  },
];

const Sidebar = () => {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`relative bg-blue-400 h-screen p-5 pt-8  ${
        isOpen ? 'w-72' : 'w-20'
      } duration-300 `}
    >
      <ArrowLeftIcon
        className={`absolute h-6 bg-yellow-200 rounded-full p-1 top-9 -right-3 border border-black cursor-pointer ${
          !isOpen && 'rotate-180'
        } `}
        onClick={() => setIsOpen(!isOpen)}
      />

      <div className='inline-flex'>
        <Image
          src='/assets/img/VTEX-logo.png'
          alt='VTEX logo'
          className={`block float-left mr-2 cursor-pointer h-8 ${
            isOpen && 'rotate-[360deg]'
          } duration-500`}
          width={32}
          height={32}
        />
        <h1
          className={` origin-left font-medium text-2xl ${
            !isOpen && 'scale-0'
          } duration-300`}
        >
          VTEX
        </h1>
      </div>

      <ul className='mt-6 pt-2'>
        {MENUS.map(({ text, icon, redirectTo }) => (
          <SidebarItem
            key={text}
            text={text}
            icon={icon}
            redirectTo={redirectTo}
            sidebarIsOpen={isOpen}
            selected={router.asPath === redirectTo}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;

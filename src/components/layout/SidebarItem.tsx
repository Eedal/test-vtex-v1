import Link from 'next/link';
import React, { ReactElement } from 'react';

interface SidebarItemProps {
  icon: ReactElement;
  text: string;
  selected: boolean;
  redirectTo: string;
  sidebarIsOpen: boolean;
}

const SidebarItem = ({
  icon,
  text,
  selected,
  redirectTo,
  sidebarIsOpen,
}: SidebarItemProps) => (
  <Link href={redirectTo}>
    <li
      key={text}
      className={`flex items-center text-sm gap-x-4 cursor-pointer p-2 hover:bg-lime-300 rounded-md mt-2 ${
        selected && 'bg-lime-400'
      }  relative group`}
    >
      <span className='w-5 '>{icon}</span>
      <span className={`${!sidebarIsOpen && 'hidden'} duration-300`}>
        {text}
      </span>
      <span
        className={`absolute w-auto p-2 m-2 min-w-max left-14 rounded-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left ${
          !sidebarIsOpen && 'group-hover:scale-100'
        } `}
      >
        {text}
      </span>
    </li>
  </Link>
);

export default SidebarItem;

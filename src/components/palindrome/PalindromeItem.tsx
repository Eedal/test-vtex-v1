import React from 'react';
import { TrashIcon } from '@heroicons/react/24/solid';

interface PalindromeItemProps {
  id: string;
  value: string;
  isPalindrome: boolean;
  handleRemove: (id: string) => Promise<void>;
}

const PalindromeItem = ({
  id,
  value,
  isPalindrome,
  handleRemove,
}: PalindromeItemProps) => {
  return (
    <li className='flex justify-between items-center text-sm gap-x-4 p-2 hover:bg-gray-300 rounded-md mt-2 '>
      <div className=''>
        <span className='font-bold mr-2 capitalize'>{value}</span>
        <span
          className={`rounded-lg px-2 py-1 text-white ${
            isPalindrome ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {isPalindrome ? 'Palíndromo' : 'No palíndromo'}
        </span>
      </div>
      <button
        type='button'
        className='rounded-full bg-blue-400 hover:bg-blue-700'
        onClick={() => handleRemove(id)}
      >
        <TrashIcon className='w-8 p-1 ' />
      </button>
    </li>
  );
};

export default PalindromeItem;

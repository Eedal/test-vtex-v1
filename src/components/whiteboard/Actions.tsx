import React from 'react';
import {
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
} from '@heroicons/react/24/solid';

interface ActionsProps {
  undo: () => void;
  redo: () => void;
  undoDisabled: boolean;
  redoDisabled: boolean;
}

const Actions = ({ undo, redo, undoDisabled, redoDisabled }: ActionsProps) => {
  return (
    <section className='bg-gray-100 py-2 flex items-center px-5 '>
      <button
        type='button'
        className='relative group '
        disabled={undoDisabled}
        onClick={undo}
      >
        <ArrowUturnLeftIcon
          className={`w-8 border border-gray-800 rounded-full p-1 cursor-pointer ${
            !undoDisabled && 'bg-blue-300'
          }  duration-300 mr-2`}
        />
        <span className='absolute w-auto p-2 m-2 min-w-max -left-6 -top-11 rounded-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100'>
          Re-hacer
        </span>
      </button>
      <button
        type='button'
        className='relative group'
        disabled={redoDisabled}
        onClick={redo}
      >
        <ArrowUturnRightIcon
          className={`w-8 border border-gray-800 rounded-full p-1 cursor-pointer ${
            !redoDisabled && 'bg-blue-300'
          }  duration-300`}
        />
        <span className='absolute w-auto p-2 m-2 min-w-max -left-6 -top-11 rounded-md text-white bg-gray-900 text-xs font-bold transition-all duration-100 scale-0 origin-left group-hover:scale-100'>
          Re-crear
        </span>
      </button>
    </section>
  );
};

export default Actions;

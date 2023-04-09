import React from 'react';
import { Word } from './models/Word';
import PalindromeItem from './PalindromeItem';

interface PalindromeListProps {
  words: Word[];
  handleRemove: (id: string) => Promise<void>;
}

const PalindromeList = ({ words, handleRemove }: PalindromeListProps) => {
  console.log("🚀 ~ file: PalindromeList.tsx:11 ~ PalindromeList ~ handleRemove:", handleRemove)
  return (
    <ul className='mt-6 pt-2 max-h-96 overflow-y-auto mb-0'>
      {words.map(({ _id, value, isPalindrome }) => (
        <PalindromeItem
          key={_id}
          value={value}
          isPalindrome={isPalindrome}
          id={_id || ''}
          handleRemove={handleRemove}
        />
      ))}
    </ul>
  );
};

export default PalindromeList;

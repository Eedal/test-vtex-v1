import useDebounce from 'hooks/useDebounce';
import React, { ChangeEvent, useEffect, useState } from 'react';

interface PalindromeSearchProps {
  handleChangeFilter: (filterText: string) => void;
}

const PalindromeSearch = ({ handleChangeFilter }: PalindromeSearchProps) => {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    handleChangeFilter(debouncedQuery);
  }, [debouncedQuery]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setQuery(value);
  };

  return (
    <div>
      <input
        type='text'
        onChange={handleChange}
        placeholder='Search...'
        className='border border-gray-400 p-2 rounded-md'
      />
    </div>
  );
};

export default PalindromeSearch;

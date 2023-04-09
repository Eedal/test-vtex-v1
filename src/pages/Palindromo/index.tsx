import React, { useEffect, useMemo, useState } from 'react';
import Head from 'next/head';
import MainLayout from '@components/layout/MainLayout';
import PalindromeForm from '@components/palindrome/PalindromeForm';
import PalindromeList from '@components/palindrome/PalindromeList';
import { Word } from '@components/palindrome/models/Word';
import PalindromeSearch from '@components/palindrome/PalindromeSearch';
import WordService from 'services/word';

const Palindromo = () => {
  const [words, setWords] = useState<Word[]>([]);

  const [filter, setFilter] = useState('');

  const wordsFiltered = useMemo(() => {
    if (filter) {
      return words.filter(({ value }) =>
        value.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
      );
    }
    return words;
  }, [filter, words]);

  const fetchAllWords = async () => {
    const allWords = await WordService.getWords();

    setWords(allWords);
  };

  useEffect(() => {
    fetchAllWords();
  }, []);

  const handleChangeFilter = (filterText: string) => {
    setFilter(filterText);
  };

  const handleOnSubmit = () => {
    fetchAllWords();
  };

  const handleRemove = async (id: string) => {
    await WordService.deleteWord(id);
    fetchAllWords();
  };
  return (
    <MainLayout>
      <Head>
        <title>Palindromo</title>
      </Head>
      <div className='flex gap-10'>
        <PalindromeForm handleOnSubmit={handleOnSubmit} />
        <div className='flex flex-col'>
          <PalindromeSearch handleChangeFilter={handleChangeFilter} />
          <PalindromeList words={wordsFiltered} handleRemove={handleRemove} />
        </div>
      </div>
    </MainLayout>
  );
};

export default Palindromo;

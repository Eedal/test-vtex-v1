import React, { ChangeEvent, FormEvent, useState } from 'react';
import WordService from 'services/word';

interface PalindromeFormProps {
  handleOnSubmit: () => void;
}

const PalindromeForm = ({ handleOnSubmit }: PalindromeFormProps) => {
  const [word, setWord] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setWord(event.target.value);
  };

  const isValidForm = () => {
    if (!word) {
      setError('El campo es requerido');
      return false;
    }
    if (word.includes(' ')) {
      setError('El texto solo puede ser palabras, no frases');
      return false;
    }

    return true;
  };
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidForm()) return;

    try {
      await WordService.createWord(word);
      setWord('');
      handleOnSubmit();
    } catch (e) {
      console.log(e);
    }
  };

  const handleReset = () => {
    setWord('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col' autoComplete='off'>
      <label htmlFor='word' className='mb-2'>
        {' '}
        Ingrese una palabra:
      </label>

      <input
        id='word'
        type='text'
        value={word}
        onChange={handleInputChange}
        className='border border-gray-400 p-2 rounded-md mb-2'
      />
      {error && <p className='text-red-500 mb-2'>{error}</p>}

      <div className='flex'>
        <button
          type='submit'
          className='bg-blue-500 text-white p-2 rounded-md ml-2'
        >
          Verificar
        </button>
        <button
          type='button'
          className='bg-gray-200 text-white p-2 rounded-md ml-2'
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </form>
  );
};

export default PalindromeForm;

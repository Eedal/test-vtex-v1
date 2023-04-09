import { Word } from '@components/palindrome/models/Word';
import httpService from './http-service';

const WordService = {
  getWords: async () => {
    try {
      const { data } = await httpService.get<Word[]>('/api/words');
      return data;
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  createWord: async (word: string) => {
    try {
      const { data } = await httpService.post<Word[]>('/api/words', { word });
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  deleteWord: async (id: string) => {
    try {
      const { data } = await httpService.delete<Word[]>(`/api/words/${id}`);
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};

export default WordService;

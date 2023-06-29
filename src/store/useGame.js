import { create } from 'zustand';
import { postWord, postWordMultiplayer } from '../services/words.service.js';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { prepareWordList } from '../utils/prepareWordList.js';
import { LAST_GAME } from '../constants/index.js';

export const useGame = create(
  devtools(
    persist(
      (set, get) => ({
        wordList: [],
        loading: false,
        errorMessage: '',
        lastWord: {},
        gameNumber: LAST_GAME,
        attempt: 0,

        addWord: async (gameNumber, word) =>
          set(async (state) => {
            set(() => ({ loading: true }));
            const data = await postWord(gameNumber, word);
            if (data.response) {
              const { error } = JSON.parse(data.response);
              set(() => ({ errorMessage: error }));
            } else {
              const newList = prepareWordList(
                data,
                state.wordList,
                state.lastWord
              );
              set(() => ({
                ...state,
                lastWord: {
                  ...data,
                  distance:
                    data.distance === 0 ? data.distance + 1 : data.distance,
                },
                errorMessage: '',
                wordList: newList,
                attempt: state.attempt + 1,
              }));
            }
            set(() => ({ loading: false }));
          }),

        addWordInMultiplayer: async (player, roomId, gameId, word) =>
          set(async (state) => {
            set(() => ({ loading: true }));
            const data = await postWordMultiplayer(
              player,
              roomId,
              gameId,
              word
            );
            if (data.response) {
              const { error } = JSON.parse(data.response);
              set(() => ({ errorMessage: error }));
            } else {
              const newList = prepareWordList(
                data,
                state.wordList,
                state.lastWord
              );
              set(() => ({
                ...state,
                lastWord: {
                  ...data,
                  distance:
                    data.distance === 0 ? data.distance + 1 : data.distance,
                },
                errorMessage: '',
                wordList: newList,
                attempt: state.attempt + 1,
              }));
            }
            set(() => ({ loading: false }));
          }),

        setErrorMessage: (errorMessage) => set({ errorMessage: errorMessage }),

        setGameNumber: (gameNumber) => set(() => ({ gameNumber: gameNumber })),

        setWordList: (wordList) => set(() => ({ wordList: wordList })),

        clearGameForMultiplayer: (gameId) =>
          set(() => ({
            wordList: [],
            lastWord: {},
            errorMessage: '',
            attempt: 0,
            gameId: gameId,
          })),

        clearGame: () =>
          set(() => ({
            wordList: [],
            lastWord: {},
            errorMessage: '',
            attempt: 0,
          })),
      }),
      { name: 'game-storage', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

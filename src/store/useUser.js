import { create } from 'zustand';
import { auth } from '../services/user.service.js';
import { createJSONStorage, persist } from 'zustand/middleware';

export const useUser = create(
  persist(
    (set) => ({
      user: {},
      errorMessage: '',

      getUser: () => {
        let userInfo = JSON.parse(localStorage.getItem('user'));
        if (userInfo) set(() => ({ user: userInfo }));
      },
      //TODO обработать ошибки при авторизации
      auth: async (username) => {
        const userData = await auth(username);
        if (userData.id) {
          localStorage.setItem('user', JSON.stringify(userData));
          set(() => ({ user: userData }));
        }
      },

      setUser: (userData) => () => {
        //   localStorage.setItem('user', JSON.stringify(userData));
        set(() => ({ user: userData }));
      },
    }),
    { name: 'user-store', storage: createJSONStorage(() => localStorage) }
  )
);

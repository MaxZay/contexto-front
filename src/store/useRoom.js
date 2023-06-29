import { create } from 'zustand';
import { createRoom, getRoom } from '../services/room.service.js';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { useGame } from './useGame.js';

export const useRoom = create(
  devtools(
    persist(
      (set) => ({
        roomName: '',
        roomId: '',
        gameId: '',
        gameLink: '',
        creator: {},
        players: [],
        gameStarted: false,

        createRoom: async (gameId, roomName, userInfo) => {
          const {
            gameId: wordId,
            name,
            id,
            players,
          } = await createRoom(gameId, roomName, userInfo);

          const link = `http://localhost:5173/rooms/${id}`;
          set(() => ({
            roomName: name,
            gameId: wordId,
            roomId: id,
            gameLink: link,
            creator: userInfo,
            players: players,
          }));
        },

        getRoom: async (roomId, userInfo) => {
          const { id, name, gameId, creator, players } = await getRoom(
            roomId,
            userInfo
          );
          useGame.getState().clearGameForMultiplayer(gameId);
          const link = `http://localhost:5173/rooms/${roomId}`;
          set(() => ({
            roomName: name,
            gameId: gameId,
            roomId: id,
            gameLink: link,
            creator: creator,
            players: players,
            gameStarted: false,
          }));
        },

        startGame: () => {
          set((state) => ({ gameStarted: true }));
        },

        clearRoom: () => {
          set(() => ({
            roomName: '',
            roomId: '',
            gameId: '',
            gameLink: '',
            creator: {},
            players: [],
            gameStarted: false,
          }));
        },

        addUser: (newUser) => {
          set((state) => ({
            players: [...state.players, newUser],
          }));
        },

        setDistanceToUser: (user, distance) =>
          set((state) => {
            const currentUser = state.players.find(
              (player) => player.id === user.id
            );
            const statePlayersCopy = state.players;

            const currentUserIndex = state.players.indexOf(currentUser);

            if (!currentUser.distance) {
              statePlayersCopy[currentUserIndex].distance = distance;
            } else if (currentUser.distance > distance) {
              statePlayersCopy[currentUserIndex].distance = distance;
            }

            statePlayersCopy.sort((a, b) => a.distance - b.distance);

            return { ...state, players: statePlayersCopy };
          }),
      }),
      { name: 'room-storage', storage: createJSONStorage(() => sessionStorage) }
    )
  )
);

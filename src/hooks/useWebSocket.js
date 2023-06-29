import { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import { toast } from 'react-toastify';
import { useRoom } from '../store/useRoom.js';
import { useUser } from '../store/useUser.js';

export const useWebSocket = (url, roomId) => {
  const { current: client } = useRef(new Client());
  const { addUser, players } = useRoom((state) => state);
  const { user: currentUser } = useUser((state) => state);

  useEffect(() => {
    client.configure({
      brokerURL: url,
      onConnect: () => {
        client.subscribe(`/topic/rooms/${roomId}/new-connection`, (message) => {
          let userInfo = JSON.parse(message.body);
          if (!players.find((user) => user.id === userInfo.id)) {
            addUser(userInfo);
            toast(`${userInfo.nickName} has connected to the room`);
          }
        });
      },
    });
    client.activate();
  }, [addUser, client, players, roomId, url]);

  return client;
};

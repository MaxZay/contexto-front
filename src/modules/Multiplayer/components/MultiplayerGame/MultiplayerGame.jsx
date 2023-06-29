import React, { useEffect } from 'react';
import Game from '../../../Game/components/Game/Game.jsx';
import { useModal } from '../../../../hooks/useModal.js';
import { createPortal } from 'react-dom';
import LobbyModal from '../LobbyModal/LobbyModal.jsx';
import { useUser } from '../../../../store/useUser.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetRoom } from '../../../../hooks/useGetRoom.js';
import { useWebSocket } from '../../../../hooks/useWebSocket.js';
import { HTTP_API, WS_API } from '../../../../constants/index.js';
import { useRoom } from '../../../../store/useRoom.js';
import ScoreBoard from '../ScoreBoard/ScoreBoard.jsx';
import { useGame } from '../../../../store/useGame.js';

const MultiplayerGame = () => {
  const { gameStarted, startGame, setDistanceToUser } = useRoom(
    (state) => state
  );
  const { isModalOpen, closeModal } = useModal(!gameStarted);
  const { user } = useUser((state) => state);
  const { id } = useParams();
  const client = useWebSocket(WS_API, id);
  const isRoomLoading = useGetRoom(user, id);
  const navigate = useNavigate();
  const { addWordInMultiplayer } = useGame((state) => state);

  useEffect(() => {
    if (client.connected) {
      client.subscribe(`/topic/rooms/${id}/events`, () => {
        startGame();
        closeModal();
      });
      client.subscribe(`/topic/rooms/${id}`, (message) => {
        let { guessProcessingResult, player } = JSON.parse(message.body);
        setDistanceToUser(player, guessProcessingResult.distance);
      });
    }
  }, [client, closeModal, id, setDistanceToUser, startGame]);

  const closeLobbyModal = () => {
    navigate('/');
    closeModal();
  };

  const onGameStarted = async () => {
    startGame();
    await fetch(`${HTTP_API}/events`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: `/topic/rooms/${id}/events`,
        eventType: 'GAME_STARTED',
      }),
    });
    closeModal();
  };

  const addWord = async (gameNumber, word) => {
    await addWordInMultiplayer(user, id, gameNumber, word);
  };

  return (
    <>
      {isModalOpen &&
        createPortal(
          <LobbyModal
            closeModal={closeLobbyModal}
            onGameStarted={onGameStarted}
          />,
          document.body
        )}
      <ScoreBoard />
      <Game addWord={addWord} />
    </>
  );
};

export default MultiplayerGame;

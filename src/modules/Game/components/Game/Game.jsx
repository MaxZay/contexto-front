import React, { useEffect, useRef, useState } from 'react';
import Title from '../Title/Title.jsx';
import GameInfo from '../GameInfo/GameInfo.jsx';
import WordForm from '../WordForm/WordForm.jsx';
import WordsList from '../WordsList/WordsList.jsx';
import { useWin } from '../../../../hooks/useWin.js';
import WinningPage from '../WinningPage/WinningPage.jsx';
import { useGame } from '../../../../store/useGame.js';
import GameContainer from '../GameContainer/GameContainer.jsx';

const Game = ({ addWord }) => {
  const [word, setWord] = useState('');
  const {
    wordList,
    loading,
    errorMessage,
    lastWord,
    gameNumber,
    attempt,
    setErrorMessage,
  } = useGame((state) => state);
  const isWin = useWin(lastWord);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (word) {
      if (word === 'hui') {
        setErrorMessage('Сам ты hui');
      } else if (word === 'pizda') {
        setErrorMessage('Pizda');
      } else if (wordList.find((card) => card.word === word)) {
        setErrorMessage(`The word ${word} was already guessed.`);
      } else {
        await addWord(gameNumber, word);
      }
    } else {
      setErrorMessage('Ты дурак?');
    }
    setWord(() => '');
  };

  const wordChangeHandler = (event) => setWord(() => event.target.value);

  return (
    <GameContainer>
      <Title />
      <GameInfo attempt={attempt} gameNumber={gameNumber} />
      {isWin && <WinningPage gameNumber={250} guesses={attempt} />}
      <WordForm
        word={word}
        setWord={wordChangeHandler}
        submitHandler={submitHandler}
        isWin={isWin}
      />
      <WordsList
        wordList={wordList}
        isLoading={loading}
        errorMessage={errorMessage}
        lastWord={lastWord}
      />
    </GameContainer>
  );
};

export default Game;

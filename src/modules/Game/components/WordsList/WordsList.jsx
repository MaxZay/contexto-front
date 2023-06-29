import React from 'react';
import styles from './WordsList.module.css';
import WordCard from '../WordCard/WordCard.jsx';
import Loader from '../../../../uikit/conponents/Loader/Loader.jsx';
const WordsList = ({ isLoading, wordList, errorMessage, lastWord }) => {
  const getWordStatus = () => {
    if (errorMessage) {
      return <p className={styles.errorMessage}>{errorMessage}</p>;
    } else {
      if (isLoading) {
        return (
          <div className={styles.loaderWrapper}>
            <Loader />
          </div>
        );
      } else if (lastWord.lemma) {
        return (
          <WordCard distance={lastWord.distance} word={lastWord.lemma} active />
        );
      }
    }
  };

  return (
    <>
      {getWordStatus()}
      <div className={styles.listWrapper}>
        {wordList &&
          wordList.map(({ distance, word, active, lemma }) => (
            <WordCard
              key={distance}
              distance={distance}
              word={lemma}
              active={active}
            />
          ))}
      </div>
    </>
  );
};

export default WordsList;

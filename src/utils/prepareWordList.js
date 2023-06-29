export const prepareWordList = (newData, wordList, lastWord) => {
  let newList = [
    ...wordList,
    {
      ...newData,
      distance:
        newData.distance === 0 ? newData.distance + 1 : newData.distance,
      active: true,
    },
  ].sort((a, b) => a.distance - b.distance);
  let lastWordIndex = newList.map((item) => item.word).indexOf(lastWord.word);
  if (lastWordIndex !== -1) newList[lastWordIndex].active = false;
  return newList;
};

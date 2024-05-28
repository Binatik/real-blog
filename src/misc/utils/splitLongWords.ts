export const splitLongWords = (word: string, dxLimit: number) => {
  if (!word) {
    return " ";
  }

  if (word.length < dxLimit) {
    return word;
  }

  const splitWord = word.match(new RegExp(`.{1,${dxLimit}}`, "g"));

  if (splitWord) {
    return splitWord.join(" ");
  }

  return word;
};

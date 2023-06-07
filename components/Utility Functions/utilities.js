//capitalize first character of each word
export const capitalize = (sentence) => {
  return (
    sentence &&
    sentence
      .split(" ")
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.substring(1);
      })
      .join(" ")
  );
};

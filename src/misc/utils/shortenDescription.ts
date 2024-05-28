export const shortenDescription = (description: string, max: number) => {
  if (description.length <= max) {
    return description;
  }
  const last = description.lastIndexOf(" ", max);
  const text = description.slice(0, last);
  return text + "...";
};

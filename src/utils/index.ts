export const getTitle = (key: string) => {
  const texts = key.split("-");
  return texts
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

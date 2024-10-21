export const getCellSize = (
  ref: React.RefObject<HTMLDivElement>,
  columns: number,
  rows: number
) => {
  if (!ref.current) return 0;

  const sizeBasedOnWidth = ref.current.clientWidth / columns;
  const sizeBasedOnHeight = (window.innerHeight - 70) / rows;

  return Math.min(sizeBasedOnWidth, sizeBasedOnHeight);
};

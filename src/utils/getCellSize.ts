export const getCellSize = (
  ref: React.RefObject<HTMLDivElement>,
  columns: number,
  rows: number,
  isSm: boolean
) => {
  if (!ref.current) return 0;

  const sizeBasedOnWidth = isSm
    ? ref.current.clientWidth / columns
    : ref.current.clientWidth / 2 / columns;
  const sizeBasedOnHeight = (window.innerHeight - 80) / rows;

  return isSm
    ? Math.min(sizeBasedOnWidth, sizeBasedOnHeight)
    : sizeBasedOnWidth;
};

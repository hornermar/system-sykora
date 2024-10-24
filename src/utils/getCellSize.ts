export const getCellSize = (
  ref: React.RefObject<HTMLDivElement>,
  columns: number,
  rows: number,
  mediaSize: "xs" | "sm" | "md" | "lg"
) => {
  if (!ref.current) return 0;

  const offset =
    mediaSize === "xs"
      ? 80
      : mediaSize === "sm"
      ? 450
      : mediaSize === "md"
      ? 400
      : 300;

  const sizeBasedOnWidth = ref.current.clientWidth / columns;

  const sizeBasedOnHeight = (window.innerHeight - offset) / rows;

  return Math.min(sizeBasedOnWidth, sizeBasedOnHeight);
};

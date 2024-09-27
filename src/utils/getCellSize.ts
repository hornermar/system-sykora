export const getCellSize = (
    ref: React.RefObject<HTMLDivElement>,
    columnsCount: number
) => {
    if (!ref.current) return 0;

    const gridWidth = columnsCount;
    return ref.current.clientWidth / gridWidth;
};

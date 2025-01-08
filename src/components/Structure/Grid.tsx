import { Box, Typography } from "@mui/material";
import { map } from "lodash";
import { memo } from "react";
import { Cell, ViewMode } from "../../types/General";
import { getImgPath } from "../../utils/getImgPath";
import { useTheme } from "@mui/material/styles";

type StructureGridProps = {
  grid: string[][];
  cellSize: number;
  viewMode: ViewMode;
  defaultGrid?: string[][];
  activeNeighbours?: Cell[];
  activeCell?: Cell;
  handleCellClick?: (x: number, y: number, name: string) => void;
  displayDefaultGrid?: boolean;
  highlightDefaultGrid?: boolean;
  isClickable: boolean;
};

export const StructureGrid = memo(function StructureGrid({
  grid,
  cellSize,
  viewMode,
  defaultGrid,
  activeNeighbours,
  activeCell,
  handleCellClick,
  displayDefaultGrid,
  highlightDefaultGrid,
  isClickable,
}: StructureGridProps) {
  const theme = useTheme();

  return (
    <>
      {map(displayDefaultGrid ? defaultGrid : grid, (row, y) => (
        <Box
          key={y}
          sx={{
            display: "flex",
            flexDirection: "row",
            height: `${cellSize}px`,
          }}
        >
          {map(row, (cell: string, x) => {
            const isCellSign = cell === "+" || cell === "-";
            const isCellActive = activeCell?.x === x && activeCell?.y === y;
            const isCellEmpty = cell === "0" || isCellSign;

            const isCellOriginal =
              !displayDefaultGrid &&
              defaultGrid &&
              defaultGrid[y][x] !== "0" &&
              defaultGrid[y][x] !== "+" &&
              defaultGrid[y][x] !== "-" &&
              defaultGrid[y][x] === cell;

            const isCellActiveNeighbour =
              activeNeighbours &&
              activeNeighbours.some(
                (neighbour) => neighbour.x === x && neighbour.y === y
              );

            return (
              <Box
                key={`${x}${y}`}
                className={`element-${x}${y}`}
                onClick={() => !isCellOriginal && handleCellClick?.(x, y, cell)}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  border:
                    viewMode === "text" || isCellEmpty
                      ? `1px solid ${theme.palette.secondary.dark}`
                      : "initial",
                  backgroundColor: isCellActive
                    ? theme.palette.primary.main
                    : isCellActiveNeighbour
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
                  cursor: isClickable && !isCellOriginal ? "pointer" : "unset",
                  zIndex: isCellActive ? 70 : isCellActiveNeighbour ? 50 : 0,
                  ":active": {
                    zIndex: isClickable && !isCellOriginal ? 100 : 0,
                    transform:
                      isClickable && !isCellOriginal ? "scale(1.05)" : "none",
                  },
                  ":hover": {
                    zIndex: isClickable && !isCellOriginal ? 100 : 0,
                    transform:
                      isClickable && !isCellOriginal ? "scale(1.05)" : "none",
                  },
                }}
              >
                {viewMode === "text" && !isCellSign && (
                  <Typography
                    sx={{
                      margin: 0,
                      fontWeight: 500,
                      fontSize: Math.round(cellSize / 2.5),
                      color:
                        defaultGrid && isCellOriginal && highlightDefaultGrid
                          ? theme.palette.grey[600]
                          : theme.palette.secondary.contrastText,
                    }}
                  >
                    {cell !== "0" && cell}
                  </Typography>
                )}

                {((viewMode === "image" && cell !== "0") ||
                  (viewMode === "text" && isCellSign)) && (
                  <img
                    src={getImgPath(cell)}
                    width={isCellSign ? cellSize / 2.5 : cellSize}
                    height={isCellSign ? cellSize / 2.5 : cellSize}
                    alt={`element ${cell}`}
                    style={{
                      objectFit: "fill",
                      opacity:
                        isCellOriginal && highlightDefaultGrid
                          ? 0.5
                          : (isCellActiveNeighbour || isCellActive) &&
                            !isCellSign
                          ? 0.4
                          : 1,
                    }}
                  />
                )}
              </Box>
            );
          })}
        </Box>
      ))}
    </>
  );
});

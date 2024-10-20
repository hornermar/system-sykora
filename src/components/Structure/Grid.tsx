import { Box, Typography } from "@mui/material";
import { map } from "lodash";
import { memo } from "react";
import { Cell, ViewMode } from "../../types/General";
import { getImgPath } from "../../utils/getImgPath";
import { useTheme } from "@mui/material/styles";

type StructureGridProps = {
  grid: string[][];
  cellSize: number;
  defaultGrid?: string[][];
  activeNeighbours?: Cell[];
  activeCell?: Cell;
  handleCellClick?: (x: number, y: number, name: string) => void;
  displayDefaultGrid?: boolean;
  viewMode: ViewMode;
};

export const StructureGrid = memo(function StructureGrid({
  cellSize,
  defaultGrid,
  activeNeighbours,
  activeCell,
  handleCellClick,
  grid,
  displayDefaultGrid,
  viewMode,
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
            const isCellActive = activeCell?.x === x && activeCell?.y === y;
            const isCellEmpty = cell === "0" || cell === "+" || cell === "-";

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
                      ? `1px solid ${theme.palette.secondary.main}`
                      : "initial",
                  backgroundColor: isCellActive
                    ? theme.palette.primary.dark
                    : isCellActiveNeighbour
                    ? theme.palette.primary.light
                    : theme.palette.secondary.light,
                  cursor:
                    handleCellClick && !isCellOriginal ? "pointer" : "unset",
                  zIndex: isCellActive ? 100 : isCellActiveNeighbour ? 50 : 0,
                }}
              >
                {viewMode === "text" && (
                  <Typography
                    sx={{
                      margin: 0,
                      fontWeight: 500,
                      color:
                        defaultGrid && isCellOriginal
                          ? theme.palette.text.disabled
                          : theme.palette.text.primary,
                    }}
                  >
                    {cell !== "0" && cell}
                  </Typography>
                )}

                {viewMode === "image" &&
                  (cell !== "+" && cell !== "-" && cell !== "0" ? (
                    <img
                      src={getImgPath(cell)}
                      width={cellSize}
                      height={cellSize}
                      alt={`element ${cell}`}
                      style={{
                        objectFit: "fill",
                        opacity:
                          isCellOriginal && defaultGrid
                            ? 0.5
                            : isCellActiveNeighbour
                            ? 0.4
                            : 1,
                      }}
                    />
                  ) : (
                    cell !== "0" && (
                      <Typography component="span" sx={{ margin: 0 }}>
                        {cell}
                      </Typography>
                    )
                  ))}
              </Box>
            );
          })}
        </Box>
      ))}
    </>
  );
});

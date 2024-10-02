import { Box, Typography } from "@mui/material";
import { map } from "lodash";
import { memo } from "react";
import { Cell } from "../../types/General";
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
  variant: "image" | "text";
};

export const StructureGrid = memo(function StructureGrid({
  cellSize,
  defaultGrid,
  activeNeighbours,
  activeCell,
  handleCellClick,
  grid,
  displayDefaultGrid,
  variant,
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
                onClick={() => handleCellClick?.(x, y, cell)}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  border: isCellActive
                    ? `1px solid ${theme.palette.secondary.dark}`
                    : isCellActiveNeighbour
                    ? `1px solid ${theme.palette.secondary.dark}`
                    : variant === "text" || isCellEmpty
                    ? `1px solid ${theme.palette.secondary.main}`
                    : "initial",
                  backgroundColor: isCellActive
                    ? theme.palette.secondary.dark
                    : isCellActiveNeighbour
                    ? theme.palette.secondary.main
                    : theme.palette.secondary.light,
                  cursor: handleCellClick ? "pointer" : "unset",
                  zIndex: isCellActive ? 100 : isCellActiveNeighbour ? 50 : 0,
                }}
              >
                {variant === "text" && (
                  <Typography
                    sx={{
                      margin: 0,
                      textDecoration:
                        defaultGrid && isCellOriginal ? "underline" : "none",
                    }}
                  >
                    {cell !== "0" && cell}
                  </Typography>
                )}

                {variant === "image" &&
                  (cell !== "+" && cell !== "-" ? (
                    <img
                      src={getImgPath(cell)}
                      width={cellSize}
                      height={cellSize}
                      alt={`element ${cell}`}
                      style={{
                        objectFit: "fill",
                        opacity:
                          isCellActive || isCellActiveNeighbour ? 0.6 : 1,
                        // border:
                        //   isCellActive || isCellActiveNeighbour
                        //     ? `2px solid ${theme.palette.secondary.main}`
                        //     : "none",
                      }}
                    />
                  ) : (
                    <Typography component="span" sx={{ margin: 0 }}>
                      {cell}
                    </Typography>
                  ))}
              </Box>
            );
          })}
        </Box>
      ))}
    </>
  );
});

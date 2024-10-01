import { Box } from "@mui/material";
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
};

export const StructureGrid = memo(function StructureGrid({
  cellSize,
  defaultGrid,
  activeNeighbours,
  activeCell,
  handleCellClick,
  grid,
  displayDefaultGrid,
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
                    ? `2px solid ${theme.palette.secondary.main}`
                    : isCellActiveNeighbour
                    ? `2px solid ${theme.palette.secondary.main}`
                    : isCellEmpty
                    ? "1px solid #c0c4c4"
                    : "initial",
                  backgroundColor: isCellActive
                    ? theme.palette.secondary.main
                    : isCellActiveNeighbour
                    ? "#f5f2f0"
                    : theme.palette.secondary.light,
                  cursor: handleCellClick ? "pointer" : "unset",
                  zIndex: isCellActive ? 100 : isCellActiveNeighbour ? 50 : 0,
                }}
              >
                {cell !== "+" && cell !== "-" ? (
                  <img
                    src={getImgPath(cell)}
                    width={cellSize}
                    height={cellSize}
                    alt={`element ${cell}`}
                    style={{
                      objectFit: "fill",
                      opacity: isCellActive || isCellActiveNeighbour ? 0.6 : 1,
                      border:
                        isCellActive || isCellActiveNeighbour
                          ? `2px solid ${theme.palette.secondary.main}`
                          : "none",
                    }}
                  />
                ) : (
                  <span>
                    <b>{cell}</b>
                  </span>
                )}
              </Box>
            );
          })}
        </Box>
      ))}
    </>
  );
});

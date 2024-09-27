import { Box } from "@mui/material";
import { map } from "lodash";
import { memo } from "react";
import { Cell } from "../../types/General";
import { getElementImage } from "../../utils/getElementImages";
import {
  // clickableColor,
  primaryColor,
} from "../../pages/Dashboard";

type StructureGridProps = {
  grid: string[][];
  cellSize: number;
  cellType?: "image" | "text";
  defaultGrid?: string[][];
  activeNeighbours?: Cell[];
  activeCell?: Cell;
  handleCellClick: (x: number, y: number) => void;
  color?: string;
  displayDefaultGrid?: boolean;
};

export const StructureGrid = memo(function StructureGrid({
  cellSize,
  cellType,
  defaultGrid,
  activeNeighbours,
  activeCell,
  handleCellClick,
  color,
  grid,
  displayDefaultGrid,
}: StructureGridProps) {
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
                onClick={() => handleCellClick(x, y)}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: `${cellSize}px`,
                  height: `${cellSize}px`,
                  border: isCellActive
                    ? `2px solid ${primaryColor}`
                    : isCellActiveNeighbour
                    ? `2px solid ${primaryColor}`
                    : cellType === "text" || isCellEmpty
                    ? "1px solid black"
                    : "initial",
                  backgroundColor: isCellActive
                    ? primaryColor
                    : isCellActiveNeighbour
                    ? "#f5f2f0"
                    : "transparent",

                  zIndex: isCellActive ? 100 : isCellActiveNeighbour ? 50 : 0,
                }}
              >
                {cellType === "text" && (
                  <span
                    style={{
                      textDecoration:
                        defaultGrid && isCellOriginal ? "underline" : "none",
                    }}
                  >
                    <b>{cell !== "0" && cell}</b>
                  </span>
                )}

                {cellType === "image" &&
                  (cell !== "+" && cell !== "-" ? (
                    <img
                      src={getElementImage(cell)}
                      width={cellSize}
                      height={cellSize}
                      alt={`element ${cell}`}
                      style={{
                        objectFit: "fill",
                        opacity:
                          isCellActive || isCellActiveNeighbour ? 0.6 : 1,
                        border:
                          isCellActive || isCellActiveNeighbour
                            ? `2px solid ${color}`
                            : "none",
                      }}
                    />
                  ) : (
                    <span>
                      <b>{cell}</b>
                    </span>
                  ))}
              </Box>
            );
          })}
        </Box>
      ))}
    </>
  );
});

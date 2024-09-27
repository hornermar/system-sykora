import { Stack, SxProps } from "@mui/material";
import { map } from "lodash";
import { getElementImage } from "../../utils/getElementImages";
import { primaryColor } from "../../pages/Dashboard";

type GridProps = {
  grid: string[][];
  size: number;
  displayName?: boolean;
  sx?: SxProps;
  activeCell?: { x: number; y: number };
};

export const Grid = ({
  grid,
  size,
  displayName,
  sx,
  activeCell,
}: GridProps) => {
  return (
    <>
      {map(grid, (row, y) => (
        <Stack
          flexDirection="row"
          justifyContent="space-between"
          key={y}
          sx={sx}
        >
          {map(row, (cell: string, x) => {
            const isCellActive = activeCell?.x === x && activeCell?.y === y;
            return (
              <div
                key={`${x}${y}`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    height: `${size}px`,
                    marginBottom: !displayName ? "20px" : 0,
                    outline: isCellActive
                      ? `4px solid ${primaryColor}`
                      : "initial",
                  }}
                >
                  <img
                    src={getElementImage(cell)}
                    width={size}
                    height={size}
                    alt={`element ${cell}`}
                  />
                </div>

                {displayName && (
                  <span style={{ marginBottom: "15px" }}>
                    {cell !== "0" ? cell : " "}
                  </span>
                )}
              </div>
            );
          })}
        </Stack>
      ))}
    </>
  );
};

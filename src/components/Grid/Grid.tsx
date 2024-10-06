import { Stack, SxProps, Typography } from "@mui/material";
import { map } from "lodash";
import { getImgPath } from "../../utils/getImgPath";
import { useCallback } from "react";
import { useTheme } from "@mui/material/styles";

const pathMap = (cell: string) => {
  switch (cell) {
    case "x":
      return "/x.svg";
    case "+":
      return "/plus.svg";
    case "-":
      return "/minus.svg";
    default:
      return `/elements/${cell}.svg`;
  }
};

type GridProps = {
  grid: string[][];
  size: number;
  displayName?: boolean;
  sx?: SxProps;
  onCellClick?: (x: number, y: number, name: string) => void;
  activeNames?: string[];
};

export const Grid = ({
  grid,
  size,
  displayName,
  sx,
  onCellClick,
  activeNames,
}: GridProps) => {
  const theme = useTheme();

  const handleCellClick = useCallback(
    (x: number, y: number, name: string) => {
      if (onCellClick && name !== "") {
        onCellClick(x, y, name);
      }
    },
    [onCellClick]
  );

  // const activeCellNames = map(activeCells, ({ name }) => {
  //   if (name === "0") return;
  //   else return name;
  // }).filter(Boolean);

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
            const isCellActive = activeNames?.includes(cell);

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
                    width: `${size}px`,
                    marginBottom: !displayName ? "20px" : 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor:
                      cell === "+" || cell === "-" || cell === "x"
                        ? theme.palette.secondary.dark
                        : "transparent",
                    outline: isCellActive
                      ? `3px solid ${theme.palette.primary.dark}`
                      : "unset",
                  }}
                  onClick={() => handleCellClick?.(x, y, cell)}
                >
                  {cell !== "+" &&
                  cell !== "-" &&
                  cell !== "x" &&
                  cell !== "" ? (
                    <img
                      src={getImgPath(cell)}
                      width={size}
                      height={size}
                      alt={`element ${cell}`}
                      style={{ cursor: "pointer" }}
                    />
                  ) : cell === "" ? (
                    <span>
                      <b>{cell}</b>
                    </span>
                  ) : (
                    <img
                      src={pathMap(cell)}
                      width={size / 2}
                      height={size / 2}
                      alt={`${cell} icon`}
                    />
                  )}
                </div>

                {displayName && (
                  <Typography component="span" style={{ marginBottom: "8px" }}>
                    {cell !== "0" ? cell : " "}
                  </Typography>
                )}
              </div>
            );
          })}
        </Stack>
      ))}
    </>
  );
};

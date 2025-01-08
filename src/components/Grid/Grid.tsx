import { Stack, SxProps, Typography, Box } from "@mui/material";
import { map } from "lodash";
import { getImgPath } from "../../utils/getImgPath";
import { useCallback } from "react";
import { useTheme } from "@mui/material/styles";

const pathMap = (cell: string) => {
  switch (cell) {
    case "+":
      return "/icons/plus.svg";
    case "-":
      return "/icons/minus.svg";
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
              <Box
                key={`${x}${y}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    height: `${size}px`,
                    width: `${size}px`,
                    marginBottom: !displayName ? "20px" : 0,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: isCellActive
                      ? theme.palette.primary.dark
                      : cell === "+" || cell === "-" || cell === "x"
                      ? theme.palette.secondary.dark
                      : "transparent",
                    ":active": {
                      transform: onCellClick ? "scale(1.05)" : "none",
                    },
                    ":hover": {
                      zIndex: onCellClick ? 100 : 0,
                      transform: onCellClick ? "scale(1.05)" : "none",
                    },
                    // opacity: isCellActive ? 0.5 : 1,
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
                      style={{
                        cursor: onCellClick ? "pointer" : "unset",
                        opacity: isCellActive ? 0.4 : 1,
                      }}
                    />
                  ) : cell === "" ? (
                    <Typography component="span">
                      <b>{cell}</b>
                    </Typography>
                  ) : (
                    <img
                      src={pathMap(cell)}
                      width={size / 2.5}
                      height={size / 2.5}
                      alt={`${cell} icon`}
                    />
                  )}
                </Box>

                {displayName && (
                  <Typography
                    component="span"
                    sx={{
                      fontSize: "12px",
                      marginBottom: "6px",
                      color: theme.palette.text.primary,
                      fontWeight: isCellActive ? 600 : 400,
                    }}
                  >
                    {cell !== "0" ? cell : " "}
                  </Typography>
                )}
              </Box>
            );
          })}
        </Stack>
      ))}
    </>
  );
};

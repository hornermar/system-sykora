import { getCellSize } from "../../utils/getCellSize";
import { Box, Stack } from "@mui/material";
import { map, size } from "lodash";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { Cell, ViewMode } from "../../types/General";
import { StructureGrid } from "./Grid";
import { StructureToolbox } from "./Toolbox";
import { Swipe } from "./Swipe";
import { StructureDot } from "./Dot";
import { SxProps, Theme, useMediaQuery, useTheme } from "@mui/system";

export type StructureProps = {
  grid: string[][];
  defaultGrid?: string[][];
  sx?: SxProps<Theme> | undefined;
  onCellClick?: (x: number, y: number, name: string) => void;
  activeCell?: Cell;
  activeNeighbours?: Cell[];
  displayDefaultGrid?: boolean;
  viewMode?: ViewMode;
  isViewModeChangeable?: boolean;
  highlightDefaultGrid?: boolean;
};

export const Structure = memo(function Structure({
  grid,
  defaultGrid,
  sx,
  onCellClick,
  activeCell,
  activeNeighbours,
  displayDefaultGrid,
  viewMode,
  isViewModeChangeable,
  highlightDefaultGrid,
}: StructureProps) {
  const [mode, setMode] = useState<ViewMode>(viewMode ?? "image");
  const [cellSize, setCellSize] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const isSm = useMediaQuery(theme.breakpoints.down("md"));
  const isMd = useMediaQuery(theme.breakpoints.down("lg"));

  const rowsCount = size(grid);
  const columnsCount = Math.max(...map(grid, (row) => size(row)));

  const updateCellSize = useCallback(() => {
    const newCellSize = getCellSize(
      ref,
      columnsCount,
      rowsCount,
      isXs ? "xs" : isSm ? "sm" : isMd ? "md" : "lg"
    );
    setCellSize(Math.floor(newCellSize));
  }, [columnsCount, rowsCount, isXs, isSm, isMd]);

  useEffect(() => {
    setMode(viewMode ?? "image");
  }, [viewMode]);

  useEffect(() => {
    updateCellSize();
  }, [columnsCount, rowsCount, updateCellSize]);

  const handleCellClick = useCallback(
    (x: number, y: number, name: string) => {
      if (onCellClick) {
        onCellClick(x, y, name);
      }
    },
    [onCellClick]
  );

  return (
    <Stack
      flexDirection="column"
      width="100%"
      alignItems="center"
      sx={{
        margin: "0 auto",
        position: "relative",
        ...sx,
      }}
      ref={ref}
    >
      {cellSize > 0 && (
        <>
          {!!onCellClick && <StructureDot />}
          {isViewModeChangeable && <Swipe setViewMode={setMode} />}
          <div id="swipe-container">
            <StructureGrid
              grid={grid}
              cellSize={cellSize}
              defaultGrid={defaultGrid}
              displayDefaultGrid={displayDefaultGrid}
              activeNeighbours={activeNeighbours}
              activeCell={activeCell}
              handleCellClick={onCellClick && handleCellClick}
              viewMode={mode}
              highlightDefaultGrid={highlightDefaultGrid}
              isClickable={!!onCellClick}
            />
          </div>
          <StructureToolbox
            width={cellSize * columnsCount}
            isViewModeChangeable={isViewModeChangeable}
            viewMode={mode}
            setViewMode={setMode}
          />
        </>
      )}

      {cellSize === 0 && rowsCount !== 0 && columnsCount !== 0 && (
        <Box
          sx={{
            width: "100%",
            paddingBottom: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.03)",
          }}
        ></Box>
      )}
    </Stack>
  );
});

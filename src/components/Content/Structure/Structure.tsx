import { useEffect, useCallback, useMemo, useRef } from "react";
import { Structure } from "../../Structure/Structure";
import { useSwitch } from "../../../hooks/useSwitch";
import { ElementSelect } from "../Elements/Select";
import { useStep } from "../../../hooks/useStep";
import { mapGrid } from "../../../utils/mapGrid";
import { set, map, size } from "lodash";
import { Cell } from "../../../types/General";
import { useTheme, useMediaQuery } from "@mui/material";
import { Shape } from "../../../types/Shape";
import { Density } from "../../../types/Density";
import { initialActiveCell } from "../Content";

type ContentStructureProps = {
  defaultGrid: string[][];
  onDefaultGridChange: (newDefaultGrid: string[][]) => void;
  emptyGrid: string[][];
  grid: string[][];
  displayDefaultGrid: boolean;
  group: Density | null;
  shape: Shape | null;
  activeCell: Cell | undefined;
  setActiveCell: (newActiveCell: Cell | undefined) => void;
  slicedGrid: string[][];
};

export const ContentStructure = ({
  defaultGrid,
  onDefaultGridChange,
  emptyGrid,
  grid,
  displayDefaultGrid,
  group,
  shape,
  activeCell,
  setActiveCell,
  slicedGrid,
}: ContentStructureProps) => {
  const { activeStep } = useStep();
  const [openSelect, onOpenSelect, onCloseSelect] = useSwitch(false);
  const isRunningRef = useRef(false);

  const theme = useTheme();
  const isSmallMedia = useMediaQuery(theme.breakpoints.down("lg"));

  const onCellClick = (x: number, y: number, name: string) => {
    setActiveCell({ x, y, name });
  };

  const handleCellSelectOpen = (x: number, y: number, name: string) => {
    onCellClick(x, y, name);
    onOpenSelect();
  };

  const onCellContentChange = (element: string) => {
    const newGrid = [...defaultGrid];
    if (activeCell) {
      set(newGrid, [activeCell.y, activeCell.x], element);
    }

    onDefaultGridChange(newGrid);
    onCloseSelect();
  };

  const handleCellClick =
    activeStep === 1
      ? undefined
      : activeStep === 2 || (activeStep === 8 && displayDefaultGrid)
      ? handleCellSelectOpen
      : activeStep === 6 || activeStep === 7
      ? onCellClick
      : undefined;

  const goThroughGrid = useCallback(() => {
    if (!isRunningRef.current) return;

    mapGrid(
      defaultGrid,
      (x, y) => {
        if (!isRunningRef.current) return;
        const content = defaultGrid[y][x];
        if (content === "0" || content === "-" || content === "+") {
          setActiveCell({ x, y, name: content });
        } else {
          return;
        }
      },
      200,
      () => !isRunningRef.current,
      () => goThroughGrid()
    );
  }, [defaultGrid, setActiveCell]);

  const initializeActiveCell = useCallback(() => {
    mapGrid(
      defaultGrid,
      (x, y) => {
        if (defaultGrid[y][x] === "0") {
          setActiveCell({ x, y });
        }
      },
      undefined,
      (x, y) => defaultGrid[y][x] === "0"
    );
  }, [defaultGrid, setActiveCell]);

  useEffect(() => {
    if (activeStep === 5) {
      setActiveCell(initialActiveCell);
      isRunningRef.current = true;
      goThroughGrid();
    } else {
      isRunningRef.current = false;
    }
    if ((activeStep === 6 || activeStep === 7) && !activeCell) {
      initializeActiveCell();
    }

    return () => {
      isRunningRef.current = false;
    };
  }, [activeStep, goThroughGrid, initializeActiveCell]);

  const activeShapeNeighbours: Cell[] = useMemo(
    () =>
      shape
        ? Object.values(shape.description.neighbours).map(
            (neighbour) => neighbour.position
          )
        : [],
    [shape]
  );

  const averageSteps: number = useMemo(() => size(group?.description), [group]);

  const activeGroupNeighbours: Cell[] = useMemo(
    () =>
      group
        ? map(
            group.description[averageSteps - 1].neighbours,
            (neighbour) => neighbour.position
          )
        : [],
    [group, averageSteps]
  );

  const displayActiveCell =
    activeStep === 5 || activeStep === 6 || activeStep === 7;

  const viewMode = activeStep === 6 ? "text" : "image";
  const highlightDefaultGrid = activeStep === 6 || activeStep === 7;

  const currentGrid =
    activeStep === 1
      ? emptyGrid
      : activeStep === 6 || activeStep === 7
      ? slicedGrid
      : activeStep === 8
      ? grid
      : defaultGrid;

  const currentDefaultGrid =
    activeStep === 6 || activeStep === 7 || activeStep === 8
      ? defaultGrid
      : undefined;

  const isNotVisible =
    (isSmallMedia && (activeStep === 3 || activeStep === 4)) ||
    !activeStep ||
    activeStep === 9;

  if (isNotVisible) return null;

  return (
    <>
      <Structure
        grid={currentGrid}
        defaultGrid={currentDefaultGrid}
        onCellClick={displayActiveCell ? handleCellClick : undefined}
        isViewModeChangeable={activeStep !== 1}
        activeCell={displayActiveCell ? activeCell : undefined}
        viewMode={viewMode}
        highlightDefaultGrid={highlightDefaultGrid}
        displayDefaultGrid={displayDefaultGrid}
        activeNeighbours={
          activeStep === 6
            ? activeGroupNeighbours
            : activeStep === 7
            ? activeShapeNeighbours
            : undefined
        }
      />

      {activeCell && (
        <ElementSelect
          open={openSelect}
          onClose={onCloseSelect}
          activeCell={activeCell}
          onCellChange={onCellContentChange}
        />
      )}
    </>
  );
};

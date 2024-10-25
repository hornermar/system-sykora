import { Structure } from "../../Structure/Structure";
import { useSwitch } from "../../../hooks/useSwitch";
import { ElementSelect } from "../Elements/Select";
import { useStep } from "../../../hooks/useStep";
import { useEffect, useCallback, useMemo } from "react";
import { mapGrid } from "../../../utils/mapGrid";
import { set, map, size } from "lodash";
import { Cell } from "../../../types/General";
import { getSlicedGrid } from "../../../utils/getSlicedGrid";
import { useTheme, useMediaQuery } from "@mui/material";
import { Shape } from "../../../types/Shape";
import { Density } from "../../../types/Density";

type ContentStructureProps = {
  defaultGrid: string[][];
  onDefaultGridChange: (newDefaultGrid: string[][]) => void;
  emptyGrid: string[][];
  grid: string[][];
  displayDefaultGrid: boolean;
  group: Density | null;
  shape: Shape | null;
  activeCell: Cell;
  setActiveCell: (newActiveCell: Cell) => void;
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
}: ContentStructureProps) => {
  const { activeStep } = useStep();
  const [openSelect, onOpenSelect, onCloseSelect] = useSwitch(false);
  // const [isRunning, setIsRunning] = useState(false);

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
      : activeStep === 2 || activeStep === 8
      ? handleCellSelectOpen
      : activeStep === 6 || activeStep === 7
      ? onCellClick
      : undefined;

  // const goThroughGrid = useCallback(() => {
  //   mapGrid(
  //     defaultGrid,
  //     (x, y) => {
  //       const content = defaultGrid[y][x];
  //       if (content === "0" || content === "-" || content === "+") {
  //         setActiveCell({ x, y });
  //       } else {
  //         return;
  //       }
  //     },
  //     200,
  //     undefined,
  //     () => goThroughGrid()
  //   );
  // }, [defaultGrid, setActiveCell]);

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
  }, [defaultGrid]);

  useEffect(() => {
    // if (activeStep === 5) {
    //   setIsRunning(true);
    //   goThroughGrid();
    // }
    if ((activeStep === 6 || activeStep === 7) && !activeCell) {
      initializeActiveCell();
    }
  }, [activeStep]);

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
      ? getSlicedGrid(grid, defaultGrid, activeCell)
      : activeStep === 8
      ? grid
      : defaultGrid;
  const currentDefaultrid =
    activeStep === 6 || activeStep === 7 || activeStep === 8
      ? defaultGrid
      : undefined;

  const isNotVisile =
    (isSmallMedia && (activeStep === 3 || activeStep === 4)) || !activeStep;

  if (isNotVisile) return null;

  return (
    <>
      <Structure
        grid={currentGrid}
        defaultGrid={currentDefaultrid}
        onCellClick={handleCellClick}
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

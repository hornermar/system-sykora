import { Typography } from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { useState, useMemo, useEffect, useCallback } from "react";
import { Cell } from "../../../types/General";
import { getColorDensity } from "../../../utils/getColorDensity";
import { size, map } from "lodash";
import { FormValues } from "../../../types/FormValues";
import { getSlicedGrid } from "../../../utils/getSlicedGrid";
import { mapGrid } from "../../../utils/mapGrid";
import { CalculationGroup } from "./Group/Group";
import { CalculationShape } from "./Shape/Shape";
import { getShape } from "../../../utils/getShape";
import { Shape } from "../../../types/Shape";
import { Density } from "../../../types/Density";
import { useSwitch } from "../../../hooks/useSwitch";
import { CalculationGroupDialog } from "./Group/Dialog";

type GroupProps = {
  grid: string[][];
  defaultGrid: string[][];
  form: FormValues;
  part: "group" | "shape";
};

const cellsToProcess = ["0", "+", "-"];

export const Calculation = ({ grid, defaultGrid, form, part }: GroupProps) => {
  const [activeCell, setActiveCell] = useState<Cell>({ x: 0, y: 0 });
  const [openDialog, onOpenDialog, onCloseDialog] = useSwitch(false);

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
    initializeActiveCell();
  }, []);

  const onCellClick = useCallback(
    (x: number, y: number) => {
      if (!defaultGrid || !cellsToProcess) return;

      const cellValue = defaultGrid[y]?.[x];
      if (cellValue && cellsToProcess.includes(cellValue)) {
        setActiveCell({ x, y });
      }
    },
    [defaultGrid]
  );

  const slicedGrid: string[][] = useMemo(
    () => getSlicedGrid(grid, defaultGrid, activeCell),
    [grid, defaultGrid, activeCell]
  );

  const cellContent: string = useMemo(
    () => defaultGrid[activeCell.y][activeCell.x],
    [activeCell, defaultGrid]
  );

  const group: Density = useMemo(
    () =>
      getColorDensity(slicedGrid, activeCell.x, activeCell.y, form.coefficient),
    [slicedGrid, activeCell, form.coefficient]
  );

  const averageSteps: number = useMemo(() => size(group.description), [group]);

  const activeGroupNeighbours: Cell[] = useMemo(
    () =>
      map(
        group.description[averageSteps - 1].neighbours,
        (neighbour) => neighbour.position
      ),
    [group, averageSteps]
  );

  const shape: Shape = useMemo(
    () => getShape(grid, activeCell.x, activeCell.y, group.result, form.rule!),
    [grid, activeCell, group.result, form.rule]
  );

  const activeShapeNeighbours: Cell[] = useMemo(
    () =>
      Object.values(shape.description.neighbours).map(
        (neighbour) => neighbour.position
      ),
    [shape]
  );

  return (
    <>
      {part === "group" && (
        <>
          <Typography variant="body1">
            Před výběrem elementu pro pole nejprve algoritmus zmenší rozshah
            výběru z 20 elementů na konktétní skupinu (1, 2, 3 nebo 4).
          </Typography>
          <Typography variant="body1">
            Při jejím zjišťování prochází sousedící elementy, které se s polem
            dotýkají stranou i rohy.
          </Typography>
        </>
      )}

      {part === "shape" && (
        <Typography variant="body1">
          Při konečném výběru ze skupiny zkoumá algoritmus elementy, které s
          polem sousedí stranami.
        </Typography>
      )}

      <Structure
        grid={slicedGrid}
        defaultGrid={defaultGrid}
        onCellClick={onCellClick}
        activeCell={activeCell}
        activeNeighbours={
          part === "group" ? activeGroupNeighbours : activeShapeNeighbours
        }
        viewMode={part === "group" ? "text" : "image"}
        sx={{ margin: "15px 0" }}
        isViewModeChangeable
        highlightDefaultGrid
      />

      {part === "group" && (
        <CalculationGroup
          form={form}
          group={group}
          cellContent={cellContent}
          onOpenDialog={onOpenDialog}
        />
      )}

      {part === "shape" && (
        <CalculationShape
          form={form}
          shape={shape}
          onOpenDialog={onOpenDialog}
          group={group}
        />
      )}

      <CalculationGroupDialog
        open={openDialog}
        onClose={onCloseDialog}
        group={group}
      />
    </>
  );
};

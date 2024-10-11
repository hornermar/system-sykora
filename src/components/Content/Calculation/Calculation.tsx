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

type GroupProps = {
  grid: string[][];
  defaultGrid: string[][];
  form: FormValues;
  part: "group" | "shape";
};

const cellsToProcess = ["0", "+", "-"];

export const Calculation = ({ grid, defaultGrid, form, part }: GroupProps) => {
  const [activeCell, setActiveCell] = useState<Cell>({ x: 0, y: 0 });

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
        <Typography variant="body1">
          Při zjišťování skupiny algoritmus prochází sousedící prvky, které se s
          prvkem dotýkají stranou i rohy.
          {/* Místo obrázků těd vidíte názvy prvků. */}
        </Typography>
      )}

      {part === "shape" && (
        <Typography variant="body1">
          Při výběru natočení zkoumá sousední elementy (dotýkající se pouze
          stranou stranou) a jejich vlastnosti. Těmi jsou barva (černá / bílá) a
          tvar na sousedící straně (ano / ne).
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
      />

      {part === "group" && (
        <CalculationGroup form={form} group={group} cellContent={cellContent} />
      )}

      {part === "shape" && <CalculationShape form={form} shape={shape} />}
    </>
  );
};

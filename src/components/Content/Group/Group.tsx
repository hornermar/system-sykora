import { Typography } from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { useState, useMemo, useEffect } from "react";
import { Cell } from "../../../types/General";
import { getColorDensity } from "../../../utils/getColorDensity";
import { size, map } from "lodash";
import { FormValues } from "../../../types/FormValues";
import { getSlicedGrid } from "../../../utils/getSlicedGrid";
import { GroupCalculation } from "./Calculation";
import { Label } from "../../common/Label/Label";
import { mapGrid } from "../../../utils/mapGrid";

type GroupProps = {
  grid: string[][];
  defaultGrid: string[][];
  form: FormValues;
};

const cellsToProcess = ["0", "+", "-"];

export const Group = ({ grid, defaultGrid, form }: GroupProps) => {
  const [activeCell, setActiveCell] = useState<Cell>({ x: 0, y: 0 });

  useEffect(() => {
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
  }, []);

  const onCellClick = (x: number, y: number) => {
    if (!defaultGrid || !cellsToProcess) return;

    const cellValue = defaultGrid[y]?.[x];
    if (cellValue && cellsToProcess.includes(cellValue)) {
      setActiveCell({ x, y });
    }
  };

  const slicedGrid = useMemo(
    () => getSlicedGrid(grid, defaultGrid, activeCell),
    [grid, defaultGrid, activeCell]
  );

  const group = useMemo(
    () =>
      getColorDensity(slicedGrid, activeCell.x, activeCell.y, form.coefficient),
    [slicedGrid, activeCell, form.coefficient]
  );

  const averageSteps = useMemo(() => size(group.description), [group]);

  const activeNeighbours = useMemo(
    () =>
      map(
        group.description[averageSteps - 1].neighbours,
        (neighbour) => neighbour.position
      ),
    [group, averageSteps]
  );

  return (
    <>
      <Typography variant="body1">
        Při zjišťování skupiny algoritmus prochází sousedící prvky, které se s
        prvkem dotýkají stranou i rohy. Místo obrázků těd vidíte názvy prvků.
      </Typography>

      <Structure
        grid={slicedGrid}
        defaultGrid={defaultGrid}
        onCellClick={onCellClick}
        activeCell={activeCell}
        activeNeighbours={activeNeighbours}
        variant="text"
        sx={{ margin: "15px 0" }}
      />

      <Typography variant="body1">
        Vypočítá průměr ze skupin, do kterých tyto prvky patří:
      </Typography>

      <GroupCalculation
        defaultGrid={slicedGrid}
        cell={activeCell}
        group={group}
        form={form}
      />

      <Typography variant="body1">Vybere nejbližší skupinu prvků:</Typography>

      <Label value={group.result.toLocaleString("cs-CZ")} />
    </>
  );
};

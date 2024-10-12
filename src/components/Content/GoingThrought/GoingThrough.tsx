import { Typography } from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { Cell } from "../../../types/General";
import { useState, useEffect, useMemo } from "react";
import { mapGrid } from "../../../utils/mapGrid";
import { getSlicedGrid } from "../../../utils/getSlicedGrid";

type GoingThroughProps = {
  defaultGrid: string[][];
  grid: string[][];
};

export const GoingThrough = ({ defaultGrid, grid }: GoingThroughProps) => {
  const [sliceFromCell, setSliceFromCell] = useState<Cell>({ x: 0, y: 0 });

  useEffect(() => {
    mapGrid(
      defaultGrid,
      (x, y) => {
        setSliceFromCell({ x, y });
      },
      90,
      undefined,
      () => setSliceFromCell((prev) => ({ x: prev.x, y: prev.y + 1 }))
    );
  }, []);

  const slicedGrid = useMemo(
    () => getSlicedGrid(grid, defaultGrid, sliceFromCell),
    [grid, defaultGrid, sliceFromCell]
  );

  return (
    <>
      <Typography variant="body1">
        Výpočet začíná v levém horním rohu. Postupuje po buňce zleva doprava v
        lichých řadách a zprava doleva v sudých.
      </Typography>

      <Structure grid={slicedGrid} />
    </>
  );
};

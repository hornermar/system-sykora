import { Typography } from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { Cell } from "../../../types/General";
import { useState, useEffect } from "react";
import { mapGrid } from "../../../utils/mapGrid";

type GoingThroughProps = {
  defaultGrid: string[][];
  grid: string[][];
};

export const GoingThrough = ({ defaultGrid }: GoingThroughProps) => {
  const [activeCell, setActiveCell] = useState<Cell>({ x: 0, y: 0 });
  // const [sliceFromCell, setSliceFromCell] = useState<Cell>({ x: 0, y: 0 });

  useEffect(() => {
    mapGrid(
      defaultGrid,
      (x, y) => {
        const content = defaultGrid[y][x];
        if (content === "0" || content === "-" || content === "+")
          setActiveCell({ x, y });
        else return;
      },
      200,
      undefined
    );
  }, []);

  // useEffect(() => {
  //   mapGrid(
  //     defaultGrid,
  //     (x, y) => {
  //       setSliceFromCell({ x, y });
  //     },
  //     90,
  //     undefined,
  //     () => setSliceFromCell((prev) => ({ x: prev.x, y: prev.y + 1 }))
  //   );
  // }, []);

  // const slicedGrid = useMemo(
  //   () => getSlicedGrid(grid, defaultGrid, sliceFromCell),
  //   [grid, defaultGrid, sliceFromCell]
  // );

  return (
    <>
      <Typography variant="body1">
        Výpočet algoritmu začíná v levém horním rohu. Postupuje po buňce zleva
        doprava v lichých řadách a zprava doleva v sudých.
      </Typography>

      <Structure grid={defaultGrid} activeCell={activeCell} />
    </>
  );
};

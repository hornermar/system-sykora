import { Typography } from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { Cell } from "../../../types/General";
import { useState, useEffect } from "react";
import { mapGrid } from "../../../utils/mapGrid";

type GoingThroughProps = {
  defaultGrid: string[][];
  grid: string[][];
};

const initializeActiveCell = { x: 0, y: 0 };

export const GoingThrough = ({ defaultGrid }: GoingThroughProps) => {
  const [activeCell, setActiveCell] = useState<Cell>(initializeActiveCell);

  const goThroughGrid = () => {
    mapGrid(
      defaultGrid,
      (x, y) => {
        const content = defaultGrid[y][x];
        if (content === "0" || content === "-" || content === "+")
          setActiveCell({ x, y });
        else return;
      },
      200,
      undefined,
      () => goThroughGrid()
    );
  };

  useEffect(() => {
    goThroughGrid();
  }, []);

  return (
    <>
      <Typography variant="body1">
        A teď už strukturu přebírá algoritmus. Postupně dopočítává pole, která
        zůstala prázdná.
      </Typography>

      <Typography variant="body1">
        Počítat začíná v levém horním rohu a postupuje po buňce zleva doprava v
        lichých řadách a zprava doleva v sudých.
      </Typography>

      <Structure grid={defaultGrid} activeCell={activeCell} />
    </>
  );
};

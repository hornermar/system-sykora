import { Typography } from "@mui/material";
import { Structure } from "../../Structure/Structure";

type GoingThroughProps = {
  defaultGrid: string[][];
  grid: string[][];
};

export const GoingThrough = ({ defaultGrid, grid }: GoingThroughProps) => {
  return (
    <>
      <Typography variant="body1">
        Algoritmus začíná počítat v levém horním rohu. Postupuje zleva doprava v
        lichých řadách a zprava doleva v sudých.
      </Typography>

      <Structure grid={defaultGrid} />
    </>
  );
};

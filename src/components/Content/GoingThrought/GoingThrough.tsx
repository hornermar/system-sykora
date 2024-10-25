import { Typography } from "@mui/material";

export const GoingThrough = () => {
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
    </>
  );
};

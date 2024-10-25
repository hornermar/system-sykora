import { Box, Typography, Chip } from "@mui/material";
import { exampleGrid } from "../../../lib/grids";
import { FormValues } from "../../../types/FormValues";

function getSubGrid(
  grid: string[][],
  rows: number,
  columns: number
): string[][] {
  return grid.slice(0, rows).map((row) => row.slice(0, columns));
}

type ElementsProps = {
  onDefaultGridChange: (newDefaultGrid: string[][]) => void;
  setEmptyGrid: () => void;
  form: FormValues;
};

export const Elements = ({
  onDefaultGridChange,
  setEmptyGrid,
  form,
}: ElementsProps) => {
  const setTemplate = () => {
    onDefaultGridChange(getSubGrid(exampleGrid, form.rows, form.columns));
  };

  return (
    <>
      <Typography variant="body1">
        Aby bylo možné strukturu dopočítat, je potřeba do mřížky umístit několik
        výchozích elementů (množství je na tobě).
      </Typography>

      <Typography variant="body1">
        Na výběr máš z 20 elementů. Jsou rozděleny do skupin <b>1</b>, <b>2</b>,{" "}
        <b>3</b> a <b>4</b> podle poměru bílá-černá (1 je nejsvětlejší, 4
        nejtmavší). Písmena <b>z</b>, <b>b</b>, <b>y</b>, <b>i</b>, <b>r</b>,{" "}
        <b>d</b> označují natočení.
      </Typography>

      <Typography variant="body1">
        Do míst, kde si přeješ urychlit nebo zpomalit přechody barev, přidej
        znaménka <b>+</b> nebo <b>-</b>.
      </Typography>
      <Box
        sx={{
          marginBottom: "10px",
        }}
      >
        <Chip
          label={"Použít šablonu"}
          onClick={setTemplate}
          size="small"
          sx={{ marginRight: "10px" }}
        />

        <Chip
          label={"Smazat vše"}
          onClick={setEmptyGrid}
          size="small"
          sx={{ marginRight: "10px" }}
        />
      </Box>
    </>
  );
};

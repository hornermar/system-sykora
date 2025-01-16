import { Box, Typography, Chip, Rating } from "@mui/material";
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
  filledCells: number;
  onDefaultGridChange: (newDefaultGrid: string[][]) => void;
  setEmptyGrid: () => void;
  form: FormValues;
};

export const Elements = ({
  filledCells,
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
        Teď do mřížky umísti několik elementů.
      </Typography>

      <Typography variant="body1">
        Na výběr máš z <b>20</b>. Jsou rozděleny do skupin <b>1</b>, <b>2</b>,{" "}
        <b>3</b> a <b>4</b> podle poměru bílá-černá (1 je nejsvětlejší, 4
        nejtmavší). Písmena <b>z</b>, <b>b</b>, <b>y</b>, <b>i</b>, <b>r</b>,{" "}
        <b>d</b> označují natočení.
      </Typography>

      <Typography variant="body1">
        Do míst, kde si přeješ urychlit nebo zpomalit přechody barev, přidej
        znaménka <b>+</b> nebo <b>-</b>.
      </Typography>

      <Typography variant="body1">
        Pro postup vyplň alespoň <b>5</b> buněk:
      </Typography>

      <Rating
        name="simple-controlled"
        value={filledCells}
        readOnly
        max={5}
        icon={
          <img
            src={"/icons/circle-check.svg"}
            width={25}
            height={25}
            alt={"circle check icon"}
            style={{ marginRight: "5px" }}
          />
        }
        emptyIcon={
          <img
            src={"/icons/circle-empty.svg"}
            width={25}
            height={25}
            alt={"circle icon"}
            style={{ marginRight: "5px" }}
          />
        }
      />

      <Box
        sx={{
          margin: "20px 0 10px",
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

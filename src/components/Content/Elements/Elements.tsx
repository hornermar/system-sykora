import { useCell } from "../../../hooks/useCell";
import { Structure } from "../../Structure/Structure";
import { ElementsDialog } from "./Dialog";
import { Box, Typography, Chip } from "@mui/material";
import { useSwitch } from "../../../hooks/useSwitch";
import { ElementSelect } from "./Select";
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
  defaultGrid: string[][];
  setDefaultGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  setEmptyGrid: () => void;
  form: FormValues;
};

export const Elements = ({
  defaultGrid,
  setDefaultGrid,
  setEmptyGrid,
  form,
}: ElementsProps) => {
  const [openDialog, onOpenDialog, onCloseDialog] = useSwitch(false);
  const [openSelect, onOpenSelect, onCloseSelect] = useSwitch(false);

  const { activeCell, onCellClick, onCellChange } = useCell({
    onOpenSelect,
    setDefaultGrid,
  });

  const setTemplate = () => {
    setDefaultGrid(getSubGrid(exampleGrid, form.rows, form.columns));
  };

  return (
    <>
      <Typography variant="body1">
        Aby bylo možné strukturu dopočítat algoritmem, je potřeba v mřížce
        vyplnit některá pole. Na výběr máš z 20 prvků, které určí základ
        struktury.
      </Typography>

      <Typography variant="body1">
        Podrobný popis prvků najdeš{" "}
        <b onClick={onOpenDialog}>
          <u>tady</u>
        </b>
        .
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

      <Structure
        grid={defaultGrid}
        onCellClick={onCellClick}
        tooltip="Kliknutím do vybraného pole se otevře nabídka."
        isViewModeChangeable
      />

      {activeCell && (
        <ElementSelect
          open={openSelect}
          onClose={onCloseSelect}
          activeCell={activeCell}
          onCellChange={onCellChange}
        />
      )}

      <ElementsDialog open={openDialog} onClose={onCloseDialog} />
    </>
  );
};

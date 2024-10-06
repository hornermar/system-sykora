import { useState } from "react";
import { Structure } from "../../Structure/Structure";
import { ElementsDialog } from "./Dialog";
import { Box, Typography, Chip } from "@mui/material";
import { useSwitch } from "../../../hooks/useSwitch";
import { ElementSelect } from "./Select";
import { set } from "lodash";
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
  const [activeCell, setActiveCell] = useState<{
    x: number;
    y: number;
    name: string;
  } | null>(null);
  const [openDialog, onOpenDialog, onCloseDialog] = useSwitch(false);
  const [openSelect, onOpenSelect, onCloseSelect] = useSwitch(false);

  const onCellClick = (x: number, y: number, name: string) => {
    setActiveCell({ x, y, name });
    onOpenSelect();
  };

  const onCellChange = (element: string) => {
    setDefaultGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      set(newGrid, [activeCell!.y, activeCell!.x], element);
      return newGrid;
    });
  };

  const setTemplate = () => {
    setDefaultGrid(
      getSubGrid(exampleGrid, form.structure.rows, form.structure.columns)
    );
  };

  return (
    <>
      <Typography variant="body1">
        Aby bylo možné strukturu dopočítat algoritmem, je potřeba v mřížce
        vyplnit některá pole. Na výběr máte z 20 prvků, které určí základ vaší
        struktury.
      </Typography>
      <Typography variant="body1">
        Do míst, kde si přejete urychlit nebo zpomalit přechody barev, přidejte
        znaménka <b>+</b> nebo <b>-</b>.
      </Typography>

      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        Kliknutím do vybraného pole se vám otevře nabídka.
      </Typography>
      <Box
        sx={{
          marginBottom: "10px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "right",
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
        sx={{ marginBottom: "20px" }}
      />

      {activeCell && (
        <ElementSelect
          open={openSelect}
          onClose={onCloseSelect}
          activeCell={activeCell}
          onCellChange={onCellChange}
        />
      )}

      <Typography variant="body1">
        Jak jednotlivé prvky vznikly můžete zjistit{" "}
        <span onClick={onOpenDialog} style={{ textDecoration: "underline" }}>
          tady
        </span>
        .
      </Typography>

      <ElementsDialog open={openDialog} onClose={onCloseDialog} />
    </>
  );
};
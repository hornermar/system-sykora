import { useState } from "react";
import { Structure } from "../Structure/Structure";
import { ElementsDialog } from "./Dialog";
import { Box, Typography, Chip } from "@mui/material";
import { useSwitch } from "../../hooks/useSwitch";
import { ElementSelect } from "./Select";
import { set } from "lodash";
import { exampleGrid } from "../../lib/grids";
import { FormValues } from "../../types/FormValues";

type ElementsProps = {
  grid: string[][];
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  setEmptyGrid  : () => void;
  form: FormValues;
};

function getSubGrid(grid: string[][], rows: number, columns: number): string[][] {
  return grid.slice(0, rows).map(row => row.slice(0, columns));
}

export const Elements = ({ grid, setGrid, setEmptyGrid, form }: ElementsProps) => {
  const [activeCell, setActiveCell] = useState<{ x: number; y: number } | null>(
    null
  );
  const [openDialog, onOpenDialog, onCloseDialog] = useSwitch(false);
  const [openSelect, onOpenSelect, onCloseSelect] = useSwitch(false);

  const onCellClick = (x: number, y: number) => {
    setActiveCell({ x, y });
    onOpenSelect();
  };

  const onCellChange = (element: string) => {
    setGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      set(newGrid, [activeCell!.y, activeCell!.x], element);
      return newGrid;
    });
  };

  const setTemplate = () => {

    setGrid(getSubGrid(exampleGrid, form.structure.rows, form.structure.columns));
  }

  return (
    <>
      <Typography variant="body1">
        Aby bylo možné strukturu dopočítat algoritmem, je potřeba v mřížce
        vyplnit některá pole. Kliknutím do jednotlivých polí se vám otevře
        nabídka s možnými{" "}
        <span onClick={onOpenDialog} style={{ textDecoration: "underline" }}>
          prvky
        </span>
        .
      </Typography>

      <ElementsDialog open={openDialog} onClose={onCloseDialog} />

      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        Do míst, kde si přejete urychlit nebo zpomalit přechody barev, přidejte
        znaménka <b>+</b> nebo <b>-</b>.
      </Typography>

      <Box sx={{ marginBottom: "10px", display: "flex", flexDirection: "row", justifyContent: "right" }} >
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

      <Structure grid={grid} onCellClick={onCellClick} />

      <ElementSelect
        open={openSelect}
        onClose={onCloseSelect}
        activeCell={activeCell}
        onCellChange={onCellChange}
      />
    </>
  );
};

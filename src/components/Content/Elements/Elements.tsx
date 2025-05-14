import { Typography } from "@mui/material";
import { useEffect } from "react";

import { exampleGrid } from "../../../lib/grids";
import { FormValues } from "../../../types/FormValues";
import { useSwitch } from "../../../hooks/useSwitch";
import { ElementsProgress } from "./Progress";
import { ElementSelect } from "./Select";

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
  areInputsEditable: boolean;
};

export const Elements = ({
  filledCells,
  onDefaultGridChange,
  setEmptyGrid,
  form,
  areInputsEditable,
}: ElementsProps) => {
  const [openElements, onOpenElements, onCloseElements] = useSwitch();

  const setTemplate = () => {
    onDefaultGridChange(getSubGrid(exampleGrid, form.rows, form.columns));
  };

  useEffect(() => {
    if (!areInputsEditable) {
      setTemplate();
    }
  }, []);

  return (
    <>
      <Typography variant="body1">
        {areInputsEditable
          ? "Teď do mřížky umísti několik elementů."
          : "Poté do mřížky umístí libovolný počet elementů."}
      </Typography>

      <Typography variant="body1">
        {areInputsEditable ? (
          <>
            Na výběr máš z <b>20</b>. Jsou rozděleny do skupin <b>1</b>,{" "}
            <b>2</b>, <b>3</b> a <b>4</b> podle poměru bílá-černá (1 je
            nejsvětlejší, 4 nejtmavší). Písmena <b>z</b>, <b>b</b>, <b>y</b>,{" "}
            <b>i</b>, <b>r</b>, <b>d</b> označují natočení.
          </>
        ) : (
          <>
            <span onClick={onOpenElements} className="underline">
              Na výběr má z 20
            </span>
            . Jsou rozděleny do skupin <b>1</b>, <b>2</b>, <b>3</b> a <b>4</b>{" "}
            podle poměru bílá-černá (1 jsou nejsvětlejší, 4 nejtmavší). Písmena{" "}
            <b>z</b>, <b>b</b>, <b>y</b>, <b>i</b>, <b>r</b>, <b>d</b> označují
            natočení.
          </>
        )}
      </Typography>

      <ElementSelect open={openElements} onClose={onCloseElements} />

      <Typography variant="body1">
        {areInputsEditable ? (
          <>
            Do míst, kde si přeješ urychlit nebo zpomalit přechody barev, přidej
            znaménka <b>+</b> nebo <b>-</b>.
          </>
        ) : (
          <>
            Do míst, kde si přeje urychlit nebo zpomalit přechody barev, přidá
            znaménka <b>+</b> nebo <b>-</b>.
          </>
        )}
      </Typography>

      {areInputsEditable && (
        <ElementsProgress
          setEmptyGrid={setEmptyGrid}
          filledCells={filledCells}
          setTemplate={setTemplate}
        />
      )}
    </>
  );
};

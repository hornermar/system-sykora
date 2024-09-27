import { Structure } from "../Structure/Structure";
import { ElementsDialog } from "./Dialog";
import { Button } from "@mui/material";
import { useSwitch } from "../../hooks/useSwitch";

type ElementsProps = {
  grid: string[][];
};

export const Elements = ({ grid }: ElementsProps) => {
  const [open, onOpen, onClose] = useSwitch(false);

  return (
    <>
      <p>
        Aby bylo možné strukturu dopočítat algoritmem, je potřeba v mřížce
        vyplnit některá pole. Kliknutím do jednotlivých polí se vám otevře
        nabídka s možnými prvky.
      </p>
      <Button onClick={onOpen}>Více info</Button>
      <ElementsDialog open={open} onClose={onClose} />

      <p>
        Do míst, kde si přejete urychlit nebo zpomalit přechody barev, přidejte
        znaménka <b>+</b> nebo <b>-</b>.
      </p>

      <Structure grid={grid} cellType="image" />
    </>
  );
};

import { Dialog } from "../common/Dialog/Dialog";
import { allElementsByGroupGrid } from "../../lib/grids";
import { Grid } from "../Grid/Grid";

type ElementsSelectProps = {
  open: boolean;
  onClose: () => void;
  activeCell: { x: number; y: number } | null;
  onCellChange: (element: string) => void;
};

const size = 40;

export const ElementSelect = ({
  open,
  onClose,
  onCellChange,
}: ElementsSelectProps) => {
  const onCellClick = (_x: number, _y: number, element: string) => {
    onCellChange(element === "x" ? "0" : element);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} title="Zvol jeden z prvků">
      <Grid
        grid={[["x", "+", "-", ""]]}
        size={size}
        onCellClick={onCellClick}
      />
      <Grid
        grid={allElementsByGroupGrid}
        size={size}
        onCellClick={onCellClick}
      />
    </Dialog>
  );
};

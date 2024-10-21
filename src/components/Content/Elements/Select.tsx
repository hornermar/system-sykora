import { Dialog } from "../../common/Dialog/Dialog";
import { allElementsByGroupGrid } from "../../../lib/grids";
import { Grid } from "../../Grid/Grid";
import { Button } from "@mui/material";
import { Cell } from "../../../types/General";

type ElementsSelectProps = {
  open: boolean;
  onClose: () => void;
  onCellChange: (element: string) => void;
  activeCell: Cell;
};

const size = 40;

export const ElementSelect = ({
  open,
  onClose,
  onCellChange,
  activeCell,
}: ElementsSelectProps) => {
  const onClick = (
    _x: number | undefined,
    _y: number | undefined,
    element: string
  ) => {
    onCellChange(element === "x" ? "0" : element);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Vyber obsah buňky"
      sx={{ paddingBottom: "4px" }}
    >
      <Button
        variant="contained"
        onClick={() => onClick(undefined, undefined, "0")}
        endIcon={
          <img
            src={
              activeCell.name === "0" ? "/icons/xDisabled.svg" : "/icons/x.svg"
            }
            width={size / 2.5}
            height={size / 2.5}
            alt={"x icon"}
          />
        }
        sx={{ marginBottom: "20px" }}
        color="secondary"
        disabled={activeCell.name === "0"}
      >
        Smazat
      </Button>
      <Grid
        grid={allElementsByGroupGrid}
        size={size}
        onCellClick={onClick}
        activeNames={[activeCell.name!]}
      />

      <Grid
        grid={[["+", "-", "", ""]]}
        size={size}
        onCellClick={onClick}
        activeNames={[activeCell.name!]}
      />
    </Dialog>
  );
};

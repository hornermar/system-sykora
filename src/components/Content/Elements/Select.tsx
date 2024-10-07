import { Dialog } from "../../common/Dialog/Dialog";
import { allElementsByGroupGrid } from "../../../lib/grids";
import { Grid } from "../../Grid/Grid";
import { Button } from "@mui/material";

type ElementsSelectProps = {
  open: boolean;
  onClose: () => void;
  onCellChange: (element: string) => void;
  activeCell: { x: number; y: number; name: string };
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
    <Dialog open={open} onClose={onClose} title="Zvol prvek nebo znaménko">
      <Button
        variant="contained"
        onClick={() => onClick(undefined, undefined, "0")}
        endIcon={
          <img
            src={
              activeCell.name === "0" ? "/icons/xDisabled.svg" : "/icons/x.svg"
            }
            width={20}
            height={20}
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
        activeNames={[activeCell.name]}
      />

      <Grid
        grid={[["+", "-", "", ""]]}
        size={size}
        onCellClick={onClick}
        activeNames={[activeCell.name]}
      />
    </Dialog>
  );
};

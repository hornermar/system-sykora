import { Dialog } from "../../common/Dialog/Dialog";
import { allElementsByGroupGrid } from "../../../lib/grids";
import { Grid } from "../../Grid/Grid";
import { Button } from "@mui/material";
import { Cell } from "../../../types/General";
import { useTheme, useMediaQuery } from "@mui/material";

type ElementsSelectProps = {
  open: boolean;
  onClose: () => void;
  onCellChange: (element: string) => void;
  activeCell: Cell;
};

export const ElementSelect = ({
  open,
  onClose,
  onCellChange,
  activeCell,
}: ElementsSelectProps) => {
  const theme = useTheme();
  const isSmallMedia = useMediaQuery(theme.breakpoints.down("lg"));

  const size = isSmallMedia ? 40 : 60;

  const onClick = (
    _x: number | undefined,
    _y: number | undefined,
    element: string
  ) => {
    onCellChange(element);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title="Vyber obsah buňky"
      sx={{ paddingBottom: "0px" }}
    >
      <Grid
        grid={allElementsByGroupGrid}
        size={size}
        onCellClick={onClick}
        activeNames={[activeCell.name!]}
        displayName
      />

      <Grid
        grid={[["+", "-", "", ""]]}
        size={size}
        onCellClick={onClick}
        activeNames={[activeCell.name!]}
      />

      <Button
        variant="contained"
        color="secondary"
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
        sx={{
          marginBottom: "20px",
          height: `${size}px`,
          width: `${size * 2 + 22}px`,
          borderRadius: "0px ",
          marginTop: `-${size + 40}px`,
          marginLeft: `${size * 2 + 44}px`,
        }}
        disabled={activeCell.name === "0"}
        disableRipple
      >
        Smazat
      </Button>
    </Dialog>
  );
};

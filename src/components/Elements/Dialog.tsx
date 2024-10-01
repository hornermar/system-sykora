import { Grid } from "../Grid/Grid";
import { Dialog } from "../common/Dialog/Dialog";
import { Typography, Stack } from "@mui/material";
import { map } from "lodash";
import { allElementsGrid } from "../../lib/grids";

type ElementsDialogProps = {
  open: boolean;
  onClose: () => void;
};

const basicElements = ["2z", "4z", "4r"];
const smallSize = 35;

export const ElementsDialog = ({ open, onClose }: ElementsDialogProps) => {
  return (
    <Dialog title="Jak prvky vznikly?" open={open} onClose={onClose} fullScreen>
      <Typography variant="body1">
        Všechny prvky vycházejí ze 3 základních obrazců — jeden nebo dva
        půlkruhy umístěné do čtverce. Ty jsou buď za sebou nebo proti sobě.
      </Typography>

      <Stack
        flexDirection="row"
        gap={3}
        justifyContent="center"
        sx={{ margin: "15px 0" }}
      >
        {map(basicElements, (el: string) => (
          <img
            width={smallSize}
            height={smallSize}
            src={`/elements/${el}.svg`}
            alt={`element ${el}`}
            key={el}
          />
        ))}
      </Stack>

      <Typography variant="body1" sx={{ marginBottom: "15px" }}>
        Jejich otočením a prohozením barev vznikne 20 různých prvků. Jsou
        rozděleny do skupin 1, 2, 3 a 4 podle poměru barev černá-bílá (1 je
        nejsvětlejší, 4 nejtmavší). Písmena v názvech určují natočení.
      </Typography>

      <Grid grid={allElementsGrid} size={smallSize} displayName />
    </Dialog>
  );
};

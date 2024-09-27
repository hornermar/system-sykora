import { Grid } from "../Grid/Grid";
import { Dialog } from "../common/Dialog/Dialog";
import { Stack, Button } from "@mui/material";
import { SeparateElement } from "./SeparateElement";
import { useState } from "react";
import { primaryColor } from "../../pages/Dashboard";

type ElementsDialogProps = {
  open: boolean;
  onClose: () => void;
};

const allElements = [
  ["1z", "1r", "2z", "3z", "4z", "4r"],
  ["1b", "1d", "2b", "3b", "4b", "4d"],
  ["1y", "0", "2y", "3y", "4y", "0"],
  ["1i", "0", "2r", "3r", "4i", "0"],
];

const smallSize = 35;
const largeSize = 55;

export const ElementsDialog = ({ open, onClose }: ElementsDialogProps) => {
  const [whiteBlack, setWhiteBlack] = useState(false);
  return (
    <Dialog title="Detail prvků" open={open} onClose={onClose}>
      <p>
        Prvky jsou složeny ze 3 základních obrazců. Do čtverce jsou umístěny
        jeden nebo dva půlkruhy (za sebou nebo proti sobě).
      </p>

      <Stack direction="row" justifyContent="space-between">
        <SeparateElement name={!whiteBlack ? "1z" : "4z"} size={largeSize} />

        <SeparateElement name={!whiteBlack ? "1r" : "4r"} size={largeSize} />

        <SeparateElement name={!whiteBlack ? "3z" : "2z"} size={largeSize} />
      </Stack>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <Button
          sx={{ backgroundColor: `${primaryColor} !important` }}
          size="small"
          onClick={() => setWhiteBlack((prev) => !prev)}
        >
          Prohodit barvy
        </Button>
      </div>

      <p>
        Jejich otáčením a prohozením barev vznikne 20 různých prvků. Ty jsou
        rozděleny do skupin 1, 2, 3 a 4 podle poměru barev černá-bílá (skupina 1
        obsahuje nejsvětlejší, skupina 4 naopak nejtmavší). Písmena v názvech
        určují natočení (z, b, y, i, r, d)
      </p>

      <Grid grid={allElements} size={smallSize} displayName />
    </Dialog>
  );
};

import { Typography } from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { ShapeCalculation } from "./Calculation";
import { useSwitch } from "../../../hooks/useSwitch";
import { GroupDialog } from "../Group/Dialog";
import { Density } from "../../../types/Density";
import { Shape as ShapeType } from "../../../types/Shape";
import { Cell } from "../../../types/General";

type ShapeProps = {
  form: FormValues;

  group: Density;
  shape: ShapeType;
  activeCell: Cell;
};

export const Shape = ({ form, group, shape }: ShapeProps) => {
  const [openDialog, onOpenDialog, onCloseDialog] = useSwitch(false);

  if (!shape || !group) return null;

  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        Při konečném výběru ze skupiny zkoumá algoritmus elementy, které s polem
        sousedí stranami.
      </Typography>

      <ShapeCalculation
        form={form}
        shape={shape}
        onOpenDialog={onOpenDialog}
        group={group}
      />

      <GroupDialog open={openDialog} onClose={onCloseDialog} group={group} />
    </>
  );
};

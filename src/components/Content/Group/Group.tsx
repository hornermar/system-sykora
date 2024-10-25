import { Typography } from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { useSwitch } from "../../../hooks/useSwitch";
import { Density } from "../../../types/Density";
import { Cell } from "../../../types/General";
import { GroupCalculation } from "./Calculation";
import { GroupDialog } from "./Dialog";

type GroupProps = {
  form: FormValues;

  group: Density;

  activeCell: Cell;
};

export const Group = ({ form, group, activeCell }: GroupProps) => {
  const [openDialog, onOpenDialog, onCloseDialog] = useSwitch(false);

  return (
    <>
      <Typography variant="body1">
        Před výběrem elementu pro pole nejprve algoritmus zmenší rozshah výběru
        z 20 elementů na konktétní skupinu (1, 2, 3 nebo 4).
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        Při jejím zjišťování prochází sousedící elementy, které se s polem
        dotýkají stranou i rohy.
      </Typography>

      <GroupCalculation
        form={form}
        group={group}
        cellContent={activeCell.name ?? ""}
        onOpenDialog={onOpenDialog}
      />

      <GroupDialog open={openDialog} onClose={onCloseDialog} group={group} />
    </>
  );
};

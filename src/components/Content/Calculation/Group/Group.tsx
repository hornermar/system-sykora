import { Typography } from "@mui/material";
import { FormValues } from "../../../../types/FormValues";
import { CalculationGroupDescription } from "./Description";
import { Density } from "../../../../types/Density";
import { useSwitch } from "../../../../hooks/useSwitch";
import { CalculationGroupDialog } from "./Dialog";

type CalculationGroupProps = {
  cellContent: string;
  form: FormValues;
  group: Density;
};

export const CalculationGroup = ({
  cellContent,
  form,
  group,
}: CalculationGroupProps) => {
  const [openDialog, onOpenDialog, onCloseDialog] = useSwitch(false);

  return (
    <>
      <Typography variant="body1">
        Vypočítá průměr ze skupin, do kterých tyto prvky patří:
      </Typography>

      <CalculationGroupDescription
        cellContent={cellContent}
        group={group}
        form={form}
      />

      <Typography variant="body1">
        Vybere nejbližší skupinu prvků. Tou je v tomto případě skupina{" "}
        <b onClick={onOpenDialog}>
          <u>{group.result.toLocaleString("cs-CZ")}</u>
        </b>
        .
      </Typography>

      <CalculationGroupDialog
        open={openDialog}
        onClose={onCloseDialog}
        group={group}
      />
    </>
  );
};

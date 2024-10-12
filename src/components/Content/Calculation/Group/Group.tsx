import { Typography } from "@mui/material";
import { FormValues } from "../../../../types/FormValues";
import { CalculationGroupDescription } from "./Description";
import { Density } from "../../../../types/Density";

type CalculationGroupProps = {
  cellContent: string;
  form: FormValues;
  group: Density;
  onOpenDialog: () => void;
};

export const CalculationGroup = ({
  cellContent,
  form,
  group,
  onOpenDialog,
}: CalculationGroupProps) => {
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
        Vybere nejbližší skupinu prvků. Tou je v tomto případě{" "}
        <b onClick={() => onOpenDialog()}>
          <u>skupina {group.result.toLocaleString("cs-CZ")}</u>
        </b>
        .
      </Typography>
    </>
  );
};

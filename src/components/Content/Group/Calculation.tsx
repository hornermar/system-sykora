import { Typography } from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { CalculationGroupDescription } from "./Description";
import { Density } from "../../../types/Density";

type GroupCalculationProps = {
  cellContent: string;
  form: FormValues;
  group: Density;
  onOpenDialog: () => void;
};

export const GroupCalculation = ({
  cellContent,
  form,
  group,
  onOpenDialog,
}: GroupCalculationProps) => {
  return (
    <>
      <Typography variant="body1">
        Vypočítá průměr ze skupin, do kterých tyto elementy patří:
      </Typography>

      <CalculationGroupDescription
        cellContent={cellContent}
        group={group}
        form={form}
      />

      <Typography variant="body1" sx={{ marginBottom: "30px" }}>
        Vybere nejbližší skupinu elementů. Tou je v tomto případě{" "}
        <span onClick={() => onOpenDialog()} className="underline">
          skupina {group.result.toLocaleString("cs-CZ")}
        </span>
        .
      </Typography>
    </>
  );
};

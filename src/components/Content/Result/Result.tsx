import { Stack } from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { FormValues } from "../../../types/FormValues";
import { ResultEdit } from "./Edit";

type ResultProps = {
  grid: string[][];
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  editOpen: boolean;
};

export const Result = ({ grid, form, setForm, editOpen }: ResultProps) => {
  return (
    <Stack>
      <Structure grid={grid} />

      <ResultEdit form={form} setForm={setForm} open={editOpen} />
    </Stack>
  );
};

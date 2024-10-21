import { Stack } from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { FormValues } from "../../../types/FormValues";
import { ResultEdit } from "./Edit";
import { useState } from "react";
import { getElements } from "../../../utils/getElements";

type ResultProps = {
  grid: string[][];
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  editOpen: boolean;
  defaultGrid: string[][];
};

export const Result = ({
  grid,
  form,
  onFormChange,
  editOpen,
  defaultGrid,
}: ResultProps) => {
  const [isRandom, setIsRandom] = useState<boolean>(false);

  const randomGrid = getElements(
    form.rule!,
    form.coefficient,
    defaultGrid,
    undefined,
    true
  );

  return (
    <Stack>
      <Structure grid={isRandom ? randomGrid : grid} isViewModeChangeable />

      <ResultEdit
        form={form}
        onFormChange={onFormChange}
        open={editOpen}
        isRandom={isRandom}
        setIsRandom={setIsRandom}
      />
    </Stack>
  );
};

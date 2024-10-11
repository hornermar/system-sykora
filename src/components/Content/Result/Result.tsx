import { Stack } from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { FormValues } from "../../../types/FormValues";
import { ResultEdit } from "./Edit";
import { useState } from "react";
import { getElements } from "../../../utils/getElements";
import { ViewMode } from "../../../types/General";

type ResultProps = {
  grid: string[][];
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  editOpen: boolean;
  defaultGrid: string[][];
};

export const Result = ({
  grid,
  form,
  setForm,
  editOpen,
  defaultGrid,
}: ResultProps) => {
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<ViewMode>("image");

  const randomGrid = getElements(
    form.rule!,
    form.coefficient,
    defaultGrid,
    undefined,
    true
  );

  return (
    <Stack>
      <Structure grid={isRandom ? randomGrid : grid} viewMode={viewMode} />

      <ResultEdit
        form={form}
        setForm={setForm}
        open={editOpen}
        isRandom={isRandom}
        setIsRandom={setIsRandom}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
    </Stack>
  );
};

import { getElements } from "../../utils/getElements";
import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { Structure } from "../Structure/Structure";
import { FormValues } from "../../types/FormValues";

type ResultProps = {
  defaultGrid: string[][];
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
};

export const Result = ({ defaultGrid, form }: ResultProps) => {
  const [grid, setGrid] = useState(defaultGrid);

  useEffect(() => {
    setGrid(getElements(form.rule, form.coefficient, defaultGrid, undefined));
  }, [form.coefficient, form.rule, defaultGrid]);

  return (
    <Stack>
      <Structure
        grid={grid}
        defaultGrid={defaultGrid}
        // displayDefaultGrid={displayDefaultGrid}
      />
    </Stack>
  );
};

import { useEffect, useState } from "react";
import { Content } from "../components/Content/Content";
import { useStep } from "../hooks/useStep";
import { useDefaultGrid } from "../hooks/useDefaultGrid";
import { getElements } from "../utils/getElements";
import { FormValues } from "../types/FormValues";

const defaultFormValues = {
  coefficient: 0,
  rule: null,
  structure: {
    rows: 0,
    columns: 0,
  },
  isRandom: false,
};

export const Dashboard = () => {
  const [form, setForm] = useState<FormValues>(defaultFormValues);
  const { defaultGrid, setDefaultGrid, setEmptyGrid } = useDefaultGrid(
    form.structure.rows,
    form.structure.columns
  );
  const [grid, setGrid] = useState<string[][]>(defaultGrid);

  const { activeStep, onStepChange } = useStep();

  useEffect(() => {
    onStepChange(0);
  }, []);

  useEffect(() => {
    if (form.rule !== null && form.coefficient) {
      setGrid(getElements(form.rule, form.coefficient, defaultGrid, undefined));
    }
  }, [form.coefficient, form.rule, defaultGrid]);

  const resetForm = () => {
    setForm(defaultFormValues);
    setEmptyGrid();
  };

  return (
    <Content
      activeStep={activeStep}
      form={form}
      setForm={setForm}
      defaultGrid={defaultGrid}
      setDefaultGrid={setDefaultGrid}
      grid={grid}
      setEmptyGrid={setEmptyGrid}
      resetForm={resetForm}
    />
  );
};

import { useEffect, useState, useCallback } from "react";
import { Content } from "../components/Content/Content";
import { useStep } from "../hooks/useStep";
import { getElements } from "../utils/getElements";
import { FormValues } from "../types/FormValues";
import { createEmptyGrid } from "../utils/createEmptyGrid";

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
  const [defaultGrid, setDefaultGrid] = useState<string[][]>(
    createEmptyGrid(form.structure.rows, form.structure.columns)
  );

  const [grid, setGrid] = useState<string[][]>([]);
  const { activeStep, onStepChange } = useStep();

  useEffect(() => {
    onStepChange(0);
  }, []);

  useEffect(() => {
    if (form.structure.rows && form.structure.columns) {
      setDefaultGrid(
        createEmptyGrid(form.structure.rows, form.structure.columns)
      );
    }
  }, [form.structure.rows, form.structure.columns]);

  useEffect(() => {
    if (form.rule !== null && form.coefficient) {
      setGrid(getElements(form.rule, form.coefficient, defaultGrid, undefined));
    }
  }, [form.coefficient, form.rule, defaultGrid]);

  const resetForm = useCallback(() => {
    setForm(defaultFormValues);
    setDefaultGrid([]);
  }, [setForm, setDefaultGrid]);

  const setEmptyGrid = useCallback(() => {
    setDefaultGrid(
      createEmptyGrid(form.structure.rows, form.structure.columns)
    );
  }, [form.structure.rows, form.structure.columns, setDefaultGrid]);

  return (
    <Content
      activeStep={activeStep}
      form={form}
      setForm={setForm}
      defaultGrid={defaultGrid}
      setDefaultGrid={setDefaultGrid}
      grid={grid}
      resetForm={resetForm}
      setEmptyGrid={setEmptyGrid}
    />
  );
};

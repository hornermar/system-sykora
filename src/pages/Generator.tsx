import { useState, useEffect, useCallback } from "react";
import { Content } from "../components/Content/Content";
import { getElements } from "../utils/getElements";
import { createEmptyGrid } from "../utils/createEmptyGrid";
import { useFormParams } from "../hooks/useFormParams";

export const GeneratorWrapper = () => {
  const { form, activeStep, onFormChange, defaultFormValues } = useFormParams();
  const [defaultGrid, setDefaultGrid] = useState<string[][]>(
    createEmptyGrid(form.rows, form.columns)
  );
  const [grid, setGrid] = useState<string[][]>([]);

  useEffect(() => {
    if (form.rows && form.columns) {
      setDefaultGrid(createEmptyGrid(form.rows, form.columns));
    }
  }, [form.rows, form.columns]);

  useEffect(() => {
    if (form.rule !== null && form.coefficient) {
      setGrid(getElements(form.rule, form.coefficient, defaultGrid, undefined));
    }
  }, [form.coefficient, form.rule, defaultGrid]);

  const resetForm = useCallback(() => {
    onFormChange(defaultFormValues);
    setDefaultGrid([]);
  }, [onFormChange, setDefaultGrid, defaultFormValues]);

  const setEmptyGrid = useCallback(() => {
    setDefaultGrid(createEmptyGrid(form.rows, form.columns));
  }, [form.rows, form.columns, setDefaultGrid]);

  return (
    <Content
      activeStep={activeStep}
      form={form}
      onFormChange={onFormChange}
      defaultGrid={defaultGrid}
      setDefaultGrid={setDefaultGrid}
      grid={grid}
      resetForm={resetForm}
      setEmptyGrid={setEmptyGrid}
    />
  );
};

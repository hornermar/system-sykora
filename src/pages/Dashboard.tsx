import { useEffect, useState } from "react";
import { Content } from "../components/Content/Content";
import { useStep } from "../hooks/useStep";
import { useDefaultGrid } from "../hooks/useDefaultGrid";
import { getElements } from "../utils/getElements";

const defaultFormValues = {
  coefficient: 2,
  rule: 0,
  structure: {
    rows: 10,
    columns: 10,
  },
  isRandom: false,
};

export const Dashboard = () => {
  const [form, setForm] = useState(defaultFormValues);
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
    setGrid(
      getElements(
        form.rule,
        form.coefficient,
        defaultGrid,
        undefined,
        form.isRandom
      )
    );
  }, [form.coefficient, form.rule, defaultGrid, form.isRandom]);

  // const reset = () => {
  //   setForm(defaultFormValues);
  //   setEmptyGrid();
  //   onStepChange(1);
  // };

  return (
    <Content
      activeStep={activeStep}
      form={form}
      setForm={setForm}
      defaultGrid={defaultGrid}
      setDefaultGrid={setDefaultGrid}
      grid={grid}
      setEmptyGrid={setEmptyGrid}
    />
  );
};

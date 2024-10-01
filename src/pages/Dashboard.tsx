import { useEffect, useState } from "react";
import { Stack, Typography } from "@mui/material";
import { Content } from "../components/Content/Content";
import { Stepper } from "../components/common/Stepper/Stepper";
import { StepperButtons } from "../components/common/Stepper/Buttons";
import { useStep } from "../hooks/useStep";
import { useGrid } from "../hooks/useGrid";

export const clickableColor = "#04c2df";
export const primaryColor = "#c0c4c4";

const steps = ["Mřížka", "Prvky", "Koeficient", "Pravidlo"];

const defaultFormValues = {
  coefficient: 2,
  rule: 0,
  structure: {
    rows: 10,
    columns: 10,
  },
};

export const Dashboard = () => {
  const [form, setForm] = useState(defaultFormValues);
  const { grid, setGrid, setEmptyGrid } = useGrid(
    form.structure.rows,
    form.structure.columns
  );

  const { activeStep, handleStepChange } = useStep();

  useEffect(() => {
    handleStepChange(0);
  }, []);

  const reset = () => {
    setForm(defaultFormValues);
    setEmptyGrid();
    handleStepChange(1);
  };

  return (
    <Stack>
      {activeStep === 0 && (
        <Typography
          variant="h1"
          sx={{
            margin: "30px 20px 0px 35px",
          }}
        >
          SYSTÉM SÝKORA
        </Typography>
      )}

      {activeStep > 0 && activeStep < steps.length + 1 && (
        <>
          <Stepper activeStep={activeStep - 1} steps={steps} />
          <Typography
            variant="h2"
            sx={{
              margin: "20px 20px 0px 35px",
            }}
          >
            {steps[activeStep - 1].toUpperCase()}
          </Typography>
        </>
      )}

      <Content
        activeStep={activeStep}
        form={form}
        setForm={setForm}
        grid={grid}
        setGrid={setGrid}
        setEmptyGrid={setEmptyGrid}
      />

      <StepperButtons
        activeStep={activeStep}
        onStepChange={handleStepChange}
        steps={steps}
        reset={reset}
      />
    </Stack>
  );
};

import { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { Content } from "../components/Content/Content";
import { Stepper } from "../components/common/Stepper/Stepper";
import { StepperButtons } from "../components/common/Stepper/Buttons";
import { getEmptyGrid } from "../utils/getEmptyGrid";

export const clickableColor = "#04c2df";
export const primaryColor = "#c0c4c4";

const steps = ["Mřížka", "Prvky", "Koeficient", "Pravidlo"];

const defaultFormValues = {
  coefficient: 2,
  rule: 3,
  structure: {
    rows: 10,
    columns: 10,
  },
};

export const Dashboard = () => {
  const [activeStep, setActiveStep] = useState(-1);
  const [form, setForm] = useState(defaultFormValues);
  const [grid, setGrid] = useState<string[][]>(
    getEmptyGrid(form.structure.rows, form.structure.columns)
  );

  useEffect(() => {
    setGrid(getEmptyGrid(form.structure.rows, form.structure.columns));
  }, [form.structure.rows, form.structure.columns]);

  return (
    <Stack>
      {activeStep === -1 ? (
        <Typography
          variant="h1"
          color="primary"
          sx={{
            fontSize: "48px",
            fontWeight: 600,
            margin: "30px 20px 0px 35px",
          }}
        >
          Simulátor Sýkora
        </Typography>
      ) : activeStep !== steps.length - 1 ? (
        <Stepper activeStep={activeStep} steps={steps} />
      ) : null}

      <Content
        activeStep={activeStep}
        form={form}
        setForm={setForm}
        grid={grid}
      />

      <StepperButtons
        activeStep={activeStep}
        setActiveStep={setActiveStep}
        steps={steps}
      />
    </Stack>
  );
};

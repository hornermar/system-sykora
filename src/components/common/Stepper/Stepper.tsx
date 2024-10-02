import { Stepper as MuiStepper, Step, StepLabel } from "@mui/material";
import { map } from "lodash";

type Step = {
  label: string;
  isDisplayed: boolean;
  order: number;
};

type StepperProps = {
  activeStep: number;
  steps: Step[];
};

export const Stepper = ({ activeStep, steps }: StepperProps) => {
  return (
    <MuiStepper
      activeStep={activeStep}
      sx={{ margin: "30px 20px 0 27px" }}
      color="secondary"
    >
      {map(steps, (step) => {
        const stepProps: { completed?: boolean } = {};

        if (!step.isDisplayed || step.order > 5) {
          return null;
        }

        return (
          <Step key={step.label} {...stepProps}>
            <StepLabel />
          </Step>
        );
      })}
    </MuiStepper>
  );
};

import { Stepper as MuiStepper, Step, StepLabel } from "@mui/material";
import { map } from "lodash";

type StepperProps = {
  activeStep: number;
  steps: string[];
};

export const Stepper = ({ activeStep, steps }: StepperProps) => {
  return (
    <MuiStepper activeStep={activeStep} sx={{ margin: "30px 20px 0px 27px" }}>
      {map(steps, (label, index) => {
        const stepProps: { completed?: boolean } = {};

        return (
          <Step key={label} {...stepProps}>
            <StepLabel>{activeStep === index && label}</StepLabel>
          </Step>
        );
      })}
    </MuiStepper>
  );
};

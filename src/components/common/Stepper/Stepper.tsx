import { Stepper as MuiStepper, Step, StepLabel } from "@mui/material";
import { map } from "lodash";

type StepperProps = {
  activeStep: number;
  steps: string[];
};

export const Stepper = ({ activeStep, steps }: StepperProps) => {
  return (
    <MuiStepper
      activeStep={activeStep}
      sx={{ margin: "30px 20px 0px 27px" }}
      color="secondary"
    >
      {map(steps, (label) => {
        const stepProps: { completed?: boolean } = {};

        return (
          <Step key={label} {...stepProps}>
            <StepLabel />
            {/* <StepLabel>{activeStep === index && label}</StepLabel> */}
          </Step>
        );
      })}
    </MuiStepper>
  );
};

import {
  Stepper as MuiStepper,
  Step,
  StepLabel,
  StepIcon,
} from "@mui/material";
import { map } from "lodash";

type Step = {
  label: string;
  order: number;
};

type StepperProps = {
  activeStep: number;
  steps: Step[];
};

export const Stepper = ({ activeStep, steps }: StepperProps) => {
  return (
    <MuiStepper
      activeStep={activeStep - 1}
      sx={{ margin: "30px 20px 0 27px" }}
      color="secondary"
    >
      {activeStep < 5 &&
        map(steps.slice(1, 5), (step) => {
          return (
            <Step key={step.order} completed={activeStep > step.order}>
              <StepLabel
                StepIconComponent={(props) => (
                  <StepIcon {...props} icon={step.order} />
                )}
              />
            </Step>
          );
        })}

      {activeStep > 5 &&
        map(steps.slice(6, steps.length - 1), (step) => {
          return (
            <Step
              key={step.order}
              completed={activeStep > step.order}
              active={activeStep === step.order}
            >
              <StepLabel
                StepIconComponent={(props) => (
                  <StepIcon {...props} icon={step.order} />
                )}
              />
            </Step>
          );
        })}
    </MuiStepper>
  );
};

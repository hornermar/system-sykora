import { Step, useStep } from "../../../hooks/useStep";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { Box, Stack, Typography } from "@mui/material";
import { size } from "lodash";

const CircularProgressWithLabel = (
  props: CircularProgressProps & {
    value: number;
    activeStep: number;
    steps: Step[];
  }
) => {
  const { activeStep, steps, ...circularProgressProps } = props;

  return (
    <Stack
      flexDirection="row"
      width="100%"
      gap={3}
      sx={{ padding: "20px 20px 0" }}
    >
      <Box sx={{ position: "relative" }}>
        <CircularProgress variant="determinate" {...circularProgressProps} />
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ color: "text.secondary", marginTop: "-4px" }}
          >{`${activeStep}/${size(steps)}`}</Typography>
        </Box>
      </Box>
      <Typography variant="h2">{steps[activeStep - 1].label}</Typography>
    </Stack>
  );
};

export const Progress = () => {
  const { steps, activeStep } = useStep();

  if (activeStep === 0 || !activeStep) return null;

  const progress = (100 / steps.length) * activeStep;

  return (
    <CircularProgressWithLabel
      value={progress}
      activeStep={activeStep}
      steps={steps}
      size={50}
    />
  );
};

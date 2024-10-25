import { Step, useStep } from "../../../hooks/useStep";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";
import { Box, Stack, Typography } from "@mui/material";
import { find, size } from "lodash";

const CircularProgressWithLabel = (
  props: CircularProgressProps & {
    value: number;
    activeStep: number;
    steps: Step[];
  }
) => {
  const { activeStep, steps, ...circularProgressProps } = props;

  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        thickness={4}
        variant="determinate"
        value={100}
        sx={(theme) => ({
          color: theme.palette.grey[200],
        })}
        size={circularProgressProps.size}
      />
      <CircularProgress
        thickness={4}
        variant="determinate"
        {...circularProgressProps}
        sx={{ position: "absolute", left: 0 }}
      />
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
          sx={{ color: "text.secondary", marginTop: "-6px" }}
        >{`${activeStep}/${size(steps)}`}</Typography>
      </Box>
    </Box>
  );
};

type TitleProps = {
  title: string | undefined;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Title = ({ title, variant }: TitleProps) => {
  const { steps, activeStep } = useStep();

  if (activeStep === undefined) return null;

  const progress = (100 / steps.length) * activeStep;
  const disableProgress = activeStep === 0 || activeStep > steps.length;

  const currentStep = find(steps, { order: activeStep });

  const currentTitle =
    title !== "" ? title : find(steps, { order: activeStep })?.title;

  return (
    <Stack
      flexDirection="row"
      width="100%"
      gap={3}
      sx={{
        padding: {
          xs: variant === "h1" ? "70px 0 0" : "8px 0 0",
          lg: variant === "h1" ? "100px 0 20px" : "10px 0 20px",
        },
      }}
    >
      {!disableProgress && (
        <CircularProgressWithLabel
          value={progress}
          activeStep={activeStep}
          steps={steps}
          size={65}
        />
      )}
      <Box>
        <Typography variant={variant ?? "h2"}>
          {currentTitle?.toUpperCase()}
        </Typography>
        {currentStep?.subtitle && (
          <Typography variant="body1" sx={{ color: "rgb(158, 158, 158)" }}>
            {currentStep.subtitle}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};

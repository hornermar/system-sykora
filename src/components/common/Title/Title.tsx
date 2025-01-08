import { find } from "lodash";
import { Box, Stack, Typography, IconButton } from "@mui/material";
import CircularProgress, {
  CircularProgressProps,
} from "@mui/material/CircularProgress";

import { Step, useStep } from "../../../hooks/useStep";

const CircularProgressWithLabel = (
  props: CircularProgressProps & {
    value: number;
    activeStep: number;
    steps: Step[];
  }
) => {
  const { value } = props;
  const circleSize = 64;

  return (
    <Box sx={{ position: "relative" }}>
      <CircularProgress
        thickness={1}
        variant="determinate"
        value={100}
        sx={(theme) => ({
          color: theme.palette.grey[200],
        })}
        size={circleSize}
      />
      <CircularProgress
        thickness={22}
        variant="determinate"
        size={circleSize - 16}
        value={value}
        sx={(theme) => ({
          position: "absolute",
          left: 8,
          top: 8,
          color: theme.palette.primary.dark,
        })}
      />
    </Box>
  );
};

type TitleProps = {
  title: string | undefined;
  onOpenInstruction?: () => void;
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

export const Title = ({ title, variant, onOpenInstruction }: TitleProps) => {
  const { steps, activeStep } = useStep();

  if (activeStep === undefined) return null;

  const progress = (100 / steps.length) * activeStep;
  const disableProgress = activeStep > steps.length || !activeStep;

  const currentStep = find(steps, { order: activeStep });

  const currentTitle =
    title !== "" ? title : find(steps, { order: activeStep })?.title;

  return (
    <Stack
      flexDirection="row"
      width="100%"
      gap={2}
      sx={{
        padding: {
          xs: variant === "h1" ? "40px 0 0" : "20px 0 0",
          lg: variant === "h1" ? "100px 0 20px" : "10px 0 20px",
        },
      }}
    >
      {!disableProgress && (
        <CircularProgressWithLabel
          value={progress}
          activeStep={activeStep}
          steps={steps}
        />
      )}
      <Box sx={{ position: "relative", width: "100%" }}>
        <Typography variant={variant ?? "h2"}>
          {activeStep ? (
            <span style={{ marginRight: "10px" }}>{activeStep}</span>
          ) : null}

          {currentTitle?.toUpperCase()}
        </Typography>
        {currentStep?.subtitle && (
          <Typography variant="body1" sx={{ color: "rgb(158, 158, 158)" }}>
            {currentStep.subtitle}
          </Typography>
        )}

        {!disableProgress && (
          <IconButton
            onClick={onOpenInstruction}
            sx={{ position: "absolute", right: -5, bottom: 6 }}
          >
            <img
              src={"/system-sykora/icons/question.svg"}
              width={20}
              height={20}
              alt={"question icon"}
            />
          </IconButton>
        )}
      </Box>
    </Stack>
  );
};

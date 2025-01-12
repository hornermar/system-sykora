import { find, size } from "lodash";
import { Box, Stack, Typography, IconButton, Zoom } from "@mui/material";
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

  const finished = value === 100;

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
          color: theme.palette.primary.main,
        })}
      />

      <Zoom in={finished} timeout={finished ? 1000 : 0}>
        <img
          src={"/icons/check.svg"}
          width={30}
          height={30}
          alt={"check icon"}
          style={{ zIndex: 1000, position: "absolute", left: 18, top: 16 }}
        />
      </Zoom>
    </Box>
  );
};

type TitleProps = {
  title: string | undefined;
  onOpenInstruction?: () => void;
};

export const Title = ({ title, onOpenInstruction }: TitleProps) => {
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
          xs: "20px 0 0",
          lg: "10px 0 20px",
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
        <Typography variant={"h2"} sx={{ maxWidth: "280px" }}>
          {activeStep && activeStep !== size(steps) + 1 ? (
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
              src={"/icons/question.svg"}
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

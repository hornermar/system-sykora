import { Stack, Box, Button, PaletteColor, Typography } from "@mui/material";
import { useStep } from "../../../hooks/useStep";
// import { Stepper } from "../common/Stepper/Stepper";

const maxWidth = "850px";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  color?: PaletteColor;
  backButton?: string;
  nextButton?: string;
  middleButton?: string;
  onMiddleButtonClick?: () => void;
  fulllHeight?: boolean;
  disableNext?: boolean;
  onNextButtonClick?: () => void;
};

export const Container = ({
  children,
  title,
  color,
  backButton,
  nextButton,
  middleButton,
  onMiddleButtonClick,
  fulllHeight,
  disableNext,
  onNextButtonClick,
}: ContainerProps) => {
  const { activeStep, onStepChange } = useStep();

  const handleBack = () => {
    onStepChange(activeStep - 1);
  };

  const handleNext = () => {
    onStepChange(activeStep + 1);
  };

  return (
    <>
      <Stack
        component="main"
        sx={{
          backgroundColor: color?.main ?? "unset",
          color: color?.contrastText ?? "unset",
          paddingTop: "50px",
          paddingBottom: activeStep > 0 ? "77px" : "0px",
          minHeight: fulllHeight ? "100vh" : "100%",
        }}
      >
        <Box sx={{ maxWidth: maxWidth, width: "100%", margin: "0 auto" }}>
          {/* {activeStep > 0 && activeStep !== 5 && activeStep !== 9 && (
            <Stepper activeStep={activeStep} steps={steps} />
          )} */}
          <Box
            sx={{
              fontSize: "16px",
              padding: "0px 35px 20px",
              textAlign: "left",
            }}
          >
            {title && (
              <Typography
                variant={title === "Systém Sýkora" ? "h1" : "h2"}
                sx={{
                  marginTop: activeStep === 0 ? "0px" : "5px",
                }}
              >
                {title.toUpperCase()}
              </Typography>
            )}
            <Box sx={{ marginTop: "20px" }}>{children}</Box>
          </Box>

          {/* Buttons */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              position: "fixed",
              bottom: 0,
              width: "100%",
              maxWidth: maxWidth,
              justifyContent: "space-between",
            }}
          >
            {backButton && (
              <Button
                variant="outlined"
                onClick={handleBack}
                fullWidth
                disableTouchRipple
                disableFocusRipple
              >
                {backButton}
              </Button>
            )}

            {middleButton && (
              <Button
                sx={{ borderLeft: "none", borderRight: "none" }}
                variant="outlined"
                onClick={onMiddleButtonClick}
                fullWidth
                disableTouchRipple
                disableFocusRipple
              >
                {middleButton}
              </Button>
            )}

            {nextButton && (
              <Button
                variant="contained"
                onClick={onNextButtonClick ?? handleNext}
                fullWidth
                disabled={disableNext}
                disableTouchRipple
                disableFocusRipple
              >
                {nextButton}
              </Button>
            )}
          </Box>
        </Box>
      </Stack>
    </>
  );
};

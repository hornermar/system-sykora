import { Stack, Box, Button, PaletteColor } from "@mui/material";
import { useStep } from "../../../hooks/useStep";
import { Title } from "../Title/Title";

const maxWidth = "850px";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  titleVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: PaletteColor;
  backButton?: string;
  nextButton?: string;
  middleButton?: string;
  onMiddleButtonClick?: () => void;
  fulllHeight?: boolean;
  disableNext?: boolean;
  disableMiddle?: boolean;
  onNextButtonClick?: () => void;
};

export const Container = ({
  children,
  title,
  titleVariant,
  color,
  backButton,
  nextButton,
  middleButton,
  onMiddleButtonClick,
  fulllHeight,
  disableNext,
  disableMiddle,
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
          backgroundColor: color?.dark ?? "unset",
          color: color?.main ?? "unset",
          minHeight: fulllHeight ? "100vh" : "100%",
          paddingBottom: "50px",
        }}
      >
        <Box sx={{ maxWidth: maxWidth, width: "100%", margin: "0 auto" }}>
          <Box
            sx={{
              fontSize: "16px",
              padding: "10px 20px 20px",
              textAlign: "left",
            }}
          >
            {/* Title with Progress */}
            <Title title={title} variant={titleVariant} />

            {/* Children */}
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
                sx={{
                  borderLeft: "none",
                  borderRight: disableNext ? "revert" : "none",
                }}
                variant="outlined"
                onClick={onMiddleButtonClick}
                fullWidth
                disableTouchRipple
                disableFocusRipple
                disabled={disableMiddle}
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

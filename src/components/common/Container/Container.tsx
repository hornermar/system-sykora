import { Stack, Box, PaletteColor, Button } from "@mui/material";
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
  disableNext?: boolean;
  onNextButtonClick?: () => void;
};

export const Container = ({
  children,
  title,
  titleVariant,
  color,
  backButton,
  nextButton,
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
      <Box
        component="main"
        sx={{
          backgroundColor: color?.light ?? "unset",
          color: color?.main ?? "unset",
          minHeight: "100vh",
        }}
      >
        <Stack
          sx={{
            maxWidth: maxWidth,
            width: "100%",
            margin: "0 auto",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              fontSize: "16px",
              padding: "10px 20px 70px",
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
              height: "80px",
              justifyContent: "space-between",
              zIndex: 900,
              padding: "10px 20px 20px",
            }}
          >
            {backButton && (
              <Button
                variant="outlined"
                onClick={handleBack}
                disableTouchRipple
                disableFocusRipple
                sx={{ position: "absolute", top: 10, left: 20 }}
              >
                {backButton}
              </Button>
            )}

            {nextButton && (
              <Button
                variant="contained"
                onClick={onNextButtonClick ?? handleNext}
                disabled={disableNext}
                disableTouchRipple
                disableFocusRipple
                sx={{ position: "absolute", top: 10, right: 20 }}
              >
                {nextButton}
              </Button>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

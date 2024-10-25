import { Stack, Box, PaletteColor, Button, useTheme } from "@mui/material";
import { useStep } from "../../../hooks/useStep";
import { Title } from "../Title/Title";

const maxWidth = "1200px";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  titleVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: PaletteColor;
  backButton?: string;
  nextButton?: string;
  disableNext?: boolean;
  onNextButtonClick?: () => void;
  isPage?: boolean;
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
  isPage,
}: ContainerProps) => {
  const { activeStep, onStepChange } = useStep();
  const theme = useTheme();

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
          backgroundColor: color?.light ?? theme.palette.secondary.light,
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
            height: "100%",
            minHeight: "100vh",
            backgroundColor: color?.light ?? "white",
            padding: { xs: 0, lg: "0 20px" },
          }}
        >
          <Box
            sx={{
              fontSize: "16px",
              padding: {
                xs: isPage ? "50px 20px 20px" : "10px 20px 70px",
                lg: "60px 20px 0",
              },
              textAlign: "left",
            }}
          >
            {/* Title with Progress */}
            <Title title={title} variant={titleVariant} />

            {/* Children */}
            <Box sx={{ marginTop: "20px" }}>{children}</Box>
          </Box>

          {/* Buttons */}
          {!isPage && (
            <>
              {backButton && (
                <Button
                  variant="outlined"
                  onClick={handleBack}
                  disableTouchRipple
                  disableFocusRipple
                  sx={{
                    position: { xs: "fixed", lg: "block" },
                    bottom: 20,
                    left: 20,
                    zIndex: 1000,
                  }}
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
                  sx={{
                    position: "fixed",
                    bottom: 20,
                    right: 20,
                    zIndex: 1000,
                  }}
                >
                  {nextButton}
                </Button>
              )}
            </>
          )}
        </Stack>
      </Box>
    </>
  );
};

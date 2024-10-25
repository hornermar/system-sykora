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
    <Stack
      sx={{
        maxWidth: maxWidth,
        width: "100%",
        margin: "0 auto",
        justifyContent: "space-between",
        minHeight: { xs: "100vh", lg: "calc(100vh - 48px )" },
        backgroundColor: isPage ? theme.palette.primary.light : "white",
        padding: { xs: 0, lg: "0 20px" },
        marginTop: { xs: "-48px", lg: "0" },
        position: "relative",
      }}
    >
      <Box
        sx={{
          fontSize: "16px",
          padding: {
            xs: isPage ? "40px 20px 20px" : "0px 20px 70px",
            lg: "40px 20px 0",
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
                left: { xs: 20, lg: "calc(50% - 150px)" },
                zIndex: 900,
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
                right: { xs: 20, lg: "calc(50% - 150px)" },
                zIndex: 900,
              }}
            >
              {nextButton}
            </Button>
          )}
        </>
      )}
    </Stack>
  );
};

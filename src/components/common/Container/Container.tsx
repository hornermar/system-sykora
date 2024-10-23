import { Stack, Box, PaletteColor, Typography } from "@mui/material";
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
            minHeight: "100vh",
            margin: "0 auto",
            justifyContent: "space-between",
          }}
        >
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
              // position: "fixed",
              // bottom: 0,
              width: "100%",
              maxWidth: maxWidth,
              justifyContent: "space-between",
              zIndex: 1000,
              padding: "10px 20px 20px",
            }}
          >
            {backButton && (
              <Typography
                variant="subtitle1"
                className="underline"
                onClick={handleBack}
              >
                <img
                  src="/icons/chevron-left.svg"
                  width={10}
                  height={10}
                  alt={"left icon"}
                  style={{ marginRight: "6px" }}
                />
                {backButton}
              </Typography>
              // <Button
              //   variant="outlined"
              //   onClick={handleBack}
              //   fullWidth
              //   disableTouchRipple
              //   disableFocusRipple
              // >
              //   {backButton}
              // </Button>
            )}

            {middleButton && (
              <Typography
                className={
                  disableMiddle ? "underline underline-disabled" : "underline"
                }
                variant="subtitle1"
                onClick={onMiddleButtonClick}
              >
                {middleButton}
              </Typography>
              // <Button
              //   sx={{
              //     borderLeft: "none",
              //     borderRight: disableNext ? "revert" : "none",
              //   }}
              //   variant="outlined"
              //   onClick={onMiddleButtonClick}
              //   fullWidth
              //   disableTouchRipple
              //   disableFocusRipple
              //   disabled={disableMiddle}
              // >
              //   {middleButton}
              // </Button>
            )}

            {nextButton && (
              <Typography
                variant="subtitle1"
                className={
                  disableNext ? "underline underline-disabled" : "underline"
                }
                onClick={
                  !disableNext ? onNextButtonClick ?? handleNext : undefined
                }
              >
                {nextButton}
                <img
                  src="/icons/chevron-right.svg"
                  width={10}
                  height={10}
                  alt={"right icon"}
                  style={{ marginLeft: "6px" }}
                />
              </Typography>
              // <Button
              //   variant="contained"
              //   onClick={onNextButtonClick ?? handleNext}
              //   fullWidth
              //   disabled={disableNext}
              //   disableTouchRipple
              //   disableFocusRipple
              // >
              //   {nextButton}
              // </Button>
            )}
          </Box>
        </Stack>
      </Box>
    </>
  );
};

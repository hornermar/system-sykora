import { Box, Button } from "@mui/material";

type StepperButtonsProps = {
  activeStep: number;
  onStepChange: (step: number) => void;
  steps: string[];
  reset: () => void;
};

export const StepperButtons = ({
  activeStep,
  onStepChange,
  steps,
  reset,
}: StepperButtonsProps) => {
  const handleNext = () => {
    onStepChange(activeStep + 1);
  };

  const handleBack = () => {
    onStepChange(activeStep - 1);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "fixed",
        bottom: 0,
        padding: activeStep === 0 ? "0 60px 35px" : "",
        width: "100%",
        justifyContent: activeStep === 0 ? "center" : "space-between",
      }}
    >
      {activeStep === 0 && (
        <Button
          onClick={handleNext}
          variant="contained"
          size="large"
          endIcon={
            <img
              src="/arrow-right-solid.svg"
              alt="Arrow Right"
              style={{ height: "16px" }}
            />
          }
          sx={{ padding: "25px 35px", borderRadius: "20px" }}
        >
          Začít
        </Button>
      )}

      {activeStep !== 0 && (
        <Button variant="outlined" onClick={handleBack} fullWidth>
          {activeStep === 1 ? "Zpět na úvod" : "Zpět"}
        </Button>
      )}

      {activeStep !== 0 &&
        activeStep !== steps.length + 1 &&
        activeStep !== steps.length && (
          <Button variant="contained" onClick={handleNext} fullWidth>
            Další
          </Button>
        )}

      {activeStep === steps.length && (
        <Button variant="contained" onClick={handleNext} fullWidth>
          Vygenerovat
        </Button>
      )}

      {activeStep === steps.length + 1 && (
        <Button onClick={reset} variant="contained" fullWidth>
          Začít znovu
        </Button>
      )}
    </Box>
  );
};

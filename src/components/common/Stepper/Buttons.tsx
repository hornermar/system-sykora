import { Box, Button } from "@mui/material";

type StepperButtonsProps = {
  activeStep: number;
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  steps: string[];
};

export const StepperButtons = ({
  activeStep,
  setActiveStep,
  steps,
}: StepperButtonsProps) => {
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        position: "fixed",
        bottom: 15,
        width: "100%",
        justifyContent: activeStep === -1 ? "center" : "space-between",
      }}
    >
      {activeStep === -1 ? (
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
          sx={{ padding: "30px 40px" }}
        >
          Začít
        </Button>
      ) : (
        <>
          <Button
            disabled={activeStep === -1}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Zpět
          </Button>

          {activeStep !== steps.length && activeStep !== steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              Další
            </Button>
          )}

          {activeStep === steps.length - 1 && (
            <Button variant="contained" onClick={handleNext}>
              Vygenerovat
            </Button>
          )}

          {activeStep === steps.length && (
            <Button onClick={handleReset}>Začít znovu</Button>
          )}
        </>
      )}
    </Box>
  );
};

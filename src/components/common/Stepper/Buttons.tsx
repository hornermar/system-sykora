import { Box, Button } from "@mui/material";
import { primaryColor } from "../../../pages/Dashboard";

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
        bottom: 0,
        width: "100%",
        justifyContent: activeStep === -1 ? "center" : "space-between",
        backgroundColor: primaryColor,
      }}
    >
      {activeStep === -1 ? (
        <Button onClick={handleNext}>Začít</Button>
      ) : (
        <>
          <Button
            color="inherit"
            disabled={activeStep === -1}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Zpět
          </Button>

          {activeStep !== steps.length - 1 ? (
            <Button onClick={handleNext}>
              {activeStep === steps.length - 2 ? "Vygenerovat" : "Další"}
            </Button>
          ) : (
            <Button onClick={handleReset}>Začít znovu</Button>
          )}
        </>
      )}
    </Box>
  );
};

import { LinearProgress } from "@mui/material/";
import { useStep } from "../../hooks/useStep";

export const HeaderProgressbar = () => {
  const { steps, activeStep } = useStep();

  const value = (100 / steps.length) * activeStep;

  return (
    <LinearProgress
      color="primary"
      value={value}
      variant="determinate"
      sx={{
        // height: "56px",
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
      }}
    />
  );
};

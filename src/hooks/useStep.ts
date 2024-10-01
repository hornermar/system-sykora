import { useLocation, useNavigate } from "react-router-dom";

export const useStep = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveStep = () => {
    const params = new URLSearchParams(location.search);
    const step = params.get("step");
    return step !== null ? parseInt(step, 10) : 0;
  };

  const handleStepChange = (step: number) => {
    const params = new URLSearchParams(location.search);
    params.set("step", step.toString());
    navigate({ search: params.toString() });
  };

  const activeStep = getActiveStep();

  return { activeStep, handleStepChange };
};

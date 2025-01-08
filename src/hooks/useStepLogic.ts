import { useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useStep } from "./useStep";
import { getFilledCells } from "../utils/getFilledCells";
import { FormValues } from "../types/FormValues";

type UseStepLogicProps = {
  form: FormValues;
  defaultGrid: string[][];
};

export const useStepLogic = ({ form, defaultGrid }: UseStepLogicProps) => {
  const { activeStep, onStepChange } = useStep();
  const navigate = useNavigate();

  const title = useMemo(() => {
    return activeStep === 9 ? "Závěr" : "";
  }, [activeStep]);

  const nextButton = useMemo(() => {
    if (activeStep === 7) return "Vygenerovat";
    if (activeStep === 8) return "Závěr";
    if (activeStep === 9) return "";
    return "Další";
  }, [activeStep]);

  const handleNext = useCallback(() => {
    return onStepChange(activeStep + 1);
  }, [activeStep, onStepChange]);

  const handleBack = () => {
    if (activeStep === 1) return navigate("/");
    return onStepChange(activeStep - 1);
  };

  const filledCells = useMemo(() => getFilledCells(defaultGrid), [defaultGrid]);

  const disableNext = useMemo(() => {
    switch (activeStep) {
      case 1:
        return !form.columns || !form.rows;
      case 2:
        return filledCells < 5;
      case 3:
        return !form.coefficient;
      case 4:
        return form.rule === null;
      default:
        return false;
    }
  }, [activeStep, form, filledCells]);

  const backButton = "Zpět";

  return {
    title,
    nextButton,
    handleNext,
    disableNext,
    backButton,
    handleBack,
  };
};

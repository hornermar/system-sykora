import { useCallback, useMemo } from "react";
import { useStep } from "./useStep";
import { FormValues } from "../types/FormValues";

type UseStepLogicProps = {
  form: FormValues;
  resetForm: () => void;
};

export const useStepLogic = ({ form, resetForm }: UseStepLogicProps) => {
  const { activeStep, onStepChange } = useStep();

  const stepZero = activeStep === 0;

  const onStartClick = useCallback(() => {
    resetForm();
    onStepChange(1);
  }, [resetForm, onStepChange]);

  const title = useMemo(() => {
    return stepZero ? "Instrukce" : activeStep === 9 ? "Závěr" : "";
  }, [stepZero, activeStep]);

  const nextButton = useMemo(() => {
    if (stepZero) return "Začít";
    if (activeStep === 7) return "Vygenerovat";
    if (activeStep === 8) return "Závěr";
    if (activeStep === 9) return "";
    return "Další";
  }, [stepZero, activeStep]);

  const handleNext = useMemo(() => {
    return stepZero ? onStartClick : () => onStepChange(activeStep + 1);
  }, [stepZero, onStartClick, activeStep, onStepChange]);

  const handleBack = () => {
    onStepChange(activeStep - 1);
  };

  const disableNext = useMemo(() => {
    switch (activeStep) {
      case 1:
        return !form.columns || !form.rows;
      case 3:
        return !form.coefficient;
      case 4:
        return form.rule === null;
      default:
        return false;
    }
  }, [activeStep, form]);

  const backButton = useMemo(() => {
    return stepZero ? undefined : "Zpět";
  }, [stepZero]);

  return {
    title,
    nextButton,
    handleNext,
    disableNext,
    backButton,
    handleBack,
  };
};

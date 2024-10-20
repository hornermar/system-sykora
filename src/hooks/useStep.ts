import { useLocation, useNavigate } from "react-router-dom";

export type Step = {
  label: string;
  order: number;
};

const steps: Step[] = [
  {
    label: "Mřížka",
    order: 1,
  },
  {
    label: "Prvky",
    order: 2,
  },
  {
    label: "Koeficient",
    order: 3,
  },
  {
    label: "Pravidlo",
    order: 4,
  },
  {
    label: "Výpočet",
    order: 5,
  },
  {
    label: "Výběr skupiny",
    order: 6,
  },
  {
    label: "Výběr prvku",
    order: 7,
  },
  {
    label: "Struktura",
    order: 8,
  },
];

export const useStep = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const getActiveStep = () => {
    const params = new URLSearchParams(location.search);
    const step = params.get("step");
    return step !== null ? parseInt(step, 10) : 0;
  };

  const onStepChange = (step: number) => {
    const params = new URLSearchParams(location.search);
    params.set("step", step.toString());
    navigate({ search: params.toString() });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const activeStep = getActiveStep();

  return {
    activeStep,
    onStepChange,
    steps,
  };
};

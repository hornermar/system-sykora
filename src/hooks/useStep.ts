import { useLocation, useNavigate } from "react-router-dom";

export type Step = {
  title: string;
  order: number;
  subtitle?: string;
};

const steps: Step[] = [
  {
    title: "Mřížka",
    order: 1,
    subtitle: "Vstupní hodnoty",
  },
  {
    title: "Elementy",
    order: 2,
    subtitle: "Vstupní hodnoty",
  },
  {
    title: "Koeficient",
    order: 3,
    subtitle: "Vstupní hodnoty",
  },
  {
    title: "Pravidlo",
    order: 4,
    subtitle: "Vstupní hodnoty",
  },
  {
    title: "Průchod mřížkou",
    order: 5,
    subtitle: "Výpočet elementu",
  },
  {
    title: "Výběr skupiny",
    order: 6,
    subtitle: "Výpočet elementu",
  },
  {
    title: "Výběr prvku",
    order: 7,
    subtitle: "Výpočet elementu",
  },
  {
    title: "Struktura",
    order: 8,
    subtitle: "Výstup",
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

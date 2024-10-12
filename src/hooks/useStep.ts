import { useLocation, useNavigate } from "react-router-dom";

const steps = [
  {
    label: "Zdroje",
    isDisplayed: false,
    order: 0,
  },
  {
    label: "Mřížka",
    isDisplayed: true,
    order: 1,
  },
  {
    label: "Prvky",
    isDisplayed: true,
    order: 2,
  },
  {
    label: "Koeficient",
    isDisplayed: true,
    order: 3,
  },
  {
    label: "Pravidlo",
    isDisplayed: true,
    order: 4,
  },
  {
    label: "Výsledek",
    isDisplayed: false,
    order: 5,
  },
  {
    label: "A jak algoritmus funguje?",
    isDisplayed: true,
    order: 6,
  },
  {
    label: "Výběr skupiny",
    isDisplayed: true,
    order: 7,
  },
  {
    label: "Výběr prvku",
    isDisplayed: true,
    order: 8,
  },
  {
    label: "Závěr",
    isDisplayed: true,
    order: 9,
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

  return { activeStep, onStepChange, steps };
};

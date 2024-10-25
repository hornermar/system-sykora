import { useState, useEffect, useCallback } from "react";
import { Content } from "../components/Content/Content";
import { getElements } from "../utils/getElements";
import { useForm } from "../hooks/useForm";
import { useDefaultGrid } from "../hooks/useDefaultGrid";
import { size } from "lodash";
import { FormValues } from "../types/FormValues";
import { Container } from "../components/common/Container/Container";
import { useStep } from "../hooks/useStep";

type GeneratorProps = {
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  defaultGrid: string[][];
  onDefaultGridChange: (newDefaultGrid: string[][]) => void;
  grid: string[][];
  setEmptyGrid: () => void;
  resetForm: () => void;
};

const Generator = ({
  form,
  onFormChange,
  defaultGrid,
  onDefaultGridChange,
  grid,
  setEmptyGrid,
  resetForm,
}: GeneratorProps) => {
  const { activeStep, onStepChange } = useStep();

  const stepZero = activeStep === 0 || !activeStep;

  const onStartClick = () => {
    resetForm();
    onStepChange(1);
  };

  const title = stepZero ? "Instrukce" : activeStep === 9 ? "Závěr" : "";
  const nextButton = stepZero
    ? "Začít"
    : activeStep === 7
    ? "Vygenerovat"
    : activeStep === 8
    ? "Závěr"
    : activeStep === 9
    ? ""
    : "Další";
  const nextButtonClick = stepZero ? onStartClick : undefined;

  const disableNext = () => {
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
  };

  const backButton = stepZero ? undefined : "Zpět";

  return (
    <Container
      title={title}
      nextButton={nextButton}
      onNextButtonClick={nextButtonClick}
      backButton={backButton}
      disableNext={disableNext()}
    >
      <Content
        form={form}
        onFormChange={onFormChange}
        defaultGrid={defaultGrid}
        onDefaultGridChange={onDefaultGridChange}
        grid={grid}
        setEmptyGrid={setEmptyGrid}
      />
    </Container>
  );
};

export const GeneratorWrapper = () => {
  const { form, onFormChange, defaultFormValues } = useForm();
  const { defaultGrid, onDefaultGridChange, clearGrid } = useDefaultGrid();
  const [grid, setGrid] = useState<string[][]>([]);

  const setEmptyGrid = useCallback(() => {
    clearGrid(form.rows, form.columns);
  }, [form.columns, form.rows, clearGrid]);

  useEffect(() => {
    if (
      form.rows !== size(defaultGrid) ||
      form.columns !== size(defaultGrid[0])
    ) {
      setEmptyGrid();
    }
  }, [setEmptyGrid, form.rows, form.columns, defaultGrid]);

  useEffect(() => {
    if (form.rule !== null && form.coefficient !== 0) {
      setGrid(getElements(form.rule, form.coefficient, defaultGrid, undefined));
    }
  }, [form.coefficient, form.rule, defaultGrid]);

  const resetForm = useCallback(() => {
    onFormChange(defaultFormValues);
  }, [onFormChange, defaultFormValues]);

  return (
    <Generator
      form={form}
      onFormChange={onFormChange}
      defaultGrid={defaultGrid}
      onDefaultGridChange={onDefaultGridChange}
      grid={grid}
      resetForm={resetForm}
      setEmptyGrid={setEmptyGrid}
    />
  );
};

import { useState, useEffect, useCallback } from "react";
import { size } from "lodash";

import { useSwitch } from "../hooks/useSwitch";
import { useStepLogic } from "../hooks/useStepLogic";
import { useForm } from "../hooks/useForm";
import { Content } from "../components/Content/Content";
import { getElements } from "../utils/getElements";
import { useDefaultGrid } from "../hooks/useDefaultGrid";
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
};

const Generator = ({
  form,
  onFormChange,
  defaultGrid,
  onDefaultGridChange,
  grid,
  setEmptyGrid,
}: GeneratorProps) => {
  const { title, nextButton, handleNext, disableNext, backButton, handleBack } =
    useStepLogic({ form, defaultGrid });
  const { activeStep } = useStep();

  const [openInstruction, onOpenInstruction, onCloseInstruction] =
    useSwitch(false);

  return (
    <Container
      title={title}
      nextButton={nextButton}
      handleNext={handleNext}
      backButton={backButton}
      handleBack={handleBack}
      disableNext={disableNext}
      onOpenInstruction={onOpenInstruction}
      isPage={activeStep === 9}
    >
      <Content
        form={form}
        onFormChange={onFormChange}
        defaultGrid={defaultGrid}
        onDefaultGridChange={onDefaultGridChange}
        grid={grid}
        setEmptyGrid={setEmptyGrid}
        openInstruction={openInstruction}
        onCloseInstruction={onCloseInstruction}
      />
    </Container>
  );
};

export const GeneratorWrapper = () => {
  const { form, onFormChange } = useForm();
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

  return (
    <Generator
      form={form}
      onFormChange={onFormChange}
      defaultGrid={defaultGrid}
      onDefaultGridChange={onDefaultGridChange}
      grid={grid}
      setEmptyGrid={setEmptyGrid}
    />
  );
};

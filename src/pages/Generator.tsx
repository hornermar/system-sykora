import { useState, useEffect, useCallback } from "react";
import { Content } from "../components/Content/Content";
import { getElements } from "../utils/getElements";
import { useForm } from "../hooks/useForm";
import { useDefaultGrid } from "../hooks/useDefaultGrid";
import { size } from "lodash";
import { FormValues } from "../types/FormValues";
import { Container } from "../components/common/Container/Container";
import { useStepLogic } from "../hooks/useStepLogic";

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
  const { title, nextButton, handleNext, disableNext, backButton, handleBack } =
    useStepLogic({ form, resetForm });

  return (
    <Container
      title={title}
      nextButton={nextButton}
      handleNext={handleNext}
      backButton={backButton}
      handleBack={handleBack}
      disableNext={disableNext}
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

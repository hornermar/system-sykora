import { FormValues } from "../../types/FormValues";
import { Coefficient } from "./Coefficient/Coefficient";
import { Diagram } from "./Diagram/Diagram";
import { Elements } from "./Elements/Elements";
import { Rules } from "./Rules/Rules";
import { Result } from "./Result/Result";
import { GoingThrough } from "./GoingThrought/GoingThrough";
import { Instruction } from "./Instruction/Instruction";
import { useStep } from "../../hooks/useStep";
import { size } from "lodash";
import { End } from "./End/End";
import { useState } from "react";
import { ContainerWithStructure } from "../common/Container/WithStructure";
import { ContentStructure } from "./Structure/Structure";
import { createEmptyGrid } from "../../utils/createEmptyGrid";
import { Cell } from "../../types/General";
import { useGrid } from "../../hooks/useGrid";
import { Group } from "./Group/Group";
import { Shape } from "./Shape/Shape";
import { useGroupAndShape } from "../../hooks/useGroupAndShape";

export const initialActiveCell = { x: 0, y: 0, name: "" };

type StepConfig = {
  isValid: boolean;
  render: () => JSX.Element;
};

type ContentProps = {
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  defaultGrid: string[][];
  onDefaultGridChange: (newDefaultGrid: string[][]) => void;
  grid: string[][];
  setEmptyGrid: () => void;
};

export const Content = ({
  form,
  onFormChange,
  defaultGrid,
  onDefaultGridChange,
  grid,
  setEmptyGrid,
}: ContentProps) => {
  const { activeStep, onStepChange } = useStep();
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [displayDefaultGrid, setDisplayDefaultGrid] = useState<boolean>(false);
  const [activeCell, setActiveCell] = useState<Cell | undefined>(undefined);

  const emptyGrid = createEmptyGrid(form.rows, form.columns);

  const { randomGrid, slicedGrid } = useGrid(defaultGrid, grid, activeCell);
  const { group, shape } = useGroupAndShape(slicedGrid, grid, activeCell, form);

  const handleInvalidState = () => {
    onStepChange(0);
    return null;
  };

  const isFormFilled =
    form.columns && form.rows && form.coefficient !== 0 && form.rule !== null;
  const isGridFilled = size(grid) !== 0;

  const stepConfig: { [key: number]: StepConfig } = {
    0: {
      isValid: true,
      render: () => <Instruction />,
    },
    1: {
      isValid: true,
      render: () => (
        <Diagram
          form={form}
          onFormChange={onFormChange}
          defaultGrid={defaultGrid}
        />
      ),
    },
    2: {
      isValid: !!(form.columns && form.rows),
      render: () => (
        <Elements
          onDefaultGridChange={onDefaultGridChange}
          setEmptyGrid={setEmptyGrid}
          form={form}
        />
      ),
    },
    3: {
      isValid: !!form.columns && !!form.rows && form.coefficient !== 0,
      render: () => (
        <Coefficient
          coefficient={form.coefficient}
          onFormChange={onFormChange}
        />
      ),
    },
    4: {
      isValid: !!form.columns && !!form.rows && form.coefficient !== 0,
      render: () => <Rules rule={form.rule} onFormChange={onFormChange} />,
    },
    5: {
      isValid: !!(isFormFilled && isGridFilled),
      render: () => <GoingThrough />,
    },
    6: {
      isValid: !!(isFormFilled && isGridFilled && group && activeCell),
      render: () => (
        <Group activeCell={activeCell!} form={form} group={group!} />
      ),
    },
    7: {
      isValid: !!(isFormFilled && isGridFilled && group && shape && activeCell),
      render: () => (
        <Shape
          activeCell={activeCell!}
          form={form}
          group={group!}
          shape={shape!}
        />
      ),
    },
    8: {
      isValid: !!(isFormFilled && isGridFilled && group && !shape),
      render: () => (
        <Result
          form={form}
          onFormChange={onFormChange}
          setIsRandom={setIsRandom}
          isRandom={isRandom}
          setDisplayDefaultGrid={setDisplayDefaultGrid}
          displayDefaultGrid={displayDefaultGrid}
        />
      ),
    },
    9: {
      isValid: !!(isFormFilled && isGridFilled && group && shape),
      render: () => <End />,
    },
  };

  const currentStep = stepConfig[activeStep];

  return (
    <>
      <ContainerWithStructure
        structure={
          <ContentStructure
            defaultGrid={defaultGrid}
            onDefaultGridChange={onDefaultGridChange}
            emptyGrid={emptyGrid}
            grid={isRandom && activeStep === 8 ? randomGrid : grid}
            displayDefaultGrid={displayDefaultGrid}
            activeCell={activeCell}
            setActiveCell={setActiveCell}
            group={group}
            shape={shape}
            slicedGrid={slicedGrid}
          />
        }
      >
        {currentStep && currentStep.isValid
          ? currentStep.render()
          : handleInvalidState()}
      </ContainerWithStructure>
    </>
  );
};

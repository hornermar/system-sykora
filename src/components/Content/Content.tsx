import { useCallback, useState, useMemo } from "react";
import { size } from "lodash";

import { useStep } from "../../hooks/useStep";
import { useGrid } from "../../hooks/useGrid";
import { createEmptyGrid } from "../../utils/createEmptyGrid";
import { getFilledCells } from "../../utils/getFilledCells";
import { Coefficient } from "./Coefficient/Coefficient";
import { Diagram } from "./Diagram/Diagram";
import { Elements } from "./Elements/Elements";
import { Rules } from "./Rules/Rules";
import { Result } from "./Result/Result";
import { GoingThrough } from "./GoingThrought/GoingThrough";
import { Instruction } from "./Instruction/Instruction";
import { End } from "./End/End";
import { ContainerWithStructure } from "../common/Container/WithStructure";
import { ContentStructure } from "./Structure/Structure";
import { Cell } from "../../types/General";
import { Group } from "./Group/Group";
import { Shape } from "./Shape/Shape";
import { useGroupAndShape } from "../../hooks/useGroupAndShape";
import { FormValues } from "../../types/FormValues";

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
  openInstruction: boolean;
  onCloseInstruction: () => void;
};

export const Content = ({
  form,
  onFormChange,
  defaultGrid,
  onDefaultGridChange,
  grid,
  setEmptyGrid,
  openInstruction,
  onCloseInstruction,
}: ContentProps) => {
  const { activeStep, onStepChange } = useStep();
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [displayDefaultGrid, setDisplayDefaultGrid] = useState<boolean>(false);
  const [activeCell, setActiveCell] = useState<Cell | undefined>(undefined);

  const emptyGrid = createEmptyGrid(form.rows, form.columns);

  const { randomGrid, slicedGrid } = useGrid(defaultGrid, grid, activeCell);
  const { group, shape } = useGroupAndShape(slicedGrid, grid, activeCell, form);

  const handleInvalidState = useCallback(() => {
    onStepChange(1);
    return null;
  }, [onStepChange]);

  const isFormFilled =
    form.columns && form.rows && form.coefficient !== 0 && form.rule !== null;
  const isGridFilled = size(grid) !== 0;

  const filledCells = useMemo(() => getFilledCells(defaultGrid), [defaultGrid]);

  const stepConfig: { [key: number]: StepConfig } = {
    1: {
      isValid: true,
      render: () => (
        <Diagram
          form={form}
          setActiveCell={setActiveCell}
          onFormChange={onFormChange}
          defaultGrid={defaultGrid}
        />
      ),
    },
    2: {
      isValid: !!(form.columns && form.rows),
      render: () => (
        <Elements
          filledCells={filledCells}
          onDefaultGridChange={onDefaultGridChange}
          setEmptyGrid={setEmptyGrid}
          form={form}
        />
      ),
    },
    3: {
      isValid: !!form.columns && !!form.rows,
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
      isValid: !!(isFormFilled && isGridFilled),
      render: () => (
        <Group activeCell={activeCell!} form={form} group={group!} />
      ),
    },
    7: {
      isValid: !!(isFormFilled && isGridFilled),
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
      isValid: !!(isFormFilled && isGridFilled),
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
      isValid: !!(isFormFilled && isGridFilled),
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
        <Instruction open={openInstruction} onClose={onCloseInstruction} />
      </ContainerWithStructure>
    </>
  );
};

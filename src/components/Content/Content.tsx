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
  const { activeStep } = useStep();
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [displayDefaultGrid, setDisplayDefaultGrid] = useState<boolean>(false);
  const [activeCell, setActiveCell] = useState<Cell | undefined>(undefined);

  const emptyGrid = createEmptyGrid(form.rows, form.columns);

  const { randomGrid, slicedGrid } = useGrid(defaultGrid, grid, activeCell);
  const { group, shape } = useGroupAndShape(slicedGrid, grid, activeCell, form);

  const isFormFilled =
    form.columns && form.rows && form.coefficient !== 0 && form.rule !== null;
  const isGridFilled = size(grid) !== 0;

  const renderContent = () => {
    switch (activeStep) {
      case 0:
      case undefined:
        return <Instruction />;
      case 1:
        return (
          <Diagram
            form={form}
            onFormChange={onFormChange}
            defaultGrid={defaultGrid}
          />
        );
      case 2:
        return (
          <Elements
            onDefaultGridChange={onDefaultGridChange}
            setEmptyGrid={setEmptyGrid}
            form={form}
          />
        );
      case 3:
        return (
          <Coefficient
            coefficient={form.coefficient}
            onFormChange={onFormChange}
          />
        );
      case 4:
        return <Rules rule={form.rule} onFormChange={onFormChange} />;
      case 5:
        return isFormFilled ? <GoingThrough /> : null;
      case 6:
        return isFormFilled && isGridFilled && group && activeCell ? (
          <Group activeCell={activeCell} form={form} group={group} />
        ) : null;
      case 7:
        return isFormFilled && isGridFilled && group && shape && activeCell ? (
          <Shape
            activeCell={activeCell}
            form={form}
            group={group}
            shape={shape}
          />
        ) : null;
      case 8:
        return isFormFilled ? (
          <Result
            form={form}
            onFormChange={onFormChange}
            setIsRandom={setIsRandom}
            isRandom={isRandom}
            setDisplayDefaultGrid={setDisplayDefaultGrid}
            displayDefaultGrid={displayDefaultGrid}
          />
        ) : null;
      case 9:
        return <End />;
      default:
        return null;
    }
  };

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
        {renderContent()}
      </ContainerWithStructure>
    </>
  );
};

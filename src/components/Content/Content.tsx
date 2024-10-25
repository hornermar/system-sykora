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
import { useState, useMemo } from "react";
import { ContainerWithStructure } from "../common/Container/WithStructure";
import { ContentStructure } from "./Structure/Structure";
import { createEmptyGrid } from "../../utils/createEmptyGrid";
import { getElements } from "../../utils/getElements";
import { getShape } from "../../utils/getShape";
import { getColorDensity } from "../../utils/getColorDensity";
import { Cell } from "../../types/General";
import { Density } from "../../types/Density";
import { Shape as ShapeType } from "../../types/Shape";
import { getSlicedGrid } from "../../utils/getSlicedGrid";
import { Group } from "./Group/Group";
import { Shape } from "./Shape/Shape";

const initialActiveCell = { x: 0, y: 0, name: "" };

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
  const [activeCell, setActiveCell] = useState<Cell>(initialActiveCell);

  const emptyGrid = createEmptyGrid(form.rows, form.columns);

  const randomGrid = useMemo(() => {
    return getElements(0, 0, defaultGrid, undefined, true);
  }, [defaultGrid]);

  const slicedGrid = useMemo(() => {
    if (size(defaultGrid) === 0 || size(grid) === 0) {
      return [];
    } else {
      getSlicedGrid(grid, defaultGrid, activeCell);
    }
  }, [grid, defaultGrid, activeCell]);

  const isFormFilled =
    form.columns && form.rows && form.coefficient !== 0 && form.rule !== null;
  const isGridFilled = size(grid) !== 0;

  const group: Density | null = useMemo(() => {
    if (size(slicedGrid) === 0) {
      return null;
    }
    return getColorDensity(
      slicedGrid as string[][],
      activeCell.x,
      activeCell.y,
      form.coefficient
    );
  }, [slicedGrid, activeCell, form.coefficient]);

  const shape: ShapeType | null = useMemo(() => {
    if (size(slicedGrid) === 0 || !group) {
      return null;
    }
    return getShape(grid, activeCell.x, activeCell.y, group.result, form.rule!);
  }, [grid, activeCell, group, form.rule, slicedGrid]);

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
          />
        }
      >
        <>
          {/* Instruction */}
          {(activeStep === 0 || !activeStep) && <Instruction />}

          {/* Diagram */}
          {activeStep === 1 && (
            <Diagram
              form={form}
              onFormChange={onFormChange}
              defaultGrid={defaultGrid}
            />
          )}

          {/* Elements */}
          {activeStep === 2 && (
            <Elements
              onDefaultGridChange={onDefaultGridChange}
              setEmptyGrid={setEmptyGrid}
              form={form}
            />
          )}

          {/* Coefficient */}
          {activeStep === 3 && (
            <Coefficient
              coefficient={form.coefficient}
              onFormChange={onFormChange}
            />
          )}

          {/* Rule */}
          {activeStep === 4 && (
            <Rules rule={form.rule} onFormChange={onFormChange} />
          )}

          {/* Going Through Diagram */}
          {activeStep === 5 && isFormFilled && <GoingThrough />}

          {/* Group  */}
          {activeStep === 6 && isFormFilled && isGridFilled && group && (
            <Group activeCell={activeCell} form={form} group={group} />
          )}

          {activeStep === 7 &&
            isFormFilled &&
            isGridFilled &&
            group &&
            shape && (
              <Shape
                activeCell={activeCell}
                form={form}
                group={group}
                shape={shape}
              />
            )}

          {/* Result */}
          {activeStep === 8 && isFormFilled && (
            <Result
              form={form}
              onFormChange={onFormChange}
              setIsRandom={setIsRandom}
              isRandom={isRandom}
              setDisplayDefaultGrid={setDisplayDefaultGrid}
              displayDefaultGrid={displayDefaultGrid}
            />
          )}

          {/* End */}
          {activeStep === 9 && <End />}
        </>
      </ContainerWithStructure>
    </>
  );
};

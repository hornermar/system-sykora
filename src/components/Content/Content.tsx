import { FormValues } from "../../types/FormValues";
import { Coefficient } from "./Coefficient/Coefficient";
import { Diagram } from "./Diagram/Diagram";
import { Elements } from "./Elements/Elements";
import { Rules } from "./Rules/Rules";
import { Result } from "./Result/Result";
import { Container } from "../common/Container/Container";
import { useSwitch } from "../../hooks/useSwitch";
import { useEffect } from "react";
import { GoingThrough } from "./GoingThrought/GoingThrough";
import { Calculation } from "./Calculation/Calculation";
import { Instruction } from "./Instruction/Instruction";
import { useStep } from "../../hooks/useStep";
import { size } from "lodash";
import { End } from "./End/End";

type ContentProps = {
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  defaultGrid: string[][];
  onDefaultGridChange: (newDefaultGrid: string[][]) => void;
  grid: string[][];
  setEmptyGrid: () => void;
  resetForm: () => void;
};

export const Content = ({
  form,
  onFormChange,
  defaultGrid,
  onDefaultGridChange,
  grid,
  setEmptyGrid,
  resetForm,
}: ContentProps) => {
  const [editOpen, onEditOpen, onEditClose] = useSwitch(false);
  const { activeStep, onStepChange } = useStep();

  useEffect(() => {
    if (activeStep !== 8 && editOpen) {
      onEditClose();
    }
  }, [activeStep, onEditClose, editOpen]);

  const isFormFilled =
    form.columns && form.rows && form.coefficient !== 0 && form.rule !== null;
  const isGridFilled = size(grid) !== 0;

  return (
    <>
      {/* Instruction */}
      {(activeStep === 0 || !activeStep) && (
        <Container
          children={<Instruction />}
          title="Instrukce"
          nextButton="Začít"
          fulllHeight
          onNextButtonClick={() => {
            resetForm();
            onStepChange(1);
          }}
        />
      )}

      {/* Diagram */}
      {activeStep === 1 && (
        <Container
          children={
            <Diagram
              form={form}
              onFormChange={onFormChange}
              defaultGrid={defaultGrid}
            />
          }
          backButton="Zpět na instrukce"
          nextButton="Další"
          disableNext={!form.columns || !form.rows}
          fulllHeight
        />
      )}

      {/* Elements */}
      {activeStep === 2 && (
        <Container
          children={
            <Elements
              defaultGrid={defaultGrid}
              onDefaultGridChange={onDefaultGridChange}
              setEmptyGrid={setEmptyGrid}
              form={form}
            />
          }
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
        />
      )}

      {/* Coefficient */}
      {activeStep === 3 && (
        <Container
          children={
            <Coefficient
              coefficient={form.coefficient}
              onFormChange={onFormChange}
            />
          }
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
          disableNext={!form.coefficient}
        />
      )}

      {/* Rule */}
      {activeStep === 4 && (
        <Container
          children={<Rules rule={form.rule} onFormChange={onFormChange} />}
          backButton="Zpět"
          nextButton="Další"
          // middleButton="Přeskočit popis"
          // onMiddleButtonClick={() => onStepChange(size(steps))}
          fulllHeight
          disableNext={form.rule === null}
          disableMiddle={form.rule === null}
        />
      )}

      {/* Going Through Diagram */}
      {activeStep === 5 && isFormFilled && (
        <Container
          children={<GoingThrough grid={grid} defaultGrid={defaultGrid} />}
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
        />
      )}

      {/* Group + Shape */}
      {(activeStep === 6 || activeStep === 7) &&
        isFormFilled &&
        isGridFilled && (
          <Container
            children={
              <Calculation
                grid={grid}
                defaultGrid={defaultGrid}
                form={form}
                part={activeStep === 6 ? "group" : "shape"}
              />
            }
            backButton="Zpět"
            nextButton={activeStep === 6 ? "Další" : "Vygenerovat"}
            fulllHeight
          />
        )}

      {/* Result */}
      {activeStep === 8 && isFormFilled && (
        <Container
          children={
            <Result
              grid={grid}
              editOpen={editOpen}
              form={form}
              onFormChange={onFormChange}
              defaultGrid={defaultGrid}
              onDefaultGridChange={onDefaultGridChange}
              onEditClose={onEditClose}
            />
          }
          backButton="Zpět"
          middleButton={editOpen ? "Hotovo" : "Upravit"}
          onMiddleButtonClick={editOpen ? onEditClose : onEditOpen}
          nextButton="Závěr"
          fulllHeight
        />
      )}

      {/* End */}
      {activeStep === 9 && (
        <Container
          children={<End />}
          title="Závěr"
          fulllHeight
          onNextButtonClick={() => {
            resetForm();
            onStepChange(1);
          }}
        />
      )}
    </>
  );
};

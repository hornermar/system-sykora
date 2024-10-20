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

type ContentProps = {
  activeStep: number;
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  defaultGrid: string[][];
  setDefaultGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  grid: string[][];
  setEmptyGrid: () => void;
  resetForm: () => void;
};

export const Content = ({
  activeStep,
  form,
  onFormChange,
  defaultGrid,
  setDefaultGrid,
  grid,
  setEmptyGrid,
}: ContentProps) => {
  const [editOpen, onEditOpen, onEditClose] = useSwitch(false);

  useEffect(() => {
    if (activeStep !== 8 && editOpen) {
      onEditClose();
    }
  }, [activeStep, onEditClose, editOpen]);

  const isFormFilled =
    form.columns && form.rows && form.coefficient !== 0 && form.rule !== null;

  return (
    <>
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
              setDefaultGrid={setDefaultGrid}
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
          fulllHeight
          disableNext={form.rule === null}
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
      {(activeStep === 6 || activeStep === 7) && isFormFilled && (
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
            />
          }
          backButton="Zpět"
          nextButton={editOpen ? "Hotovo" : "Upravit"}
          onNextButtonClick={editOpen ? onEditClose : onEditOpen}
          fulllHeight
        />
      )}
    </>
  );
};

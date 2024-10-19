import { FormValues } from "../../types/FormValues";
import { Coefficient } from "./Coefficient/Coefficient";
import { Diagram } from "./Diagram/Diagram";
import { Elements } from "./Elements/Elements";
import { Rules } from "./Rules/Rules";
import { Result } from "./Result/Result";
import { Container } from "../common/Container/Container";
import { useStep } from "../../hooks/useStep";
import { useSwitch } from "../../hooks/useSwitch";
import { useEffect } from "react";
import { GoingThrough } from "./GoingThrought/GoingThrough";
import { End } from "./End/End";
import { Calculation } from "./Calculation/Calculation";

type ContentProps = {
  activeStep: number;
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  defaultGrid: string[][];
  setDefaultGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  grid: string[][];
  setEmptyGrid: () => void;
  resetForm: () => void;
};

export const Content = ({
  activeStep,
  form,
  setForm,
  defaultGrid,
  setDefaultGrid,
  grid,
  setEmptyGrid,
}: ContentProps) => {
  const { steps } = useStep();
  const [editOpen, onEditOpen, onEditClose] = useSwitch(false);

  useEffect(() => {
    if (activeStep !== 5 && editOpen) {
      onEditClose();
    }
  }, [activeStep, onEditClose, editOpen, setForm]);

  const isFormFilled =
    form.structure.columns &&
    form.structure.rows &&
    form.coefficient !== 0 &&
    form.rule !== null;

  return (
    <>
      {/* Diagram */}
      {activeStep === 1 && (
        <Container
          title={steps[activeStep - 1].label}
          children={
            <Diagram form={form} setForm={setForm} defaultGrid={defaultGrid} />
          }
          nextButton="Další"
          disableNext={!form.structure.columns || !form.structure.rows}
          fulllHeight
        />
      )}

      {/* Elements */}
      {activeStep === 2 && (
        <Container
          title={steps[activeStep - 1].label}
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
          title={steps[activeStep - 1].label}
          children={<Coefficient form={form} setForm={setForm} />}
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
          disableNext={!form.coefficient}
        />
      )}

      {/* Rule */}
      {activeStep === 4 && (
        <Container
          title={steps[activeStep - 1].label}
          children={<Rules form={form} setForm={setForm} />}
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
          disableNext={form.rule === null}
        />
      )}

      {/* Going Through Diagram */}
      {activeStep === 5 && isFormFilled && (
        <Container
          title={steps[activeStep - 1].label}
          children={<GoingThrough grid={grid} defaultGrid={defaultGrid} />}
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
        />
      )}

      {/* Group + Shape */}
      {(activeStep === 6 || activeStep === 7) && isFormFilled && (
        <Container
          title={steps[activeStep - 1].label}
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
              setForm={setForm}
              defaultGrid={defaultGrid}
            />
          }
          backButton="Zpět"
          middleButton={editOpen ? "Hotovo" : "Upravit"}
          onMiddleButtonClick={editOpen ? onEditClose : onEditOpen}
          nextButton="Prozkoumat"
          fulllHeight
        />
      )}

      {/* End */}
      {activeStep === 9 && isFormFilled && (
        <>
          <Container
            title={steps[activeStep - 1].label}
            children={<End />}
            backButton="Zpět"
            fulllHeight
          />
        </>
      )}
    </>
  );
};

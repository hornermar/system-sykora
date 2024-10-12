import { FormValues } from "../../types/FormValues";
import { Coefficient } from "./Coefficient/Coefficient";
import { Diagram } from "./Diagram/Diagram";
import { Elements } from "./Elements/Elements";
import { Introduction } from "./Introduction/Introduction";
import { Rules } from "./Rules/Rules";
import { Result } from "./Result/Result";
import { ContentContainer } from "./Container";
import { Sources } from "./Sources/Sources";
import { useTheme } from "@mui/material/styles";
import { useStep } from "../../hooks/useStep";
import { GoingThrough } from "./GoingThrought/GoingThrough";
import { useSwitch } from "../../hooks/useSwitch";
import { useEffect } from "react";
import { Calculation } from "./Calculation/Calculation";
import { End } from "./End/End";

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
  resetForm,
}: ContentProps) => {
  const { steps, onStepChange } = useStep();
  const [editOpen, onEditOpen, onEditClose] = useSwitch(false);
  const theme = useTheme();

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
      {/* Introduction */}
      {activeStep === 0 && (
        <>
          <ContentContainer
            children={<Introduction />}
            title="Systém Sýkora"
            nextButton="Začít"
            onNextButtonClick={() => {
              onStepChange(1);
              resetForm();
            }}
          />
        </>
      )}

      {/* Diagram */}
      {activeStep === 1 && (
        <ContentContainer
          title={steps[activeStep].label}
          children={
            <Diagram form={form} setForm={setForm} defaultGrid={defaultGrid} />
          }
          backButton="Zpět na úvod"
          nextButton="Další"
          disableNext={!form.structure.columns || !form.structure.rows}
          fulllHeight
        />
      )}

      {/* Elements */}
      {activeStep === 2 && (
        <ContentContainer
          title={steps[activeStep].label}
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
        <ContentContainer
          title={steps[activeStep].label}
          children={<Coefficient form={form} setForm={setForm} />}
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
          disableNext={!form.coefficient}
        />
      )}

      {/* Rule */}
      {activeStep === 4 && (
        <ContentContainer
          title={steps[activeStep].label}
          children={<Rules form={form} setForm={setForm} />}
          backButton="Zpět"
          nextButton="Vygenerovat"
          fulllHeight
          disableNext={form.rule === null}
        />
      )}

      {/* Result */}
      {activeStep === 5 && isFormFilled && (
        <ContentContainer
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

      {/* Going Through Diagram */}
      {activeStep === 6 && isFormFilled && (
        <ContentContainer
          title={steps[activeStep].label}
          children={<GoingThrough grid={grid} defaultGrid={defaultGrid} />}
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
        />
      )}

      {/* Group + Shape */}
      {(activeStep === 7 || activeStep === 8) && isFormFilled && (
        <ContentContainer
          title={steps[activeStep].label}
          children={
            <Calculation
              grid={grid}
              defaultGrid={defaultGrid}
              form={form}
              part={activeStep === 7 ? "group" : "shape"}
            />
          }
          backButton="Zpět"
          nextButton={activeStep === 7 ? "Další" : "Závěr"}
          fulllHeight
        />
      )}

      {/* End */}
      {activeStep === 9 && isFormFilled && (
        <>
          <ContentContainer
            title={steps[activeStep].label}
            children={<End />}
            backButton="Zpět"
            nextButton="Na začátek"
            onNextButtonClick={() => onStepChange(0)}
          />
          <ContentContainer
            title={steps[0].label}
            children={<Sources />}
            color={theme.palette.primary}
          />
        </>
      )}
    </>
  );
};

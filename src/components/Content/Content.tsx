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
import { Group } from "./Group/Group";
import { useSwitch } from "../../hooks/useSwitch";

type ContentProps = {
  activeStep: number;
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  defaultGrid: string[][];
  setDefaultGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  grid: string[][];
  setEmptyGrid: () => void;
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
  const theme = useTheme();
  return (
    <>
      {/* Introduction */}
      {activeStep === 0 && (
        <>
          <ContentContainer
            children={<Introduction />}
            title="Systém Sýkora"
            fulllHeight
            // nextButton="Start"
          />
          <ContentContainer
            title={steps[0].label}
            children={<Sources />}
            color={theme.palette.primary}
          />
        </>
      )}

      {/* Diagram */}
      {activeStep === 1 && (
        <ContentContainer
          title={steps[1].label}
          children={
            <Diagram form={form} setForm={setForm} defaultGrid={defaultGrid} />
          }
          backButton="Zpět na úvod"
          nextButton="Další"
          fulllHeight
        />
      )}

      {/* Elements */}
      {activeStep === 2 && (
        <ContentContainer
          title={steps[2].label}
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
          title={steps[3].label}
          children={<Coefficient form={form} setForm={setForm} />}
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
        />
      )}

      {/* Rule */}
      {activeStep === 4 && (
        <ContentContainer
          title={steps[4].label}
          children={<Rules form={form} setForm={setForm} />}
          backButton="Zpět"
          nextButton="Vygenerovat"
          fulllHeight
        />
      )}

      {/* Result */}
      {activeStep === 5 && (
        <ContentContainer
          children={
            <Result
              grid={grid}
              editOpen={editOpen}
              onEditClose={onEditClose}
              form={form}
              setForm={setForm}
            />
          }
          backButton="Zpět"
          middleButton="Upravit"
          onMiddleButtonClick={onEditOpen}
          nextButton="Prozkoumat"
          fulllHeight
        />
      )}

      {/* Going Through Diagram */}
      {activeStep === 6 && (
        <ContentContainer
          title={steps[6].label}
          children={<GoingThrough grid={grid} defaultGrid={defaultGrid} />}
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
        />
      )}

      {/* Group */}
      {activeStep === 7 && (
        <ContentContainer
          title={steps[7].label}
          children={<Group grid={grid} defaultGrid={defaultGrid} form={form} />}
          backButton="Zpět"
          nextButton="Další"
          fulllHeight
        />
      )}
    </>
  );
};

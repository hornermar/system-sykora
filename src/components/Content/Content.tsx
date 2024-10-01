import { FormValues } from "../../types/FormValues";
import { Coefficient } from "../Coefficient/Coefficient";
import { Diagram } from "../Diagram/Diagram";
import { Elements } from "../Elements/Elements";
import { Introduction } from "../Introduction/Introduction";
import { Stack } from "@mui/material";
import { Rules } from "../Rules/Rules";
import { Result } from "../Result/Result";

type ContentProps = {
  activeStep: number;
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  grid: string[][];
  setGrid: React.Dispatch<React.SetStateAction<string[][]>>;
  setEmptyGrid: () => void;
};

export const Content = ({
  activeStep,
  form,
  setForm,
  grid,
  setGrid,
  setEmptyGrid,
}: ContentProps) => {
  return (
    <Stack
      sx={{
        fontSize: "16px",
        padding: "25px 35px 0",
        marginBottom: "75px",
        textAlign: "left",
      }}
    >
      {/* Introduction */}
      {activeStep === 0 && <Introduction />}

      {/* Diagram */}
      {activeStep === 1 && (
        <Diagram form={form} setForm={setForm} grid={grid} />
      )}

      {/* Elements */}
      {activeStep === 2 && (
        <Elements
          grid={grid}
          setGrid={setGrid}
          setEmptyGrid={setEmptyGrid}
          form={form}
        />
      )}

      {/* Coefficient */}
      {activeStep === 3 && <Coefficient form={form} setForm={setForm} />}

      {/* Rule */}
      {activeStep === 4 && <Rules form={form} setForm={setForm} />}

      {/* Result */}
      {activeStep === 5 && (
        <Result form={form} setForm={setForm} defaultGrid={grid} />
      )}
    </Stack>
  );
};

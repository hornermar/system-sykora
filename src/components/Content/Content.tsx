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
};

export const Content = ({ activeStep, form, setForm, grid }: ContentProps) => {
  return (
    <Stack sx={{ fontSize: "16px", padding: "25px 35px", textAlign: "left" }}>
      {/* Introduction */}
      {activeStep === -1 && <Introduction />}

      {/* Diagram */}
      {activeStep === 0 && (
        <Diagram form={form} setForm={setForm} grid={grid} />
      )}

      {/* Elements */}
      {activeStep === 1 && <Elements grid={grid} />}

      {/* Coefficient */}
      {activeStep === 2 && <Coefficient form={form} setForm={setForm} />}

      {/* Rule */}
      {activeStep === 3 && <Rules form={form} setForm={setForm} />}

      {/* Result */}
      {activeStep === 4 && (
        <Result form={form} setForm={setForm} defaultGrid={grid} />
      )}
    </Stack>
  );
};

import { FormValues } from "../../types/FormValues";
import { Slider } from "@mui/material";
import { Typography } from "@mui/material";

type CoefficientProps = {
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
};

export const Coefficient = ({ form, setForm }: CoefficientProps) => {
  return (
    <>
      <Typography variant="body1">
        Dále zvol koeficient. Ten má mít hodnotu v rozmezí od <b>0</b> do{" "}
        <b>5</b>.
      </Typography>

      <Slider
        value={form.coefficient}
        step={0.01}
        min={0.01}
        max={3.99}
        onChange={(e: Event, newValue: number | number[]) =>
          setForm((prev) => ({
            ...prev,
            coefficient: newValue as number,
          }))
        }
        valueLabelDisplay="on"
        sx={{ margin: "40px 0 35px" }}
      />
      <Typography variant="body1">
        Jeho funkce je urychlit nebo zpomalit přechody od světlých elementů k
        tmavým nebo naopak. Vyšší koeficient znamená kontrastnější přechody,
        nižší pozvolnější.
      </Typography>

      <Typography variant="body1">
        Koeficient se připočítává nebo odečítá v místech, kde se nachází{" "}
        <b>+</b> nebo <b>-</b>.
      </Typography>
    </>
  );
};

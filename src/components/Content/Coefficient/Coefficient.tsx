import { FormValues } from "../../../types/FormValues";
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
        <b>4</b>.
      </Typography>

      <Slider
        value={form.coefficient}
        step={0.01}
        min={form.coefficient === 0 ? 0 : 0.01}
        max={3.99}
        onChange={(_, newValue: number | number[]) =>
          setForm((prev) => ({
            ...prev,
            coefficient: newValue as number,
          }))
        }
        valueLabelDisplay="on"
        sx={{ margin: "40px 0 35px" }}
      />

      <Typography variant="body1">
        Jeho funkcí je zpomalit nebo urychlit přechody od světlých prvků k
        tmavým a naopak. Nižší koeficient znamená pozvolnějí přechody, vyšší
        kontrastnější.
      </Typography>

      <Typography variant="body1">
        Připočítává se nebo odečítá v místech, kde se v mřížce nachází <b>+</b>{" "}
        nebo <b>-</b>.
      </Typography>
    </>
  );
};

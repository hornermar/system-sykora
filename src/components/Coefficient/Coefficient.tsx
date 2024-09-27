import { FormValues } from "../../types/FormValues";
import { Slider } from "../common-old/Slider";

type CoefficientProps = {
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
};

export const Coefficient = ({ form, setForm }: CoefficientProps) => {
  return (
    <>
      <p>
        Zvol <strong>koeficient</strong>. Ten má číselnou hodnotuv rozmezí od 0
        do 4.
      </p>
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
      />
      <p>
        Jeho funkce je urychlit nebo zpomalit přechody od světlých elementů k
        tmavým nebo naopak. Vyšší koeficient znamená kontrastnější přechody,
        nižší pozvolnější.
      </p>
      <p style={{ marginBottom: "50px" }}>
        Připočítá se nebo odečítá v místech, kde se v mřížce nachází <b>+</b> a{" "}
        <b>-</b>.
      </p>
    </>
  );
};

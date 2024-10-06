import {
  Stack,
  Collapse,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { FormValues } from "../../../types/FormValues";
import { rulesItems } from "../../../lib/formItems";
import { Rule } from "../../../types/Rule";
import { map } from "lodash";

type ResultProps = {
  grid: string[][];
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  editOpen: boolean;
  onEditClose: () => void;
};

export const Result = ({ grid, form, setForm, editOpen }: ResultProps) => {
  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      rule: Number(event.target.value),
    }));
  };

  const handleCoeffChange = (_: Event, newValue: number | number[]) => {
    setForm((prev) => ({
      ...prev,
      coefficient: newValue as number,
    }));
  };

  return (
    <Stack>
      <Structure grid={grid} />

      <Collapse in={editOpen}>
        <Stack flexDirection="row" alignItems="center">
          <Typography sx={{ paddingRight: "20px" }}>Koeficient</Typography>

          <Slider
            value={form.coefficient}
            step={0.01}
            min={0.01}
            max={3.99}
            // disabled={isRandom}
            onChange={handleCoeffChange}
            valueLabelDisplay="on"
            sx={{ margin: "40px 0 35px" }}
          />
        </Stack>

        <Stack flexDirection="row" alignItems="center">
          <Typography sx={{ paddingRight: "20px" }}>Pravidlo</Typography>

          <FormControl>
            <RadioGroup row value={form.rule} onChange={handleGroupChange}>
              {map(rulesItems, (rule: Rule) => (
                <FormControlLabel
                  value={rule.code.toString()}
                  control={<Radio size="small" />}
                  label={rule.code}
                  key={rule.code}
                  sx={{
                    fontStyle: form.rule === rule.code ? "italic" : "normal",
                  }}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Stack>
      </Collapse>
    </Stack>
  );
};

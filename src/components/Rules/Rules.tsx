import { FormValues } from "../../types/FormValues";
import { map } from "lodash";
import { Rule } from "../../types/Rule";
import { rulesItems } from "../../lib/formItems";
import { Structure } from "../Structure/Structure";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";

type RulesProps = {
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
};

export const Rules = ({ form, setForm }: RulesProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      rule: Number(event.target.value),
    }));
  };

  return (
    <>
      <p>
        Nakonec vyberte jedno ze čtyř <b>pravidel</b>. To rozhoduje, jaké vztahy
        elementy navazují, zda se vzájemně napojují, nebo se od sebe izolují
        (barvou, tvarem, nebo obojím).
      </p>
      <FormControl sx={{ marginBottom: "30px" }}>
        <RadioGroup value={form.rule} onChange={handleChange}>
          {map(rulesItems, (rule: Rule) => (
            <FormControlLabel
              value={rule.code.toString()}
              control={<Radio />}
              label={`${rule.code}: ${rule.text}`}
              key={rule.code}
              sx={{ marginBottom: "10px" }}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Structure
        grid={rulesItems[form.rule].example}
        cellType="image"
        key={form.rule}
      />
    </>
  );
};

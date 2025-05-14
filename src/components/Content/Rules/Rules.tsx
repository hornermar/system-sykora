import { FormValues } from "../../../types/FormValues";
import { map } from "lodash";
import { Rule } from "../../../types/Rule";
import { rulesItems } from "../../../lib/formItems";
import {
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
  useTheme,
} from "@mui/material";
import { Structure } from "../../Structure/Structure";

type RulesProps = {
  rule: FormValues["rule"];
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  areInputsEditable: boolean;
};

export const Rules = ({
  rule,
  onFormChange,
  areInputsEditable,
}: RulesProps) => {
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange({ rule: Number(event.target.value) });
  };

  return (
    <>
      <Typography variant="body1">
        {areInputsEditable
          ? "Nakonec vyber jedno ze čtyř pravidel. To rozhoduje, jaké vztahy elementy navazují, zda se vzájemně napojují, nebo se od sebe izolují."
          : "Nakonec vybírá jedno ze čtyř pravidel. To rozhoduje, jaké vztahy elementy navazují, zda se vzájemně napojují, nebo se od sebe izolují."}
      </Typography>
      <FormControl sx={{ margin: "10px 0 20px" }}>
        <RadioGroup value={rule} onChange={handleChange}>
          {map(rulesItems, (item: Rule) => (
            <FormControlLabel
              value={item.code.toString()}
              control={<Radio />}
              label={`${item.code}: ${item.text}`}
              key={item.code}
              sx={{
                marginBottom: "5px",
                fontStyle: rule === item.code ? "italic" : "normal",
              }}
            />
          ))}
        </RadioGroup>
      </FormControl>
      {rule !== null && (
        <Structure
          grid={rulesItems[rule].example}
          sx={{
            img: {
              "&:not([id='00'])": {
                borderLeft: `2px solid ${theme.palette.primary.main}`,
              },
            },
            marginBottom: "60px",
          }}
        />
      )}
    </>
  );
};

import { useMemo } from "react";
import { Typography } from "@mui/material";
import { FormValues } from "../../../../types/FormValues";
import { rulesItems } from "../../../../lib/formItems";
import { Rule } from "../../../../types/Rule";
import { find, map } from "lodash";
import { Grid } from "../../../Grid/Grid";
import { Shape } from "../../../../types/Shape";

type ShapeProps = {
  form: FormValues;
  shape: Shape;
};

export const CalculationShape = ({ form, shape }: ShapeProps) => {
  const ruleItem: Rule = useMemo(
    () =>
      find(rulesItems, (ruleItem: Rule) => form.rule === ruleItem.code) ??
      rulesItems[0],
    [form.rule]
  );

  return (
    <>
      <Typography variant="body1">
        Jaké vlastnosti hledá se řídí pravidlem, v tomto případě:
      </Typography>

      <Typography variant="body1">
        <i>
          {ruleItem?.code} : {ruleItem?.text}
        </i>
      </Typography>

      <Typography variant="body1">
        Protože {shape.description.reason}. Výsledkem je <b>{shape.result}</b>
      </Typography>

      <Grid
        grid={[map(shape.description.finalOptions, (option) => option.name)]}
        activeNames={shape.result ? [shape.result] : []}
        displayName
        size={30}
        sx={{
          justifyContent: "flex-start",
          gap: "10px",
          marginTop: "5px",
        }}
      />
    </>
  );
};

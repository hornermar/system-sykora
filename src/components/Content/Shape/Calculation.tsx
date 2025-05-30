import { useMemo } from "react";
import { Typography } from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { rulesItems } from "../../../lib/formItems";
import { Rule } from "../../../types/Rule";
import { find, map } from "lodash";
import { Grid } from "../../Grid/Grid";
import { Shape } from "../../../types/Shape";
import { Density } from "../../../types/Density";

type ShapeCalculationProps = {
  form: FormValues;
  shape: Shape;
  onOpenDialog: () => void;
  group: Density;
};

export const ShapeCalculation = ({
  form,
  shape,
  onOpenDialog,
  group,
}: ShapeCalculationProps) => {
  const ruleItem: Rule = useMemo(
    () =>
      find(rulesItems, (ruleItem: Rule) => form.rule === ruleItem.code) ??
      rulesItems[0],
    [form.rule]
  );

  return (
    <>
      <Typography variant="body1">
        Zkoumá, jaké vlastnosti mají strany dotyku - jakou mají barvu a zda je
        zde otevřený tvar či nikoliv. Ze{" "}
        <span onClick={() => onOpenDialog()} className="underline">
          skupiny {group.result.toLocaleString("cs-CZ")}
        </span>{" "}
        se snaží vybrat takový element, který podmínky splňuje co nejlépe. Zde
        se řídí pravidlem:
      </Typography>

      <Typography variant="body1">
        <b>
          {ruleItem?.code}: {ruleItem?.text}
        </b>
      </Typography>

      <Typography variant="body1">{shape.description.reason}:</Typography>

      <Grid
        grid={[map(shape.description.finalOptions, (option) => option.name)]}
        activeNames={shape.result ? [shape.result] : []}
        displayName
        size={40}
        sx={{
          justifyContent: "flex-start",
          gap: "10px",
          marginTop: "5px",
          marginBottom: "20px",
        }}
      />
    </>
  );
};

import { useMemo } from "react";
import { Typography } from "@mui/material";
import { FormValues } from "../../../../types/FormValues";
import { rulesItems } from "../../../../lib/formItems";
import { Rule } from "../../../../types/Rule";
import { find, map } from "lodash";
import { Grid } from "../../../Grid/Grid";
import { Shape } from "../../../../types/Shape";
import { Density } from "../../../../types/Density";

type ShapeProps = {
  form: FormValues;
  shape: Shape;
  onOpenDialog: () => void;
  group: Density;
};

export const CalculationShape = ({
  form,
  shape,
  onOpenDialog,
  group,
}: ShapeProps) => {
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
        zde otevřený tvar či nikoliv. Zde se řídí pravidlem:
      </Typography>

      <Typography variant="body1">
        <b>
          {ruleItem?.code}: {ruleItem?.text}
        </b>
      </Typography>

      <Typography variant="body1">
        Snaží se najít prvek ze{" "}
        <b onClick={() => onOpenDialog()}>
          <u>skupiny {group.result.toLocaleString("cs-CZ")}</u>
        </b>
        , který podmínky splňuje nejlépe.
      </Typography>

      <Typography variant="body1">
        {shape.description.reason}: <b>{shape.result}</b>
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

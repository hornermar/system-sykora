import { DensityDescription } from "../../../../types/Density";
import { first, map, size } from "lodash";
import { Label } from "../../../common/Label/Label";
import { Typography } from "@mui/material";

type GroupAverageProps = {
  cellContent: string;
  coefficient: number;
  description: DensityDescription;
};

export const GroupAverage = ({
  cellContent,
  coefficient,
  description,
}: GroupAverageProps) => {
  const neighboursNames = map(description.neighbours, "name");

  const neighboursGroup = map(neighboursNames, (n) =>
    Number(n.slice(0, 1))
  ).filter(Boolean);

  return (
    <>
      <Label
        value={`${
          size(neighboursGroup) <= 1
            ? first(neighboursGroup)?.toLocaleString("cs-CZ") ?? 0
            : `(${neighboursGroup.join(" + ")})`
        } : ${size(
          neighboursGroup
        )}  = ${description.neighboursAverage.toLocaleString("cs-CZ")}`}
      />

      {(cellContent === "+" || cellContent === "-") && (
        <>
          <Typography variant="body1">
            {`V buňce je ${cellContent}, ${
              cellContent === "+" ? "k" : "od"
            } průměru proto  ${
              cellContent === "+" ? "přičte" : "odečte"
            } zvolený koeficient `}
            <b>{coefficient.toLocaleString("cs-CZ")}</b>:
          </Typography>

          <Label
            value={`${description.neighboursAverage.toLocaleString(
              "cs-CZ"
            )} ${cellContent} ${coefficient.toLocaleString(
              "cs-CZ"
            )} = ${description.unRoundedResult.toLocaleString("cs-CZ")}`}
          />
        </>
      )}
    </>
  );
};

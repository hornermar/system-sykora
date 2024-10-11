import { useMemo } from "react";
import { Density } from "../../../../types/Density";
import { size, map } from "lodash";
import { FormValues } from "../../../../types/FormValues";
import { GroupAverage } from "./Average";
import { Box, Typography } from "@mui/material";
import { Accordion } from "../../../common/Accordion/Accordion";

type CalculationGroupDescriptionProps = {
  cellContent: string;
  group: Density;
  form: FormValues;
};

export const CalculationGroupDescription = ({
  cellContent,
  group,
  form,
}: CalculationGroupDescriptionProps) => {
  const steps = useMemo(() => size(group.description), [group]);

  return (
    <>
      {steps === 1 ? (
        <GroupAverage
          cellContent={cellContent}
          coefficient={form.coefficient}
          description={group.description[0]}
        />
      ) : (
        <Box sx={{ marginBottom: "15px" }}>
          {map(group.description, (description) => {
            return (
              <Accordion
                summary={`${description.step}. okruh`}
                key={description.step}
                defaultExpanded={description.step === steps}
              >
                <GroupAverage
                  cellContent={cellContent}
                  coefficient={form.coefficient}
                  description={description}
                />
                {steps > 0 && description.step !== steps && (
                  <Typography variant="body1">
                    Protože výsledek není jednoznačný (končí{" "}
                    {(0.5).toLocaleString("cs-CZ")}
                    ), je potřeba prohledat širší okolí.
                  </Typography>
                )}
              </Accordion>
            );
          })}
        </Box>
      )}
    </>
  );
};

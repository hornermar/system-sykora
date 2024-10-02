import { useMemo } from "react";
import { Cell } from "../../../types/General";
import { Density } from "../../../types/Density";
import { size, map } from "lodash";
import { FormValues } from "../../../types/FormValues";
import { GroupAverage } from "./Average";
import { Box } from "@mui/material";
import { Accordion } from "../../common/Accordion/Accordion";

type GroupCalculationProps = {
  defaultGrid: string[][];
  cell: Cell;
  group: Density;
  form: FormValues;
};

export const GroupCalculation = ({
  defaultGrid,
  cell,
  group,
  form,
}: GroupCalculationProps) => {
  const steps = useMemo(() => size(group.description), [group]);

  const cellContent = useMemo(
    () => defaultGrid[cell.y][cell.x],
    [cell, defaultGrid]
  );

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
              >
                <GroupAverage
                  cellContent={cellContent}
                  coefficient={form.coefficient}
                  description={description}
                />
                {steps > 0 && description.step !== steps && (
                  <div
                    style={{
                      fontSize: "14px",
                      fontWeight: "400",
                      paddingTop: "10px",
                    }}
                  >
                    Protože výsledek není jednoznačný (končí{" "}
                    {(0.5).toLocaleString("cs-CZ")}
                    ), je potřeba prohledat širší okolí.
                  </div>
                )}
              </Accordion>
            );
          })}
        </Box>
      )}
    </>
  );
};

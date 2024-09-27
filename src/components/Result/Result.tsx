import { rulesItems } from "../../lib/formItems";
import { getElements } from "../../utils/getElements";
import { Box, Stack, Typography } from "@mui/material";
import { map } from "lodash";
import { useEffect, useState } from "react";
import { Rule } from "../../types/Rule";
import { Chip } from "../common-old/Chip";
import { Slider } from "../common-old/Slider";
import { Structure } from "../Structure/Structure";
import { ToggleButtonGroup } from "../common-old/ToggleButtonGroup";
import { Collapse } from "../common-old/Collapse";
import { OnOffSwitch } from "../common-old/Switch";

import { FormValues } from "../../types/FormValues";

const collapseSx = {
  marginLeft: "-35px",
};

type ResultProps = {
  defaultGrid: string[][];
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
};

export const Result = ({ defaultGrid, form, setForm }: ResultProps) => {
  const [grid, setGrid] = useState(defaultGrid);
  const [displayDefaultGrid, setDisplayDefaultGrid] = useState(false);
  const [displayText, setDisplayText] = useState(false);
  const [isRandom, setIsRandom] = useState(false);

  useEffect(() => {
    setGrid(
      getElements(form.rule, form.coefficient, defaultGrid, undefined, isRandom)
    );
  }, [form.coefficient, form.rule, isRandom, defaultGrid]);

  return (
    <Stack>
      <Structure
        grid={grid}
        cellType={displayText ? "text" : "image"}
        defaultGrid={defaultGrid}
        displayDefaultGrid={displayDefaultGrid}
      />

      <Box sx={{ position: "absolute", top: "30vh" }}>
        <Collapse defaultExpanded={false} sx={collapseSx}>
          <Stack
            flexDirection="row"
            alignItems="center"
            sx={{ minWidth: "250px" }}
          >
            <Typography sx={{ marginRight: "20px" }}>Koeficient</Typography>

            <Slider
              value={form.coefficient}
              step={0.01}
              min={0.01}
              max={3.99}
              disabled={isRandom}
              onChange={(e: Event, newValue: number | number[]) =>
                setForm((prev) => ({
                  ...prev,
                  coefficient: newValue as number,
                }))
              }
            />
          </Stack>

          <Stack>
            <Stack flexDirection="row" alignItems="center">
              <Typography sx={{ paddingRight: "20px" }}>Pravidlo</Typography>
              <Stack
                flexDirection="row"
                alignItems="center"
                gap={1}
                flexWrap="nowrap"
              >
                {map(rulesItems, (rule: Rule) => (
                  <Chip
                    label={rule.code.toString()}
                    onClick={() =>
                      setForm((prev) => ({
                        ...prev,
                        rule: rule.code,
                      }))
                    }
                    selected={form.rule === rule.code}
                    disabled={isRandom}
                    key={rule.code}
                  />
                ))}
              </Stack>
            </Stack>
            <span
              style={{
                fontSize: "10px",
                paddingTop: "3px",
              }}
            >
              {/* {rulesItems[form.rule].text.replaceAll(" ", "\u00A0")} */}
              {rulesItems[form.rule].text.replace(/ /g, "\u00A0")}
            </span>
          </Stack>

          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
          >
            <Stack>
              <Typography sx={{ paddingRight: "20px" }}>Algoritmus</Typography>
              <span
                style={{
                  fontSize: "10px",
                  paddingTop: "3px",
                }}
              >
                Vypnutím&nbsp;se&nbsp;elementy&nbsp;vybírají&nbsp;náhodně
              </span>
            </Stack>

            <OnOffSwitch
              sx={{ marginLeft: "20px" }}
              checked={!isRandom}
              onChange={() => setIsRandom((prev) => !prev)}
            />
          </Stack>

          <Stack flexDirection="row">
            <Typography
              sx={{
                paddingRight: "20px",
                paddingTop: "8px",
              }}
            >
              Zobrazení
            </Typography>
            <Stack flexWrap="nowrap">
              <ToggleButtonGroup
                value={displayDefaultGrid}
                onChange={(newValue) => setDisplayDefaultGrid(newValue)}
                buttons={[
                  {
                    label: "Zadání",
                    value: true,
                  },
                  {
                    label: "Výsledek",
                    value: false,
                  },
                ]}
              />
              <ToggleButtonGroup
                value={displayText}
                onChange={(newValue) => setDisplayText(newValue)}
                buttons={[
                  {
                    label: "Text",
                    value: true,
                  },
                  {
                    label: "Obraz",
                    value: false,
                  },
                ]}
              />
            </Stack>
          </Stack>
        </Collapse>
      </Box>
    </Stack>
  );
};

import { find, map } from "lodash";
import {
  Stack,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  useMediaQuery,
  Box,
  useTheme,
} from "@mui/material";

import { FormValues } from "../../../types/FormValues";
import { rulesItems } from "../../../lib/formItems";
import { Rule } from "../../../types/Rule";

type ResultEditProps = {
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  isRandom: boolean;
  setIsRandom: React.Dispatch<React.SetStateAction<boolean>>;
  displayDefaultGrid: boolean;
  setDisplayDefaultGrid: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ResultEdit = ({
  form,
  onFormChange,
  isRandom,
  setIsRandom,
}: ResultEditProps) => {
  const theme = useTheme();
  const isSmallMedia = useMediaQuery(theme.breakpoints.down("lg"));

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onFormChange({ rule: Number(event.target.value) });
  };

  const handleCoeffChange = (_: Event, newValue: number | number[]) => {
    onFormChange({ coefficient: newValue as number });
  };
  const toggle = (
    _: React.ChangeEvent<HTMLInputElement>,
    selected: boolean,
    callback: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    callback(selected);
  };

  return (
    <>
      <Stack
        sx={{
          flexDirection: { xs: "row", lg: "column" },
          alignItems: { xs: "center", lg: "start" },
          justifyContent: { xs: "space-between", lg: "left" },
          paddingBottom: { xs: "22px", lg: "20px" },
        }}
      >
        <Stack>
          <Typography variant="body1" sx={{ margin: 0 }}>
            Algoritmus:
          </Typography>
          <Typography variant="caption">
            Vypnutím se elementy vyberou náhodně
          </Typography>
        </Stack>

        <Switch
          checked={!isRandom}
          onChange={(e, selected) => toggle(e, !selected, setIsRandom)}
        />
      </Stack>
      {/* <Stack
        sx={{
          flexDirection: { xs: "row", lg: "column" },
          alignItems: { xs: "center", lg: "start" },
          justifyContent: { xs: "space-between", lg: "left" },
          paddingBottom: { xs: "0", lg: "20px" },
        }}
      >
        <Stack>
          <Typography variant="body1" sx={{ margin: 0 }}>
            Zadání:
          </Typography>
          <Typography variant="caption">
            Zapnutím se zobrazí původní elementy
          </Typography>
        </Stack>

        <Switch
          checked={displayDefaultGrid}
          onChange={(e, selected) => toggle(e, selected, setDisplayDefaultGrid)}
        />
      </Stack> */}

      <Stack
        sx={{
          flexDirection: { xs: "row", lg: "column" },
          alignItems: { xs: "center", lg: "start" },
          paddingBottom: { xs: "0", lg: "20px" },
        }}
      >
        <Typography
          variant="body1"
          sx={{
            paddingRight: "10px",
            paddingBottom: isSmallMedia ? "10px" : "30px",
            margin: 0,
            color: isRandom
              ? theme.palette.text.disabled
              : theme.palette.text.primary,
          }}
        >
          Koeficient:
        </Typography>
        <Slider
          value={form.coefficient}
          step={0.01}
          min={0.01}
          max={3.99}
          onChange={handleCoeffChange}
          valueLabelDisplay={isRandom ? "off" : "on"}
          sx={{
            margin: "0 10px 0 0",
            paddingBottom: "10px !important",
          }}
          disabled={isRandom}
          size={isSmallMedia ? "small" : "medium"}
        />
      </Stack>

      <Box sx={{ paddingBottom: { xs: "5px", lg: "20px" } }}>
        <Stack
          sx={{
            flexDirection: { xs: "row", lg: "column" },
            alignItems: { xs: "center", lg: "start" },
          }}
        >
          <Typography
            variant="body1"
            sx={{
              paddingRight: "10px",
              margin: 0,
              color: isRandom
                ? theme.palette.text.disabled
                : theme.palette.text.primary,
            }}
          >
            Pravidlo:
          </Typography>

          <FormControl disabled={isRandom}>
            <RadioGroup
              row
              value={form.rule}
              onChange={handleGroupChange}
              sx={{ flexWrap: "nowrap" }}
            >
              {map(rulesItems, (rule: Rule) => (
                <FormControlLabel
                  value={rule.code.toString()}
                  control={<Radio size={isSmallMedia ? "small" : "medium"} />}
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

        <Typography
          variant="caption"
          sx={{
            display: "block",
            marginTop: "-8px",
            color: isRandom
              ? theme.palette.text.disabled
              : theme.palette.text.primary,
          }}
        >
          {find(rulesItems, (rule: Rule) => rule.code === form.rule)?.shortText}
        </Typography>
      </Box>
    </>
  );
};

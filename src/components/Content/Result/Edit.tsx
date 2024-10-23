import {
  Stack,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Box,
  Collapse,
} from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { rulesItems } from "../../../lib/formItems";
import { Rule } from "../../../types/Rule";
import { map } from "lodash";
import { useTheme } from "@mui/material/styles";

type ResultEditProps = {
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  open: boolean;
  isRandom: boolean;
  setIsRandom: React.Dispatch<React.SetStateAction<boolean>>;
  displayDefaultGrid: boolean;
  setDisplayDefaultGrid: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ResultEdit = ({
  form,
  onFormChange,
  open,
  isRandom,
  setIsRandom,
  displayDefaultGrid,
  setDisplayDefaultGrid,
}: ResultEditProps) => {
  const theme = useTheme();

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
    <Box
      sx={{
        position: "fixed",
        bottom: "52.5px",
        width: "100vw",
        left: 0,
        borderTop: open ? `2px solid ${theme.palette.primary.main}` : "none",
        borderLeft: `2px solid ${theme.palette.primary.main}`,
        borderRight: `2px solid ${theme.palette.primary.main}`,
      }}
    >
      <Collapse in={open} orientation="vertical">
        <Stack
          sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: "20px 35px 15px",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
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
              Koeficient:
            </Typography>
            <Slider
              value={form.coefficient}
              step={0.01}
              min={0.01}
              max={3.99}
              onChange={handleCoeffChange}
              valueLabelDisplay={isRandom ? "off" : "on"}
              sx={{ margin: "0 10px 0 0", paddingBottom: "10px !important" }}
              disabled={isRandom}
              size="small"
            />
          </Stack>

          <Stack flexDirection="row" alignItems="center">
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
                    control={<Radio size="small" />}
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

          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
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

          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
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
              onChange={(e, selected) =>
                toggle(e, selected, setDisplayDefaultGrid)
              }
            />
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
};

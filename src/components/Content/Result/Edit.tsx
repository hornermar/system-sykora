import {
  Stack,
  Collapse,
  Typography,
  Slider,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Switch,
  Box,
} from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { rulesItems } from "../../../lib/formItems";
import { Rule } from "../../../types/Rule";
import { map } from "lodash";
import { useTheme } from "@mui/material/styles";

type ResultEditProps = {
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  open: boolean;
  isRandom: boolean;
  setIsRandom: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ResultEdit = ({
  form,
  setForm,
  open,
  isRandom,
  setIsRandom,
}: ResultEditProps) => {
  const theme = useTheme();

  const handleGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      rule: Number(event.target.value),
    }));
  };

  const handleCoeffChange = (_: Event, newValue: number | number[]) => {
    setForm((prev) => ({
      ...prev,
      coefficient: newValue as number,
    }));
  };

  const toggleIsRandom = (
    _: React.ChangeEvent<HTMLInputElement>,
    selected: boolean
  ) => {
    setIsRandom(!selected);
  };

  return (
    <Box sx={{ position: "absolute", top: "50vh", width: "100vw", left: 0 }}>
      <Collapse in={open} orientation="horizontal">
        <Stack
          sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: "10px",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            <Typography
              variant="body1"
              sx={{ paddingRight: "10px", margin: 0 }}
            >
              Koeficient
            </Typography>
            <Slider
              value={form.coefficient}
              step={0.01}
              min={0.01}
              max={3.99}
              onChange={handleCoeffChange}
              valueLabelDisplay={isRandom ? "off" : "on"}
              sx={{ margin: "5px 0" }}
              disabled={isRandom}
            />
          </Stack>

          <Stack flexDirection="row" alignItems="center">
            <Typography
              variant="body1"
              sx={{ paddingRight: "10px", margin: 0 }}
            >
              Pravidlo
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
                Algoritmus
                <Typography variant="caption" component="span">
                  (Vypnutím se prvky vyberou náhodně)
                </Typography>
              </Typography>
            </Stack>

            <Switch checked={!isRandom} onChange={toggleIsRandom} />
          </Stack>
        </Stack>
      </Collapse>
    </Box>
  );
};

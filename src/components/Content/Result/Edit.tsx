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
  // Select,
  // MenuItem,
  // SelectChangeEvent,
} from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { rulesItems } from "../../../lib/formItems";
import { Rule } from "../../../types/Rule";
import { map } from "lodash";
import { useTheme } from "@mui/material/styles";
import { ViewMode } from "../../../types/General";

type ResultEditProps = {
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  open: boolean;
  isRandom: boolean;
  setIsRandom: React.Dispatch<React.SetStateAction<boolean>>;
  viewMode: ViewMode;
  setViewMode: React.Dispatch<React.SetStateAction<ViewMode>>;
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

  // const handleViewModeChange = (event: SelectChangeEvent<ViewMode>) => {
  //   setViewMode(event.target.value as ViewMode);
  // };

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
            padding: "10px 35px 15px",
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
              sx={{ margin: "5px 10px 0 0" }}
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
                Vypnutím se prvky vyberou náhodně
              </Typography>
            </Stack>

            <Switch
              checked={!isRandom}
              onChange={toggleIsRandom}
              // size="small"
            />
          </Stack>

          {/* <Stack flexDirection="row" alignItems="center">
            <Typography
              variant="body1"
              sx={{ paddingRight: "10px", margin: 0 }}
            >
              Zobrazení prvků:
            </Typography>
            <Select
              value={viewMode}
              onChange={(event) => handleViewModeChange(event)}
              size="small"
              sx={{ minWidth: 120 }}
            >
              <MenuItem value="image">Obrázek</MenuItem>
              <MenuItem value="text">Názvy</MenuItem>
            </Select>
          </Stack> */}
        </Stack>
      </Collapse>
    </Box>
  );
};

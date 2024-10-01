import {
  Stack,
  Typography,
  Select as MuiSelect,
  MenuItem,
} from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import { map } from "lodash";

type InputProps = {
  label: string;
  name: string;
  value: number;
  onChange: (e: SelectChangeEvent<number>) => void;
  max: number;
};

export const Select = ({ label, name, value, onChange, max }: InputProps) => {
  const options = Array.from({ length: max }, (_, i) => i + 1);

  return (
    <Stack gap={1} flexDirection="row" alignItems="center">
      <Typography component="span">{label} </Typography>
      <MuiSelect
        name={name}
        variant="outlined"
        value={value}
        type="number"
        onChange={(e) => onChange(e)}
        size="small"
      >
        {map(options, (option) => (
          <MenuItem value={option} key={option}>
            {option}
          </MenuItem>
        ))}
      </MuiSelect>
    </Stack>
  );
};

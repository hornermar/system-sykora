import { Box, SxProps } from "@mui/material";

type InputProps = {
  label: string;
  name: string;
  value: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  sx?: SxProps;
};

export const Input = ({ label, name, value, onChange }: InputProps) => {
  return (
    <Box>
      <span>{label} </span>
      <input
        type="number"
        placeholder="Sloupce"
        name={name}
        value={value}
        onChange={onChange}
        style={{ width: "70px", height: "30px" }}
      />
    </Box>
  );
};

import { Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type LabelProps = {
  value: string;
};

export const Label = ({ value }: LabelProps) => {
  const theme = useTheme();

  return (
    <Typography
      sx={{
        backgroundColor: theme.palette.secondary.main,
        padding: "5px 10px",
        marginBottom: "10px",
        display: "inline-block",
      }}
    >
      {value}
    </Typography>
  );
};

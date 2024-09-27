import { Chip as MuiChip, SxProps } from "@mui/material";
import { styled } from "@mui/material/styles";
import { clickableColor } from "../../pages/Dashboard";

const StyledChip = styled(MuiChip)((props) => ({
  border:
    props.variant === "filled"
      ? `2px solid ${clickableColor}`
      : "2px solid white",
  backgroundColor: "white",
  fontSize: "14px",
  fontWeight: "400",
  borderRadius: "40px",
  padding: "4px 0px",
  height: "auto",
  "&:active": {
    boxShadow: "none",
    backgroundColor: "white",
  },
  "&:focus": {
    backgroundColor: "white",
  },
  "&:hover": {
    backgroundColor: "white",
  },

  ".MuiChip-label": {
    whiteSpace: "normal",
  },
}));

type ChipProps = {
  label: string;
  onClick?: () => void;
  selected?: boolean;
  disabled?: boolean;
  sx?: SxProps;
};

export const Chip = ({ label, onClick, selected, disabled, sx }: ChipProps) => {
  return (
    <StyledChip
      label={label}
      onClick={onClick}
      variant={selected ? "filled" : "outlined"}
      disabled={disabled}
      sx={sx}
    />
  );
};

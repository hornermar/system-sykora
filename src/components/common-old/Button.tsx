import { Button as MuiButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { clickableColor, primaryColor } from "../Dashboard";

const StyledButton = styled(MuiButton)((props) => ({
    boxShadow: "none",
    padding: "8px 20px",
    borderRadius: "25px",
    color: "black",
    backgroundColor:
        props.variant === "contained" ? primaryColor : "transparent",
    textTransform: "none",
    border: `2px dotted ${clickableColor}`,
    "&:hover": {
        boxShadow: "none",
        backgroundColor:
            props.variant === "contained" ? primaryColor : "transparent",
    },
    "&:active": {
        boxShadow: "none",
        backgroundColor: primaryColor,
    },
    "&:focus": {
        backgroundColor:
            props.variant === "contained" ? primaryColor : "transparent",
    },
}));

type ButtonProps = {
    children: React.ReactNode;
    onClick?: () => void;
    fullWidth?: boolean;
    variant?: "contained" | "text";
    endIcon?: React.ReactNode;
};

export const Button = ({
    children,
    onClick,
    fullWidth,
    variant,
    endIcon,
}: ButtonProps) => {
    return (
        <StyledButton
            fullWidth={fullWidth}
            onClick={onClick}
            size="small"
            variant={variant ?? "contained"}
            endIcon={endIcon}
        >
            {children}
        </StyledButton>
    );
};

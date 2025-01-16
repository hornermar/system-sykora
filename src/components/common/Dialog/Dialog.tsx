import {
  DialogActions,
  Dialog as MuiDialog,
  Button,
  IconButton,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { SxProps, useTheme } from "@mui/material/styles";
import { map } from "lodash";

type Action = {
  text: string;
  color: "primary" | "secondary";
  onClick: () => void;
};

type DialogProp = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  fullScreen?: boolean;
  sx?: SxProps;
  actions?: Action[];
};

export const Dialog = ({
  open,
  onClose,
  title,
  children,
  fullScreen,
  sx,
  actions,
}: DialogProp) => {
  const theme = useTheme();

  return (
    <MuiDialog
      fullScreen={fullScreen}
      onClose={onClose}
      open={open}
      sx={{
        ".MuiPaper-root": {
          backgroundColor: theme.palette.secondary.dark,
          maxWidth: "600px",
          border: `2px solid ${theme.palette.secondary.contrastText}`,
          borderRadius: "0",
        },
      }}
    >
      <DialogTitle>{title.toUpperCase()}</DialogTitle>

      <IconButton
        color="inherit"
        onClick={onClose}
        sx={{
          marginTop: "-5px",
          position: "absolute",
          right: 12,
          top: 14,
        }}
      >
        <img
          src={"/system-sykora/icons/xmark.svg"}
          width={30}
          height={30}
          alt={"close icon"}
        />
      </IconButton>

      <DialogContent sx={{ paddingTop: "0", fontSize: "14px", ...sx }}>
        {children}
      </DialogContent>

      {actions && (
        <DialogActions>
          {map(actions, ({ text, color, onClick }: Action) => (
            <Button
              key={text}
              variant="contained"
              color={color}
              onClick={onClick}
            >
              {text}
            </Button>
          ))}
        </DialogActions>
      )}
    </MuiDialog>
  );
};

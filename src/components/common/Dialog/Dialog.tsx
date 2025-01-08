import DialogTitle from "@mui/material/DialogTitle";
import { Dialog as MuiDialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { IconButton } from "@mui/material";
import { SxProps, useTheme } from "@mui/material/styles";

type DialogProp = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  fullScreen?: boolean;
  sx?: SxProps;
};

export const Dialog = ({
  open,
  onClose,
  title,
  children,
  fullScreen,
  sx,
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
          src={"/icons/xmark.svg"}
          width={30}
          height={30}
          alt={"close icon"}
        />
      </IconButton>

      <DialogContent sx={{ paddingTop: "0", fontSize: "14px", ...sx }}>
        {children}
      </DialogContent>
    </MuiDialog>
  );
};

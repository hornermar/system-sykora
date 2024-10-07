import DialogTitle from "@mui/material/DialogTitle";
import { Dialog as MuiDialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

type DialogProp = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  fullScreen?: boolean;
};

export const Dialog = ({
  open,
  onClose,
  title,
  children,
  fullScreen,
}: DialogProp) => {
  const theme = useTheme();

  return (
    <MuiDialog
      fullScreen={fullScreen}
      onClose={onClose}
      open={open}
      sx={{
        ".MuiPaper-root": {
          backgroundColor: theme.palette.secondary.main,
          width: "100vw",
          maxWidth: "600px",
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
          right: 8,
          top: 8,
        }}
      >
        <img
          src={"/icons/xmark.svg"}
          width={20}
          height={20}
          alt={"close icon"}
        />
      </IconButton>

      <DialogContent sx={{ paddingTop: "0", fontSize: "14px" }}>
        {children}
      </DialogContent>
    </MuiDialog>
  );
};

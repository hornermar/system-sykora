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
          backgroundColor: theme.palette.secondary.main,
          maxWidth: "600px",
          border: `2px solid ${theme.palette.primary.main}`,
          borderRadius: "0",
        },
      }}
    >
      <DialogTitle sx={{ marginRight: "20px" }}>
        {title.toUpperCase()}
      </DialogTitle>

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

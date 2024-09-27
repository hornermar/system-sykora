import DialogTitle from "@mui/material/DialogTitle";
import { Dialog as MuiDialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { IconButton } from "@mui/material";

type DialogProp = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
};

export const Dialog = ({ open, onClose, title, children }: DialogProp) => {
  return (
    <MuiDialog
      fullScreen
      onClose={onClose}
      open={open}
      sx={{
        ".MuiPaper-root": {
          backgroundColor: "white",
        },
      }}
    >
      <DialogTitle sx={{ paddingBottom: 0 }}>{title}</DialogTitle>

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
          src={"/xmark-solid.svg"}
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

import { Dialog } from "../../common/Dialog/Dialog";
import { originalGrid } from "../../../lib/originalGrid";
import { Structure } from "../../Structure/Structure";
import { Typography, Link } from "@mui/material";

type IntroductionDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const IntroductionDialog = ({
  open,
  onClose,
}: IntroductionDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} title="Stěna, 1968" fullScreen>
      <Typography variant="body1">
        Na konci 60. let 20 století pomocí tohoto algoritmu vytvořil Stěnu pro
        pasáž. Původně z jedné strany sousedila s polským kulturním střediskem,
        z druhé později s výlezem ze stanice metra Můstek.
      </Typography>
      <Typography variant="body1">
        V roce 2005 byla pasáž zrušena a zastavěna obchody a bary a Sýkorova
        mozaika se tak stala součástí interiéru kavárny. Prostor byl doplněn
        patrem, což necitlivě rozdělilo mozaiku na dvě části a znemožnilo tak
        pohled na celé dílo. Dnes se zde nachází asijské bistro a v těsné
        blízkosti mozaiky se smaží nudle. To k uchchování uměleckého díla
        pravděpodobně příliš nepřidává.
      </Typography>

      <Typography variant="body1">
        Mozaiku najdete na adrese{" "}
        <Link
          href="https://maps.app.goo.gl/YAtsMNmorrUaSU3h7"
          target="_blank"
          rel="noopener noreferrer"
        >
          Jindřišská 832/3
        </Link>
        .
      </Typography>

      <Structure grid={originalGrid} sx={{ paddingTop: "20px" }} />
    </Dialog>
  );
};

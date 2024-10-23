import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "../components/common/Container/Container";
import { Structure } from "../components/Structure/Structure";
import { originalGrid } from "../lib/originalGrid";

const BlackWhiteStructureWrapper = () => {
  return (
    <>
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
        Mozaiku najdeš na adrese{" "}
        <Link
          to="https://maps.app.goo.gl/YAtsMNmorrUaSU3h7"
          target="_blank"
          rel="noopener noreferrer"
          className="underline"
        >
          <b>Jindřišská 832/3</b>
        </Link>
        .
      </Typography>
      <Structure grid={originalGrid} sx={{ paddingTop: "20px" }} />
    </>
  );
};

export const BlackWhiteStructure = () => {
  return (
    <Container
      title="Stěna, 1969"
      children={<BlackWhiteStructureWrapper />}
      fulllHeight
    />
  );
};

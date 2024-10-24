import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { Container } from "../components/common/Container/Container";
import { Structure } from "../components/Structure/Structure";
import { originalGrid } from "../lib/originalGrid";
import { useTheme } from "@mui/material/styles";

const BlackWhiteStructureWrapper = () => {
  return (
    <>
      <Typography variant="body1">
        Na konci 60. let 20 století Zdeněk Sýkora pomocí tohoto algoritmu
        vytvořil Stěnu pro pasáž v Jindřišské ulici v Praze. Z jedné strany
        původně sousedila s polským kulturním střediskem, z druhé později s
        výlezem ze stanice metra Můstek.
      </Typography>

      <Typography variant="body1">
        V roce 2005 byla pasáž zrušena a zastavěna obchody a bary a Sýkorova
        mozaika se tak stala součástí interiéru kavárny. Prostor byl doplněn
        patrem, což necitlivě rozdělilo mozaiku na dvě části a znemožnilo tak
        pohled na celé dílo. Dnes se v prostoru nachází asijské bistro a v těsné
        blízkosti mozaiky se smaží nudle. To k ochraně a uchování tohoto
        uměleckého díla rozhodně nepřispívá.
      </Typography>

      <Typography variant="body1">
        Mozaiku najdeš na adrese{" "}
        <Link
          to="https://maps.app.goo.gl/YAtsMNmorrUaSU3h7"
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
  const theme = useTheme();
  return (
    <Container
      title="Stěna, 1969"
      children={<BlackWhiteStructureWrapper />}
      color={theme.palette.primary}
      isPage
    />
  );
};

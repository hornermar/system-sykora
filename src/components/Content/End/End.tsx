import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const End = () => {
  return (
    <>
      <Typography variant="body1">
        ...Nenechte se ale zmást. V době, kdy Sýkora struktury vytvářel, byly
        pouze omezené počítačové možnosti. Z počítače dostal pouze seznam
        elementů a jejich umístění. Sám si pak pomocí vlastnoručně vyrobených
        razítek obraz převedl do výsledné podoby.
      </Typography>

      <Typography variant="body1">
        Zdeněk Sýkora se tak stal jedním z prvních umělců na světě, který do své
        tvorby zapojil počítač. Nejen díky tomu se stal mezinárodně uznávaným
        umělcem. Zároveň se mu ale nikdy už nepovedlo zbavit označení
        "počítačový umělec", i když se o to sám pokoušel.
      </Typography>

      <Typography variant="body1">
        A jak to aktuálně vypadá s jednou ze Sýkorových struktur v centru Prahy
        zjistíš{" "}
        <Link to="/jindrisska">
          <b>tady</b>
        </Link>
        .
      </Typography>
    </>
  );
};

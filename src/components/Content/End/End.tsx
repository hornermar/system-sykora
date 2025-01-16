import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export const End = () => {
  return (
    <>
      {/* <Typography variant="body1">
        Nenech se ale zmást. V době, kdy Sýkora své struktury vytvářel, byly
        pouze omezené počítačové možnosti. Z počítače dostal pouze seznam
        elementů a jejich umístění. Sám si pak pomocí vlastnoručně vyrobených
        razítek obraz převedl do výsledné podoby.
      </Typography> */}

      {/* <Typography variant="body1">
        Zdeněk Sýkora se tak stal jedním z prvních umělců na světě, který do své
        tvorby zapojil počítač. Nejen díky tomu se stal mezinárodně uznávaným
        umělcem. Zároveň se mu ale nikdy už nepovedlo zbavit označení
        "počítačový umělec", i když se o to sám pokoušel.
      </Typography> */}

      <Typography variant="body1">
        Jednu ze Sýkorových struktur, která je vytvořena pomocí tohoto
        algoritmu, najdeš v centru Prahy v ulici{" "}
        <Link
          to="https://maps.app.goo.gl/YAtsMNmorrUaSU3h7"
          rel="noopener noreferrer"
          className="underline"
        >
          Jindřišká
        </Link>
        .
      </Typography>

      <Typography variant="body1">
        Struktura vznikla v roce 1968 původně pro pasáž. V roce 2005 pasáž
        zanikla a její prostory byly přestavěny na obchody a bary. Mozaika,
        která se zde nacházela, se stala součástí interiéru kavárny. Při
        přestavbě ale došlo k jejímu necitlivému rozdělení na dvě části nově
        vytvořeným patrem.
      </Typography>

      <Typography variant="body1">
        Dnes zde působí asijské bistro, jehož provozovatelé zřejmě ani netuší,
        před jak hodnotným dílem se denodenně nachází. Na místě navíc o díle
        chybí jakákoli informace, takže se ani nedozvíš, před čím máš tu čest
        obědvat.
      </Typography>

      {/* <Typography variant="body1">
        A jak to aktuálně vypadá s jednou ze Sýkorových struktur v centru Prahy
        zjistíš{" "}
        <Link to="/jindrisska" className="underline">
          <b>tady</b>
        </Link>
        .
      </Typography> */}
    </>
  );
};

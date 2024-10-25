import { Typography } from "@mui/material";
import { Container } from "../components/common/Container/Container";
import { Sources } from "../components/Content/Sources/Sources";
import { Contact } from "../components/Content/Contanct/Contank";

const About = () => {
  return (
    <>
      <Typography variant="body1">
        Systém Sýkora je rekonstruovaný algoritmmus, který byl navržen Zdeňkěm
        Sýkorou pro vytváření Struktur. Tato aplikace jej intreaktivní formou
        představuje a přibližuje jeho principy.
      </Typography>

      <Contact />
      <Sources />
    </>
  );
};

export const AboutWrapper = () => {
  return <Container title="O projektu" children={<About />} isPage />;
};

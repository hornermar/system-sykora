import { Typography } from "@mui/material";
import { Container } from "../components/common/Container/Container";
import { Sources } from "../components/Content/Sources/Sources";
import { Contact } from "../components/Content/Contact/Contact";

const About = () => {
  return (
    <>
      <Typography variant="body1">
        Systém Sýkora je rekonstruovaný algoritmmus, který byl navržen Zdeňkěm
        Sýkorou pro vytváření struktur. Tato aplikace jej intreaktivní formou
        představuje a přibližuje jeho principy.
      </Typography>

      <Sources />
      <Contact />
    </>
  );
};

export const AboutWrapper = () => {
  return <Container title="O projektu" children={<About />} isPage />;
};

import { Typography } from "@mui/material";

import { useTheme } from "@mui/material/styles";
import { Container } from "../components/common/Container/Container";
import { Sources } from "../components/Content/Sources/Sources";
import { Contact } from "../components/Content/Contanct/Contank";

const About = () => {
  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        Systém Sýkora je rekonstruovaný algoritmmus, který byl navržen Zdeňkěm
        Sýkorou pro vytváření Struktur. Tato aplikace jej intreaktivní formou
        představuje a přibližuje jeho principy.
      </Typography>

      <Sources />
      <Contact />
    </>
  );
};

export const AboutWrapper = () => {
  const theme = useTheme();

  return (
    <Container
      title="O projektu"
      children={<About />}
      color={theme.palette.primary}
    />
  );
};

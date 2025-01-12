import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, useTheme, Box } from "@mui/material";

import { useForm } from "../hooks/useForm";
import { Container } from "../components/common/Container/Container";

const Dashboard = () => {
  const theme = useTheme();
  return (
    <>
      <Typography variant="body1" sx={{ paddingTop: "12px" }}>
        Objev, jak fungoval algoritmus pro tvorbu <b>Struktur</b>{" "}
        <b>Zdeňka Sýkory</b>.
      </Typography>

      <Box sx={{ "& .MuiTypography-root": { margin: 0 } }}>
        <Typography variant="body1">
          <i>Jaká pravidla řídila kompozici?</i>
        </Typography>
        <Typography variant="body1">
          <i>Jaké vstupy zadával Sýkora? </i>
        </Typography>
        <Typography variant="body1">
          <i>A co už bylo výsledkem výpočtu?</i>
        </Typography>
      </Box>

      {/* <Typography variant="body1">
        Zjisti, jak algoritmus funguje, jaká pravidla dodržuje a jaké vstupy
        zadával umělec a co už byla práce počítače.
      </Typography> */}

      <Box sx={{ margin: "30px 0" }}>
        <Typography
          variant="overline"
          sx={{
            color: theme.palette.primary.main,
            marginBottom: "-8px",
            display: "block",
          }}
        >
          8 KROKŮ
        </Typography>
        <Typography variant={"h2"} sx={{ maxWidth: "280px" }}>
          SESTAV&nbsp;SI SVOJÍ&nbsp;STRUKTURU
        </Typography>
      </Box>

      <Typography variant="body1">
        <b>Zdeněk Sýkora</b> od roku <b>1961</b> tvořil geometrické abstraktní
        malby zvané <b>Struktury</b>. Sýkorovy Struktury vznikaly z čtverců a
        obdélníků s různými obrazci, jejichž rozmístění určovala pravidla. Pro
        složitost výpočtů začal Sýkora v roce 1964 spolu s matematikem
        Jaroslavem Blažkem vytvářet program, který tento systém zprovoznil.
      </Typography>

      {/* <Typography variant="body1">
        Jejich kompozice byla tvořena prvky, opakujícími se čtverci či
        obdélníky, které měli uvnitř různé obrazce. Rozmístění těchto prvků
        ovlivňovala řada pravidel.
      </Typography>

      <Typography variant="body1">
        Výpočet rozmístění prvků se svou složitostí stal ideálním pro{" "}
        <b>počítač</b>. V roce <b>1964</b> začal proto Sýkora společně s
        matematikem <b>Jaroslavem Blažkem</b> vytvářet program, který tento
        systém zprovoznil. Vznikl tak unikátní algoritmus.
      </Typography> */}
    </>
  );
};

export const DashboardWrapper = () => {
  const navigate = useNavigate();
  const { onFormChange, defaultFormValues } = useForm();

  const resetForm = useCallback(() => {
    onFormChange(defaultFormValues);
  }, [onFormChange, defaultFormValues]);

  const handleNextButton = () => {
    resetForm();
    navigate("/structure?step=1");
  };

  return (
    <Container
      children={<Dashboard />}
      handleNext={handleNextButton}
      nextButton="Začít"
      isPage
    />
  );
};

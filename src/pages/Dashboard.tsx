import { useNavigate } from "react-router-dom";
import { Container } from "../components/common/Container/Container";
import { Typography } from "@mui/material";
import { useForm } from "../hooks/useForm";
import { useCallback } from "react";

const Dashboard = () => {
  return (
    <>
      <Typography variant="body1">
        <b>Zdeněk Sýkora</b> začal v roce <b>1961</b> vytvářet geometrické
        abstraktní malby, které nazýval <b>Struktury</b>.
      </Typography>
      <Typography variant="body1">
        Jejich kompozice byla tvořena prvky, opakujícími se čtverci či
        obdélníky, které měli uvnitř různé obrazce. Rozmístění těchto prvků
        ovlivňovala řada pravidel.
      </Typography>

      <Typography variant="body1">
        Výpočet rozmístění prvků se svou složitostí stal ideálním pro{" "}
        <b>počítač</b>. V roce <b>1964</b> začal proto Sýkora společně s
        matematikem <b>Jaroslavem Blažkem</b> vytvářet program, který tento
        systém zprovoznil. Vznikl tak unikátní algoritmus.
      </Typography>

      <Typography variant="body1" sx={{ marginTop: "20px" }}>
        <i>
          {/* jaká pravidla
          dodržuje a jaké vstupy zadával umělec a co už byla práce počítače. */}
        </i>
      </Typography>

      {/* <Structure
        grid={currentGrid}
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "absolute",
          top: 0,
          right: 0,
          zIndex: 1,
        }}
      /> */}
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
      title="Sestav&nbsp;si svojí&nbsp;strukturu"
      overline="8 kroků"
      handleNext={handleNextButton}
      nextButton="Začít"
      isPage
    />
  );
};

import { useNavigate } from "react-router-dom";
import { Container } from "../components/common/Container/Container";
import { Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <>
      <Typography variant="body1">
        Zdeněk Sýkora začal v roce 1961 vytvářet geometrické abstraktní obrazy.
        Skládaly se ze čtverců obdélníků, uvnitř kterých byly umístěny
        geometrické vzory.
      </Typography>

      <Typography variant="body1">
        V roce 1964 společně s matematikem Jaroslavem Blažke začali vytvářet
        program, který tento algoritmus uvedl do provozu. Díla vzniklá pomocí
        tohoto algoritmu nazýval struktury.
      </Typography>

      <Typography variant="body1">
        Vyzkoušej si, jak algoritmus funguje a vytvoř si vlastní strukturu!
      </Typography>
    </>
  );
};

export const DashboardWrapper = () => {
  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    navigate("/struktura");
  };

  return (
    <Container
      children={<Dashboard />}
      title="Systém Sýkora"
      titleVariant="h1"
      nextButton="Přejít k algoritmu"
      onNextButtonClick={handleNextButtonClick}
      fulllHeight
    />
  );
};

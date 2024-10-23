import { useNavigate } from "react-router-dom";
import { Container } from "../components/common/Container/Container";
import { Typography } from "@mui/material";
import { Structure } from "../components/Structure/Structure";
import { useEffect, useState } from "react";

const grid1 = [["4y", "4r", "4z", "3z", "4y", "4r", "3y"]];
const grid2 = [["4r", "4z", "3z", "4y", "4r", "4y", "4z"]];

const Dashboard = () => {
  const [currentGrid, setCurrentGrid] = useState(grid1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGrid((prevGrid) => (prevGrid === grid1 ? grid2 : grid1));
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const navigate = useNavigate();

  const handleNextButtonClick = () => {
    navigate("/struktura");
  };

  return (
    <>
      <Typography variant="body1">
        <b>Zdeněk Sýkora</b> začal v roce <b>1961</b> vytvářet geometrické
        abstraktní malby, které nazýval <b>Struktury</b>.
      </Typography>
      <Typography variant="body1">
        Jejich kompozice byla tvořena opakujícími se čtverci či obdélníky s
        geometrickými vzory. Umístění těchto elementů ovlivňovala řada pravidel.
      </Typography>

      <Typography variant="body1">
        Výpočet elementů se svou složitostí satl ideálním pro <b>počítač</b>. V
        roce <b>1964</b> začal proto Sýkora společně s matematikem{" "}
        <b>Jaroslavem Blažkem</b> vytvářet program, který tento systém
        zprovoznil.
      </Typography>

      <Typography
        variant="subtitle1"
        className="underline"
        onClick={handleNextButtonClick}
        sx={{ marginTop: "20px" }}
      >
        Prozkoumat
        <img
          src="/icons/chevron-right.svg"
          width={10}
          height={10}
          alt={"left icon"}
          style={{ marginLeft: "6px" }}
        />
      </Typography>

      <Typography variant="body1" sx={{ marginTop: "20px" }}>
        <i>
          Zjistíš, jak algoritmus funguje, jaká pravidla dodržuje a jaké vstupy
          zadával umělec a co už byla práce počítače.
        </i>
      </Typography>

      <Structure
        grid={currentGrid}
        sx={{ position: "absolute", top: 0, right: 0 }}
      />
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
      // nextButton="Prozkoumat systém"
      onNextButtonClick={handleNextButtonClick}
    />
  );
};

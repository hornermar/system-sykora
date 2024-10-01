import { Typography } from "@mui/material";
import { IntroductionDialog } from "./Dialog";
import { useSwitch } from "../../hooks/useSwitch";

export const Introduction = () => {
  const [openDialog, onOpenDialog, onCloseDialog] = useSwitch(false);

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
        Jednu ze struktur můžete najít v{" "}
        <span onClick={onOpenDialog} style={{ textDecoration: "underline" }}>
          centru Prahy!
        </span>
      </Typography>

      <IntroductionDialog open={openDialog} onClose={onCloseDialog} />

      <Typography variant="body1">
        Jak algoritmus funguje? Jaké parametry zadává umělec a co už je práce
        počítače?
      </Typography>
    </>
  );
};

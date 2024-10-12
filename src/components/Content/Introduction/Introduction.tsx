import { Typography } from "@mui/material";
import { IntroductionDialog } from "./Dialog";
import { useSwitch } from "../../../hooks/useSwitch";
// import { useStep } from "../../../hooks/useStep";

// type IntroductionProps = {
//   resetForm: () => void;
// };

export const Introduction = () => {
  const [openDialog, onOpenDialog, onCloseDialog] = useSwitch(false);
  // const { onStepChange } = useStep();

  // const onStart = () => {
  //   // resetForm();
  //   onStepChange(1);
  // };

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

      {/* <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <Button
          sx={{ padding: "12px 60px" }}
          variant="contained"
          onClick={() => onStart()}
        >
          Začít
        </Button>
      </Box> */}

      <Typography variant="body1">
        Jednu ze struktur můžete najít v{" "}
        <span onClick={onOpenDialog} style={{ textDecoration: "underline" }}>
          centru Prahy!
        </span>
      </Typography>
      <IntroductionDialog open={openDialog} onClose={onCloseDialog} />
    </>
  );
};

import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, useTheme, Box } from "@mui/material";

import { useForm } from "../hooks/useForm";
import { Container } from "../components/common/Container/Container";

// import { isEqual } from "lodash";
// import { useSwitch } from "../hooks/useSwitch";
// import { Dialog } from "../components/common/Dialog/Dialog";

const Dashboard = () => {
  const theme = useTheme();
  return (
    <>
      <Typography variant="body1" sx={{ paddingTop: "12px" }}>
        <b>Zdeněk Sýkora</b> začal v roce 1961 vytvářet geometrické abstraktní
        obrazy –⁠⁠⁠⁠⁠⁠ <b>Struktury</b>. Pro jejich tvorbu vymyslel algoritmus.
        {/* Vznikaly z čtverců a obdélníků s různými obrazci. které rozmístěnými do mřížky
        dle daných pravidel. */}
      </Typography>

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
        <Typography variant={"h2"} sx={{ maxWidth: "200px" }}>
          SESTAV&nbsp;SI STRUKTURU
        </Typography>
      </Box>

      <Typography variant="body1">
        Objev, jak algoritmus funguje.{" "}
        <i>
          Jaká pravidla řídi kompozici? Jaké vstupy zadával Sýkora? A co už bylo
          výsledkem výpočtu?
        </i>
      </Typography>

      {/* <Box sx={{ "& .MuiTypography-root": { margin: 0 }, marginTop: "30px" }}>
        <Typography variant="body1"></Typography>
        <Typography variant="body1">
          <i> </i>
        </Typography>
        <Typography variant="body1">
          <i></i>
        </Typography>
      </Box> */}

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

// type DashboardDialogProps = {
//   open: boolean;
//   onClose: () => void;
//   resetForm: () => void;
//   redirect: () => void;
// };

// const DashboardDialog = ({
//   open,
//   onClose,
//   resetForm,
//   redirect,
// }: DashboardDialogProps) => {
//   const handleNew = useCallback(() => {
//     resetForm();
//     onClose();
//     redirect();
//   }, [redirect, onClose, resetForm]);

//   const handleContinue = useCallback(() => {
//     onClose();
//     redirect();
//   }, [redirect, onClose]);

//   return (
//     <Dialog
//       open={open}
//       onClose={onClose}
//       title="Rozpracováno"
//       actions={[
//         {
//           text: "Pokračovat",
//           color: "secondary",
//           onClick: () => {
//             handleContinue();
//           },
//         },
//         {
//           text: "Nová",
//           color: "primary",
//           onClick: () => {
//             handleNew();
//           },
//         },
//       ]}
//     >
//       <Typography variant="body1">
//         Chcete začít od začátku nebo pokračovat v rozpracované struktuře?
//       </Typography>
//     </Dialog>
//   );
// };

export const DashboardWrapper = () => {
  const { onFormChange, defaultFormValues } = useForm();
  // const [openDialog, onOpenDialog, onCloseDialog] = useSwitch(false);
  const navigate = useNavigate();

  const redirect = useCallback(() => {
    navigate("/structure?step=1");
  }, [navigate]);

  const resetForm = useCallback(() => {
    onFormChange(defaultFormValues);
  }, [onFormChange, defaultFormValues]);

  const handleNextButton = () => {
    // if (!isEqual(form, defaultFormValues)) {
    //   onOpenDialog();
    // } else {
    //   redirect();
    // }
    redirect();
    resetForm();
  };

  return (
    <>
      <Container
        children={<Dashboard />}
        nextButton={{
          label: "Začít",
          onClick: handleNextButton,
        }}
        isPage
      />
      {/* <DashboardDialog
        open={openDialog}
        onClose={onCloseDialog}
        resetForm={resetForm}
        redirect={redirect}
      /> */}
    </>
  );
};

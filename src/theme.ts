import { createTheme } from "@mui/material/styles";

const white = "#ffffff";
const black = "#000000";

const primary = "#04C2DF";

export const customTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      light: "#dcf6fa",
      main: primary,
      dark: "#04a4bd",
      contrastText: black,
    },
    secondary: {
      light: "#c2c2c2",
      main: white,
      dark: "#242424",
      contrastText: black,
    },
  },
  typography: {
    fontFamily: "Roboto mono, monospace",
    h1: {
      fontFamily: "Pathway Gothic One, sans-serif",
      fontSize: "54px",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    h2: {
      fontFamily: "Pathway Gothic One, sans-serif",
      fontSize: "34px",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    h3: {
      fontFamily: "Pathway Gothic One, sans-serif",
      fontSize: "28px",
      fontWeight: 500,
      textTransform: "uppercase",
    },
    h6: {
      fontFamily: "Pathway Gothic One, sans-serif",
      textTransform: "uppercase",
      fontSize: "34px",
      fontWeight: 500,
    },
    body1: {
      fontSize: "14px",
      marginBottom: "10px",
      lineHeight: "1.6",
    },
    body2: {
      fontSize: "12px",
    },
    caption: {
      fontSize: "10px",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "30px",
          padding: "10px 25px",
          boxShadow: "none",
          borderWidth: "2px",
          "&:active, &:focus, &:hover": {
            boxShadow: "none",
          },
          "&:focus-visible": {
            boxShadow: "none",
          },
          "&.Mui-disabled.MuiButton-contained": {
            border: "2px solid rgba(0, 0, 0, 0)",
            backgroundColor: "rgb(117, 117, 117)",
            color: "#242424",
          },
          // "&.Mui-disabled": {
          //   borderWidth: "2px",
          // },
        },
        containedSecondary: {
          border: `2px solid ${black}`,
          "&:hover": {
            color: black,
            backgroundColor: white,
          },
        },
        containedPrimary: {
          color: white,
          border: `2px solid ${primary}`,
          "&:hover": {
            backgroundColor: primary,
          },
        },
        // endIcon: {
        //   marginLeft: "16px",
        // },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "13px",
          marginBottom: 0,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontFamily: "Pathway Gothic One, sans-serif",
          fontSize: "28px",
          fontWeight: 500,
          padding: "10px 80px 10px 20px",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          fontFamily: "Pathway Gothic One, sans-serif",
          fontWeight: 500,
          fontSize: "20px",
          boxShadow: "none",
        },
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          minHeight: "unset !important",
          textTransform: "uppercase",
        },
        content: {
          marginTop: "10px !important",
          marginBottom: "5px !important",
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        valueLabel: {
          top: -6,
          backgroundColor: "unset",
          color: white,
          fontSize: "13px",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          "&:active": {
            boxShadow: "none",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: black,
          color: white,
          border: `1px solid ${white}`,
          fontSize: "12px",
          maxWidth: "250px",
          fontWeight: 400,
          padding: "15px ",
        },
        arrow: {
          color: white,
        },
      },
    },
  },
});

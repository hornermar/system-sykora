import { createTheme } from "@mui/material/styles";

const white = "#ffffff";
const black = "#000000";

export const customTheme = createTheme({
  palette: {
    primary: {
      light: "#c0e9f0",
      main: black,
      dark: "#04c2df",
      contrastText: white,
    },
    secondary: {
      light: "#f3f3f3",
      main: "#e0e0e0",
      dark: "#c2c2c2",
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
      fontSize: "40px",
      fontWeight: 500,
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
      fontSize: "11px",
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          backgroundColor: "inherit",
          maxWidth: "850px",
          color: white,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          padding: "12px 15px",
          boxShadow: "none",
          borderWidth: "2px",

          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
          "&.Mui-disabled.MuiButton-contained": {
            border: "2px solid rgba(0, 0, 0, 0)",
          },
          "&.Mui-disabled": {
            borderWidth: "2px",
          },
        },
        containedPrimary: {
          border: `2px solid ${black}`,
        },
        outlinedPrimary: {
          border: "2px solid",
          backgroundColor: white,
        },
        endIcon: {
          marginLeft: "16px",
        },
        containedSecondary: {
          backgroundColor: "#c2c2c2",
        },
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
          color: black,
          fontSize: "13px",
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#c2c2c2",
          color: black,
          fontSize: "12px",
          maxWidth: "250px",
          fontWeight: 400,
          padding: "15px ",
        },
        arrow: {
          color: "#c2c2c2",
        },
      },
    },
  },
});

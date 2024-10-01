import { Dashboard } from "./pages/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

const customTheme = createTheme({
  palette: {
    primary: {
      light: "#04c2df",
      main: "#000000",
      dark: "#04c2df",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#f3f3f3",
      main: "#e0e0e0",
      dark: "#c2c2c2",
      contrastText: "#000000",
    },
  },
  typography: {
    fontFamily: "Roboto mono, monospace",
    h1: {
      fontFamily: "Pathway Gothic One, sans-serif",
      fontSize: "48px",
      fontWeight: 500,
    },
    h2: {
      fontFamily: "Pathway Gothic One, sans-serif",
      fontSize: "40px",
      fontWeight: 500,
    },

    body1: {
      fontSize: "14px",
      marginBottom: "10px",
      lineHeight: "1.6",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "10px",
          padding: "12px 20px",
          boxShadow: "none",

          "&:hover": {
            boxShadow: "none",
          },
          "&:active": {
            boxShadow: "none",
          },
        },
        outlined: {
          border: "2px solid",
          backgroundColor: "#ffffff",
        },
        endIcon: {
          marginLeft: "16px",
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        label: {
          fontSize: "13px",
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
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          {/* Add more routes here as needed */}
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

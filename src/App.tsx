import { Dashboard } from "./pages/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";
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
      light: "#1edffc",
      main: "#04c2df",
      dark: "#02899e",
      contrastText: "#ffffff",
    },
  },
  typography: {
    // fontSize: 10 Montserrat", sans-serif;
    fontFamily: "Roboto mono, monospace",
    h1: {
      fontFamily: "Pathway Gothic One, sans-serif",
      fontSize: "48px",
      fontWeight: 500,
    },
    h2: {
      fontFamily: "Pathway Gothic One, sans-serif",
      fontSize: "48px",
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
          borderRadius: "20px",
          padding: "30px 40px",
        },
        endIcon: {
          marginLeft: "16px", // Add margin-left for padding
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;

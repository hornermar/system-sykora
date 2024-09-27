import "./App.css";
import { Dashboard } from "./pages/Dashboard";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      light: "#1edffc",
      main: "#04c2df",
      dark: "#02899e",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#dce0e0",
      main: "#c0c4c4",
      dark: "#939696",
      contrastText: "#000000",
    },
  },
  // typography: {
  //   fontFamily: "Arial, sans-serif",
  // },
});

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Dashboard />
    </ThemeProvider>
  );
}

export default App;

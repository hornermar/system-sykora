import { ThemeProvider } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { Header } from "./components/Header/Header";

import { customTheme } from "./theme";

import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <ScrollToTop />
      <Header />
      <Outlet />
    </ThemeProvider>
  );
}

export default App;

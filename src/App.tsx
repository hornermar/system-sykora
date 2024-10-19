import { DashboardWrapper } from "./pages/Dashboard";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import { AboutWrapper } from "./pages/About";
import { SourcesWrapper } from "./pages/Sources";
import { customTheme } from "./theme";
import { GeneratorWrapper } from "./pages/Generator";
import "./App.css";

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<DashboardWrapper />} />
          <Route path="/struktura" element={<GeneratorWrapper />} />

          <Route path="/zdroje" element={<SourcesWrapper />} />
          <Route path="/o-projektu" element={<AboutWrapper />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;

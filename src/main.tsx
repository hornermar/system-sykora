import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.tsx";
import { GeneratorWrapper } from "./pages/Generator.tsx";
import { BlackWhiteStructure } from "./pages/BlackWhiteStructure.tsx";
import { AboutWrapper } from "./pages/About.tsx";
import { DashboardWrapper } from "./pages/Dashboard.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <DashboardWrapper />,
      },
      {
        path: "struktura",
        element: <GeneratorWrapper />,
      },
      {
        path: "jindrisska",
        element: <BlackWhiteStructure />,
      },
      {
        path: "o-projektu",
        element: <AboutWrapper />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

import * as React from "react";
import { Button, Toolbar, Box, AppBar, IconButton } from "@mui/material/";
import { HeaderDrawer } from "./Drawer";
import { useLocation } from "react-router-dom";
import { HeaderProgressbar } from "./Progressbar";

interface Props {
  window?: () => Window;
}

const navItems = [
  {
    label: "Vygeneruj si strukturu",
    to: "/struktura",
    colors: { backgroundColor: "white", color: "black" },
  },
  {
    label: "Zdroje",
    to: "/zdroje",
    colors: { backgroundColor: "black", color: "white" },
  },
  {
    label: "O projektu",
    to: "/o-projektu",
    colors: { backgroundColor: "black", color: "white" },
  },
];

export const Header = (props: Props) => {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const colors = navItems.find((item) => item.to === location.pathname)?.colors;

  return (
    <Box>
      <AppBar component="nav" sx={{ ...colors }}>
        <HeaderProgressbar />
        <Toolbar
          sx={{ display: "flex", justifyContent: "flex-end", padding: "0 8px" }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { sm: "none" } }}
          >
            <img
              src={
                colors?.color === "white"
                  ? "/icons/bars-white.svg"
                  : "/icons/bars.svg"
              }
              width={30}
              height={30}
              alt={"chevron down icon"}
            />
          </IconButton>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button key={item.label}>{item.label}</Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <HeaderDrawer
        container={container}
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
        navItems={navItems}
      />
    </Box>
  );
};

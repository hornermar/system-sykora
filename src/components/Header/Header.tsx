import * as React from "react";
import { Button, Toolbar, Box, AppBar, IconButton } from "@mui/material/";
import { HeaderDrawer } from "./Drawer";
import { useLocation } from "react-router-dom";

interface Props {
  window?: () => Window;
}

const navItems = [
  {
    label: "Prozkoumat algoritmus",
    to: "/struktura",
    colors: { backgroundColor: "white", color: "black" },
  },
  {
    label: "Struktura v Jindřišské",
    to: "/jindrisska",
    colors: { backgroundColor: "black", color: "white" },
  },
  {
    label: "Zdroje",
    to: "/zdroje",
    colors: { backgroundColor: "black", color: "white" },
  },
  // {
  //   label: "O projektu",
  //   to: "/o-projektu",
  //   colors: { backgroundColor: "black", color: "white" },
  // },
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
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{
          display: { xs: "block", sm: "none" },
          position: "absolute",
          right: 12,
          top: 14,
        }}
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

      <AppBar
        component="nav"
        sx={{ ...colors, display: { xs: "none", sm: "block" } }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 8px",
          }}
        >
          <Box>
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
    </>
  );
};

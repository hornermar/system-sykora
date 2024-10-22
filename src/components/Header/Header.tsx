import * as React from "react";
import { Toolbar, Stack, AppBar, IconButton, Typography } from "@mui/material/";
import { HeaderDrawer } from "./Drawer";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

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
    colors: { backgroundColor: "#f6e93f", color: "black" },
  },
  {
    label: "Zdroje",
    to: "/zdroje",
    colors: { backgroundColor: "#f6e93f", color: "black" },
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
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const colors = navItems.find((item) => item.to === location.pathname)?.colors;

  const currentPage = location.pathname + location.search;

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
        sx={{
          ...colors,
          display: { xs: "none", sm: "block" },
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            padding: "0 8px",
          }}
        >
          <Stack direction="row" gap={2}>
            {navItems.map((item) => {
              const isDisabled = currentPage === item.to;

              return (
                <Link key={item.label} to={item.to}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      textDecoration: "none",
                      color: isDisabled
                        ? theme.palette.text.disabled
                        : colors?.color,
                    }}
                  >
                    {item.label}
                  </Typography>
                </Link>
              );
            })}
          </Stack>
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

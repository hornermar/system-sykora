import * as React from "react";
import {
  Toolbar,
  Stack,
  AppBar,
  IconButton,
  Typography,
  Box,
} from "@mui/material/";
import { HeaderDrawer } from "./Drawer";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

interface Props {
  window?: () => Window;
}

const navItems = [
  {
    label: "Systém Sýkora",
    to: "/",
  },
  {
    label: "Prozkoumat systém",
    to: "/struktura",
  },
  {
    label: "Struktura v Jindřišské",
    to: "/jindrisska",
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
  const navigate = useNavigate();
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleItemClick = (to: string) => {
    navigate(to.toLowerCase());
  };

  const isLocationWithTitle = ["/o-projektu", "/jindrisska"].includes(
    location.pathname
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const currentPage = location.pathname + location.search;

  return (
    <>
      <Box
        sx={{
          display: { xs: "flex", lg: "none" },
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 10px 0 20px",
          zIndex: 1000,
          position: "absolute",
          width: "100%",
          height: "42.6719px",
        }}
      >
        {isLocationWithTitle && (
          <Typography
            variant="h3"
            sx={{ cursor: "pointer", color: theme.palette.secondary.dark }}
            onClick={() => handleItemClick(navItems[0].to)}
          >
            {navItems[0].label}
          </Typography>
        )}

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ position: "absolute", right: "8px" }}
        >
          <img
            src={"/icons/bars.svg"}
            width={30}
            height={30}
            alt={"chevron down icon"}
          />
        </IconButton>
      </Box>

      <AppBar
        component="nav"
        sx={{
          display: { xs: "none", lg: "block" },
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
                        : theme.palette.text.primary,
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
        handleItemClick={handleItemClick}
      />
    </>
  );
};

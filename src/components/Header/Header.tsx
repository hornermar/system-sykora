import { useState } from "react";
import {
  Stack,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material/";
import { HeaderDrawer } from "./Drawer";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

import { map } from "lodash";

interface Props {
  window?: () => Window;
}

const maxWidth = "1200px";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmallMedia = useMediaQuery(theme.breakpoints.down("lg"));

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleItemClick = (to: string) => {
    navigate(to.toLowerCase());
  };

  const isLocationWithTitle =
    ["/o-projektu", "/jindrisska"].includes(location.pathname) ||
    (!isSmallMedia && location.pathname !== "/");

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const isPage = ["/o-projektu", "/jindrisska"].includes(location.pathname);
  const currentPage = location.pathname + location.search;

  return (
    <>
      <Stack
        direction="row"
        justifyContent="space-between"
        sx={{
          margin: "0 auto",
          alignItems: "center",
          padding: { xs: "4px 10px 0 20px", lg: "10px 20px 0 20px" },
          zIndex: 1000,
          maxWidth: maxWidth,
          width: "100%",
          backgroundColor: isPage ? theme.palette.primary.light : "white",
          height: "48px",
        }}
      >
        <Typography
          variant="h3"
          sx={{ cursor: "pointer", color: theme.palette.secondary.dark }}
          onClick={() => isLocationWithTitle && handleItemClick(navItems[0].to)}
        >
          {isLocationWithTitle && navItems[0].label}
        </Typography>

        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{
            display: { xs: "flex", lg: "none", zIndex: 1000 },
          }}
        >
          <img
            src={"/icons/bars.svg"}
            width={30}
            height={30}
            alt={"chevron down icon"}
          />
        </IconButton>

        <Stack
          direction="row"
          gap={2}
          sx={{
            display: { xs: "none", lg: "flex" },
          }}
        >
          {map(navItems.slice(1), (item) => {
            return (
              <Typography variant="subtitle1">
                <Link
                  key={item.label}
                  to={item.to}
                  className={
                    currentPage === item.to
                      ? "underline"
                      : "underline underline-disabled"
                  }
                >
                  {item.label}
                </Link>
              </Typography>
            );
          })}
        </Stack>
      </Stack>

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

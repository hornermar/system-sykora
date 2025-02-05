import {
  Typography,
  ListItemText,
  ListItemButton,
  ListItem,
  List,
  Drawer,
  Box,
  IconButton,
} from "@mui/material/";
import { useTheme } from "@mui/material/styles";
import { map } from "lodash";

type HeaderDrawerProps = {
  container: (() => HTMLElement) | undefined;
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
  navItems: { label: string; to: string }[];
  handleItemClick: (to: string) => void;
};

const drawerWidth = 240;

export const HeaderDrawer = ({
  container,
  mobileOpen,
  handleDrawerToggle,
  navItems,
  handleItemClick,
}: HeaderDrawerProps) => {
  const theme = useTheme();
  const currentPage = location.pathname + location.search;

  const onItemClick = (to: string) => {
    handleItemClick(to);
    handleDrawerToggle();
  };

  return (
    <nav>
      <Drawer
        container={container}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        anchor="right"
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", lg: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: { xs: "100vw", lg: drawerWidth },
            backgroundColor: theme.palette.secondary.dark,
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "60px",
            padding: "4px 10px 10px 20px",
          }}
        >
          <Typography
            variant="h3"
            sx={{ cursor: "pointer" }}
            onClick={() => onItemClick(navItems[0].to)}
          >
            {navItems[0].label}
          </Typography>

          <IconButton onClick={handleDrawerToggle}>
            <img
              src={"/icons/xmark.svg"}
              width={30}
              height={30}
              alt={"close icon"}
            />
          </IconButton>
        </Box>
        <Box sx={{ padding: "0 20px 0 4px" }}>
          <List>
            {map(navItems.slice(1), (item) => {
              const isDisabled = currentPage === item.to;

              return (
                <ListItem
                  key={item.label}
                  disablePadding
                  onClick={() =>
                    !isDisabled ? onItemClick(item.to) : handleDrawerToggle()
                  }
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="comments"
                      disabled={isDisabled}
                      sx={{ opacity: isDisabled ? 0.5 : 1 }}
                    >
                      <img
                        src={"/icons/arrow-right.svg"}
                        width={15}
                        height={15}
                        alt="arrow right icon"
                      />
                    </IconButton>
                  }
                >
                  <ListItemButton disabled={isDisabled}>
                    <ListItemText
                      primary={item.label}
                      sx={{
                        ".MuiTypography-root": {
                          marginBottom: 0,
                          fontSize: "20px",
                        },
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Box>
      </Drawer>
    </nav>
  );
};

import { Stack, Box, Collapse } from "@mui/material";

import { useTheme } from "@mui/material/styles";

type ResultCollapseProps = {
  open: boolean;
  children: React.ReactNode;
};

export const ResultCollapse = ({ open, children }: ResultCollapseProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        position: "fixed",
        width: "100vw",
        left: 0,
        bottom: 0,
        borderTop: open
          ? `2px solid ${theme.palette.secondary.contrastText}`
          : "none",
        borderLeft: `2px solid ${theme.palette.secondary.contrastText}`,
        borderRight: `2px solid ${theme.palette.secondary.contrastText}`,
        borderBottom: open
          ? `2px solid ${theme.palette.secondary.contrastText}`
          : "none",
        zIndex: 700,
      }}
    >
      <Collapse
        in={open}
        orientation="vertical"
        sx={{ backgroundColor: theme.palette.secondary.dark }}
      >
        <Stack
          sx={{
            padding: "20px 35px 75px",
          }}
        >
          {children}
        </Stack>
      </Collapse>
    </Box>
  );
};

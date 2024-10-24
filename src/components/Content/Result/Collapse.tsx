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
        borderTop: open ? `2px solid ${theme.palette.primary.main}` : "none",
        borderLeft: `2px solid ${theme.palette.primary.main}`,
        borderRight: `2px solid ${theme.palette.primary.main}`,
        borderBottom: open ? `2px solid ${theme.palette.primary.main}` : "none",
        zIndex: 1000,
      }}
    >
      <Collapse in={open} orientation="vertical">
        <Stack
          sx={{
            backgroundColor: theme.palette.secondary.main,
            padding: "20px 35px 15px",
          }}
        >
          {children}
        </Stack>
      </Collapse>
    </Box>
  );
};

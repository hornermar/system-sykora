import { Stack, Box } from "@mui/material";

type ContainerWithStructure = {
  children: React.ReactNode;
  structure?: React.ReactNode;
};

export const ContainerWithStructure = ({
  children,
  structure,
}: ContainerWithStructure) => {
  return (
    <Stack
      sx={{
        display: "flex",
        flexDirection: {
          xs: "column",
          lg: "row",
        },
        gap: { xs: 0, lg: "60px" },
      }}
    >
      <Box sx={{ width: { xs: "100%", lg: "50%" } }}>{children}</Box>

      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
        }}
      >
        {structure && structure}
      </Box>
    </Stack>
  );
};

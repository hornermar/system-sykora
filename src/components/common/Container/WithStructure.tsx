import { Stack, Box } from "@mui/material";

type ContainerWithStructure = {
  firstPart: React.ReactNode;
  secondPart?: React.ReactNode;
  structure?: React.ReactNode;
};

export const ContainerWithStructure = ({
  firstPart,
  secondPart,
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
      <Box sx={{ width: { xs: "100%", lg: "50%" } }}>
        {firstPart}
        {secondPart && (
          <Box sx={{ display: { xs: "none", lg: "block" } }}>{secondPart}</Box>
        )}
      </Box>

      <Box
        sx={{
          width: { xs: "100%", lg: "50%" },
        }}
      >
        {structure && structure}
      </Box>

      {secondPart && (
        <Box
          sx={{
            width: { xs: "100%", lg: "50%" },
            display: { xs: "block", lg: "none" },
          }}
        >
          {secondPart}
        </Box>
      )}
    </Stack>
  );
};

import { Stack, Box, PaletteColor, Button, useTheme } from "@mui/material";
import { Title } from "../Title/Title";
import React from "react";

const maxWidth = "1200px";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  titleVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  overline?: string;
  color?: PaletteColor;
  backButton?: string;
  nextButton?: string;
  disableNext?: boolean;
  handleNext?: () => void;
  handleBack?: () => void;
  isPage?: boolean;
  onOpenInstruction?: () => void;
};

export const Container = ({
  children,
  title,
  overline,
  backButton,
  nextButton,
  disableNext,
  handleNext,
  handleBack,
  isPage,
  onOpenInstruction,
}: ContainerProps) => {
  const theme = useTheme();

  return (
    <Stack
      sx={{
        maxWidth: maxWidth,
        width: "100%",
        margin: "0 auto",
        justifyContent: "space-between",
        minHeight: { xs: "100vh", lg: "calc(100vh - 48px )" },
        padding: { xs: 0, lg: "0 20px" },
        marginTop: { xs: "-48px", lg: "0" },
        position: "relative",
        color: theme.palette.text.primary,
      }}
    >
      <Box
        sx={{
          fontSize: "16px",
          padding: {
            xs: isPage ? "60px 20px 20px" : "0px 20px 70px",
            lg: "40px 20px 0",
          },
          textAlign: "left",
        }}
      >
        {/* Title with Progress */}
        <Title
          title={title}
          onOpenInstruction={onOpenInstruction}
          overline={overline}
        />

        {/* Children */}
        <Box sx={{ marginTop: "20px" }}>{children}</Box>
      </Box>

      {/* Buttons */}

      {backButton && (
        <Button
          variant="contained"
          color="secondary"
          onClick={handleBack}
          sx={{
            position: { xs: "fixed", lg: "block" },
            bottom: 15,
            left: { xs: 20, lg: "calc(50% - 150px)" },
            zIndex: 800,
          }}
        >
          {backButton}
        </Button>
      )}

      {nextButton && (
        <Button
          variant="contained"
          color="primary"
          onClick={handleNext}
          disabled={disableNext}
          sx={{
            position: "fixed",
            bottom: 15,
            right: { xs: 20, lg: "calc(50% - 150px)" },
            zIndex: 800,
          }}
        >
          {nextButton}
        </Button>
      )}
    </Stack>
  );
};

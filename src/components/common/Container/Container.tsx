import { Stack, Box, PaletteColor, Button, useTheme } from "@mui/material";
import { Title } from "../Title/Title";
import React from "react";
import { StepButton } from "../../../hooks/useStepLogic";

const maxWidth = "1200px";

type ContainerProps = {
  children: React.ReactNode;
  title?: string;
  titleVariant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  color?: PaletteColor;
  backButton?: StepButton;
  nextButton?: StepButton;
  secondNextButton?: StepButton;
  isPage?: boolean;
  onOpenInstruction?: () => void;
};

export const Container = ({
  children,
  title,
  backButton,
  nextButton,
  secondNextButton,
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
        <Title title={title} onOpenInstruction={onOpenInstruction} />

        {/* Children */}
        <Box sx={{ marginTop: "20px" }}>{children}</Box>
      </Box>

      {/* Buttons */}

      {backButton?.label && (
        <Button
          variant="contained"
          color="secondary"
          onClick={backButton.onClick}
          disabled={backButton.isDisabled}
          sx={{
            position: { xs: "fixed", lg: "block" },
            bottom: 20,
            left: { xs: 20, lg: "calc(50% - 150px)" },
            zIndex: 800,
          }}
        >
          {backButton?.label}
        </Button>
      )}

      {secondNextButton?.label && (
        <Button
          variant="outlined"
          color="primary"
          onClick={secondNextButton.onClick}
          disabled={secondNextButton.isDisabled}
          sx={{
            position: "fixed",
            bottom: 90,
            right: { xs: 20, lg: "calc(50% - 150px)" },
            zIndex: 800,
          }}
        >
          {secondNextButton.label}
        </Button>
      )}

      {nextButton?.label && (
        <Button
          variant="contained"
          color="primary"
          onClick={nextButton.onClick}
          disabled={nextButton.isDisabled}
          sx={{
            position: "fixed",
            bottom: 20,
            right: { xs: 20, lg: "calc(50% - 150px)" },
            zIndex: 800,
          }}
        >
          {nextButton.label}
        </Button>
      )}
    </Stack>
  );
};

import { Box, MobileStepper, IconButton } from "@mui/material";
import { ViewMode } from "../../types/General";

type StructureToolboxProps = {
  width: number;
  viewMode: ViewMode;
  isViewModeChangeable?: boolean;
  setViewMode: (mode: ViewMode) => void;
};

export const StructureToolbox = ({
  width,
  viewMode,
  isViewModeChangeable,
  setViewMode,
}: StructureToolboxProps) => {
  return (
    <Box
      sx={{
        width: `${width}px`,
        position: "relative",
        minHeight: { xs: "24px" },
      }}
    >
      {isViewModeChangeable && (
        <MobileStepper
          variant="dots"
          steps={2}
          position="static"
          activeStep={viewMode === "text" ? 0 : 1}
          sx={{
            justifyContent: "space-evenly",
            width: "100%",
          }}
          nextButton={
            <IconButton
              size="small"
              onClick={() => setViewMode("image")}
              disabled={viewMode === "image"}
              sx={{ display: { xs: "none", lg: "block" } }}
            >
              <img
                src={
                  viewMode === "image"
                    ? "/icons/chevron-right-disabled.svg"
                    : "/icons/chevron-right.svg"
                }
                width={30}
                height={25}
                alt={"right icon"}
                style={{ marginBottom: "-2px" }}
              />
            </IconButton>
          }
          backButton={
            <IconButton
              size="small"
              onClick={() => setViewMode("text")}
              disabled={viewMode === "text"}
              sx={{ display: { xs: "none", lg: "block" } }}
            >
              <img
                src={
                  viewMode === "text"
                    ? "/icons/chevron-left-disabled.svg"
                    : "/icons/chevron-left.svg"
                }
                width={30}
                height={25}
                alt={"left icon"}
                style={{ marginBottom: "-2px" }}
              />
            </IconButton>
          }
        />
      )}
    </Box>
  );
};

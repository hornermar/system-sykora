import { Box, MobileStepper } from "@mui/material";
import { ViewMode } from "../../types/General";
import { StructureTooltip } from "./Tooltip";

type StructureToolboxProps = {
  width: number;
  clickable: boolean;
  viewMode: ViewMode;
  isViewModeChangeable?: boolean;
  tooltip?: string;
};

export const StructureToolbox = ({
  width,
  clickable,
  viewMode,
  isViewModeChangeable,
  tooltip,
}: StructureToolboxProps) => {
  return (
    <Box sx={{ width: `${width}px`, position: "relative" }}>
      {isViewModeChangeable && (
        <MobileStepper
          variant="dots"
          steps={2}
          position="static"
          activeStep={viewMode === "text" ? 0 : 1}
          sx={{
            justifyContent: "center",
          }}
          nextButton={<></>}
          backButton={<></>}
        />
      )}
      {clickable && <StructureTooltip tooltip={tooltip} />}
    </Box>
  );
};

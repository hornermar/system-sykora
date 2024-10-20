import { useSwitch } from "../../hooks/useSwitch";
import { Tooltip } from "@mui/material";

type StructureTooltip = {
  tooltip?: string;
};

export const StructureTooltip = ({ tooltip }: StructureTooltip) => {
  const [openTooltip, onOpenTooltip, onCloseTooltip] = useSwitch(false);

  return (
    <Tooltip
      title={tooltip ?? "Do jednotlivých buňěk je možné klikat."}
      open={openTooltip}
      onOpen={onOpenTooltip}
      onClose={onCloseTooltip}
      onClick={onOpenTooltip}
      placement="right"
      arrow
      sx={{ width: "100px" }}
      leaveDelay={5000}
    >
      <img
        style={{
          position: "absolute",
          top: -35,
          right: 6,
          rotate: "0deg",
        }}
        src={"/icons/circle-info.svg"}
        width={25}
        height={25}
        alt={"hand icon"}
      />
    </Tooltip>
  );
};

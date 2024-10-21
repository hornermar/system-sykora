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
          bottom: 0,
          right: 0,
        }}
        src={"/icons/hand-pointer.svg"}
        width={20}
        height={20}
        alt={"circle icon"}
      />
    </Tooltip>
  );
};

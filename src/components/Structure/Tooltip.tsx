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
    >
      <img
        style={{
          position: "absolute",
          top: 5,
          left: -30,
          rotate: "90deg",
        }}
        src={"/icons/hand-pointer.svg"}
        width={25}
        height={25}
        alt={"hand icon"}
      />
    </Tooltip>
  );
};

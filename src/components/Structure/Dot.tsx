import { useSwitch } from "../../hooks/useSwitch";
import { Tooltip } from "@mui/material";

export const StructureDot = () => {
  const [openTooltip, onOpenTooltip, onCloseTooltip] = useSwitch(false);

  return (
    <Tooltip
      title={"Do jednotlivých buňěk je možné klikat."}
      open={openTooltip}
      onOpen={onOpenTooltip}
      onClose={onCloseTooltip}
      onClick={onOpenTooltip}
      placement="bottom"
      arrow
      sx={{ width: "100px" }}
    >
      <img
        style={{
          position: "absolute",
          top: -33,
          right: 3,
          transform: "rotate(180deg)",
        }}
        src={"/icons/circle.svg"}
        width={20}
        height={20}
        alt={"circle icon"}
      />
    </Tooltip>
  );
};

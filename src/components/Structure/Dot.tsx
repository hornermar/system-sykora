import { useSwitch } from "../../hooks/useSwitch";
import { Tooltip } from "@mui/material";

export const StructureDot = () => {
  const [openTooltip, onOpenTooltip, onCloseTooltip] = useSwitch(false);

  return (
    <Tooltip
      title={"Do jednotlivých buněk je možné klikat."}
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
          top: -30,
          right: 0,
        }}
        src={"/system-sykora/icons/circle.svg"}
        width={15}
        height={15}
        alt={"circle icon"}
      />
    </Tooltip>
  );
};

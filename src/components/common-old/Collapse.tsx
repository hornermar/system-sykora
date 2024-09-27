import { Collapse as MuiCollapse, Stack, SxProps } from "@mui/material";
import { memo, useState } from "react";
import arrowLeftIcon from "../../../public/arrow-left-solid.svg";
import { IconButton } from "@mui/material";
import { primaryColor } from "../../pages/Dashboard";

type CollapseProps = {
  children: React.ReactNode;
  defaultExpanded?: boolean;
  expandable?: boolean;
  sx?: SxProps;
};

export const Collapse = memo(function Collapse({
  children,
  defaultExpanded,
  expandable = true,
  sx,
}: CollapseProps) {
  const [expanded, setExpanded] = useState(defaultExpanded ?? false);

  return (
    <MuiCollapse
      in={expanded}
      orientation="horizontal"
      collapsedSize={35}
      onClick={!expanded ? () => setExpanded(true) : undefined}
      sx={{
        marginLeft: "-25px",
        marginTop: "10px",
        borderTopRightRadius: "60px",
        borderBottomRightRadius: "60px",
        zIndex: 1000,
        ...sx,
      }}
    >
      <Stack
        gap={2}
        flexDirection="row"
        // justifyContent="space-between"
        // alignItems="center"
        flexWrap="wrap"
        sx={{
          float: "right",
          padding: "5px 10px 5px 25px",
          borderTopRightRadius: "40px",
          borderBottomRightRadius: "40px",
          minWidth: "25px",
          fontSize: "14px",
          backgroundColor: primaryColor,
          cursor: expanded ? "default" : "pointer",
          color: expanded ? "black" : "transparent",
          zIndex: 100,
        }}
      >
        <>
          {children}
          {(expandable || defaultExpanded) && (
            <IconButton
              color="inherit"
              onClick={() => setExpanded(false)}
              sx={{
                marginLeft: "15px",
              }}
            >
              <img
                src={arrowLeftIcon}
                width={20}
                height={20}
                alt={"arrow left icon"}
              />
            </IconButton>
          )}
        </>
      </Stack>
    </MuiCollapse>
  );
});

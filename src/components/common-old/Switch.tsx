import { Switch as MuiSwitch, SxProps, styled } from "@mui/material";
import { memo } from "react";
import { clickableColor } from "../Dashboard";

const StyledSwitch = styled(MuiSwitch)((props) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
        margin: 1,
        padding: 0,
        transform: "translateX(6px)",
        "&.Mui-checked": {
            transform: "translateX(22px)",
            "& + .MuiSwitch-track": {
                opacity: 1,
                backgroundColor: "gray",
            },
        },
    },
    "& .MuiSwitch-thumb": {
        backgroundColor: "black",
        width: 32,
        height: 32,
        "&::before": {
            content: "''",
            position: "absolute",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
        },
    },
    "& .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: "gray",
        borderRadius: 20 / 2,
    },
}));

const MemoizedStyledSwitch = memo(StyledSwitch);

type SwitchProps = {
    onChange: () => void;
    checked: boolean;
    sx?: SxProps;
};

export const Switch = memo(function Switch({
    onChange,
    checked,
    sx,
}: SwitchProps) {
    return (
        <MemoizedStyledSwitch checked={checked} onChange={onChange} sx={sx} />
    );
});

export const GridSwitch = memo(function GridSwitch({
    onChange,
    checked,
    sx,
}: SwitchProps) {
    return (
        <Switch
            checked={checked}
            onChange={onChange}
            sx={{
                "& .MuiSwitch-switchBase": {
                    "&.Mui-checked": {
                        "& .MuiSwitch-thumb:before": {
                            backgroundImage: `url('/border-all-solid.svg')`,
                        },
                    },
                },
                "& .MuiSwitch-thumb": {
                    "&::before": {
                        backgroundImage: `url('/square-regular.svg')`,
                    },
                },
                ...sx,
            }}
        />
    );
});

export const OnOffSwitch = memo(function OnOffSwitch({
    onChange,
    checked,
}: SwitchProps) {
    return <Switch checked={checked} onChange={onChange} sx={{}} />;
});

// import {
//     ToggleButtonGroup as MuiToggleButtonGroup,
//     ToggleButton,
//     styled,
// } from "@mui/material";
// import { map } from "lodash";

// const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)(() => ({
//     marginTop: "10px",
//     ".MuiButtonBase-root": {
//         fontSize: "12px",
//         borderColor: "black",
//         backgroundColor: "white",
//         color: "black",
//         textTransform: "none",
//         fontWeight: "400",
//         padding: "4px",
//     },
//     ".Mui-selected": {
//         color: "white !important",
//         backgroundColor: "black !important",
//     },
//     ".MuiToggleButtonGroup-grouped:not(:last-of-type)": {
//         borderTopLeftRadius: "20px",
//         borderBottomLeftRadius: "20px",
//         paddingLeft: "6px",
//     },
//     ".MuiToggleButtonGroup-grouped:not(:first-of-type)": {
//         borderTopRightRadius: "20px",
//         borderBottomRightRadius: "20px",
//         paddingRight: "10px",
//     },
// }));

// type ToggleButtonGroupProps = {
//     value: boolean;
//     onChange: (value: boolean) => void;
//     buttons: {
//         label: string;
//         value: boolean;
//     }[];
// };

// export const ToggleButtonGroup = ({
//     value,
//     onChange,
//     buttons,
// }: ToggleButtonGroupProps) => {
//     return (
//         <StyledToggleButtonGroup
//             size="small"
//             value={value}
//             exclusive
//             onChange={(e, newValue) => {
//                 if (newValue === null) return;
//                 onChange(newValue);
//             }}
//         >
//             {map(buttons, (button, index) => (
//                 <ToggleButton value={button.value} key={index}>
//                     {button.label}
//                 </ToggleButton>
//             ))}
//         </StyledToggleButtonGroup>
//     );
// };

import {
  ToggleButtonGroup as MuiToggleButtonGroup,
  ToggleButton,
  styled,
} from "@mui/material";
import { map } from "lodash";
import { clickableColor } from "../../pages/Dashboard";

const StyledToggleButtonGroup = styled(MuiToggleButtonGroup)(() => ({
  padding: "4px",
  ".MuiButtonBase-root": {
    padding: "2px 8px",
    color: "black",
    fontWeight: "400",
    border: "none",
    backgroundColor: "transparent",
    textTransform: "none",
    ":hover": {
      backgroundColor: "transparent",
      fontWeight: "500",
    },
  },
  ".Mui-selected": {
    backgroundColor: "transparent !important",
    textDecoration: "underline !important",
    color: `${clickableColor} !important`,
  },

  ".MuiToggleButtonGroup-grouped:not(:last-of-type)": {
    borderRight: "1px solid black",
  },
  ".MuiToggleButtonGroup-grouped:not(:first-of-type)": {},
}));

type ToggleButtonGroupProps = {
  value: any;
  onChange: (value: boolean) => void;
  buttons: {
    label: string;
    value: any;
  }[];
};

export const ToggleButtonGroup = ({
  value,
  onChange,
  buttons,
}: ToggleButtonGroupProps) => {
  return (
    <StyledToggleButtonGroup
      value={value}
      exclusive
      onChange={(e, newValue) => {
        if (newValue === null) return;
        onChange(newValue);
      }}
    >
      {map(buttons, (button, index) => (
        <ToggleButton value={button.value} key={index}>
          {button.label}
        </ToggleButton>
      ))}
    </StyledToggleButtonGroup>
  );
};

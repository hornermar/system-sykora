import {
  Slider as MuiSlider,
  // styled
} from "@mui/material";

// const StyledSlider = styled(MuiSlider)({
//   color: "black",
//   height: 8,
//   padding: "0 !important",
//   "& .MuiSlider-track": {
//     border: "none",
//   },
//   "& .MuiSlider-thumb": {
//     height: 16,
//     width: 16,
//     backgroundColor: "#fff",
//     border: `2px solid #37c4c4`,
//     "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
//       boxShadow: "inherit",
//     },
//     "&::before": {
//       display: "none",
//     },
//   },
//   "& .MuiSlider-valueLabel": {
//     lineHeight: 1.2,
//     fontSize: 12,
//     background: "unset",
//     padding: 0,
//     width: 32,
//     height: 32,
//     borderRadius: "50% 50% 50% 0",
//     backgroundColor: "white",
//     border: "2px solid black",
//     color: "black",
//     fontWeight: "600",
//     transformOrigin: "bottom left",
//     transform: "translate(50%, -85%) rotate(-45deg) scale(0)",
//     "&::before": { display: "none" },
//     "&.MuiSlider-valueLabelOpen": {
//       // marginTop: "14px",
//       transform: "translate(50%, -85%) rotate(-45deg) scale(1)",
//     },
//     "& > *": {
//       transform: "rotate(45deg)",
//     },
//   },
// });

type SliderProps = {
  value: number;
  onChange: (e: Event, newValue: number | number[]) => void;
  min: number;
  max: number;
  step: number;
  disabled?: boolean;
};

export const Slider = ({
  value,
  onChange,
  min,
  max,
  step,
  disabled,
}: SliderProps) => {
  return (
    <MuiSlider
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={onChange}
      disabled={disabled}
      valueLabelDisplay="on"
      //   sx={{
      //     "& .MuiSlider-valueLabel": {
      //       borderColor: disabled ? "grey.500" : "black",
      //     },
      //   }}
    />
  );
};

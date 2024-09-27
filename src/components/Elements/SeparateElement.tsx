import { Stack } from "@mui/material";
import { getElementImage } from "../../utils/getElementImages";
import { clickableColor } from "../../pages/Dashboard";
import { useState } from "react";

type SeparateElementProps = {
  size: number;
  name: string;
};

export const SeparateElement = ({ size, name }: SeparateElementProps) => {
  const [rotation, setRotation] = useState(0);

  const handleImageClick = () => {
    setRotation((prev) => (prev + 1) % 4);
  };

  return (
    <Stack alignItems="center">
      <img
        src={getElementImage(name)}
        width={size}
        height={size}
        alt={`element ${name}`}
        style={{
          transform: `rotate(${-90 * rotation}deg)`,
          backgroundColor: "white",
          border: `2px dotted ${clickableColor}`,
        }}
        onClick={handleImageClick}
      />
    </Stack>
  );
};

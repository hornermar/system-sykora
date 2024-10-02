import { Stack } from "@mui/material";
import { Structure } from "../../Structure/Structure";

type ResultProps = {
  grid: string[][];
};

export const Result = ({ grid }: ResultProps) => {
  return (
    <Stack>
      <Structure grid={grid} />
    </Stack>
  );
};

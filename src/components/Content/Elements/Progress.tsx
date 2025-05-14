import { Box, Typography, Chip, Rating } from "@mui/material";

type ElementsProgressProps = {
  setTemplate: () => void;
  filledCells: number;
  setEmptyGrid: () => void;
};

export const ElementsProgress = ({
  setTemplate,
  filledCells,
  setEmptyGrid,
}: ElementsProgressProps) => {
  return (
    <>
      <Typography variant="body1">
        Pro postup vyplň alespoň <b>5</b> buněk:
      </Typography>
      <Rating
        name="simple-controlled"
        value={filledCells}
        readOnly
        max={5}
        icon={
          <img
            src={"/icons/circle-check.svg"}
            width={25}
            height={25}
            alt={"circle check icon"}
            style={{ marginRight: "5px" }}
          />
        }
        emptyIcon={
          <img
            src={"/icons/circle-empty.svg"}
            width={25}
            height={25}
            alt={"circle icon"}
            style={{ marginRight: "5px" }}
          />
        }
      />
      <Box
        sx={{
          margin: "20px 0 10px",
        }}
      >
        <Chip
          label={"Použít šablonu"}
          onClick={setTemplate}
          size="small"
          sx={{ marginRight: "10px" }}
        />

        <Chip
          label={"Smazat vše"}
          onClick={setEmptyGrid}
          size="small"
          sx={{ marginRight: "10px" }}
        />
      </Box>
    </>
  );
};

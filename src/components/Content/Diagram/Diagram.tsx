import { Structure } from "../../Structure/Structure";
import { Stack, Typography, Chip, Box } from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { Select } from "../../common/Select/Select";
import { map } from "lodash";
import { SelectChangeEvent } from "@mui/material/Select";
import { createEmptyGrid } from "../../../utils/createEmptyGrid";

type DiagramProps = {
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  defaultGrid: string[][];
};

const chips = [
  { columns: 10, rows: 10 },
  { columns: 11, rows: 21 },
];

export const Diagram = ({ form, setForm }: DiagramProps) => {
  const handleChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;

    setForm((prev: FormValues) => ({
      ...prev,
      structure: {
        ...prev.structure,
        [name]: value,
      },
    }));
  };

  const grid = createEmptyGrid(form.structure.rows, form.structure.columns);

  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: "20px" }}>
        Urči počet sloupců a řádků mřížky:
      </Typography>

      <Stack width={"100%"} flexDirection="row" gap={2}>
        <Select
          label="Sloupce"
          name="columns"
          value={form.structure.columns}
          onChange={handleChange}
          max={11}
        />

        <Select
          label="Řady"
          name="rows"
          value={form.structure.rows}
          onChange={handleChange}
          max={21}
        />
      </Stack>

      <Box sx={{ marginBottom: "10px" }}>
        {map(chips, (chip, index) => (
          <Chip
            key={index}
            label={`${chip.columns}x${chip.rows}`}
            onClick={() => {
              setForm((prev: FormValues) => ({
                ...prev,
                structure: {
                  ...prev.structure,
                  columns: chip.columns,
                  rows: chip.rows,
                },
              }));
            }}
            size="small"
            sx={{ marginRight: "10px" }}
          />
        ))}
      </Box>

      <Structure grid={grid} />
    </>
  );
};

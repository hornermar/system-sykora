import { Structure } from "../../Structure/Structure";
import { Stack, Typography, Chip, Box } from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { Select } from "../../common/Select/Select";
import { map } from "lodash";
import { SelectChangeEvent } from "@mui/material/Select";
import { createEmptyGrid } from "../../../utils/createEmptyGrid";
import { ContainerWithStructure } from "../../common/Container/WithStructure";

type DiagramProps = {
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  defaultGrid: string[][];
};

const chips = [
  { columns: 6, rows: 6 },
  { columns: 10, rows: 10 },
  { columns: 11, rows: 21 },
];

export const Diagram = ({ form, onFormChange }: DiagramProps) => {
  const handleChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  const grid = createEmptyGrid(form.rows, form.columns);

  return (
    <ContainerWithStructure
      structure={<Structure grid={grid} />}
      firstPart={
        <>
          <Typography variant="body1" sx={{ marginBottom: "10px" }}>
            Urči počet sloupců a řádků a vytvoří se základní mřížka:
          </Typography>
          <Stack
            width={"100%"}
            flexDirection="row"
            gap={3}
            sx={{ marginBottom: "6px" }}
          >
            <Select
              label="Sloupce"
              name="columns"
              value={form.columns}
              onChange={handleChange}
              max={11}
            />

            <Select
              label="Řady"
              name="rows"
              value={form.rows}
              onChange={handleChange}
              max={21}
            />
          </Stack>
          <Box
            sx={{
              marginBottom: "10px",
            }}
          >
            {map(chips, (chip, index) => (
              <Chip
                key={index}
                label={`${chip.columns}x${chip.rows}`}
                onClick={() =>
                  onFormChange({ columns: chip.columns, rows: chip.rows })
                }
                size="small"
                sx={{ marginRight: "10px" }}
              />
            ))}
          </Box>
        </>
      }
    />
  );
};

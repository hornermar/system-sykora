import { Stack, Typography, Chip, Box } from "@mui/material";
import { FormValues } from "../../../types/FormValues";
import { Select } from "../../common/Select/Select";
import { map } from "lodash";
import { SelectChangeEvent } from "@mui/material/Select";
import { Cell } from "../../../types/General";
import { useEffect } from "react";

type DiagramProps = {
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  defaultGrid: string[][];
  setActiveCell: React.Dispatch<React.SetStateAction<Cell | undefined>>;
  areInputsEditable: boolean;
};

const chips = [
  { columns: 6, rows: 6 },
  { columns: 10, rows: 10 },
  { columns: 11, rows: 21 },
];

export const Diagram = ({
  form,
  onFormChange,
  setActiveCell,
  areInputsEditable,
}: DiagramProps) => {
  const handleChange = (e: SelectChangeEvent<number>) => {
    const { name, value } = e.target;
    onFormChange({ [name]: value });
  };

  useEffect(() => {
    setActiveCell(undefined);
  }, []);

  return (
    <>
      <Typography variant="body1" sx={{ marginBottom: "10px" }}>
        {areInputsEditable ? (
          "Urči počet sloupců a řádků a vytvoří se základní mřížka:"
        ) : (
          <>
            Při vytváření struktury začal Zdeněk Sýkora s rozvržením mřížky –
            určuje, kolik bude mít sloupců a řádků. Pro tento příklad volí{" "}
            <b>11</b> sloupců a <b>21</b> řádků.
          </>
        )}
      </Typography>

      {areInputsEditable && (
        <>
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
      )}
    </>
  );
};

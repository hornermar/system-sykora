import { useEffect, useState } from "react";
import { Structure } from "../Structure/Structure";
import { Stack, Typography } from "@mui/material";
import { FormValues } from "../../types/FormValues";
import { getEmptyGrid } from "../../utils/getEmptyGrid";
import { Input } from "../Input/Input";

type DiagramProps = {
  form: FormValues;
  setForm: React.Dispatch<React.SetStateAction<FormValues>>;
  grid: string[][];
};

export const Diagram = ({ form, setForm }: DiagramProps) => {
  const [grid, setGrid] = useState<string[][]>(
    getEmptyGrid(form.structure.rows, form.structure.columns)
  );

  useEffect(() => {
    setGrid(getEmptyGrid(form.structure.rows, form.structure.columns));
  }, [form.structure.rows, form.structure.columns]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev: FormValues) => ({
      ...prev,
      structure: {
        ...prev.structure,
        [name]: value,
      },
    }));
  };

  return (
    <>
      <Typography variant="body1">
        Urči počet sloupců a řádků mřížky:
      </Typography>

      <Stack
        width={"100%"}
        flexDirection="row"
        gap={2}
        sx={{ marginBottom: "20px" }}
      >
        <Input
          label="Sloupce"
          name="columns"
          value={form.structure.columns}
          onChange={handleChange}
        />

        <Input
          label="Řady"
          name="rows"
          value={form.structure.rows}
          onChange={handleChange}
        />
      </Stack>

      <Structure grid={grid} cellType="text" />
    </>
  );
};

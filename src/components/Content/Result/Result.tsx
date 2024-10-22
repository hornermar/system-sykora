import { Stack } from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { FormValues } from "../../../types/FormValues";
import { ResultEdit } from "./Edit";
import { useState, useMemo } from "react";
import { getElements } from "../../../utils/getElements";
import { useCell } from "../../../hooks/useCell";
import { ElementSelect } from "../Elements/Select";
import { useSwitch } from "../../../hooks/useSwitch";

type ResultProps = {
  grid: string[][];
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  editOpen: boolean;
  onEditClose: () => void;
  defaultGrid: string[][];
  onDefaultGridChange: (newDefaultGrid: string[][]) => void;
};

export const Result = ({
  grid,
  form,
  onFormChange,
  editOpen,
  onEditClose,
  defaultGrid,
  onDefaultGridChange,
}: ResultProps) => {
  const [openSelect, onOpenSelect, onCloseSelect] = useSwitch(false);
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [displayDefaultGrid, setDisplayDefaultGrid] = useState<boolean>(false);
  const { activeCell, onCellClick, onCellChange } = useCell({
    onOpenSelect,
    onDefaultGridChange,
    defaultGrid,
  });

  const randomGrid = useMemo(() => {
    return getElements(0, 0, defaultGrid, undefined, true);
  }, [defaultGrid]);

  const handleCellClickAndCloseEdit = (x: number, y: number, name: string) => {
    onCellClick(x, y, name);
    onEditClose();
  };

  return (
    <Stack>
      <Structure
        grid={isRandom ? randomGrid : grid}
        isViewModeChangeable
        displayDefaultGrid={displayDefaultGrid}
        defaultGrid={defaultGrid}
        onCellClick={
          displayDefaultGrid ? handleCellClickAndCloseEdit : undefined
        }
      />

      <ResultEdit
        form={form}
        onFormChange={onFormChange}
        open={editOpen}
        isRandom={isRandom}
        setIsRandom={setIsRandom}
        displayDefaultGrid={displayDefaultGrid}
        setDisplayDefaultGrid={setDisplayDefaultGrid}
      />

      {activeCell && displayDefaultGrid && (
        <ElementSelect
          open={openSelect}
          onClose={onCloseSelect}
          activeCell={activeCell}
          onCellChange={onCellChange}
        />
      )}
    </Stack>
  );
};

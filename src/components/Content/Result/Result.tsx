import { Typography } from "@mui/material";
import { Structure } from "../../Structure/Structure";
import { FormValues } from "../../../types/FormValues";
import { ResultEdit } from "./Edit";
import { useState, useMemo } from "react";
import { getElements } from "../../../utils/getElements";
import { useCell } from "../../../hooks/useCell";
import { ElementSelect } from "../Elements/Select";
import { useSwitch } from "../../../hooks/useSwitch";
import { ContainerWithStructure } from "../../common/Container/WithStructure";
import { ResultCollapse } from "./Collapse";
import { useMediaQuery, useTheme } from "@mui/system";

type ResultProps = {
  grid: string[][];
  form: FormValues;
  onFormChange: (newFormValues: Partial<FormValues>) => void;
  defaultGrid: string[][];
  onDefaultGridChange: (newDefaultGrid: string[][]) => void;
};

export const Result = ({
  grid,
  form,
  onFormChange,
  defaultGrid,
  onDefaultGridChange,
}: ResultProps) => {
  const [editOpen, onEditOpen, onEditClose] = useSwitch(false);
  const [openSelect, onOpenSelect, onCloseSelect] = useSwitch(false);
  const [isRandom, setIsRandom] = useState<boolean>(false);
  const [displayDefaultGrid, setDisplayDefaultGrid] = useState<boolean>(false);
  const { activeCell, onCellClick, onCellChange } = useCell({
    onOpenSelect,
    onDefaultGridChange,
    defaultGrid,
  });

  const theme = useTheme();
  const isSmallMedia = useMediaQuery(theme.breakpoints.down("lg"));

  const randomGrid = useMemo(() => {
    return getElements(0, 0, defaultGrid, undefined, true);
  }, [defaultGrid]);

  const handleCellClickAndCloseEdit = (x: number, y: number, name: string) => {
    onCellClick(x, y, name);
    onEditClose();
  };

  const renderResultEdit = () => (
    <ResultEdit
      form={form}
      onFormChange={onFormChange}
      isRandom={isRandom}
      setIsRandom={setIsRandom}
      displayDefaultGrid={displayDefaultGrid}
      setDisplayDefaultGrid={setDisplayDefaultGrid}
    />
  );

  return (
    <ContainerWithStructure
      structure={
        <Structure
          grid={isRandom ? randomGrid : grid}
          isViewModeChangeable
          displayDefaultGrid={displayDefaultGrid}
          defaultGrid={defaultGrid}
          onCellClick={
            displayDefaultGrid ? handleCellClickAndCloseEdit : undefined
          }
        />
      }
      firstPart={
        <>
          {isSmallMedia && (
            <Typography
              variant="body1"
              onClick={editOpen ? onEditClose : onEditOpen}
              className="underline"
            >
              <b>{editOpen ? "Skrýt panel vstupů" : "Panel vstupů (úprava)"}</b>
            </Typography>
          )}

          {isSmallMedia ? (
            <ResultCollapse open={editOpen} children={renderResultEdit()} />
          ) : (
            renderResultEdit()
          )}

          {activeCell && displayDefaultGrid && (
            <ElementSelect
              open={openSelect}
              onClose={onCloseSelect}
              activeCell={activeCell}
              onCellChange={onCellChange}
            />
          )}
        </>
      }
    />
  );
};

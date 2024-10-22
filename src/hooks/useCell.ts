import { useState } from "react";
import { set } from "lodash";
import { Cell } from "../types/General";

type UseCellProps = {
  onOpenSelect: () => void;
  onDefaultGridChange: (newDefaultGrid: string[][]) => void;
  defaultGrid: string[][];
};

export const useCell = ({
  onOpenSelect,
  onDefaultGridChange,
  defaultGrid,
}: UseCellProps) => {
  const [activeCell, setActiveCell] = useState<Cell | null>(null);

  const onCellClick = (x: number, y: number, name: string) => {
    setActiveCell({ x, y, name });
    onOpenSelect();
  };

  const onCellChange = (element: string) => {
    const newGrid = [...defaultGrid];
    if (activeCell) {
      set(newGrid, [activeCell.y, activeCell.x], element);
    }

    onDefaultGridChange(newGrid);
  };

  return {
    activeCell,
    onCellClick,
    onCellChange,
  };
};

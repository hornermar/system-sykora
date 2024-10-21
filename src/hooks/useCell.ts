import { useState } from "react";
import { set } from "lodash";
import { Cell } from "../types/General";

type UseCellProps = {
  onOpenSelect: () => void;
  setDefaultGrid: React.Dispatch<React.SetStateAction<string[][]>>;
};

export const useCell = ({ onOpenSelect, setDefaultGrid }: UseCellProps) => {
  const [activeCell, setActiveCell] = useState<Cell | null>(null);

  const onCellClick = (x: number, y: number, name: string) => {
    setActiveCell({ x, y, name });
    onOpenSelect();
  };

  const onCellChange = (element: string) => {
    setDefaultGrid((prevGrid) => {
      const newGrid = [...prevGrid];
      if (activeCell) {
        set(newGrid, [activeCell.y, activeCell.x], element);
      }
      return newGrid;
    });
  };

  return {
    activeCell,
    onCellClick,
    onCellChange,
  };
};

export type Sides = "top" | "right" | "bottom" | "left";

export type Property = "color" | "shape";

export type Cell = {
  x: number;
  y: number;
  name?: string;
};

export type ViewMode = "image" | "text";

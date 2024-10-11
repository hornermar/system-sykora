import { ElementType } from "./ElementType";
import { Neighbour } from "./Neighbour";

export type ShapeDescription = {
  neighbours: Neighbour;
  options: ElementType[];
  reason: string | undefined;
  finalOptions: ElementType[] | undefined;
};

export type Shape = {
  result: string | undefined;
  description: ShapeDescription;
};

import { ElementType } from "@/app/types/ElementType";
import { Neighbour } from "@/app/types/Neighbout";

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

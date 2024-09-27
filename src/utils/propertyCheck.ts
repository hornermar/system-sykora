import { filter } from "lodash";
import { ElementType } from "../types/ElementType";
import { Property, Sides } from "../types/General";
import { NeighbourItem } from "../types/Neighbout";

export const propertyCheck = (
    neighbour: NeighbourItem | undefined,
    options: ElementType[],
    side: Sides,
    property: Property,
    isEqual: boolean
) => {
    const result = neighbour
        ? filter(options, (option) => {
              return isEqual
                  ? option[side][property] === neighbour[property]
                  : option[side][property] !== neighbour[property];
          })
        : options;

    return result;
};

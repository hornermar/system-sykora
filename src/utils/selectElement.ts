import { size } from "lodash";
import { ElementType } from "../types/ElementType";

const getRandomItem = (array: ElementType[]) => {
    return array[Math.floor(Math.random() * array.length)];
};

export const selectElement = (
    elementsBasedOnColor: ElementType[],
    elementsBasedOnShape: ElementType[],
    options: ElementType[]
) => {
    if (size(elementsBasedOnShape) === 0 && size(elementsBasedOnColor) > 0) {
        // if there are no elements based on shape
        if (size(elementsBasedOnColor) === 1) {
            // if there is only one element based on color
            return {
                result: elementsBasedOnColor[0],
                reason: "existuje pouze jeden element, který odpovídá barvou, který ale zároveň neodpovídá tvarem, je zvolen ten",
                finalOptions: elementsBasedOnColor,
            };
        } else {
            // else return a random element based on color
            return {
                result: getRandomItem(elementsBasedOnColor),
                reason: "existuje více elementů, které odpovídají barvou, ale žádný z nich neodpovídá tvarem, je náhodně vybrán jeden z těch, které odpovídají alespoň barvou",
                finalOptions: elementsBasedOnColor,
            };
        }
    } else if (size(elementsBasedOnShape) > 0) {
        // if there are elements based on shape
        if (size(elementsBasedOnShape) === 1) {
            // if there is only one element based on shape
            return {
                result: elementsBasedOnShape[0],
                reason: "existuje pouze jeden element, který odpovídá barvou a zároveň tvarem, je zvolen ten",
                finalOptions: elementsBasedOnShape,
            };
        } else {
            // else return a random element based on shape
            return {
                result: getRandomItem(elementsBasedOnShape),
                reason: "existuje více elementů, které odpovídají barvou i tvarem, je vybrán náhodně jeden z nich",
                finalOptions: elementsBasedOnShape,
            };
        }
    } else {
        // else return a random element with selected density
        return {
            result: getRandomItem(options),
            reason: "neodpovídá žádný element, je vybrán náhodný element z dané skupiny",
            finalOptions: options,
        };
    }
};

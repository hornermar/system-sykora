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
        reason:
          "V tomto případě existuje pouze jeden element odpovídající barvou, který ale neodpovídá tvarem. Vybrán je ten",
        finalOptions: elementsBasedOnColor,
      };
    } else {
      // else return a random element based on color
      return {
        result: getRandomItem(elementsBasedOnColor),
        reason:
          "V tomto případě je více elementů, které odpovídají barvou, ale žádný z nich neodpovídá tvarem. Náhodně je vybrán jeden z těch, které odpovídají alespoň barvou",
        finalOptions: elementsBasedOnColor,
      };
    }
  } else if (size(elementsBasedOnShape) > 0) {
    // if there are elements based on shape
    if (size(elementsBasedOnShape) === 1) {
      // if there is only one element based on shape
      return {
        result: elementsBasedOnShape[0],
        reason:
          "Zde existuje pouze jeden element, který odpovídá barvou a zároveň tvarem. Je proto zvolen ten",
        finalOptions: elementsBasedOnShape,
      };
    } else {
      // else return a random element based on shape
      return {
        result: getRandomItem(elementsBasedOnShape),
        reason:
          "Protože existuje více elementů, které odpovídají barvou i tvarem, je vybrán náhodně jeden z nich",
        finalOptions: elementsBasedOnShape,
      };
    }
  } else {
    // else return a random element with selected density
    return {
      result: getRandomItem(options),
      reason:
        "V tomto případě neodpovídá žádný element. Je proto vybrán element ze  skupiny náhodně",
      finalOptions: options,
    };
  }
};

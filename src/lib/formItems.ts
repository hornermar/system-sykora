import { Rule } from "../types/Rule";

export const rulesItems: Rule[] = [
  {
    text: "Elementy\u00A0navazují\u00A0barvami, elementy navazují tvary",
    code: 0,
    colorContinue: true,
    shapeContinue: true,
    example: [["3y", "1z", "1d", "3y", "3y", "1z", "1d", "3y", "3y"]],
  },
  {
    text: "Elementy\u00A0navazují\u00A0barvami, elementy nenavazují tvary",
    code: 1,
    colorContinue: true,
    shapeContinue: false,
    example: [["3y", "4i", "1r", "2y", "3y", "4i", "1r", "2y", "3y"]],
  },
  {
    text: "Elementy\u00A0nenavazují\u00A0barvami, elementy navazují tvary",
    code: 2,
    colorContinue: false,
    shapeContinue: true,
    example: [["3y", "4z", "1d", "2y", "3y", "4z", "1d", "2y", "3y"]],
  },
  {
    text: "Elementy\u00A0nenavazují\u00A0barvami, elementy\u00A0nenavazují\u00A0tvary",
    code: 3,
    colorContinue: false,
    shapeContinue: false,
    example: [["3y", "1i", "1r", "3y", "3y", "1i", "1r", "3y", "3y"]],
  },
];

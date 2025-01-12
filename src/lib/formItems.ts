import { Rule } from "../types/Rule";

export const rulesItems: Rule[] = [
  {
    text: "Elementy\u00A0navazují\u00A0barvami, elementy navazují tvary",
    shortText: "El. navazují barvami, el. navazují tvary",
    code: 0,
    colorContinue: true,
    shapeContinue: true,
    example: [["3y", "1z", "1d", "3y", "3z", "1y", "1r", "3z", "3y"]],
  },
  {
    text: "Elementy\u00A0navazují\u00A0barvami, elementy nenavazují tvary",
    shortText: "El. navazují barvami, el. nenavazují tvary",
    code: 1,
    colorContinue: true,
    shapeContinue: false,
    example: [["3y", "4i", "1r", "2y", "1y", "4b", "1z", "2z", "3z"]],
  },
  {
    text: "Elementy\u00A0nenavazují\u00A0barvami, elementy navazují tvary",
    shortText: "El. nenavazují barvami, el. navazují tvary",
    code: 2,
    colorContinue: false,
    shapeContinue: true,
    example: [["3y", "4z", "1d", "2y", "3z", "4b", "1d", "4i", "3y"]],
  },
  {
    text: "Elementy\u00A0nenavazují\u00A0barvami, elementy\u00A0nenavazují\u00A0tvary",
    shortText: "El. nenavazují barvami, el. nenavazují tvary",
    code: 3,
    colorContinue: false,
    shapeContinue: false,
    example: [["3y", "1i", "1r", "3y", "3b", "1y", "3y", "1b", "1y"]],
  },
];

import el1d from "/elements/1d.svg";
import el1b from "/elements/1b.svg";
import el1i from "/elements/1i.svg";
import el1r from "/elements/1r.svg";
import el1y from "/elements/1y.svg";
import el1z from "/elements/1z.svg";
import el2b from "/elements/2b.svg";
import el2r from "/elements/2r.svg";
import el2y from "/elements/2y.svg";
import el2z from "/elements/2z.svg";
import el3b from "/elements/3b.svg";
import el3r from "/elements/3r.svg";
import el3y from "/elements/3y.svg";
import el3z from "/elements/3z.svg";
import el4b from "/elements/4b.svg";
import el4d from "/elements/4d.svg";
import el4i from "/elements/4i.svg";
import el4r from "/elements/4r.svg";
import el4y from "/elements/4y.svg";
import el4z from "/elements/4z.svg";
import transparent from "/elements/transparent.svg";

export const getElementImage = (element: string) => {
  switch (element) {
    case "1b":
      return el1b;
    case "1d":
      return el1d;
    case "1i":
      return el1i;
    case "1y":
      return el1y;
    case "1z":
      return el1z;
    case "1r":
      return el1r;
    case "2z":
      return el2z;
    case "2b":
      return el2b;
    case "2y":
      return el2y;
    case "2r":
      return el2r;
    case "3b":
      return el3b;
    case "3y":
      return el3y;
    case "3z":
      return el3z;
    case "3r":
      return el3r;
    case "4b":
      return el4b;
    case "4d":
      return el4d;
    case "4i":
      return el4i;
    case "4y":
      return el4y;
    case "4z":
      return el4z;
    case "4r":
      return el4r;
    default:
      return transparent;
  }
};

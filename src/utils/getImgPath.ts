export const getImgPath = (element: string) => {
  if (element === "+") {
    return "icons/plus.svg";
  } else if (element === "-") {
    return "icons/minus.svg";
  } else {
    return `/elements/${element}.svg`;
  }
};

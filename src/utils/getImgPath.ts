export const getImgPath = (element: string) => {
  if (element === "+") {
    return "/system-sykora/icons/plus.svg";
  } else if (element === "-") {
    return "/system-sykora/icons/minus.svg";
  } else {
    return `/system-sykora/elements/${element}.svg`;
  }
};

export const getImgPath = (element: string) => {
  switch (element) {
    case "0":
      case "":
      return "/elements/transparent.svg";
    default:
      return `/elements/${element}.svg`;
  }
  
};

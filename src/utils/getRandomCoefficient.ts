// get random number 0 < x < 4 and round it to 2 decimal places
export const getRandomCoefficient = () =>
    Number((Math.random() * 4).toFixed(2));

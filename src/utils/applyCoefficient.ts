export const applyCoefficient = (
    cell: string,
    coefficient: number,
    average: number
) => {
    switch (cell) {
        case "+":
            return average + coefficient;
        case "-":
            return average - coefficient;
        default:
            return average;
    }
};

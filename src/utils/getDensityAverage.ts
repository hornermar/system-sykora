import { map, mean, size } from "lodash";

export const getDensityAverage = (neighbours: string[]) => {
    const neighboursWithNumber = map(neighbours, (n) =>
        Number(n.slice(0, 1))
    ).filter(Boolean);

    if (size(neighboursWithNumber) > 0) {
        const average = mean(
            map(neighbours, (n) => Number(n.slice(0, 1))).filter(Boolean)
        );
        return average;
    } else return 0;
};

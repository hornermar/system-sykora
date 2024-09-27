import { Cell } from "./General";

export type DensityDescription = {
    neighbours: {
        name: string;
        position: Cell;
    }[];
    neighboursAverage: number;
    step: number;
    unRoundedResult: number;
};

export type Density = {
    result: number;
    description: DensityDescription[];
};

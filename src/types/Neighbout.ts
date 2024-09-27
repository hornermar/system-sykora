export type Neighbour = {
    bottom?: NeighbourItem;
    left?: NeighbourItem;
    right?: NeighbourItem;
    top?: NeighbourItem;
};

export type NeighbourItem = {
    color: string;
    shape: boolean;
    name: string;
};

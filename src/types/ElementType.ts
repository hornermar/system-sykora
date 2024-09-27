type Color = "black" | "white";

export type ElementType = {
    name: string;
    colorDensity: number;
    top: {
        color: Color;
        shape: boolean;
    };
    right: {
        color: Color;
        shape: boolean;
    };
    bottom: {
        color: Color;
        shape: boolean;
    };
    left: {
        color: Color;
        shape: boolean;
    };
};

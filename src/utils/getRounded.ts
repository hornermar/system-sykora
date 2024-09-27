export const getRounded = (number: number) => {
    const min = 1;
    const max = 4;
    if (number < min) {
        return min;
    } else if (number > max) {
        return max;
    } else {
        return Math.round(number);
    }
};

export const getNeighbours = (
    step: number,
    grid: string[][],
    x: number,
    y: number
) => {
    const neighbours = [];

    // Iterate over the cells in the square that is {steps} steps in each direction
    for (let i = -step; i <= step; i++) {
        for (let j = -step; j <= step; j++) {
            // Exclude the cell itself
            if (i !== 0 || j !== 0) {
                const neighbourX = x + i;
                const neighbourY = y + j;

                // Check that the neighbour coordinates are within the grid
                if (
                    neighbourX >= 0 &&
                    neighbourY >= 0 &&
                    neighbourY < grid.length &&
                    neighbourX < grid[0].length
                ) {
                    neighbours.push({
                        name: grid[neighbourY][neighbourX],
                        position: { x: neighbourX, y: neighbourY },
                    });
                }
            }
        }
    }

    return neighbours;
};

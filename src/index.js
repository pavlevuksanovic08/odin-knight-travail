
var queue = [];


function knightMoves(start, final) {
    const edges = Array.from({ length: 8 }, () =>
        Array(8).fill()
    );
    queue.push(start);
    while (queue.length) {
        let currentElement = queue.shift();
        if (compareArrs(currentElement, final)) {
            return createPath(final, edges);
        }
        let nextPositions = possibleNextPositions(currentElement);
        nextPositions.forEach(pos => {
            if (edges[pos[0]][pos[1]] !== undefined) return;    

            makeEdge(currentElement, pos, edges);
            queue.push(pos);

        });
    }
}

function possibleNextPositions(position) {
    const situations = [[-1, -2], [-1, 2], [1, -2], [1, 2],
                        [-2, -1], [-2, 1], [2, -1], [2, 1]];
    let arr = [];
    for (let situation of situations) {
        let xpos = position[0] + situation[0];
        let ypos = position[1] + situation[1];
        if (xpos < 0 || ypos < 0 || xpos > 7 || ypos > 7) continue;
        arr.push([xpos, ypos]);
    }
    return arr;
}

function makeEdge(start, position, edges) {
    if (edges[start[0]][start[1]] === undefined) {
        edges[start[0]][start[1]] = null; 
    } 
    let xpos = position[0];
    let ypos = position[1];
    edges[xpos][ypos] = start;
}

function createPath(final, edges) {
    let arr = [];
    while (final !== null) {
        arr.unshift(final);
        final = edges[final[0]][final[1]];
    }
    return arr;
}

function compareArrs(a, b) {
    return JSON.stringify(a) === JSON.stringify(b);
}

console.log(knightMoves([0,0],[7,7]));
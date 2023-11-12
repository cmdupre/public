import square from "./square.js";

function getMoves(piece, currentPosition, targetPosition) {
    if (currentPosition.equals(targetPosition))
        return [targetPosition];

    const result = search(piece, currentPosition, targetPosition, []);

    return [currentPosition, ...result];
}

function search(piece, currentPosition, targetPosition, exploredList) {
    if (currentPosition.equals(targetPosition))
        return [targetPosition];

    const frontier = square
        .getValidMoves(piece, currentPosition)
        .filter(move => !includes(exploredList, move));

    exploredList = [...frontier, ...exploredList];

    const possiblePaths = [];

    while (frontier.length > 0) {
        // DFS due to stack array
        const exploreSquare = frontier.pop();
        const path = search(piece, exploreSquare, targetPosition, exploredList);
        if (path.length > 0) {
            if (path[0] === targetPosition)
                possiblePaths.push([exploreSquare]);
            else
                possiblePaths.push([exploreSquare, ...path]);
        }
    }

    return possiblePaths.length < 1
        ? []
        : possiblePaths.toSorted((a, b) => a.length - b.length)[0];
}

function includes(list, value) {
    for (const item of list)
        if (item.equals(value))
            return true;
    return false;
}

export default getMoves
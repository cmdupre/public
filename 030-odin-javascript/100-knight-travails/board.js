import square from "./square.js";
import edge from "./edges.js";

function knightMoves(piece, currentPosition, targetPosition) {
    if (currentPosition.equals(targetPosition))
        return [];

    const frontier = [currentPosition];
    const visited = [];
    const edges = [];
    while (frontier.length > 0) {
        let node = frontier.shift();
        visited.push(node);
        for (let neighbor of square.getNeighbors(node, piece)) {
            if (visited.findIndex(v => v.equals(neighbor)) > -1)
                continue;
            edges.push(edge.create(node, neighbor));
            if (neighbor.equals(targetPosition))
                return getVertices(neighbor, edges);
            frontier.push(neighbor);
        }
    }

    return [];
}

function getVertices(node, edges) {
    let vertices = [node];
    while (true) {
        let edge = edges.find(e => e.node.equals(node));
        if (edge === undefined)
            return vertices;
        vertices = [edge.parent, ...vertices];
        node = edge.parent;
    }
}

export default knightMoves
import position from './position.js'

function getValidMoves(relativePositions, currentPosition) {
    const validMoves = [];

    for (const relPos of relativePositions) {
        const newPos = position.create(
            relPos.x + currentPosition.x,
            relPos.y + currentPosition.y);

        if ((newPos.x < 0 || newPos.x > 7) ||
            (newPos.y < 0 || newPos.y > 7))
            continue;

        validMoves.push(newPos);
    }

    return validMoves;
}

export default (() => {
    return {
        getValidMoves,
    }
})();
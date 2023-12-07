import pointFactory from "./pointFactory.js";

function create(opponentGameboard) {
    const gameboard = opponentGameboard;
    const usedPoints = [];
    let contact = null;
    // todo: ai only processes one ship at a time... vector guess could
    // hit multiple ships and it wouldn't know.

    function attack(maxX, maxY) {
        const point = getNextPoint(maxX, maxY);
        const result = gameboard.registerAttack(point);
        if (result) {
            if (!contact) {
                contact = {
                    point,
                    vector: 0,
                    ship: result,
                }
            }
            if (contact.ship.isSunk())
                contact = null;
        }
        else {
            if (contact)
                contact.vector++;
        }
        return { point, result };
    }

    function getNextPoint(maxX, maxY) {
        if (contact) {
            let x = contact.point.x;
            let y = contact.point.y;
            while (contact.vector < 4) {
                if (contact.vector === 0) x++;
                if (contact.vector === 1) x--;
                if (contact.vector === 2) y++;
                if (contact.vector === 3) y--;
                if (x < 0 || x >= maxX || y < 0 || y >= maxY) {
                    contact.vector++;
                    continue;
                }
                const point = pointFactory.create(x, y);
                if (!used(point)) {
                    usedPoints.push(point);
                    return point;
                }
            }
        }

        return getRandomUnusedPoint(maxX, maxY);
    }

    const used = (point) => usedPoints.findIndex(up => up.equals(point)) > -1;

    function getRandomUnusedPoint(maxX, maxY) {
        while (true) {
            const x = Math.floor(Math.random() * maxX);
            const y = Math.floor(Math.random() * maxY);
            const point = pointFactory.create(x, y);
            if (!used(point)) {
                usedPoints.push(point);
                return point;
            }
        }
    }

    return Object.freeze({
        getGameboard: () => gameboard,
        attack,
    })
}

export default (() => {
    return {
        create,
    }
})();
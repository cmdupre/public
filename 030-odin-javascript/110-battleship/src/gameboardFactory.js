import cellFactory from "./cellFactory.js";
import pointFactory from "./pointFactory.js";

function create(sizeX, sizeY) {
    const gbMaxX = sizeX;
    const gbMaxY = sizeY;
    const ships = [];

    const gameboard = [];
    for (let x = 0; x < gbMaxX; x++)
        for (let y = 0; y < gbMaxY; y++)
            gameboard.push(cellFactory.create(pointFactory.create(x, y)));

    function registerShip(ship, point) {
        const cells = getValidCells(point, ship.getOffsets());
        if (!cells) return false;
        setCells(cells, ship);
        return true;
    }

    function getValidCells(point, offsets) {
        const cells = [];
        for (let offset of offsets) {
            const checkPoint = pointFactory.create(point.x + offset.x, point.y + offset.y);
            if (checkPoint.x >= gbMaxX || checkPoint.y >= gbMaxY)
                return null;
            const cell = getGameboardCell(checkPoint);
            if (cell.getShip() !== null)
                return null;
            cells.push(cell);
        }
        return cells;
    }

    const getGameboardCell = (point) =>
        gameboard.find(c =>
            c.getCoordinate().x === point.x &&
            c.getCoordinate().y === point.y);

    function setCells(cells, ship) {
        cells.forEach(c => c.setShip(ship));
        ships.push(ship);
    }

    function isLive() {
        for (const ship of ships)
            if (!ship.isSunk())
                return true;
        return false;
    }

    function registerAttack(point) {
        const cell = getGameboardCell(point);
        if (!cell) return null;
        return cell.setHit();
    }

    function placeShipsRandom(ships) {
        for (let ship of ships) {
            while (true) {
                const x = Math.floor(Math.random() * gbMaxX);
                const y = Math.floor(Math.random() * gbMaxY);
                const point = pointFactory.create(x, y);
                if (registerShip(ship, point)) break;
            }
        }
    }

    const getShips = () => ships;

    return Object.freeze({
        registerShip,
        registerAttack,
        isLive,
        placeShipsRandom,
        getShips,
    })
}

export default (() => {
    return {
        create
    }
})();
function create(point) {
    const coordinate = point;
    let ship = null;
    let hit = false;

    return Object.freeze({
        getCoordinate: () => coordinate,
        getShip: () => ship,
        getHit: () => hit,
        setShip: (value) => ship = value,
        setHit: () => {
            hit = true;
            if (ship) {
                ship.hit();
                return ship;
            }
            return null;
        },
    })
}

export default (() => {
    return {
        create
    }
})();
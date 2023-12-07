import pointFactory from "./pointFactory.js";

function getOffsets(dx, dy) {
    const offsets = [];
    for (let i = 0; i < dx.length; i++)
        offsets.push(pointFactory.create(dx[i], dy[i]));
    return offsets;
}

function createHorizontal(length) {
    const x = [];
    const y = [];
    for (let i = 0; i < length; i++) {
        x.push(i);
        y.push(0);
    }
    return create(getOffsets(x, y));
}

function createVertical(length) {
    const x = [];
    const y = [];
    for (let i = 0; i < length; i++) {
        x.push(0);
        y.push(i);
    }
    return create(getOffsets(x, y));
}

function create(offsets) {
    const Offsets = offsets;
    let hits = 0;

    return Object.freeze({
        getLength: () => Offsets.length,
        getOffsets: () => Offsets,
        getHits: () => hits,
        isSunk: () => hits >= Offsets.length,
        hit: () => hits++,
    })
}

export default (() => {
    return {
        createHorizontal,
        createVertical,
    }
})();
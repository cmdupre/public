function create(x, y) {
    const X = x;
    const Y = y;

    return Object.freeze({
        x: X,
        y: Y,
        toString: () => `${X}, ${Y}`,
        equals: (target) => X === target.x && Y === target.y,
    });
}

export default (() => {
    return {
        create,
    }
})();
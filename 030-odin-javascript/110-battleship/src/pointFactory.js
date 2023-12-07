function create(X, Y) {
    const x = X;
    const y = Y;

    return Object.freeze({
        x,
        y,
        equals: (p) => x === p.x && y === p.y,
    })
}

export default (() => {
    return {
        create,
    }
})();
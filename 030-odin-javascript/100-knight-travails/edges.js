function create(parent, node) {
    const Parent = parent;
    const Node = node;

    return Object.freeze({
        parent: Parent,
        node: Node,
    });
}

export default (() => {
    return {
        create,
    }
})();
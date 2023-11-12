'use strict'

function create(data) {
    const nodeData = data;
    let left = null;
    let right = null;

    return {
        getData: () => nodeData,
        getLeft: () => left,
        getRight: () => right,
        setLeft: (value) => left = value,
        setRight: (value) => right = value,
    }
}

export default (() => {
    return {
        create
    }
})()
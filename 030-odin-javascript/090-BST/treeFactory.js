'use strict'

import treeOps from "./treeOps.js"

function create(values) {
    let root = treeOps.buildTree(values);

    return {
        getRoot: () => root,
        getBalanced: () => treeOps.getBalanced(root),
        rebalance: () => {
            const values = treeOps.levelOrder(root);
            root = treeOps.buildTree(values);
        },
    }
}

export default (() => {
    return {
        create,
    }
})();
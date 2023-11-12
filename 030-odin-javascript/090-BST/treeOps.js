'use strict'

import util from "./util.js";
import nodeFactory from "./nodeFactory.js"

function buildSubTree(values, startIndex, endIndex) {
    if (startIndex > endIndex)
        return null;

    const index = Math.floor((startIndex + endIndex) / 2);
    const node = nodeFactory.create(values[index]);
    node.setLeft(buildSubTree(values, startIndex, index - 1));
    node.setRight(buildSubTree(values, index + 1, endIndex));
    return node;
}

function buildTree(values) {
    if (values && values.length > 0) {
        const sanitized = util.mergeSort(util.removeDuplicates(values));
        const rootNode = buildSubTree(sanitized, 0, sanitized.length - 1);
        return rootNode;
    }
    return null;
}

function find(root, node) {
    const rootData = root.getData();
    const nodeData = node.getData();

    if (rootData === nodeData)
        return { parent: null, node: root };

    const rootChild = nodeData < rootData
        ? root.getLeft()
        : root.getRight();

    if (rootChild === null)
        return { parent: root, node: null }

    if (rootChild.getData() === nodeData)
        return { parent: root, node: rootChild }

    return find(rootChild, node);
}

function getDepth(root, node) {
    if (!root)
        return -1;

    const found = find(root, node);

    if (found.node === null)
        return -1;

    return getMaxDepth(root, node);
}

function getMaxDepth(root, node) {
    const rootData = root.getData();
    const nodeData = node.getData();

    if (rootData === nodeData)
        return 0;

    const rootChild = nodeData < rootData
        ? root.getLeft()
        : root.getRight();

    if (rootChild.getData() === nodeData)
        return 1;

    return getMaxDepth(rootChild, node) + 1;
}

function getHeight(root, node) {
    if (!root)
        return -1;

    const found = find(root, node);

    if (found.node === null)
        return -1;

    return Math.max(
        getMaxHeight(found.node.getLeft()),
        getMaxHeight(found.node.getRight()))
        + 1;
}

function getMaxHeight(node) {
    if (node === null)
        return 0;

    return Math.max(
        getMaxHeight(node.getLeft()),
        getMaxHeight(node.getRight()))
        + 1;
}

function insert(root, node) {
    const found = find(root, node);

    if (found.node !== null)
        return null;

    if (node.getData() < found.parent.getData())
        found.parent.setLeft(node);
    else
        found.parent.setRight(node);

    return found.parent;
}

function remove(root, node) {
    const found = find(root, node);

    if (found.node === null)
        return null;

    if (found.node.getLeft() !== null && found.node.getRight() !== null)
        return null;

    const parentData = found.parent.getData();
    const nodeData = found.node.getData();

    let childNode = null;
    if (found.node.getLeft() !== null) childNode = found.node.getLeft();
    if (found.node.getRight() !== null) childNode = found.node.getRight();

    if (nodeData < parentData)
        found.parent.setLeft(childNode);
    else
        found.parent.setRight(childNode);

    return found.parent;
}

function levelOrder(root, callback = null) {
    const queue = [root];
    const result = [];

    while (queue.length > 0) {
        let node = queue.shift();
        result.push(node.getData());
        if (callback !== null) callback(node);
        if (node.getLeft() !== null) queue.push(node.getLeft());
        if (node.getRight() !== null) queue.push(node.getRight());
    }

    return result;
}

function inOrder(root, callback = null) {
    if (root.getLeft() === null && root.getRight() === null) {
        if (callback !== null)
            callback(root);
        return [root.getData()];
    }

    let subTreeL = [];
    let subTreeR = [];

    if (root.getLeft() !== null)
        subTreeL = inOrder(root.getLeft(), callback);

    if (callback !== null)
        callback(root);

    if (root.getRight() !== null)
        subTreeR = inOrder(root.getRight(), callback);

    return [...subTreeL, root.getData(), ...subTreeR];
}

function preOrder(root, callback = null) {
    if (root.getLeft() === null && root.getRight() === null) {
        if (callback !== null)
            callback(root);
        return [root.getData()];
    }

    if (callback !== null)
        callback(root);

    let subTreeL = [];
    let subTreeR = [];

    if (root.getLeft() !== null)
        subTreeL = preOrder(root.getLeft(), callback);

    if (root.getRight() !== null)
        subTreeR = preOrder(root.getRight(), callback);

    return [root.getData(), ...subTreeL, ...subTreeR];
}

function postOrder(root, callback = null) {
    if (root.getLeft() === null && root.getRight() === null) {
        if (callback !== null)
            callback(root);
        return [root.getData()];
    }

    let subTreeL = [];
    let subTreeR = [];

    if (root.getLeft() !== null)
        subTreeL = postOrder(root.getLeft(), callback);

    if (root.getRight() !== null)
        subTreeR = postOrder(root.getRight(), callback);

    if (callback !== null)
        callback(root);

    return [...subTreeL, ...subTreeR, root.getData()];
}

function getBalanced(root) {
    if (root === null)
        return true;

    const heightLeft = checkSubtree(root.getLeft());
    const heightRight = checkSubtree(root.getRight());

    // height < 0 signifies an imbalance somewhere below
    return !(heightLeft < 0 ||
        heightRight < 0 ||
        Math.abs(heightLeft - heightRight) > 1)
}

function checkSubtree(child) {
    const childLeft = child.getLeft();
    const childRight = child.getRight();

    if (childLeft === null && childRight === null)
        return 0;

    const heightLeft = childLeft !== null
        ? checkSubtree(childLeft)
        : 0;

    const heightRight = childRight !== null
        ? checkSubtree(childRight)
        : 0;

    if (heightLeft < 0 ||
        heightRight < 0 ||
        Math.abs(heightLeft - heightRight) > 1)
        return -1;

    // return the largest height plus 1 for me
    return Math.max(heightLeft, heightRight) + 1;
}

export default (() => {
    return {
        buildTree,
        find,
        insert,
        remove,
        levelOrder,
        inOrder,
        preOrder,
        postOrder,
        getHeight,
        getDepth,
        getBalanced,
    }
})();
'use strict'

import nodeFactory from "./nodeFactory.js";
import treeOps from "./treeOps.js"

test('builds balanced tree', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    expect(root.getData()).toBe(5);
})

test('inserts node in correct location', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(10);
    const value = treeOps.insert(root, node);
    expect(value.getData()).toBe(9);
})

test('inserts node in correct location', () => {
    const values = [1, 5, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(7);
    const value = treeOps.insert(root, node);
    expect(value.getData()).toBe(8);
})

test('does not insert duplicate node', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(5);
    const value = treeOps.insert(root, node);
    expect(value).toBeNull();
})

test('finds the root node', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(5);
    const value = treeOps.find(root, node);
    expect(value.parent).toBeNull();
    expect(value.node.getData()).toBe(5);
})

test('finds a valid node, middle', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(3);
    const value = treeOps.find(root, node);
    expect(value.parent.getData()).toBe(2);
    expect(value.node.getData()).toBe(3);
})

test('finds a valid node, middle', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(7);
    const value = treeOps.find(root, node);
    expect(value.parent.getData()).toBe(5);
    expect(value.node.getData()).toBe(7);
})

test('finds a valid node, far right', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(9);
    const value = treeOps.find(root, node);
    expect(value.parent.getData()).toBe(8);
    expect(value.node.getData()).toBe(9);
})

test('finds a valid node, far left', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(1);
    const value = treeOps.find(root, node);
    expect(value.parent.getData()).toBe(2);
    expect(value.node.getData()).toBe(1);
})

test('finds parent for missing node, far right', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(10);
    const value = treeOps.find(root, node);
    expect(value.parent.getData()).toBe(9);
    expect(value.node).toBeNull();
})

test('finds parent for missing node, far left', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(0);
    const value = treeOps.find(root, node);
    expect(value.parent.getData()).toBe(1);
    expect(value.node).toBeNull();
})

test('finds parent for missing node, middle', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(4.5);
    const value = treeOps.find(root, node);
    expect(value.parent.getData()).toBe(4);
    expect(value.node).toBeNull();
})

test('finds parent for missing node, middle - non-leaf', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(3.5);
    const value = treeOps.find(root, node);
    expect(value.parent.getData()).toBe(4);
    expect(value.node).toBeNull();
})

test('removes node with no children', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(6);
    const value = treeOps.remove(root, node);
    expect(value.getData()).toBe(7);
    expect(value.getLeft()).toBe(null);
    expect(value.getRight().getData()).toBe(8);
})

test('removes node with one child, child on right', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(8);
    const value = treeOps.remove(root, node);
    expect(value.getData()).toBe(7);
    expect(value.getLeft().getData()).toBe(6);
    expect(value.getRight().getData()).toBe(9);
})

test('removes node with one child, child on left', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    let node = nodeFactory.create(4);
    let value = treeOps.remove(root, node);
    expect(value.getData()).toBe(3);
    expect(value.getLeft()).toBe(null);
    expect(value.getRight()).toBe(null);
    node = nodeFactory.create(3);
    value = treeOps.remove(root, node);
    expect(value.getData()).toBe(2);
    expect(value.getLeft().getData()).toBe(1);
    expect(value.getRight()).toBe(null);
    node = nodeFactory.create(2);
    value = treeOps.remove(root, node);
    expect(value.getData()).toBe(5);
    expect(value.getLeft().getData()).toBe(1);
    expect(value.getRight().getData()).toBe(7);
})

test('handles remove missing node', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(0);
    const value = treeOps.remove(root, node);
    expect(value).toBeNull();
})

test('refuse to remove node with two children', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(7);
    const value = treeOps.remove(root, node);
    expect(value).toBeNull();
})

test('traverse level order', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const levelOrder = treeOps.levelOrder(root);
    expect(levelOrder).toEqual([5, 2, 7, 1, 3, 6, 8, 4, 9]);
})

test('traverse level order, callback', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const callback = jest.fn();
    const levelOrder = treeOps.levelOrder(root, callback);
    expect(levelOrder).toEqual([5, 2, 7, 1, 3, 6, 8, 4, 9]);
    expect(callback).toHaveBeenCalledTimes(9);
})

// get nodes in ascending order
test('traverse inOrder, callback', () => {
    const values = [1, 2, 3, 4, 5, 6, 7];
    const root = treeOps.buildTree(values);
    const callback = jest.fn();
    const order = treeOps.inOrder(root, callback);
    expect(order).toEqual([1, 2, 3, 4, 5, 6, 7]);
    expect(callback).toHaveBeenCalledTimes(7);
})

// used to create a copy
test('traverse preOrder, callback', () => {
    const values = [1, 2, 3, 4, 5, 6, 7];
    const root = treeOps.buildTree(values);
    const callback = jest.fn();
    const order = treeOps.preOrder(root, callback);
    expect(order).toEqual([4, 2, 1, 3, 6, 5, 7]);
    expect(callback).toHaveBeenCalledTimes(7);
})

// used to delete tree
test('traverse postOrder, callback', () => {
    const values = [1, 2, 3, 4, 5, 6, 7];
    const root = treeOps.buildTree(values);
    const callback = jest.fn();
    const order = treeOps.postOrder(root, callback);
    expect(order).toEqual([1, 3, 2, 5, 7, 6, 4]);
    expect(callback).toHaveBeenCalledTimes(7);
})

// Height is defined as the number of edges in the longest
// path from a given node to a leaf node.
test('finds height of a node', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(7);
    const height = treeOps.getHeight(root, node);
    expect(height).toBe(3);
})

test('handles empty tree in height search', () => {
    const values = [];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(1);
    const height = treeOps.getHeight(root, node);
    expect(height).toBe(-1);
})

test('handles missing node in height search', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(10);
    const height = treeOps.getHeight(root, node);
    expect(height).toBe(-1);
})

// The depth of a node is the number of edges present 
// in path from the root node of a tree to that node.
test('finds depth of node', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(8);
    const depth = treeOps.getDepth(root, node);
    expect(depth).toBe(2);
})

test('depth of root node is 0', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(5);
    const depth = treeOps.getDepth(root, node);
    expect(depth).toBe(0);
})

test('handles missing node in depth search', () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(10);
    const depth = treeOps.getDepth(root, node);
    expect(depth).toBe(-1);
})

test('handles empty tree in depth search', () => {
    const values = [];
    const root = treeOps.buildTree(values);
    const node = nodeFactory.create(1);
    const depth = treeOps.getDepth(root, node);
    expect(depth).toBe(-1);
})

test('detects imbalanced tree', () => {
    const values = [1, 2, 3, 4, 5, 6, 7];
    const root = treeOps.buildTree(values);
    expect(root.getData()).toBe(4);
    expect(treeOps.getBalanced(root)).toBe(true);
    let node = nodeFactory.create(8);
    let parent = treeOps.insert(root, node);
    expect(parent.getData()).toBe(7);
    expect(treeOps.getBalanced(root)).toBe(true);
    node = nodeFactory.create(9);
    parent = treeOps.insert(root, node);
    expect(parent.getData()).toBe(8);
    expect(treeOps.getBalanced(root)).toBe(false);
})
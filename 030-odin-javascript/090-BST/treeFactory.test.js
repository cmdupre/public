'use strict'

import treeFactory from './treeFactory.js'
import nodeFactory from './nodeFactory.js';
import treeOps from './treeOps.js';

test('creates new balanced tree object', () => {
    const tree = treeFactory.create();
    expect(tree.getRoot()).toBeNull;
    expect(tree.getBalanced()).toBe(true);
})

test('builds a balanced binary search tree from an array of values', () => {
    const values = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324, 324];
    const tree = treeFactory.create(values);
    expect(tree.getRoot().getData()).toBe(8);
    expect(tree.getBalanced()).toBe(true);
})

test('rebalances tree', () => {
    const values = [1, 2, 3, 4, 5, 6, 7];
    const bst = treeFactory.create(values);
    expect(bst.getRoot().getData()).toBe(4);
    let node = nodeFactory.create(8);
    let parent = treeOps.insert(bst.getRoot(), node);
    node = nodeFactory.create(9);
    parent = treeOps.insert(bst.getRoot(), node);
    expect(bst.getBalanced()).toBe(false);
    bst.rebalance();
    expect(bst.getRoot().getData()).toBe(5);
    expect(bst.getBalanced()).toBe(true);
})
'use strict'

import nodeFactory from "./nodeFactory.js";

test('creates a new node', () => {
    const node = nodeFactory.create('data to store');
    expect(node.getData()).toBe('data to store');
    expect(node.getLeft()).toBeNull();
    expect(node.getRight()).toBeNull();
})
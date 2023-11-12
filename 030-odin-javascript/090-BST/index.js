'use strict'

import nodeFactory from './nodeFactory.js';
import treeFactory from './treeFactory.js'
import treeOps from './treeOps.js';

function getRandomNumbers(n, min, max) {
    const result = [];
    for (let i = 0; i < n; i++)
        result.push(Math.floor(Math.random() * (max - min)) + min);
    return result;
}

const values = getRandomNumbers(50, 0, 100);
const bst = treeFactory.create(values);
console.log(`Tree is ${!bst.getBalanced() ? 'im' : ''}balanced.`);
console.log('');
console.log("Level order: " + treeOps.levelOrder(bst.getRoot()));
console.log("Pre order: " + treeOps.preOrder(bst.getRoot()));
console.log("Post order: " + treeOps.postOrder(bst.getRoot()));
console.log("In order: " + treeOps.inOrder(bst.getRoot()));
console.log('');
console.log("Adding several numbers > max...");
const newNumbers = getRandomNumbers(5, 100, 200);
for (const n of newNumbers) {
    const newNode = nodeFactory.create(n);
    treeOps.insert(bst.getRoot(), newNode);
}
console.log('');
console.log(`Tree is ${!bst.getBalanced() ? 'im' : ''}balanced, rebalancing...`);
bst.rebalance();
console.log('');
console.log(`Tree is ${!bst.getBalanced() ? 'im' : ''}balanced.`);
console.log('');
console.log("Level order: " + treeOps.levelOrder(bst.getRoot()));
console.log("Pre order: " + treeOps.preOrder(bst.getRoot()));
console.log("Post order: " + treeOps.postOrder(bst.getRoot()));
console.log("In order: " + treeOps.inOrder(bst.getRoot()));
'use strict'

import scratch from './scratch'

test('gets array of fib sequence numbers recursively', () => {
    const fibsRecValue = scratch.getFibsArrayRecursive(8);
    expect(fibsRecValue).toEqual([0, 1, 1, 2, 3, 5, 8, 13]);
})

test('performs merge sort recursively', () => {
    const shuffled = [5, 2, 8, 6, 1, 7, 0, 9, 3, 4];
    const sorted = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const value = scratch.mergeSort(shuffled);
    expect(value).toEqual(sorted);
})
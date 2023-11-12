'use strict'

import util from './util.js'

test('removes duplicates', () => {
    const value = util.removeDuplicates([1, 1]);
    expect(value.length).toBe(1);
})

test('ignores empty array', () => {
    const value = util.removeDuplicates();
    expect(value.length).toBe(0);
})

test('performs merge sort', () => {
    const shuffled = [5, 2, 8, 6, 1, 7, 0, 9, 3, 4];
    const sorted = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    const value = util.mergeSort(shuffled);
    expect(value).toEqual(sorted);
})

test('ignores empty array', () => {
    const value = util.mergeSort();
    expect(value.length).toBe(0);
})

test('ignores single value array', () => {
    const value = util.mergeSort([1]);
    expect(value.length).toBe(1);
})
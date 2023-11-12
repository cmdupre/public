'use strict'

function getFibsArrayRecursive(i) {
    if (i < 3) return [0, 1];
    const values = getFibsArrayRecursive(i - 1);
    const len = values.length;
    values.push(values[len - 2] + values[len - 1]);
    return values;
}

function mergeSort(values) {
    if (values.length < 2)
        return values;

    if (values.length === 2)
        return [Math.min(...values), Math.max(...values)];

    const midPoint = Math.floor(values.length / 2);
    let leftHalf = [];
    let rightHalf = [];
    for (let i = 0; i < midPoint; i++) leftHalf.push(values[i]);
    for (let i = midPoint; i < values.length; i++) rightHalf.push(values[i]);

    leftHalf = mergeSort(leftHalf);
    rightHalf = mergeSort(rightHalf);

    const merged = [];
    let l = 0;
    let r = 0;
    while (merged.length < (leftHalf.length + rightHalf.length)) {
        if (l < leftHalf.length && r < rightHalf.length) {
            if (leftHalf[l] < rightHalf[r])
                merged.push(leftHalf[l++]);
            else
                merged.push(rightHalf[r++]);
        }
        else {
            if (l < leftHalf.length)
                merged.push(leftHalf[l++]);
            else
                merged.push(rightHalf[r++]);
        }
    }

    return merged;
}

export default (() => {
    return {
        getFibsArrayRecursive,
        mergeSort,
    }
})();
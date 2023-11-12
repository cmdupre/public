'use strict'

function mergeSort(values) {
    if (!values)
        return [];

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

function removeDuplicates(values) {
    if (!values || values.length < 2)
        return [];

    return values.filter((value, index) => values.indexOf(value) === index);
}

// print to console, by TOP!
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.getRight() !== null) {
        prettyPrint(node.getRight(), `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.getData()}`);
    if (node.getLeft() !== null) {
        prettyPrint(node.getLeft(), `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};

export default (() => {
    return {
        removeDuplicates,
        mergeSort,
        prettyPrint,
    }
})();
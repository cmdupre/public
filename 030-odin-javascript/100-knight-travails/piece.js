import position from './position.js'

// Define the possible moves a piece can make.

const knight = [
    position.create(-2, 1),
    position.create(-2, -1),
    position.create(-1, 2),
    position.create(-1, -2),
    position.create(1, 2),
    position.create(1, -2),
    position.create(2, 1),
    position.create(2, -1),
]

export default (() => {
    return {
        knight,
    }
})();

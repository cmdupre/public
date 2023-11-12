import position from './position.js';
import piece from './piece.js';
import getMoves from './board.js';

const moves = getMoves(
    piece.knight,
    position.create(3, 3),
    position.create(4, 3),
);

console.log(`You made it in ${moves.length - 1} moves! Here's your path:`)
for (const move of moves)
    console.log(`    ${move.toString()}`);

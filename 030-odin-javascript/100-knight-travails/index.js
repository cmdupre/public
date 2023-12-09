import position from './position.js';
import piece from './piece.js';
import knightMoves from './board.js';

const moves = knightMoves(
    piece.knight,
    position.create(3, 3),
    position.create(4, 3),
);

if (moves.length > 0) {
    console.log(`You made it in ${moves.length - 1} moves! Here's your path:`)
    for (const move of moves)
        console.log(`    ${move.toString()}`);
}
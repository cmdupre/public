import gameboardFactory from './gameboardFactory.js';
import humanFactory from './humanFactory.js'
import pointFactory from './pointFactory.js';
import shipFactory from './shipFactory.js';

test('creates new object', () => {
    const opponentGameboard = gameboardFactory.create(10, 10);
    const human = humanFactory.create('name', opponentGameboard);
    expect(human.getName()).toBe('name');
    expect(human.getGameboard()).not.toBeUndefined();
})

test('can attack opponent board, hit', () => {
    const opponentGameboard = gameboardFactory.create(10, 10);
    const location = pointFactory.create(0, 0);
    opponentGameboard.registerShip(shipFactory.createHorizontal(1), location);
    const player = humanFactory.create('name', opponentGameboard);
    const result = player.attack(location);
    expect(result).not.toBeNull();
})

test('can attack opponent board, miss', () => {
    const opponentGameboard = gameboardFactory.create(10, 10);
    const shipLocation = pointFactory.create(0, 0);
    const aimPoint = pointFactory.create(1, 1);
    opponentGameboard.registerShip(shipFactory.createHorizontal(1), shipLocation);
    const player = humanFactory.create('name', opponentGameboard);
    const result = player.attack(aimPoint);
    expect(result).toBeNull();
})
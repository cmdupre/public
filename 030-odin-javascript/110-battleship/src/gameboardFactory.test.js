import gameboardFactory from './gameboardFactory.js'
import pointFactory from './pointFactory.js';
import shipFactory from './shipFactory.js'

test('creates new object', () => {
    const gameboard = gameboardFactory.create(10, 10);
    expect(gameboard.isLive()).toBe(false);
})

test('registers new ship', () => {
    const gameboard = gameboardFactory.create(10, 10);
    const ship = shipFactory.createHorizontal(5);
    const point = pointFactory.create(5, 5);
    const result = gameboard.registerShip(ship, point);
    expect(result).toBe(true);
    expect(gameboard.isLive()).toBe(true);
})

test('fails to register ship, x-value too large', () => {
    const gameboard = gameboardFactory.create(10, 10);
    const ship = shipFactory.createHorizontal(5);
    const point = pointFactory.create(8, 0);
    const result = gameboard.registerShip(ship, point);
    expect(result).toBe(false);
    expect(gameboard.isLive()).toBe(false);
})

test('fails to register ship, y-value too large', () => {
    const gameboard = gameboardFactory.create(10, 10);
    const ship = shipFactory.createVertical(5);
    const point = pointFactory.create(0, 8);
    const result = gameboard.registerShip(ship, point);
    expect(result).toBe(false);
    expect(gameboard.isLive()).toBe(false);
})

test('fails to register ship, cell already assigned', () => {
    const gameboard = gameboardFactory.create(10, 10);
    const point = pointFactory.create(0, 0);
    let ship = shipFactory.createHorizontal(1);
    let result = gameboard.registerShip(ship, point);
    ship = shipFactory.createHorizontal(2);
    result = gameboard.registerShip(ship, point);
    expect(result).toBe(false);
    expect(gameboard.isLive()).toBe(true);
})

test('receives attack, registers hit', () => {
    const gameboard = gameboardFactory.create(10, 10);
    const ship = shipFactory.createHorizontal(1);
    const point = pointFactory.create(0, 0);
    gameboard.registerShip(ship, point);
    const result = gameboard.registerAttack(point);
    expect(ship.getHits()).toBe(1);
    expect(result).toBe(ship);
    expect(gameboard.isLive()).toBe(false);
})

test('receives attack, registers miss', () => {
    const gameboard = gameboardFactory.create(10, 10);
    const ship = shipFactory.createHorizontal(1);
    let point = pointFactory.create(1, 1);
    gameboard.registerShip(ship, point);
    point = pointFactory.create(0, 0);
    const result = gameboard.registerAttack(point);
    expect(result).toBeNull();
    expect(gameboard.isLive()).toBe(true);
})

test('receives attack, bad location', () => {
    const gameboard = gameboardFactory.create(10, 10);
    const ship = shipFactory.createHorizontal(1);
    let point = pointFactory.create(0, 0);
    gameboard.registerShip(ship, point);
    point = pointFactory.create(11, 11);
    const result = gameboard.registerAttack(point);
    expect(result).toBeNull();
    expect(gameboard.isLive()).toBe(true);
})
import cellFactory from './cellFactory.js'
import pointFactory from "./pointFactory.js"
import shipFactory from './shipFactory.js';

test('creates new object', () => {
    const point = pointFactory.create(1, 2);
    const cell = cellFactory.create(point);
    expect(cell.getCoordinate()).toBe(point);
    expect(cell.getShip()).toBeNull();
    expect(cell.getHit()).toBe(false);
})

test('sets ship', () => {
    const cell = cellFactory.create();
    const ship = shipFactory.createHorizontal(1);
    cell.setShip(ship);
    expect(cell.getShip().getLength()).toBe(1);
})
test('marks cell and ship as hit', () => {
    const cell = cellFactory.create();
    const ship = shipFactory.createHorizontal(1);
    cell.setShip(ship);
    cell.setHit();
    expect(cell.getHit()).toBe(true);
    expect(cell.getShip().getHits()).toBe(1);
    expect(cell.getShip().isSunk()).toBe(true);
})
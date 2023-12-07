import shipFactory from './shipFactory.js'

test('creates a new ship with proper defaults', () => {
    const ship = shipFactory.createVertical(5);
    expect(ship.getLength()).toBe(5);
    expect(ship.getHits()).toBe(0);
    expect(ship.isSunk()).toBe(false);
})

test('increments hit count and detects if ship is sunk', () => {
    const ship = shipFactory.createHorizontal(1);
    expect(ship.isSunk()).toBe(false);
    ship.hit();
    expect(ship.getHits()).toBe(1);
    expect(ship.isSunk()).toBe(true);
})
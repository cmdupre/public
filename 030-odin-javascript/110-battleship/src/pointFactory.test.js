import pointFactory from './pointFactory.js'

test('creates new object', () => {
    const point = pointFactory.create(1, 2);
    expect(point.x).toBe(1);
    expect(point.y).toBe(2);
})

test('equals', () => {
    const p1 = pointFactory.create(1, 2);
    const p2 = pointFactory.create(2, 2);
    expect(p1.equals(p2)).toBe(false);
    const p3 = pointFactory.create(1, 2);
    expect(p1.equals(p3)).toBe(true);
})
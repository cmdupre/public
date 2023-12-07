import gameboardFactory from './gameboardFactory.js';
import aiFactory from './aiFactory.js'

test('creates new object', () => {
    const opponentGameboard = gameboardFactory.create(10, 10);
    const ai = aiFactory.create(opponentGameboard);
    expect(ai.getGameboard()).not.toBeUndefined();
})

test('can attack', () => {
    const opponentGameboard = gameboardFactory.create(10, 10);
    const ai = aiFactory.create(opponentGameboard);
    const aiResponse = ai.attack(10, 10);
    expect(aiResponse).not.toBeUndefined();
    expect(aiResponse).not.toBeNull();
})
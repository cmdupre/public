function create(playerName, opponentGameboard) {
    const name = playerName;
    const gameboard = opponentGameboard;

    function attack(point) {
        return gameboard.registerAttack(point);
    }

    return Object.freeze({
        getName: () => name,
        getGameboard: () => gameboard,
        attack,
    })
}

export default (() => {
    return {
        create,
    }
})();
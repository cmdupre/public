const rps = require('./rps.js');

test("Returns not null and defined computer choice", () =>
{
    let value = rps.getComputerChoiceString();

    expect(value).not.toBeNull();
    expect(value).not.toBeUndefined();
});

test("Returns test value for player choice", () =>
{
    expect(rps.getPlayerChoiceString()).toBe("TestValue");
});

test("Returns correct capitalized value", () =>
{
    expect(rps.capitalize("")).toBe("");
    expect(rps.capitalize("a")).toBe("A");
    expect(rps.capitalize("ab")).toBe("Ab");
    expect(rps.capitalize(1)).toBe(1);
});

test("Check player wins", () =>
{
    let cc = "Rock";

    expect(rps.checkPlayerWins("rock", cc)).toBe(false);
    expect(rps.checkPlayerWins("Rock", cc)).toBeNull();
    expect(rps.checkPlayerWins("Paper", cc)).toBe(true);
    expect(rps.checkPlayerWins("Scissors", cc)).toBe(false);
});
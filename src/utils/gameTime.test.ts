import { getInGameTime, ticksPerInGameDay } from "./gameTime";

test("26250 ticks should equal 10.5hours", () => {
    expect(getInGameTime(26250).hours).toEqual(10);
    expect(getInGameTime(26250).minutes).toEqual(30);
});
test.each([
    [2500, 1],
    [3500, 1],
    [4999, 1],
    [5000, 2],
    [5001, 2],
    [62500, 1],
])("%i ticks should equal %i hour", (ticks, expected) => {
    expect(getInGameTime(ticks).hours).toEqual(expected);
});
test.each([1, 2, 5, 55])("count ticks should equal in days", (days) =>
    expect(getInGameTime(days * ticksPerInGameDay).days).toEqual(days),
);

// test("is true when both predicates are true", () => expect(isLegalDrinkingAge(22)).toBe(true));

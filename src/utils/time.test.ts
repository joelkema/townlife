import { getTime, ticksPerDay, ticksPerMinute } from "./time";

test("42 ticks should equal one minute", () => {
    expect(getTime(ticksPerMinute).minutes).toEqual(1);
});
test.each([
    [2500, 1],
    [3500, 1],
    [5000, 2],
    [62500, 1],
])("%i ticks should equal %i hour", (ticks, expected) => {
    expect(getTime(ticks).hours).toEqual(expected);
});
test.each([1, 2, 5, 55])("count ticks should equal in days", (days) =>
    expect(getTime(days * ticksPerDay).days).toEqual(days),
);

// test("is true when both predicates are true", () => expect(isLegalDrinkingAge(22)).toBe(true));

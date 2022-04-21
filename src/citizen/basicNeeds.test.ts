import { Citizen } from "../types";
import { isExhausted, isRested, isTired, isVeryTired } from "./basicNeeds";

const citizenWithRest = (rest: number): Citizen => ({
    id: "1",
    name: "test",
    state: "asleep",
    basicNeeds: { food: 0, rest },
});

test.each([
    [true, 100],
    [true, 29],
    [false, 1],
])("should be %i when rest is %i", (expected, amount) =>
    expect(isRested(citizenWithRest(amount))).toBe(expected),
);

test.each([
    [true, 14],
    [true, 28],
    [true, 25],
    [false, 1],
    [false, 100],
])("should be %i when rest is %i", (expected, amount) =>
    expect(isTired(citizenWithRest(amount))).toBe(expected),
);

test.each([
    [false, 14],
    [false, 28],
    [true, 1],
    [true, 13],
    [true, 2],
])("should be %i when rest is %i", (expected, amount) =>
    expect(isVeryTired(citizenWithRest(amount))).toBe(expected),
);

test.each([
    [false, 1],
    [true, 0],
    [true, -1],
])("should be %i when rest is %i", (expected, amount) =>
    expect(isExhausted(citizenWithRest(amount))).toBe(expected),
);

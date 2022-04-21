import { isLessThan, isPositive, isNegative } from ".";

const isLessThanFour = isLessThan(4);

test("three isLessThan four", () => expect(isLessThanFour(3)).toBe(true));
test("nine isLessThan four results in false", () => expect(isLessThanFour(9)).toBe(false));

test("one is a positive number", () => expect(isPositive(1)).toBe(true));
test("minus one is not a positive number", () => expect(isPositive(-1)).toBe(false));

test("minus one is a negative number", () => expect(isNegative(-1)).toBe(true));
test("one is not a negative number", () => expect(isNegative(1)).toBe(false));

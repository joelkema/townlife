import { isLessThan, isPositive, isNegative } from "./predicates";

test("three isLessThan four", () => expect(isLessThan(4)(3)).toBe(true));
test("nine isLessThan ten", () => expect(isLessThan(10)(9)).toBe(true));

test("one is a positive number", () => expect(isPositive(1)).toBe(true));
test("minus one is not a positive number", () => expect(isPositive(-1)).toBe(false));

test("minus one is a negative number", () => expect(isNegative(-1)).toBe(true));
test("one is not a negative number", () => expect(isNegative(1)).toBe(false));

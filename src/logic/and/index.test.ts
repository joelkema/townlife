import and from ".";
import { isGreaterThanEquals, isNumber } from "../../predicates";

// isLegalDrinkingAge :: Number -> Boolean
const isLegalDrinkingAge = and(isNumber, isGreaterThanEquals(21));

test("is false when one predicate is false", () => {
    expect(isLegalDrinkingAge(18)).toBe(false);
    expect(isLegalDrinkingAge(1)).toBe(false);
    expect(isLegalDrinkingAge(null as any)).toBe(false);
    expect(isLegalDrinkingAge("" as any)).toBe(false);
});

test("is true when both predicates are true", () => expect(isLegalDrinkingAge(22)).toBe(true));

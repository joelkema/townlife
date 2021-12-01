import { Citizen } from "../types";
import { isRested } from "./basicNeeds";

const citizenWithFood = (food: number): Citizen => ({ name: "test", basicNeeds: { rest: 0, food } });

test("is rested when rest is 100", () => expect(isRested(citizenWithFood(100))).toBe(true));
test("is rested when rest is 29", () => expect(isRested(citizenWithFood(29))).toBe(true));
test("is not rested when rest is 1", () => expect(isRested(citizenWithFood(1))).toBe(false));

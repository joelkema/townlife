import { and } from "../logic";
import { isGreaterThan, isGreaterThanEquals, isLessThan, isLessThanEquals } from "../predicates";
import { Citizen } from "../types";

// FOOD
export const isFed = ({ basicNeeds: { food } }: Citizen) => food > 25;
export const isHungry = ({ basicNeeds: { food } }: Citizen) => food > 12.5 && food < 25;
export const isUrgentlyHungry = ({ basicNeeds: { food } }: Citizen) => food >= 1 && food < 12.5;
export const isStarving = ({ basicNeeds: { food } }: Citizen) => food < 1;

const calculateSaturation = (currentSaturation: number) =>
    currentSaturation - 0.8 > 0 ? Math.round(currentSaturation - 0.8) : 0;

export const decreaseSaturation = (citizen: Citizen): Citizen => ({
    ...citizen,
    basicNeeds: { ...citizen.basicNeeds, food: calculateSaturation(citizen.basicNeeds.food) },
});

// RESTED
const checkIfRested = (pred: (n: number) => boolean) => (citizen: Citizen) =>
    pred(citizen.basicNeeds.rest);
export const isRested = checkIfRested(isGreaterThan(28));
export const isTired = checkIfRested(and(isGreaterThanEquals(14), isLessThanEquals(28)));
export const isVeryTired = checkIfRested(and(isGreaterThanEquals(1), isLessThan(14)));
export const isExhausted = checkIfRested(isLessThan(1));

export const isAwake = ({ state }: Citizen) => state === "awake";
export const isSleeping = ({ state }: Citizen) => state === "asleep";

import { and } from "../logic";
import { isGreaterThan, isLessThan } from "../predicates";
import { Citizen } from "../types";

// FOOD
export const isFed = ({ basicNeeds: { food } }: Citizen) => food > 25;
export const isHungry = ({ basicNeeds: { food } }: Citizen) => food > 12.5 && food < 25;
export const isUrgentlyHungry = ({ basicNeeds: { food } }: Citizen) => food >= 1 && food < 12.5;
export const isStarving = ({ basicNeeds: { food } }: Citizen) => food < 1;

// REST
const checkIfRest = (pred: (n: number) => boolean) => (citizen: Citizen) => pred(citizen.basicNeeds.rest);
export const isRested = checkIfRest(isGreaterThan(28));
export const isTired = checkIfRest(and(isGreaterThan(14), isLessThan(28)));
export const isVeryTired = checkIfRest(and(isGreaterThan(1), isLessThan(14)));
export const isExhausted = checkIfRest(isLessThan(1));

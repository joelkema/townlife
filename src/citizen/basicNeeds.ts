import { and } from "../logic";
import {
    isGreaterThan,
    isGreaterThanEquals,
    isLessThan,
    isLessThanEquals,
    isNumber,
} from "../predicates";
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

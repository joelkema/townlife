import { Citizen } from "../types";
import { substractPercentage } from "../utils/number";

// FOOD
export const isFed = ({ basicNeeds: { food } }: Citizen) => food > 25;
export const isHungry = ({ basicNeeds: { food } }: Citizen) => food > 12.5 && food < 25;
export const isUrgentlyHungry = ({ basicNeeds: { food } }: Citizen) => food >= 1 && food < 12.5;
export const isStarving = ({ basicNeeds: { food } }: Citizen) => food < 1;

const calculateSaturation = (f: number) => substractPercentage(0.002668)(f);

export const decreaseSaturation = (citizen: Citizen): Citizen => ({
    ...citizen,
    basicNeeds: { ...citizen.basicNeeds, food: calculateSaturation(citizen.basicNeeds.food) },
});

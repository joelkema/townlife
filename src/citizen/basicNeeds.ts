import { Citizen } from "../types";
import { substractPercentage } from "../utils/number";

// FOOD
// export const isFed = ({ basicNeeds: { food } }: Citizen) => food > 25;
// 
// export const isUrgentlyHungry = ({ basicNeeds: { food } }: Citizen) => food >= 1 && food < 12.5;
// export const isStarving = ({ basicNeeds: { food } }: Citizen) => food < 1;

// const calculateSaturation = substractPercentage(0.002668);

export const isHungry = ({ basicNeeds: { hunger } }: Citizen) => hunger > 45000;

// hunger increments by 1 during each game tick
export const increaseHunger = (citizen: Citizen): Citizen => ({
    ...citizen,
    basicNeeds: { ...citizen.basicNeeds, hunger: citizen.basicNeeds.hunger + 1 },
});



import { and, pipe, when } from "../../logic";
import { isNumber, isGreaterThanEquals, isLessThan } from "../../predicates";
import { Citizen } from "../../types";
import { ticksPerDay } from "../../utils/time";

const ticksInInterval = 150;

const checkIfRested = (pred: (n: number) => boolean) => (citizen: Citizen) =>
    pred(citizen.basicNeeds.rest);

const isRestedAmount = and(isNumber, isGreaterThanEquals(28));
const isTiredAmount = and(isNumber, and(isGreaterThanEquals(14), isLessThan(28)));
const isVeryTiredAmount = and(isNumber, and(isGreaterThanEquals(1), isLessThan(14)));
const isExhaustedAmount = and(isNumber, isLessThan(1));

export const isRested = checkIfRested(isRestedAmount);
export const isTired = checkIfRested(isTiredAmount);
export const isVeryTired = checkIfRested(isVeryTiredAmount);
export const isExhausted = checkIfRested(isExhaustedAmount);

export const isAwake = ({ state }: Citizen) => state === "awake";
export const isSleeping = ({ state }: Citizen) => state === "asleep";

const substractPercentage = (amount: number) => (p: number) => p - amount < 0 ? 0 : p - amount;
const addPercentage = (amount: number) => (p: number) => p + amount > 100 ? 100 : p + amount;

const updateRestWhenAwake = (rest: number) =>
    pipe(
        rest,
        when(isRestedAmount, substractPercentage(0.237)),
        when(isTiredAmount, substractPercentage(0.166)),
        when(isVeryTiredAmount, substractPercentage(0.071)),
        when(isExhaustedAmount, substractPercentage(0.142)),
    );

// const updateRestWhenSleeping = (rest: number) =>
//     pipe(
//         rest,
//         when(isRestedAmount, substractPercentage(0.237)),
//         when(isTiredAmount, substractPercentage(0.166)),
//         when(isVeryTiredAmount, substractPercentage(0.071)),
//         when(isExhaustedAmount, substractPercentage(0.142)),
//     );

// const calculateRest = (currentRest: number) =>

//     currentRest - 0.8 > 0 ? Math.round(currentRest - 0.8) : 0;

// a character requires 10.5 hours (26,250 ticks) to full rest from 0% to 100%.
const increaseRest = 100 * (ticksInInterval / ticksPerDay) * (24 / 10.5);

export const decreaseRest =
    (currentTicks: number, prevTicks: number) =>
    (citizen: Citizen): Citizen => {
        const shouldDecreaseRest =
            currentTicks % ticksInInterval === 0 || currentTicks - prevTicks >= ticksInInterval;

        if (!shouldDecreaseRest) return citizen;

        return {
            ...citizen,
            basicNeeds: {
                ...citizen.basicNeeds,
                rest: updateRestWhenAwake(citizen.basicNeeds.rest),
            },
        };
    };

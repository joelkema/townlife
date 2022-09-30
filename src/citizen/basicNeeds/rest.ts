import { and, pipe, when } from "../../logic";
import { isNumber, isGreaterThanEquals, isLessThan } from "../../predicates";
import { Citizen } from "../../types";
import { ticksPerInGameDay } from "../../utils/gameTime";
import { substractPercentage, addPercentage } from "../../utils/number";

const checkRestTicks = 150;

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

const updateRestWhenAwake = (rest: number) =>
    pipe(
        rest,
        when(isRestedAmount, substractPercentage(0.237)),
        when(isTiredAmount, substractPercentage(0.166)),
        when(isVeryTiredAmount, substractPercentage(0.071)),
        when(isExhaustedAmount, substractPercentage(0.142)),
    );

// When awake, rest goes down every 150 ticks
export const shouldChangeRest = (tick: number) => (_: Citizen) => tick % checkRestTicks === 0;

// a character requires 10.5 hours (26,250 ticks) to full rest from 0% to 100%.
const updateRestWhenSleeping = addPercentage(100 * (60 / ticksPerInGameDay) * (24 / 10.5));

export const increaseRest = (citizen: Citizen): Citizen => ({
    ...citizen,
    basicNeeds: {
        ...citizen.basicNeeds,
        rest: updateRestWhenSleeping(citizen.basicNeeds.rest),
    },
});

export const decreaseRest = (citizen: Citizen): Citizen => ({
    ...citizen,
    basicNeeds: {
        ...citizen.basicNeeds,
        rest: updateRestWhenAwake(citizen.basicNeeds.rest),
    },
});

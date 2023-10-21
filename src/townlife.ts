import {  increaseHunger, isHungry } from "./citizen/basicNeeds";
import {
    shouldChangeRest,
    increaseRest,
    isSleeping,
    decreaseRest,
    isTired,
} from "./citizen/basicNeeds/rest";
import { pipe, when, not, and, or } from "./logic";
import { AppState, Citizen } from "./types";
import { tickToHours, getInGameTime } from "./utils/gameTime";

const eat = (citizen: Citizen): Citizen => ({
    ...citizen,
    basicNeeds: { ...citizen.basicNeeds, hunger: citizen.basicNeeds.hunger - 50000 },
});

const sleep = (citizen: Citizen): Citizen => ({
    ...citizen,
    state: "asleep",
});

const wakeUp = (citizen: Citizen): Citizen => ({
    ...citizen,
    state: "awake",
});

const timetable: Record<number, string> = {
    0: "sleep",
    1: "sleep",
    2: "sleep",
    3: "sleep",
};

const log = (prop?: keyof Citizen) => (citizen: Citizen) => {
    if (prop) console.log((citizen as any)[prop] as any);

    console.log(citizen);
    return citizen;
};

// const act = (hour: number, minutes: number) => {};

const isSleepTime = (tick: number) => (_: Citizen) =>
    tickToHours(tick) < 8 || tickToHours(tick) > 20;

const townlife = (state: AppState) => {
    const tick = (tick: number): AppState => {
        const { minutes, hours, days } = getInGameTime(tick);

        const citizens = Object.keys(state.citizens).reduce((map: Record<string, Citizen>, id) => {
            const c = state.citizens[id];

            //const sleeptime = (citizen: Citizen) => (hour: number) => {};

            // const a = when(isSleepTime, (_) => sleep(c))(hour);
            // if (isSleepTime(hour)) {
            //     console.log("sleeptime");
            // }

            const whenSleeping = (hours: number) => (citizen: Citizen) =>
                pipe(
                    citizen,
                    // sleep section
                    when(shouldChangeRest(tick), increaseRest),
                    when(not(isSleepTime(hours)), wakeUp),

                    // decreaseSaturation,
                );


            // const citizen = state.citizens[id];
            const citizen = pipe(
                c,
                // sleeping
                when(and(isSleeping, shouldChangeRest(tick)), increaseRest),
                // not sleeping
                when(and(not(isSleeping), shouldChangeRest(tick)), decreaseRest),

                // when(and(not(isSleepTime(tick)), isSleeping), wakeUp),
                when(not(isTired), wakeUp),
                when(isTired, sleep),

                // eat section
                when(isHungry, eat),
                increaseHunger, 
                // increaseSleep 


            );

            map[id] = citizen;

            return map;
        }, {});

        return { ...state, days, hours, minutes, citizens };
    };

    return { tick };
};

export default townlife;

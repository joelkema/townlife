import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import useInterval from "./hooks/useInterval";
import { AppState, Citizen } from "./types";
import { decreaseSaturation, isHungry, isSleeping, isTired } from "./citizen/basicNeeds";

import { getDay, getHours, getMinutes, calculateTime } from "./utils/date";
import { or, when } from "./logic";
import compose from "./logic/compose";
import { isGreaterThan, isLessThan } from "./predicates";
import { pipe } from "./logic/pipe";

const oneHourTicks = 2500; // ticks
const tickPerSecond = 60;

const oneTick = (1 / 60) * 1000; // one tick is 1/60 of a realtime second
const ticksPerDay = 20000; // (5 1/2 min per day)

const oneHour = 1000; // 1 second
const quarterHour = oneHour / 4;

// 0 = 00:00
// 1 = 00:15
// 5 = 01:15

const wakeup = (citizen: Citizen): Citizen => ({
    ...citizen,
    state: "awake",
});

const eat = (citizen: Citizen): Citizen => ({
    ...citizen,
    basicNeeds: { ...citizen.basicNeeds, food: 100 },
});

const sleep = (citizen: Citizen): Citizen => ({
    ...citizen,
    state: "asleep",
});

const increaseRest = (citizen: Citizen): Citizen => ({
    ...citizen,
    basicNeeds: { ...citizen.basicNeeds, rest: 100 },
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

const isSleepTime = or(isLessThan(8), isGreaterThan(20));

const tick =
    (prev: Date, current: Date) =>
    (state: AppState): AppState => {
        const day = getDay(current);
        const hour = getHours(current);
        const minute = getMinutes(current);

        const citizens = Object.keys(state.citizens).reduce((map: Record<string, Citizen>, id) => {
            const c = state.citizens[id];

            console.log(` == TIME == `);
            console.log(`${day}  ${hour}:${minute}`);

            //const sleeptime = (citizen: Citizen) => (hour: number) => {};

            const a = when(isSleepTime, (_) => sleep(c))(hour);
            if (isSleepTime(hour)) {
                console.log("sleeptime");
            }

            // const citizen = state.citizens[id];
            const citizen = pipe(
                c,
                log("state"),
                when(isSleeping, increaseRest),
                when(isHungry, eat),
                when(isTired, sleep),
                decreaseSaturation,
            );

            map[id] = citizen;

            return map;
        }, {});

        return { ...state, citizens };
    };

const aad: Citizen = {
    id: "1",
    name: "Aad",
    state: "asleep",
    basicNeeds: {
        food: 100,
        rest: 100,
    },
};

const useTownLife = () => {
    const [data, setData] = useState<AppState>({
        citizens: {
            [aad.id]: aad,
        },
    });

    // quarter hour
    const quarterHourRef = useRef<number>(0);

    useInterval(() => {
        const updatedState = tick(
            calculateTime(quarterHourRef.current),
            calculateTime(quarterHourRef.current++),
        )(data);

        setData(updatedState);
    }, quarterHour); // Simulation runs every 250ms,

    // useInterval(() => {
    //     console.log("A");
    // }, oneTick);

    return [data];
};

const App = () => {
    const [data] = useTownLife();

    // console.log(data.citizens["1"].basicNeeds.food);

    return <>{}</>;
};

export default App;

// Everyday:
// Person has basicNeeds: food, water, shelter / sleep.
//

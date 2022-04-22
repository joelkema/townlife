import { useRef, useState } from "react";
import "./App.css";
import useInterval from "./hooks/useInterval";
import { AppState, Citizen } from "./types";

import { and, not, when } from "./logic";
import { pipe } from "./logic/pipe";
import { ticksPerMinute, getTime, formatTime, ticksPerMilliseconds } from "./utils/time";
import { decreaseRest, isSleeping } from "./citizen/basicNeeds/rest";
import { isHungry, decreaseSaturation } from "./citizen/basicNeeds";

const oneSecond = 1000; // 1 second = 1000ms
const interval = oneSecond / 4; // 250ms

const eat = (citizen: Citizen): Citizen => ({
    ...citizen,
    basicNeeds: { ...citizen.basicNeeds, food: 100 },
});

const sleep = (citizen: Citizen): Citizen => ({
    ...citizen,
    state: "asleep",
});

const wakeUp = (citizen: Citizen): Citizen => ({
    ...citizen,
    state: "awake",
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

const isSleepTime = (hour: number) => (_: Citizen) => hour < 8 || hour > 20;

const automate =
    (prev: number, current: number) =>
    (state: AppState): AppState => {
        const prevTicks = ticksPerMilliseconds(prev * interval, 11);
        const currentTicks = ticksPerMilliseconds(current * interval, 11);

        console.log("==================");
        console.log(prev);
        console.log(current);
        console.log(prevTicks);
        console.log(currentTicks);
        console.log(currentTicks - prevTicks);

        const { minutes, hours, days } = getTime(currentTicks);

        const citizens = Object.keys(state.citizens).reduce((map: Record<string, Citizen>, id) => {
            const c = state.citizens[id];

            //const sleeptime = (citizen: Citizen) => (hour: number) => {};

            // const a = when(isSleepTime, (_) => sleep(c))(hour);
            // if (isSleepTime(hour)) {
            //     console.log("sleeptime");
            // }

            // const citizen = state.citizens[id];
            const citizen = pipe(
                c,
                // log("state"),
                when(isSleeping, increaseRest),
                when(not(isSleeping), decreaseRest(currentTicks, prevTicks)),
                when(and(not(isSleepTime(hours)), isSleeping), wakeUp),
                when(isHungry, eat),
                // when(or(isTired, isSleepTime, sleep),
                decreaseSaturation,
            );

            map[id] = citizen;

            return map;
        }, {});

        return { ...state, days, hours, minutes, citizens };
    };

const aad: Citizen = {
    id: "1",
    name: "Aad",
    state: "awake",
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
        days: 0,
        hours: 0,
        minutes: 0,
    });

    const prevTicks = useRef<number>(0);
    const currentTicks = useRef<number>(0);

    useInterval(() => {
        currentTicks.current++;

        const updatedState = automate(prevTicks.current, currentTicks.current)(data);

        prevTicks.current = currentTicks.current;

        setData(updatedState);
    }, interval); // Simulation runs every 250ms,

    // useInterval(() => {
    //     console.log("A");
    // }, oneTick);

    return { data, ticks: prevTicks.current };
};

const App = () => {
    const { data, ticks } = useTownLife();

    // console.log(data.citizens["1"].basicNeeds.food);

    return (
        <>
            <p>day: {data.days}</p>
            <p>time: {formatTime(data.hours, data.minutes)}</p>
            <p>ticks: {ticks}</p>

            <table>
                <tr>
                    <th>Name</th>
                    <th>State</th>
                    <th>Food</th>
                    <th>Rest</th>
                </tr>
                <tr>
                    <td>{data.citizens[aad.id].name}</td>
                    <td>{data.citizens[aad.id].state}</td>
                    <td>{data.citizens[aad.id].basicNeeds.food}</td>
                    <td>{data.citizens[aad.id].basicNeeds.rest}</td>
                </tr>
            </table>
        </>
    );
};

export default App;

// Everyday:
// Person has basicNeeds: food, water, shelter / sleep.
//

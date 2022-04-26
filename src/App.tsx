import { useRef, useState } from "react";
import "./App.css";
import useInterval from "./hooks/useInterval";
import { AppState, Citizen } from "./types";

import { and, not, or, when } from "./logic";
import { pipe } from "./logic/pipe";
import { getInGameTime, formatTime, tickToHours } from "./utils/gameTime";
import {
    decreaseRest,
    increaseRest,
    isSleeping,
    isTired,
    shouldChangeRest,
} from "./citizen/basicNeeds/rest";
import { isHungry, decreaseSaturation } from "./citizen/basicNeeds";

const TICKS_PER_SECOND = 320;

const oneSecond = 1000; // 1 second = 1000ms
const interval = oneSecond / TICKS_PER_SECOND; // Simulation runs every 250ms. This results in 15 ticks per interval (1000 / 4 = 60 / 4)

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

// 0
// 360 --- 150 | 300
// 720

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

const simulate =
    (tick: number) =>
    (state: AppState): AppState => {
        const { minutes, hours, days } = getInGameTime(tick, TICKS_PER_SECOND);

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
                // sleep section
                when(and(isSleeping, shouldChangeRest(tick)), increaseRest),
                when(and(not(isSleeping), shouldChangeRest(tick)), decreaseRest),
                when(and(not(isSleepTime(hours)), isSleeping), wakeUp),
                when(or(isTired, isSleepTime(hours)), sleep),
                when(isHungry, eat),

                // decreaseSaturation,
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
        rest: 60,
    },
};

const jan = {
    ...aad,
    id: "2",
    name: "Jan",
};

const useTownLife = () => {
    const [data, setData] = useState<AppState>({
        citizens: {
            [aad.id]: aad,
            // [jan.id]: jan,
        },
        days: 0,
        hours: 0,
        minutes: 0,
    });

    const prevTick = useRef<number>(0);
    const currentTick = useRef<number>(2500 * 1);

    useInterval(() => {
        currentTick.current++;

        const updatedState = simulate(currentTick.current)(data);

        prevTick.current = currentTick.current;

        setData(updatedState);
    }, interval);

    // useInterval(() => {
    //     console.log("A");
    // }, oneTick);

    return { data, ticks: currentTick.current };
};

const App = () => {
    const { data, ticks } = useTownLife();

    // console.log(data.citizens["1"].basicNeeds.food);

    return (
        <>
            <p>day: {data.days}</p>
            <p>time: {formatTime(data.hours, data.minutes)}</p>
            <p>TPS: {TICKS_PER_SECOND}</p>
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
                    <td></td>
                    <td>{data.citizens[aad.id].basicNeeds.rest}</td>
                </tr>
                {/* <tr>
                    <td>{data.citizens[jan.id].name}</td>
                    <td>{data.citizens[jan.id].state}</td>
                    <td>{data.citizens[jan.id].basicNeeds.food}</td>
                    <td>{data.citizens[jan.id].basicNeeds.rest}</td>
                </tr> */}
            </table>
        </>
    );
};

export default App;

// Everyday:
// Person has basicNeeds: food, water, shelter / sleep.
//

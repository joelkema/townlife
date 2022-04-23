import { useRef, useState } from "react";
import "./App.css";
import useInterval from "./hooks/useInterval";
import { AppState, Citizen } from "./types";

import { and, not, or, when } from "./logic";
import { pipe } from "./logic/pipe";
import { getInGameTime, formatTime, millisecondsToTicks } from "./utils/gameTime";
import { decreaseRest, increaseRest, isSleeping, isTired } from "./citizen/basicNeeds/rest";
import { isHungry, decreaseSaturation } from "./citizen/basicNeeds";

const GAME_SPEED = 360;

const oneSecond = 1000; // 1 second = 1000ms
const interval = oneSecond / 4; // Simulation runs every 250ms. This results in 15 ticks per interval (1000 / 4 = 60 / 4)

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

const isSleepTime = (hour: number) => (_: Citizen) => hour < 8 || hour > 20;

const simulate =
    (prev: number, current: number) =>
    (state: AppState): AppState => {
        // const prevTicks = millisecondsToTicks(prev * interval, 1);
        // const currentTicks = millisecondsToTicks(current * interval, 1);

        const prevTicks = prev * GAME_SPEED;
        const currentTicks = current * GAME_SPEED;

        const { minutes, hours, days } = getInGameTime(currentTicks);

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
                when(isSleeping, increaseRest(currentTicks)),
                when(not(isSleeping), decreaseRest(currentTicks)),
                when(and(not(isSleepTime(hours)), isSleeping), wakeUp),
                when(isHungry, eat),
                when(or(isTired, isSleepTime(hours)), sleep),
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
    state: "asleep",
    basicNeeds: {
        food: 100,
        rest: 100,
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
    const currentTick = useRef<number>(0);

    useInterval(() => {
        currentTick.current++;

        const updatedState = simulate(prevTick.current, currentTick.current)(data);

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
            <p>interval: {ticks}</p>
            <p>ticks: {ticks * GAME_SPEED}</p>
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

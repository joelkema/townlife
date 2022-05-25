import { useEffect, useRef, useState } from "react";
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
import useRequestAnimationFrame from "./hooks/useRequestAnimationFrame";

const TICKS_PER_SECOND = 60;

const oneSecond = 1000; // 1 second = 1000ms
const interval = oneSecond / TICKS_PER_SECOND; // 16.6 ms per tick

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

const gameLoop =
    (tick: number) =>
    (state: AppState): AppState => {
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
                // sleep section
                when(and(isSleeping, shouldChangeRest(tick)), increaseRest),
                when(and(not(isSleeping), shouldChangeRest(tick)), decreaseRest),
                when(and(not(isSleepTime(tick)), isSleeping), wakeUp),
                when(or(isTired, isSleepTime(tick)), sleep),

                // eat section
                when(isHungry, eat),
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
        rest: 60,
    },
};

const jan = {
    ...aad,
    id: "2",
    name: "Jan",
    basicNeeds: {
        food: 59,
        rest: 30,
    },
};

const useTownLife = () => {
    const [data, setData] = useState<AppState>({
        citizens: {
            [aad.id]: aad,
            [jan.id]: jan,
        },
        days: 0,
        hours: 0,
        minutes: 0,
    });

    const prevTick = useRef<number>(0);
    const currentTick = useRef<number>(0);

    // useRequestAnimationFrame((timestamp) => {
    //     if (prevTick.current === 0) {
    //         var date = new Date(timestamp);
    //         console.log(date.getTime());
    //         console.log(date);
    //         debugger;
    //     }
    // });

    useInterval(() => {
        currentTick.current++;

        const updatedState = gameLoop(currentTick.current)(data);

        prevTick.current = currentTick.current;

        setData(updatedState);
    }, interval);

    // useInterval(() => {
    //     console.log("A");
    // }, oneTick);

    return { data, ticks: currentTick.current };
};

const update = (context: CanvasRenderingContext2D) => {};

// Box width
var bw = 270;
// Box height
var bh = 180;

const draw = (context: CanvasRenderingContext2D) => {
    context.lineWidth = 10;
    context.strokeStyle = "rgb(2,7,159)";
    for (var x = 0; x < bw; x += 90) {
        for (var y = 0; y < bh; y += 90) {
            context.strokeRect(x + 10, y + 10, 90, 90);
        }
    }
};

// const gameLoop =
//     (context: CanvasRenderingContext2D, lastRender: number) => (timestamp: DOMHighResTimeStamp) => {
//         const elapsed = timestamp - lastRender;

//         var date = new Date(timestamp);
//         console.log(date.getTime());
//         console.log(date);

//         draw(context);

//         draw(context);

//         // Keep requesting new frames
//         window.requestAnimationFrame(gameLoop(context, lastRender));
//     };

// const init = () => {
//     const canvas = document.getElementById("canvas") as HTMLCanvasElement;
//     const context = canvas.getContext("2d");

//     window.requestAnimationFrame(gameLoop(context!, 0));
// };

const App = () => {
    // useEffect(() => {
    //     init();
    // }, []);

    // return (
    //     <>
    //         <canvas id="canvas" width="420px" height="420px"></canvas>
    //     </>
    // );

    const { data, ticks } = useTownLife();

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
                {Object.keys(data.citizens).map((id) => {
                    const { name, state, basicNeeds } = data.citizens[id];

                    return (
                        <tr>
                            <td>{name}</td>
                            <td>{state}</td>
                            <td>{basicNeeds.food}</td>
                            <td>{basicNeeds.rest}</td>
                        </tr>
                    );
                })}

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

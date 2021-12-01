import { ChangeEvent, useEffect, useRef, useState } from "react";
import "./App.css";
import useInterval from "./hooks/useInterval";
import { AppState, Citizen } from "./types";
import { isHungry } from "./citizen/basicNeeds";

import { getDay, getHours, getMinutes, calculateTime } from "./utils/date";
import { when } from "./logic";
import compose from "./logic/compose";

const oneHourTicks = 2500; // ticks
const tickPerSecond = 60;

const oneTick = (1 / 60) * 1000; // one tick is 1/60 of a realtime second
const ticksPerDay = 20000; // (5 1/2 min per day)

const oneHour = 1000; // 1 second
const quarterHour = oneHour / 4;

// 0 = 00:00
// 1 = 00:15
// 5 = 01:15

const calculateSaturation = (currentSaturation: number) =>
    currentSaturation - 0.8 > 0 ? Math.round(currentSaturation - 0.8) : 0;

const decreaseSaturation = (citizen: Citizen): Citizen => ({
    ...citizen,
    basicNeeds: { ...citizen.basicNeeds, food: calculateSaturation(citizen.basicNeeds.food) },
});

const eat = (citizen: Citizen): Citizen => ({ ...citizen, basicNeeds: { ...citizen.basicNeeds, food: 100 } });

// const act = (hour: number, minutes: number) => {};

const tick =
    (prev: Date, current: Date) =>
    (state: AppState): AppState => {
        const day = getDay(current);
        const hour = getHours(current);
        const minute = getMinutes(current);

        const citizens = Object.keys(state.citizens).reduce((map: Record<string, Citizen>, id) => {
            const citizen = compose(when(isHungry, eat), decreaseSaturation)(state.citizens[id]);

            map[id] = citizen;

            return map;
        }, {});

        return { ...state, citizens };
    };

const useTownLife = () => {
    const [data, setData] = useState<AppState>({
        citizens: {
            "1": {
                name: "Aad",
                basicNeeds: {
                    food: 100,
                    rest: 100,
                },
            },
        },
    });

    // // quarter hour
    // const quarterHourRef = useRef<number>(0);

    // useInterval(() => {
    //     const updatedState = tick(calculateTime(quarterHourRef.current), calculateTime(quarterHourRef.current++))(data);

    //     setData(updatedState);
    // }, quarterHour); // Simulation runs every 250ms,

    useInterval(() => {
        console.log("A");
    }, oneTick);

    return [data];
};

const App = () => {
    const [data] = useTownLife();

    console.log(data.citizens["1"].basicNeeds.food);

    return <>{}</>;
};

export default App;

// Everyday:
// Person has basicNeeds: food, water, shelter / sleep.
//

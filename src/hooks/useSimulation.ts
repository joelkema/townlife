import { useState, useRef } from "react";
import townlife from "../townlife";
import { AppState } from "../types";
import useInterval from "./useInterval";

const TICKS_PER_SECOND = 60; // 60fps

const oneSecond = 1000; // 1 second = 1000ms
const getInterval = (gameSpeed = 1) => oneSecond / (TICKS_PER_SECOND * gameSpeed); // 16.6 ms per tick

const useSimulation = (initialState: AppState) => {
    const [data, setData] = useState<AppState>(initialState);
    const prevTick = useRef<number>(0);
    const currentTick = useRef<number>(0);

    useInterval(() => {
        currentTick.current++;

        const updatedState = townlife(data).tick(currentTick.current);

        prevTick.current = currentTick.current;

        setData(updatedState);
    }, getInterval());

    return { data, ticks: currentTick.current };
};

export default useSimulation;

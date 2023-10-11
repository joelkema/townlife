import "./App.css";
import { AppState, Citizen } from "./types";

import { formatTime } from "./utils/gameTime";
import useSimulation from "./hooks/useSimulation";

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

const agents = [
    {
        role: "citizen",
    },
];

const initialState: AppState = {
    citizens: {
        [aad.id]: aad,
        [jan.id]: jan,
    },
    days: 0,
    hours: 0,
    minutes: 0,
    grid: [],
};

const App = () => {
    const { data, ticks } = useSimulation(initialState);

    return (
        <>
            <p>day: {data.days}</p>
            <p>time: {formatTime(data.hours, data.minutes)}</p>
            <p>ticks: {ticks}</p>
            <table>
                <tr>
                    <th>Name</th>
                    <th>State</th>
                    <th style={{ width: 300 }}>Food</th>
                    <th>Rest</th>
                </tr>
                {Object.values(data.citizens).map(({ name, state, basicNeeds: { food, rest } }) => {
                    return (
                        <tr>
                            <td>{name}</td>
                            <td>{state}</td>
                            <td>{food}</td>
                            <td>{rest}</td>
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

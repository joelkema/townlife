type Timing = {
    deltaTime: number;
    previousTime: number;
    fps: number;
    secondsPassed: number;
};

export type AppState = {
    grid: number[][];
    citizens: Record<string, Citizen>;
    days: number;
    hours: number;
    minutes: number;
    months: number;
    timing: Timing;
};

// 80 saturatie per dag =

export type Citizen = {
    id: string;
    name: string;
    state: CitizenState;
    // health: number;
    // age: number;
    // gender: "male" | "female";
    // job;
    // inventory
    // happiness
    basicNeeds: BasicNeeds;
};

type CitizenState = 'awake' | 'asleep';

type Profession = 'foresting' | 'mining' | 'laboror';
// Gatherer;
// Herbalist;
// Stonecutter;
// Vendor;
// Fisherman;
// Teacher;
// Physician;
// Woodcutter;
// Professions;
// Hunting;
// Brewer;
// Fishing;
// Builder;
// Laborers;
// Blacksmith(Profession);
// Herdsman;
// Tailor(Profession);

type BasicNeeds = {
    hunger: number; // saturation
    rest: number;
};

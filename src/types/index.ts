export type AppState = {
    citizens: Record<string, Citizen>;
};

// 80 saturatie per dag =

export type Citizen = {
    name: string;
    // health: number;
    // age: number;
    // gender: "male" | "female";
    // job;
    // inventory
    // happiness
    basicNeeds: BasicNeeds;
};

type Profession = "foresting" | "mining" | "laboror";
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
    food: number; // saturation
    rest: number;
};

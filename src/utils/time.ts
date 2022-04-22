export const ticksPerDay = 2500 * 24;
export const ticksPerHour = 2500; // ticks
export const ticksPerQuarter = 2500 / 4; // 625
export const ticksPerMinute = 2500 / 60; // 41,66667

export const getTime = (ticks: number) => {
    const totalMinutes = Math.floor(ticks / ticksPerMinute);
    const totalHours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    return { minutes, hours, days };
};

export const ticksPerMilliseconds = (milliseconds: number, gameSpeed: number = 1) =>
    ((milliseconds * 60) / 1000) * gameSpeed;

export const ticksPerSecond = (nSeconds: number, gameSpeed: number = 1) =>
    ticksPerMilliseconds(nSeconds * 1000, gameSpeed);

const formatNr = (nr: number) => (nr < 10 ? `0${nr}` : nr);
export const formatTime = (hours: number, minutes: number) =>
    `${formatNr(hours)}:${formatNr(minutes)}`;

// These times are based of: https://rimworldwiki.com/wiki/Time

// real time
export const ticksPerInGameDay = 60000;
export const ticksPerInGameHour = ticksPerInGameDay / 24; //2500

export const getInGameTime = (tick: number, ticksPerSecond: number = 60) => {
    const ticksPerInGameMinute = ticksPerInGameHour / 60;
    const totalMinutes = Math.floor(tick / ticksPerInGameMinute);
    const totalHours = Math.floor(tick / ticksPerInGameHour);

    const minutes = totalMinutes % 60;
    const hours = tickToHours(tick);
    const days = Math.floor(totalHours / 24);

    return { minutes, hours, days };
};

export const tickToHours = (tick: number) => Math.floor(tick / ticksPerInGameHour) % 24;

const formatNr = (nr: number) => (nr < 10 ? `0${nr}` : nr);
export const formatTime = (hours: number, minutes: number) =>
    `${formatNr(hours)}:${formatNr(minutes)}`;

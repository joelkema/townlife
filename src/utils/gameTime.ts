// These times are based of: https://rimworldwiki.com/wiki/Time

// real time
export const aGameDayInSeconds = 1000; // 16.6 minutes
export const ticksPerRealSecond = 60;
export const ticksPerInGameDay = aGameDayInSeconds * ticksPerRealSecond; // 60000

// in game time
export const ticksPerInGameHour = ticksPerInGameDay / 24; //2500
export const ticksPerInGameMinute = ticksPerInGameHour / ticksPerRealSecond; // ~41,66667

export const getInGameTime = (ticks: number) => {
    const totalMinutes = Math.floor(ticks / ticksPerInGameMinute);
    const totalHours = Math.floor(totalMinutes / ticksPerRealSecond);

    const minutes = totalMinutes % 60;
    const hours = totalHours % 24;
    const days = Math.floor(totalHours / 24);

    return { minutes, hours, days };
};

// 250 * 60 / 1000 = 15
export const millisecondsToTicks = (milliseconds: number, gameSpeed: number = 1) =>
    ((milliseconds * 60) / 1000) * gameSpeed;

export const secondsToTicks = (nSeconds: number, gameSpeed: number = 1) =>
    millisecondsToTicks(nSeconds * 1000, gameSpeed);

const formatNr = (nr: number) => (nr < 10 ? `0${nr}` : nr);
export const formatTime = (hours: number, minutes: number) =>
    `${formatNr(hours)}:${formatNr(minutes)}`;

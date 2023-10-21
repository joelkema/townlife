const settings = {
    rimworld: {
        // These times are based of: https://rimworldwiki.com/wiki/Time
        ticksPerInGameDay: 60000,
    },
    dwarfFortress: {
        // https://dwarffortresswiki.org/index.php/DF2014:Time
        ticksPerInGameDay: 1200,
    },
};

// real time
export const ticksPerInGameDay = settings.dwarfFortress.ticksPerInGameDay;
export const ticksPerInGameHour = ticksPerInGameDay / 24; //2500 if 60000 ticks per day

/**
 * Converts a number of ticks to in-game time.
 * @param {number} ticks - The number of ticks to convert.
 * @returns {{minutes: number, hours: number, days: number}} - An object containing the in-game time.
 */
export const getInGameTime = (ticks: number) => {
    const ticksPerInGameMinute = ticksPerInGameHour / 60;
    const totalMinutes = Math.floor(ticks / ticksPerInGameMinute);
    const totalHours = Math.floor(ticks / ticksPerInGameHour);

    const minutes = totalMinutes % 60;
    const hours = tickToHours(ticks);
    const days = Math.floor(totalHours / 24);
    const months = Math.floor(days / 30);

    return { minutes, hours, days, months };
};

/**
 * Converts a number of ticks to in-game days.
 * @param {number} ticks - The number of ticks to convert.
 * @returns {number} - The number of in-game days.
 */
export const tickToHours = (tick: number) =>
    Math.floor(tick / ticksPerInGameHour) % 24;

const formatNr = (nr: number) => (nr < 10 ? `0${nr}` : nr);

/**
 * Formats a time object to a string.
 * @param {{minutes: number, hours: number, days: number}} time - The time object to format.
 * @returns {string} - The formatted time.
 */
export const formatTime = (hours: number, minutes: number) =>
    `${formatNr(hours)}:${formatNr(minutes)}`;

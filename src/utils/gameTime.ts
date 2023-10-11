

const settings = { 
    rimworld: {
        // These times are based of: https://rimworldwiki.com/wiki/Time
        ticksPerInGameDay: 60000,
    },
    dwarfFortress: {
        // https://dwarffortresswiki.org/index.php/DF2014:Time
        ticksPerInGameDay: 1200,
    }
}


// real time
export const ticksPerInGameDay = settings.dwarfFortress.ticksPerInGameDay; 
export const ticksPerInGameHour = ticksPerInGameDay / 24; //2500

export const getInGameTime = (tick: number) => {
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

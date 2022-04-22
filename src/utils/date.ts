export const addMinutes = (minutes: number) =>
    new Date(new Date(1900, 1, 1).getTime() + minutes * 60000);
export const calculateTime = (i: number) => addMinutes(i * 15);

export const getDay = (d: Date) => d.getDay();
export const getHours = (d: Date) => d.getHours();
export const getMinutes = (d: Date) => d.getMinutes();

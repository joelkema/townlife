// export const round = (n: number) => parseFloat(n.toFixed(2));

export const substractPercentage = (amount: number) => (total: number) =>
    total - amount < 0 ? 0 : total - amount;

export const addPercentage = (amount: number) => (total: number) =>
    total + amount > 100 ? 100 : total + amount;

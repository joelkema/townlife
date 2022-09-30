// export const round = (n: number) => parseFloat(n.toFixed(2));

export const substractPercentage = (amount: number) => (p: number) => Math.max(0, p - amount);
export const addPercentage = (amount: number) => (p: number) => Math.min(100, p + amount);

export const getRandomPosition = () => Math.random() < 0.5 ? 'left' : 'right';
export const getRandomWaitTime = (rangeStart: number, rangeEnd: number) => Math.floor(Math.random() * (rangeEnd - rangeStart + 1) + rangeStart) * 1000;
export const responseTime = 1000;


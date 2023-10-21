import { initialState } from './App';
import townlife from './townlife';
import { AppState } from './types';
import { getInGameTime } from './utils/gameTime';

const update = (deltaTime: number) => {
    // Update your game here
    console.log('update', deltaTime);
};

// Box width
const bw = 400;
// Box height
const bh = 400;
// Padding
const p = 10;

// draw a 20x20 grid
const drawGrid = (ctx: CanvasRenderingContext2D) => {
    const gridCellSize = 40;
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;
    const x = 0;
    const y = 0;

    for (let lx = x; lx <= x + width; lx += gridCellSize) {
        ctx.moveTo(lx, y);
        ctx.lineTo(lx, y + height);
    }

    for (let ly = y; ly <= y + height; ly += gridCellSize) {
        ctx.moveTo(x, ly);
        ctx.lineTo(x + width, ly);
    }
    ctx.strokeStyle = 'black';
    ctx.stroke();
};

const render = (ctx: CanvasRenderingContext2D, fps: number) => {
    // Render your game here
    console.log('render', ctx);

    // ctx.fillStyle = 'white';
    // ctx.fillRect(0, 0, 200, 100);
    // ctx.font = '16px Arial';
    // ctx.fillStyle = 'black';
    // ctx.fillText(`FPS: ${fps}`, 10, 30);

    drawGrid(ctx);
};

const tickRate = 1.0 / 60.0; // 60fps

const fpsLimit = 30;

const loop =
    (ctx: CanvasRenderingContext2D, state: AppState): FrameRequestCallback =>
    (timeInMs) => {
        // Compute the delta-time against the previous time
        const deltaTime = timeInMs - state.timing.previousTime;
        const secondsPassed = Math.floor(timeInMs / 1000);

        // const previousSeconds = Math.floor(timing.previousTime / 1000);
        // const seconds = Math.floor(time / 1000);

        const fps = Math.round(1 / secondsPassed);

        // const secondsPassed = deltaTime / 1000;

        const { days, months, hours, minutes } = getInGameTime(
            secondsPassed * 100
        );

        console.log('seconds', secondsPassed);
        console.log(
            `In-game time: ${months} months, ${days} days, ${hours} hours, ${minutes} minutes`
        );

        // const { minutes, hours, days } = getInGameTime(ticks);

        // 12 seconds = 1 in-game day
        const inGameTicks = secondsPassed * 100;

        console.log('inGameTicks', inGameTicks);

        const bloep = townlife(state).tick(inGameTicks);

        console.log('bloep', bloep);
        // console.log('time', time);

        //   console.log(minutes, hours, days);

        // update();

        // Update your game
        // if (delta > tickRate) {
        //   update(tickRate);

        //   delta = delta - tickRate;
        // }

        // Render your game
        render(ctx, fps);

        // Repeat
        window.requestAnimationFrame(
            loop(ctx, {
                ...state,
                days,
                months,
                timing: {
                    deltaTime,
                    previousTime: timeInMs,
                    fps: 0,
                    secondsPassed,
                },
            })
        );
    };

// const config = {
// 	win: {
// 		width: window.innerWidth,
// 		height: window.innerHeight
// 	},
// 	tiles: {
// 		x: Math.ceil(window.innerWidth / 64) + 2,
// 		y: Math.ceil(window.innerHeight / 64) + 2
// 	},
// 	center: {
// 		x: Math.round(window.innerWidth / 64) / 2,
// 		y: Math.round(window.innerHeight / 64) / 2
// 	},
// 	size: {
// 		tile: 64,
// 		char: 96
// 	},
// 	speed: 5
// };

export const startGame = (ctx: CanvasRenderingContext2D) => {
    ctx.canvas.width = window.innerWidth;
    ctx.canvas.height = window.innerHeight;

    // Launch the game loop
    window.requestAnimationFrame(loop(ctx, initialState));
};

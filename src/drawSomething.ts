import { getInGameTime } from "./utils/gameTime";

const update = (deltaTime: number) => {
  // Update your game here
  console.log('update', deltaTime);
}

const render = (ctx: CanvasRenderingContext2D, fps: number) => {
    // Render your game here
    console.log('render', ctx);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, 200, 100);
    ctx.font = '16px Arial';	
    ctx.fillStyle = 'black';
    ctx.fillText(`FPS: ${fps}`, 10, 30);
}


const tickRate = 1.0 / 60.0; // 60fps

const fpsLimit = 30;

type Timing = {
  deltaTime: number;
  previousTime: number;
  fps: number;
  secondsPassed: number;
}

type InGameTime = {
  days: number;
  months: number;
}


const convertToInGameTime = (milliseconds: number): InGameTime => {
  const ticksPerDay = 1200;
  const ticksPerSecond = 100;
  const ticksPerMonth = ticksPerDay * 30;

  const totalSeconds = milliseconds / 1000;
  const totalTicks = totalSeconds * ticksPerSecond;

  const days = Math.floor(totalTicks / ticksPerDay);
  const months = Math.floor(totalTicks / ticksPerMonth);

  return { days, months };
};

const loop = (ctx: CanvasRenderingContext2D, timing: Timing): FrameRequestCallback => (time) => {
   // Compute the delta-time against the previous time
  const deltaTime = time - timing.previousTime;
  const secondsPassed =  Math.floor(time / 1000);

  // const previousSeconds = Math.floor(timing.previousTime / 1000);
  // const seconds = Math.floor(time / 1000);

  // const fps = Math.round(1 / seconds);

  // const secondsPassed = deltaTime / 1000;

  const { days, months } = convertToInGameTime(time);


  console.log('seconds', secondsPassed);
  console.log(`In-game time: ${months} months, ${days} days`);


  // const { minutes, hours, days } = getInGameTime(ticks);

  console.log('options', timing);  
 

// console.log('time', time);

//   console.log(minutes, hours, days);

  // update();


  // Update your game
  // if (delta > tickRate) {
  //   update(tickRate);

  //   delta = delta - tickRate;
  // }

  // Render your game
  render(ctx, 0);

  // Repeat
  window.requestAnimationFrame(loop(ctx, { deltaTime, previousTime: time, fps: 0, secondsPassed }));
}


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
    ctx.fillStyle = 'red';
    ctx.fillRect(0, 0, 100, 100);

    // Launch the game loop
    window.requestAnimationFrame(loop(ctx, { deltaTime: 0, previousTime: 0, fps: 0, timePassed: 0 }));

}
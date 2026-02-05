// "Prompt: One line that may or may not intersect itself."
// Day 25 — continuous noise-guided line that naturally self-intersects

let DESSIN = 50;
let NP = 480;
const CANVAS = 800;

function setup() {
  INIT2(CANVAS);
  noiseSeed(2525);

  // single continuous line guided by Perlin noise
  const startX = CANVAS / 2;
  const startY = CANVAS / 2;
  const stepSize = 3.5;
  const maxSteps = 8000;

  let x = startX;
  let y = startY;
  let angle = random(TWO_PI);

  LPRINT(`M${int(x)},${int(y)}`);

  for (let step = 0; step < maxSteps; step++) {
    // guide angle with 2D Perlin noise
    const noiseVal = noise(x * 0.005, y * 0.005, step * 0.001);
    angle += (noiseVal - 0.5) * 0.4; // steer gently

    // move forward
    const nextX = x + cos(angle) * stepSize;
    const nextY = y + sin(angle) * stepSize;

    // bounce or wrap at canvas edges
    if (nextX < 0 || nextX > CANVAS || nextY < 0 || nextY > CANVAS) {
      // bounce: reflect angle and stay in bounds
      if (nextX < 0 || nextX > CANVAS) angle = PI - angle;
      if (nextY < 0 || nextY > CANVAS) angle = -angle;
      continue;
    }

    x = nextX;
    y = nextY;
    LPRINT(`D${int(x)},${int(y)}`);
  }

  TRACE2();
}

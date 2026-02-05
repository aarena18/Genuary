// "Prompt: Geometric art - pick either a circle, rectangle, or triangle and use only that geometric shape."
// Day 24 — concentric and scattered circles only

let DESSIN = 50;
let NP = 480;
const CANVAS = 800;

function setup() {
  INIT2(CANVAS);
  randomSeed(24);
  noiseSeed(24);

  // choice: circles
  const centerX = CANVAS / 2;
  const centerY = CANVAS / 2;

  // concentric circles (ripple effect)
  for (let r = 10; r < CANVAS / 2; r += 18) {
    drawCircle(centerX, centerY, r);
  }

  // scattered circles with noise-based sizing
  const count = 32;
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * TWO_PI;
    const dist = 80 + noise(i * 0.5) * 120;
    const x = centerX + cos(angle) * dist;
    const y = centerY + sin(angle) * dist;
    const r = 8 + noise(i * 0.3, angle) * 24;
    drawCircle(x, y, r);
  }

  // some random floating circles for variation
  for (let i = 0; i < 12; i++) {
    const x = random(40, CANVAS - 40);
    const y = random(40, CANVAS - 40);
    const r = random(4, 32);
    drawCircle(x, y, r);
  }

  TRACE2();
}

function drawCircle(cx, cy, r) {
  // approximate circle using polygon (many segments)
  const segments = max(8, int(r / 2));
  let first = true;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * TWO_PI;
    const x = cx + r * cos(angle);
    const y = cy + r * sin(angle);
    if (first) {
      LPRINT(`M${int(x)},${int(y)}`);
      first = false;
    } else {
      LPRINT(`D${int(x)},${int(y)}`);
    }
  }
}

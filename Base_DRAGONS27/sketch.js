// "Prompt: Make something interesting with no randomness or noise or trig."
// Day 27 — deterministic spiral and recursive subdivision grid (pure algebra)

let DESSIN = 50;
let NP = 480;
const CANVAS = 800;

function setup() {
  INIT2(CANVAS);

  // square spiral without trigonometry
  drawSquareSpiral(CANVAS / 2, CANVAS / 2, 200, 6);

  // recursive grid subdivision (Mondrian-like)
  subdividRect(40, 40, CANVAS - 80, CANVAS - 80, 5);

  TRACE2();
}

function drawSquareSpiral(startX, startY, maxSize, turns) {
  let x = startX;
  let y = startY;
  let size = maxSize;
  let step = 0;

  // spiral out in squares
  for (let turn = 0; turn < turns; turn++) {
    // right
    for (let i = 0; i < size; i++) {
      LPRINT(`M${int(x)},${int(y)}`);
      x += 2;
      LPRINT(`D${int(x)},${int(y)}`);
    }

    // down
    for (let i = 0; i < size; i++) {
      y += 2;
      LPRINT(`D${int(x)},${int(y)}`);
    }

    // left
    for (let i = 0; i < size; i++) {
      x -= 2;
      LPRINT(`D${int(x)},${int(y)}`);
    }

    // up
    for (let i = 0; i < size; i++) {
      y -= 2;
      LPRINT(`D${int(x)},${int(y)}`);
    }

    size = size * 0.7; // reduce for next iteration
    x -= size / 2;
    y -= size / 2;
  }
}

function subdividRect(x, y, w, h, depth) {
  if (depth <= 0 || w < 8 || h < 8) return;

  // draw rectangle
  LPRINT(`M${int(x)},${int(y)}`);
  LPRINT(`D${int(x + w)},${int(y)}`);
  LPRINT(`D${int(x + w)},${int(y + h)}`);
  LPRINT(`D${int(x)},${int(y + h)}`);
  LPRINT(`D${int(x)},${int(y)}`);

  // subdivide based on rule: split at different ratios
  const splitX = x + w / 3; // golden-ish ratio
  const splitY = y + h / 2.4;

  // vertical line
  LPRINT(`M${int(splitX)},${int(y)}`);
  LPRINT(`D${int(splitX)},${int(y + h)}`);

  // horizontal line
  LPRINT(`M${int(x)},${int(splitY)}`);
  LPRINT(`D${int(x + w)},${int(splitY)}`);

  // recursive subdivisions of quadrants
  subdividRect(x, y, splitX - x, splitY - y, depth - 1);
  subdividRect(splitX, y, x + w - splitX, splitY - y, depth - 1);
  subdividRect(x, splitY, splitX - x, y + h - splitY, depth - 1);
  subdividRect(splitX, splitY, x + w - splitX, y + h - splitY, depth - 1);
}

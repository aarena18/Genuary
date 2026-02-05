// "Prompt: Inspired by brutalism."
// Day 23 — heavy geometric blocks with concrete-like hatching texture

let DESSIN = 50;
let NP = 480;
const CANVAS = 800;

function setup() {
  INIT2(CANVAS);
  randomSeed(777);
  noiseSeed(777);

  // draw brutalist composition: stacked/offset concrete blocks
  const margin = 32;
  const blockMargin = 8;
  const blocks = [];

  // generate random tower-like arrangement
  let x = margin;
  let maxH = 0;

  while (x < CANVAS - margin) {
    const w = int(random(80, 180));
    const h = int(random(140, CANVAS - margin * 2));
    const y = CANVAS - margin - h;

    blocks.push({ x, y, w, h });
    x += w + blockMargin;
    maxH = max(maxH, h);
  }

  // draw each block with hatching for concrete texture
  for (let b of blocks) {
    drawBrutalBlock(b.x, b.y, b.w, b.h);
  }

  // add some connecting horizontal/vertical brutalist lines
  const lineCount = int(random(3, 8));
  for (let i = 0; i < lineCount; i++) {
    const y = CANVAS - margin - int(random(maxH));
    LPRINT(`M${int(margin)},${int(y)}`);
    LPRINT(`D${int(CANVAS - margin)},${int(y)}`);
  }

  TRACE2();
}

function drawBrutalBlock(x, y, w, h) {
  // outline
  LPRINT(`M${int(x)},${int(y)}`);
  LPRINT(`D${int(x + w)},${int(y)}`);
  LPRINT(`D${int(x + w)},${int(y + h)}`);
  LPRINT(`D${int(x)},${int(y + h)}`);
  LPRINT(`D${int(x)},${int(y)}`);

  // internal concrete texture: diagonal and horizontal hatching
  const hatchSpacing = 8 + int(random(4));
  const hatchAngle = random() < 0.5 ? 1 : -1;

  // diagonal hatching
  for (
    let yy = y - w * hatchAngle;
    yy < y + h + w * hatchAngle;
    yy += hatchSpacing
  ) {
    const x1 = x;
    const y1 = yy;
    const x2 = x + w;
    const y2 = yy + w * hatchAngle;

    // clip to block bounds
    const clipped = clipLineToRect(x1, y1, x2, y2, x, y, x + w, y + h);
    if (clipped) {
      LPRINT(`M${int(clipped.x1)},${int(clipped.y1)}`);
      LPRINT(`D${int(clipped.x2)},${int(clipped.y2)}`);
    }
  }

  // horizontal stress lines
  for (let yy = y + 12; yy < y + h; yy += 18) {
    LPRINT(`M${int(x)},${int(yy)}`);
    LPRINT(`D${int(x + w)},${int(yy)}`);
  }
}

function clipLineToRect(x1, y1, x2, y2, rx, ry, rx2, ry2) {
  // simple Cohen-Sutherland-ish clipping
  let p1 = { x: x1, y: y1 };
  let p2 = { x: x2, y: y2 };

  // clip to left/right
  if (p2.x < rx || p1.x > rx2) return null;

  // clip to top/bottom
  if (p2.y < ry || p1.y > ry2) return null;

  // approximate clipping
  p1.x = constrain(p1.x, rx, rx2);
  p1.y = constrain(p1.y, ry, ry2);
  p2.x = constrain(p2.x, rx, rx2);
  p2.y = constrain(p2.y, ry, ry2);

  return { x1: p1.x, y1: p1.y, x2: p2.x, y2: p2.y };
}

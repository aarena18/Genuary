// DRAGONS
// "Prompt: Create a collision detection system (no libraries allowed)."
// Day 21 — simple AABB collision detector, outputs shapes via LPRINT/TRACE2

let DESSIN = 50;
let NP = 480;

function setup() {
  // canvas height; INIT2 uses init_(NP, H)
  INIT2(800);
  randomSeed(1234);

  const count = 26;
  const margin = 24;
  const objs = [];

  // generate random axis-aligned rectangles
  for (let i = 0; i < count; i++) {
    const w = int(random(30, 100));
    const h = int(random(24, 120));
    const x = int(random(margin, NP - margin - w));
    const y = int(random(margin, NP - margin - h));
    objs.push({ x, y, w, h, id: i, colliding: false });
  }

  // naive O(n^2) collision detection (AABB)
  for (let i = 0; i < objs.length; i++) {
    for (let j = i + 1; j < objs.length; j++) {
      if (aabbCollide(objs[i], objs[j])) {
        objs[i].colliding = true;
        objs[j].colliding = true;
      }
    }
  }

  // draw all rectangles; mark collisions with an X inside
  for (let o of objs) {
    drawRect(o.x, o.y, o.w, o.h);
    if (o.colliding) drawCollisionMark(o.x, o.y, o.w, o.h);
  }

  // debug: draw bounding-grid
  drawGrid(8);

  TRACE2();
}

function aabbCollide(a, b) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}

function drawRect(x, y, w, h) {
  LPRINT(`M${int(x)},${int(y)}`);
  LPRINT(`D${int(x + w)},${int(y)}`);
  LPRINT(`D${int(x + w)},${int(y + h)}`);
  LPRINT(`D${int(x)},${int(y + h)}`);
  LPRINT(`D${int(x)},${int(y)}`);
}

function drawCollisionMark(x, y, w, h) {
  // draw an X inside the rectangle
  const pad = 6;
  LPRINT(`M${int(x + pad)},${int(y + pad)}`);
  LPRINT(`D${int(x + w - pad)},${int(y + h - pad)}`);
  LPRINT(`M${int(x + w - pad)},${int(y + pad)}`);
  LPRINT(`D${int(x + pad)},${int(y + h - pad)}`);
}

function drawGrid(steps) {
  for (let i = 0; i <= steps; i++) {
    const gx = int((NP / steps) * i);
    const gy = int((NP / steps) * i);
    // vertical
    LPRINT(`M${gx},0`);
    LPRINT(`D${gx},${NP}`);
    // horizontal
    LPRINT(`M0,${gy}`);
    LPRINT(`D${NP},${gy}`);
  }
}

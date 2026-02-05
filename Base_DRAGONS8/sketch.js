// DRAGONS
//"Prompt: Draw one million of something." Exactly one million ellipses/arcs are being drawn to the canvas in different colors and transparancy values.
//Day 8
// ----------------------------------------------------
let DESSIN = 50; // [50,51,52]

// ----------------------------------------------------
let NP = 480,
  PI = Math.PI;

// ----------------------------------------------------
let N = 6;
if (DESSIN == 51) N = 10;
else if (DESSIN == 52) N = 14;

// ----------------------------------------------------
let A = Array(N);
for (let I = 0; I <= N; I++) A[I] = 0;
let X0 = NP / 3,
  Y0 = NP / 2,
  A0 = (-PI / 4) * (N - 2),
  L0 = NP / Math.pow(Math.sqrt(2), N);
let X1 = X0,
  Y1 = Y0,
  X2 = X0,
  Y2 = Y0;
// Draw one million of something — batched to avoid freezing
let TOTAL_SHAPES = 1000000;
let drawn = 0;
let PER_FRAME = 15000; // shapes drawn per frame (tunable)

function setup() {
  INIT2(800);
  background_("#faf8f2");
  noStroke();
  randomSeed(DESSIN * 9876);
}

function draw() {
  for (let i = 0; i < PER_FRAME && drawn < TOTAL_SHAPES; i++) {
    let x = random(width);
    let y = random(height);
    let w = random(1, 14);
    let h = random(1, 14);
    let a = random(TWO_PI);
    let alpha = random(6, 200);
    let r = int(random(30, 255));
    let g = int(random(30, 255));
    let b = int(random(30, 255));
    fill(r, g, b, alpha);
    if (random() < 0.65) ellipse(x, y, w, h);
    else arc(x, y, w * 1.2, h * 1.2, a, a + random(PI / 8, PI));
    drawn++;
  }
  if (drawn >= TOTAL_SHAPES) {
    noLoop();
  }
}

function GOSUB() {
  /* kept for compatibility */
}

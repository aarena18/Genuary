// DRAGONS
//"Prompt: Op Art"
//Day 19
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

// ----------------------------------------------------
function setup() {
  // Op Art — moiré and interference lines
  createCanvas(800, 800);
  pixelDensity(1);
  background(255);
  strokeCap(SQUARE);
  noFill();
}

// ----------------------------------------------------
function GOSUB() {
  ((X0 = X1),
    (Y0 = Y1),
    (X1 = X2),
    (Y1 = Y2),
    (X2 = X2 + L0 * cos(A0)),
    (Y2 = Y2 + L0 * sin(A0)));
}

// ----------------- Op Art animation -----------------
function draw() {
  background(255);
  translate(width / 2, height / 2);

  // rotating line grids
  let t = frameCount * 0.004;
  let rotA = sin(t) * 0.08;
  let rotB = cos(t * 1.3) * 0.06;

  push();
  rotate(rotA);
  stroke(0);
  strokeWeight(1);
  let gap = 8;
  for (let x = -width; x <= width; x += gap) line(x, -height, x, height);
  pop();

  push();
  rotate(rotB + PI / 2);
  stroke(0);
  strokeWeight(1);
  for (let x = -width; x <= width; x += gap) line(x, -height, x, height);
  pop();

  // concentric rings — every other ring drawn to create interference
  strokeWeight(1);
  for (let r = 6; r < max(width, height); r += 6) {
    if ((r / 6) % 2 == int((frameCount * 0.02) % 2)) continue;
    ellipse(0, 0, r, r);
  }

  // subtle moving mask to create waviness
  push();
  blendMode(BLEND);
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < 12; i++) {
    let a = t * 0.6 + (i * TWO_PI) / 12;
    let rr = 20 + 260 * (0.5 + 0.5 * sin(a));
    arc(0, 0, rr, rr, a, a + 0.4);
  }
  pop();
}

function keyPressed() {
  if (key == " ") saveCanvas("opart", "png");
}

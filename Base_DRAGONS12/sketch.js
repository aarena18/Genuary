// DRAGONS
//"Prompt: Subdivision." - Progressive fractal subdivision with morphing levels
// Day 12
let DESSIN = 50; // [50,51,52]
let NP = 480;
let PI2 = Math.PI;
let maxSubdivision = 12;
let subdivision = 1;
let drawProgress = 0;

function setup() {
  INIT2(800);
  background_("#0a0a0a");
}

function draw() {
  background_("rgba(10,10,10,0.15)"); // motion trail

  push();
  translate(width / 2, height / 2);
  rotate(frameCount * 0.0015);

  let N = subdivision;
  let steps = Math.pow(2, N) - 1;
  let L0 = NP / Math.pow(Math.sqrt(2), N);

  let A = new Array(N + 1).fill(0);

  let X0 = -NP / 4;
  let Y0 = 0;
  let A0 = (-PI2 / 4) * (N - 2);

  let X1 = X0,
    Y1 = Y0;
  let X2 = X0,
    Y2 = Y0;

  stroke_(`hsl(${180 + subdivision * 15}, 85%, ${55 + N * 3}%)`);
  strokeWeight(1.5 - N * 0.08);

  beginShape_();
  vertex_(X0, Y0);

  let maxSteps = int(steps * drawProgress);

  for (let I = 0; I <= maxSteps; I++) {
    if (I !== 0) {
      let II = I,
        J = 0;
      while (II % 2 === 0) {
        II /= 2;
        J++;
      }
      let AA = ((A[N - J] * 2 - 1) * ((((II - 1) / 2) % 2) * 2 - 1) * PI2) / 2;
      A0 += AA;
    }

    X0 = X1;
    Y0 = Y1;
    X1 = X2;
    Y1 = Y2;
    X2 += L0 * cos(A0);
    Y2 += L0 * sin(A0);
    vertex_(X2, Y2);
  }

  endShape_();

  // Draw subdivision indicator
  fill_(255, 255, 255, 0.8);
  stroke_("rgba(255,255,255,0.3)");
  strokeWeight(0.5);
  let labelX = NP * 0.6;
  let labelY = -NP * 0.6;
  for (let i = 1; i <= N; i++) {
    let sz = 8 - i;
    ellipse(labelX + i * 12, labelY, sz, sz);
  }

  pop();

  drawProgress += 0.012;

  if (drawProgress >= 1) {
    drawProgress = 0;
    subdivision++;
    if (subdivision > maxSubdivision) subdivision = 1;
  }
}

function GOSUB() {
  /* retained */
}

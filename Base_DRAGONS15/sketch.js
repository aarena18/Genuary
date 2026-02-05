// DRAGONS
//"Prompt: Design a rug with the initial sketch" Dragon curve rug pattern
// Day 15
let DESSIN = 50; // [50,51,52]
let NP = 480,
  PI = Math.PI;

function setup() {
  INIT2(800);
  background_(255, 250, 240); // off-white rug base

  // Rug border
  stroke_(180, 100, 60);
  strokeWeight(8);
  noFill();
  rect(40, 40, width - 80, height - 80);

  rect(55, 55, width - 110, height - 110);
  stroke_(160, 80, 40);
  strokeWeight(2);
  rect(65, 65, width - 130, height - 130);

  // Center decorative dragon pattern
  drawRugPattern();

  // Corner decorations
  drawCornerPattern(80, 80, 0);
  drawCornerPattern(width - 80, 80, PI / 2);
  drawCornerPattern(width - 80, height - 80, PI);
  drawCornerPattern(80, height - 80, (3 * PI) / 2);
}

function drawRugPattern() {
  // 4-fold symmetrical dragon curves
  let cx = width / 2,
    cy = height / 2;
  let scale = 0.6;

  for (let rot = 0; rot < TWO_PI; rot += PI / 2) {
    push();
    translate(cx, cy);
    rotate(rot);
    drawDragonCurve(6, NP * scale * 0.5, 200, 150, "#8B4513", 2);
    pop();
  }

  // Central mandala
  stroke_(180, 100, 60);
  strokeWeight(2);
  for (let r = 20; r < 100; r += 15) {
    noFill();
    ellipse(cx, cy, r, r);
  }
}

function drawCornerPattern(x, y, angle) {
  push();
  translate(x, y);
  rotate(angle);

  stroke_(200, 130, 80);
  strokeWeight(1.5);
  noFill();

  // Small dragon curve in corner
  drawDragonCurve(4, NP * 0.2, -30, 0, "#CD853F", 1.5);

  pop();
}

function drawDragonCurve(N, L0, offsetX, offsetY, col, wt) {
  let A = Array(N);
  for (let I = 0; I <= N; I++) A[I] = 0;

  let X0 = offsetX,
    Y0 = offsetY;
  let A0 = (-PI / 4) * (N - 2);
  let X1 = X0,
    Y1 = Y0;
  let X2 = X0,
    Y2 = Y0;

  stroke_(col);
  strokeWeight(wt);
  noFill();

  beginShape();
  vertex(X0, Y0);

  let NN = Math.pow(2, N) - 1;
  for (let I = 0; I <= NN; I++) {
    if (I !== 0) {
      let II = I,
        J = 0;
      while (II % 2 === 0) {
        II = II / 2;
        J = J + 1;
      }
      let AA = ((A[N - J] * 2 - 1) * ((((II - 1) / 2) % 2) * 2 - 1) * PI) / 2;
      A0 = A0 + AA;
    }

    X0 = X1;
    Y0 = Y1;
    X1 = X2;
    Y1 = Y2;
    X2 = X2 + L0 * cos(A0);
    Y2 = Y2 + L0 * sin(A0);

    vertex(X2, Y2);
  }
  endShape();
}

function draw() {
  noLoop();
}

function GOSUB() {
  /* retained */
}

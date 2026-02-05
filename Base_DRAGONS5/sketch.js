// DRAGONS
// Day 5
//Prompt: Isometric Art - (No vanishing points).
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

// isometric projection (no vanishing point)
function projectIso(px, py) {
  // center and scale for pleasant composition
  let cx = NP / 2,
    cy = NP * 0.18;
  let sx = (px - py) * 0.7 + cx;
  let sy = (px + py) * 0.35 + cy;
  return [int(sx), int(sy)];
}

// ----------------------------------------------------
function setup() {
  INIT2(800);

  LPRINT(`M${int(X0)},${int(Y0)}`);
  let NN = Math.pow(2, N) - 1;
  for (let I = 0; I <= NN; I++) {
    if (I == 0) GOSUB();
    else {
      let II = I,
        J = 0;
      while (II % 2 == 0) {
        II = II / 2;
        J = J + 1;
      }
      let AA = ((A[N - J] * 2 - 1) * ((((II - 1) / 2) % 2) * 2 - 1) * PI) / 2;
      A0 = A0 + AA;
      GOSUB();
    }
    let xa = (X0 + 3 * X1) / 4,
      ya = (Y0 + 3 * Y1) / 4;
    let xb = (X2 + 3 * X1) / 4,
      yb = (Y2 + 3 * Y1) / 4;
    let pa = projectIso(xa, ya),
      pb = projectIso(xb, yb);
    LPRINT(`D${pa[0]},${pa[1]}`);
    LPRINT(`D${pb[0]},${pb[1]}`);
  }

  TRACE2();
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

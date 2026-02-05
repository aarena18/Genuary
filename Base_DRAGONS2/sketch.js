// DRAGONS
// JAN. 2. (Genuary Challenge)
//Layers upon layers upon layers
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
  INIT2(800);

  // Generate layered composition: repeated draws with small transforms
  function generatePath(x0, y0, a0, l0, n) {
    let out = "";
    let X0_ = x0,
      Y0_ = y0,
      X1_ = x0,
      Y1_ = y0,
      X2_ = x0,
      Y2_ = y0;
    out += `M${int(X0_)},${int(Y0_)}`;
    let NN = Math.pow(2, n) - 1;
    for (let I = 0; I <= NN; I++) {
      if (I == 0) {
        // GOSUB
        X0_ = X1_;
        Y0_ = Y1_;
        X1_ = X2_;
        Y1_ = Y2_;
        X2_ = X2_ + l0 * cos(a0);
        Y2_ = Y2_ + l0 * sin(a0);
      } else {
        let II = I,
          J = 0;
        while (II % 2 == 0) {
          II = II / 2;
          J = J + 1;
        }
        let AA = ((0 * 2 - 1) * ((((II - 1) / 2) % 2) * 2 - 1) * PI) / 2;
        a0 = a0 + AA;
        // GOSUB
        X0_ = X1_;
        Y0_ = Y1_;
        X1_ = X2_;
        Y1_ = Y2_;
        X2_ = X2_ + l0 * cos(a0);
        Y2_ = Y2_ + l0 * sin(a0);
      }
      out += `D${int((X0_ + 3 * X1_) / 4)},${int((Y0_ + 3 * Y1_) / 4)}`;
      out += `D${int((X2_ + 3 * X1_) / 4)},${int((Y2_ + 3 * Y1_) / 4)}`;
    }
    return out;
  }

  // Parameters for layers
  let LAYERS = 8;
  for (let L = 0; L < LAYERS; L++) {
    let scale = Math.pow(0.9, L);
    let dx = L * 6;
    let dy = L * 4;
    let angleOffset = L * 0.06;
    let l0 = L0 * scale;
    let a0 = A0 + angleOffset;
    let x0 = X0 + dx;
    let y0 = Y0 + dy;

    OUTPUT = generatePath(x0, y0, a0, l0, N);

    // progressive translucent strokes for 'layers upon layers'
    let alpha = Math.min(0.9, 0.12 + L * 0.11);
    let col = `rgba(0,0,0,${alpha})`;
    stroke_(col);
    if (typeof strokeWeight === "function") strokeWeight(1);

    TRACE2();
  }
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

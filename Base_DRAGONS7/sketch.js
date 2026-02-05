// DRAGONS
// Day 7
//"Prompt: Use software that is not intended to create art or images." I populated random numbers in a Google spreadsheet, added conditional formatting and created the composition by resizing cells and rows.
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
// Prompt: Use software not intended for art — emulate spreadsheet cells
// We create a grid of variable-sized 'cells' colored by random values
function setup() {
  INIT2(800);
  noStroke();
  background_("#fafafa");

  // grid size (like rows/cols in a sheet)
  let cols = 24,
    rows = 32;

  // random seed based on DESSIN for reproducibility
  randomSeed(DESSIN * 12345);

  // variable column widths and row heights to emulate manual resizing
  let colW = Array(cols)
    .fill(0)
    .map(() => int(random(12, 48)));
  let rowH = Array(rows)
    .fill(0)
    .map(() => int(random(10, 42)));

  // cumulative positions
  let cx = [0];
  for (let c = 0; c < cols; c++) cx.push(cx[c] + colW[c]);
  let ry = [0];
  for (let r = 0; r < rows; r++) ry.push(ry[r] + rowH[r]);

  // generate values and draw cells with conditional formatting
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let v = random();
      // conditional formatting palette
      let col;
      if (v > 0.85) col = color(255, 80, 60, 220);
      else if (v > 0.6) col = color(255, 200, 80, 200);
      else if (v > 0.35) col = color(120, 200, 160, 190);
      else col = color(40, 60, 120, 180);

      fill(col);
      let x = cx[c] + 20; // left padding
      let y = ry[r] + 20; // top padding
      rect(x, y, colW[c], rowH[r]);

      // subtle grid line to mimic spreadsheets
      stroke(0, 0, 0, 30);
      strokeWeight(0.6);
      noFill();
      rect(x, y, colW[c], rowH[r]);
      noStroke();
    }
  }

  // title block using primitive text-like rectangle
  fill(20);
  rect(18, 6, 200, 28);
  fill(255);
  textSize(14);
  text("SPREADSHEET PALETTE", 26, 26);
}

function GOSUB() {
  /* retained for compatibility */
}

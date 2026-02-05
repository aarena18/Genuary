// DRAGONS
//"Prompt: The textile design patterns of public transport seating." Not so inspired the interiors per se but inspired by public transport maps.
//Day 9
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
// Transit textile + map motif: colored network lines with repeated upholstery tiles
function setup() {
  INIT2(800);
  background_("#f4f6f8");
  noStroke();
  randomSeed(DESSIN * 2024);

  // palette inspired by transit maps and upholstery
  let palette = [
    "#D7263D",
    "#0B6E4F",
    "#F4A261",
    "#2A9D8F",
    "#264653",
    "#E9C46A",
  ];

  // subtle fabric noise (small dots)
  for (let y = 0; y < NP; y += 10) {
    for (let x = 0; x < NP; x += 10) {
      let v = noise(x * 0.01, y * 0.01);
      fill(230 - v * 20, 230 - v * 18, 235, 70);
      ellipse(x + random(-2, 2), y + random(-2, 2), 3 + v * 3, 3 + v * 3);
    }
  }

  // draw transit-map like lines (thick colored curves)
  strokeWeight(10);
  for (let i = 0; i < palette.length; i++) {
    stroke(palette[i]);
    noFill();
    beginShape_();
    for (let x = 20; x <= NP - 20; x += 6) {
      let y =
        NP * 0.18 + Math.sin((x / NP) * PI * 2 + i * 0.9) * NP * 0.12 + i * 8;
      vertex_(x, y);
    }
    endShape_();
  }

  // add junction dots (stations)
  for (let s = 0; s < 30; s++) {
    let x = random(40, NP - 40);
    let lineIdx = int(random(palette.length));
    let y =
      NP * 0.18 +
      Math.sin((x / NP) * PI * 2 + lineIdx * 0.9) * NP * 0.12 +
      lineIdx * 8;
    noStroke();
    fill("#ffffff");
    ellipse(x, y, 14, 14);
    fill(palette[lineIdx]);
    ellipse(x, y, 8, 8);
  }

  // upholstery tiles: repeating geometric motifs in lower half
  let cols = 10,
    rows = 6;
  let w = NP / cols,
    h = NP / rows;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let cx = c * w + w * 0.5 + random(-6, 6);
      let cy = NP * 0.55 + r * h + h * 0.5 + random(-6, 6);
      let p = palette[(c + r) % palette.length];
      fill(p);
      ellipse(cx, cy, w * 0.45, h * 0.45);
      fill(255, 140);
      ellipse(cx + w * 0.14, cy - h * 0.08, w * 0.12, h * 0.12);
      fill(0, 30);
      ellipse(cx - w * 0.18, cy + h * 0.18, 3, 3);
    }
  }
}

function GOSUB() {
  /* retained for compatibility */
}

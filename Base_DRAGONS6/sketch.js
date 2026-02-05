// DRAGONS
//Day 6
//Prompt: Make a landscape using only primitive shapes.' Tried to create some glowing hills with TRIANGLE_STRIPS with a simple circle as a 'sun', resulting in a 'Primitive Landscape
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
// primitive landscape: glowing hills (triangle strips) + simple sun
// ----------------------------------------------------
function setup() {
  INIT2(800);
  background_("#071322");
  noStroke();
  // sun: concentric circles for glow
  let sx = NP * 0.78,
    sy = NP * 0.22;
  for (let r = 80; r > 0; r -= 8) {
    let a = map(r, 80, 0, 0.08, 0.45);
    fill(255, 200, 80, a * 255);
    ellipse(sx, sy, r * 2, r * 2);
  }
  // glowing layered hills using TRIANGLE_STRIP
  let layers = 4;
  for (let L = 0; L < layers; L++) {
    let amp = 40 + L * 28;
    let base = NP * 0.6 + L * 26;
    let phase = L * 0.9;
    let g = 200 - L * 28;
    fill(g, 120 + L * 20, 80 + L * 8, 220);
    beginShape_(TRIANGLE_STRIP);
    for (let x = 0; x <= NP; x += 12) {
      let y = base + Math.sin((x / NP) * PI * 3 + phase) * amp;
      vertex_(x, y);
      vertex_(x, NP);
    }
    endShape_();
  }
  // simple foreground triangles as primitives
  fill(30, 30, 40, 230);
  for (let i = 0; i < 6; i++)
    triangle(
      random(NP),
      NP - 40 - random(20),
      random(NP),
      NP,
      random(NP),
      NP - 10 - random(30),
    );
}

function GOSUB() {
  // unused in this sketch but left for compatibility
}

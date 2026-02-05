// DRAGONS
// "Prompt: Gradients only."
// Day 22 — draw gradients only using native p5 fill/rect after INIT2

let DESSIN = 50;
let NP = 480;
const CANVAS = 800;

function setup() {
  // INIT2 sets up canvas via init_(NP, H)
  INIT2(CANVAS);
  colorMode(HSB, 360, 100, 100, 1);
  noStroke();

  // choose two palettes and interpolate
  const palettes = [
    [color(220, 60, 90), color(260, 80, 30)],
    [color(30, 90, 95), color(200, 70, 60)],
    [color(10, 80, 95), color(50, 80, 40)],
    [color(160, 60, 95), color(200, 90, 40)],
  ];
  const p = palettes[int(random(palettes.length))];

  // create layered gradients — vertical, radial and diagonal strips — but
  // keep only fills (no stroke) so the output is gradients-only.

  // vertical linear gradient
  for (let y = 0; y < CANVAS; y++) {
    const t = y / (CANVAS - 1);
    const c = lerpColor(p[0], p[1], t);
    fill(hue(c), saturation(c), brightness(c));
    rect(0, y, CANVAS, 1);
  }

  // add soft radial overlay (multiply-like effect via transparency)
  const cx = CANVAS * (0.3 + random() * 0.4);
  const cy = CANVAS * (0.3 + random() * 0.4);
  const maxR = CANVAS * (0.3 + random() * 0.5);
  for (let r = int(maxR); r > 0; r--) {
    const t = r / maxR;
    const col = lerpColor(p[1], p[0], 1 - t);
    fill(hue(col), saturation(col), brightness(col), map(t, 0, 1, 0, 0.06));
    ellipse(cx, cy, r * 2, r * 2);
  }

  // subtle diagonal banding (very low alpha)
  push();
  translate(0, 0);
  rotate(-PI / 8 + (random() - 0.5) * 0.2);
  const bandH = 24;
  for (let y = -CANVAS; y < CANVAS * 2; y += bandH) {
    const t = (y + CANVAS) / (CANVAS * 3);
    const col = lerpColor(p[0], p[1], constrain(t, 0, 1));
    fill(hue(col), saturation(col), brightness(col), 0.03);
    rect(-CANVAS, y, CANVAS * 3, bandH);
  }
  pop();

  console.log("Base_DRAGONS22: gradients drawn");
}

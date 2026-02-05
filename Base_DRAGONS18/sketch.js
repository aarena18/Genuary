// DRAGONS
//"Prompt: What does wind look like?"
//Day 18
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
  // Evolving wind visualization
  createCanvas(800, 800);
  colorMode(HSB, 360, 100, 100, 1);
  background(220);

  // Particles initialisation
  PARTICLES = [];
  const NUM = 1200;
  for (let i = 0; i < NUM; i++) {
    let p = {
      x: random(width * 0.1, width * 0.9),
      y: random(height * 0.1, height * 0.9),
      px: null,
      py: null,
      hue: random(190, 260),
      life: random(80, 400),
    };
    p.px = p.x;
    p.py = p.y;
    PARTICLES.push(p);
  }

  noiseDetail(4, 0.5);
  t0 = 0;
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

// ------------------ evolving draw ------------------
let PARTICLES = [];
let t0 = 0;
function draw() {
  // subtle fade for trails
  noStroke();
  fill(220, 220, 220, 0.04);
  rect(0, 0, width, height);

  t0 += 0.003;
  strokeWeight(1);

  for (let p of PARTICLES) {
    // age and respawn
    p.life -= 1;
    if (
      p.life <= 0 ||
      p.x < -50 ||
      p.x > width + 50 ||
      p.y < -50 ||
      p.y > height + 50
    ) {
      p.x = random(width * 0.05, width * 0.95);
      p.y = random(height * 0.05, height * 0.95);
      p.px = p.x;
      p.py = p.y;
      p.life = random(120, 420);
    }

    // sample noise field as wind vector
    let s = 0.0025;
    let angle = noise(p.x * s, p.y * s, t0) * TWO_PI * 2.0; // swirl
    let speed = map(
      noise(p.x * s * 1.3, p.y * s * 1.1, t0 + 10),
      0,
      1,
      0.2,
      2.2,
    );

    p.px = p.x;
    p.py = p.y;
    p.x += cos(angle) * speed;
    p.y += sin(angle) * speed;

    // color mapped to local divergence (approx)
    let hue =
      (p.hue + map(noise(p.x * s * 2, p.y * s * 2, t0 + 5), 0, 1, -30, 30)) %
      360;
    stroke(hue, 60, 60, 0.9);

    line(p.px, p.py, p.x, p.y);
  }
}

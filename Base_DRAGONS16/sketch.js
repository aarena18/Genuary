// DRAGONS - Generative palette with dragon curves (Day 16)
let palette = [];
let baseHue = 0;

function setup() {
  createCanvas(800, 800);
  background(20, 20, 30);

  // Generate random hue and palette
  baseHue = random(360);
  generatePalette();

  // Draw color swatches
  drawSwatches();

  // Draw test shapes
  testDrawing();

  noLoop();
}

function generatePalette() {
  palette = [];
  let sat = random(40, 90);
  let light = random(35, 65);

  palette.push(`hsl(${baseHue}, ${sat}%, ${light}%)`);
  palette.push(`hsl(${(baseHue + 180) % 360}, ${sat}%, ${light}%)`);
  palette.push(`hsl(${(baseHue + 30) % 360}, ${sat + 15}%, ${light + 10}%)`);
  palette.push(
    `hsl(${(baseHue - 30 + 360) % 360}, ${sat + 15}%, ${light + 10}%)`,
  );
  palette.push(`hsl(${(baseHue + 120) % 360}, ${sat}%, ${light}%)`);
  palette.push(`hsl(${(baseHue + 240) % 360}, ${sat}%, ${light}%)`);
  palette.push(`hsl(${baseHue}, ${sat}%, ${light - 20}%)`);
  palette.push(`hsl(${baseHue}, ${sat}%, ${light + 20}%)`);
}

function drawSwatches() {
  let w = 800 / palette.length;
  for (let i = 0; i < palette.length; i++) {
    fill(palette[i]);
    stroke(200);
    strokeWeight(1);
    rect(i * w, 0, w, 60);
  }
}

function testDrawing() {
  // Draw colored circles to test
  fill(palette[0]);
  noStroke();
  circle(150, 200, 60);

  fill(palette[1]);
  circle(300, 200, 60);

  fill(palette[2]);
  circle(450, 200, 60);

  // Draw simple dragon curve
  stroke(palette[3]);
  strokeWeight(2);
  noFill();
  drawSimpleDragon(100, 350);
}

function drawSimpleDragon(startX, startY) {
  let points = generateDragonPoints(5, 80, startX, startY);

  beginShape();
  for (let p of points) {
    vertex(p.x, p.y);
  }
  endShape();
}

function generateDragonPoints(N, L0, ox, oy) {
  let points = [];
  let A = new Array(N + 1).fill(0);
  let PI = Math.PI;

  let X0 = ox,
    Y0 = oy;
  let A0 = (-PI / 4) * (N - 2);
  let X1 = X0,
    Y1 = Y0;
  let X2 = X0,
    Y2 = Y0;

  points.push({ x: X0, y: Y0 });

  let NN = Math.pow(2, N) - 1;
  for (let I = 0; I <= NN; I++) {
    if (I !== 0) {
      let II = I,
        J = 0;
      while (II % 2 === 0) {
        II /= 2;
        J++;
      }
      let AA = ((A[N - J] * 2 - 1) * ((((II - 1) / 2) % 2) * 2 - 1) * PI) / 2;
      A0 += AA;
    }
    X0 = X1;
    Y0 = Y1;
    X1 = X2;
    Y1 = Y2;
    X2 += L0 * cos(A0);
    Y2 += L0 * sin(A0);
    points.push({ x: X2, y: Y2 });
  }

  return points;
}

function draw() {}

function generatePalette() {
  palette = [];
  let sat = random(40, 90);
  let light = random(35, 65);

  palette.push(`hsl(${baseHue}, ${sat}%, ${light}%)`);
  palette.push(`hsl(${(baseHue + 180) % 360}, ${sat}%, ${light}%)`);
  palette.push(`hsl(${(baseHue + 30) % 360}, ${sat + 15}%, ${light + 10}%)`);
  palette.push(
    `hsl(${(baseHue - 30 + 360) % 360}, ${sat + 15}%, ${light + 10}%)`,
  );
  palette.push(`hsl(${(baseHue + 120) % 360}, ${sat}%, ${light}%)`);
  palette.push(`hsl(${(baseHue + 240) % 360}, ${sat}%, ${light}%)`);
  palette.push(`hsl(${baseHue}, ${sat}%, ${light - 20}%)`);
  palette.push(`hsl(${baseHue}, ${sat}%, ${light + 20}%)`);
}

function drawPaletteSwatches() {
  let w = 800 / palette.length;
  for (let i = 0; i < palette.length; i++) {
    fill(palette[i]);
    stroke(255);
    strokeWeight(2);
    rect(i * w, 0, w, 60);
  }
}

function drawDragonWithPalette() {
  // Draw 3 small dragons
  for (let it = 0; it < 3; it++) {
    let N = 5 + it;
    let x = 100 + it * 30;
    let y = 100 + it * 60;
    drawDragon(N, 480 * 0.15, x, y, palette[it % palette.length], 2 - it * 0.3);
  }

  // Draw large centered dragons
  push();
  translate(400, 400);
  for (let layer = 0; layer < 4; layer++) {
    let N = 6 - layer;
    drawDragon(
      N,
      480 * 0.25,
      -480 * 0.12,
      -480 * 0.12,
      palette[layer % palette.length],
      1.5 - layer * 0.3,
    );
  }
  pop();
}

function drawDragon(N, L0, ox, oy, col, wt) {
  let A = new Array(N + 1).fill(0);
  let PI = Math.PI;
  let X0 = ox,
    Y0 = oy;
  let A0 = (-PI / 4) * (N - 2);
  let X1 = X0,
    Y1 = Y0,
    X2 = X0,
    Y2 = Y0;

  stroke(col);
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
        II /= 2;
        J++;
      }
      let AA = ((A[N - J] * 2 - 1) * ((((II - 1) / 2) % 2) * 2 - 1) * PI) / 2;
      A0 += AA;
    }
    X0 = X1;
    Y0 = Y1;
    X1 = X2;
    Y1 = Y2;
    X2 += L0 * cos(A0);
    Y2 += L0 * sin(A0);
    vertex(X2, Y2);
  }
  endShape();
}

function draw() {
  // Generate palette
  baseHue = random(360);
  generatePalette();

  // Draw swatches
  drawPaletteSwatches();

  // Draw dragons
  drawDragonWithPalette();
}

function generatePalette() {
  palette = [];
  let sat = random(40, 90);
  let light = random(35, 65);

  palette.push(color(`hsl(${baseHue}, ${sat}%, ${light}%)`));
  palette.push(color(`hsl(${(baseHue + 180) % 360}, ${sat}%, ${light}%)`));
  palette.push(
    color(`hsl(${(baseHue + 30) % 360}, ${sat + 15}%, ${light + 10}%)`),
  );
  palette.push(
    color(`hsl(${(baseHue - 30 + 360) % 360}, ${sat + 15}%, ${light + 10}%)`),
  );
  palette.push(color(`hsl(${(baseHue + 120) % 360}, ${sat}%, ${light}%)`));
  palette.push(color(`hsl(${(baseHue + 240) % 360}, ${sat}%, ${light}%)`));
  palette.push(color(`hsl(${baseHue}, ${sat}%, ${light - 20}%)`));
  palette.push(color(`hsl(${baseHue}, ${sat}%, ${light + 20}%)`));
}

function drawPaletteSwatches() {
  let w = 800 / palette.length;
  for (let i = 0; i < palette.length; i++) {
    fill(palette[i]);
    stroke(255);
    strokeWeight(2);
    rect(i * w, 0, w, 60);
  }
}

function drawDragonWithPalette() {
  // Draw 3 small dragons
  for (let it = 0; it < 3; it++) {
    let N = 5 + it;
    let x = 100 + it * 30;
    let y = 100 + it * 60;
    drawDragon(N, NP * 0.15, x, y, palette[it % palette.length], 2 - it * 0.3);
  }

  // Draw large centered dragons
  push();
  translate(400, 400);
  for (let layer = 0; layer < 4; layer++) {
    let N = 6 - layer;
    drawDragon(
      N,
      NP * 0.25,
      -NP * 0.12,
      -NP * 0.12,
      palette[layer % palette.length],
      1.5 - layer * 0.3,
    );
  }
  pop();
}

function drawDragon(N, L0, ox, oy, col, wt) {
  let A = new Array(N + 1).fill(0);
  let X0 = ox,
    Y0 = oy;
  let A0 = (-PI / 4) * (N - 2);
  let X1 = X0,
    Y1 = Y0,
    X2 = X0,
    Y2 = Y0;

  stroke(col);
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
        II /= 2;
        J++;
      }
      let AA = ((A[N - J] * 2 - 1) * ((((II - 1) / 2) % 2) * 2 - 1) * PI) / 2;
      A0 += AA;
    }
    X0 = X1;
    Y0 = Y1;
    X1 = X2;
    Y1 = Y2;
    X2 += L0 * cos(A0);
    Y2 += L0 * sin(A0);
    vertex(X2, Y2);
  }
  endShape();
}

function draw() {
  noLoop();
}

function GOSUB() {
  // Generate base hue from time/seed
  baseHue = random(360);

  // Generate complementary color palette
  generatePalette();

  // Draw palette swatches at top
  drawPaletteSwatches();

  // Draw dragon curves with palette colors
  drawDragonWithPalette();
}

function generatePalette() {
  palette = [];
  let saturation = random(40, 90);
  let lightness = random(35, 65);

  // Complementary scheme (180° apart)
  palette.push(color(`hsl(${baseHue}, ${saturation}%, ${lightness}%)`));
  palette.push(
    color(`hsl(${(baseHue + 180) % 360}, ${saturation}%, ${lightness}%)`),
  );

  // Analogous colors (30° apart)
  palette.push(
    color(
      `hsl(${(baseHue + 30) % 360}, ${saturation + 15}%, ${lightness + 10}%)`,
    ),
  );
  palette.push(
    color(
      `hsl(${(baseHue - 30 + 360) % 360}, ${saturation + 15}%, ${lightness + 10}%)`,
    ),
  );

  // Triadic (120° apart)
  palette.push(
    color(`hsl(${(baseHue + 120) % 360}, ${saturation}%, ${lightness}%)`),
  );
  palette.push(
    color(`hsl(${(baseHue + 240) % 360}, ${saturation}%, ${lightness}%)`),
  );

  // Shades for variety
  palette.push(color(`hsl(${baseHue}, ${saturation}%, ${lightness - 20}%)`));
  palette.push(color(`hsl(${baseHue}, ${saturation}%, ${lightness + 20}%)`));
}

function drawPaletteSwatches() {
  let swatchWidth = width / palette.length;
  let swatchHeight = 60;

  for (let i = 0; i < palette.length; i++) {
    fill(palette[i]);
    stroke(255);
    strokeWeight(1);
    rect(i * swatchWidth, 0, swatchWidth, swatchHeight);
  }
}

function drawDragonWithPalette() {
  // Draw multiple overlapping dragon curves with different colors
  let startY = 100;
  let colorIdx = 0;

  for (let iteration = 0; iteration < 3; iteration++) {
    let N = 5 + iteration;
    let offsetX = 100 + iteration * 30;
    let offsetY = startY + iteration * 60;

    drawDragonCurve(
      N,
      NP * 0.15,
      offsetX,
      offsetY,
      palette[colorIdx % palette.length],
      2 - iteration * 0.3,
    );
    colorIdx++;
  }

  // Large centered dragon with gradient effect
  push();
  translate(width / 2, height / 2);

  for (let layer = 0; layer < 4; layer++) {
    let N = 6 - layer;
    let c = palette[layer % palette.length];
    drawDragonCurve(N, NP * 0.25, -NP * 0.12, -NP * 0.12, c, 1.5 - layer * 0.3);
  }

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

  stroke(col);
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

function generatePalette() {
  palette = [];
  let saturation = random(40, 90);
  let lightness = random(35, 65);

  // Complementary scheme (180° apart)
  palette.push(color(`hsl(${baseHue}, ${saturation}%, ${lightness}%)`));
  palette.push(
    color(`hsl(${(baseHue + 180) % 360}, ${saturation}%, ${lightness}%)`),
  );

  // Analogous colors (30° apart)
  palette.push(
    color(
      `hsl(${(baseHue + 30) % 360}, ${saturation + 15}%, ${lightness + 10}%)`,
    ),
  );
  palette.push(
    color(
      `hsl(${(baseHue - 30 + 360) % 360}, ${saturation + 15}%, ${lightness + 10}%)`,
    ),
  );

  // Triadic (120° apart)
  palette.push(
    color(`hsl(${(baseHue + 120) % 360}, ${saturation}%, ${lightness}%)`),
  );
  palette.push(
    color(`hsl(${(baseHue + 240) % 360}, ${saturation}%, ${lightness}%)`),
  );

  // Shades for variety
  palette.push(color(`hsl(${baseHue}, ${saturation}%, ${lightness - 20}%)`));
  palette.push(color(`hsl(${baseHue}, ${saturation}%, ${lightness + 20}%)`));
}

function drawPaletteSwatches() {
  let swatchWidth = width / palette.length;
  let swatchHeight = 60;

  for (let i = 0; i < palette.length; i++) {
    fill(palette[i]);
    stroke(255);
    strokeWeight(1);
    rect(i * swatchWidth, 0, swatchWidth, swatchHeight);
  }
}

function drawDragonWithPalette() {
  // Draw multiple overlapping dragon curves with different colors
  let startY = 100;
  let colorIdx = 0;

  for (let iteration = 0; iteration < 3; iteration++) {
    let N = 5 + iteration;
    let offsetX = 100 + iteration * 30;
    let offsetY = startY + iteration * 60;

    drawDragonCurve(
      N,
      NP * 0.15,
      offsetX,
      offsetY,
      palette[colorIdx % palette.length],
      2 - iteration * 0.3,
    );
    colorIdx++;
  }

  // Large centered dragon with gradient effect
  push();
  translate(width / 2, height / 2);

  for (let layer = 0; layer < 4; layer++) {
    let N = 6 - layer;
    let c = palette[(baseHue + layer * 45) % palette.length];
    drawDragonCurve(N, NP * 0.25, -NP * 0.12, -NP * 0.12, c, 1.5 - layer * 0.3);
  }

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

  stroke(col);
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

// DRAGONS
//"Prompt: Pure black and white. No gray." Halftone pattern with variable dot sizes
//Day 14
let DESSIN = 50; // [50,51,52]
let NP = 480;

function setup() {
  INIT2(800);

  // Clear to white
  fill(255);
  stroke(255);
  rect(0, 0, width, height);

  // Create halftone grid with larger cells
  let gridSize = 14;
  let cols = floor(width / gridSize);
  let rows = floor(height / gridSize);

  fill(0);
  noStroke();

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let cx = col * gridSize + gridSize / 2;
      let cy = row * gridSize + gridSize / 2;

      // Create value based on multiple sine waves
      let val = 0.5;
      val += 0.25 * sin(col * 0.15) * cos(row * 0.12);
      val += 0.15 * sin((col + row) * 0.08) * sin((col - row) * 0.1);
      val += 0.1 * sin(sqrt(col * col + row * row) * 0.07);
      val = max(0.15, min(0.95, val));

      // Map value to dot size
      let dotRadius = val * gridSize * 0.5;

      ellipse(cx, cy, dotRadius * 2, dotRadius * 2);
    }
  }
}

function draw() {
  noLoop();
}

function GOSUB() {
  /* retained */
}

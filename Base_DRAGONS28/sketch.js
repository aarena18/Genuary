// "Prompt: Infinite Scroll."
// Day 28 — layered repeating patterns suggesting continuous scrolling

let DESSIN = 50;
let NP = 480;
const CANVAS = 800;

function setup() {
  INIT2(CANVAS);

  // infinite scroll: multiple layers of repeating patterns
  // each layer scrolls at different speed (mathematically offset)

  const layerCount = 6;
  const margin = 40;

  for (let layer = 0; layer < layerCount; layer++) {
    const speed = 1 + layer * 0.3; // each layer "moves" faster
    const offset = (layer * 40) % CANVAS; // create motion illusion
    const scale = 1 - layer * 0.08; // shrink as we go back

    drawScrollLayer(
      margin,
      margin + layer * (CANVAS / layerCount),
      CANVAS - 2 * margin,
      CANVAS / layerCount - 8,
      offset,
      scale,
      layer,
    );
  }

  // add vertical separator lines to emphasize infinite nature
  for (let y = margin; y < CANVAS - margin; y += CANVAS / layerCount) {
    LPRINT(`M${int(margin)},${int(y)}`);
    LPRINT(`D${int(CANVAS - margin)},${int(y)}`);
  }

  TRACE2();
}

function drawScrollLayer(x, y, w, h, offset, scale, layerIdx) {
  const cellW = 40 * scale;
  const cellH = h * 0.7;

  // repeating cell pattern
  let posX = x + offset;

  while (posX < x + w + cellW) {
    const cellX = posX;
    const cellY = y;

    // cell border
    LPRINT(`M${int(cellX)},${int(cellY)}`);
    LPRINT(`D${int(cellX + cellW)},${int(cellY)}`);
    LPRINT(`D${int(cellX + cellW)},${int(cellY + cellH)}`);
    LPRINT(`D${int(cellX)},${int(cellY + cellH)}`);
    LPRINT(`D${int(cellX)},${int(cellY)}`);

    // internal pattern based on layer
    const divs = 2 + layerIdx;
    for (let i = 1; i < divs; i++) {
      const lineX = cellX + (cellW / divs) * i;
      LPRINT(`M${int(lineX)},${int(cellY)}`);
      LPRINT(`D${int(lineX)},${int(cellY + cellH)}`);
    }

    posX += cellW;
  }

  // diagonal motion lines for scrolling effect
  const lineSpacing = 12 * scale;
  let diagX = x - offset;

  while (diagX < x + w + 50) {
    LPRINT(`M${int(diagX)},${int(y)}`);
    LPRINT(`D${int(diagX + 20 * scale)},${int(y + h)}`);
    diagX += lineSpacing;
  }
}

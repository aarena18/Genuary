// "Prompt: Grid-based graphic design."
// Day 29 — minimalist grid composition with geometric fills

let DESSIN = 50;
let NP = 480;
const CANVAS = 800;

function setup() {
  INIT2(CANVAS);

  const cols = 6;
  const rows = 6;
  const margin = 80;
  const cellW = (CANVAS - 2 * margin) / cols;
  const cellH = (CANVAS - 2 * margin) / rows;

  // draw grid framework
  drawGrid(margin, margin, cellW, cellH, cols, rows);

  // fill selected cells with patterns
  const pattern = [
    [1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1],
    [1, 0, 2, 2, 0, 1],
    [0, 1, 2, 2, 1, 0],
    [1, 0, 0, 1, 0, 1],
    [0, 1, 1, 0, 1, 0],
  ];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = margin + c * cellW;
      const y = margin + r * cellH;
      const fillType = pattern[r][c];

      if (fillType === 1) {
        fillCellDiagonal(x, y, cellW, cellH);
      } else if (fillType === 2) {
        fillCellCross(x, y, cellW, cellH);
      }
    }
  }

  // add accent lines
  const accentY = margin + 2.5 * cellH;
  LPRINT(`M${int(margin)},${int(accentY)}`);
  LPRINT(`D${int(CANVAS - margin)},${int(accentY)}`);

  const accentX = margin + 3 * cellW;
  LPRINT(`M${int(accentX)},${int(margin)}`);
  LPRINT(`D${int(accentX)},${int(CANVAS - margin)}`);

  TRACE2();
}

function drawGrid(startX, startY, cellW, cellH, cols, rows) {
  // vertical lines
  for (let c = 0; c <= cols; c++) {
    const x = startX + c * cellW;
    LPRINT(`M${int(x)},${int(startY)}`);
    LPRINT(`D${int(x)},${int(startY + rows * cellH)}`);
  }

  // horizontal lines
  for (let r = 0; r <= rows; r++) {
    const y = startY + r * cellH;
    LPRINT(`M${int(startX)},${int(y)}`);
    LPRINT(`D${int(startX + cols * cellW)},${int(y)}`);
  }
}

function fillCellDiagonal(x, y, w, h) {
  // diagonal hatching
  const spacing = 6;
  for (let i = -h; i < w + h; i += spacing) {
    const x1 = x + i;
    const y1 = y;
    const x2 = x + i + h;
    const y2 = y + h;

    // clip to cell bounds
    const p1 = clipPoint(x1, y1, x, y, x + w, y + h);
    const p2 = clipPoint(x2, y2, x, y, x + w, y + h);

    if (p1 && p2) {
      LPRINT(`M${int(p1.x)},${int(p1.y)}`);
      LPRINT(`D${int(p2.x)},${int(p2.y)}`);
    }
  }
}

function fillCellCross(x, y, w, h) {
  const spacing = 5;

  // vertical lines
  for (let xx = x + spacing; xx < x + w; xx += spacing) {
    LPRINT(`M${int(xx)},${int(y)}`);
    LPRINT(`D${int(xx)},${int(y + h)}`);
  }

  // horizontal lines
  for (let yy = y + spacing; yy < y + h; yy += spacing) {
    LPRINT(`M${int(x)},${int(yy)}`);
    LPRINT(`D${int(x + w)},${int(yy)}`);
  }
}

function clipPoint(px, py, x1, y1, x2, y2) {
  // simple point clipping to rectangle bounds
  if (px >= x1 && px <= x2 && py >= y1 && py <= y2) {
    return { x: px, y: py };
  }

  // linear interpolation clip
  if (px < x1) {
    const t = (x1 - px) / (x2 - px || 1);
    return { x: x1, y: py + t * 20 };
  }
  if (px > x2) {
    const t = (px - x2) / (px - x1 || 1);
    return { x: x2, y: py + t * 20 };
  }
  if (py < y1) {
    return { x: px, y: y1 };
  }
  if (py > y2) {
    return { x: px, y: y2 };
  }

  return null;
}

// DRAGONS
//"Prompt: Generative Architecture."
//Day 20
// ----------------------------------------------------
// Generative Architecture
// Day 20 — procedural blocks/towers with roofs and windows

let DESSIN = 50;
let CANVAS = 800;
let NP = CANVAS;

function setup() {
  INIT2(CANVAS);
  randomSeed(42);
  noiseSeed(42);
  // debug test rectangle to verify TRACE drawing
  LPRINT(`M${int(CANVAS * 0.25)},${int(CANVAS * 0.25)}`);
  LPRINT(`D${int(CANVAS * 0.75)},${int(CANVAS * 0.25)}`);
  LPRINT(`D${int(CANVAS * 0.75)},${int(CANVAS * 0.75)}`);
  LPRINT(`D${int(CANVAS * 0.25)},${int(CANVAS * 0.75)}`);
  LPRINT(`D${int(CANVAS * 0.25)},${int(CANVAS * 0.25)}`);
  console.log(
    "Base_DRAGONS20: debug rectangle queued, OUTPUT length before generation:",
    OUTPUT.length,
  );

  const cols = 6;
  const rows = 4;
  const margin = 40;
  const cellW = (CANVAS - 2 * margin) / cols;
  const cellH = (CANVAS - 2 * margin) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = margin + c * cellW;
      const y = margin + r * cellH;

      // base building footprint
      const w = cellW * (0.5 + noise(c * 0.3, r * 0.3) * 0.7);
      const maxH = cellH * (0.45 + noise(c * 0.6, r * 0.6) * 1.2);
      const floors = int(2 + noise(c * 0.8, r * 0.8) * 5);
      const floorH = maxH / max(1, floors);

      // build stacked floors
      for (let f = 0; f < floors; f++) {
        const bx = x + (cellW - w) / 2 + (noise(c, f) - 0.5) * 6;
        const by = y + cellH - (f + 1) * floorH;
        const bh = floorH * (0.9 + (noise(c * 1.2, f * 0.7) - 0.5) * 0.2);
        drawBlock(bx, by, w, bh);
        // add windows grid
        const wx = int(1 + noise(c + f * 0.1) * 3);
        const wy = int(1 + noise(f + c * 0.2) * 2);
        drawWindows(bx, by, w, bh, wx, wy);
      }

      // rooftop feature
      const roofY = y + cellH - maxH - 6;
      drawRoof(x + cellW / 2, roofY, w * 1.05, maxH * 0.15);
    }
  }

  // occasional sky-bridges between adjacent towers
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols - 1; c++) {
      if (random() < 0.35) {
        const x1 = margin + c * cellW + cellW * 0.8;
        const x2 = margin + (c + 1) * cellW + cellW * 0.2;
        const yh = margin + r * cellH + cellH * (0.35 + noise(c, r) * 0.3);
        drawBridge(x1, yh, x2, yh);
      }
    }
  }

  TRACE2();
}

function drawBlock(x, y, w, h) {
  LPRINT(`M${int(x)},${int(y + h)}`);
  LPRINT(`D${int(x + w)},${int(y + h)}`);
  LPRINT(`D${int(x + w)},${int(y)}`);
  LPRINT(`D${int(x)},${int(y)}`);
  LPRINT(`D${int(x)},${int(y + h)}`);
}

function drawRoof(cx, ty, w, h) {
  const half = w / 2;
  const leftX = int(cx - half);
  const rightX = int(cx + half);
  const baseY = int(ty);
  const peakY = int(ty - h);
  LPRINT(`M${leftX},${baseY}`);
  LPRINT(`D${int(cx - half / 4)},${baseY}`);
  LPRINT(`D${int(cx)},${peakY}`);
  LPRINT(`D${int(cx + half / 4)},${baseY}`);
  LPRINT(`D${rightX},${baseY}`);
}

function drawWindows(x, y, w, h, cols, rows) {
  const padX = w * 0.12;
  const padY = h * 0.12;
  const ww = (w - padX * 2) / max(1, cols);
  const wh = (h - padY * 2) / max(1, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const wx = x + padX + i * ww + ww * 0.12;
      const wy = y + padY + j * wh + wh * 0.12;
      const wwi = int(max(2, ww * 0.6));
      const whi = int(max(2, wh * 0.6));
      LPRINT(`M${int(wx)},${int(wy)}`);
      LPRINT(`D${int(wx + wwi)},${int(wy)}`);
      LPRINT(`D${int(wx + wwi)},${int(wy + whi)}`);
      LPRINT(`D${int(wx)},${int(wy + whi)}`);
      LPRINT(`D${int(wx)},${int(wy)}`);
    }
  }
}

function drawBridge(x1, y1, x2, y2) {
  LPRINT(`M${int(x1)},${int(y1)}`);
  LPRINT(`D${int(x2)},${int(y2)}`);
}

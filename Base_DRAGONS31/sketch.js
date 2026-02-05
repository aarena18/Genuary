// "Prompt: Pixel-sorting."
// Day 31 — glitch art effect simulating pixel-sorting by brightness/position

let DESSIN = 50;
let NP = 480;
const CANVAS = 800;

function setup() {
  INIT2(CANVAS);
  randomSeed(31);
  noiseSeed(31);

  // create vertical pixel-sort "columns" based on noise
  const columnWidth = 8;
  const cols = int(CANVAS / columnWidth);

  for (let col = 0; col < cols; col++) {
    const x = col * columnWidth;
    const threshold = noise(col * 0.05) * CANVAS; // threshold for sorting

    // draw sorted pixels in this column
    drawSortedColumn(x, 0, columnWidth, CANVAS, threshold);
  }

  // add horizontal glitch stripes
  const stripeCount = 5 + int(random(4));
  for (let s = 0; s < stripeCount; s++) {
    const y = random(CANVAS);
    const stripeH = 4 + random(12);
    const shiftAmount = random(40, 200);

    drawHorizontalShift(0, y, CANVAS, stripeH, shiftAmount);
  }

  // overlay some vertical displacement bands
  for (let i = 0; i < 3; i++) {
    const bandX = random(CANVAS);
    const bandW = random(30, 80);
    const displacement = random(20, 60);

    drawDisplacementBand(bandX, 0, bandW, CANVAS, displacement);
  }

  TRACE2();
}

function drawSortedColumn(x, y, w, h, threshold) {
  // simulate pixel sorting by dividing column into sorted regions
  const regionH = 12;
  let regions = [];

  for (let i = 0; i < h; i += regionH) {
    const startY = y + i;
    const endY = min(y + i + regionH, y + h);
    regions.push({ y: startY, h: endY - startY });
  }

  // draw regions with gradient effect (sorted appearance)
  for (let r of regions) {
    const brightness = noise(x * 0.01, r.y * 0.01);

    if (brightness > 0.5) {
      // bright region: draw as dashed lines
      for (let yy = r.y; yy < r.y + r.h; yy += 3) {
        LPRINT(`M${int(x)},${int(yy)}`);
        LPRINT(`D${int(x + w)},${int(yy)}`);
      }
    } else {
      // dark region: draw solid
      LPRINT(`M${int(x)},${int(r.y)}`);
      LPRINT(`D${int(x + w)},${int(r.y)}`);
      LPRINT(`D${int(x + w)},${int(r.y + r.h)}`);
      LPRINT(`D${int(x)},${int(r.y + r.h)}`);
      LPRINT(`D${int(x)},${int(r.y)}`);
    }
  }
}

function drawHorizontalShift(x, y, w, h, shiftAmount) {
  // horizontal glitch stripe with offset segmentation
  const segmentW = 20 + int(random(30));
  let posX = x;

  while (posX < x + w) {
    const segW = min(segmentW, x + w - posX);
    const shiftOffset = (random() - 0.5) * shiftAmount;

    // draw offset rectangle
    LPRINT(`M${int(posX + shiftOffset)},${int(y)}`);
    LPRINT(`D${int(posX + segW + shiftOffset)},${int(y)}`);
    LPRINT(`D${int(posX + segW + shiftOffset)},${int(y + h)}`);
    LPRINT(`D${int(posX + shiftOffset)},${int(y + h)}`);
    LPRINT(`D${int(posX + shiftOffset)},${int(y)}`);

    posX += segW;
  }
}

function drawDisplacementBand(x, y, w, h, displacement) {
  // vertical band that creates visual displacement/sorting effect
  const lineSpacing = 4;

  for (let yy = y; yy < y + h; yy += lineSpacing) {
    const distFromCenter = abs(x + w / 2 - (x + w / 2));
    const offset = displacement * (1 - distFromCenter / (w / 2));

    LPRINT(`M${int(x)},${int(yy)}`);
    LPRINT(`D${int(x + w + offset * sin(yy * 0.01))},${int(yy)}`);
  }

  // frame the band
  LPRINT(`M${int(x)},${int(y)}`);
  LPRINT(`D${int(x + w)},${int(y)}`);
  LPRINT(`D${int(x + w)},${int(y + h)}`);
  LPRINT(`D${int(x)},${int(y + h)}`);
  LPRINT(`D${int(x)},${int(y)}`);
}

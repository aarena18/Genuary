// "Prompt: Abstract map."
// Day 30 — stylized cartographic composition with continents, rivers, and cities

let DESSIN = 50;
let NP = 480;
const CANVAS = 800;

function setup() {
  INIT2(CANVAS);
  randomSeed(30);
  noiseSeed(30);

  const margin = 60;
  const w = CANVAS - 2 * margin;
  const h = CANVAS - 2 * margin;

  // background coastline (landmass boundary)
  drawLandmass(margin, margin, w, h);

  // rivers flowing across
  drawRivers(margin, margin, w, h);

  // mountain ranges (hatched areas)
  drawMountains(margin, margin, w, h);

  // cities/settlements (dots)
  drawCities(margin, margin, w, h);

  // border frame
  LPRINT(`M${int(margin)},${int(margin)}`);
  LPRINT(`D${int(margin + w)},${int(margin)}`);
  LPRINT(`D${int(margin + w)},${int(margin + h)}`);
  LPRINT(`D${int(margin)},${int(margin + h)}`);
  LPRINT(`D${int(margin)},${int(margin)}`);

  TRACE2();
}

function drawLandmass(x, y, w, h) {
  // organic coastline using Perlin noise
  const resolution = 20;
  const amplitude = 24;

  let prevX = x;
  let prevY = y;
  let first = true;

  // top coast
  for (let i = 0; i <= w; i += resolution) {
    const noiseVal = noise(i * 0.008) - 0.5;
    const coastY = y + noiseVal * amplitude;
    if (first) {
      LPRINT(`M${int(x + i)},${int(coastY)}`);
      first = false;
    } else {
      LPRINT(`D${int(x + i)},${int(coastY)}`);
    }
    prevY = coastY;
  }

  // right coast
  for (let i = 0; i <= h; i += resolution) {
    const noiseVal = noise(1 + i * 0.008) - 0.5;
    const coastX = x + w + noiseVal * amplitude;
    LPRINT(`D${int(coastX)},${int(y + i)}`);
  }

  // bottom coast
  for (let i = w; i >= 0; i -= resolution) {
    const noiseVal = noise(2 + i * 0.008) - 0.5;
    const coastY = y + h + noiseVal * amplitude;
    LPRINT(`D${int(x + i)},${int(coastY)}`);
  }

  // left coast
  for (let i = h; i >= 0; i -= resolution) {
    const noiseVal = noise(3 + i * 0.008) - 0.5;
    const coastX = x + noiseVal * amplitude;
    LPRINT(`D${int(coastX)},${int(y + i)}`);
  }

  LPRINT(`D${int(x)},${int(y)}`);
}

function drawRivers(x, y, w, h) {
  // 2-3 major rivers flowing from north to south
  const riverCount = 2 + int(random(2));

  for (let r = 0; r < riverCount; r++) {
    const startX = x + (w / (riverCount + 1)) * (r + 1);
    const startY = y;
    let px = startX;
    let py = startY;

    LPRINT(`M${int(px)},${int(py)}`);

    for (let step = 0; step < h; step += 8) {
      const bend = noise(px * 0.01, py * 0.01) - 0.5;
      px += bend * 8;
      py += 8;

      // constrain to bounds
      px = constrain(px, x, x + w);

      LPRINT(`D${int(px)},${int(py)}`);
    }
  }
}

function drawMountains(x, y, w, h) {
  // hatched mountain regions
  const mountainCount = 3 + int(random(2));

  for (let m = 0; m < mountainCount; m++) {
    const mx = x + random(w);
    const my = y + random(h);
    const mw = 60 + random(80);
    const mh = 40 + random(60);

    // hatching for mountains
    const spacing = 4;
    for (let xx = mx - mw; xx < mx + mw; xx += spacing) {
      const yy1 = my - abs(xx - mx) * 0.5;
      const yy2 = my + abs(xx - mx) * 0.5;

      if (yy1 >= y && yy1 <= y + h && yy2 >= y && yy2 <= y + h) {
        LPRINT(`M${int(xx)},${int(yy1)}`);
        LPRINT(`D${int(xx)},${int(yy2)}`);
      }
    }
  }
}

function drawCities(x, y, w, h) {
  // scattered city markers (small dots)
  const cityCount = 8 + int(random(6));

  for (let c = 0; c < cityCount; c++) {
    const cx = x + random(w);
    const cy = y + random(h);
    const cityRadius = 3 + int(random(4));

    // approximate circle as small polygon
    const segments = 6;
    let first = true;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * TWO_PI;
      const px = cx + cityRadius * cos(angle);
      const py = cy + cityRadius * sin(angle);

      if (first) {
        LPRINT(`M${int(px)},${int(py)}`);
        first = false;
      } else {
        LPRINT(`D${int(px)},${int(py)}`);
      }
    }
  }
}

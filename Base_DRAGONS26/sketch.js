// "Prompt: Symmetry."
// Day 26 — kaleidoscopic pattern with 8-fold rotational symmetry

let DESSIN = 50;
let NP = 480;
const CANVAS = 800;

function setup() {
  INIT2(CANVAS);
  randomSeed(26);
  noiseSeed(26);

  const centerX = CANVAS / 2;
  const centerY = CANVAS / 2;
  const symmetryCount = 8;

  // generate one wedge pattern
  const wedge = generateWedge(centerX, centerY, CANVAS * 0.35);

  // replicate with rotational symmetry
  for (let i = 0; i < symmetryCount; i++) {
    const angle = (i / symmetryCount) * TWO_PI;
    drawWedgeRotated(wedge, centerX, centerY, angle);
  }

  // add concentric circles for centering
  for (let r = 12; r < 60; r += 8) {
    drawCircleApprox(centerX, centerY, r);
  }

  TRACE2();
}

function generateWedge(cx, cy, maxR) {
  // create a wedge pattern from center with branches
  const points = [];
  const rayCount = 5 + int(random(3));

  for (let ray = 0; ray < rayCount; ray++) {
    const rayAngle = (ray / rayCount) * (PI / 4); // quarter circle
    const length = maxR * (0.4 + noise(ray * 0.3) * 0.6);

    let x = cx;
    let y = cy;
    const steps = int(length / 4);

    for (let step = 0; step < steps; step++) {
      const dist = (step / steps) * length;
      const wobble = noise(step * 0.1, ray * 0.5) * 0.3;
      const angle = rayAngle + wobble;

      const nextX = cx + dist * cos(angle);
      const nextY = cy - dist * sin(angle); // flip y

      points.push({ x: nextX, y: nextY });
      x = nextX;
      y = nextY;
    }
  }

  return points;
}

function drawWedgeRotated(points, cx, cy, rotationAngle) {
  if (points.length === 0) return;

  let first = true;
  for (let p of points) {
    // rotate point around center
    const dx = p.x - cx;
    const dy = p.y - cy;
    const rotX = cx + dx * cos(rotationAngle) - dy * sin(rotationAngle);
    const rotY = cy + dx * sin(rotationAngle) + dy * cos(rotationAngle);

    if (first) {
      LPRINT(`M${int(rotX)},${int(rotY)}`);
      first = false;
    } else {
      LPRINT(`D${int(rotX)},${int(rotY)}`);
    }
  }

  // mirror wedge for additional symmetry
  first = true;
  for (let i = points.length - 1; i >= 0; i--) {
    const p = points[i];
    // mirror across the ray axis
    const dx = p.x - cx;
    const dy = p.y - cy;
    const mirrorX = cx + dx * cos(-2 * (PI / 8)) - dy * sin(-2 * (PI / 8));
    const mirrorY = cy + dx * sin(-2 * (PI / 8)) + dy * cos(-2 * (PI / 8));

    // then rotate
    const rotX =
      cx +
      (mirrorX - cx) * cos(rotationAngle) -
      (mirrorY - cy) * sin(rotationAngle);
    const rotY =
      cy +
      (mirrorX - cx) * sin(rotationAngle) +
      (mirrorY - cy) * cos(rotationAngle);

    if (first) {
      LPRINT(`M${int(rotX)},${int(rotY)}`);
      first = false;
    } else {
      LPRINT(`D${int(rotX)},${int(rotY)}`);
    }
  }
}

function drawCircleApprox(cx, cy, r) {
  const segments = max(8, int(r / 2));
  let first = true;
  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * TWO_PI;
    const x = cx + r * cos(angle);
    const y = cy + r * sin(angle);
    if (first) {
      LPRINT(`M${int(x)},${int(y)}`);
      first = false;
    } else {
      LPRINT(`D${int(x)},${int(y)}`);
    }
  }
}

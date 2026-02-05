// DRAGONS - ACTUAL DRAGON WITH VERTICAL & HORIZONTAL LINES ONLY
// JAN. 1. (Genuary Challenge)
// Vertical or horizontal lines only.

// HELPER FUNCTION FOR ORTHOGONAL LINES
function drawLine(x1, y1, x2, y2) {
  if (x1 === x2) {
    // Vertical line
    LPRINT(`D${int(x2)},${int(y2)}`);
  } else if (y1 === y2) {
    // Horizontal line
    LPRINT(`D${int(x2)},${int(y2)}`);
  } else {
    // Draw orthogonal path (horizontal then vertical)
    LPRINT(`D${int(x2)},${int(y1)}`);
    LPRINT(`D${int(x2)},${int(y2)}`);
  }
}

// HELPER FUNCTION FOR MOVING
function moveTo(x, y) {
  LPRINT(`M${int(x)},${int(y)}`);
}

// HELPER FUNCTION TO DRAW DRAGON PARTS WITH ORTHOGONAL LINES
function drawDragonPart(startX, startY, width, height, partType) {
  let x = startX,
    y = startY;

  moveTo(x, y);

  switch (partType) {
    case "head": // Dragon head
      LPRINT(`D${int(x + width)},${int(y)}`);
      LPRINT(`D${int(x + width)},${int(y + height)}`);
      LPRINT(`D${int(x)},${int(y + height)}`);
      LPRINT(`D${int(x)},${int(y)}`);
      // Eye
      moveTo(x + width * 0.65, y + height * 0.4);
      LPRINT(`D${int(x + width * 0.8)},${int(y + height * 0.4)}`);
      LPRINT(`D${int(x + width * 0.8)},${int(y + height * 0.55)}`);
      LPRINT(`D${int(x + width * 0.65)},${int(y + height * 0.55)}`);
      LPRINT(`D${int(x + width * 0.65)},${int(y + height * 0.4)}`);
      break;

    case "jaw": // Lower jaw
      moveTo(x, y);
      LPRINT(`D${int(x + width * 0.7)},${int(y)}`);
      LPRINT(`D${int(x + width * 0.7)},${int(y + height * 0.3)}`);
      LPRINT(`D${int(x + width)},${int(y + height * 0.3)}`);
      LPRINT(`D${int(x + width)},${int(y)}`);
      break;

    case "horn": // Horn
      moveTo(x, y);
      LPRINT(`D${int(x)},${int(y - height * 0.6)}`);
      LPRINT(`D${int(x + width * 0.3)},${int(y - height * 0.6)}`);
      LPRINT(`D${int(x + width * 0.3)},${int(y - height)}`);
      break;

    case "body": // Main body
      LPRINT(`D${int(x + width)},${int(y)}`);
      LPRINT(`D${int(x + width)},${int(y + height)}`);
      LPRINT(`D${int(x)},${int(y + height)}`);
      LPRINT(`D${int(x)},${int(y)}`);
      // Spikes along back
      for (let i = 1; i < 5; i++) {
        moveTo(x + (width / 5) * i, y);
        LPRINT(`D${int(x + (width / 5) * i)},${int(y - height * 0.4)}`);
      }
      break;

    case "wing": // Wing
      moveTo(x, y);
      LPRINT(`D${int(x + width)},${int(y)}`);
      LPRINT(`D${int(x + width)},${int(y + height)}`);
      LPRINT(`D${int(x + width * 0.6)},${int(y + height)}`);
      LPRINT(`D${int(x + width * 0.6)},${int(y + height * 0.7)}`);
      LPRINT(`D${int(x)},${int(y + height * 0.7)}`);
      LPRINT(`D${int(x)},${int(y)}`);
      // Wing detail lines
      for (let i = 1; i < 3; i++) {
        moveTo(x + (width / 3) * i, y);
        LPRINT(`D${int(x + (width / 3) * i)},${int(y + height * 0.7)}`);
      }
      break;

    case "tail": // Tail
      moveTo(x, y);
      LPRINT(`D${int(x + width)},${int(y)}`);
      LPRINT(`D${int(x + width)},${int(y + height * 0.5)}`);
      LPRINT(`D${int(x + width * 0.7)},${int(y + height * 0.5)}`);
      LPRINT(`D${int(x + width * 0.7)},${int(y + height)}`);
      LPRINT(`D${int(x)},${int(y + height)}`);
      LPRINT(`D${int(x)},${int(y)}`);
      break;

    case "leg": // Leg
      moveTo(x, y);
      LPRINT(`D${int(x)},${int(y + height)}`);
      LPRINT(`D${int(x + width)},${int(y + height)}`);
      LPRINT(`D${int(x + width)},${int(y + height * 0.7)}`);
      LPRINT(`D${int(x)},${int(y + height * 0.7)}`);
      LPRINT(`D${int(x)},${int(y)}`);
      // Claws
      for (let i = 0; i < 3; i++) {
        moveTo(x + (width / 4) * (i + 0.5), y + height);
        LPRINT(
          `D${int(x + (width / 4) * (i + 0.5))},${int(
            y + height + height * 0.3
          )}`
        );
      }
      break;
  }
}

// MAIN SETUP
function setup() {
  OUTPUT = ""; // Reset output buffer
  INIT2(800);

  // Dragon parts positioning
  let headX = 150,
    headY = 150;
  let headW = 80,
    headH = 70;

  // Draw head
  drawDragonPart(headX, headY, headW, headH, "head");

  // Draw horns
  drawDragonPart(headX + headW * 0.3, headY, headW * 0.2, headH * 0.6, "horn");
  drawDragonPart(
    headX + headW * 0.65,
    headY,
    headW * 0.15,
    headH * 0.5,
    "horn"
  );

  // Draw jaw
  drawDragonPart(headX + 5, headY + headH - 15, headW - 10, 15, "jaw");

  // Draw body
  let bodyX = headX + headW - 20,
    bodyY = headY + 30;
  let bodyW = 120,
    bodyH = 60;
  drawDragonPart(bodyX, bodyY, bodyW, bodyH, "body");

  // Draw wings
  let wingY = bodyY + 15;
  drawDragonPart(bodyX - 100, wingY, 80, 50, "wing"); // Left wing
  drawDragonPart(bodyX + bodyW, wingY, 80, 50, "wing"); // Right wing

  // Draw back legs
  let backLegX = bodyX + bodyW - 40,
    backLegY = bodyY + bodyH;
  let legW = 30,
    legH = 60;
  drawDragonPart(backLegX - 50, backLegY, legW, legH, "leg"); // Left back leg
  drawDragonPart(backLegX + 20, backLegY, legW, legH, "leg"); // Right back leg

  // Draw front legs
  let frontLegX = bodyX + 20,
    frontLegY = bodyY + bodyH;
  drawDragonPart(frontLegX - 40, frontLegY, legW, legH, "leg"); // Left front leg
  drawDragonPart(frontLegX + 20, frontLegY, legW, legH, "leg"); // Right front leg

  // Draw tail
  let tailX = bodyX + bodyW - 10,
    tailY = bodyY + bodyH * 0.3;
  let tailW = 140,
    tailH = 80;
  drawDragonPart(tailX, tailY, tailW, tailH, "tail");

  TRACE2();
}

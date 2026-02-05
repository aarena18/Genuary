// DRAGONS
//"Prompt: Triangles and nothing else." Pure triangular compositions
//Day 13
let DESSIN = 50; // [50,51,52]
let NP = 480,
  PI = Math.PI;
let triangles = [];

function setup() {
  INIT2(800);

  // Clear to dark background
  background(15, 15, 30);

  // Generate triangular subdivision recursively
  let cx = width / 2,
    cy = height / 2;
  let outerRadius = NP * 0.45;

  // Create base triangle vertices (pointing up)
  let v1 = [cx, cy - outerRadius];
  let v2 = [
    cx - outerRadius * Math.cos(PI / 6),
    cy + outerRadius * Math.sin(PI / 6),
  ];
  let v3 = [
    cx + outerRadius * Math.cos(PI / 6),
    cy + outerRadius * Math.sin(PI / 6),
  ];

  // Recursively subdivide triangles
  subdivideTriangle(v1, v2, v3, 0, 6);

  // Draw all triangles
  for (let tri of triangles) {
    let hue = tri.depth * 25;
    let sat = 60 + tri.depth * 8;
    let light = 35 + tri.depth * 5;

    // Convert HSL to RGB for p5.js
    let c = color(`hsl(${hue}, ${sat}%, ${light}%)`);
    fill(c);
    stroke(255, 255, 255, 20 + tri.depth * 5);
    strokeWeight(0.8);
    triangle(tri.v1[0], tri.v1[1], tri.v2[0], tri.v2[1], tri.v3[0], tri.v3[1]);
  }
}

function subdivideTriangle(v1, v2, v3, depth, maxDepth) {
  if (depth > maxDepth) return;

  triangles.push({ v1: v1, v2: v2, v3: v3, depth: depth });

  if (depth < maxDepth) {
    // Midpoints
    let m12 = [(v1[0] + v2[0]) / 2, (v1[1] + v2[1]) / 2];
    let m23 = [(v2[0] + v3[0]) / 2, (v2[1] + v3[1]) / 2];
    let m31 = [(v3[0] + v1[0]) / 2, (v3[1] + v1[1]) / 2];

    // Recursive subdivision (Sierpinski-like)
    subdivideTriangle(v1, m12, m31, depth + 1, maxDepth);
    subdivideTriangle(v2, m23, m12, depth + 1, maxDepth);
    subdivideTriangle(v3, m31, m23, depth + 1, maxDepth);
  }
}

function draw() {
  noLoop();
}

function GOSUB() {
  /* retained */
}

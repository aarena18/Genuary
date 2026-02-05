// DRAGONS
//"Prompt: Impossible day - Try to do something that feels impossible for you to do." Matter.js physics simulation
//Day 11
// Matter.js module references
let Matter;
let Engine, World, Bodies, Events, Body;
let engine, world;
let bodies = [];
let walls = [];

let DESSIN = 50; // [50,51,52]
let NP = 480,
  PI = Math.PI;

// ────────────────────────────────────────────────────
function setup() {
  INIT2(800);
  background_("#1a1a2e");

  // Initialize Matter.js after p5.js canvas is ready
  Matter = window.Matter || {};
  Engine = Matter.Engine;
  World = Matter.World;
  Bodies = Matter.Bodies;
  Events = Matter.Events;
  Body = Matter.Body;

  engine = Engine.create();
  world = engine.world;
  world.gravity.y = 1;

  // Create fixed walls (boundaries)
  let wallThickness = 40;
  walls.push(
    Bodies.rectangle(
      width / 2,
      height + wallThickness / 2,
      width,
      wallThickness,
      { isStatic: true },
    ),
  ); // bottom
  walls.push(
    Bodies.rectangle(-wallThickness / 2, height / 2, wallThickness, height, {
      isStatic: true,
    }),
  ); // left
  walls.push(
    Bodies.rectangle(
      width + wallThickness / 2,
      height / 2,
      wallThickness,
      height,
      { isStatic: true },
    ),
  ); // right

  World.add(world, walls);

  // Create falling bodies
  for (let i = 0; i < 30; i++) {
    let x = random(40, width - 40);
    let y = random(-200, -50);
    let sz = random(8, 24);
    let body = Bodies.circle(x, y, sz, { restitution: 0.8, friction: 0.5 });
    body.color = color(
      random(100, 255),
      random(100, 255),
      random(100, 255),
      180,
    );
    bodies.push(body);
    World.add(world, body);
  }
}

function draw() {
  background_("#1a1a2e");
  Engine.update(engine);

  // Draw bodies
  fill(255);
  stroke(100);
  strokeWeight(1);
  for (let body of bodies) {
    let pos = body.position;
    let angle = body.angle;
    fill(body.color);
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    ellipse(0, 0, body.circleRadius * 2, body.circleRadius * 2);
    pop();
  }

  // Draw walls
  stroke(80);
  strokeWeight(2);
  noFill();
  for (let wall of walls) {
    let pos = wall.position;
    rect(
      pos.x - wall.width / 2,
      pos.y - wall.height / 2,
      wall.width,
      wall.height,
    );
  }

  // Occasionally drop new bodies
  if (frameCount % 15 == 0 && bodies.length < 60) {
    let x = random(60, width - 60);
    let sz = random(6, 18);
    let body = Bodies.circle(x, -30, sz, { restitution: 0.9, friction: 0.4 });
    body.color = color(
      random(100, 255),
      random(100, 255),
      random(100, 255),
      180,
    );
    bodies.push(body);
    World.add(world, body);
  }
}

function GOSUB() {
  /* retained */
}

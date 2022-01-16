
const boids = [];

function setup() {
  createCanvas(800, 800);
  alignSlider = createSlider(0,2,1,0.1);
  cohesionSlider = createSlider(0,2 ,1 ,0.1);
  separationSlider = createSlider(0, 2, 1, 0.1);
  for(let i =0; i < 100; i++){
    boids.push(new Boid(random(0,width),random(0,height)));
  }
}

function draw() {
  background(0);
  text('alignment',5, height-5);
  text('cohesion',145, height-5);
  text('separation',285, height-5);
  for(let b of boids){
    b.flock(boids);
    b.update();
    b.show();
  }
  stroke(255);
  strokeWeight(5);
  text(round(frameRate()), 15, 10,10);
}

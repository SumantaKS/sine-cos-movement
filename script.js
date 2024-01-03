"use strict";
/** @type {HTMLCanvasElement} */ //to display canvas methods in vscode

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const canvasWidth = (canvas.width = 500);
const canvasHeight = (canvas.height = 1000);
let gameFrame = 0;

class Enemy {
  constructor() {
    this.enemyImg = new Image();
    this.enemyImg.src = "img/enemy3.png";
    this.enemyWidth = 218;
    this.enemyHeight = 177;
    this.width = this.enemyWidth / 2;
    this.height = this.enemyHeight / 2;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = Math.random() * (canvasHeight - this.height);
    this.speed = Math.random() * 4 + 1;
    this.enemyFrame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1); //this ensures each enemy has different flap speed
    //for sine wave like patter of enemies
    this.angle = 0; //this determines starting point along the sine wave that the sprite first appears.
    this.angleSpeed = Math.random() * 1.5 + 0.5; //randomized value is better since it gives each enemy an unique wave/speed/animation
    //change below value to increase difficulty of game
    //or to increase wavy-ness of the sprites
    // this.curve = Math.random() * 200 + 50; //higher value gives more prominent wave. But in this it determines the radius since sin and cosine are combined. So, higher value will give bigger circles. Replaced by canvas.width and canvas.height to fit the sprites inside the canvas
  }
  resetFrame() {
    //the values that you divide pi with determines the relation of the two movements. Change them(relative to one another) to get different movement pattern. Values that are divisible to one another help make sense of the pattern much better. Will implement user control for this value later
    //x is vertical cycle
    //y is horizontal cycle
    this.x =
      (canvas.width / 2) * Math.cos((this.angle * Math.PI) / 90) +
      (canvas.width / 2 - this.width / 2); //adjust values here to change speed and location of wave. Changin sin to cos will cause sprites to back-track instead of going in circles. Also replacing sin with cos in both will cause circle to move in opposite direction
    this.y =
      (canvas.height / 2) * Math.sin((this.angle * Math.PI) / 270) +
      (canvas.height / 2 - this.height / 2); //why cos? idk. I forgot trigonometry. sin with cosine gives a circular path, that's all that matter for this
    //play with above values to adjust speed, radius, wave pattern
    this.angle += this.angleSpeed; //every iteration angle changes. Play with this value to adjust the wave
    if (this.x + this.width < 0) this.x = canvasWidth; //infinite right to left movement
    if (gameFrame % this.flapSpeed === 0) {
      this.enemyFrame >= 5 ? (this.enemyFrame = 0) : this.enemyFrame++;
    }
  }
  draw() {
    ctx.drawImage(
      this.enemyImg,
      this.enemyFrame * this.enemyWidth,
      0,
      this.enemyWidth,
      this.enemyHeight,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
}

const enemyCount = 200;
const enemies = [];
for (let i = 0; i < enemyCount; i++) {
  enemies.push(new Enemy());
}

function animate() {
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  enemies.forEach((enemy) => {
    enemy.resetFrame();
    enemy.draw();
  });
  gameFrame++;
  requestAnimationFrame(animate);
}

animate();

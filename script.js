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
    this.width = this.enemyWidth / 2.5;
    this.height = this.enemyHeight / 2.5;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = Math.random() * (canvasHeight - this.height);
    this.speed = Math.random() * 4 + 1;
    this.enemyFrame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1); //this ensures each enemy has different flap speed
    //for sine wave like patter of enemies
    this.angle = 0; //this determines starting point along the sine wave that the sprite first appears.
    this.angleSpeed = Math.random() * 2; //randomized value is better since it gives each enemy an unique wave/speed/animation
    //change below value to increase difficulty of game
    //or to increase wavy-ness of the sprites
    this.curve = Math.random() * 170; //higher value gives more prominent wave. But in this it determines the radius since sin and cosine are combined. So, higher value will give bigger circles.
  resetFrame() {
    this.x =
      this.curve * this.angleSpeed * Math.sin((this.angle * Math.PI) / 180) +
      (canvas.width / 2 - this.width / 2); //adjust values here to change speed and location of wave
    this.y =
      this.curve * this.angleSpeed * Math.cos((this.angle * Math.PI) / 180) +
      (canvas.height / 2 - this.height / 2); //why cos? idk. I forgot trigonometry. sin with cosine gives a circular path, that's all that matter for this
    //play with above values to adjust speed, radius, wave pattern, etc
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

const enemyCount = 20;
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

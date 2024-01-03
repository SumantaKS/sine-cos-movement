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
    this.enemyImg.src = "img/enemy2.png";
    this.enemyWidth = 266;
    this.enemyHeight = 188;
    this.width = this.enemyWidth / 2.5;
    this.height = this.enemyHeight / 2.5;
    this.x = Math.random() * (canvasWidth - this.width);
    this.y = Math.random() * (canvasHeight - this.height);
    this.speed = Math.random() * 4 + 1;
    this.enemyFrame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1); //this ensures each enemy has different flap speed
    //for sine wave like patter of enemies
    this.angle = 0; //this determines starting point along the sine wave that the sprite first appears.
    this.angleSpeed = Math.random() * 0.2; //randomized value is better since it gives each enemy an unique wave/speed/animation
    //change below value to increase difficulty of game
    //or to increase wavy-ness of the sprites
    this.curve = Math.random() * 7; //higher value gives more prominent sine wave
  }
  resetFrame() {
    this.x -= this.speed; //for right to left movement
    this.y += this.curve * Math.sin(this.angle); //for sine wave. Higher value gives prominent curve(Don't remember trigonometry and I don't want to know why either). Math.sin() returns -1 to +1. But for this it's (-1,+1)*3
    this.angle += this.angleSpeed; //every iteration anngle changes. Play with this value to adjust the wave
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

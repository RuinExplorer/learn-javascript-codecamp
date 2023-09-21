/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 500;
const CANVAS_HEIGHT = canvas.height = 1000;
const numberOfEnemies = 50;
const enemiesArray = [];

let gameFrame = 0;

class Enemy {
  constructor(){
    this.image = new Image();
    this.image.src = 'enemy3.png';
    this.speed = Math.random() * 4 + 1;
    this.spriteWidth = 218;
    this.spriteHeight = 177;
    this.sizeModifier = (Math.random() * .2 + 1)
    this.width = (this.spriteWidth / 3) * this.sizeModifier;
    this.height = (this.spriteHeight / 3) * this.sizeModifier;
    this.x = Math.random() * (canvas.width - this.width);
    this.y = Math.random() * (canvas.height - this.height);
    this.frame = 0;
    this.flapSpeed = Math.floor(Math.random() * 3 + 1);
    this.angle = Math.random() * 500; //starting position along path
    this.angleSpeed = Math.random() * 2 + 1;
    //NOTE Circular movement pattern - in this case, curve serves as radius
    //this.curve = Math.random() * 200 + 50;
    //NOTE playing around - using curve to fill the area under the curve of the trig function
    this.curve = 0; //Math.random() * 500+50;
  }
  update(){
    //NOTE Circular movement pattern
    //this.x = this.curve * Math.sin(this.angle * Math.PI/180) + canvas.width/2 - this.width/2;
    //this.y = this.curve * Math.cos(this.angle * Math.PI/180) + canvas.height/2 - this.height/2;
    //NOTE arc based movement pattern - change pi denominator to change pathing
    this.x = (canvas.width/2 - this.curve) * Math.cos(this.angle * Math.PI/200) + canvas.width/2 - this.width/2;
    this.y = canvas.height/2 * Math.sin(this.angle * Math.PI/300) + canvas.height/2 - this.height/2;
    this.angle += this.angleSpeed;
    // wrap
    if (this.x + this.width < 0)
    {
      this.x = canvas.width;
    }
    // animate sprites
    if (gameFrame % this.flapSpeed === 0) {
      this.frame > 4 ? this.frame = 0 : this.frame++;
    }
  }
  draw(){
    //ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, 
      this.x, this.y, this.width, this.height);
  }
};

for (let i =0; i < numberOfEnemies; i++){
  enemiesArray.push(new Enemy());
}
console.log(enemiesArray);
function animate(){
  ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemiesArray.forEach(enemy => {
    enemy.update();
    enemy.draw();
  })
  gameFrame++;
  requestAnimationFrame(animate);
}
animate();
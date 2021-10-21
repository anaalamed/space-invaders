import { Utils } from "./Utils";
import { Fire_monster } from "./Fire";

export class Monster {
  constructor() {
    this.canvas = Utils.$(".stage"); // reference the canvas
    this.ctx = this.canvas.getContext("2d"); // context 2d

    this.width = 30; // all monsters have the same width 
    this.speed = 2;
    this.dir = 1;
  }

  // every time func
  move() {
    this.x_start += this.dir * this.speed;
    this.draw();
  }

  fire(x, y) {
    let fire = new Fire_monster(this.canvas, this.ctx, x, y);
    return fire;
  }
}

// there is no instance of monster. only the children 
// every monster's children have ONLY special DRAW method

export class Jellyfish extends Monster {
  constructor(start) {
    super();
    this.x_start = start;
    this.x_end = this.x_start + this.width;
    this.y_start = 5;
    this.y_end = 45;
  }
  draw() {
    // console.log("draw jellyfish");
    let end = this.x_start + this.width;
    let body_height = 20;
    let midle1 = (end - this.x_start) / 3;
    let midle2 = ((end - this.x_start) * 2) / 3;

    this.ctx.beginPath();
    // the body
    this.ctx.lineTo(this.x_start, body_height);
    this.ctx.bezierCurveTo(
      this.x_start,
      this.y_start,
      end,
      this.y_start,
      end,
      body_height
    );

    // the legs
    this.ctx.lineTo(this.x_start, body_height);
    this.ctx.bezierCurveTo(
      this.x_start,
      this.y_end,
      this.x_start + midle1 / 2,
      this.y_end,
      this.x_start + midle1,
      body_height
    );
    this.ctx.lineTo(this.x_start + midle1, body_height);
    this.ctx.bezierCurveTo(
      this.x_start + midle1,
      this.y_end,
      this.x_start + midle2,
      this.y_end,
      this.x_start + midle2,
      body_height
    );
    this.ctx.lineTo(this.x_start + midle2, body_height);
    this.ctx.bezierCurveTo(
      this.x_start + midle2 + midle1 / 2,
      this.y_end,
      end,
      this.y_end,
      end,
      body_height
    );
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fill();
  }
}

export class Triangle extends Monster {
  constructor(start) {
    super();
    this.x_start = start;
    this.x_end = this.x_start + this.width;
    this.y_start = 65;
    this.y_end = 90;
  }
  draw() {
    // console.log("draw triangle");
    // triangle
    this.ctx.beginPath();
    this.ctx.moveTo(this.x_start + this.width / 2, this.y_start);
    this.ctx.lineTo(this.x_start, this.y_end);
    this.ctx.lineTo(this.x_start + this.width, this.y_end);
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.beginPath();
    // left eye
    this.ctx.arc(
      this.x_start + this.width / 2 - 5,
      this.y_end - (this.y_end - this.y_start) / 2,
      2,
      0,
      Math.PI * 2,
      true
    );

    // space between eyes
    // this.ctx.moveTo(
    //   this.x_start + this.width / 2 + 5,
    //   this.y_end - (this.y_end - this.y_start) / 2
    // );

    // Right eye
    this.ctx.arc(
      this.x_start + this.width / 2 + 5,
      this.y_end - (this.y_end - this.y_start) / 2,
      2,
      0,
      Math.PI * 2,
      true
    );

    // mouth
    this.ctx.moveTo(this.x_start + this.width / 2, this.y_end - 5);
    this.ctx.arc(
      this.x_start + this.width / 2,
      this.y_end - 5,
      3,
      0,
      Math.PI,
      false
    );

    // this.ctx.stroke();
    this.ctx.fillStyle = "black";
    this.ctx.fill();
    this.ctx.closePath();

    this.ctx.fillStyle = "lightgrey"; // return to base monster's color
  }
}

export class Smile extends Monster {
  constructor(start) {
    super();
    this.x_start = start;
    this.x_end = this.x_start + this.width;
    this.y_start = 115;
    this.y_end = 145;
    this.y = 130;
  }
  draw() {
    this.ctx.beginPath();
    this.ctx.moveTo(this.x_start + this.width / 2, this.y);
    this.ctx.arc(
      this.x_start + this.width - 10,
      this.y,
      15,
      Math.PI / 7,
      -Math.PI / 7,
      false
    );
    this.ctx.fillStyle = "lightgrey";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

import { Utils, global } from "./Utils";
// import { Fire } from "./fire";

export class Hero {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    // sizes
    this.a = global.hero_width; // rectangle width
    this.b = global.hero_height; // rectangle height

    // position
    this.x = x;
    this.y = y;
  }

  draw_hero() {
    // console.log("draw_hero");
    this.ctx.beginPath();
    // base rectangle
    this.ctx.rect(this.x, this.y, this.a, this.b);
    // top rectangle
    this.ctx.rect(
      this.x + this.a / 2 - this.b / 2,
      this.y - this.b,
      this.b,
      this.b
    );
    this.ctx.fillStyle = "lime";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export class Crash {
  constructor(ctx, x, y) {
    this.ctx = ctx;

    this.x = x;
    this.y = y;
    this.draw();
  }

  draw() {
    let a = 30;
    this.ctx.beginPath();
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + a, this.y + a);
    this.ctx.moveTo(this.x + a, this.y);
    this.ctx.lineTo(this.x, this.y + a);
    this.ctx.moveTo(this.x + a / 2, this.y);
    this.ctx.lineTo(this.x + a / 2, this.y + a);
    this.ctx.moveTo(this.x, this.y + a / 2);
    this.ctx.lineTo(this.x + a, this.y + a / 2);

    this.ctx.strokeStyle = "lightgrey";
    this.ctx.stroke();
    this.ctx.closePath();
  }
}

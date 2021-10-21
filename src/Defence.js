export class Defence {
  constructor(ctx, x) {
    this.ctx = ctx;
    this.x_start = x;
    this.width = 50;
    this.x_end = this.x_start + this.width;
    this.y = 230;
    this.height = 40;

    this.draw();
  }

  // draw(x, y) {}
}

export class LeftDefence extends Defence {
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(this.x_start, this.y, this.width / 5, this.height);
    this.ctx.fillStyle = "lime";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export class TopDefence extends Defence {
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.x_start + this.width / 5,
      this.y,
      this.width - (this.width / 5) * 2,
      this.height / 2
    );
    this.ctx.fillStyle = "lime";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

export class RightDefence extends Defence {
  draw() {
    this.ctx.beginPath();
    this.ctx.rect(
      this.x_end - this.width / 5,
      this.y,
      this.width / 5,
      this.height
    );
    this.ctx.fillStyle = "lime";
    this.ctx.fill();
    this.ctx.closePath();
  }
}

import { Main_hero } from "./Main_hero";
import { global } from "./Utils";

export class Fire {
  constructor(canvas, ctx, x) {
    this.canvas = canvas;
    this.ctx = ctx;

    // sizes
    this.a = 3; // width
    this.b = 15; // height

    // position
    this.x = x;
    this.y = this.canvas.height - global.hero_height * 8;
    this.hero = new Main_hero();

    // hero's fire properties. different for monter's fire. also y.
    // this.ctx.fillStyle = "lime";
    this.ctx.fillStyle = "pink";

    this.dir = -1; // bottom to top
    this.speed = 5;
  }

  draw_fire() {
    // console.log("draw_fire()");
    this.ctx.beginPath();
    this.ctx.rect(this.x, this.y, this.a, this.b);
    this.ctx.fill();
    this.ctx.closePath();

    this.y += this.dir * this.speed;
    if (this.y < 0) this.hero.remove_fire(this); // hero's fire removed when touch the top bound
  }
}

export class Fire_monster extends Fire {
  constructor(canvas, ctx, x, y) {
    super(canvas, ctx, x);

    // special properties for usage function draw_fire
    this.ctx.fillStyle = "lightgrey";
    this.dir = 1; // top to bottom
    this.y = y;
    this.speed = 4;
    this.first_get = 1; // prevent killing all lifes on 1 fire because of stick
  }
}

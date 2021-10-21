import { Hero } from "./Hero";
import { Fire } from "./Fire";

export class Main_hero extends Hero {
  constructor(canvas, ctx, x, y) {
    if (Main_hero.instance) {
      return Main_hero.instance;
    }
    super(ctx, x, y);
    this.canvas = canvas;
    Main_hero.instance = this;
    this.speed = 5;

    this.keys_pressed = {}; // for nice move
    this.fires = [];
    this.first_get = 1;

    // for nice move
    window.addEventListener("keydown", this.keyDown.bind(this));
    window.addEventListener("keyup", this.keyUp.bind(this));
  }

  // every time func
  draw_main_hero() {
    // console.log("draw main hero");
    this.draw_hero();
    if ("ArrowRight" in this.keys_pressed) {
      if (this.x < this.canvas.width - this.a) {
        this.x += this.speed;
      }
    }
    if ("ArrowLeft" in this.keys_pressed) {
      if (this.x > 0) {
        this.x -= this.speed;
      }
    }

    this.fires.forEach((fire) => fire.draw_fire());
  }

  remove_fire(far_fire) {
    this.fires = this.fires.filter((fire) => fire !== far_fire);
  }

  // ------------------- nicely moving -----------------------
  keyDown(event) {
    if (!(event.code in this.keys_pressed)) {
      this.keys_pressed[event.code] = true;
    }
    if (event.code === "Space") {
      // console.log("Space pressed");
      this.fires.push(new Fire(this.canvas, this.ctx, this.x + this.a / 2 - 1));
    }
  }

  keyUp(event) {
    if (event.code in this.keys_pressed) delete this.keys_pressed[event.code];
  }
}

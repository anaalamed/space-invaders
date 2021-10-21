import { Utils, global } from "./Utils";
import { Hero } from "./Hero";
import { Main_hero } from "./Main_hero";
import { Jellyfish, Triangle, Smile } from "./Monster";
import { Crash } from "./Crash";
import { LeftDefence, TopDefence, RightDefence } from "./Defence";

class App {
  constructor() {
    this.canvas = Utils.$(".stage"); // reference the canvas
    this.ctx = this.canvas.getContext("2d"); // context 2d

    this.hero = new Main_hero(
      this.canvas,
      this.ctx,
      this.canvas.width / 2 - global.hero_width / 2,
      this.canvas.height - global.hero_height * 5
    );
    this.lifes = this.create_lifes(3);
    this.defences = this.create_defences(4);

    this.monsters_num = 5;
    this.monsters = this.create_monsters(this.monsters_num);

    this.fires_m = [];

    this.draw_app();
  }

  start_game() {
    let start = Utils.$(".start"); // reference the start button
    start.addEventListener('click', () => {
      setInterval(() => this.draw_app(), 16);
      start.disabled = true; 
    })
  }

  // every time method
  draw_app() {
    // console.log("draw_app");
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.draw_lifes();
    this.hero.draw_main_hero();

    this.move_monsters(this.monsters);
    this.get_fire_monster();

    this.monster_fire();
    this.get_fire_hero();

    this.get_fire_def();

    this.defences.forEach((def) => def.draw());
  }

  create_lifes(num) {
    let lifes = [];
    for (let i = 0; i < num; i++) {
      let life = new Hero(this.ctx, 5 + i * 60, this.canvas.height - 15, 0);
      lifes.push(life);
    }
    return lifes;
  }

  create_defences(num) {
    let defences = [];

    for (let i = 0; i < num; i++) {
      let left_def = new LeftDefence(this.ctx, 120 * i + 50);
      defences.push(left_def);

      let top_def = new TopDefence(this.ctx, 120 * i + 50);
      defences.push(top_def);

      let right_def = new RightDefence(this.ctx, 120 * i + 50);
      defences.push(right_def);
    }
    return defences;
  }

  // every time method in draw_app
  draw_lifes() {
    //the line
    this.ctx.beginPath();
    this.ctx.rect(
      0,
      this.canvas.height - global.hero_height * 3 - 5,
      this.canvas.width,
      2
    );
    this.ctx.fillStyle = "lime";
    this.ctx.fill();
    this.ctx.closePath();

    this.lifes.forEach((life) => life.draw_hero());
  }

  create_monsters(num) {
    let jelly = [];
    let triangle = [];
    let smile = [];
    for (let i = 0; i < num; i++) {
      jelly.push(new Jellyfish(i * 50 + 10));
      triangle.push(new Triangle(i * 50 + 10));
      smile.push(new Smile(i * 50 + 10));
    }
    return [...jelly, ...triangle, ...smile];
  }

  move_monsters(monsters) {
    // to know what the max and min x position of monsters
    let arr_end = [];
    let arr_start = [];

    monsters.forEach((monster) => {
      arr_end.push(monster.x_end); // all x_end coordinates
      arr_start.push(monster.x_start); // all x_start coordinates
    });
    let max = Math.max(...arr_end); // max of all x_end
    let min = Math.min(...arr_start); // min of all x_start

    let index_max = arr_end.indexOf(max); // index of max
    let index_min = arr_start.indexOf(min); // index of min

    // to move. turn when monster[max/min index] touch the bounds
    monsters.forEach((monster) => monster.move());
    if (monsters.length !== 0) {
      if (monsters[index_max].x_start + 30 >= this.canvas.width) {
        monsters.forEach((monster) => (monster.dir = -1));
      }
      if (monsters[index_min].x_start < 0) {
        monsters.forEach((monster) => (monster.dir = 1));
      }
    }
  }

  // ----------- hero kills the monsters ---------------
  get_fire_monster() {
    this.hero.fires.forEach((fire) => {
      this.monsters.forEach((monster) => {
        if (
          fire.x >= monster.x_start &&
          fire.x <= monster.x_start + monster.width &&
          fire.y >= monster.y_start &&
          fire.y <= monster.y_end
        ) {
          this.crash = new Crash(this.ctx, fire.x - 20, fire.y - 20);
          this.hero.remove_fire(fire);
          this.remove_monster(monster);
        }
      });
    });
  }

  remove_monster(fired) {
    this.monsters = this.monsters.filter((monster) => monster !== fired);

    // win if there are no monsters
    if (this.monsters.length === 0) {
      setTimeout(() => {
        alert("you win!!!");
        location.reload();
      }, 500); // prevent alert before
    }
  }

  // ------------ monsters kill the hero ----------------

  monster_fire() {
    let index = Utils.random(this.monsters.length - 1);
    // console.log(index);
    if (this.fires_m.length === 0 && this.monsters.length !== 0) {
      this.fires_m.push(
        this.monsters[index].fire(
          this.monsters[index].x_start + 15,
          this.monsters[index].y_end
        )
      );
    }

    this.fires_m.forEach((fire) => {
      fire.draw_fire();
      // console.log(fire.y);
      if (fire.y > this.canvas.height) {
        this.remove_fire(fire);
      }
    });
  }

  get_fire_hero() {
    let lifes_num = this.lifes.length; // for lifes--
    this.fires_m.forEach((fire) => {
      if (
        fire.first_get === 1 &&
        fire.x >= this.hero.x &&
        fire.x <= this.hero.x + this.hero.a &&
        fire.y >= this.hero.y &&
        fire.y <= this.hero.y + this.hero.b
      ) {
        this.lifes = this.create_lifes(lifes_num - 1);
        fire.first_get = 0; // prevent kill from 1 fire because of y's thick
        if (this.lifes.length === 0) {
          alert("Game over");
          location.reload();
        }
      }
    });
  }

  // need to draw crashed
  get_fire_def() {
    this.defences.forEach((def) => {
      this.fires_m.forEach((fire_m) => {
        if (
          fire_m.x >= def.x_start &&
          fire_m.x <= def.x_end &&
          fire_m.y >= def.y &&
          fire_m.y <= def.y + def.height
        ) {
          this.remove_fire(fire_m);
          this.remove_def(def);
          // def.draw(fire_m.x, fire_m.y); //?
        }
      });
    });

    this.defences.forEach((def) => {
      this.hero.fires.forEach((fire_h) => {
        if (
          fire_h.x >= def.x_start &&
          fire_h.x <= def.x_end &&
          fire_h.y >= def.y &&
          fire_h.y <= def.y + def.height
        ) {
          this.hero.remove_fire(fire_h);
          this.remove_def(def);
          // def.draw(fire_h.x, fire_h.y); // ?
        }
      });
    });
  }

  remove_def(fired) {
    this.defences = this.defences.filter((def) => def !== fired);
  }

  // there is the same func in hero. need to join both
  remove_fire(far_fire) {
    this.fires_m = this.fires_m.filter((fire) => fire !== far_fire);
  }
}

const myApp = new App();

myApp.start_game();
// setInterval(() => myApp.draw_app(), 16);

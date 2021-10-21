export class Utils {
  static $(s, p = document) {
    return p.querySelector(s);
  }

  static random(max, min = 0) {
    return Math.round(Math.random() * (max - min) + min);
  }
}

// for dinamic math calculation 
export let global = { hero_width: 50, hero_height: 10 }; 

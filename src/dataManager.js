/* eslint-disable no-console */
export default class DataManager {
  constructor(layermode = 0, version = 'fx', x = 180, y = 30) {
    this.layerMode = layermode;
    this.version = version;
    this.x = x;
    this.y = y;
    this.mapBase = [];
    this.map = [];
    this.layer = [];

    for (let i = 0; i < this.x; i += 1) {
      this.mapBase[i] = 0;
    }
    for (let i = 0; i < this.y; i += 1) {
      this.map[i] = this.mapBase;
    }
    console.log(this.map);
  }

  get GameWidth() {
    return this.x;
  }

  get GameHeight() {
    return this.y;
  }

  setMapChip(chip, x, y) {
    this.map[y][x] = chip;
  }
}

/* eslint-disable no-console */
export default class DataManager {
  constructor(layermode = 0, x = 180, y = 30) {
    this.mapData = '';
    this.layData = '';
    this.layerMode = layermode;
    this.layerX = 180;
    this.layerY = 30;
    if (this.layerMode !== 0) {
      this.layerX = x;
      this.layerY = y;
    }
  }

  // ---------------------------------------------------------
  // Mapdata
  // ---------------------------------------------------------
  createMapdata() {
    this.mapData = '............................................................';
    this.layData = this.mapData + this.mapData;

    switch (this.layerMode) {
      case 1:

        break;

      default:
        console.log('normal-layer');
        break;
    }
  }
}

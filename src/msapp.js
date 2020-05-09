/* eslint-disable no-console */
import * as PIXI from 'pixi.js';

export default class MsApp {
  constructor(app, container) {
    this.viewX = 0;
    this.viewY = 0;
    this.HTMLcontainer = container;
    this.width = container.clientWidth;
    this.height = container.clientHeight;
    this.app = app;
  }

  createView() {
    this.app.renderer.view.style.position = 'absolute';
    this.app.renderer.view.style.display = 'block';
    this.app.renderer.resize(this.width, this.height);

    this.HTMLcontainer.appendChild(this.app.view);

    this.container = new PIXI.Container();
    this.app.stage.addChild(this.container);

    console.log('created');
  }

  resize() {
    this.app.renderer.resize(this.width, this.height);
  }


  drawGrid() {
    this.grid = new PIXI.Graphics();
    for (let index = 0; index < Math.floor(this.HTMLcontainer.clientHeight / 32) + 1; index += 1) {
      this.grid.lineStyle(1.001, 0xffffff, 0.5)
        .moveTo(0 + this.viewX, 32 * index + this.viewY)
        .lineTo(this.HTMLcontainer.clientWidth + this.viewX, 32 * index + this.viewY)
        .endFill();
    }
    for (let index = 0; index < Math.floor(this.HTMLcontainer.clientWidth / 32) + 1; index += 1) {
      this.grid.lineStyle(1, 0xffffff, 0.5)
        .moveTo(32 * index + this.viewX, 0 + this.viewY)
        .lineTo(32 * index + this.viewX, this.HTMLcontainer.clientHeight + this.viewY)
        .endFill();
    }
    this.app.stage.addChild(this.grid);
  }
}

/* eslint-disable no-console */
import * as PIXI from 'pixi.js';

const mainContainer = document.getElementById('mainContainer');
const viewX = 0;
const viewY = 0;

const app = new PIXI.Application({
  width: mainContainer.clientWidth,
  height: mainContainer.clientHeight,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

app.renderer.view.style.position = 'absolute';
app.renderer.view.style.display = 'block';
mainContainer.appendChild(app.view);

const container = new PIXI.Container();
app.stage.addChild(container);

// Create Grid
const grid = new PIXI.Graphics();
for (let index = 0; index < Math.floor(mainContainer.clientHeight / 32) + 1; index += 1) {
  grid.lineStyle(1.001, 0xffffff, 0.5)
    .moveTo(0 + viewX, 32 * index + viewY)
    .lineTo(mainContainer.clientWidth + viewX, 32 * index + viewY)
    .endFill();
  console.log(index * 32);
}
for (let index = 0; index < Math.floor(mainContainer.clientWidth / 32) + 1; index += 1) {
  grid.lineStyle(1, 0xffffff, 0.5)
    .moveTo(32 * index + viewX, 0 + viewY)
    .lineTo(32 * index + viewX, mainContainer.clientHeight + viewY)
    .endFill();
}
app.stage.addChild(grid);

/*
window.addEventListener('resize', () => {
  // リサイズ時に行う処理
}, false);
*/

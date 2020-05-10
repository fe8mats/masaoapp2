/* eslint-disable no-console */
export default class Editor {
  constructor(container, gameWidth, gameHeight) {
    this.HTMLcontainer = container;
    this.editArea = [];
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
    this.grid = true;

    for (let i = 0; i < 3; i += 1) {
      this.editArea[i] = document.createElement('canvas');
      this.editArea[i].id = `_editor${i}`;
      this.editArea[i].width = this.gameWidth * 32;
      this.editArea[i].height = this.gameHeight * 32;
      this.editArea[i].style.top = '0';
      this.editArea[i].style.left = '0';
      this.editArea[i].style.position = 'absolute';
      this.HTMLcontainer.appendChild(this.editArea[i]);
    }

    this.renderMap = this.editArea[0].getContext('2d');
    this.renderLayer = this.editArea[1].getContext('2d');
    this.renderCover = this.editArea[2].getContext('2d');

    console.log(this.editArea[0]);
    this.editArea[2].addEventListener('pointerdown', (e) => { this.pDown(e); });

    this.drawGrid();
  }

  drawGrid() {
    if (this.grid) {
      this.renderCover.beginPath();
      this.renderCover.fillStyle = `rgb(${[255, 255, 255]})`;
      for (let i = 1; i < this.gameWidth; i += 1) {
        this.renderCover.moveTo(i * 32, 0);
        this.renderCover.lineTo(i * 32, this.gameHeight * 32);
      }
      for (let i = 1; i < this.gameHeight; i += 1) {
        this.renderCover.moveTo(0, i * 32);
        this.renderCover.lineTo(this.gameWidth * 32, i * 32);
      }
      this.renderCover.stroke();
    } else {
      this.renderCover.clearRect(0, 0, this.gameWidth * 32, this.gameHeight * 32);
    }
  }

  get grid() {
    return this.grid;
  }

  set grid(bool) {
    this.grid = bool;
  }

  pDown(e) {
    this.mouseX = Math.floor(e.offsetX / 32);
    this.mouseY = Math.floor(e.offsetY / 32);
    console.log(this.mouseX, this.mouseY);
  }
}

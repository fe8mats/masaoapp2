/* eslint-disable no-console */
import * as PIXI from 'pixi.js';
import MsApp from './msapp';

// Get HTML container
const mainContainer = document.getElementById('mainContainer');

// Create PIXI canvas
const app = new PIXI.Application({
  width: 500,
  height: 500,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

// Initialize MasaoApp main program
let msapp = new MsApp(app, mainContainer);
msapp.createView();
msapp.drawGrid();
window.addEventListener('resize', () => {
  msapp.resize();
}, false);

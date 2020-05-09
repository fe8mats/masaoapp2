/* eslint-disable no-console */
import * as PIXI from 'pixi.js';
import MsApp from './msapp';

// ---------------------------------------------------------
// Create WebGL Editor
// ---------------------------------------------------------

// DOM
const mainContainer = document.getElementById('mainContainer');

// Pixi.js
const app = new PIXI.Application({
  width: 500,
  height: 500,
  backgroundColor: 0x1099bb,
  resolution: window.devicePixelRatio || 1,
});

// Initialize MasaoApp main program
const msapp = new MsApp(app, mainContainer);
msapp.createView();
msapp.drawGrid();
window.addEventListener('resize', () => {
  msapp.resize(mainContainer);
});

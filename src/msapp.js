/* eslint-disable no-console */
import DataManager from './dataManager';
import Editor from './editor';

export default class MsApp {
// ---------------------------------------------------------
// Constractor
// ---------------------------------------------------------
  constructor(container) {
    this.HTMLcontainer = container;

    this.data = new DataManager();
    this.editor = new Editor(this.HTMLcontainer, this.data.GameWidth, this.data.GameHeight);
    // this.app.view.addEventListener('pointerdown', (e) => { this.pDown(e); });
  }
}

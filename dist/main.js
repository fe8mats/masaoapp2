/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dataManager.js":
/*!****************************!*\
  !*** ./src/dataManager.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return DataManager; });
/* eslint-disable no-console */
class DataManager {
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


/***/ }),

/***/ "./src/editor.js":
/*!***********************!*\
  !*** ./src/editor.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Editor; });
/* eslint-disable no-console */
class Editor {
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


/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _msapp__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./msapp */ "./src/msapp.js");
/* eslint-disable no-console */


// DOM
const mainContainer = document.getElementById('mainContainer');


// Initialize MasaoApp main program
const msapp = new _msapp__WEBPACK_IMPORTED_MODULE_0__["default"](mainContainer);


/***/ }),

/***/ "./src/msapp.js":
/*!**********************!*\
  !*** ./src/msapp.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return MsApp; });
/* harmony import */ var _dataManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataManager */ "./src/dataManager.js");
/* harmony import */ var _editor__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./editor */ "./src/editor.js");
/* eslint-disable no-console */



class MsApp {
// ---------------------------------------------------------
// Constractor
// ---------------------------------------------------------
  constructor(container) {
    this.HTMLcontainer = container;

    this.data = new _dataManager__WEBPACK_IMPORTED_MODULE_0__["default"]();
    this.editor = new _editor__WEBPACK_IMPORTED_MODULE_1__["default"](this.HTMLcontainer, this.data.GameWidth, this.data.GameHeight);
    // this.app.view.addEventListener('pointerdown', (e) => { this.pDown(e); });
  }
}


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RhdGFNYW5hZ2VyLmpzIiwid2VicGFjazovLy8uL3NyYy9lZGl0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NyYy9tc2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO1FBQUE7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7OztRQUdBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwwQ0FBMEMsZ0NBQWdDO1FBQzFFO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0Esd0RBQXdELGtCQUFrQjtRQUMxRTtRQUNBLGlEQUFpRCxjQUFjO1FBQy9EOztRQUVBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQSx5Q0FBeUMsaUNBQWlDO1FBQzFFLGdIQUFnSCxtQkFBbUIsRUFBRTtRQUNySTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLDJCQUEyQiwwQkFBMEIsRUFBRTtRQUN2RCxpQ0FBaUMsZUFBZTtRQUNoRDtRQUNBO1FBQ0E7O1FBRUE7UUFDQSxzREFBc0QsK0RBQStEOztRQUVySDtRQUNBOzs7UUFHQTtRQUNBOzs7Ozs7Ozs7Ozs7O0FDbEZBO0FBQUE7QUFBQTtBQUNlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsWUFBWTtBQUMvQjtBQUNBO0FBQ0EsbUJBQW1CLFlBQVk7QUFDL0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy9CQTtBQUFBO0FBQUE7QUFDZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsT0FBTztBQUMxQjtBQUNBLHNDQUFzQyxFQUFFO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDZEQUE2RCxlQUFlLEVBQUU7O0FBRTlFO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsMENBQTBDLGdCQUFnQjtBQUMxRCxxQkFBcUIsb0JBQW9CO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixxQkFBcUI7QUFDMUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0RBO0FBQUE7QUFBQTtBQUM0Qjs7QUFFNUI7QUFDQTs7O0FBR0E7QUFDQSxrQkFBa0IsOENBQUs7Ozs7Ozs7Ozs7Ozs7QUNSdkI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUN3QztBQUNWOztBQUVmO0FBQ2Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxvQkFBb0Isb0RBQVc7QUFDL0Isc0JBQXNCLCtDQUFNO0FBQzVCLDZEQUE2RCxlQUFlLEVBQUU7QUFDOUU7QUFDQSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvaW5kZXguanNcIik7XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhTWFuYWdlciB7XG4gIGNvbnN0cnVjdG9yKGxheWVybW9kZSA9IDAsIHZlcnNpb24gPSAnZngnLCB4ID0gMTgwLCB5ID0gMzApIHtcbiAgICB0aGlzLmxheWVyTW9kZSA9IGxheWVybW9kZTtcbiAgICB0aGlzLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHRoaXMueCA9IHg7XG4gICAgdGhpcy55ID0geTtcbiAgICB0aGlzLm1hcEJhc2UgPSBbXTtcbiAgICB0aGlzLm1hcCA9IFtdO1xuICAgIHRoaXMubGF5ZXIgPSBbXTtcblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy54OyBpICs9IDEpIHtcbiAgICAgIHRoaXMubWFwQmFzZVtpXSA9IDA7XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy55OyBpICs9IDEpIHtcbiAgICAgIHRoaXMubWFwW2ldID0gdGhpcy5tYXBCYXNlO1xuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0aGlzLm1hcCk7XG4gIH1cblxuICBnZXQgR2FtZVdpZHRoKCkge1xuICAgIHJldHVybiB0aGlzLng7XG4gIH1cblxuICBnZXQgR2FtZUhlaWdodCgpIHtcbiAgICByZXR1cm4gdGhpcy55O1xuICB9XG5cbiAgc2V0TWFwQ2hpcChjaGlwLCB4LCB5KSB7XG4gICAgdGhpcy5tYXBbeV1beF0gPSBjaGlwO1xuICB9XG59XG4iLCIvKiBlc2xpbnQtZGlzYWJsZSBuby1jb25zb2xlICovXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBFZGl0b3Ige1xuICBjb25zdHJ1Y3Rvcihjb250YWluZXIsIGdhbWVXaWR0aCwgZ2FtZUhlaWdodCkge1xuICAgIHRoaXMuSFRNTGNvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB0aGlzLmVkaXRBcmVhID0gW107XG4gICAgdGhpcy5nYW1lV2lkdGggPSBnYW1lV2lkdGg7XG4gICAgdGhpcy5nYW1lSGVpZ2h0ID0gZ2FtZUhlaWdodDtcbiAgICB0aGlzLmdyaWQgPSB0cnVlO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCAzOyBpICs9IDEpIHtcbiAgICAgIHRoaXMuZWRpdEFyZWFbaV0gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgIHRoaXMuZWRpdEFyZWFbaV0uaWQgPSBgX2VkaXRvciR7aX1gO1xuICAgICAgdGhpcy5lZGl0QXJlYVtpXS53aWR0aCA9IHRoaXMuZ2FtZVdpZHRoICogMzI7XG4gICAgICB0aGlzLmVkaXRBcmVhW2ldLmhlaWdodCA9IHRoaXMuZ2FtZUhlaWdodCAqIDMyO1xuICAgICAgdGhpcy5lZGl0QXJlYVtpXS5zdHlsZS50b3AgPSAnMCc7XG4gICAgICB0aGlzLmVkaXRBcmVhW2ldLnN0eWxlLmxlZnQgPSAnMCc7XG4gICAgICB0aGlzLmVkaXRBcmVhW2ldLnN0eWxlLnBvc2l0aW9uID0gJ2Fic29sdXRlJztcbiAgICAgIHRoaXMuSFRNTGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0aGlzLmVkaXRBcmVhW2ldKTtcbiAgICB9XG5cbiAgICB0aGlzLnJlbmRlck1hcCA9IHRoaXMuZWRpdEFyZWFbMF0uZ2V0Q29udGV4dCgnMmQnKTtcbiAgICB0aGlzLnJlbmRlckxheWVyID0gdGhpcy5lZGl0QXJlYVsxXS5nZXRDb250ZXh0KCcyZCcpO1xuICAgIHRoaXMucmVuZGVyQ292ZXIgPSB0aGlzLmVkaXRBcmVhWzJdLmdldENvbnRleHQoJzJkJyk7XG5cbiAgICBjb25zb2xlLmxvZyh0aGlzLmVkaXRBcmVhWzBdKTtcbiAgICB0aGlzLmVkaXRBcmVhWzJdLmFkZEV2ZW50TGlzdGVuZXIoJ3BvaW50ZXJkb3duJywgKGUpID0+IHsgdGhpcy5wRG93bihlKTsgfSk7XG5cbiAgICB0aGlzLmRyYXdHcmlkKCk7XG4gIH1cblxuICBkcmF3R3JpZCgpIHtcbiAgICBpZiAodGhpcy5ncmlkKSB7XG4gICAgICB0aGlzLnJlbmRlckNvdmVyLmJlZ2luUGF0aCgpO1xuICAgICAgdGhpcy5yZW5kZXJDb3Zlci5maWxsU3R5bGUgPSBgcmdiKCR7WzI1NSwgMjU1LCAyNTVdfSlgO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmdhbWVXaWR0aDsgaSArPSAxKSB7XG4gICAgICAgIHRoaXMucmVuZGVyQ292ZXIubW92ZVRvKGkgKiAzMiwgMCk7XG4gICAgICAgIHRoaXMucmVuZGVyQ292ZXIubGluZVRvKGkgKiAzMiwgdGhpcy5nYW1lSGVpZ2h0ICogMzIpO1xuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCB0aGlzLmdhbWVIZWlnaHQ7IGkgKz0gMSkge1xuICAgICAgICB0aGlzLnJlbmRlckNvdmVyLm1vdmVUbygwLCBpICogMzIpO1xuICAgICAgICB0aGlzLnJlbmRlckNvdmVyLmxpbmVUbyh0aGlzLmdhbWVXaWR0aCAqIDMyLCBpICogMzIpO1xuICAgICAgfVxuICAgICAgdGhpcy5yZW5kZXJDb3Zlci5zdHJva2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZW5kZXJDb3Zlci5jbGVhclJlY3QoMCwgMCwgdGhpcy5nYW1lV2lkdGggKiAzMiwgdGhpcy5nYW1lSGVpZ2h0ICogMzIpO1xuICAgIH1cbiAgfVxuXG4gIGdldCBncmlkKCkge1xuICAgIHJldHVybiB0aGlzLmdyaWQ7XG4gIH1cblxuICBzZXQgZ3JpZChib29sKSB7XG4gICAgdGhpcy5ncmlkID0gYm9vbDtcbiAgfVxuXG4gIHBEb3duKGUpIHtcbiAgICB0aGlzLm1vdXNlWCA9IE1hdGguZmxvb3IoZS5vZmZzZXRYIC8gMzIpO1xuICAgIHRoaXMubW91c2VZID0gTWF0aC5mbG9vcihlLm9mZnNldFkgLyAzMik7XG4gICAgY29uc29sZS5sb2codGhpcy5tb3VzZVgsIHRoaXMubW91c2VZKTtcbiAgfVxufVxuIiwiLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuaW1wb3J0IE1zQXBwIGZyb20gJy4vbXNhcHAnO1xuXG4vLyBET01cbmNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWFpbkNvbnRhaW5lcicpO1xuXG5cbi8vIEluaXRpYWxpemUgTWFzYW9BcHAgbWFpbiBwcm9ncmFtXG5jb25zdCBtc2FwcCA9IG5ldyBNc0FwcChtYWluQ29udGFpbmVyKTtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cbmltcG9ydCBEYXRhTWFuYWdlciBmcm9tICcuL2RhdGFNYW5hZ2VyJztcbmltcG9ydCBFZGl0b3IgZnJvbSAnLi9lZGl0b3InO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNc0FwcCB7XG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIENvbnN0cmFjdG9yXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS1cbiAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XG4gICAgdGhpcy5IVE1MY29udGFpbmVyID0gY29udGFpbmVyO1xuXG4gICAgdGhpcy5kYXRhID0gbmV3IERhdGFNYW5hZ2VyKCk7XG4gICAgdGhpcy5lZGl0b3IgPSBuZXcgRWRpdG9yKHRoaXMuSFRNTGNvbnRhaW5lciwgdGhpcy5kYXRhLkdhbWVXaWR0aCwgdGhpcy5kYXRhLkdhbWVIZWlnaHQpO1xuICAgIC8vIHRoaXMuYXBwLnZpZXcuYWRkRXZlbnRMaXN0ZW5lcigncG9pbnRlcmRvd24nLCAoZSkgPT4geyB0aGlzLnBEb3duKGUpOyB9KTtcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==
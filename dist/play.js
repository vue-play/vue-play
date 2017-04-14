module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 66);
/******/ })
/************************************************************************/
/******/ ({

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var DEV = "production" === 'development';

var spots = {};

var play = function play(spot) {
  var isSpotComponent = (typeof spot === 'undefined' ? 'undefined' : _typeof(spot)) === 'object';

  var componentName = void 0;
  var _displayName = void 0;
  if (isSpotComponent) {
    componentName = spot.name;
    _displayName = spot.displayName || spot.name;
  } else {
    _displayName = spot;
  }

  return {
    add: function add(scenario, value) {
      var component = value;
      if (typeof value === 'string') {
        component = { template: value };
      } else if (typeof value === 'function') {
        component = { render: value };
      }
      component.example = component.example || component.template;

      // register spot component inscenario component
      if (isSpotComponent) {
        if (componentName) {
          // remove pre initialized component
          // since vue-loader uses vue.extend automatically
          delete component._Ctor;
          component.components = component.components || {};
          if (component.components[componentName]) {
            DEV && console.error(componentName + ' is already registered in your scenario');
          } else {
            component.components[componentName] = spot;
          }
        } else {
          DEV && console.error('You haven\'t either defined a name property or called .name() to set spot component name');
        }
      }

      spots[_displayName] = spots[_displayName] || [];
      spots[_displayName].push({
        scenario: scenario,
        component: component
      });
      return this;
    },


    // update the spot title
    displayName: function displayName(name) {
      _displayName = name;
      return this;
    },


    // update the spot component name for registering in scenario component
    name: function name(_name) {
      if (isSpotComponent) {
        componentName = _name;
        if (!_displayName) {
          _displayName = _name;
        }
      } else {
        DEV && console.error('.name() is only available when you use a component as play() argument');
      }
      return this;
    }
  };
};

var getSpots = function getSpots() {
  return spots;
};

exports.play = play;
exports.getSpots = getSpots;

/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(12);


/***/ })

/******/ });
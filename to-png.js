(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["to-png"] = factory();
	else
		root["to-png"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,'__esModule',{value:!0});function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}var cloneElement=function(a){var b=a.cloneNode(!1);void 0===a.children||0===a.children.length?b.innerHTML=a.innerHTML:[].concat(_toConsumableArray(a.children)).forEach(function(a){b.appendChild(cloneElement(a))});var c=window.getComputedStyle(a),d=b.style;return c.cssText?d.cssText=c.cssText:[].concat(_toConsumableArray(c)).forEach(function(a){return d.setProperty(a,c.getPropertyValue(a),c.getPropertyPriority(a))}),b},toCanvas=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:1;return toImage(a).then(function(c){var d=document.createElement('canvas'),e=d.getContext('2d');return d.width=a.offsetWidth*b,d.height=a.offsetHeight*b,e.scale(b,b),e.drawImage(c,0,0),d})},toImage=function(a){return new Promise(function(b,c){var d=new XMLSerializer().serializeToString(cloneElement(a)).replace(/#/g,'%23').replace(/\n/g,'%0A'),e='\n    data:image/svg+xml;charset=utf-8,\n    <svg\n      xmlns="http://www.w3.org/2000/svg"\n      width="'+a.offsetWidth+'" height="'+a.offsetHeight+'">\n\n      <foreignObject x="0" y="0" width="100%" height="100%">\n        '+d+'\n      </foreignObject>\n    </svg>\n  ',f=new Image;f.onload=function(){return b(f)},f.onerror=c,f.src=e})};exports.default=function(){return toCanvas.apply(void 0,arguments).then(function(a){return a.toDataURL()})};

/***/ })
/******/ ]);
});
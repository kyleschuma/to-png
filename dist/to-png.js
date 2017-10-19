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
Object.defineProperty(exports,'__esModule',{value:!0});function _toConsumableArray(a){if(Array.isArray(a)){for(var b=0,c=Array(a.length);b<a.length;b++)c[b]=a[b];return c}return Array.from(a)}var getDefaultStyle=function(a){var b=document.createElement(a.tagName);document.body.appendChild(b);var c=window.getComputedStyle(b),d=[].concat(_toConsumableArray(c)).reduce(function(a,b){return a[b]=c.getPropertyValue(b),a},{});return document.body.removeChild(b),d},cloneElement=function(a,b){var c=a.cloneNode(!1),d=[].concat(_toConsumableArray(a.childNodes));if(d.forEach(function(a){return cloneElement(a,function(a){return c.appendChild(a)})}),a.nodeType===Node.ELEMENT_NODE){var e=getDefaultStyle(a),f=window.getComputedStyle(a),g=c.style;[].concat(_toConsumableArray(f)).forEach(function(a){var b=f.getPropertyValue(a),c=f.getPropertyPriority(a);e[a]===b||g.setProperty(a,b,c)})}return b&&b(c),c},toWorkAround=function(a){return Promise.reject({foreignObjectsRequired:!0,message:'\n    Browser does support the foreignObject tag.\n\n    If you see this error, please consult https://github.com/kyleschuma/to-png#readme for a possible workaround.\n  ',svg:toSvg(a)})},toCanvas=function(a){var b=1<arguments.length&&arguments[1]!==void 0?arguments[1]:1;return toImage(a).then(function(c){var d=document.createElement('canvas'),e=d.getContext('2d');return d.width=a.offsetWidth*b,d.height=a.offsetHeight*b,e.scale(b,b),e.drawImage(c,0,0),d})},toImage=function(a){return new Promise(function(b,c){var d=new Image;d.onload=function(){return b(d)},d.onerror=function(a){return c(a)},d.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(toSvg(a))})},toSvg=function(a){return'\n  <svg\n    xmlns="http://www.w3.org/2000/svg"\n    width="'+a.offsetWidth+'" height="'+a.offsetHeight+'">\n    <foreignObject x="0" y="0" width="100%" height="100%">\n      '+new XMLSerializer().serializeToString(cloneElement(a))+'\n    </foreignObject>\n  </svg>\n'},supportsForeignObjects=function(){return document.implementation.hasFeature('http://www.w3.org/TR/SVG11/feature#Extensibility','1.1')},toResponse=function(a){return new Promise(function(b){return a.toBlob(function(c){return b({blob:c,dataUrl:a.toDataURL()})})})};exports.default=function(){return supportsForeignObjects()?toCanvas.apply(void 0,arguments).then(toResponse):toWorkAround.apply(void 0,arguments)};

/***/ })
/******/ ]);
});
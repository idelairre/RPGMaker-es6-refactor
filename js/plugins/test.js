/*:
 * 
 *    @plugindesc
 *    @author Ian Delairre
 * 
 *    @help Add premade factions to your game.
 * 
 *    @param Factions
 *    @desc name of factions json file in data folder
 *    @default Factions.json
 * 
 */
var factions =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _game = __webpack_require__(45);
	
	var _game2 = _interopRequireDefault(_game);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.Game = _game2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(2), __esModule: true };

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(3);
	module.exports = __webpack_require__(6).Object.assign;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(4);
	
	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(19)});

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(5)
	  , core      = __webpack_require__(6)
	  , ctx       = __webpack_require__(7)
	  , hide      = __webpack_require__(9)
	  , PROTOTYPE = 'prototype';
	
	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 5 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 6 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(8);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 8 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(10)
	  , createDesc = __webpack_require__(18);
	module.exports = __webpack_require__(14) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(11)
	  , IE8_DOM_DEFINE = __webpack_require__(13)
	  , toPrimitive    = __webpack_require__(17)
	  , dP             = Object.defineProperty;
	
	exports.f = __webpack_require__(14) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(14) && !__webpack_require__(15)(function(){
	  return Object.defineProperty(__webpack_require__(16)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(15)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 15 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(12)
	  , document = __webpack_require__(5).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(12);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 18 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(20)
	  , gOPS     = __webpack_require__(35)
	  , pIE      = __webpack_require__(36)
	  , toObject = __webpack_require__(37)
	  , IObject  = __webpack_require__(24)
	  , $assign  = Object.assign;
	
	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(15)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(21)
	  , enumBugKeys = __webpack_require__(34);
	
	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(22)
	  , toIObject    = __webpack_require__(23)
	  , arrayIndexOf = __webpack_require__(27)(false)
	  , IE_PROTO     = __webpack_require__(31)('IE_PROTO');
	
	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 22 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(24)
	  , defined = __webpack_require__(26);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(25);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var toString = {}.toString;
	
	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 26 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(23)
	  , toLength  = __webpack_require__(28)
	  , toIndex   = __webpack_require__(30);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(29)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(32)('keys')
	  , uid    = __webpack_require__(33);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(5)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 34 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 35 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 36 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(26);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	
	exports.default = function (instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _defineProperty = __webpack_require__(40);
	
	var _defineProperty2 = _interopRequireDefault(_defineProperty);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function () {
	  function defineProperties(target, props) {
	    for (var i = 0; i < props.length; i++) {
	      var descriptor = props[i];
	      descriptor.enumerable = descriptor.enumerable || false;
	      descriptor.configurable = true;
	      if ("value" in descriptor) descriptor.writable = true;
	      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
	    }
	  }
	
	  return function (Constructor, protoProps, staticProps) {
	    if (protoProps) defineProperties(Constructor.prototype, protoProps);
	    if (staticProps) defineProperties(Constructor, staticProps);
	    return Constructor;
	  };
	}();

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(41), __esModule: true };

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(42);
	var $Object = __webpack_require__(6).Object;
	module.exports = function defineProperty(it, key, desc){
	  return $Object.defineProperty(it, key, desc);
	};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4);
	// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
	$export($export.S + $export.F * !__webpack_require__(14), 'Object', {defineProperty: __webpack_require__(10).f});

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(44);


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Standalone extraction of Backbone.Events, no external dependency required.
	 * Degrades nicely when Backone/underscore are already available in the current
	 * global context.
	 *
	 * Note that docs suggest to use underscore's `_.extend()` method to add Events
	 * support to some given object. A `mixin()` method has been added to the Events
	 * prototype to avoid using underscore for that sole purpose:
	 *
	 *     var myEventEmitter = BackboneEvents.mixin({});
	 *
	 * Or for a function constructor:
	 *
	 *     function MyConstructor(){}
	 *     MyConstructor.prototype.foo = function(){}
	 *     BackboneEvents.mixin(MyConstructor.prototype);
	 *
	 * (c) 2009-2013 Jeremy Ashkenas, DocumentCloud Inc.
	 * (c) 2013 Nicolas Perriault
	 */
	/* global exports:true, define, module */
	(function() {
	  var root = this,
	      nativeForEach = Array.prototype.forEach,
	      hasOwnProperty = Object.prototype.hasOwnProperty,
	      slice = Array.prototype.slice,
	      idCounter = 0;
	
	  // Returns a partial implementation matching the minimal API subset required
	  // by Backbone.Events
	  function miniscore() {
	    return {
	      keys: Object.keys || function (obj) {
	        if (typeof obj !== "object" && typeof obj !== "function" || obj === null) {
	          throw new TypeError("keys() called on a non-object");
	        }
	        var key, keys = [];
	        for (key in obj) {
	          if (obj.hasOwnProperty(key)) {
	            keys[keys.length] = key;
	          }
	        }
	        return keys;
	      },
	
	      uniqueId: function(prefix) {
	        var id = ++idCounter + '';
	        return prefix ? prefix + id : id;
	      },
	
	      has: function(obj, key) {
	        return hasOwnProperty.call(obj, key);
	      },
	
	      each: function(obj, iterator, context) {
	        if (obj == null) return;
	        if (nativeForEach && obj.forEach === nativeForEach) {
	          obj.forEach(iterator, context);
	        } else if (obj.length === +obj.length) {
	          for (var i = 0, l = obj.length; i < l; i++) {
	            iterator.call(context, obj[i], i, obj);
	          }
	        } else {
	          for (var key in obj) {
	            if (this.has(obj, key)) {
	              iterator.call(context, obj[key], key, obj);
	            }
	          }
	        }
	      },
	
	      once: function(func) {
	        var ran = false, memo;
	        return function() {
	          if (ran) return memo;
	          ran = true;
	          memo = func.apply(this, arguments);
	          func = null;
	          return memo;
	        };
	      }
	    };
	  }
	
	  var _ = miniscore(), Events;
	
	  // Backbone.Events
	  // ---------------
	
	  // A module that can be mixed in to *any object* in order to provide it with
	  // custom events. You may bind with `on` or remove with `off` callback
	  // functions to an event; `trigger`-ing an event fires all callbacks in
	  // succession.
	  //
	  //     var object = {};
	  //     _.extend(object, Backbone.Events);
	  //     object.on('expand', function(){ alert('expanded'); });
	  //     object.trigger('expand');
	  //
	  Events = {
	
	    // Bind an event to a `callback` function. Passing `"all"` will bind
	    // the callback to all events fired.
	    on: function(name, callback, context) {
	      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
	      this._events || (this._events = {});
	      var events = this._events[name] || (this._events[name] = []);
	      events.push({callback: callback, context: context, ctx: context || this});
	      return this;
	    },
	
	    // Bind an event to only be triggered a single time. After the first time
	    // the callback is invoked, it will be removed.
	    once: function(name, callback, context) {
	      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
	      var self = this;
	      var once = _.once(function() {
	        self.off(name, once);
	        callback.apply(this, arguments);
	      });
	      once._callback = callback;
	      return this.on(name, once, context);
	    },
	
	    // Remove one or many callbacks. If `context` is null, removes all
	    // callbacks with that function. If `callback` is null, removes all
	    // callbacks for the event. If `name` is null, removes all bound
	    // callbacks for all events.
	    off: function(name, callback, context) {
	      var retain, ev, events, names, i, l, j, k;
	      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
	      if (!name && !callback && !context) {
	        this._events = {};
	        return this;
	      }
	
	      names = name ? [name] : _.keys(this._events);
	      for (i = 0, l = names.length; i < l; i++) {
	        name = names[i];
	        if (events = this._events[name]) {
	          this._events[name] = retain = [];
	          if (callback || context) {
	            for (j = 0, k = events.length; j < k; j++) {
	              ev = events[j];
	              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
	                  (context && context !== ev.context)) {
	                retain.push(ev);
	              }
	            }
	          }
	          if (!retain.length) delete this._events[name];
	        }
	      }
	
	      return this;
	    },
	
	    // Trigger one or many events, firing all bound callbacks. Callbacks are
	    // passed the same arguments as `trigger` is, apart from the event name
	    // (unless you're listening on `"all"`, which will cause your callback to
	    // receive the true name of the event as the first argument).
	    trigger: function(name) {
	      if (!this._events) return this;
	      var args = slice.call(arguments, 1);
	      if (!eventsApi(this, 'trigger', name, args)) return this;
	      var events = this._events[name];
	      var allEvents = this._events.all;
	      if (events) triggerEvents(events, args);
	      if (allEvents) triggerEvents(allEvents, arguments);
	      return this;
	    },
	
	    // Tell this object to stop listening to either specific events ... or
	    // to every object it's currently listening to.
	    stopListening: function(obj, name, callback) {
	      var listeners = this._listeners;
	      if (!listeners) return this;
	      var deleteListener = !name && !callback;
	      if (typeof name === 'object') callback = this;
	      if (obj) (listeners = {})[obj._listenerId] = obj;
	      for (var id in listeners) {
	        listeners[id].off(name, callback, this);
	        if (deleteListener) delete this._listeners[id];
	      }
	      return this;
	    }
	
	  };
	
	  // Regular expression used to split event strings.
	  var eventSplitter = /\s+/;
	
	  // Implement fancy features of the Events API such as multiple event
	  // names `"change blur"` and jQuery-style event maps `{change: action}`
	  // in terms of the existing API.
	  var eventsApi = function(obj, action, name, rest) {
	    if (!name) return true;
	
	    // Handle event maps.
	    if (typeof name === 'object') {
	      for (var key in name) {
	        obj[action].apply(obj, [key, name[key]].concat(rest));
	      }
	      return false;
	    }
	
	    // Handle space separated event names.
	    if (eventSplitter.test(name)) {
	      var names = name.split(eventSplitter);
	      for (var i = 0, l = names.length; i < l; i++) {
	        obj[action].apply(obj, [names[i]].concat(rest));
	      }
	      return false;
	    }
	
	    return true;
	  };
	
	  // A difficult-to-believe, but optimized internal dispatch function for
	  // triggering events. Tries to keep the usual cases speedy (most internal
	  // Backbone events have 3 arguments).
	  var triggerEvents = function(events, args) {
	    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
	    switch (args.length) {
	      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
	      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
	      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
	      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
	      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
	    }
	  };
	
	  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};
	
	  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
	  // listen to an event in another object ... keeping track of what it's
	  // listening to.
	  _.each(listenMethods, function(implementation, method) {
	    Events[method] = function(obj, name, callback) {
	      var listeners = this._listeners || (this._listeners = {});
	      var id = obj._listenerId || (obj._listenerId = _.uniqueId('l'));
	      listeners[id] = obj;
	      if (typeof name === 'object') callback = this;
	      obj[implementation](name, callback, this);
	      return this;
	    };
	  });
	
	  // Aliases for backwards compatibility.
	  Events.bind   = Events.on;
	  Events.unbind = Events.off;
	
	  // Mixin utility
	  Events.mixin = function(proto) {
	    var exports = ['on', 'once', 'off', 'trigger', 'stopListening', 'listenTo',
	                   'listenToOnce', 'bind', 'unbind'];
	    _.each(exports, function(name) {
	      proto[name] = this[name];
	    }, this);
	    return proto;
	  };
	
	  // Export Events as BackboneEvents depending on current context
	  if (true) {
	    if (typeof module !== 'undefined' && module.exports) {
	      exports = module.exports = Events;
	    }
	    exports.BackboneEvents = Events;
	  }else if (typeof define === "function"  && typeof define.amd == "object") {
	    define(function() {
	      return Events;
	    });
	  } else {
	    root.BackboneEvents = Events;
	  }
	})(this);


/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.default = undefined;
	
	var _assign = __webpack_require__(1);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _class, _temp;
	
	var _backboneEventsStandalone = __webpack_require__(43);
	
	var _backboneEventsStandalone2 = _interopRequireDefault(_backboneEventsStandalone);
	
	var _events = __webpack_require__(46);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _npc = __webpack_require__(47);
	
	var _npc2 = _interopRequireDefault(_npc);
	
	var _npcs = __webpack_require__(52);
	
	var NPCS = _interopRequireWildcard(_npcs);
	
	var _factionCreate = __webpack_require__(102);
	
	var _factionCreate2 = _interopRequireDefault(_factionCreate);
	
	var _factionEdit = __webpack_require__(108);
	
	var _factionEdit2 = _interopRequireDefault(_factionEdit);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Game = (_temp = _class = function () {
		function Game() {
			(0, _classCallCheck3.default)(this, Game);
		}
	
		(0, _createClass3.default)(Game, null, [{
			key: 'incrementDay',
			value: function incrementDay() {
				var amt = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
	
				Game.day += amt;
			}
		}, {
			key: 'getNpc',
			value: function getNpc(name) {
				return _npc2.default.getNpc(name);
			}
		}, {
			key: 'showFactionDialog',
			value: function showFactionDialog() {
				var choices = ['whatever', 'lol', 'create faction'];
				if (Faction.playerFactionExists) {
					choices[2] = 'edit faction';
					choices.push('faction info');
				}
				$gameMessage.add('What do you want to do?');
				$gameMessage.setChoices(choices, 0, -1);
	
				$gameMessage.setChoiceCallback(function (choice) {
					if (choice === 2) {
						SceneManager.goto(_factionCreate2.default);
					} else if (choice === 3) {
						SceneManager.goto(_factionEdit2.default);
					}
				});
			}
		}]);
		return Game;
	}(), _class.day = 0, _temp);
	exports.default = Game;
	
	
	(0, _assign2.default)(Game, _backboneEventsStandalone2.default);
	
	Game.listenTo(_events2.default, 'nextDay', Game.incrementDay);
	
	window.NPC = _npc2.default;
	module.exports = exports['default'];

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(1);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _backboneEventsStandalone = __webpack_require__(43);
	
	var _backboneEventsStandalone2 = _interopRequireDefault(_backboneEventsStandalone);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Events = (0, _assign2.default)({}, _backboneEventsStandalone2.default);
	
	Events.on('nextDay', function () {
	  return $gameMessage.add('new day');
	});
	
	Events.on('tick', function () {
	  return console.log('tick', hours);
	});
	
	// document.addEventListener('keydown', e => {
	// 	if (e.keyCode === 220) {
	//     e.preventDefault();
	//     hours += hours % 24;
	//     $gameVariables.setValue(1, hours);
	// 		Events.trigger('nextDay');
	// 	}
	// });
	//
	// let hours = 20;
	//
	// if ($gameVariables) {
	//   $gameVariables.setValue(1, hours);
	// }
	//
	// setInterval(() => {
	//   hours++;
	//   $gameVariables.setValue(1, hours);
	//   Events.trigger('tick');
	//   if (hours % 24 === 0) {
	//     Events.trigger('nextDay');
	//   }
	// }, 10000);
	
	
	exports.default = Events;
	module.exports = exports['default'];

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _assign = __webpack_require__(1);
	
	var _assign2 = _interopRequireDefault(_assign);
	
	var _keys = __webpack_require__(48);
	
	var _keys2 = _interopRequireDefault(_keys);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _backboneEventsStandalone = __webpack_require__(43);
	
	var _backboneEventsStandalone2 = _interopRequireDefault(_backboneEventsStandalone);
	
	var _events = __webpack_require__(46);
	
	var _events2 = _interopRequireDefault(_events);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var npcs = [];
	
	var NPC = function () {
	  function NPC() {
	    (0, _classCallCheck3.default)(this, NPC);
	
	    this.bindListeners();
	    NPC.addNpc(this);
	  }
	
	  (0, _createClass3.default)(NPC, [{
	    key: 'bindListeners',
	    value: function bindListeners() {
	      this.listenTo(_events2.default, 'tick', this.updateIdeas.bind(this));
	    }
	  }, {
	    key: 'getMapData',
	    value: function getMapData() {
	      var _$dataMap = $dataMap;
	      var events = _$dataMap.events;
	
	      for (var i = 0; i < $dataMap.events.length; i++) {
	        if (events[i] && events[i].name === this.name) {
	          return events[i];
	        }
	      }
	    }
	  }, {
	    key: 'getEvent',
	    value: function getEvent() {
	      var events = $gameMap._events;
	      var data = this.getMapData();
	      for (var i = 0; i < $gameMap._events.length; i++) {
	        if (events[i] && events[i]._mapId === data.id) {
	          return events[i];
	        }
	      }
	    }
	  }, {
	    key: 'getRelationship',
	    value: function getRelationship(name) {
	      return this.knows[name];
	    }
	  }, {
	    key: 'hasRelationship',
	    value: function hasRelationship(name) {
	      return !!this.knows[name];
	    }
	  }, {
	    key: 'parsePlayerMeta',
	    value: function parsePlayerMeta() {
	      return $dataActors[1].meta;
	    }
	  }, {
	    key: 'joinFaction',
	    value: function joinFaction(faction) {
	      faction.addMember(this);
	    }
	  }, {
	    key: 'updateIdeas',
	    value: function updateIdeas() {
	      var _this = this;
	
	      if (!this.knows) {
	        return;
	      }
	      (0, _keys2.default)(this.knows).forEach(function (name) {
	        var linkStrength = _this.getRelationship(name);
	        var other = NPC.getNpc(name);
	
	        // update npc ideology values
	        // increase target npc's values toward source npc's values by a fraction of the source npc's link strength
	        (0, _keys2.default)(other.ideology).forEach(function (key) {
	          if (other.ideology[key] < 10) {
	            other.ideology[key] += 0.01 * linkStrength;
	          }
	        });
	      });
	    }
	  }], [{
	    key: 'addNpc',
	    value: function addNpc(npc) {
	      npcs.push(npc);
	    }
	  }, {
	    key: 'getNpc',
	    value: function getNpc(name) {
	      for (var i = 0; i < npcs.length; i++) {
	        if (npcs[i].name && npcs[i].name === name) {
	          return npcs[i];
	        }
	      }
	    }
	  }, {
	    key: 'npcs',
	    get: function get() {
	      return npcs;
	    }
	  }]);
	  return NPC;
	}();
	
	(0, _assign2.default)(NPC.prototype, _backboneEventsStandalone2.default);
	
	exports.default = NPC;
	module.exports = exports['default'];

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(49), __esModule: true };

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(50);
	module.exports = __webpack_require__(6).Object.keys;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 Object.keys(O)
	var toObject = __webpack_require__(37)
	  , $keys    = __webpack_require__(20);
	
	__webpack_require__(51)('keys', function(){
	  return function keys(it){
	    return $keys(toObject(it));
	  };
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	// most Object methods by ES6 should accept primitives
	var $export = __webpack_require__(4)
	  , core    = __webpack_require__(6)
	  , fails   = __webpack_require__(15);
	module.exports = function(KEY, exec){
	  var fn  = (core.Object || {})[KEY] || Object[KEY]
	    , exp = {};
	  exp[KEY] = exec(fn);
	  $export($export.S + $export.F * fails(function(){ fn(1); }), 'Object', exp);
	};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Tilly = exports.Lulu = undefined;
	
	var _lulu = __webpack_require__(53);
	
	var _lulu2 = _interopRequireDefault(_lulu);
	
	var _tilly = __webpack_require__(101);
	
	var _tilly2 = _interopRequireDefault(_tilly);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.Lulu = _lulu2.default;
	exports.Tilly = _tilly2.default;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(54);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(58);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(93);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _events = __webpack_require__(46);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _npc = __webpack_require__(47);
	
	var _npc2 = _interopRequireDefault(_npc);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Lulu = function (_NPC) {
	  (0, _inherits3.default)(Lulu, _NPC);
	
	  function Lulu() {
	    (0, _classCallCheck3.default)(this, Lulu);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Lulu.__proto__ || (0, _getPrototypeOf2.default)(Lulu)).call(this));
	
	    _this.name = 'Lulu';
	    _this.gold = 100;
	    _this.goldPerDay = 12;
	    _this.ideology = {
	      establishment: -10,
	      hierarchical: -10,
	      militant: 10,
	      popular: 10
	    };
	    _this.knows = {
	      Tilly: 5
	    };
	    _this.listenTo(_events2.default, 'nextDay', function () {
	      _this.gold += _this.goldPerDay;
	    });
	    return _this;
	  }
	
	  (0, _createClass3.default)(Lulu, [{
	    key: 'dialog',
	    value: function dialog() {
	      var _this2 = this;
	
	      var choices = ['Fuck off', 'How much gold do you have?'];
	      if (Faction.playerFactionExists) {
	        if (!Faction.getPlayerFaction().getMember(this.name)) {
	          choices.push('Join my faction');
	        }
	      }
	      $gameMessage.add('Whats up?');
	      $gameMessage.setChoices(choices, 0, -1);
	
	      $gameMessage.setChoiceCallback(function (choice) {
	        if (choice === 2) {
	          _this2.joinFaction(Faction.getPlayerFaction());
	          setTimeout(function () {
	            $gameMessage.newPage();
	            $gameMessage.add('Lets make bitches out of bitches');
	          }, 1);
	        } else if (choice === 1) {
	          setTimeout(function () {
	            $gameMessage.newPage();
	            $gameMessage.add('I have ' + _this2.gold + ' gold');
	          }, 1);
	        } else {
	          setTimeout(function () {
	            $gameMessage.add('Ure a silly cunt');
	          }, 1);
	        }
	      });
	    }
	  }]);
	  return Lulu;
	}(_npc2.default);
	
	var lulu = new Lulu();
	
	exports.default = lulu;
	module.exports = exports['default'];

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(55), __esModule: true };

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(56);
	module.exports = __webpack_require__(6).Object.getPrototypeOf;

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 Object.getPrototypeOf(O)
	var toObject        = __webpack_require__(37)
	  , $getPrototypeOf = __webpack_require__(57);
	
	__webpack_require__(51)('getPrototypeOf', function(){
	  return function getPrototypeOf(it){
	    return $getPrototypeOf(toObject(it));
	  };
	});

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has         = __webpack_require__(22)
	  , toObject    = __webpack_require__(37)
	  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
	  , ObjectProto = Object.prototype;
	
	module.exports = Object.getPrototypeOf || function(O){
	  O = toObject(O);
	  if(has(O, IE_PROTO))return O[IE_PROTO];
	  if(typeof O.constructor == 'function' && O instanceof O.constructor){
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _typeof2 = __webpack_require__(59);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (self, call) {
	  if (!self) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }
	
	  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
	};

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _iterator = __webpack_require__(60);
	
	var _iterator2 = _interopRequireDefault(_iterator);
	
	var _symbol = __webpack_require__(79);
	
	var _symbol2 = _interopRequireDefault(_symbol);
	
	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj; };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(61), __esModule: true };

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(62);
	__webpack_require__(74);
	module.exports = __webpack_require__(78).f('iterator');

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var $at  = __webpack_require__(63)(true);
	
	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(64)(String, 'String', function(iterated){
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , index = this._i
	    , point;
	  if(index >= O.length)return {value: undefined, done: true};
	  point = $at(O, index);
	  this._i += point.length;
	  return {value: point, done: false};
	});

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(29)
	  , defined   = __webpack_require__(26);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function(TO_STRING){
	  return function(that, pos){
	    var s = String(defined(that))
	      , i = toInteger(pos)
	      , l = s.length
	      , a, b;
	    if(i < 0 || i >= l)return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY        = __webpack_require__(65)
	  , $export        = __webpack_require__(4)
	  , redefine       = __webpack_require__(66)
	  , hide           = __webpack_require__(9)
	  , has            = __webpack_require__(22)
	  , Iterators      = __webpack_require__(67)
	  , $iterCreate    = __webpack_require__(68)
	  , setToStringTag = __webpack_require__(72)
	  , getPrototypeOf = __webpack_require__(57)
	  , ITERATOR       = __webpack_require__(73)('iterator')
	  , BUGGY          = !([].keys && 'next' in [].keys()) // Safari has buggy iterators w/o `next`
	  , FF_ITERATOR    = '@@iterator'
	  , KEYS           = 'keys'
	  , VALUES         = 'values';
	
	var returnThis = function(){ return this; };
	
	module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED){
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function(kind){
	    if(!BUGGY && kind in proto)return proto[kind];
	    switch(kind){
	      case KEYS: return function keys(){ return new Constructor(this, kind); };
	      case VALUES: return function values(){ return new Constructor(this, kind); };
	    } return function entries(){ return new Constructor(this, kind); };
	  };
	  var TAG        = NAME + ' Iterator'
	    , DEF_VALUES = DEFAULT == VALUES
	    , VALUES_BUG = false
	    , proto      = Base.prototype
	    , $native    = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT]
	    , $default   = $native || getMethod(DEFAULT)
	    , $entries   = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined
	    , $anyNative = NAME == 'Array' ? proto.entries || $native : $native
	    , methods, key, IteratorPrototype;
	  // Fix native
	  if($anyNative){
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base));
	    if(IteratorPrototype !== Object.prototype){
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if(!LIBRARY && !has(IteratorPrototype, ITERATOR))hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if(DEF_VALUES && $native && $native.name !== VALUES){
	    VALUES_BUG = true;
	    $default = function values(){ return $native.call(this); };
	  }
	  // Define iterator
	  if((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])){
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG]  = returnThis;
	  if(DEFAULT){
	    methods = {
	      values:  DEF_VALUES ? $default : getMethod(VALUES),
	      keys:    IS_SET     ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if(FORCED)for(key in methods){
	      if(!(key in proto))redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};

/***/ },
/* 65 */
/***/ function(module, exports) {

	module.exports = true;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(9);

/***/ },
/* 67 */
/***/ function(module, exports) {

	module.exports = {};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var create         = __webpack_require__(69)
	  , descriptor     = __webpack_require__(18)
	  , setToStringTag = __webpack_require__(72)
	  , IteratorPrototype = {};
	
	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(9)(IteratorPrototype, __webpack_require__(73)('iterator'), function(){ return this; });
	
	module.exports = function(Constructor, NAME, next){
	  Constructor.prototype = create(IteratorPrototype, {next: descriptor(1, next)});
	  setToStringTag(Constructor, NAME + ' Iterator');
	};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject    = __webpack_require__(11)
	  , dPs         = __webpack_require__(70)
	  , enumBugKeys = __webpack_require__(34)
	  , IE_PROTO    = __webpack_require__(31)('IE_PROTO')
	  , Empty       = function(){ /* empty */ }
	  , PROTOTYPE   = 'prototype';
	
	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function(){
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(16)('iframe')
	    , i      = enumBugKeys.length
	    , lt     = '<'
	    , gt     = '>'
	    , iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(71).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while(i--)delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};
	
	module.exports = Object.create || function create(O, Properties){
	  var result;
	  if(O !== null){
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty;
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	var dP       = __webpack_require__(10)
	  , anObject = __webpack_require__(11)
	  , getKeys  = __webpack_require__(20);
	
	module.exports = __webpack_require__(14) ? Object.defineProperties : function defineProperties(O, Properties){
	  anObject(O);
	  var keys   = getKeys(Properties)
	    , length = keys.length
	    , i = 0
	    , P;
	  while(length > i)dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(5).document && document.documentElement;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	var def = __webpack_require__(10).f
	  , has = __webpack_require__(22)
	  , TAG = __webpack_require__(73)('toStringTag');
	
	module.exports = function(it, tag, stat){
	  if(it && !has(it = stat ? it : it.prototype, TAG))def(it, TAG, {configurable: true, value: tag});
	};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	var store      = __webpack_require__(32)('wks')
	  , uid        = __webpack_require__(33)
	  , Symbol     = __webpack_require__(5).Symbol
	  , USE_SYMBOL = typeof Symbol == 'function';
	
	var $exports = module.exports = function(name){
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};
	
	$exports.store = store;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(75);
	var global        = __webpack_require__(5)
	  , hide          = __webpack_require__(9)
	  , Iterators     = __webpack_require__(67)
	  , TO_STRING_TAG = __webpack_require__(73)('toStringTag');
	
	for(var collections = ['NodeList', 'DOMTokenList', 'MediaList', 'StyleSheetList', 'CSSRuleList'], i = 0; i < 5; i++){
	  var NAME       = collections[i]
	    , Collection = global[NAME]
	    , proto      = Collection && Collection.prototype;
	  if(proto && !proto[TO_STRING_TAG])hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(76)
	  , step             = __webpack_require__(77)
	  , Iterators        = __webpack_require__(67)
	  , toIObject        = __webpack_require__(23);
	
	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(64)(Array, 'Array', function(iterated, kind){
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function(){
	  var O     = this._t
	    , kind  = this._k
	    , index = this._i++;
	  if(!O || index >= O.length){
	    this._t = undefined;
	    return step(1);
	  }
	  if(kind == 'keys'  )return step(0, index);
	  if(kind == 'values')return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');
	
	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;
	
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

/***/ },
/* 76 */
/***/ function(module, exports) {

	module.exports = function(){ /* empty */ };

/***/ },
/* 77 */
/***/ function(module, exports) {

	module.exports = function(done, value){
	  return {value: value, done: !!done};
	};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(73);

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(80), __esModule: true };

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(81);
	__webpack_require__(90);
	__webpack_require__(91);
	__webpack_require__(92);
	module.exports = __webpack_require__(6).Symbol;

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global         = __webpack_require__(5)
	  , has            = __webpack_require__(22)
	  , DESCRIPTORS    = __webpack_require__(14)
	  , $export        = __webpack_require__(4)
	  , redefine       = __webpack_require__(66)
	  , META           = __webpack_require__(82).KEY
	  , $fails         = __webpack_require__(15)
	  , shared         = __webpack_require__(32)
	  , setToStringTag = __webpack_require__(72)
	  , uid            = __webpack_require__(33)
	  , wks            = __webpack_require__(73)
	  , wksExt         = __webpack_require__(78)
	  , wksDefine      = __webpack_require__(83)
	  , keyOf          = __webpack_require__(84)
	  , enumKeys       = __webpack_require__(85)
	  , isArray        = __webpack_require__(86)
	  , anObject       = __webpack_require__(11)
	  , toIObject      = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(17)
	  , createDesc     = __webpack_require__(18)
	  , _create        = __webpack_require__(69)
	  , gOPNExt        = __webpack_require__(87)
	  , $GOPD          = __webpack_require__(89)
	  , $DP            = __webpack_require__(10)
	  , $keys          = __webpack_require__(20)
	  , gOPD           = $GOPD.f
	  , dP             = $DP.f
	  , gOPN           = gOPNExt.f
	  , $Symbol        = global.Symbol
	  , $JSON          = global.JSON
	  , _stringify     = $JSON && $JSON.stringify
	  , PROTOTYPE      = 'prototype'
	  , HIDDEN         = wks('_hidden')
	  , TO_PRIMITIVE   = wks('toPrimitive')
	  , isEnum         = {}.propertyIsEnumerable
	  , SymbolRegistry = shared('symbol-registry')
	  , AllSymbols     = shared('symbols')
	  , OPSymbols      = shared('op-symbols')
	  , ObjectProto    = Object[PROTOTYPE]
	  , USE_NATIVE     = typeof $Symbol == 'function'
	  , QObject        = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;
	
	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function(){
	  return _create(dP({}, 'a', {
	    get: function(){ return dP(this, 'a', {value: 7}).a; }
	  })).a != 7;
	}) ? function(it, key, D){
	  var protoDesc = gOPD(ObjectProto, key);
	  if(protoDesc)delete ObjectProto[key];
	  dP(it, key, D);
	  if(protoDesc && it !== ObjectProto)dP(ObjectProto, key, protoDesc);
	} : dP;
	
	var wrap = function(tag){
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};
	
	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function(it){
	  return typeof it == 'symbol';
	} : function(it){
	  return it instanceof $Symbol;
	};
	
	var $defineProperty = function defineProperty(it, key, D){
	  if(it === ObjectProto)$defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if(has(AllSymbols, key)){
	    if(!D.enumerable){
	      if(!has(it, HIDDEN))dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if(has(it, HIDDEN) && it[HIDDEN][key])it[HIDDEN][key] = false;
	      D = _create(D, {enumerable: createDesc(0, false)});
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P){
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P))
	    , i    = 0
	    , l = keys.length
	    , key;
	  while(l > i)$defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P){
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key){
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if(this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key){
	  it  = toIObject(it);
	  key = toPrimitive(key, true);
	  if(it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key))return;
	  var D = gOPD(it, key);
	  if(D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key]))D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it){
	  var names  = gOPN(toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META)result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it){
	  var IS_OP  = it === ObjectProto
	    , names  = gOPN(IS_OP ? OPSymbols : toIObject(it))
	    , result = []
	    , i      = 0
	    , key;
	  while(names.length > i){
	    if(has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true))result.push(AllSymbols[key]);
	  } return result;
	};
	
	// 19.4.1.1 Symbol([description])
	if(!USE_NATIVE){
	  $Symbol = function Symbol(){
	    if(this instanceof $Symbol)throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function(value){
	      if(this === ObjectProto)$set.call(OPSymbols, value);
	      if(has(this, HIDDEN) && has(this[HIDDEN], tag))this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if(DESCRIPTORS && setter)setSymbolDesc(ObjectProto, tag, {configurable: true, set: $set});
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString(){
	    return this._k;
	  });
	
	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f   = $defineProperty;
	  __webpack_require__(88).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(36).f  = $propertyIsEnumerable;
	  __webpack_require__(35).f = $getOwnPropertySymbols;
	
	  if(DESCRIPTORS && !__webpack_require__(65)){
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }
	
	  wksExt.f = function(name){
	    return wrap(wks(name));
	  }
	}
	
	$export($export.G + $export.W + $export.F * !USE_NATIVE, {Symbol: $Symbol});
	
	for(var symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), i = 0; symbols.length > i; )wks(symbols[i++]);
	
	for(var symbols = $keys(wks.store), i = 0; symbols.length > i; )wksDefine(symbols[i++]);
	
	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function(key){
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(key){
	    if(isSymbol(key))return keyOf(SymbolRegistry, key);
	    throw TypeError(key + ' is not a symbol!');
	  },
	  useSetter: function(){ setter = true; },
	  useSimple: function(){ setter = false; }
	});
	
	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});
	
	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function(){
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({a: S}) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it){
	    if(it === undefined || isSymbol(it))return; // IE8 returns string on undefined
	    var args = [it]
	      , i    = 1
	      , replacer, $replacer;
	    while(arguments.length > i)args.push(arguments[i++]);
	    replacer = args[1];
	    if(typeof replacer == 'function')$replacer = replacer;
	    if($replacer || !isArray(replacer))replacer = function(key, value){
	      if($replacer)value = $replacer.call(this, key, value);
	      if(!isSymbol(value))return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});
	
	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(9)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	var META     = __webpack_require__(33)('meta')
	  , isObject = __webpack_require__(12)
	  , has      = __webpack_require__(22)
	  , setDesc  = __webpack_require__(10).f
	  , id       = 0;
	var isExtensible = Object.isExtensible || function(){
	  return true;
	};
	var FREEZE = !__webpack_require__(15)(function(){
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function(it){
	  setDesc(it, META, {value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  }});
	};
	var fastKey = function(it, create){
	  // return primitive with prefix
	  if(!isObject(it))return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return 'F';
	    // not necessary to add metadata
	    if(!create)return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function(it, create){
	  if(!has(it, META)){
	    // can't set metadata to uncaught frozen object
	    if(!isExtensible(it))return true;
	    // not necessary to add metadata
	    if(!create)return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function(it){
	  if(FREEZE && meta.NEED && isExtensible(it) && !has(it, META))setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY:      META,
	  NEED:     false,
	  fastKey:  fastKey,
	  getWeak:  getWeak,
	  onFreeze: onFreeze
	};

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	var global         = __webpack_require__(5)
	  , core           = __webpack_require__(6)
	  , LIBRARY        = __webpack_require__(65)
	  , wksExt         = __webpack_require__(78)
	  , defineProperty = __webpack_require__(10).f;
	module.exports = function(name){
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if(name.charAt(0) != '_' && !(name in $Symbol))defineProperty($Symbol, name, {value: wksExt.f(name)});
	};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var getKeys   = __webpack_require__(20)
	  , toIObject = __webpack_require__(23);
	module.exports = function(object, el){
	  var O      = toIObject(object)
	    , keys   = getKeys(O)
	    , length = keys.length
	    , index  = 0
	    , key;
	  while(length > index)if(O[key = keys[index++]] === el)return key;
	};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(20)
	  , gOPS    = __webpack_require__(35)
	  , pIE     = __webpack_require__(36);
	module.exports = function(it){
	  var result     = getKeys(it)
	    , getSymbols = gOPS.f;
	  if(getSymbols){
	    var symbols = getSymbols(it)
	      , isEnum  = pIE.f
	      , i       = 0
	      , key;
	    while(symbols.length > i)if(isEnum.call(it, key = symbols[i++]))result.push(key);
	  } return result;
	};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(25);
	module.exports = Array.isArray || function isArray(arg){
	  return cof(arg) == 'Array';
	};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(23)
	  , gOPN      = __webpack_require__(88).f
	  , toString  = {}.toString;
	
	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];
	
	var getWindowNames = function(it){
	  try {
	    return gOPN(it);
	  } catch(e){
	    return windowNames.slice();
	  }
	};
	
	module.exports.f = function getOwnPropertyNames(it){
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys      = __webpack_require__(21)
	  , hiddenKeys = __webpack_require__(34).concat('length', 'prototype');
	
	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O){
	  return $keys(O, hiddenKeys);
	};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	var pIE            = __webpack_require__(36)
	  , createDesc     = __webpack_require__(18)
	  , toIObject      = __webpack_require__(23)
	  , toPrimitive    = __webpack_require__(17)
	  , has            = __webpack_require__(22)
	  , IE8_DOM_DEFINE = __webpack_require__(13)
	  , gOPD           = Object.getOwnPropertyDescriptor;
	
	exports.f = __webpack_require__(14) ? gOPD : function getOwnPropertyDescriptor(O, P){
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if(IE8_DOM_DEFINE)try {
	    return gOPD(O, P);
	  } catch(e){ /* empty */ }
	  if(has(O, P))return createDesc(!pIE.f.call(O, P), O[P]);
	};

/***/ },
/* 90 */
/***/ function(module, exports) {



/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(83)('asyncIterator');

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(83)('observable');

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _setPrototypeOf = __webpack_require__(94);
	
	var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);
	
	var _create = __webpack_require__(98);
	
	var _create2 = _interopRequireDefault(_create);
	
	var _typeof2 = __webpack_require__(59);
	
	var _typeof3 = _interopRequireDefault(_typeof2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function (subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
	  }
	
	  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      enumerable: false,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
	};

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(95), __esModule: true };

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(96);
	module.exports = __webpack_require__(6).Object.setPrototypeOf;

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.19 Object.setPrototypeOf(O, proto)
	var $export = __webpack_require__(4);
	$export($export.S, 'Object', {setPrototypeOf: __webpack_require__(97).set});

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var isObject = __webpack_require__(12)
	  , anObject = __webpack_require__(11);
	var check = function(O, proto){
	  anObject(O);
	  if(!isObject(proto) && proto !== null)throw TypeError(proto + ": can't set as prototype!");
	};
	module.exports = {
	  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
	    function(test, buggy, set){
	      try {
	        set = __webpack_require__(7)(Function.call, __webpack_require__(89).f(Object.prototype, '__proto__').set, 2);
	        set(test, []);
	        buggy = !(test instanceof Array);
	      } catch(e){ buggy = true; }
	      return function setPrototypeOf(O, proto){
	        check(O, proto);
	        if(buggy)O.__proto__ = proto;
	        else set(O, proto);
	        return O;
	      };
	    }({}, false) : undefined),
	  check: check
	};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(99), __esModule: true };

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(100);
	var $Object = __webpack_require__(6).Object;
	module.exports = function create(P, D){
	  return $Object.create(P, D);
	};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

	var $export = __webpack_require__(4)
	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	$export($export.S, 'Object', {create: __webpack_require__(69)});

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _getPrototypeOf = __webpack_require__(54);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(58);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(93);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _events = __webpack_require__(46);
	
	var _events2 = _interopRequireDefault(_events);
	
	var _npc = __webpack_require__(47);
	
	var _npc2 = _interopRequireDefault(_npc);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var Tilly = function (_NPC) {
	  (0, _inherits3.default)(Tilly, _NPC);
	
	  function Tilly() {
	    (0, _classCallCheck3.default)(this, Tilly);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (Tilly.__proto__ || (0, _getPrototypeOf2.default)(Tilly)).call(this));
	
	    _this.name = 'Tilly';
	    _this.gold = 100;
	    _this.goldPerDay = 12;
	    _this.ideology = {
	      establishment: -10,
	      hierarchical: 0,
	      militant: 10,
	      popular: -10
	    };
	    _this.knows = {
	      Lulu: 10
	    };
	    _this.listenTo(_events2.default, 'nextDay', function () {
	      _this.gold += _this.goldPerDay;
	    });
	    return _this;
	  }
	
	  (0, _createClass3.default)(Tilly, [{
	    key: 'dialog',
	    value: function dialog() {
	      var _this2 = this;
	
	      var choices = ['Sod off', 'How much gold do you have?'];
	      if (Faction.playerFactionExists()) {
	        if (!Faction.getPlayerFaction().getMember(this.name)) {
	          choices.push('Join my faction');
	        }
	      }
	      $gameMessage.add('Whats up?');
	      $gameMessage.setChoices(choices, 0, -1);
	
	      $gameMessage.setChoiceCallback(function (choice) {
	        if (choice === 2) {
	          _this2.joinFaction(Faction.getPlayerFaction());
	          setTimeout(function () {
	            $gameMessage.newPage();
	            $gameMessage.add('Lets arse this house');
	          }, 1);
	        } else if (choice === 1) {
	          setTimeout(function () {
	            $gameMessage.newPage();
	            $gameMessage.add('I have ' + _this2.gold + ' gold');
	          }, 1);
	        } else {
	          setTimeout(function () {
	            $gameMessage.add('Lol, k');
	          }, 1);
	        }
	      });
	    }
	  }]);
	  return Tilly;
	}(_npc2.default);
	
	var tilly = new Tilly();
	
	exports.default = tilly;
	module.exports = exports['default'];

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(54);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(58);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(93);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _get3 = __webpack_require__(103);
	
	var _get4 = _interopRequireDefault(_get3);
	
	var _factionName = __webpack_require__(107);
	
	var _factionName2 = _interopRequireDefault(_factionName);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FactionCreate = function (_Scene_MenuBase) {
	  (0, _inherits3.default)(FactionCreate, _Scene_MenuBase);
	
	  function FactionCreate() {
	    var _get2;
	
	    (0, _classCallCheck3.default)(this, FactionCreate);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (FactionCreate.__proto__ || (0, _getPrototypeOf2.default)(FactionCreate)).call(this));
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    (_get2 = (0, _get4.default)(FactionCreate.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionCreate.prototype), 'initialize', _this)).call.apply(_get2, [_this].concat(args));
	    return _this;
	  }
	
	  (0, _createClass3.default)(FactionCreate, [{
	    key: 'create',
	    value: function create() {
	      (0, _get4.default)(FactionCreate.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionCreate.prototype), 'create', this).call(this);
	      this.factionName = new _factionName2.default();
	      this.factionName.setHandler('ok', this.onInputOk.bind(this));
	      (0, _get4.default)(FactionCreate.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionCreate.prototype), 'addWindow', this).call(this, this.factionName);
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      (0, _get4.default)(FactionCreate.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionCreate.prototype), 'start', this).call(this);
	      this.factionName.refresh();
	    }
	  }, {
	    key: 'onInputOk',
	    value: function onInputOk() {
	      (0, _get4.default)(FactionCreate.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionCreate.prototype), 'popScene', this).call(this);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      (0, _get4.default)(FactionCreate.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionCreate.prototype), 'update', this).call(this);
	      if (Input.isTriggered('cancel')) {
	        SoundManager.playCancel();
	        SceneManager.goto(Scene_Map);
	      }
	      if (Input.isTriggered('ok')) {
	        this.factionName.setName();
	        new Faction(this.factionName.faction);
	        SceneManager.goto(Scene_Map);
	      }
	    }
	  }]);
	  return FactionCreate;
	}(Scene_MenuBase);
	
	exports.default = FactionCreate;
	module.exports = exports['default'];

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _getPrototypeOf = __webpack_require__(54);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _getOwnPropertyDescriptor = __webpack_require__(104);
	
	var _getOwnPropertyDescriptor2 = _interopRequireDefault(_getOwnPropertyDescriptor);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	exports.default = function get(object, property, receiver) {
	  if (object === null) object = Function.prototype;
	  var desc = (0, _getOwnPropertyDescriptor2.default)(object, property);
	
	  if (desc === undefined) {
	    var parent = (0, _getPrototypeOf2.default)(object);
	
	    if (parent === null) {
	      return undefined;
	    } else {
	      return get(parent, property, receiver);
	    }
	  } else if ("value" in desc) {
	    return desc.value;
	  } else {
	    var getter = desc.get;
	
	    if (getter === undefined) {
	      return undefined;
	    }
	
	    return getter.call(receiver);
	  }
	};

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(105), __esModule: true };

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(106);
	var $Object = __webpack_require__(6).Object;
	module.exports = function getOwnPropertyDescriptor(it, key){
	  return $Object.getOwnPropertyDescriptor(it, key);
	};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	var toIObject                 = __webpack_require__(23)
	  , $getOwnPropertyDescriptor = __webpack_require__(89).f;
	
	__webpack_require__(51)('getOwnPropertyDescriptor', function(){
	  return function getOwnPropertyDescriptor(it, key){
	    return $getOwnPropertyDescriptor(toIObject(it), key);
	  };
	});

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(54);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(58);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(93);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _get2 = __webpack_require__(103);
	
	var _get3 = _interopRequireDefault(_get2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FactionName = function (_Window_TextInput) {
	  (0, _inherits3.default)(FactionName, _Window_TextInput);
	
	  function FactionName() {
	    var faction = arguments.length <= 0 || arguments[0] === undefined ? Faction.getPlayerFaction() || { name: '', isPlayerFaction: true } : arguments[0];
	    var max = arguments.length <= 1 || arguments[1] === undefined ? 12 : arguments[1];
	    (0, _classCallCheck3.default)(this, FactionName);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (FactionName.__proto__ || (0, _getPrototypeOf2.default)(FactionName)).call(this));
	
	    var width = _this.windowWidth();
	    var height = _this.windowHeight();
	    var x = (Graphics.boxWidth - width) / 2;
	    var y = (Graphics.boxHeight - height) / 2;
	    _this.faction = faction;
	    (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), 'initialize', _this).call(_this, x, y, width, height);
	    (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), 'setDefault', _this).call(_this, faction.name, max);
	    (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), 'activate', _this).call(_this);
	    return _this;
	  }
	
	  (0, _createClass3.default)(FactionName, [{
	    key: 'itemRect',
	    value: function itemRect(index) {
	      return {
	        x: this.left() + index * this.charWidth(),
	        y: 54,
	        width: (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), 'charWidth', this).call(this),
	        height: (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), 'lineHeight', this).call(this)
	      };
	    }
	  }, {
	    key: 'faceWidth',
	    value: function faceWidth() {
	      return 144;
	    }
	  }, {
	    key: 'left',
	    value: function left() {
	      var nameCenter = (this.contentsWidth() + this.faceWidth()) / 2;
	      var nameWidth = (this._maxLength + 1) * this.charWidth();
	      return Math.min(nameCenter - nameWidth / 2, this.contentsWidth() - nameWidth);
	    }
	  }, {
	    key: 'name',
	    value: function name() {
	      return (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), '_text', this);
	    }
	  }, {
	    key: 'setName',
	    value: function setName() {
	      this.faction.name = this._text;
	    }
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), 'contents', this).clear();
	      for (var i = 0; i < this._maxLength; i++) {
	        (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), 'drawUnderline', this).call(this, i);
	      }
	      for (var j = 0; j < this._text.length; j++) {
	        (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), 'drawChar', this).call(this, j);
	      }
	      var rect = this.itemRect(this._index);
	      (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), 'setCursorRect', this).call(this, rect.x, rect.y, rect.width, rect.height);
	    }
	  }, {
	    key: 'windowWidth',
	    value: function windowWidth() {
	      return 480;
	    }
	  }, {
	    key: 'windowHeight',
	    value: function windowHeight() {
	      return (0, _get3.default)(FactionName.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionName.prototype), 'fittingHeight', this).call(this, 4);
	    }
	  }]);
	  return FactionName;
	}(Window_TextInput);
	
	exports.default = FactionName;
	module.exports = exports['default'];

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(54);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(58);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(93);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _get3 = __webpack_require__(103);
	
	var _get4 = _interopRequireDefault(_get3);
	
	var _factionGold = __webpack_require__(109);
	
	var _factionGold2 = _interopRequireDefault(_factionGold);
	
	var _factionInfo = __webpack_require__(110);
	
	var _factionInfo2 = _interopRequireDefault(_factionInfo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FactionEdit = function (_Scene_MenuBase) {
	  (0, _inherits3.default)(FactionEdit, _Scene_MenuBase);
	
	  function FactionEdit() {
	    var _get2;
	
	    (0, _classCallCheck3.default)(this, FactionEdit);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (FactionEdit.__proto__ || (0, _getPrototypeOf2.default)(FactionEdit)).call(this));
	
	    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }
	
	    (_get2 = (0, _get4.default)(FactionEdit.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionEdit.prototype), 'initialize', _this)).call.apply(_get2, [_this].concat(args));
	    return _this;
	  }
	
	  (0, _createClass3.default)(FactionEdit, [{
	    key: 'create',
	    value: function create() {
	      (0, _get4.default)(FactionEdit.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionEdit.prototype), 'create', this).call(this);
	      this.factionGold = new _factionGold2.default();
	      this.factionInfo = new _factionInfo2.default(this.factionGold.x, this.factionGold.y + 100, 500, 100);
	      (0, _get4.default)(FactionEdit.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionEdit.prototype), 'addWindow', this).call(this, this.factionGold);
	      (0, _get4.default)(FactionEdit.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionEdit.prototype), 'addWindow', this).call(this, this.factionInfo);
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      (0, _get4.default)(FactionEdit.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionEdit.prototype), 'start', this).call(this);
	      this.factionGold.refresh();
	      this.factionInfo.refresh();
	    }
	  }, {
	    key: 'onInputOk',
	    value: function onInputOk() {
	      (0, _get4.default)(FactionEdit.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionEdit.prototype), 'popScene', this).call(this);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      (0, _get4.default)(FactionEdit.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionEdit.prototype), 'update', this).call(this);
	      if (Input.isTriggered('cancel')) {
	        SoundManager.playCancel();
	        SceneManager.goto(Scene_Map);
	      }
	      if (Input.isTriggered('ok')) {
	        SceneManager.goto(Scene_Map);
	      }
	    }
	  }]);
	  return FactionEdit;
	}(Scene_MenuBase);
	
	exports.default = FactionEdit;
	module.exports = exports['default'];

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(54);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(58);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _get2 = __webpack_require__(103);
	
	var _get3 = _interopRequireDefault(_get2);
	
	var _inherits2 = __webpack_require__(93);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FactionGold = function (_Window_Base) {
	  (0, _inherits3.default)(FactionGold, _Window_Base);
	
	  function FactionGold() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
	    (0, _classCallCheck3.default)(this, FactionGold);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (FactionGold.__proto__ || (0, _getPrototypeOf2.default)(FactionGold)).call(this));
	
	    _this.initialize(x, y);
	    return _this;
	  }
	
	  (0, _createClass3.default)(FactionGold, [{
	    key: "initialize",
	    value: function initialize(x, y) {
	      var width = this.windowWidth();
	      var height = this.windowHeight();
	      (0, _get3.default)(FactionGold.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionGold.prototype), "initialize", this).call(this, x, y, width, height);
	      this.refresh();
	    }
	  }, {
	    key: "windowWidth",
	    value: function windowWidth() {
	      return 240;
	    }
	  }, {
	    key: "windowHeight",
	    value: function windowHeight() {
	      return this.fittingHeight(1);
	    }
	  }, {
	    key: "currencyUnit",
	    value: function currencyUnit() {
	      return TextManager.currencyUnit;
	    }
	  }, {
	    key: "value",
	    value: function value() {
	      return Faction.getPlayerFaction().gold;
	    }
	  }, {
	    key: "refresh",
	    value: function refresh() {
	      var x = this.textPadding();
	      var width = this.contents.width - this.textPadding() * 2;
	      this.contents.clear();
	      this.drawCurrencyValue(this.value(), this.currencyUnit(), x, 0, width);
	    }
	  }, {
	    key: "open",
	    value: function open() {
	      this.refresh();
	      (0, _get3.default)(FactionGold.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionGold.prototype), "open", this).call(this);
	    }
	  }]);
	  return FactionGold;
	}(Window_Base);
	
	exports.default = FactionGold;
	module.exports = exports['default'];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = undefined;
	
	var _getPrototypeOf = __webpack_require__(54);
	
	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);
	
	var _classCallCheck2 = __webpack_require__(38);
	
	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);
	
	var _createClass2 = __webpack_require__(39);
	
	var _createClass3 = _interopRequireDefault(_createClass2);
	
	var _possibleConstructorReturn2 = __webpack_require__(58);
	
	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);
	
	var _inherits2 = __webpack_require__(93);
	
	var _inherits3 = _interopRequireDefault(_inherits2);
	
	var _get2 = __webpack_require__(103);
	
	var _get3 = _interopRequireDefault(_get2);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var FactionInfo = function (_Window_Selectable) {
	  (0, _inherits3.default)(FactionInfo, _Window_Selectable);
	
	  function FactionInfo() {
	    var x = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	    var y = arguments.length <= 1 || arguments[1] === undefined ? 100 : arguments[1];
	    var height = arguments.length <= 2 || arguments[2] === undefined ? 100 : arguments[2];
	    var width = arguments.length <= 3 || arguments[3] === undefined ? 300 : arguments[3];
	    (0, _classCallCheck3.default)(this, FactionInfo);
	
	    var _this = (0, _possibleConstructorReturn3.default)(this, (FactionInfo.__proto__ || (0, _getPrototypeOf2.default)(FactionInfo)).call(this));
	
	    (0, _get3.default)(FactionInfo.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionInfo.prototype), 'initialize', _this).call(_this, x, y, height, width);
	    _this.npcs = Faction.getPlayerFaction().npcs;
	    (0, _get3.default)(FactionInfo.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionInfo.prototype), 'activate', _this).call(_this);
	    return _this;
	  }
	
	  (0, _createClass3.default)(FactionInfo, [{
	    key: 'maxItems',
	    value: function maxItems() {
	      return 12;
	    }
	  }, {
	    key: 'numberWidth',
	    value: function numberWidth() {
	      return this.textWidth('000');
	    }
	  }, {
	    key: 'drawItemName',
	    value: function drawItemName(item, x, y) {
	      var width = arguments.length <= 3 || arguments[3] === undefined ? this.width : arguments[3];
	
	      if (!item.name) {
	        return;
	      }
	      (0, _get3.default)(FactionInfo.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionInfo.prototype), 'drawText', this).call(this, item.name, x, y, width, 'right');
	    }
	  }, {
	    key: 'drawItem',
	    value: function drawItem(item, index) {
	      var rect = (0, _get3.default)(FactionInfo.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionInfo.prototype), 'itemRect', this).call(this, index);
	      rect.width -= (0, _get3.default)(FactionInfo.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionInfo.prototype), 'textPadding', this).call(this);
	      this.drawItemName(item, rect.x, rect.y, rect.width);
	    }
	  }, {
	    key: 'refresh',
	    value: function refresh() {
	      var _this2 = this;
	
	      (0, _get3.default)(FactionInfo.prototype.__proto__ || (0, _getPrototypeOf2.default)(FactionInfo.prototype), 'createContents', this).call(this);
	      this.npcs.forEach(function (item, index) {
	        return _this2.drawItem(item, index);
	      });
	    }
	  }]);
	  return FactionInfo;
	}(Window_Selectable);
	
	exports.default = FactionInfo;
	module.exports = exports['default'];

/***/ }
/******/ ]);
//# sourceMappingURL=test.js.map
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 102);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "version", function() { return version; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DOM", function() { return DOM; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Children", function() { return Children; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createClass", function() { return createClass; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createFactory", function() { return createFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createElement", function() { return createElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cloneElement", function() { return cloneElement$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isValidElement", function() { return isValidElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findDOMNode", function() { return findDOMNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unmountComponentAtNode", function() { return unmountComponentAtNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Component", function() { return Component$1; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PureComponent", function() { return PureComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "unstable_renderSubtreeIntoContainer", function() { return renderSubtreeIntoContainer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "__spread", function() { return extend; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_preact__ = __webpack_require__(107);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "PropTypes", function() { return __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a; });



var version = '15.1.0'; // trick libraries to think we are react

var ELEMENTS = 'a abbr address area article aside audio b base bdi bdo big blockquote body br button canvas caption cite code col colgroup data datalist dd del details dfn dialog div dl dt em embed fieldset figcaption figure footer form h1 h2 h3 h4 h5 h6 head header hgroup hr html i iframe img input ins kbd keygen label legend li link main map mark menu menuitem meta meter nav noscript object ol optgroup option output p param picture pre progress q rp rt ruby s samp script section select small source span strong style sub summary sup table tbody td textarea tfoot th thead time title tr track u ul var video wbr circle clipPath defs ellipse g image line linearGradient mask path pattern polygon polyline radialGradient rect stop svg text tspan'.split(' ');

var REACT_ELEMENT_TYPE = (typeof Symbol!=='undefined' && Symbol.for && Symbol.for('react.element')) || 0xeac7;

var COMPONENT_WRAPPER_KEY = typeof Symbol!=='undefined' ? Symbol.for('__preactCompatWrapper') : '__preactCompatWrapper';

// don't autobind these methods since they already have guaranteed context.
var AUTOBIND_BLACKLIST = {
	constructor: 1,
	render: 1,
	shouldComponentUpdate: 1,
	componentWillReceiveProps: 1,
	componentWillUpdate: 1,
	componentDidUpdate: 1,
	componentWillMount: 1,
	componentDidMount: 1,
	componentWillUnmount: 1,
	componentDidUnmount: 1
};


var CAMEL_PROPS = /^(?:accent|alignment|arabic|baseline|cap|clip|color|fill|flood|font|glyph|horiz|marker|overline|paint|stop|strikethrough|stroke|text|underline|unicode|units|v|vector|vert|word|writing|x)[A-Z]/;


var BYPASS_HOOK = {};

/*global process*/
var DEV = typeof process==='undefined' || !process.env || process.env.NODE_ENV!=='production';

// a component that renders nothing. Used to replace components for unmountComponentAtNode.
function EmptyComponent() { return null; }



// make react think we're react.
var VNode = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["c" /* h */])('a', null).constructor;
VNode.prototype.$$typeof = REACT_ELEMENT_TYPE;
VNode.prototype.preactCompatUpgraded = false;
VNode.prototype.preactCompatNormalized = false;

Object.defineProperty(VNode.prototype, 'type', {
	get: function() { return this.nodeName; },
	set: function(v) { this.nodeName = v; },
	configurable:true
});

Object.defineProperty(VNode.prototype, 'props', {
	get: function() { return this.attributes; },
	set: function(v) { this.attributes = v; },
	configurable:true
});



var oldEventHook = __WEBPACK_IMPORTED_MODULE_1_preact__["d" /* options */].event;
__WEBPACK_IMPORTED_MODULE_1_preact__["d" /* options */].event = function (e) {
	if (oldEventHook) { e = oldEventHook(e); }
	e.persist = Object;
	e.nativeEvent = e;
	return e;
};


var oldVnodeHook = __WEBPACK_IMPORTED_MODULE_1_preact__["d" /* options */].vnode;
__WEBPACK_IMPORTED_MODULE_1_preact__["d" /* options */].vnode = function (vnode) {
	if (!vnode.preactCompatUpgraded) {
		vnode.preactCompatUpgraded = true;

		var tag = vnode.nodeName,
			attrs = vnode.attributes = extend({}, vnode.attributes);

		if (typeof tag==='function') {
			if (tag[COMPONENT_WRAPPER_KEY]===true || (tag.prototype && 'isReactComponent' in tag.prototype)) {
				if (vnode.children && String(vnode.children)==='') { vnode.children = undefined; }
				if (vnode.children) { attrs.children = vnode.children; }

				if (!vnode.preactCompatNormalized) {
					normalizeVNode(vnode);
				}
				handleComponentVNode(vnode);
			}
		}
		else {
			if (vnode.children && String(vnode.children)==='') { vnode.children = undefined; }
			if (vnode.children) { attrs.children = vnode.children; }

			if (attrs.defaultValue) {
				if (!attrs.value && attrs.value!==0) {
					attrs.value = attrs.defaultValue;
				}
				delete attrs.defaultValue;
			}

			handleElementVNode(vnode, attrs);
		}
	}

	if (oldVnodeHook) { oldVnodeHook(vnode); }
};

function handleComponentVNode(vnode) {
	var tag = vnode.nodeName,
		a = vnode.attributes;

	vnode.attributes = {};
	if (tag.defaultProps) { extend(vnode.attributes, tag.defaultProps); }
	if (a) { extend(vnode.attributes, a); }
}

function handleElementVNode(vnode, a) {
	var shouldSanitize, attrs, i;
	if (a) {
		for (i in a) { if ((shouldSanitize = CAMEL_PROPS.test(i))) { break; } }
		if (shouldSanitize) {
			attrs = vnode.attributes = {};
			for (i in a) {
				if (a.hasOwnProperty(i)) {
					attrs[ CAMEL_PROPS.test(i) ? i.replace(/([A-Z0-9])/, '-$1').toLowerCase() : i ] = a[i];
				}
			}
		}
	}
}



// proxy render() since React returns a Component reference.
function render$1(vnode, parent, callback) {
	var prev = parent && parent._preactCompatRendered && parent._preactCompatRendered.base;

	// ignore impossible previous renders
	if (prev && prev.parentNode!==parent) { prev = null; }

	// default to first Element child
	if (!prev && parent) { prev = parent.firstElementChild; }

	// remove unaffected siblings
	for (var i=parent.childNodes.length; i--; ) {
		if (parent.childNodes[i]!==prev) {
			parent.removeChild(parent.childNodes[i]);
		}
	}

	var out = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["e" /* render */])(vnode, parent, prev);
	if (parent) { parent._preactCompatRendered = out && (out._component || { base: out }); }
	if (typeof callback==='function') { callback(); }
	return out && out._component || out;
}


var ContextProvider = function () {};

ContextProvider.prototype.getChildContext = function () {
	return this.props.context;
};
ContextProvider.prototype.render = function (props) {
	return props.children[0];
};

function renderSubtreeIntoContainer(parentComponent, vnode, container, callback) {
	var wrap = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["c" /* h */])(ContextProvider, { context: parentComponent.context }, vnode);
	var renderContainer = render$1(wrap, container);
	var component = renderContainer._component || renderContainer.base;
	if (callback) { callback.call(component, renderContainer); }
	return component;
}


function unmountComponentAtNode(container) {
	var existing = container._preactCompatRendered && container._preactCompatRendered.base;
	if (existing && existing.parentNode===container) {
		Object(__WEBPACK_IMPORTED_MODULE_1_preact__["e" /* render */])(Object(__WEBPACK_IMPORTED_MODULE_1_preact__["c" /* h */])(EmptyComponent), container, existing);
		return true;
	}
	return false;
}



var ARR = [];

// This API is completely unnecessary for Preact, so it's basically passthrough.
var Children = {
	map: function(children, fn, ctx) {
		if (children == null) { return null; }
		children = Children.toArray(children);
		if (ctx && ctx!==children) { fn = fn.bind(ctx); }
		return children.map(fn);
	},
	forEach: function(children, fn, ctx) {
		if (children == null) { return null; }
		children = Children.toArray(children);
		if (ctx && ctx!==children) { fn = fn.bind(ctx); }
		children.forEach(fn);
	},
	count: function(children) {
		return children && children.length || 0;
	},
	only: function(children) {
		children = Children.toArray(children);
		if (children.length!==1) { throw new Error('Children.only() expects only one child.'); }
		return children[0];
	},
	toArray: function(children) {
		if (children == null) { return []; }
		return ARR.concat(children);
	}
};


/** Track current render() component for ref assignment */
var currentComponent;


function createFactory(type) {
	return createElement.bind(null, type);
}


var DOM = {};
for (var i=ELEMENTS.length; i--; ) {
	DOM[ELEMENTS[i]] = createFactory(ELEMENTS[i]);
}

function upgradeToVNodes(arr, offset) {
	for (var i=offset || 0; i<arr.length; i++) {
		var obj = arr[i];
		if (Array.isArray(obj)) {
			upgradeToVNodes(obj);
		}
		else if (obj && typeof obj==='object' && !isValidElement(obj) && ((obj.props && obj.type) || (obj.attributes && obj.nodeName) || obj.children)) {
			arr[i] = createElement(obj.type || obj.nodeName, obj.props || obj.attributes, obj.children);
		}
	}
}

function isStatelessComponent(c) {
	return typeof c==='function' && !(c.prototype && c.prototype.render);
}


// wraps stateless functional components in a PropTypes validator
function wrapStatelessComponent(WrappedComponent) {
	return createClass({
		displayName: WrappedComponent.displayName || WrappedComponent.name,
		render: function() {
			return WrappedComponent(this.props, this.context);
		}
	});
}


function statelessComponentHook(Ctor) {
	var Wrapped = Ctor[COMPONENT_WRAPPER_KEY];
	if (Wrapped) { return Wrapped===true ? Ctor : Wrapped; }

	Wrapped = wrapStatelessComponent(Ctor);

	Object.defineProperty(Wrapped, COMPONENT_WRAPPER_KEY, { configurable:true, value:true });
	Wrapped.displayName = Ctor.displayName;
	Wrapped.propTypes = Ctor.propTypes;
	Wrapped.defaultProps = Ctor.defaultProps;

	Object.defineProperty(Ctor, COMPONENT_WRAPPER_KEY, { configurable:true, value:Wrapped });

	return Wrapped;
}


function createElement() {
	var args = [], len = arguments.length;
	while ( len-- ) args[ len ] = arguments[ len ];

	upgradeToVNodes(args, 2);
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["c" /* h */].apply(void 0, args));
}


function normalizeVNode(vnode) {
	vnode.preactCompatNormalized = true;

	applyClassName(vnode);

	if (isStatelessComponent(vnode.nodeName)) {
		vnode.nodeName = statelessComponentHook(vnode.nodeName);
	}

	var ref = vnode.attributes.ref,
		type = ref && typeof ref;
	if (currentComponent && (type==='string' || type==='number')) {
		vnode.attributes.ref = createStringRefProxy(ref, currentComponent);
	}

	applyEventNormalization(vnode);

	return vnode;
}


function cloneElement$1(element, props) {
	var children = [], len = arguments.length - 2;
	while ( len-- > 0 ) children[ len ] = arguments[ len + 2 ];

	if (!isValidElement(element)) { return element; }
	var elementProps = element.attributes || element.props;
	var node = Object(__WEBPACK_IMPORTED_MODULE_1_preact__["c" /* h */])(
		element.nodeName || element.type,
		elementProps,
		element.children || elementProps && elementProps.children
	);
	// Only provide the 3rd argument if needed.
	// Arguments 3+ overwrite element.children in preactCloneElement
	var cloneArgs = [node, props];
	if (children && children.length) {
		cloneArgs.push(children);
	}
	else if (props && props.children) {
		cloneArgs.push(props.children);
	}
	return normalizeVNode(__WEBPACK_IMPORTED_MODULE_1_preact__["b" /* cloneElement */].apply(void 0, cloneArgs));
}


function isValidElement(element) {
	return element && ((element instanceof VNode) || element.$$typeof===REACT_ELEMENT_TYPE);
}


function createStringRefProxy(name, component) {
	return component._refProxies[name] || (component._refProxies[name] = function (resolved) {
		if (component && component.refs) {
			component.refs[name] = resolved;
			if (resolved===null) {
				delete component._refProxies[name];
				component = null;
			}
		}
	});
}


function applyEventNormalization(ref) {
	var nodeName = ref.nodeName;
	var attributes = ref.attributes;

	if (!attributes || typeof nodeName!=='string') { return; }
	var props = {};
	for (var i in attributes) {
		props[i.toLowerCase()] = i;
	}
	if (props.ondoubleclick) {
		attributes.ondblclick = attributes[props.ondoubleclick];
		delete attributes[props.ondoubleclick];
	}
	// for *textual inputs* (incl textarea), normalize `onChange` -> `onInput`:
	if (props.onchange && (nodeName==='textarea' || (nodeName.toLowerCase()==='input' && !/^fil|che|rad/i.test(attributes.type)))) {
		var normalized = props.oninput || 'oninput';
		if (!attributes[normalized]) {
			attributes[normalized] = multihook([attributes[normalized], attributes[props.onchange]]);
			delete attributes[props.onchange];
		}
	}
}


function applyClassName(vnode) {
	var a = vnode.attributes || (vnode.attributes = {});
	classNameDescriptor.enumerable = 'className' in a;
	if (a.className) { a.class = a.className; }
	Object.defineProperty(a, 'className', classNameDescriptor);
}


var classNameDescriptor = {
	configurable: true,
	get: function() { return this.class; },
	set: function(v) { this.class = v; }
};

function extend(base, props) {
	var arguments$1 = arguments;

	for (var i=1, obj = (void 0); i<arguments.length; i++) {
		if ((obj = arguments$1[i])) {
			for (var key in obj) {
				if (obj.hasOwnProperty(key)) {
					base[key] = obj[key];
				}
			}
		}
	}
	return base;
}


function shallowDiffers(a, b) {
	for (var i in a) { if (!(i in b)) { return true; } }
	for (var i$1 in b) { if (a[i$1]!==b[i$1]) { return true; } }
	return false;
}


function findDOMNode(component) {
	return component && component.base || component;
}


function F(){}

function createClass(obj) {
	function cl(props, context) {
		bindAll(this);
		Component$1.call(this, props, context, BYPASS_HOOK);
		newComponentHook.call(this, props, context);
	}

	obj = extend({ constructor: cl }, obj);

	// We need to apply mixins here so that getDefaultProps is correctly mixed
	if (obj.mixins) {
		applyMixins(obj, collateMixins(obj.mixins));
	}
	if (obj.statics) {
		extend(cl, obj.statics);
	}
	if (obj.propTypes) {
		cl.propTypes = obj.propTypes;
	}
	if (obj.defaultProps) {
		cl.defaultProps = obj.defaultProps;
	}
	if (obj.getDefaultProps) {
		cl.defaultProps = obj.getDefaultProps();
	}

	F.prototype = Component$1.prototype;
	cl.prototype = extend(new F(), obj);

	cl.displayName = obj.displayName || 'Component';

	return cl;
}


// Flatten an Array of mixins to a map of method name to mixin implementations
function collateMixins(mixins) {
	var keyed = {};
	for (var i=0; i<mixins.length; i++) {
		var mixin = mixins[i];
		for (var key in mixin) {
			if (mixin.hasOwnProperty(key) && typeof mixin[key]==='function') {
				(keyed[key] || (keyed[key]=[])).push(mixin[key]);
			}
		}
	}
	return keyed;
}


// apply a mapping of Arrays of mixin methods to a component prototype
function applyMixins(proto, mixins) {
	for (var key in mixins) { if (mixins.hasOwnProperty(key)) {
		proto[key] = multihook(
			mixins[key].concat(proto[key] || ARR),
			key==='getDefaultProps' || key==='getInitialState' || key==='getChildContext'
		);
	} }
}


function bindAll(ctx) {
	for (var i in ctx) {
		var v = ctx[i];
		if (typeof v==='function' && !v.__bound && !AUTOBIND_BLACKLIST.hasOwnProperty(i)) {
			(ctx[i] = v.bind(ctx)).__bound = true;
		}
	}
}


function callMethod(ctx, m, args) {
	if (typeof m==='string') {
		m = ctx.constructor.prototype[m];
	}
	if (typeof m==='function') {
		return m.apply(ctx, args);
	}
}

function multihook(hooks, skipDuplicates) {
	return function() {
		var arguments$1 = arguments;
		var this$1 = this;

		var ret;
		for (var i=0; i<hooks.length; i++) {
			var r = callMethod(this$1, hooks[i], arguments$1);

			if (skipDuplicates && r!=null) {
				if (!ret) { ret = {}; }
				for (var key in r) { if (r.hasOwnProperty(key)) {
					ret[key] = r[key];
				} }
			}
			else if (typeof r!=='undefined') { ret = r; }
		}
		return ret;
	};
}


function newComponentHook(props, context) {
	propsHook.call(this, props, context);
	this.componentWillReceiveProps = multihook([propsHook, this.componentWillReceiveProps || 'componentWillReceiveProps']);
	this.render = multihook([propsHook, beforeRender, this.render || 'render', afterRender]);
}


function propsHook(props, context) {
	if (!props) { return; }

	// React annoyingly special-cases single children, and some react components are ridiculously strict about this.
	var c = props.children;
	if (c && Array.isArray(c) && c.length===1 && (typeof c[0]==='string' || typeof c[0]==='function' || c[0] instanceof VNode)) {
		props.children = c[0];

		// but its totally still going to be an Array.
		if (props.children && typeof props.children==='object') {
			props.children.length = 1;
			props.children[0] = props.children;
		}
	}

	// add proptype checking
	if (DEV) {
		var ctor = typeof this==='function' ? this : this.constructor,
			propTypes = this.propTypes || ctor.propTypes;
		var displayName = this.displayName || ctor.name;

		if (propTypes) {
			__WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.checkPropTypes(propTypes, props, 'prop', displayName);
		}
	}
}


function beforeRender(props) {
	currentComponent = this;
}

function afterRender() {
	if (currentComponent===this) {
		currentComponent = null;
	}
}



function Component$1(props, context, opts) {
	__WEBPACK_IMPORTED_MODULE_1_preact__["a" /* Component */].call(this, props, context);
	this.state = this.getInitialState ? this.getInitialState() : {};
	this.refs = {};
	this._refProxies = {};
	if (opts!==BYPASS_HOOK) {
		newComponentHook.call(this, props, context);
	}
}
extend(Component$1.prototype = new __WEBPACK_IMPORTED_MODULE_1_preact__["a" /* Component */](), {
	constructor: Component$1,

	isReactComponent: {},

	replaceState: function(state, callback) {
		var this$1 = this;

		this.setState(state, callback);
		for (var i in this$1.state) {
			if (!(i in state)) {
				delete this$1.state[i];
			}
		}
	},

	getDOMNode: function() {
		return this.base;
	},

	isMounted: function() {
		return !!this.base;
	}
});



function PureComponent(props, context) {
	Component$1.call(this, props, context);
}
F.prototype = Component$1.prototype;
PureComponent.prototype = new F();
PureComponent.prototype.isPureReactComponent = true;
PureComponent.prototype.shouldComponentUpdate = function(props, state) {
	return shallowDiffers(this.props, props) || shallowDiffers(this.state, state);
};

var index = {
	version: version,
	DOM: DOM,
	PropTypes: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a,
	Children: Children,
	render: render$1,
	createClass: createClass,
	createFactory: createFactory,
	createElement: createElement,
	cloneElement: cloneElement$1,
	isValidElement: isValidElement,
	findDOMNode: findDOMNode,
	unmountComponentAtNode: unmountComponentAtNode,
	Component: Component$1,
	PureComponent: PureComponent,
	unstable_renderSubtreeIntoContainer: renderSubtreeIntoContainer,
	__spread: extend
};

/* harmony default export */ __webpack_exports__["default"] = (index);
//# sourceMappingURL=preact-compat.es.js.map

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 2 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),
/* 3 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = function(module) {
	if(!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(19),
    getRawTag = __webpack_require__(52),
    objectToString = __webpack_require__(53);

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__(20);

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),
/* 7 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// Message type used for dispatch events
// from the Proxy Stores to background
var DISPATCH_TYPE = exports.DISPATCH_TYPE = 'chromex.dispatch';

// Message type for state update events from
// background to Proxy Stores
var STATE_TYPE = exports.STATE_TYPE = 'chromex.state';

// Message type for state patch events from
// background to Proxy Stores
var PATCH_STATE_TYPE = exports.PATCH_STATE_TYPE = 'chromex.patch_state';

// The `change` value for updated or inserted fields resulting from shallow diff
var DIFF_STATUS_UPDATED = exports.DIFF_STATUS_UPDATED = 'updated';

// The `change` value for removed fields resulting from shallow diff
var DIFF_STATUS_REMOVED = exports.DIFF_STATUS_REMOVED = 'removed';

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getPrototype_js__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__ = __webpack_require__(38);




/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_2__isObjectLike_js__["a" /* default */])(value) || Object(__WEBPACK_IMPORTED_MODULE_0__baseGetTag_js__["a" /* default */])(value) != objectTag) {
    return false;
  }
  var proto = Object(__WEBPACK_IMPORTED_MODULE_1__getPrototype_js__["a" /* default */])(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return typeof Ctor == 'function' && Ctor instanceof Ctor &&
    funcToString.call(Ctor) == objectCtorString;
}

/* harmony default export */ __webpack_exports__["a"] = (isPlainObject);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var constants = {
  SAVE_TAB: 'SAVE_TAB',
  DELETE_TAB: 'DELETE_TAB',
  FILTER: 'FILTER',
  SETWORD: 'SETWORD',
  SETLIMIT: 'SETLIMIT'
};
/* harmony default export */ __webpack_exports__["a"] = (constants);

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var validateFormat = function validateFormat(format) {};

if (process.env.NODE_ENV !== 'production') {
  validateFormat = function validateFormat(format) {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  };
}

function invariant(condition, format, a, b, c, d, e, f) {
  validateFormat(format);

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(format.replace(/%s/g, function () {
        return args[argIndex++];
      }));
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
}

module.exports = invariant;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ActionTypes; });
/* harmony export (immutable) */ __webpack_exports__["b"] = createStore;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_symbol_observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_symbol_observable__);



/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var ActionTypes = {
  INIT: '@@redux/INIT'

  /**
   * Creates a Redux store that holds the state tree.
   * The only way to change the data in the store is to call `dispatch()` on it.
   *
   * There should only be a single store in your app. To specify how different
   * parts of the state tree respond to actions, you may combine several reducers
   * into a single reducer function by using `combineReducers`.
   *
   * @param {Function} reducer A function that returns the next state tree, given
   * the current state tree and the action to handle.
   *
   * @param {any} [preloadedState] The initial state. You may optionally specify it
   * to hydrate the state from the server in universal apps, or to restore a
   * previously serialized user session.
   * If you use `combineReducers` to produce the root reducer function, this must be
   * an object with the same shape as `combineReducers` keys.
   *
   * @param {Function} [enhancer] The store enhancer. You may optionally specify it
   * to enhance the store with third-party capabilities such as middleware,
   * time travel, persistence, etc. The only store enhancer that ships with Redux
   * is `applyMiddleware()`.
   *
   * @returns {Store} A Redux store that lets you read the state, dispatch actions
   * and subscribe to changes.
   */
};function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }

  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */
  function getState() {
    return currentState;
  }

  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */
  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.');
    }

    var isSubscribed = true;

    ensureCanMutateNextListeners();
    nextListeners.push(listener);

    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      isSubscribed = false;

      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }

  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */
  function dispatch(action) {
    if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }

  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer;
    dispatch({ type: ActionTypes.INIT });
  }

  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */
  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object') {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return { unsubscribe: unsubscribe };
      }
    }, _ref[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = function () {
      return this;
    }, _ref;
  }

  // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.
  dispatch({ type: ActionTypes.INIT });

  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__WEBPACK_IMPORTED_MODULE_1_symbol_observable___default.a] = observable, _ref2;
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__root_js__ = __webpack_require__(32);


/** Built-in value references. */
var Symbol = __WEBPACK_IMPORTED_MODULE_0__root_js__["a" /* default */].Symbol;

/* harmony default export */ __webpack_exports__["a"] = (Symbol);


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = compose;
/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

function compose() {
  for (var _len = arguments.length, funcs = Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(undefined, arguments));
    };
  });
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__(17);

/**
 * The base implementation of `assignValue` and `assignMergeValue` without
 * value checks.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function baseAssignValue(object, key, value) {
  if (key == '__proto__' && defineProperty) {
    defineProperty(object, key, {
      'configurable': true,
      'enumerable': true,
      'value': value,
      'writable': true
    });
  } else {
    object[key] = value;
  }
}

module.exports = baseAssignValue;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var getNative = __webpack_require__(50);

var defineProperty = (function() {
  try {
    var func = getNative(Object, 'defineProperty');
    func({}, '', {});
    return func;
  } catch (e) {}
}());

module.exports = defineProperty;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObject = __webpack_require__(2);

/** `Object#toString` result references. */
var asyncTag = '[object AsyncFunction]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    proxyTag = '[object Proxy]';

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

module.exports = isFunction;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(6);

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ }),
/* 21 */
/***/ (function(module, exports) {

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

module.exports = eq;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(18),
    isLength = __webpack_require__(24);

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

module.exports = isArrayLike;


/***/ }),
/* 24 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;


/***/ }),
/* 25 */
/***/ (function(module, exports) {

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

module.exports = isIndex;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deleteTab; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return saveTabs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return setLimit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return setWord; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__constants__ = __webpack_require__(10);


var deleteTab = function deleteTab(id) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* default */].DELETE_TAB,
    payload: id
  };
};

var saveTabs = function saveTabs(tab) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* default */].SAVE_TAB,
    payload: tab
  };
};

var setLimit = function setLimit(limit) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* default */].SETLIMIT,
    payload: limit
  };
};

var setWord = function setWord(word) {
  return {
    type: __WEBPACK_IMPORTED_MODULE_0__constants__["a" /* default */].SETWORD,
    payload: word
  };
};

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 */

function makeEmptyFunction(arg) {
  return function () {
    return arg;
  };
}

/**
 * This function accepts and discards inputs; it has no side effects. This is
 * primarily useful idiomatically for overridable function endpoints which
 * always need to be callable, since JS lacks a null-call idiom ala Cocoa.
 */
var emptyFunction = function emptyFunction() {};

emptyFunction.thatReturns = makeEmptyFunction;
emptyFunction.thatReturnsFalse = makeEmptyFunction(false);
emptyFunction.thatReturnsTrue = makeEmptyFunction(true);
emptyFunction.thatReturnsNull = makeEmptyFunction(null);
emptyFunction.thatReturnsThis = function () {
  return this;
};
emptyFunction.thatReturnsArgument = function (arg) {
  return arg;
};

module.exports = emptyFunction;

/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Provider__ = __webpack_require__(108);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_connectAdvanced__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__connect_connect__ = __webpack_require__(112);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__components_Provider__["a"]; });
/* unused harmony reexport createProvider */
/* unused harmony reexport connectAdvanced */
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_2__connect_connect__["a"]; });






/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__combineReducers__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__applyMiddleware__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__compose__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__utils_warning__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_0__createStore__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__combineReducers__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__bindActionCreators__["a"]; });
/* unused harmony reexport applyMiddleware */
/* unused harmony reexport compose */







/*
* This is a dummy function to check if the function name has been altered by minification.
* If the function has been minified and NODE_ENV !== 'production', warn the user.
*/
function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  Object(__WEBPACK_IMPORTED_MODULE_5__utils_warning__["a" /* default */])('You are currently using minified code outside of NODE_ENV === \'production\'. ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or DefinePlugin for webpack (http://stackoverflow.com/questions/30030031) ' + 'to ensure you have the correct code for your production build.');
}


/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */



var emptyFunction = __webpack_require__(27);

/**
 * Similar to invariant but only logs a warning if the condition is not met.
 * This can be used to log issues in development environments in critical
 * paths. Removing the logging code for production environments will keep the
 * same logic and follow the same code paths.
 */

var warning = emptyFunction;

if (process.env.NODE_ENV !== 'production') {
  var printWarning = function printWarning(format) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    var argIndex = 0;
    var message = 'Warning: ' + format.replace(/%s/g, function () {
      return args[argIndex++];
    });
    if (typeof console !== 'undefined') {
      console.error(message);
    }
    try {
      // --- Welcome to debugging React ---
      // This error was thrown as a convenience so that you can use this stack
      // to find the callsite that caused this warning to fire.
      throw new Error(message);
    } catch (x) {}
  };

  warning = function warning(condition, format) {
    if (format === undefined) {
      throw new Error('`warning(condition, format, ...args)` requires a warning ' + 'message argument');
    }

    if (format.indexOf('Failed Composite propType: ') === 0) {
      return; // Ignore CompositeComponent proptype check.
    }

    if (!condition) {
      for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
        args[_key2 - 2] = arguments[_key2];
      }

      printWarning.apply(undefined, [format].concat(args));
    }
  };
}

module.exports = warning;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__getRawTag_js__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__objectToString_js__ = __webpack_require__(35);




/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? Object(__WEBPACK_IMPORTED_MODULE_1__getRawTag_js__["a" /* default */])(value)
    : Object(__WEBPACK_IMPORTED_MODULE_2__objectToString_js__["a" /* default */])(value);
}

/* harmony default export */ __webpack_exports__["a"] = (baseGetTag);


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__ = __webpack_require__(33);


/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = __WEBPACK_IMPORTED_MODULE_0__freeGlobal_js__["a" /* default */] || freeSelf || Function('return this')();

/* harmony default export */ __webpack_exports__["a"] = (root);


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/* harmony default export */ __webpack_exports__["a"] = (freeGlobal);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(3)))

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Symbol_js__ = __webpack_require__(13);


/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_0__Symbol_js__["a" /* default */].toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/* harmony default export */ __webpack_exports__["a"] = (getRawTag);


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/* harmony default export */ __webpack_exports__["a"] = (objectToString);


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__overArg_js__ = __webpack_require__(37);


/** Built-in value references. */
var getPrototype = Object(__WEBPACK_IMPORTED_MODULE_0__overArg_js__["a" /* default */])(Object.getPrototypeOf, Object);

/* harmony default export */ __webpack_exports__["a"] = (getPrototype);


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (overArg);


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/* harmony default export */ __webpack_exports__["a"] = (isObjectLike);


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(40);


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ponyfill = __webpack_require__(41);

var _ponyfill2 = _interopRequireDefault(_ponyfill);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var root; /* global window */


if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (true) {
  root = module;
} else {
  root = Function('return this')();
}

var result = (0, _ponyfill2['default'])(root);
exports['default'] = result;
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3), __webpack_require__(4)(module)))

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports['default'] = symbolObservablePonyfill;
function symbolObservablePonyfill(root) {
	var result;
	var _Symbol = root.Symbol;

	if (typeof _Symbol === 'function') {
		if (_Symbol.observable) {
			result = _Symbol.observable;
		} else {
			result = _Symbol('observable');
			_Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
};

/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = combineReducers;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__createStore__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_warning__ = __webpack_require__(14);




function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionName = actionType && '"' + actionType.toString() + '"' || 'an action';

  return 'Given action ' + actionName + ', reducer "' + key + '" returned undefined. ' + 'To ignore an action, you must explicitly return the previous state. ' + 'If you want this reducer to hold no value, you can return null instead of undefined.';
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!Object(__WEBPACK_IMPORTED_MODULE_1_lodash_es_isPlainObject__["a" /* default */])(inputState)) {
    return 'The ' + argumentName + ' has unexpected type of "' + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + '". Expected argument to be an object with the following ' + ('keys: "' + reducerKeys.join('", "') + '"');
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });

  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });

  if (unexpectedKeys.length > 0) {
    return 'Unexpected ' + (unexpectedKeys.length > 1 ? 'keys' : 'key') + ' ' + ('"' + unexpectedKeys.join('", "') + '" found in ' + argumentName + '. ') + 'Expected to find one of the known reducer keys instead: ' + ('"' + reducerKeys.join('", "') + '". Unexpected keys will be ignored.');
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, { type: __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT });

    if (typeof initialState === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined during initialization. ' + 'If the state passed to the reducer is undefined, you must ' + 'explicitly return the initial state. The initial state may ' + 'not be undefined. If you don\'t want to set a value for this reducer, ' + 'you can use null instead of undefined.');
    }

    var type = '@@redux/PROBE_UNKNOWN_ACTION_' + Math.random().toString(36).substring(7).split('').join('.');
    if (typeof reducer(undefined, { type: type }) === 'undefined') {
      throw new Error('Reducer "' + key + '" returned undefined when probed with a random type. ' + ('Don\'t try to handle ' + __WEBPACK_IMPORTED_MODULE_0__createStore__["a" /* ActionTypes */].INIT + ' or other actions in "redux/*" ') + 'namespace. They are considered private. Instead, you must return the ' + 'current state for any unknown actions, unless it is undefined, ' + 'in which case you must return the initial state, regardless of the ' + 'action type. The initial state may not be undefined, but can be null.');
    }
  });
}

/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])('No reducer provided for key "' + key + '"');
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);

  var unexpectedKeyCache = void 0;
  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError = void 0;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        Object(__WEBPACK_IMPORTED_MODULE_2__utils_warning__["a" /* default */])(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = bindActionCreators;
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(undefined, arguments));
  };
}

/**
 * Turns an object whose values are action creators, into an object with the
 * same keys, but with every function wrapped into a `dispatch` call so they
 * may be invoked directly. This is just a convenience method, as you can call
 * `store.dispatch(MyActionCreators.doSomething())` yourself just fine.
 *
 * For convenience, you can also pass a single function as the first argument,
 * and get a function in return.
 *
 * @param {Function|Object} actionCreators An object whose values are action
 * creator functions. One handy way to obtain it is to use ES6 `import * as`
 * syntax. You may also pass a single function.
 *
 * @param {Function} dispatch The `dispatch` function available on your Redux
 * store.
 *
 * @returns {Function|Object} The object mimicking the original object, but with
 * every action creator wrapped into the `dispatch` call. If you passed a
 * function as `actionCreators`, the return value will also be a single
 * function.
 */
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === 'function') {
    return bindActionCreator(actionCreators, dispatch);
  }

  if (typeof actionCreators !== 'object' || actionCreators === null) {
    throw new Error('bindActionCreators expected an object or a function, instead received ' + (actionCreators === null ? 'null' : typeof actionCreators) + '. ' + 'Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?');
  }

  var keys = Object.keys(actionCreators);
  var boundActionCreators = {};
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === 'function') {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}

/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__compose__ = __webpack_require__(15);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function (reducer, preloadedState, enhancer) {
      var store = createStore(reducer, preloadedState, enhancer);
      var _dispatch = store.dispatch;
      var chain = [];

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch(action) {
          return _dispatch(action);
        }
      };
      chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = __WEBPACK_IMPORTED_MODULE_0__compose__["a" /* default */].apply(undefined, chain)(store.dispatch);

      return _extends({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.alias = exports.wrapStore = exports.Store = undefined;

var _Store = __webpack_require__(46);

var _Store2 = _interopRequireDefault(_Store);

var _wrapStore = __webpack_require__(82);

var _wrapStore2 = _interopRequireDefault(_wrapStore);

var _alias = __webpack_require__(84);

var _alias2 = _interopRequireDefault(_alias);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.Store = _Store2.default;
exports.wrapStore = _wrapStore2.default;
exports.alias = _alias2.default;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _assignIn = __webpack_require__(47);

var _assignIn2 = _interopRequireDefault(_assignIn);

var _constants = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var backgroundErrPrefix = '\nLooks like there is an error in the background page. ' + 'You might want to inspect your background page for more details.\n';

var Store = function () {
  /**
   * Creates a new Proxy store
   * @param  {object} options An object of form {portName, state, extensionId}, where `portName` is a required string and defines the name of the port for state transition changes, `state` is the initial state of this store (default `{}`) `extensionId` is the extension id as defined by chrome when extension is loaded (default `''`)
   */
  function Store(_ref) {
    var _this = this;

    var portName = _ref.portName,
        _ref$state = _ref.state,
        state = _ref$state === undefined ? {} : _ref$state,
        _ref$extensionId = _ref.extensionId,
        extensionId = _ref$extensionId === undefined ? '' : _ref$extensionId;

    _classCallCheck(this, Store);

    if (!portName) {
      throw new Error('portName is required in options');
    }

    this.portName = portName;
    this.readyResolved = false;
    this.readyPromise = new Promise(function (resolve) {
      return _this.readyResolve = resolve;
    });

    this.extensionId = extensionId; // keep the extensionId as an instance variable
    this.port = chrome.runtime.connect(this.extensionId, { name: portName });
    this.listeners = [];
    this.state = state;

    this.port.onMessage.addListener(function (message) {
      switch (message.type) {
        case _constants.STATE_TYPE:
          _this.replaceState(message.payload);

          if (!_this.readyResolved) {
            _this.readyResolved = true;
            _this.readyResolve();
          }
          break;

        case _constants.PATCH_STATE_TYPE:
          _this.patchState(message.payload);
          break;

        default:
        // do nothing
      }
    });

    this.dispatch = this.dispatch.bind(this); // add this context to dispatch
  }

  /**
  * Returns a promise that resolves when the store is ready. Optionally a callback may be passed in instead.
  * @param [function] callback An optional callback that may be passed in and will fire when the store is ready.
  * @return {object} promise A promise that resolves when the store has established a connection with the background page.
  */


  _createClass(Store, [{
    key: 'ready',
    value: function ready() {
      var cb = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (cb !== null) {
        return this.readyPromise.then(cb);
      }

      return this.readyPromise;
    }

    /**
     * Subscribes a listener function for all state changes
     * @param  {function} listener A listener function to be called when store state changes
     * @return {function}          An unsubscribe function which can be called to remove the listener from state updates
     */

  }, {
    key: 'subscribe',
    value: function subscribe(listener) {
      var _this2 = this;

      this.listeners.push(listener);

      return function () {
        _this2.listeners = _this2.listeners.filter(function (l) {
          return l !== listener;
        });
      };
    }

    /**
     * Replaces the state for only the keys in the updated state. Notifies all listeners of state change.
     * @param {object} state the new (partial) redux state
     */

  }, {
    key: 'patchState',
    value: function patchState(difference) {
      var state = Object.assign({}, this.state);

      difference.forEach(function (_ref2) {
        var change = _ref2.change,
            key = _ref2.key,
            value = _ref2.value;

        switch (change) {
          case _constants.DIFF_STATUS_UPDATED:
            state[key] = value;
            break;

          case _constants.DIFF_STATUS_REMOVED:
            Reflect.deleteProperty(state, key);
            break;

          default:
          // do nothing
        }
      });

      this.state = state;

      this.listeners.forEach(function (l) {
        return l();
      });
    }

    /**
     * Replace the current state with a new state. Notifies all listeners of state change.
     * @param  {object} state The new state for the store
     */

  }, {
    key: 'replaceState',
    value: function replaceState(state) {
      this.state = state;

      this.listeners.forEach(function (l) {
        return l();
      });
    }

    /**
     * Get the current state of the store
     * @return {object} the current store state
     */

  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }

    /**
     * Dispatch an action to the background using messaging passing
     * @param  {object} data The action data to dispatch
     * @return {Promise}     Promise that will resolve/reject based on the action response from the background
     */

  }, {
    key: 'dispatch',
    value: function dispatch(data) {
      var _this3 = this;

      return new Promise(function (resolve, reject) {
        chrome.runtime.sendMessage(_this3.extensionId, {
          type: _constants.DISPATCH_TYPE,
          portName: _this3.portName,
          payload: data
        }, function (resp) {
          var error = resp.error,
              value = resp.value;


          if (error) {
            var bgErr = new Error('' + backgroundErrPrefix + error);

            reject((0, _assignIn2.default)(bgErr, error));
          } else {
            resolve(value && value.payload);
          }
        });
      });
    }
  }]);

  return Store;
}();

exports.default = Store;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

var copyObject = __webpack_require__(48),
    createAssigner = __webpack_require__(58),
    keysIn = __webpack_require__(67);

/**
 * This method is like `_.assign` except that it iterates over own and
 * inherited source properties.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extend
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assign
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assignIn({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
 */
var assignIn = createAssigner(function(object, source) {
  copyObject(source, keysIn(source), object);
});

module.exports = assignIn;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var assignValue = __webpack_require__(49),
    baseAssignValue = __webpack_require__(16);

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  var isNew = !object;
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    if (newValue === undefined) {
      newValue = source[key];
    }
    if (isNew) {
      baseAssignValue(object, key, newValue);
    } else {
      assignValue(object, key, newValue);
    }
  }
  return object;
}

module.exports = copyObject;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var baseAssignValue = __webpack_require__(16),
    eq = __webpack_require__(21);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    baseAssignValue(object, key, value);
  }
}

module.exports = assignValue;


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsNative = __webpack_require__(51),
    getValue = __webpack_require__(57);

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

module.exports = getNative;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var isFunction = __webpack_require__(18),
    isMasked = __webpack_require__(54),
    isObject = __webpack_require__(2),
    toSource = __webpack_require__(56);

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

module.exports = baseIsNative;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__(19);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),
/* 53 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var coreJsData = __webpack_require__(55);

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

module.exports = isMasked;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__(6);

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

module.exports = coreJsData;


/***/ }),
/* 56 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var funcProto = Function.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

module.exports = toSource;


/***/ }),
/* 57 */
/***/ (function(module, exports) {

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

module.exports = getValue;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

var baseRest = __webpack_require__(59),
    isIterateeCall = __webpack_require__(66);

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

module.exports = createAssigner;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

var identity = __webpack_require__(22),
    overRest = __webpack_require__(60),
    setToString = __webpack_require__(62);

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  return setToString(overRest(func, start, identity), func + '');
}

module.exports = baseRest;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var apply = __webpack_require__(61);

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * A specialized version of `baseRest` which transforms the rest array.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @param {Function} transform The rest array transform.
 * @returns {Function} Returns the new function.
 */
function overRest(func, start, transform) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = transform(array);
    return apply(func, this, otherArgs);
  };
}

module.exports = overRest;


/***/ }),
/* 61 */
/***/ (function(module, exports) {

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

module.exports = apply;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

var baseSetToString = __webpack_require__(63),
    shortOut = __webpack_require__(65);

/**
 * Sets the `toString` method of `func` to return `string`.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var setToString = shortOut(baseSetToString);

module.exports = setToString;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

var constant = __webpack_require__(64),
    defineProperty = __webpack_require__(17),
    identity = __webpack_require__(22);

/**
 * The base implementation of `setToString` without support for hot loop shorting.
 *
 * @private
 * @param {Function} func The function to modify.
 * @param {Function} string The `toString` result.
 * @returns {Function} Returns `func`.
 */
var baseSetToString = !defineProperty ? identity : function(func, string) {
  return defineProperty(func, 'toString', {
    'configurable': true,
    'enumerable': false,
    'value': constant(string),
    'writable': true
  });
};

module.exports = baseSetToString;


/***/ }),
/* 64 */
/***/ (function(module, exports) {

/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Util
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new constant function.
 * @example
 *
 * var objects = _.times(2, _.constant({ 'a': 1 }));
 *
 * console.log(objects);
 * // => [{ 'a': 1 }, { 'a': 1 }]
 *
 * console.log(objects[0] === objects[1]);
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;


/***/ }),
/* 65 */
/***/ (function(module, exports) {

/** Used to detect hot functions by number of calls within a span of milliseconds. */
var HOT_COUNT = 800,
    HOT_SPAN = 16;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeNow = Date.now;

/**
 * Creates a function that'll short out and invoke `identity` instead
 * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
 * milliseconds.
 *
 * @private
 * @param {Function} func The function to restrict.
 * @returns {Function} Returns the new shortable function.
 */
function shortOut(func) {
  var count = 0,
      lastCalled = 0;

  return function() {
    var stamp = nativeNow(),
        remaining = HOT_SPAN - (stamp - lastCalled);

    lastCalled = stamp;
    if (remaining > 0) {
      if (++count >= HOT_COUNT) {
        return arguments[0];
      }
    } else {
      count = 0;
    }
    return func.apply(undefined, arguments);
  };
}

module.exports = shortOut;


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var eq = __webpack_require__(21),
    isArrayLike = __webpack_require__(23),
    isIndex = __webpack_require__(25),
    isObject = __webpack_require__(2);

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

module.exports = isIterateeCall;


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var arrayLikeKeys = __webpack_require__(68),
    baseKeysIn = __webpack_require__(79),
    isArrayLike = __webpack_require__(23);

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = keysIn;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

var baseTimes = __webpack_require__(69),
    isArguments = __webpack_require__(70),
    isArray = __webpack_require__(72),
    isBuffer = __webpack_require__(73),
    isIndex = __webpack_require__(25),
    isTypedArray = __webpack_require__(75);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = arrayLikeKeys;


/***/ }),
/* 69 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

module.exports = baseTimes;


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsArguments = __webpack_require__(71),
    isObjectLike = __webpack_require__(7);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

module.exports = isArguments;


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

module.exports = baseIsArguments;


/***/ }),
/* 72 */
/***/ (function(module, exports) {

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

module.exports = isArray;


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var root = __webpack_require__(6),
    stubFalse = __webpack_require__(74);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined;

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

module.exports = isBuffer;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 74 */
/***/ (function(module, exports) {

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = stubFalse;


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

var baseIsTypedArray = __webpack_require__(76),
    baseUnary = __webpack_require__(77),
    nodeUtil = __webpack_require__(78);

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

module.exports = isTypedArray;


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__(5),
    isLength = __webpack_require__(24),
    isObjectLike = __webpack_require__(7);

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

module.exports = baseIsTypedArray;


/***/ }),
/* 77 */
/***/ (function(module, exports) {

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

module.exports = baseUnary;


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(module) {var freeGlobal = __webpack_require__(20);

/** Detect free variable `exports`. */
var freeExports = typeof exports == 'object' && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

module.exports = nodeUtil;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)(module)))

/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(2),
    isPrototype = __webpack_require__(80),
    nativeKeysIn = __webpack_require__(81);

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = baseKeysIn;


/***/ }),
/* 80 */
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

module.exports = isPrototype;


/***/ }),
/* 81 */
/***/ (function(module, exports) {

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = nativeKeysIn;


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _constants = __webpack_require__(8);

var _shallowDiff = __webpack_require__(83);

var _shallowDiff2 = _interopRequireDefault(_shallowDiff);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Responder for promisified results
 * @param  {object} dispatchResult The result from `store.dispatch()`
 * @param  {function} send         The function used to respond to original message
 * @return {undefined}
 */
var promiseResponder = function promiseResponder(dispatchResult, send) {
  Promise.resolve(dispatchResult).then(function (res) {
    send({
      error: null,
      value: res
    });
  }).catch(function (err) {
    console.error('error dispatching result:', err);
    send({
      error: err.message,
      value: null
    });
  });
};

exports.default = function (store, _ref) {
  var portName = _ref.portName,
      dispatchResponder = _ref.dispatchResponder;

  if (!portName) {
    throw new Error('portName is required in options');
  }

  // set dispatch responder as promise responder
  if (!dispatchResponder) {
    dispatchResponder = promiseResponder;
  }

  /**
   * Respond to dispatches from UI components
   */
  var dispatchResponse = function dispatchResponse(request, sender, sendResponse) {
    if (request.type === _constants.DISPATCH_TYPE && request.portName === portName) {
      var action = Object.assign({}, request.payload, {
        _sender: sender
      });

      var dispatchResult = null;

      try {
        dispatchResult = store.dispatch(action);
      } catch (e) {
        dispatchResult = Promise.reject(e.message);
        console.error(e);
      }

      dispatchResponder(dispatchResult, sendResponse);
      return true;
    }
  };

  /**
  * Setup for state updates
  */
  var connectState = function connectState(port) {
    if (port.name !== portName) {
      return;
    }

    var prevState = store.getState();

    var patchState = function patchState() {
      var state = store.getState();
      var diff = (0, _shallowDiff2.default)(prevState, state);

      if (diff.length) {
        prevState = state;

        port.postMessage({
          type: _constants.PATCH_STATE_TYPE,
          payload: diff
        });
      }
    };

    // Send patched state down connected port on every redux store state change
    var unsubscribe = store.subscribe(patchState);

    // when the port disconnects, unsubscribe the sendState listener
    port.onDisconnect.addListener(unsubscribe);

    // Send store's initial state through port
    port.postMessage({
      type: _constants.STATE_TYPE,
      payload: prevState
    });
  };

  /**
   * Setup action handler
   */
  chrome.runtime.onMessage.addListener(dispatchResponse);

  /**
   * Setup external action handler
   */
  if (chrome.runtime.onMessageExternal) {
    chrome.runtime.onMessageExternal.addListener(dispatchResponse);
  } else {
    console.warn('runtime.onMessageExternal is not supported');
  }

  /**
   * Setup extended connection
   */
  chrome.runtime.onConnect.addListener(connectState);

  /**
   * Setup extended external connection
   */
  if (chrome.runtime.onConnectExternal) {
    chrome.runtime.onConnectExternal.addListener(connectState);
  } else {
    console.warn('runtime.onConnectExternal is not supported');
  }
};

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = shallowDiff;

var _constants = __webpack_require__(8);

/**
 * Returns a new Object containing only the fields in `new` that differ from `old`
 *
 * @param {Object} old
 * @param {Object} new
 * @return {Array} An array of changes. The changes have a `key`, `value`, and `change`.
 *   The change is either `updated`, which is if the value has changed or been added,
 *   or `removed`.
 */
function shallowDiff(oldObj, newObj) {
  var difference = [];

  Object.keys(newObj).forEach(function (key) {
    if (oldObj[key] !== newObj[key]) {
      difference.push({
        key: key,
        value: newObj[key],
        change: _constants.DIFF_STATUS_UPDATED
      });
    }
  });

  Object.keys(oldObj).forEach(function (key) {
    if (!newObj[key]) {
      difference.push({
        key: key,
        change: _constants.DIFF_STATUS_REMOVED
      });
    }
  });

  return difference;
}

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 * Simple middleware intercepts actions and replaces with
 * another by calling an alias function with the original action
 * @type {object} aliases an object that maps action types (keys) to alias functions (values) (e.g. { SOME_ACTION: newActionAliasFunc })
 */
exports.default = function (aliases) {
  return function () {
    return function (next) {
      return function (action) {
        var alias = aliases[action.type];

        if (alias) {
          return next(alias(action));
        }

        return next(action);
      };
    };
  };
};

/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(103)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(106)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 87 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = warning;
/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
    /* eslint-disable no-empty */
  } catch (e) {}
  /* eslint-enable no-empty */
}

/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var ReactPropTypesSecret = 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED';

module.exports = ReactPropTypesSecret;


/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return subscriptionShape; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return storeShape; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_prop_types__);


var subscriptionShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  trySubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  tryUnsubscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  notifyNestedSubs: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  isSubscribed: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

var storeShape = __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.shape({
  subscribe: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  dispatch: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired,
  getState: __WEBPACK_IMPORTED_MODULE_0_prop_types___default.a.func.isRequired
});

/***/ }),
/* 90 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = connectAdvanced;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_invariant___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_invariant__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_Subscription__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__ = __webpack_require__(89);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








var hotReloadingVersion = 0;
var dummyState = {};
function noop() {}
function makeSelectorStateful(sourceSelector, store) {
  // wrap the selector in an object that tracks its results between runs.
  var selector = {
    run: function runComponentSelector(props) {
      try {
        var nextProps = sourceSelector(store.getState(), props);
        if (nextProps !== selector.props || selector.error) {
          selector.shouldComponentUpdate = true;
          selector.props = nextProps;
          selector.error = null;
        }
      } catch (error) {
        selector.shouldComponentUpdate = true;
        selector.error = error;
      }
    }
  };

  return selector;
}

function connectAdvanced(
/*
  selectorFactory is a func that is responsible for returning the selector function used to
  compute new props from state, props, and dispatch. For example:
     export default connectAdvanced((dispatch, options) => (state, props) => ({
      thing: state.things[props.thingId],
      saveThing: fields => dispatch(actionCreators.saveThing(props.thingId, fields)),
    }))(YourComponent)
   Access to dispatch is provided to the factory so selectorFactories can bind actionCreators
  outside of their selector as an optimization. Options passed to connectAdvanced are passed to
  the selectorFactory, along with displayName and WrappedComponent, as the second argument.
   Note that selectorFactory is responsible for all caching/memoization of inbound and outbound
  props. Do not use connectAdvanced directly without memoizing results between calls to your
  selector, otherwise the Connect component will re-render on every state or props change.
*/
selectorFactory) {
  var _contextTypes, _childContextTypes;

  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
      _ref$getDisplayName = _ref.getDisplayName,
      getDisplayName = _ref$getDisplayName === undefined ? function (name) {
    return 'ConnectAdvanced(' + name + ')';
  } : _ref$getDisplayName,
      _ref$methodName = _ref.methodName,
      methodName = _ref$methodName === undefined ? 'connectAdvanced' : _ref$methodName,
      _ref$renderCountProp = _ref.renderCountProp,
      renderCountProp = _ref$renderCountProp === undefined ? undefined : _ref$renderCountProp,
      _ref$shouldHandleStat = _ref.shouldHandleStateChanges,
      shouldHandleStateChanges = _ref$shouldHandleStat === undefined ? true : _ref$shouldHandleStat,
      _ref$storeKey = _ref.storeKey,
      storeKey = _ref$storeKey === undefined ? 'store' : _ref$storeKey,
      _ref$withRef = _ref.withRef,
      withRef = _ref$withRef === undefined ? false : _ref$withRef,
      connectOptions = _objectWithoutProperties(_ref, ['getDisplayName', 'methodName', 'renderCountProp', 'shouldHandleStateChanges', 'storeKey', 'withRef']);

  var subscriptionKey = storeKey + 'Subscription';
  var version = hotReloadingVersion++;

  var contextTypes = (_contextTypes = {}, _contextTypes[storeKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["a" /* storeShape */], _contextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["b" /* subscriptionShape */], _contextTypes);
  var childContextTypes = (_childContextTypes = {}, _childContextTypes[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_4__utils_PropTypes__["b" /* subscriptionShape */], _childContextTypes);

  return function wrapWithConnect(WrappedComponent) {
    __WEBPACK_IMPORTED_MODULE_1_invariant___default()(typeof WrappedComponent == 'function', 'You must pass a component to the function returned by ' + ('connect. Instead received ' + JSON.stringify(WrappedComponent)));

    var wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

    var displayName = getDisplayName(wrappedComponentName);

    var selectorFactoryOptions = _extends({}, connectOptions, {
      getDisplayName: getDisplayName,
      methodName: methodName,
      renderCountProp: renderCountProp,
      shouldHandleStateChanges: shouldHandleStateChanges,
      storeKey: storeKey,
      withRef: withRef,
      displayName: displayName,
      wrappedComponentName: wrappedComponentName,
      WrappedComponent: WrappedComponent
    });

    var Connect = function (_Component) {
      _inherits(Connect, _Component);

      function Connect(props, context) {
        _classCallCheck(this, Connect);

        var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

        _this.version = version;
        _this.state = {};
        _this.renderCount = 0;
        _this.store = props[storeKey] || context[storeKey];
        _this.propsMode = Boolean(props[storeKey]);
        _this.setWrappedInstance = _this.setWrappedInstance.bind(_this);

        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(_this.store, 'Could not find "' + storeKey + '" in either the context or props of ' + ('"' + displayName + '". Either wrap the root component in a <Provider>, ') + ('or explicitly pass "' + storeKey + '" as a prop to "' + displayName + '".'));

        _this.initSelector();
        _this.initSubscription();
        return _this;
      }

      Connect.prototype.getChildContext = function getChildContext() {
        var _ref2;

        // If this component received store from props, its subscription should be transparent
        // to any descendants receiving store+subscription from context; it passes along
        // subscription passed to it. Otherwise, it shadows the parent subscription, which allows
        // Connect to control ordering of notifications to flow top-down.
        var subscription = this.propsMode ? null : this.subscription;
        return _ref2 = {}, _ref2[subscriptionKey] = subscription || this.context[subscriptionKey], _ref2;
      };

      Connect.prototype.componentDidMount = function componentDidMount() {
        if (!shouldHandleStateChanges) return;

        // componentWillMount fires during server side rendering, but componentDidMount and
        // componentWillUnmount do not. Because of this, trySubscribe happens during ...didMount.
        // Otherwise, unsubscription would never take place during SSR, causing a memory leak.
        // To handle the case where a child component may have triggered a state change by
        // dispatching an action in its componentWillMount, we have to re-run the select and maybe
        // re-render.
        this.subscription.trySubscribe();
        this.selector.run(this.props);
        if (this.selector.shouldComponentUpdate) this.forceUpdate();
      };

      Connect.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
        this.selector.run(nextProps);
      };

      Connect.prototype.shouldComponentUpdate = function shouldComponentUpdate() {
        return this.selector.shouldComponentUpdate;
      };

      Connect.prototype.componentWillUnmount = function componentWillUnmount() {
        if (this.subscription) this.subscription.tryUnsubscribe();
        this.subscription = null;
        this.notifyNestedSubs = noop;
        this.store = null;
        this.selector.run = noop;
        this.selector.shouldComponentUpdate = false;
      };

      Connect.prototype.getWrappedInstance = function getWrappedInstance() {
        __WEBPACK_IMPORTED_MODULE_1_invariant___default()(withRef, 'To access the wrapped instance, you need to specify ' + ('{ withRef: true } in the options argument of the ' + methodName + '() call.'));
        return this.wrappedInstance;
      };

      Connect.prototype.setWrappedInstance = function setWrappedInstance(ref) {
        this.wrappedInstance = ref;
      };

      Connect.prototype.initSelector = function initSelector() {
        var sourceSelector = selectorFactory(this.store.dispatch, selectorFactoryOptions);
        this.selector = makeSelectorStateful(sourceSelector, this.store);
        this.selector.run(this.props);
      };

      Connect.prototype.initSubscription = function initSubscription() {
        if (!shouldHandleStateChanges) return;

        // parentSub's source should match where store came from: props vs. context. A component
        // connected to the store via props shouldn't use subscription from context, or vice versa.
        var parentSub = (this.propsMode ? this.props : this.context)[subscriptionKey];
        this.subscription = new __WEBPACK_IMPORTED_MODULE_3__utils_Subscription__["a" /* default */](this.store, parentSub, this.onStateChange.bind(this));

        // `notifyNestedSubs` is duplicated to handle the case where the component is  unmounted in
        // the middle of the notification loop, where `this.subscription` will then be null. An
        // extra null check every change can be avoided by copying the method onto `this` and then
        // replacing it with a no-op on unmount. This can probably be avoided if Subscription's
        // listeners logic is changed to not call listeners that have been unsubscribed in the
        // middle of the notification loop.
        this.notifyNestedSubs = this.subscription.notifyNestedSubs.bind(this.subscription);
      };

      Connect.prototype.onStateChange = function onStateChange() {
        this.selector.run(this.props);

        if (!this.selector.shouldComponentUpdate) {
          this.notifyNestedSubs();
        } else {
          this.componentDidUpdate = this.notifyNestedSubsOnComponentDidUpdate;
          this.setState(dummyState);
        }
      };

      Connect.prototype.notifyNestedSubsOnComponentDidUpdate = function notifyNestedSubsOnComponentDidUpdate() {
        // `componentDidUpdate` is conditionally implemented when `onStateChange` determines it
        // needs to notify nested subs. Once called, it unimplements itself until further state
        // changes occur. Doing it this way vs having a permanent `componentDidUpdate` that does
        // a boolean check every time avoids an extra method call most of the time, resulting
        // in some perf boost.
        this.componentDidUpdate = undefined;
        this.notifyNestedSubs();
      };

      Connect.prototype.isSubscribed = function isSubscribed() {
        return Boolean(this.subscription) && this.subscription.isSubscribed();
      };

      Connect.prototype.addExtraProps = function addExtraProps(props) {
        if (!withRef && !renderCountProp && !(this.propsMode && this.subscription)) return props;
        // make a shallow copy so that fields added don't leak to the original selector.
        // this is especially important for 'ref' since that's a reference back to the component
        // instance. a singleton memoized selector would then be holding a reference to the
        // instance, preventing the instance from being garbage collected, and that would be bad
        var withExtras = _extends({}, props);
        if (withRef) withExtras.ref = this.setWrappedInstance;
        if (renderCountProp) withExtras[renderCountProp] = this.renderCount++;
        if (this.propsMode && this.subscription) withExtras[subscriptionKey] = this.subscription;
        return withExtras;
      };

      Connect.prototype.render = function render() {
        var selector = this.selector;
        selector.shouldComponentUpdate = false;

        if (selector.error) {
          throw selector.error;
        } else {
          return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(WrappedComponent, this.addExtraProps(selector.props));
        }
      };

      return Connect;
    }(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]);

    Connect.WrappedComponent = WrappedComponent;
    Connect.displayName = displayName;
    Connect.childContextTypes = childContextTypes;
    Connect.contextTypes = contextTypes;
    Connect.propTypes = contextTypes;

    if (process.env.NODE_ENV !== 'production') {
      Connect.prototype.componentWillUpdate = function componentWillUpdate() {
        var _this2 = this;

        // We are hot reloading!
        if (this.version !== version) {
          this.version = version;
          this.initSelector();

          // If any connected descendants don't hot reload (and resubscribe in the process), their
          // listeners will be lost when we unsubscribe. Unfortunately, by copying over all
          // listeners, this does mean that the old versions of connected descendants will still be
          // notified of state changes; however, their onStateChange function is a no-op so this
          // isn't a huge deal.
          var oldListeners = [];

          if (this.subscription) {
            oldListeners = this.subscription.listeners.get();
            this.subscription.tryUnsubscribe();
          }
          this.initSubscription();
          if (shouldHandleStateChanges) {
            this.subscription.trySubscribe();
            oldListeners.forEach(function (listener) {
              return _this2.subscription.listeners.subscribe(listener);
            });
          }
        }
      };
    }

    return __WEBPACK_IMPORTED_MODULE_0_hoist_non_react_statics___default()(Connect, WrappedComponent);
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 91 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* harmony export (immutable) */ __webpack_exports__["a"] = wrapMapToPropsConstant;
/* unused harmony export getDependsOnOwnProps */
/* harmony export (immutable) */ __webpack_exports__["b"] = wrapMapToPropsFunc;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(92);


function wrapMapToPropsConstant(getConstant) {
  return function initConstantSelector(dispatch, options) {
    var constant = getConstant(dispatch, options);

    function constantSelector() {
      return constant;
    }
    constantSelector.dependsOnOwnProps = false;
    return constantSelector;
  };
}

// dependsOnOwnProps is used by createMapToPropsProxy to determine whether to pass props as args
// to the mapToProps function being wrapped. It is also used by makePurePropsSelector to determine
// whether mapToProps needs to be invoked when props have changed.
// 
// A length of one signals that mapToProps does not depend on props from the parent component.
// A length of zero is assumed to mean mapToProps is getting args via arguments or ...args and
// therefore not reporting its length accurately..
function getDependsOnOwnProps(mapToProps) {
  return mapToProps.dependsOnOwnProps !== null && mapToProps.dependsOnOwnProps !== undefined ? Boolean(mapToProps.dependsOnOwnProps) : mapToProps.length !== 1;
}

// Used by whenMapStateToPropsIsFunction and whenMapDispatchToPropsIsFunction,
// this function wraps mapToProps in a proxy function which does several things:
// 
//  * Detects whether the mapToProps function being called depends on props, which
//    is used by selectorFactory to decide if it should reinvoke on props changes.
//    
//  * On first call, handles mapToProps if returns another function, and treats that
//    new function as the true mapToProps for subsequent calls.
//    
//  * On first call, verifies the first result is a plain object, in order to warn
//    the developer that their mapToProps function is not returning a valid result.
//    
function wrapMapToPropsFunc(mapToProps, methodName) {
  return function initProxySelector(dispatch, _ref) {
    var displayName = _ref.displayName;

    var proxy = function mapToPropsProxy(stateOrDispatch, ownProps) {
      return proxy.dependsOnOwnProps ? proxy.mapToProps(stateOrDispatch, ownProps) : proxy.mapToProps(stateOrDispatch);
    };

    // allow detectFactoryAndVerify to get ownProps
    proxy.dependsOnOwnProps = true;

    proxy.mapToProps = function detectFactoryAndVerify(stateOrDispatch, ownProps) {
      proxy.mapToProps = mapToProps;
      proxy.dependsOnOwnProps = getDependsOnOwnProps(mapToProps);
      var props = proxy(stateOrDispatch, ownProps);

      if (typeof props === 'function') {
        proxy.mapToProps = props;
        proxy.dependsOnOwnProps = getDependsOnOwnProps(props);
        props = proxy(stateOrDispatch, ownProps);
      }

      if (process.env.NODE_ENV !== 'production') Object(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(props, displayName, methodName);

      return props;
    };

    return proxy;
  };
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 92 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifyPlainObject;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__warning__ = __webpack_require__(87);



function verifyPlainObject(value, displayName, methodName) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_0_lodash_es_isPlainObject__["a" /* default */])(value)) {
    Object(__WEBPACK_IMPORTED_MODULE_1__warning__["a" /* default */])(methodName + '() in ' + displayName + ' must return a plain object. Instead received ' + value + '.');
  }
}

/***/ }),
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_chrome_redux__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_chrome_redux___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_chrome_redux__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_react_redux__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__assets_containers_app__ = __webpack_require__(119);






var proxyStore = new __WEBPACK_IMPORTED_MODULE_2_react_chrome_redux__["Store"]({
  portName: 'stackTabs'
});

proxyStore.ready().then(function () {
  Object(__WEBPACK_IMPORTED_MODULE_1_react_dom__["render"])(__WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
    __WEBPACK_IMPORTED_MODULE_3_react_redux__["a" /* Provider */],
    { store: proxyStore },
    __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(__WEBPACK_IMPORTED_MODULE_4__assets_containers_app__["a" /* default */], null)
  ), document.querySelector('.app'));
});

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(27);
var invariant = __webpack_require__(11);
var warning = __webpack_require__(30);
var assign = __webpack_require__(104);

var ReactPropTypesSecret = __webpack_require__(86);
var checkPropTypes = __webpack_require__(105);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker,
    exact: createStrictShapeTypeChecker,
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplied to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createStrictShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      // We need to check all keys in case some are required but missing from
      // props.
      var allKeys = assign({}, props[propName], shapeTypes);
      for (var key in allKeys) {
        var checker = shapeTypes[key];
        if (!checker) {
          return new PropTypeError(
            'Invalid ' + location + ' `' + propFullName + '` key `' + key + '` supplied to `' + componentName + '`.' +
            '\nBad object: ' + JSON.stringify(props[propName], null, '  ') +
            '\nValid keys: ' +  JSON.stringify(Object.keys(shapeTypes), null, '  ')
          );
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }

    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(11);
  var warning = __webpack_require__(30);
  var ReactPropTypesSecret = __webpack_require__(86);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'the `prop-types` package, but received `%s`.', componentName || 'React class', location, typeSpecName, typeof typeSpecs[typeSpecName]);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



var emptyFunction = __webpack_require__(27);
var invariant = __webpack_require__(11);
var ReactPropTypesSecret = __webpack_require__(86);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim,
    exact: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 107 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return h; });
/* unused harmony export createElement */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return cloneElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Component; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return render; });
/* unused harmony export rerender */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return options; });
/** Virtual DOM Node */
function VNode() {}

/** Global options
 *	@public
 *	@namespace options {Object}
 */
var options = {

	/** If `true`, `prop` changes trigger synchronous component updates.
  *	@name syncComponentUpdates
  *	@type Boolean
  *	@default true
  */
	//syncComponentUpdates: true,

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  */
	//vnode(vnode) { }

	/** Hook invoked after a component is mounted. */
	// afterMount(component) { }

	/** Hook invoked after the DOM is updated with a component's latest render. */
	// afterUpdate(component) { }

	/** Hook invoked immediately before a component is unmounted. */
	// beforeUnmount(component) { }
};

var stack = [];

var EMPTY_CHILDREN = [];

/** JSX/hyperscript reviver
*	Benchmarks: https://esbench.com/bench/57ee8f8e330ab09900a1a1a0
 *	@see http://jasonformat.com/wtf-is-jsx
 *	@public
 */
function h(nodeName, attributes) {
	var children = EMPTY_CHILDREN,
	    lastSimple,
	    child,
	    simple,
	    i;
	for (i = arguments.length; i-- > 2;) {
		stack.push(arguments[i]);
	}
	if (attributes && attributes.children != null) {
		if (!stack.length) stack.push(attributes.children);
		delete attributes.children;
	}
	while (stack.length) {
		if ((child = stack.pop()) && child.pop !== undefined) {
			for (i = child.length; i--;) {
				stack.push(child[i]);
			}
		} else {
			if (typeof child === 'boolean') child = null;

			if (simple = typeof nodeName !== 'function') {
				if (child == null) child = '';else if (typeof child === 'number') child = String(child);else if (typeof child !== 'string') simple = false;
			}

			if (simple && lastSimple) {
				children[children.length - 1] += child;
			} else if (children === EMPTY_CHILDREN) {
				children = [child];
			} else {
				children.push(child);
			}

			lastSimple = simple;
		}
	}

	var p = new VNode();
	p.nodeName = nodeName;
	p.children = children;
	p.attributes = attributes == null ? undefined : attributes;
	p.key = attributes == null ? undefined : attributes.key;

	// if a "vnode hook" is defined, pass every created VNode to it
	if (options.vnode !== undefined) options.vnode(p);

	return p;
}

/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */
function extend(obj, props) {
  for (var i in props) {
    obj[i] = props[i];
  }return obj;
}

/** Call a function asynchronously, as soon as possible.
 *	@param {Function} callback
 */
var defer = typeof Promise == 'function' ? Promise.resolve().then.bind(Promise.resolve()) : setTimeout;

function cloneElement(vnode, props) {
	return h(vnode.nodeName, extend(extend({}, vnode.attributes), props), arguments.length > 2 ? [].slice.call(arguments, 2) : vnode.children);
}

// DOM properties that should NOT have "px" added when numeric
var IS_NON_DIMENSIONAL = /acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i;

/** Managed queue of dirty components to be re-rendered */

var items = [];

function enqueueRender(component) {
	if (!component._dirty && (component._dirty = true) && items.push(component) == 1) {
		(options.debounceRendering || defer)(rerender);
	}
}

function rerender() {
	var p,
	    list = items;
	items = [];
	while (p = list.pop()) {
		if (p._dirty) renderComponent(p);
	}
}

/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */
function isSameNodeType(node, vnode, hydrating) {
	if (typeof vnode === 'string' || typeof vnode === 'number') {
		return node.splitText !== undefined;
	}
	if (typeof vnode.nodeName === 'string') {
		return !node._componentConstructor && isNamedNode(node, vnode.nodeName);
	}
	return hydrating || node._componentConstructor === vnode.nodeName;
}

/** Check if an Element has a given normalized name.
*	@param {Element} node
*	@param {String} nodeName
 */
function isNamedNode(node, nodeName) {
	return node.normalizedNodeName === nodeName || node.nodeName.toLowerCase() === nodeName.toLowerCase();
}

/**
 * Reconstruct Component-style `props` from a VNode.
 * Ensures default/fallback values from `defaultProps`:
 * Own-properties of `defaultProps` not present in `vnode.attributes` are added.
 * @param {VNode} vnode
 * @returns {Object} props
 */
function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	props.children = vnode.children;

	var defaultProps = vnode.nodeName.defaultProps;
	if (defaultProps !== undefined) {
		for (var i in defaultProps) {
			if (props[i] === undefined) {
				props[i] = defaultProps[i];
			}
		}
	}

	return props;
}

/** Create an element with the given nodeName.
 *	@param {String} nodeName
 *	@param {Boolean} [isSvg=false]	If `true`, creates an element within the SVG namespace.
 *	@returns {Element} node
 */
function createNode(nodeName, isSvg) {
	var node = isSvg ? document.createElementNS('http://www.w3.org/2000/svg', nodeName) : document.createElement(nodeName);
	node.normalizedNodeName = nodeName;
	return node;
}

/** Remove a child node from its parent if attached.
 *	@param {Element} node		The node to remove
 */
function removeNode(node) {
	var parentNode = node.parentNode;
	if (parentNode) parentNode.removeChild(node);
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@param {Element} node	An element to mutate
 *	@param {string} name	The name/key to set, such as an event or attribute name
 *	@param {any} old	The last value that was set for this name/node pair
 *	@param {any} value	An attribute value, such as a function to be used as an event handler
 *	@param {Boolean} isSvg	Are we currently diffing inside an svg?
 *	@private
 */
function setAccessor(node, name, old, value, isSvg) {
	if (name === 'className') name = 'class';

	if (name === 'key') {
		// ignore
	} else if (name === 'ref') {
		if (old) old(null);
		if (value) value(node);
	} else if (name === 'class' && !isSvg) {
		node.className = value || '';
	} else if (name === 'style') {
		if (!value || typeof value === 'string' || typeof old === 'string') {
			node.style.cssText = value || '';
		}
		if (value && typeof value === 'object') {
			if (typeof old !== 'string') {
				for (var i in old) {
					if (!(i in value)) node.style[i] = '';
				}
			}
			for (var i in value) {
				node.style[i] = typeof value[i] === 'number' && IS_NON_DIMENSIONAL.test(i) === false ? value[i] + 'px' : value[i];
			}
		}
	} else if (name === 'dangerouslySetInnerHTML') {
		if (value) node.innerHTML = value.__html || '';
	} else if (name[0] == 'o' && name[1] == 'n') {
		var useCapture = name !== (name = name.replace(/Capture$/, ''));
		name = name.toLowerCase().substring(2);
		if (value) {
			if (!old) node.addEventListener(name, eventProxy, useCapture);
		} else {
			node.removeEventListener(name, eventProxy, useCapture);
		}
		(node._listeners || (node._listeners = {}))[name] = value;
	} else if (name !== 'list' && name !== 'type' && !isSvg && name in node) {
		setProperty(node, name, value == null ? '' : value);
		if (value == null || value === false) node.removeAttribute(name);
	} else {
		var ns = isSvg && name !== (name = name.replace(/^xlink\:?/, ''));
		if (value == null || value === false) {
			if (ns) node.removeAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase());else node.removeAttribute(name);
		} else if (typeof value !== 'function') {
			if (ns) node.setAttributeNS('http://www.w3.org/1999/xlink', name.toLowerCase(), value);else node.setAttribute(name, value);
		}
	}
}

/** Attempt to set a DOM property to the given value.
 *	IE & FF throw for certain property-value combinations.
 */
function setProperty(node, name, value) {
	try {
		node[name] = value;
	} catch (e) {}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	return this._listeners[e.type](options.event && options.event(e) || e);
}

/** Queue of components that have been mounted and are awaiting componentDidMount */
var mounts = [];

/** Diff recursion count, used to track the end of the diff cycle. */
var diffLevel = 0;

/** Global flag indicating if the diff is currently within an SVG */
var isSvgMode = false;

/** Global flag indicating if the diff is performing hydration */
var hydrating = false;

/** Invoke queued componentDidMount lifecycle methods */
function flushMounts() {
	var c;
	while (c = mounts.pop()) {
		if (options.afterMount) options.afterMount(c);
		if (c.componentDidMount) c.componentDidMount();
	}
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function diff(dom, vnode, context, mountAll, parent, componentRoot) {
	// diffLevel having been 0 here indicates initial entry into the diff (not a subdiff)
	if (!diffLevel++) {
		// when first starting the diff, check if we're diffing an SVG or within an SVG
		isSvgMode = parent != null && parent.ownerSVGElement !== undefined;

		// hydration is indicated by the existing element to be diffed not having a prop cache
		hydrating = dom != null && !('__preactattr_' in dom);
	}

	var ret = idiff(dom, vnode, context, mountAll, componentRoot);

	// append the element if its a new parent
	if (parent && ret.parentNode !== parent) parent.appendChild(ret);

	// diffLevel being reduced to 0 means we're exiting the diff
	if (! --diffLevel) {
		hydrating = false;
		// invoke queued componentDidMount lifecycle methods
		if (!componentRoot) flushMounts();
	}

	return ret;
}

/** Internals of `diff()`, separated to allow bypassing diffLevel / mount flushing. */
function idiff(dom, vnode, context, mountAll, componentRoot) {
	var out = dom,
	    prevSvgMode = isSvgMode;

	// empty values (null, undefined, booleans) render as empty Text nodes
	if (vnode == null || typeof vnode === 'boolean') vnode = '';

	// Fast case: Strings & Numbers create/update Text nodes.
	if (typeof vnode === 'string' || typeof vnode === 'number') {

		// update if it's already a Text node:
		if (dom && dom.splitText !== undefined && dom.parentNode && (!dom._component || componentRoot)) {
			/* istanbul ignore if */ /* Browser quirk that can't be covered: https://github.com/developit/preact/commit/fd4f21f5c45dfd75151bd27b4c217d8003aa5eb9 */
			if (dom.nodeValue != vnode) {
				dom.nodeValue = vnode;
			}
		} else {
			// it wasn't a Text node: replace it with one and recycle the old Element
			out = document.createTextNode(vnode);
			if (dom) {
				if (dom.parentNode) dom.parentNode.replaceChild(out, dom);
				recollectNodeTree(dom, true);
			}
		}

		out['__preactattr_'] = true;

		return out;
	}

	// If the VNode represents a Component, perform a component diff:
	var vnodeName = vnode.nodeName;
	if (typeof vnodeName === 'function') {
		return buildComponentFromVNode(dom, vnode, context, mountAll);
	}

	// Tracks entering and exiting SVG namespace when descending through the tree.
	isSvgMode = vnodeName === 'svg' ? true : vnodeName === 'foreignObject' ? false : isSvgMode;

	// If there's no existing element or it's the wrong type, create a new one:
	vnodeName = String(vnodeName);
	if (!dom || !isNamedNode(dom, vnodeName)) {
		out = createNode(vnodeName, isSvgMode);

		if (dom) {
			// move children into the replacement node
			while (dom.firstChild) {
				out.appendChild(dom.firstChild);
			} // if the previous Element was mounted into the DOM, replace it inline
			if (dom.parentNode) dom.parentNode.replaceChild(out, dom);

			// recycle the old element (skips non-Element node types)
			recollectNodeTree(dom, true);
		}
	}

	var fc = out.firstChild,
	    props = out['__preactattr_'],
	    vchildren = vnode.children;

	if (props == null) {
		props = out['__preactattr_'] = {};
		for (var a = out.attributes, i = a.length; i--;) {
			props[a[i].name] = a[i].value;
		}
	}

	// Optimization: fast-path for elements containing a single TextNode:
	if (!hydrating && vchildren && vchildren.length === 1 && typeof vchildren[0] === 'string' && fc != null && fc.splitText !== undefined && fc.nextSibling == null) {
		if (fc.nodeValue != vchildren[0]) {
			fc.nodeValue = vchildren[0];
		}
	}
	// otherwise, if there are existing or new children, diff them:
	else if (vchildren && vchildren.length || fc != null) {
			innerDiffNode(out, vchildren, context, mountAll, hydrating || props.dangerouslySetInnerHTML != null);
		}

	// Apply attributes/props from VNode to the DOM Element:
	diffAttributes(out, vnode.attributes, props);

	// restore previous SVG mode: (in case we're exiting an SVG namespace)
	isSvgMode = prevSvgMode;

	return out;
}

/** Apply child and attribute changes between a VNode and a DOM Node to the DOM.
 *	@param {Element} dom			Element whose children should be compared & mutated
 *	@param {Array} vchildren		Array of VNodes to compare to `dom.childNodes`
 *	@param {Object} context			Implicitly descendant context object (from most recent `getChildContext()`)
 *	@param {Boolean} mountAll
 *	@param {Boolean} isHydrating	If `true`, consumes externally created elements similar to hydration
 */
function innerDiffNode(dom, vchildren, context, mountAll, isHydrating) {
	var originalChildren = dom.childNodes,
	    children = [],
	    keyed = {},
	    keyedLen = 0,
	    min = 0,
	    len = originalChildren.length,
	    childrenLen = 0,
	    vlen = vchildren ? vchildren.length : 0,
	    j,
	    c,
	    f,
	    vchild,
	    child;

	// Build up a map of keyed children and an Array of unkeyed children:
	if (len !== 0) {
		for (var i = 0; i < len; i++) {
			var _child = originalChildren[i],
			    props = _child['__preactattr_'],
			    key = vlen && props ? _child._component ? _child._component.__key : props.key : null;
			if (key != null) {
				keyedLen++;
				keyed[key] = _child;
			} else if (props || (_child.splitText !== undefined ? isHydrating ? _child.nodeValue.trim() : true : isHydrating)) {
				children[childrenLen++] = _child;
			}
		}
	}

	if (vlen !== 0) {
		for (var i = 0; i < vlen; i++) {
			vchild = vchildren[i];
			child = null;

			// attempt to find a node based on key matching
			var key = vchild.key;
			if (key != null) {
				if (keyedLen && keyed[key] !== undefined) {
					child = keyed[key];
					keyed[key] = undefined;
					keyedLen--;
				}
			}
			// attempt to pluck a node of the same type from the existing children
			else if (!child && min < childrenLen) {
					for (j = min; j < childrenLen; j++) {
						if (children[j] !== undefined && isSameNodeType(c = children[j], vchild, isHydrating)) {
							child = c;
							children[j] = undefined;
							if (j === childrenLen - 1) childrenLen--;
							if (j === min) min++;
							break;
						}
					}
				}

			// morph the matched/found/created DOM child to match vchild (deep)
			child = idiff(child, vchild, context, mountAll);

			f = originalChildren[i];
			if (child && child !== dom && child !== f) {
				if (f == null) {
					dom.appendChild(child);
				} else if (child === f.nextSibling) {
					removeNode(f);
				} else {
					dom.insertBefore(child, f);
				}
			}
		}
	}

	// remove unused keyed children:
	if (keyedLen) {
		for (var i in keyed) {
			if (keyed[i] !== undefined) recollectNodeTree(keyed[i], false);
		}
	}

	// remove orphaned unkeyed children:
	while (min <= childrenLen) {
		if ((child = children[childrenLen--]) !== undefined) recollectNodeTree(child, false);
	}
}

/** Recursively recycle (or just unmount) a node and its descendants.
 *	@param {Node} node						DOM node to start unmount/removal from
 *	@param {Boolean} [unmountOnly=false]	If `true`, only triggers unmount lifecycle, skips removal
 */
function recollectNodeTree(node, unmountOnly) {
	var component = node._component;
	if (component) {
		// if node is owned by a Component, unmount that component (ends up recursing back here)
		unmountComponent(component);
	} else {
		// If the node's VNode had a ref function, invoke it with null here.
		// (this is part of the React spec, and smart for unsetting references)
		if (node['__preactattr_'] != null && node['__preactattr_'].ref) node['__preactattr_'].ref(null);

		if (unmountOnly === false || node['__preactattr_'] == null) {
			removeNode(node);
		}

		removeChildren(node);
	}
}

/** Recollect/unmount all children.
 *	- we use .lastChild here because it causes less reflow than .firstChild
 *	- it's also cheaper than accessing the .childNodes Live NodeList
 */
function removeChildren(node) {
	node = node.lastChild;
	while (node) {
		var next = node.previousSibling;
		recollectNodeTree(node, true);
		node = next;
	}
}

/** Apply differences in attributes from a VNode to the given DOM Element.
 *	@param {Element} dom		Element with attributes to diff `attrs` against
 *	@param {Object} attrs		The desired end-state key-value attribute pairs
 *	@param {Object} old			Current/previous attributes (from previous VNode or element's prop cache)
 */
function diffAttributes(dom, attrs, old) {
	var name;

	// remove attributes no longer present on the vnode by setting them to undefined
	for (name in old) {
		if (!(attrs && attrs[name] != null) && old[name] != null) {
			setAccessor(dom, name, old[name], old[name] = undefined, isSvgMode);
		}
	}

	// add new & update changed attributes
	for (name in attrs) {
		if (name !== 'children' && name !== 'innerHTML' && (!(name in old) || attrs[name] !== (name === 'value' || name === 'checked' ? dom[name] : old[name]))) {
			setAccessor(dom, name, old[name], old[name] = attrs[name], isSvgMode);
		}
	}
}

/** Retains a pool of Components for re-use, keyed on component name.
 *	Note: since component names are not unique or even necessarily available, these are primarily a form of sharding.
 *	@private
 */
var components = {};

/** Reclaim a component for later re-use by the recycler. */
function collectComponent(component) {
	var name = component.constructor.name;
	(components[name] || (components[name] = [])).push(component);
}

/** Create a component. Normalizes differences between PFC's and classful Components. */
function createComponent(Ctor, props, context) {
	var list = components[Ctor.name],
	    inst;

	if (Ctor.prototype && Ctor.prototype.render) {
		inst = new Ctor(props, context);
		Component.call(inst, props, context);
	} else {
		inst = new Component(props, context);
		inst.constructor = Ctor;
		inst.render = doRender;
	}

	if (list) {
		for (var i = list.length; i--;) {
			if (list[i].constructor === Ctor) {
				inst.nextBase = list[i].nextBase;
				list.splice(i, 1);
				break;
			}
		}
	}
	return inst;
}

/** The `.render()` method for a PFC backing instance. */
function doRender(props, state, context) {
	return this.constructor(props, context);
}

/** Set a component's `props` (generally derived from JSX attributes).
 *	@param {Object} props
 *	@param {Object} [opts]
 *	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
 *	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props, opts, context, mountAll) {
	if (component._disable) return;
	component._disable = true;

	if (component.__ref = props.ref) delete props.ref;
	if (component.__key = props.key) delete props.key;

	if (!component.base || mountAll) {
		if (component.componentWillMount) component.componentWillMount();
	} else if (component.componentWillReceiveProps) {
		component.componentWillReceiveProps(props, context);
	}

	if (context && context !== component.context) {
		if (!component.prevContext) component.prevContext = component.context;
		component.context = context;
	}

	if (!component.prevProps) component.prevProps = component.props;
	component.props = props;

	component._disable = false;

	if (opts !== 0) {
		if (opts === 1 || options.syncComponentUpdates !== false || !component.base) {
			renderComponent(component, 1, mountAll);
		} else {
			enqueueRender(component);
		}
	}

	if (component.__ref) component.__ref(component);
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts, mountAll, isChild) {
	if (component._disable) return;

	var props = component.props,
	    state = component.state,
	    context = component.context,
	    previousProps = component.prevProps || props,
	    previousState = component.prevState || state,
	    previousContext = component.prevContext || context,
	    isUpdate = component.base,
	    nextBase = component.nextBase,
	    initialBase = isUpdate || nextBase,
	    initialChildComponent = component._component,
	    skip = false,
	    rendered,
	    inst,
	    cbase;

	// if updating
	if (isUpdate) {
		component.props = previousProps;
		component.state = previousState;
		component.context = previousContext;
		if (opts !== 2 && component.shouldComponentUpdate && component.shouldComponentUpdate(props, state, context) === false) {
			skip = true;
		} else if (component.componentWillUpdate) {
			component.componentWillUpdate(props, state, context);
		}
		component.props = props;
		component.state = state;
		component.context = context;
	}

	component.prevProps = component.prevState = component.prevContext = component.nextBase = null;
	component._dirty = false;

	if (!skip) {
		rendered = component.render(props, state, context);

		// context to pass to the child, can be updated via (grand-)parent component
		if (component.getChildContext) {
			context = extend(extend({}, context), component.getChildContext());
		}

		var childComponent = rendered && rendered.nodeName,
		    toUnmount,
		    base;

		if (typeof childComponent === 'function') {
			// set up high order component link

			var childProps = getNodeProps(rendered);
			inst = initialChildComponent;

			if (inst && inst.constructor === childComponent && childProps.key == inst.__key) {
				setComponentProps(inst, childProps, 1, context, false);
			} else {
				toUnmount = inst;

				component._component = inst = createComponent(childComponent, childProps, context);
				inst.nextBase = inst.nextBase || nextBase;
				inst._parentComponent = component;
				setComponentProps(inst, childProps, 0, context, false);
				renderComponent(inst, 1, mountAll, true);
			}

			base = inst.base;
		} else {
			cbase = initialBase;

			// destroy high order component link
			toUnmount = initialChildComponent;
			if (toUnmount) {
				cbase = component._component = null;
			}

			if (initialBase || opts === 1) {
				if (cbase) cbase._component = null;
				base = diff(cbase, rendered, context, mountAll || !isUpdate, initialBase && initialBase.parentNode, true);
			}
		}

		if (initialBase && base !== initialBase && inst !== initialChildComponent) {
			var baseParent = initialBase.parentNode;
			if (baseParent && base !== baseParent) {
				baseParent.replaceChild(base, initialBase);

				if (!toUnmount) {
					initialBase._component = null;
					recollectNodeTree(initialBase, false);
				}
			}
		}

		if (toUnmount) {
			unmountComponent(toUnmount);
		}

		component.base = base;
		if (base && !isChild) {
			var componentRef = component,
			    t = component;
			while (t = t._parentComponent) {
				(componentRef = t).base = base;
			}
			base._component = componentRef;
			base._componentConstructor = componentRef.constructor;
		}
	}

	if (!isUpdate || mountAll) {
		mounts.unshift(component);
	} else if (!skip) {
		// Ensure that pending componentDidMount() hooks of child components
		// are called before the componentDidUpdate() hook in the parent.
		// Note: disabled as it causes duplicate hooks, see https://github.com/developit/preact/issues/750
		// flushMounts();

		if (component.componentDidUpdate) {
			component.componentDidUpdate(previousProps, previousState, previousContext);
		}
		if (options.afterUpdate) options.afterUpdate(component);
	}

	if (component._renderCallbacks != null) {
		while (component._renderCallbacks.length) {
			component._renderCallbacks.pop().call(component);
		}
	}

	if (!diffLevel && !isChild) flushMounts();
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode, context, mountAll) {
	var c = dom && dom._component,
	    originalComponent = c,
	    oldDom = dom,
	    isDirectOwner = c && dom._componentConstructor === vnode.nodeName,
	    isOwner = isDirectOwner,
	    props = getNodeProps(vnode);
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (c && isOwner && (!mountAll || c._component)) {
		setComponentProps(c, props, 3, context, mountAll);
		dom = c.base;
	} else {
		if (originalComponent && !isDirectOwner) {
			unmountComponent(originalComponent);
			dom = oldDom = null;
		}

		c = createComponent(vnode.nodeName, props, context);
		if (dom && !c.nextBase) {
			c.nextBase = dom;
			// passing dom/oldDom as nextBase will recycle it if unused, so bypass recycling on L229:
			oldDom = null;
		}
		setComponentProps(c, props, 1, context, mountAll);
		dom = c.base;

		if (oldDom && dom !== oldDom) {
			oldDom._component = null;
			recollectNodeTree(oldDom, false);
		}
	}

	return dom;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(component) {
	if (options.beforeUnmount) options.beforeUnmount(component);

	var base = component.base;

	component._disable = true;

	if (component.componentWillUnmount) component.componentWillUnmount();

	component.base = null;

	// recursively tear down & recollect high-order component children:
	var inner = component._component;
	if (inner) {
		unmountComponent(inner);
	} else if (base) {
		if (base['__preactattr_'] && base['__preactattr_'].ref) base['__preactattr_'].ref(null);

		component.nextBase = base;

		removeNode(base);
		collectComponent(component);

		removeChildren(base);
	}

	if (component.__ref) component.__ref(null);
}

/** Base Component class.
 *	Provides `setState()` and `forceUpdate()`, which trigger rendering.
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */
function Component(props, context) {
	this._dirty = true;

	/** @public
  *	@type {object}
  */
	this.context = context;

	/** @public
  *	@type {object}
  */
	this.props = props;

	/** @public
  *	@type {object}
  */
	this.state = this.state || {};
}

extend(Component.prototype, {

	/** Returns a `boolean` indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} nextProps
  *	@param {object} nextState
  *	@param {object} nextContext
  *	@returns {Boolean} should the component re-render
  *	@name shouldComponentUpdate
  *	@function
  */

	/** Update component state by copying properties from `state` to `this.state`.
  *	@param {object} state		A hash of state properties to update with new values
  *	@param {function} callback	A function to be called once component state is updated
  */
	setState: function setState(state, callback) {
		var s = this.state;
		if (!this.prevState) this.prevState = extend({}, s);
		extend(s, typeof state === 'function' ? state(s, this.props) : state);
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		enqueueRender(this);
	},


	/** Immediately perform a synchronous re-render of the component.
  *	@param {function} callback		A function to be called after component is re-rendered.
  *	@private
  */
	forceUpdate: function forceUpdate(callback) {
		if (callback) (this._renderCallbacks = this._renderCallbacks || []).push(callback);
		renderComponent(this, 2);
	},


	/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
  *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
  *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
  *	@param {object} state		The component's current state
  *	@param {object} context		Context object (if a parent component has provided context)
  *	@returns VNode
  */
	render: function render() {}
});

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent, merge) {
  return diff(merge, vnode, {}, false, parent, false);
}

var preact = {
	h: h,
	createElement: h,
	cloneElement: cloneElement,
	Component: Component,
	render: render,
	rerender: rerender,
	options: options
};


/* unused harmony default export */ var _unused_webpack_default_export = (preact);
//# sourceMappingURL=preact.esm.js.map


/***/ }),
/* 108 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export createProvider */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_prop_types___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_prop_types__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils_warning__ = __webpack_require__(87);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }






var didWarnAboutReceivingStore = false;
function warnAboutReceivingStore() {
  if (didWarnAboutReceivingStore) {
    return;
  }
  didWarnAboutReceivingStore = true;

  Object(__WEBPACK_IMPORTED_MODULE_3__utils_warning__["a" /* default */])('<Provider> does not support changing `store` on the fly. ' + 'It is most likely that you see this error because you updated to ' + 'Redux 2.x and React Redux 2.x which no longer hot reload reducers ' + 'automatically. See https://github.com/reactjs/react-redux/releases/' + 'tag/v2.0.0 for the migration instructions.');
}

function createProvider() {
  var _Provider$childContex;

  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  var subKey = arguments[1];

  var subscriptionKey = subKey || storeKey + 'Subscription';

  var Provider = function (_Component) {
    _inherits(Provider, _Component);

    Provider.prototype.getChildContext = function getChildContext() {
      var _ref;

      return _ref = {}, _ref[storeKey] = this[storeKey], _ref[subscriptionKey] = null, _ref;
    };

    function Provider(props, context) {
      _classCallCheck(this, Provider);

      var _this = _possibleConstructorReturn(this, _Component.call(this, props, context));

      _this[storeKey] = props.store;
      return _this;
    }

    Provider.prototype.render = function render() {
      return __WEBPACK_IMPORTED_MODULE_0_react__["Children"].only(this.props.children);
    };

    return Provider;
  }(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

  if (process.env.NODE_ENV !== 'production') {
    Provider.prototype.componentWillReceiveProps = function (nextProps) {
      if (this[storeKey] !== nextProps.store) {
        warnAboutReceivingStore();
      }
    };
  }

  Provider.propTypes = {
    store: __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired,
    children: __WEBPACK_IMPORTED_MODULE_1_prop_types___default.a.element.isRequired
  };
  Provider.childContextTypes = (_Provider$childContex = {}, _Provider$childContex[storeKey] = __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["a" /* storeShape */].isRequired, _Provider$childContex[subscriptionKey] = __WEBPACK_IMPORTED_MODULE_2__utils_PropTypes__["b" /* subscriptionShape */], _Provider$childContex);

  return Provider;
}

/* harmony default export */ __webpack_exports__["a"] = (createProvider());
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2015, Yahoo! Inc.
 * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
 */


var REACT_STATICS = {
    childContextTypes: true,
    contextTypes: true,
    defaultProps: true,
    displayName: true,
    getDefaultProps: true,
    mixins: true,
    propTypes: true,
    type: true
};

var KNOWN_STATICS = {
  name: true,
  length: true,
  prototype: true,
  caller: true,
  callee: true,
  arguments: true,
  arity: true
};

var defineProperty = Object.defineProperty;
var getOwnPropertyNames = Object.getOwnPropertyNames;
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var getPrototypeOf = Object.getPrototypeOf;
var objectPrototype = getPrototypeOf && getPrototypeOf(Object);

module.exports = function hoistNonReactStatics(targetComponent, sourceComponent, blacklist) {
    if (typeof sourceComponent !== 'string') { // don't hoist over string (html) components

        if (objectPrototype) {
            var inheritedComponent = getPrototypeOf(sourceComponent);
            if (inheritedComponent && inheritedComponent !== objectPrototype) {
                hoistNonReactStatics(targetComponent, inheritedComponent, blacklist);
            }
        }

        var keys = getOwnPropertyNames(sourceComponent);

        if (getOwnPropertySymbols) {
            keys = keys.concat(getOwnPropertySymbols(sourceComponent));
        }

        for (var i = 0; i < keys.length; ++i) {
            var key = keys[i];
            if (!REACT_STATICS[key] && !KNOWN_STATICS[key] && (!blacklist || !blacklist[key])) {
                var descriptor = getOwnPropertyDescriptor(sourceComponent, key);
                try { // Avoid failures from read-only properties
                    defineProperty(targetComponent, key, descriptor);
                } catch (e) {}
            }
        }

        return targetComponent;
    }

    return targetComponent;
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-2015, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



/**
 * Use invariant() to assert state which your program assumes to be true.
 *
 * Provide sprintf-style format (only %s is supported) and arguments
 * to provide information about what broke and what you were
 * expecting.
 *
 * The invariant message will be stripped in production, but the invariant
 * will remain to ensure logic does not differ in production.
 */

var invariant = function(condition, format, a, b, c, d, e, f) {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument');
    }
  }

  if (!condition) {
    var error;
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      );
    } else {
      var args = [a, b, c, d, e, f];
      var argIndex = 0;
      error = new Error(
        format.replace(/%s/g, function() { return args[argIndex++]; })
      );
      error.name = 'Invariant Violation';
    }

    error.framesToPop = 1; // we don't care about invariant's own frame
    throw error;
  }
};

module.exports = invariant;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 111 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subscription; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// encapsulates the subscription logic for connecting a component to the redux store, as
// well as nesting subscriptions of descendant components, so that we can ensure the
// ancestor components re-render before descendants

var CLEARED = null;
var nullListeners = {
  notify: function notify() {}
};

function createListenerCollection() {
  // the current/next pattern is copied from redux's createStore code.
  // TODO: refactor+expose that code to be reusable here?
  var current = [];
  var next = [];

  return {
    clear: function clear() {
      next = CLEARED;
      current = CLEARED;
    },
    notify: function notify() {
      var listeners = current = next;
      for (var i = 0; i < listeners.length; i++) {
        listeners[i]();
      }
    },
    get: function get() {
      return next;
    },
    subscribe: function subscribe(listener) {
      var isSubscribed = true;
      if (next === current) next = current.slice();
      next.push(listener);

      return function unsubscribe() {
        if (!isSubscribed || current === CLEARED) return;
        isSubscribed = false;

        if (next === current) next = current.slice();
        next.splice(next.indexOf(listener), 1);
      };
    }
  };
}

var Subscription = function () {
  function Subscription(store, parentSub, onStateChange) {
    _classCallCheck(this, Subscription);

    this.store = store;
    this.parentSub = parentSub;
    this.onStateChange = onStateChange;
    this.unsubscribe = null;
    this.listeners = nullListeners;
  }

  Subscription.prototype.addNestedSub = function addNestedSub(listener) {
    this.trySubscribe();
    return this.listeners.subscribe(listener);
  };

  Subscription.prototype.notifyNestedSubs = function notifyNestedSubs() {
    this.listeners.notify();
  };

  Subscription.prototype.isSubscribed = function isSubscribed() {
    return Boolean(this.unsubscribe);
  };

  Subscription.prototype.trySubscribe = function trySubscribe() {
    if (!this.unsubscribe) {
      this.unsubscribe = this.parentSub ? this.parentSub.addNestedSub(this.onStateChange) : this.store.subscribe(this.onStateChange);

      this.listeners = createListenerCollection();
    }
  };

  Subscription.prototype.tryUnsubscribe = function tryUnsubscribe() {
    if (this.unsubscribe) {
      this.unsubscribe();
      this.unsubscribe = null;
      this.listeners.clear();
      this.listeners = nullListeners;
    }
  };

  return Subscription;
}();



/***/ }),
/* 112 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export createConnect */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_connectAdvanced__ = __webpack_require__(90);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__mapDispatchToProps__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mapStateToProps__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mergeProps__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__selectorFactory__ = __webpack_require__(117);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }








/*
  connect is a facade over connectAdvanced. It turns its args into a compatible
  selectorFactory, which has the signature:

    (dispatch, options) => (nextState, nextOwnProps) => nextFinalProps
  
  connect passes its args to connectAdvanced as options, which will in turn pass them to
  selectorFactory each time a Connect component instance is instantiated or hot reloaded.

  selectorFactory returns a final props selector from its mapStateToProps,
  mapStateToPropsFactories, mapDispatchToProps, mapDispatchToPropsFactories, mergeProps,
  mergePropsFactories, and pure args.

  The resulting final props selector is called by the Connect component instance whenever
  it receives new props or store state.
 */

function match(arg, factories, name) {
  for (var i = factories.length - 1; i >= 0; i--) {
    var result = factories[i](arg);
    if (result) return result;
  }

  return function (dispatch, options) {
    throw new Error('Invalid value of type ' + typeof arg + ' for ' + name + ' argument when connecting component ' + options.wrappedComponentName + '.');
  };
}

function strictEqual(a, b) {
  return a === b;
}

// createConnect with default args builds the 'official' connect behavior. Calling it with
// different options opens up some testing and extensibility scenarios
function createConnect() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$connectHOC = _ref.connectHOC,
      connectHOC = _ref$connectHOC === undefined ? __WEBPACK_IMPORTED_MODULE_0__components_connectAdvanced__["a" /* default */] : _ref$connectHOC,
      _ref$mapStateToPropsF = _ref.mapStateToPropsFactories,
      mapStateToPropsFactories = _ref$mapStateToPropsF === undefined ? __WEBPACK_IMPORTED_MODULE_3__mapStateToProps__["a" /* default */] : _ref$mapStateToPropsF,
      _ref$mapDispatchToPro = _ref.mapDispatchToPropsFactories,
      mapDispatchToPropsFactories = _ref$mapDispatchToPro === undefined ? __WEBPACK_IMPORTED_MODULE_2__mapDispatchToProps__["a" /* default */] : _ref$mapDispatchToPro,
      _ref$mergePropsFactor = _ref.mergePropsFactories,
      mergePropsFactories = _ref$mergePropsFactor === undefined ? __WEBPACK_IMPORTED_MODULE_4__mergeProps__["a" /* default */] : _ref$mergePropsFactor,
      _ref$selectorFactory = _ref.selectorFactory,
      selectorFactory = _ref$selectorFactory === undefined ? __WEBPACK_IMPORTED_MODULE_5__selectorFactory__["a" /* default */] : _ref$selectorFactory;

  return function connect(mapStateToProps, mapDispatchToProps, mergeProps) {
    var _ref2 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {},
        _ref2$pure = _ref2.pure,
        pure = _ref2$pure === undefined ? true : _ref2$pure,
        _ref2$areStatesEqual = _ref2.areStatesEqual,
        areStatesEqual = _ref2$areStatesEqual === undefined ? strictEqual : _ref2$areStatesEqual,
        _ref2$areOwnPropsEqua = _ref2.areOwnPropsEqual,
        areOwnPropsEqual = _ref2$areOwnPropsEqua === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areOwnPropsEqua,
        _ref2$areStatePropsEq = _ref2.areStatePropsEqual,
        areStatePropsEqual = _ref2$areStatePropsEq === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areStatePropsEq,
        _ref2$areMergedPropsE = _ref2.areMergedPropsEqual,
        areMergedPropsEqual = _ref2$areMergedPropsE === undefined ? __WEBPACK_IMPORTED_MODULE_1__utils_shallowEqual__["a" /* default */] : _ref2$areMergedPropsE,
        extraOptions = _objectWithoutProperties(_ref2, ['pure', 'areStatesEqual', 'areOwnPropsEqual', 'areStatePropsEqual', 'areMergedPropsEqual']);

    var initMapStateToProps = match(mapStateToProps, mapStateToPropsFactories, 'mapStateToProps');
    var initMapDispatchToProps = match(mapDispatchToProps, mapDispatchToPropsFactories, 'mapDispatchToProps');
    var initMergeProps = match(mergeProps, mergePropsFactories, 'mergeProps');

    return connectHOC(selectorFactory, _extends({
      // used in error messages
      methodName: 'connect',

      // used to compute Connect's displayName from the wrapped component's displayName.
      getDisplayName: function getDisplayName(name) {
        return 'Connect(' + name + ')';
      },

      // if mapStateToProps is falsy, the Connect component doesn't subscribe to store state changes
      shouldHandleStateChanges: Boolean(mapStateToProps),

      // passed through to selectorFactory
      initMapStateToProps: initMapStateToProps,
      initMapDispatchToProps: initMapDispatchToProps,
      initMergeProps: initMergeProps,
      pure: pure,
      areStatesEqual: areStatesEqual,
      areOwnPropsEqual: areOwnPropsEqual,
      areStatePropsEqual: areStatePropsEqual,
      areMergedPropsEqual: areMergedPropsEqual

    }, extraOptions));
  };
}

/* harmony default export */ __webpack_exports__["a"] = (createConnect());

/***/ }),
/* 113 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = shallowEqual;
var hasOwn = Object.prototype.hasOwnProperty;

function is(x, y) {
  if (x === y) {
    return x !== 0 || y !== 0 || 1 / x === 1 / y;
  } else {
    return x !== x && y !== y;
  }
}

function shallowEqual(objA, objB) {
  if (is(objA, objB)) return true;

  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
    return false;
  }

  var keysA = Object.keys(objA);
  var keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (var i = 0; i < keysA.length; i++) {
    if (!hasOwn.call(objB, keysA[i]) || !is(objA[keysA[i]], objB[keysA[i]])) {
      return false;
    }
  }

  return true;
}

/***/ }),
/* 114 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapDispatchToPropsIsFunction */
/* unused harmony export whenMapDispatchToPropsIsMissing */
/* unused harmony export whenMapDispatchToPropsIsObject */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_redux__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__ = __webpack_require__(91);



function whenMapDispatchToPropsIsFunction(mapDispatchToProps) {
  return typeof mapDispatchToProps === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["b" /* wrapMapToPropsFunc */])(mapDispatchToProps, 'mapDispatchToProps') : undefined;
}

function whenMapDispatchToPropsIsMissing(mapDispatchToProps) {
  return !mapDispatchToProps ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function (dispatch) {
    return { dispatch: dispatch };
  }) : undefined;
}

function whenMapDispatchToPropsIsObject(mapDispatchToProps) {
  return mapDispatchToProps && typeof mapDispatchToProps === 'object' ? Object(__WEBPACK_IMPORTED_MODULE_1__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function (dispatch) {
    return Object(__WEBPACK_IMPORTED_MODULE_0_redux__["a" /* bindActionCreators */])(mapDispatchToProps, dispatch);
  }) : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMapDispatchToPropsIsFunction, whenMapDispatchToPropsIsMissing, whenMapDispatchToPropsIsObject]);

/***/ }),
/* 115 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export whenMapStateToPropsIsFunction */
/* unused harmony export whenMapStateToPropsIsMissing */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__ = __webpack_require__(91);


function whenMapStateToPropsIsFunction(mapStateToProps) {
  return typeof mapStateToProps === 'function' ? Object(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["b" /* wrapMapToPropsFunc */])(mapStateToProps, 'mapStateToProps') : undefined;
}

function whenMapStateToPropsIsMissing(mapStateToProps) {
  return !mapStateToProps ? Object(__WEBPACK_IMPORTED_MODULE_0__wrapMapToProps__["a" /* wrapMapToPropsConstant */])(function () {
    return {};
  }) : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMapStateToPropsIsFunction, whenMapStateToPropsIsMissing]);

/***/ }),
/* 116 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export defaultMergeProps */
/* unused harmony export wrapMergePropsFunc */
/* unused harmony export whenMergePropsIsFunction */
/* unused harmony export whenMergePropsIsOmitted */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__ = __webpack_require__(92);
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };



function defaultMergeProps(stateProps, dispatchProps, ownProps) {
  return _extends({}, ownProps, stateProps, dispatchProps);
}

function wrapMergePropsFunc(mergeProps) {
  return function initMergePropsProxy(dispatch, _ref) {
    var displayName = _ref.displayName,
        pure = _ref.pure,
        areMergedPropsEqual = _ref.areMergedPropsEqual;

    var hasRunOnce = false;
    var mergedProps = void 0;

    return function mergePropsProxy(stateProps, dispatchProps, ownProps) {
      var nextMergedProps = mergeProps(stateProps, dispatchProps, ownProps);

      if (hasRunOnce) {
        if (!pure || !areMergedPropsEqual(nextMergedProps, mergedProps)) mergedProps = nextMergedProps;
      } else {
        hasRunOnce = true;
        mergedProps = nextMergedProps;

        if (process.env.NODE_ENV !== 'production') Object(__WEBPACK_IMPORTED_MODULE_0__utils_verifyPlainObject__["a" /* default */])(mergedProps, displayName, 'mergeProps');
      }

      return mergedProps;
    };
  };
}

function whenMergePropsIsFunction(mergeProps) {
  return typeof mergeProps === 'function' ? wrapMergePropsFunc(mergeProps) : undefined;
}

function whenMergePropsIsOmitted(mergeProps) {
  return !mergeProps ? function () {
    return defaultMergeProps;
  } : undefined;
}

/* harmony default export */ __webpack_exports__["a"] = ([whenMergePropsIsFunction, whenMergePropsIsOmitted]);
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 117 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/* unused harmony export impureFinalPropsSelectorFactory */
/* unused harmony export pureFinalPropsSelectorFactory */
/* harmony export (immutable) */ __webpack_exports__["a"] = finalPropsSelectorFactory;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__verifySubselectors__ = __webpack_require__(118);
function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }



function impureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch) {
  return function impureFinalPropsSelector(state, ownProps) {
    return mergeProps(mapStateToProps(state, ownProps), mapDispatchToProps(dispatch, ownProps), ownProps);
  };
}

function pureFinalPropsSelectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, _ref) {
  var areStatesEqual = _ref.areStatesEqual,
      areOwnPropsEqual = _ref.areOwnPropsEqual,
      areStatePropsEqual = _ref.areStatePropsEqual;

  var hasRunAtLeastOnce = false;
  var state = void 0;
  var ownProps = void 0;
  var stateProps = void 0;
  var dispatchProps = void 0;
  var mergedProps = void 0;

  function handleFirstCall(firstState, firstOwnProps) {
    state = firstState;
    ownProps = firstOwnProps;
    stateProps = mapStateToProps(state, ownProps);
    dispatchProps = mapDispatchToProps(dispatch, ownProps);
    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    hasRunAtLeastOnce = true;
    return mergedProps;
  }

  function handleNewPropsAndNewState() {
    stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewProps() {
    if (mapStateToProps.dependsOnOwnProps) stateProps = mapStateToProps(state, ownProps);

    if (mapDispatchToProps.dependsOnOwnProps) dispatchProps = mapDispatchToProps(dispatch, ownProps);

    mergedProps = mergeProps(stateProps, dispatchProps, ownProps);
    return mergedProps;
  }

  function handleNewState() {
    var nextStateProps = mapStateToProps(state, ownProps);
    var statePropsChanged = !areStatePropsEqual(nextStateProps, stateProps);
    stateProps = nextStateProps;

    if (statePropsChanged) mergedProps = mergeProps(stateProps, dispatchProps, ownProps);

    return mergedProps;
  }

  function handleSubsequentCalls(nextState, nextOwnProps) {
    var propsChanged = !areOwnPropsEqual(nextOwnProps, ownProps);
    var stateChanged = !areStatesEqual(nextState, state);
    state = nextState;
    ownProps = nextOwnProps;

    if (propsChanged && stateChanged) return handleNewPropsAndNewState();
    if (propsChanged) return handleNewProps();
    if (stateChanged) return handleNewState();
    return mergedProps;
  }

  return function pureFinalPropsSelector(nextState, nextOwnProps) {
    return hasRunAtLeastOnce ? handleSubsequentCalls(nextState, nextOwnProps) : handleFirstCall(nextState, nextOwnProps);
  };
}

// TODO: Add more comments

// If pure is true, the selector returned by selectorFactory will memoize its results,
// allowing connectAdvanced's shouldComponentUpdate to return false if final
// props have not changed. If false, the selector will always return a new
// object and shouldComponentUpdate will always return true.

function finalPropsSelectorFactory(dispatch, _ref2) {
  var initMapStateToProps = _ref2.initMapStateToProps,
      initMapDispatchToProps = _ref2.initMapDispatchToProps,
      initMergeProps = _ref2.initMergeProps,
      options = _objectWithoutProperties(_ref2, ['initMapStateToProps', 'initMapDispatchToProps', 'initMergeProps']);

  var mapStateToProps = initMapStateToProps(dispatch, options);
  var mapDispatchToProps = initMapDispatchToProps(dispatch, options);
  var mergeProps = initMergeProps(dispatch, options);

  if (process.env.NODE_ENV !== 'production') {
    Object(__WEBPACK_IMPORTED_MODULE_0__verifySubselectors__["a" /* default */])(mapStateToProps, mapDispatchToProps, mergeProps, options.displayName);
  }

  var selectorFactory = options.pure ? pureFinalPropsSelectorFactory : impureFinalPropsSelectorFactory;

  return selectorFactory(mapStateToProps, mapDispatchToProps, mergeProps, dispatch, options);
}
/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(0)))

/***/ }),
/* 118 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = verifySubselectors;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_warning__ = __webpack_require__(87);


function verify(selector, methodName, displayName) {
  if (!selector) {
    throw new Error('Unexpected value for ' + methodName + ' in ' + displayName + '.');
  } else if (methodName === 'mapStateToProps' || methodName === 'mapDispatchToProps') {
    if (!selector.hasOwnProperty('dependsOnOwnProps')) {
      Object(__WEBPACK_IMPORTED_MODULE_0__utils_warning__["a" /* default */])('The selector for ' + methodName + ' of ' + displayName + ' did not specify a value for dependsOnOwnProps.');
    }
  }
}

function verifySubselectors(mapStateToProps, mapDispatchToProps, mergeProps, displayName) {
  verify(mapStateToProps, 'mapStateToProps', displayName);
  verify(mapDispatchToProps, 'mapDispatchToProps', displayName);
  verify(mergeProps, 'mergeProps', displayName);
}

/***/ }),
/* 119 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__filter__ = __webpack_require__(120);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__stack__ = __webpack_require__(121);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__settings__ = __webpack_require__(131);





var App = function App() {
  return __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
    'div',
    { className: 'container' },
    __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(__WEBPACK_IMPORTED_MODULE_1__filter__["a" /* default */], null),
    __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(__WEBPACK_IMPORTED_MODULE_2__stack__["a" /* default */], null),
    __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(__WEBPACK_IMPORTED_MODULE_3__settings__["a" /* default */], null)
  );
};

/* harmony default export */ __webpack_exports__["a"] = (App);

/***/ }),
/* 120 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__events_actions__ = __webpack_require__(26);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }





var SearchField = function (_Component) {
  _inherits(SearchField, _Component);

  function SearchField() {
    var _temp, _this, _ret;

    _classCallCheck(this, SearchField);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, _Component.call.apply(_Component, [this].concat(args))), _this), _this.state = { searchWord: '' }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  SearchField.prototype.render = function render() {
    var _this2 = this;

    this.props.setSearchWord(this.state.searchWord);
    return __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
      'div',
      { className: 'searchField' },
      __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement('input', {
        type: 'text',
        value: this.state.searchWord,
        onChange: function onChange(e) {
          return _this2.setState({ searchWord: e.target.value });
        },
        placeholder: 'Filter'
      })
    );
  };

  return SearchField;
}(__WEBPACK_IMPORTED_MODULE_0_react__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return { searchWord: state.searchWord };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setSearchWord: function setSearchWord(word) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_2__events_actions__["d" /* setWord */])(word));
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(SearchField));

/***/ }),
/* 121 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_tabItem__ = __webpack_require__(122);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/* eslint-disable */




var Stack = function (_PureComponent) {
  _inherits(Stack, _PureComponent);

  function Stack(props) {
    _classCallCheck(this, Stack);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _this.includesSearchWord = function (tab) {
      var word = _this.props.searchWord.toLowerCase();
      if (!_this.props.searchWord.length) {
        return tab;
      }
      return tab.title.concat(tab.url).toLowerCase().includes(word);
    };

    _this.populate = function (_ref) {
      var url = _ref.url,
          title = _ref.title,
          id = _ref.id,
          favIconUrl = _ref.favIconUrl;

      return __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(__WEBPACK_IMPORTED_MODULE_2__components_tabItem__["a" /* default */], {
        key: id,
        id: id,
        url: url,
        title: title,
        favIconUrl: favIconUrl
      });
    };

    return _this;
  }

  Stack.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
      'div',
      { className: 'stack' },
      __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
        'ul',
        null,
        this.props.tabs && this.props.tabs.filter(this.includesSearchWord).map(this.populate)
      )
    );
  };

  return Stack;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    tabs: state.tabs,
    searchWord: state.searchWord || ''
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps)(Stack));

/***/ }),
/* 122 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_ionicons__ = __webpack_require__(123);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react_ionicons___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react_ionicons__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events_actions_index__ = __webpack_require__(26);





var Tab = function Tab(_ref) {
  var title = _ref.title,
      url = _ref.url,
      id = _ref.id,
      removeTab = _ref.removeTab;

  return __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
    'li',
    null,
    __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
      'h3',
      { className: 'tab-title' },
      title.substring(0, 35)
    ),
    __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
      'div',
      { className: 'tab-ctrl' },
      __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
        'a',
        {
          href: url,
          target: '_blank',
          className: 'tab-link'
        },
        url.slice(0, 30).concat('...')
      ),
      __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
        'div',
        null,
        __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(__WEBPACK_IMPORTED_MODULE_2_react_ionicons___default.a, {
          icon: 'ios-close-circle',
          rotate: true,
          fontSize: '18px',
          className: 'close',
          onClick: function onClick() {
            return removeTab(id);
          },
          color: '#e74c3c'
        })
      )
    )
  );
};
var mapStateToProps = function mapStateToProps(state) {
  return {};
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    removeTab: function removeTab(id) {
      dispatch(Object(__WEBPACK_IMPORTED_MODULE_3__events_actions_index__["a" /* deleteTab */])(id));
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(Tab));

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(1);

var _react2 = _interopRequireDefault(_react);

var _propTypes = __webpack_require__(124);

var _propTypes2 = _interopRequireDefault(_propTypes);

var _index = __webpack_require__(128);

var _index2 = _interopRequireDefault(_index);

var _icons = __webpack_require__(130);

var _icons2 = _interopRequireDefault(_icons);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ionicon = function (_Component) {
  _inherits(Ionicon, _Component);

  function Ionicon(props) {
    _classCallCheck(this, Ionicon);

    var _this = _possibleConstructorReturn(this, (Ionicon.__proto__ || Object.getPrototypeOf(Ionicon)).call(this, props));

    _this.state = { classNames: [], animationActive: false };
    _this._getClasses = _this._getClasses.bind(_this);
    return _this;
  }

  _createClass(Ionicon, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this._manageAnimation('shake');
      this._manageAnimation('beat');
      this._manageAnimation('rotate');
    }
  }, {
    key: 'render',
    value: function render() {
      var style = _extends({}, this.props.style, {
        color: this.props.color,
        fontSize: this.props.fontSize
      });

      return _react2.default.createElement(
        'svg',
        { style: this.props.style, className: this._getClasses(), fill: this.props.color, width: this.props.fontSize, height: this.props.fontSize, viewBox: '0 0 1024 1024', onClick: this.props.onClick },
        _react2.default.createElement('path', { d: this._getPathByIconName() })
      );
    }
  }, {
    key: '_getClasses',
    value: function _getClasses() {
      return [].concat(_toConsumableArray(this.state.classNames), [this.props.className]).join(' ');
    }
  }, {
    key: '_getPathByIconName',
    value: function _getPathByIconName() {
      var _this2 = this;

      var icon = _icons2.default.find(function (icon) {
        return icon.tags[0] === _this2.props.icon;
      });
      if (icon) return icon.paths.join(' ');
      return '';
    }
  }, {
    key: '_manageAnimation',
    value: function _manageAnimation(animation) {
      if (this.props[animation] && !this.state.animationActive) {
        this.setState({
          animationActive: true,
          classNames: [].concat(_toConsumableArray(this.state.classNames), [animation])
        });
      }
    }
  }]);

  return Ionicon;
}(_react.Component);

Ionicon.defaultProps = {
  // style
  style: {},
  color: '#000000',
  fontSize: '22px',

  // animation
  shake: false,
  beat: false,
  rotate: false
};

Ionicon.propTypes = {
  // style
  style: _propTypes2.default.object,
  color: _propTypes2.default.string,
  fontSize: _propTypes2.default.string,

  // animation
  shake: _propTypes2.default.bool,
  beat: _propTypes2.default.bool,
  rotate: _propTypes2.default.bool,

  // functions
  onClick: _propTypes2.default.func
};

exports.default = Ionicon;
module.exports = exports['default'];
//# sourceMappingURL=index.js.map

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

if (process.env.NODE_ENV !== 'production') {
  var REACT_ELEMENT_TYPE = (typeof Symbol === 'function' &&
    Symbol.for &&
    Symbol.for('react.element')) ||
    0xeac7;

  var isValidElement = function(object) {
    return typeof object === 'object' &&
      object !== null &&
      object.$$typeof === REACT_ELEMENT_TYPE;
  };

  // By explicitly using `prop-types` you are opting into new development behavior.
  // http://fb.me/prop-types-in-prod
  var throwOnDirectAccess = true;
  module.exports = __webpack_require__(125)(isValidElement, throwOnDirectAccess);
} else {
  // By explicitly using `prop-types` you are opting into new production behavior.
  // http://fb.me/prop-types-in-prod
  module.exports = __webpack_require__(127)();
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(27);
var invariant = __webpack_require__(11);
var warning = __webpack_require__(30);

var ReactPropTypesSecret = __webpack_require__(88);
var checkPropTypes = __webpack_require__(126);

module.exports = function(isValidElement, throwOnDirectAccess) {
  /* global Symbol */
  var ITERATOR_SYMBOL = typeof Symbol === 'function' && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = '@@iterator'; // Before Symbol spec.

  /**
   * Returns the iterator method function contained on the iterable object.
   *
   * Be sure to invoke the function with the iterable as context:
   *
   *     var iteratorFn = getIteratorFn(myIterable);
   *     if (iteratorFn) {
   *       var iterator = iteratorFn.call(myIterable);
   *       ...
   *     }
   *
   * @param {?object} maybeIterable
   * @return {?function}
   */
  function getIteratorFn(maybeIterable) {
    var iteratorFn = maybeIterable && (ITERATOR_SYMBOL && maybeIterable[ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === 'function') {
      return iteratorFn;
    }
  }

  /**
   * Collection of methods that allow declaration and validation of props that are
   * supplied to React components. Example usage:
   *
   *   var Props = require('ReactPropTypes');
   *   var MyArticle = React.createClass({
   *     propTypes: {
   *       // An optional string prop named "description".
   *       description: Props.string,
   *
   *       // A required enum prop named "category".
   *       category: Props.oneOf(['News','Photos']).isRequired,
   *
   *       // A prop named "dialog" that requires an instance of Dialog.
   *       dialog: Props.instanceOf(Dialog).isRequired
   *     },
   *     render: function() { ... }
   *   });
   *
   * A more formal specification of how these methods are used:
   *
   *   type := array|bool|func|object|number|string|oneOf([...])|instanceOf(...)
   *   decl := ReactPropTypes.{type}(.isRequired)?
   *
   * Each and every declaration produces a function with the same signature. This
   * allows the creation of custom validation functions. For example:
   *
   *  var MyLink = React.createClass({
   *    propTypes: {
   *      // An optional string or URI prop named "href".
   *      href: function(props, propName, componentName) {
   *        var propValue = props[propName];
   *        if (propValue != null && typeof propValue !== 'string' &&
   *            !(propValue instanceof URI)) {
   *          return new Error(
   *            'Expected a string or an URI for ' + propName + ' in ' +
   *            componentName
   *          );
   *        }
   *      }
   *    },
   *    render: function() {...}
   *  });
   *
   * @internal
   */

  var ANONYMOUS = '<<anonymous>>';

  // Important!
  // Keep this list in sync with production version in `./factoryWithThrowingShims.js`.
  var ReactPropTypes = {
    array: createPrimitiveTypeChecker('array'),
    bool: createPrimitiveTypeChecker('boolean'),
    func: createPrimitiveTypeChecker('function'),
    number: createPrimitiveTypeChecker('number'),
    object: createPrimitiveTypeChecker('object'),
    string: createPrimitiveTypeChecker('string'),
    symbol: createPrimitiveTypeChecker('symbol'),

    any: createAnyTypeChecker(),
    arrayOf: createArrayOfTypeChecker,
    element: createElementTypeChecker(),
    instanceOf: createInstanceTypeChecker,
    node: createNodeChecker(),
    objectOf: createObjectOfTypeChecker,
    oneOf: createEnumTypeChecker,
    oneOfType: createUnionTypeChecker,
    shape: createShapeTypeChecker
  };

  /**
   * inlined Object.is polyfill to avoid requiring consumers ship their own
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is
   */
  /*eslint-disable no-self-compare*/
  function is(x, y) {
    // SameValue algorithm
    if (x === y) {
      // Steps 1-5, 7-10
      // Steps 6.b-6.e: +0 != -0
      return x !== 0 || 1 / x === 1 / y;
    } else {
      // Step 6.a: NaN == NaN
      return x !== x && y !== y;
    }
  }
  /*eslint-enable no-self-compare*/

  /**
   * We use an Error-like object for backward compatibility as people may call
   * PropTypes directly and inspect their output. However, we don't use real
   * Errors anymore. We don't inspect their stack anyway, and creating them
   * is prohibitively expensive if they are created too often, such as what
   * happens in oneOfType() for any type before the one that matched.
   */
  function PropTypeError(message) {
    this.message = message;
    this.stack = '';
  }
  // Make `instanceof Error` still work for returned errors.
  PropTypeError.prototype = Error.prototype;

  function createChainableTypeChecker(validate) {
    if (process.env.NODE_ENV !== 'production') {
      var manualPropTypeCallCache = {};
      var manualPropTypeWarningCount = 0;
    }
    function checkType(isRequired, props, propName, componentName, location, propFullName, secret) {
      componentName = componentName || ANONYMOUS;
      propFullName = propFullName || propName;

      if (secret !== ReactPropTypesSecret) {
        if (throwOnDirectAccess) {
          // New behavior only for users of `prop-types` package
          invariant(
            false,
            'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
            'Use `PropTypes.checkPropTypes()` to call them. ' +
            'Read more at http://fb.me/use-check-prop-types'
          );
        } else if (process.env.NODE_ENV !== 'production' && typeof console !== 'undefined') {
          // Old behavior for people using React.PropTypes
          var cacheKey = componentName + ':' + propName;
          if (
            !manualPropTypeCallCache[cacheKey] &&
            // Avoid spamming the console because they are often not actionable except for lib authors
            manualPropTypeWarningCount < 3
          ) {
            warning(
              false,
              'You are manually calling a React.PropTypes validation ' +
              'function for the `%s` prop on `%s`. This is deprecated ' +
              'and will throw in the standalone `prop-types` package. ' +
              'You may be seeing this warning due to a third-party PropTypes ' +
              'library. See https://fb.me/react-warning-dont-call-proptypes ' + 'for details.',
              propFullName,
              componentName
            );
            manualPropTypeCallCache[cacheKey] = true;
            manualPropTypeWarningCount++;
          }
        }
      }
      if (props[propName] == null) {
        if (isRequired) {
          if (props[propName] === null) {
            return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required ' + ('in `' + componentName + '`, but its value is `null`.'));
          }
          return new PropTypeError('The ' + location + ' `' + propFullName + '` is marked as required in ' + ('`' + componentName + '`, but its value is `undefined`.'));
        }
        return null;
      } else {
        return validate(props, propName, componentName, location, propFullName);
      }
    }

    var chainedCheckType = checkType.bind(null, false);
    chainedCheckType.isRequired = checkType.bind(null, true);

    return chainedCheckType;
  }

  function createPrimitiveTypeChecker(expectedType) {
    function validate(props, propName, componentName, location, propFullName, secret) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== expectedType) {
        // `propValue` being instance of, say, date/regexp, pass the 'object'
        // check, but we can offer a more precise error message here rather than
        // 'of type `object`'.
        var preciseType = getPreciseType(propValue);

        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + preciseType + '` supplied to `' + componentName + '`, expected ') + ('`' + expectedType + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createAnyTypeChecker() {
    return createChainableTypeChecker(emptyFunction.thatReturnsNull);
  }

  function createArrayOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside arrayOf.');
      }
      var propValue = props[propName];
      if (!Array.isArray(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an array.'));
      }
      for (var i = 0; i < propValue.length; i++) {
        var error = typeChecker(propValue, i, componentName, location, propFullName + '[' + i + ']', ReactPropTypesSecret);
        if (error instanceof Error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createElementTypeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      if (!isValidElement(propValue)) {
        var propType = getPropType(propValue);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected a single ReactElement.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createInstanceTypeChecker(expectedClass) {
    function validate(props, propName, componentName, location, propFullName) {
      if (!(props[propName] instanceof expectedClass)) {
        var expectedClassName = expectedClass.name || ANONYMOUS;
        var actualClassName = getClassName(props[propName]);
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + actualClassName + '` supplied to `' + componentName + '`, expected ') + ('instance of `' + expectedClassName + '`.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createEnumTypeChecker(expectedValues) {
    if (!Array.isArray(expectedValues)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOf, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      for (var i = 0; i < expectedValues.length; i++) {
        if (is(propValue, expectedValues[i])) {
          return null;
        }
      }

      var valuesString = JSON.stringify(expectedValues);
      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of value `' + propValue + '` ' + ('supplied to `' + componentName + '`, expected one of ' + valuesString + '.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createObjectOfTypeChecker(typeChecker) {
    function validate(props, propName, componentName, location, propFullName) {
      if (typeof typeChecker !== 'function') {
        return new PropTypeError('Property `' + propFullName + '` of component `' + componentName + '` has invalid PropType notation inside objectOf.');
      }
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type ' + ('`' + propType + '` supplied to `' + componentName + '`, expected an object.'));
      }
      for (var key in propValue) {
        if (propValue.hasOwnProperty(key)) {
          var error = typeChecker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
          if (error instanceof Error) {
            return error;
          }
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createUnionTypeChecker(arrayOfTypeCheckers) {
    if (!Array.isArray(arrayOfTypeCheckers)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Invalid argument supplied to oneOfType, expected an instance of array.') : void 0;
      return emptyFunction.thatReturnsNull;
    }

    for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
      var checker = arrayOfTypeCheckers[i];
      if (typeof checker !== 'function') {
        warning(
          false,
          'Invalid argument supplid to oneOfType. Expected an array of check functions, but ' +
          'received %s at index %s.',
          getPostfixForTypeWarning(checker),
          i
        );
        return emptyFunction.thatReturnsNull;
      }
    }

    function validate(props, propName, componentName, location, propFullName) {
      for (var i = 0; i < arrayOfTypeCheckers.length; i++) {
        var checker = arrayOfTypeCheckers[i];
        if (checker(props, propName, componentName, location, propFullName, ReactPropTypesSecret) == null) {
          return null;
        }
      }

      return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`.'));
    }
    return createChainableTypeChecker(validate);
  }

  function createNodeChecker() {
    function validate(props, propName, componentName, location, propFullName) {
      if (!isNode(props[propName])) {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` supplied to ' + ('`' + componentName + '`, expected a ReactNode.'));
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function createShapeTypeChecker(shapeTypes) {
    function validate(props, propName, componentName, location, propFullName) {
      var propValue = props[propName];
      var propType = getPropType(propValue);
      if (propType !== 'object') {
        return new PropTypeError('Invalid ' + location + ' `' + propFullName + '` of type `' + propType + '` ' + ('supplied to `' + componentName + '`, expected `object`.'));
      }
      for (var key in shapeTypes) {
        var checker = shapeTypes[key];
        if (!checker) {
          continue;
        }
        var error = checker(propValue, key, componentName, location, propFullName + '.' + key, ReactPropTypesSecret);
        if (error) {
          return error;
        }
      }
      return null;
    }
    return createChainableTypeChecker(validate);
  }

  function isNode(propValue) {
    switch (typeof propValue) {
      case 'number':
      case 'string':
      case 'undefined':
        return true;
      case 'boolean':
        return !propValue;
      case 'object':
        if (Array.isArray(propValue)) {
          return propValue.every(isNode);
        }
        if (propValue === null || isValidElement(propValue)) {
          return true;
        }

        var iteratorFn = getIteratorFn(propValue);
        if (iteratorFn) {
          var iterator = iteratorFn.call(propValue);
          var step;
          if (iteratorFn !== propValue.entries) {
            while (!(step = iterator.next()).done) {
              if (!isNode(step.value)) {
                return false;
              }
            }
          } else {
            // Iterator will provide entry [k,v] tuples rather than values.
            while (!(step = iterator.next()).done) {
              var entry = step.value;
              if (entry) {
                if (!isNode(entry[1])) {
                  return false;
                }
              }
            }
          }
        } else {
          return false;
        }

        return true;
      default:
        return false;
    }
  }

  function isSymbol(propType, propValue) {
    // Native Symbol.
    if (propType === 'symbol') {
      return true;
    }

    // 19.4.3.5 Symbol.prototype[@@toStringTag] === 'Symbol'
    if (propValue['@@toStringTag'] === 'Symbol') {
      return true;
    }

    // Fallback for non-spec compliant Symbols which are polyfilled.
    if (typeof Symbol === 'function' && propValue instanceof Symbol) {
      return true;
    }

    return false;
  }

  // Equivalent of `typeof` but with special handling for array and regexp.
  function getPropType(propValue) {
    var propType = typeof propValue;
    if (Array.isArray(propValue)) {
      return 'array';
    }
    if (propValue instanceof RegExp) {
      // Old webkits (at least until Android 4.0) return 'function' rather than
      // 'object' for typeof a RegExp. We'll normalize this here so that /bla/
      // passes PropTypes.object.
      return 'object';
    }
    if (isSymbol(propType, propValue)) {
      return 'symbol';
    }
    return propType;
  }

  // This handles more types than `getPropType`. Only used for error messages.
  // See `createPrimitiveTypeChecker`.
  function getPreciseType(propValue) {
    if (typeof propValue === 'undefined' || propValue === null) {
      return '' + propValue;
    }
    var propType = getPropType(propValue);
    if (propType === 'object') {
      if (propValue instanceof Date) {
        return 'date';
      } else if (propValue instanceof RegExp) {
        return 'regexp';
      }
    }
    return propType;
  }

  // Returns a string that is postfixed to a warning about an invalid type.
  // For example, "undefined" or "of type array"
  function getPostfixForTypeWarning(value) {
    var type = getPreciseType(value);
    switch (type) {
      case 'array':
      case 'object':
        return 'an ' + type;
      case 'boolean':
      case 'date':
      case 'regexp':
        return 'a ' + type;
      default:
        return type;
    }
  }

  // Returns class name of the object, if any.
  function getClassName(propValue) {
    if (!propValue.constructor || !propValue.constructor.name) {
      return ANONYMOUS;
    }
    return propValue.constructor.name;
  }

  ReactPropTypes.checkPropTypes = checkPropTypes;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



if (process.env.NODE_ENV !== 'production') {
  var invariant = __webpack_require__(11);
  var warning = __webpack_require__(30);
  var ReactPropTypesSecret = __webpack_require__(88);
  var loggedTypeFailures = {};
}

/**
 * Assert that the values match with the type specs.
 * Error messages are memorized and will only be shown once.
 *
 * @param {object} typeSpecs Map of name to a ReactPropType
 * @param {object} values Runtime values that need to be type-checked
 * @param {string} location e.g. "prop", "context", "child context"
 * @param {string} componentName Name of the component for error messages.
 * @param {?Function} getStack Returns the component stack.
 * @private
 */
function checkPropTypes(typeSpecs, values, location, componentName, getStack) {
  if (process.env.NODE_ENV !== 'production') {
    for (var typeSpecName in typeSpecs) {
      if (typeSpecs.hasOwnProperty(typeSpecName)) {
        var error;
        // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.
        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          invariant(typeof typeSpecs[typeSpecName] === 'function', '%s: %s type `%s` is invalid; it must be a function, usually from ' + 'React.PropTypes.', componentName || 'React class', location, typeSpecName);
          error = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, ReactPropTypesSecret);
        } catch (ex) {
          error = ex;
        }
        warning(!error || error instanceof Error, '%s: type specification of %s `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error);
        if (error instanceof Error && !(error.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error.message] = true;

          var stack = getStack ? getStack() : '';

          warning(false, 'Failed %s type: %s%s', location, error.message, stack != null ? stack : '');
        }
      }
    }
  }
}

module.exports = checkPropTypes;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(0)))

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */



var emptyFunction = __webpack_require__(27);
var invariant = __webpack_require__(11);
var ReactPropTypesSecret = __webpack_require__(88);

module.exports = function() {
  function shim(props, propName, componentName, location, propFullName, secret) {
    if (secret === ReactPropTypesSecret) {
      // It is still safe when called from React.
      return;
    }
    invariant(
      false,
      'Calling PropTypes validators directly is not supported by the `prop-types` package. ' +
      'Use PropTypes.checkPropTypes() to call them. ' +
      'Read more at http://fb.me/use-check-prop-types'
    );
  };
  shim.isRequired = shim;
  function getShim() {
    return shim;
  };
  // Important!
  // Keep this list in sync with production version in `./factoryWithTypeCheckers.js`.
  var ReactPropTypes = {
    array: shim,
    bool: shim,
    func: shim,
    number: shim,
    object: shim,
    string: shim,
    symbol: shim,

    any: shim,
    arrayOf: getShim,
    element: shim,
    instanceOf: getShim,
    node: shim,
    objectOf: getShim,
    oneOf: getShim,
    oneOfType: getShim,
    shape: getShim
  };

  ReactPropTypes.checkPropTypes = emptyFunction;
  ReactPropTypes.PropTypes = ReactPropTypes;

  return ReactPropTypes;
};


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(129)(undefined);
// imports


// module
exports.push([module.i, "/* Rotate animation */\n.rotate {\n  -webkit-animation: rotateIcon 2s linear infinite;\n  -moz-animation: rotateIcon 2s linear infinite;\n  animation: rotateIcon 2s linear infinite;\n}\n\n@keyframes rotateIcon {\n  100% {\n    transform: rotate(360deg)\n  }\n}\n\n@-webkit-keyframes rotateIcon {\n  100% {\n    transform: rotate(360deg)\n  }\n}\n\n@-moz-keyframes rotateIcon {\n  100% {\n    transform: rotate(360deg)\n  }\n}\n\n/* Shake animation */\n.shake {\n  -webkit-animation: shakeIcon 0.82s linear infinite;\n  -moz-animation: shakeIcon 0.82s linear infinite;\n  animation: shakeIcon 0.82s linear infinite;\n}\n\n@keyframes shakeIcon {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n\n@-webkit-keyframes shakeIcon {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n\n@-moz-keyframes shakeIcon {\n  10%, 90% {\n    transform: translate3d(-1px, 0, 0);\n  }\n\n  20%, 80% {\n    transform: translate3d(2px, 0, 0);\n  }\n\n  30%, 50%, 70% {\n    transform: translate3d(-4px, 0, 0);\n  }\n\n  40%, 60% {\n    transform: translate3d(4px, 0, 0);\n  }\n}\n\n/* Beat animation */\n.beat {\n  -webkit-animation: beatIcon 0.82s linear infinite;\n  -moz-animation: beatIcon 0.82s linear infinite;\n  animation: beatIcon 0.82s linear infinite;\n}\n@keyframes beatIcon\n{\n  0% {\n    transform: scale(.75);\n  }\n\n  20% {\n    transform: scale(1);\n  }\n\n  40% {\n    transform: scale(.75);\n  }\n\n  60% {\n    transform: scale(1);\n  }\n\n  80% {\n    transform: scale(.75);\n  }\n\n  100% {\n    transform: scale(.75);\n  }\n}\n\n@-webkit-keyframes beatIcon\n{\n  0% {\n    transform: scale(.75);\n  }\n\n  20% {\n    transform: scale(1);\n  }\n\n  40% {\n    transform: scale(.75);\n  }\n\n  60% {\n    transform: scale(1);\n  }\n\n  80% {\n    transform: scale(.75);\n  }\n\n  100% {\n    transform: scale(.75);\n  }\n}\n\n@-moz-keyframes beatIcon\n{\n  0% {\n    transform: scale(.75);\n  }\n\n  20% {\n    transform: scale(1);\n  }\n\n  40% {\n    transform: scale(.75);\n  }\n\n  60% {\n    transform: scale(1);\n  }\n\n  80% {\n    transform: scale(.75);\n  }\n\n  100% {\n    transform: scale(.75);\n  }\n}\n", ""]);

// exports


/***/ }),
/* 129 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports,"__esModule",{value:true});exports.default=[{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4s171.2-381.4 381.4-381.4 381.4 171.2 381.4 381.4-171.2 381.4-381.4 381.4z","M528 256h-32v240h-240v32h240v240h32v-240h240v-32h-240z"],"grid":0,"tags":["ios-add-circle-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM768 528h-240v240h-32v-240h-240v-32h240v-240h32v240h240v32z"],"grid":0,"tags":["ios-add-circle"]},{"paths":["M768 528h-240v240h-32v-240h-240v-32h240v-240h32v240h240v32z"],"grid":0,"tags":["ios-add"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z","M512 666.2c-17.6 0-32 14.4-32 32s14.4 32 32 32c17.6 0 32-14.4 32-32s-14.4-32-32-32z","M488.4 466.4v-178.4h48v178.4l-12 141.6h-24l-12-141.6z"],"grid":0,"tags":["ios-alert-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM488.4 288h48v178.4l-12 141.6h-24l-12-141.6v-178.4zM512 730.2c-17.6 0-32-14.4-32-32s14.4-32 32-32c17.6 0 32 14.4 32 32 0 17.8-14.4 32-32 32z"],"grid":0,"tags":["ios-alert"]},{"paths":["M757.21 266.79c-145.406-145.408-378.45-170.794-523.51-170.79-77.852 0.002-130.382 7.316-130.382 7.316s-59.968 430.454 163.472 653.894c145.408 145.408 378.444 170.79 523.508 170.79 77.852 0 130.384-7.316 130.384-7.316s59.97-430.452-163.472-653.894zM130.284 130.416c21.99-2.028 58.464-4.416 103.428-4.416h0.288l-0.136-0.142c54.334 0 106.334 3.508 155.584 10.44l-253.2 253.162c-2.050-14.566-3.82-29.394-5.28-44.492-9.172-94.87-4.172-176.456-0.684-214.552zM287.8 736.204c-47.7-47.704-85.586-109.876-112.608-184.792-13.946-38.664-25.020-80.746-33.14-125.732l283.624-283.58c21.344 3.858 42.128 8.382 62.282 13.608 104.054 26.984 187.566 71.416 248.278 132.128 47.702 47.7 85.572 109.856 112.594 184.772 13.948 38.666 25.018 80.75 33.134 125.742l-283.624 283.622c-21.32-3.86-42.082-8.382-62.208-13.602-104.060-26.978-187.612-71.452-248.332-132.166zM893.722 893.736c-21.988 2.024-58.46 4.55-103.42 4.55-54.384 0-106.45-3.54-155.752-10.5l253.214-253.214c2.048 14.558 3.816 29.376 5.276 44.466 9.176 94.874 4.172 176.596 0.682 214.698z","M614.608 635.694l45.25 45.264-57.308 57.304 22.63 22.628 135.762-135.762-22.628-22.628-57.442 57.442-45.25-45.262 57.432-57.434-22.626-22.626-57.43 57.428-45.266-45.276 57.404-57.404-22.626-22.628-57.4 57.4-45.252-45.262 57.394-57.394-22.628-22.626-57.388 57.39-45.262-45.274 57.374-57.374-22.626-22.626-57.37 57.37-45.248-45.26 57.364-57.364-22.626-22.626-135.766 135.764 22.628 22.628 57.386-57.388 45.248 45.26-57.382 57.382 22.626 22.626 57.378-57.378 45.26 45.274-57.356 57.358 22.626 22.626 57.354-57.354 45.252 45.262-57.348 57.348 22.628 22.626 57.342-57.342 45.266 45.276-57.32 57.32 22.628 22.628z"],"grid":0,"tags":["ios-american-football-outline"]},{"paths":["M757.21 266.79c-145.406-145.408-378.448-170.794-523.51-170.79-77.852 0.002-130.382 7.316-130.382 7.316s-59.968 430.454 163.472 653.894c145.408 145.408 378.444 170.79 523.506 170.79 77.854 0 130.386-7.316 130.386-7.316s59.972-430.452-163.472-653.894zM136.248 389.456l253.166-253.164c12.246 1.722 24.328 3.65 36.224 5.798l-283.588 283.586c-2.14-11.874-4.076-23.952-5.802-36.22zM534.624 670.39l57.376-57.376-45.254-45.256-57.376 57.376-22.626-22.624 57.376-57.376-45.254-45.254-57.376 57.376-22.626-22.624 57.376-57.376-45.256-45.256-57.376 57.376-22.626-22.624 57.378-57.378-45.256-45.254-57.376 57.376-22.628-22.626 135.768-135.766 22.626 22.628-57.376 57.376 45.256 45.254 57.376-57.376 22.626 22.626-57.376 57.376 45.256 45.256 57.376-57.376 22.628 22.626-57.376 57.376 45.254 45.254 57.376-57.376 22.626 22.624-57.376 57.376 45.256 45.256 57.376-57.376 22.624 22.626-57.376 57.376 45.254 45.254 57.376-57.376 22.628 22.624-135.766 135.768-22.626-22.626 57.376-57.376-45.256-45.256-57.376 57.376-22.63-22.628zM634.518 887.782c-12.242-1.726-24.318-3.66-36.208-5.812l283.648-283.65c2.142 11.876 4.076 23.954 5.802 36.222l-253.242 253.24z"],"grid":0,"tags":["ios-american-football"]},{"paths":["M806.2 217.8c-162.4-162.4-425.8-162.4-588.4 0s-162.4 425.8 0 588.4c162.4 162.4 425.8 162.4 588.4 0 162.4-162.4 162.4-426 0-588.4zM242.4 242.4c148.6-148.6 390.6-148.6 539.2 0 76 76 113 176.2 111.4 276-5.8-9.2-46.2-70.4-105-70.4-55.8 0-84.6 52.2-103.6 86.6-2.8 5.2-5.6 10-8 14.2-23.2 39-55.4 60.8-86.2 58.6-27.2-2-50.4-22.6-65.2-58.4-18.6-44.8-59.2-93-107.4-99.8-22.8-3.2-57.2 1.8-90.6 43.4-6.6 8.2-14 19-22.4 31.8-21.2 31.4-53 78.8-77.4 82.8-42 6.8-73.2-24.4-78.6-29.2-4-3.4-8.8-8.6-14.6-15.2-15-113.8 21-233.2 108.4-320.4zM781.6 781.6c-148.6 148.6-390.6 148.6-539.2 0-48.4-48.4-81-106.6-97.8-168.2 14 11.4 38.6 26.6 71 26.6 5.4 0 11.2-0.4 17-1.4 38-6.2 71.6-56.2 98.8-96.4 7.8-11.6 15-22.4 20.8-29.6 19.4-24 40-34.8 61.2-31.8 25.8 3.6 62.2 32.4 82.2 80.4 19.8 47.4 52.6 75.2 92.6 78 43.2 3 86.6-24.8 116-74.2 2.8-4.6 5.6-9.6 8.4-15 17.2-31.2 38.6-70.2 75.4-70.2 22.2 0 41.8 14.6 54.4 26.8 14.8 14.4 18 18 25.8 29.2 6.8 9.6 13 17.4 20.6 33.4-11.6 77.8-47.4 152.6-107.2 212.4z"],"grid":0,"tags":["ios-analytics-outline"]},{"paths":["M806.2 217.8c-162.4-162.4-425.8-162.4-588.4 0s-162.4 425.8 0 588.4c162.4 162.4 425.8 162.4 588.4 0 162.4-162.4 162.4-426 0-588.4zM242.4 242.4c148.6-148.6 390.6-148.6 539.2 0 76 76 113 176.2 111.4 276-5.8-9.4-46.2-70.4-105-70.4-55.8 0-84.6 52.2-103.6 86.6-2.8 5.2-5.6 10-8 14.2-23.2 39-55.4 60.8-86.2 58.6-27.2-2-50.4-22.6-65.2-58.4-18.6-44.8-59.2-93-107.4-99.8-22.8-3.2-57.2 1.8-90.6 43.4-6.6 8.2-14 19-22.4 31.8-21.2 31.4-53 78.8-77.4 82.8-42 6.8-73.2-24.4-78.6-29.2-4-3.4-8.8-8.6-14.4-15-15.2-114 20.8-233.4 108.2-320.6z"],"grid":0,"tags":["ios-analytics"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416 0 131 60.6 247.8 155.2 324.2l-1.2 2.2 16.6 9.6c68.8 50.4 153.6 80 245.4 80 229.8 0 416-186.2 416-416s-186.2-416-416-416zM865.8 362.6c20 47.4 30.2 97.6 30.2 149.4 0 10.8-0.4 21.4-1.4 32h-325.6l188.8-327c8.8 7.4 17.4 15.2 25.8 23.4 35.2 35.4 62.8 76.4 82.2 122.2zM474 514.2l19.8-34.2h37.4l18.8 32.8-18 31.2h-40.8l-17.2-29.8zM661.4 158.2c25 10.6 48.6 23.8 70.8 39.2l-163.6 283.4-190-329c42.6-15.8 87.4-23.8 133.4-23.8 51.8 0 102.2 10.2 149.4 30.2zM240.4 240.4c31.8-31.8 68.2-57.4 108.4-76.2l164 283.8h-379.4c5-29.4 13.2-57.8 24.8-85.4 19.4-45.8 47-86.8 82.2-122.2zM240.4 783.6c-35.2-35.2-63-76.4-82.4-122-19.8-47.4-30-97.8-30-149.6 0-10.8 0.4-21.4 1.4-32h327.6l-189.4 328c-9.4-7.6-18.4-15.8-27.2-24.4zM362.6 865.8c-24.6-10.4-47.8-23.2-69.4-38.2l162.4-281.4 188.4 326.4c-42.2 15.4-86.6 23.4-132 23.4-51.8 0-102.2-10.2-149.4-30.2zM783.6 783.6c-32 32-68.8 57.8-109.6 76.8l-164.2-284.4h381c-5 29.4-13.2 57.8-24.8 85.4-19.6 45.8-47.2 86.8-82.4 122.2z"],"grid":0,"tags":["ios-aperture-outline"]},{"paths":["M493.8 480l-19.8 34.2 17.2 29.8h40.8l18.2-31.2-19-32.8z","M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416zM509.8 576l164.2 284.2c-4.2 2-8.2 3.8-12.4 5.6-5.8 2.4-11.6 4.8-17.4 6.8l-188.4-326.4-162.4 281.4c-8.8-6.2-17.4-12.6-25.6-19.4l189.4-328h-327.8c0.8-10.8 2.2-21.4 4-32h379.4l-163.8-284c4.4-2.2 9-4.2 13.6-6 5.4-2.2 10.8-4.4 16.2-6.4l190 329 163.6-283.4c8.8 6.2 17.4 12.8 25.6 19.6l-189 327h325.6c-0.8 10.8-2.2 21.4-4 32h-380.8z"],"grid":0,"tags":["ios-aperture"]},{"paths":["M308 160c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12h-104c-6.6 0-12-5.4-12-12v-104c0-6.6 5.4-12 12-12h104zM308 128h-104c-24.2 0-44 19.8-44 44v104c0 24.2 19.8 44 44 44h104c24.2 0 44-19.8 44-44v-104c0-24.2-19.8-44-44-44v0z","M564 160c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12h-104c-6.6 0-12-5.4-12-12v-104c0-6.6 5.4-12 12-12h104zM564 128h-104c-24.2 0-44 19.8-44 44v104c0 24.2 19.8 44 44 44h104c24.2 0 44-19.8 44-44v-104c0-24.2-19.8-44-44-44v0z","M820 160c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12h-104c-6.6 0-12-5.4-12-12v-104c0-6.6 5.4-12 12-12h104zM820 128h-104c-24.2 0-44 19.8-44 44v104c0 24.2 19.8 44 44 44h104c24.2 0 44-19.8 44-44v-104c0-24.2-19.8-44-44-44v0z","M308 448c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12h-104c-6.6 0-12-5.4-12-12v-104c0-6.6 5.4-12 12-12h104zM308 416h-104c-24.2 0-44 19.8-44 44v104c0 24.2 19.8 44 44 44h104c24.2 0 44-19.8 44-44v-104c0-24.2-19.8-44-44-44v0z","M564 448c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12h-104c-6.6 0-12-5.4-12-12v-104c0-6.6 5.4-12 12-12h104zM564 416h-104c-24.2 0-44 19.8-44 44v104c0 24.2 19.8 44 44 44h104c24.2 0 44-19.8 44-44v-104c0-24.2-19.8-44-44-44v0z","M820 448c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12h-104c-6.6 0-12-5.4-12-12v-104c0-6.6 5.4-12 12-12h104zM820 416h-104c-24.2 0-44 19.8-44 44v104c0 24.2 19.8 44 44 44h104c24.2 0 44-19.8 44-44v-104c0-24.2-19.8-44-44-44v0z","M308 736c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12h-104c-6.6 0-12-5.4-12-12v-104c0-6.6 5.4-12 12-12h104zM308 704h-104c-24.2 0-44 19.8-44 44v104c0 24.2 19.8 44 44 44h104c24.2 0 44-19.8 44-44v-104c0-24.2-19.8-44-44-44v0z","M564 736c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12h-104c-6.6 0-12-5.4-12-12v-104c0-6.6 5.4-12 12-12h104zM564 704h-104c-24.2 0-44 19.8-44 44v104c0 24.2 19.8 44 44 44h104c24.2 0 44-19.8 44-44v-104c0-24.2-19.8-44-44-44v0z","M820 736c6.6 0 12 5.4 12 12v104c0 6.6-5.4 12-12 12h-104c-6.6 0-12-5.4-12-12v-104c0-6.6 5.4-12 12-12h104zM820 704h-104c-24.2 0-44 19.8-44 44v104c0 24.2 19.8 44 44 44h104c24.2 0 44-19.8 44-44v-104c0-24.2-19.8-44-44-44v0z"],"grid":0,"tags":["ios-apps-outline"]},{"paths":["M308 320h-104c-24.2 0-44-19.8-44-44v-104c0-24.2 19.8-44 44-44h104c24.2 0 44 19.8 44 44v104c0 24.2-19.8 44-44 44z","M564 320h-104c-24.2 0-44-19.8-44-44v-104c0-24.2 19.8-44 44-44h104c24.2 0 44 19.8 44 44v104c0 24.2-19.8 44-44 44z","M820 320h-104c-24.2 0-44-19.8-44-44v-104c0-24.2 19.8-44 44-44h104c24.2 0 44 19.8 44 44v104c0 24.2-19.8 44-44 44z","M308 608h-104c-24.2 0-44-19.8-44-44v-104c0-24.2 19.8-44 44-44h104c24.2 0 44 19.8 44 44v104c0 24.2-19.8 44-44 44z","M564 608h-104c-24.2 0-44-19.8-44-44v-104c0-24.2 19.8-44 44-44h104c24.2 0 44 19.8 44 44v104c0 24.2-19.8 44-44 44z","M820 608h-104c-24.2 0-44-19.8-44-44v-104c0-24.2 19.8-44 44-44h104c24.2 0 44 19.8 44 44v104c0 24.2-19.8 44-44 44z","M308 896h-104c-24.2 0-44-19.8-44-44v-104c0-24.2 19.8-44 44-44h104c24.2 0 44 19.8 44 44v104c0 24.2-19.8 44-44 44z","M564 896h-104c-24.2 0-44-19.8-44-44v-104c0-24.2 19.8-44 44-44h104c24.2 0 44 19.8 44 44v104c0 24.2-19.8 44-44 44z","M820 896h-104c-24.2 0-44-19.8-44-44v-104c0-24.2 19.8-44 44-44h104c24.2 0 44 19.8 44 44v104c0 24.2-19.8 44-44 44z"],"grid":0,"tags":["ios-apps"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z","M278.6 704l68.4-57.6-49.4-32.4z","M684.4 596c-13.6 6.4-30.4 28-7.8 57.2 18.2 23.4 36 17.4 53 50.8 9.6-8.2 18.8-43.4 14.6-71.4-4.8-30.6-24.6-53-59.8-36.6z","M503.2 379.2c3.2-5.4 1.2-12.6-4.2-15.8l-30.2-17.2c-5.6-3.2-12.6-1.2-15.8 4.2l-111.8 193.6-33.8 58.4 49.8 30 87.8-152.6 58.2-100.6z","M461.2 480l-37 64h178.4l-36.2-64z","M702 544h66v-64h-102z","M362.2 480h-106.2v64h69.2z","M649.2 480l-120-211.6c-3.2-5.6-10.4-7.4-15.8-4.2l-30.2 17.2c-5.6 3.2-7.4 10.2-4.2 15.8l140 247.4 1-0.6 48.8-29.6-19.6-34.4z","M686.4 544l-9.8-17.4-49.6 30 26 46 49.8-30.2z"],"grid":0,"tags":["ios-appstore-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM256 480h106.2l-37 64h-69.2v-64zM278.6 704l19-90 49.6 32.4-68.6 57.6zM357.2 632.6l-49.8-30 33.8-58.4 37-64 74.8-129.6c3.2-5.6 10.4-7.4 15.8-4.2l30.2 17.2c5.6 3.2 7.4 10.2 4.2 15.8l-94.8 164.8-51.2 88.4zM424.2 544l36.8-64h105.4l36.2 64h-178.4zM619 544.6l-0.4-0.6-139.6-246.8c-3.2-5.4-1.2-12.6 4.2-15.8l30.2-17.2c5.6-3.2 12.6-1.2 15.8 4.2l120 211.6 19.6 34.4-49.8 30.2zM627 556.6l49.6-30 10 17.4 16.2 28.4-49.8 30-26-45.8zM729.4 704c-17-33.6-34.8-27.4-53-50.8-22.6-29.2-5.8-50.8 7.8-57.2 35.2-16.4 55 6 59.6 36.6 4.4 28-4.8 63.2-14.4 71.4zM768 544h-66l-36-64h102v64z"],"grid":0,"tags":["ios-appstore"]},{"paths":["M575.6 480c17.6 0 32.2 14.4 32.2 32s-14 32-31.8 32h-128c-17.6 0-32-14.4-32-32s14.4-32 32-32h126zM576 448h-128c-35.2 0-64 28.8-64 64s28.8 64 64 64h128c35.2 0 64-28.8 64-64s-28.8-64-64-64v0z","M832 224h-640v160h32v416h576v-416h32v-160zM768 768h-512v-384h512v384zM800 352h-576v-96h576v96z"],"grid":0,"tags":["ios-archive-outline"]},{"paths":["M224 800h576v-384h-576v384zM448 480h128c17.6 0 32 14.4 32 32s-14.4 32-32 32h-128c-17.6 0-32-14.4-32-32s14.4-32 32-32z","M192 224v160h640v-160z"],"grid":0,"tags":["ios-archive"]},{"paths":["M256.8 320l-64.8 64.6 320 319.4 320-319.4-64.8-64.6-255.2 254.6z"],"grid":0,"tags":["ios-arrow-down"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416c0-229.8-186.2-416-416-416zM512 616.8l186.4-200.8 25.6 27.6-212 228.4-212-228.4 25.6-27.6 186.4 200.8z"],"grid":0,"tags":["ios-arrow-dropdown-circle"]},{"paths":["M698.4 416l25.6 27.6-212 228.4-212-228.4 25.6-27.6 186.4 200.8z","M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416c0-229.8-186.2-416-416-416zM512 130.6c210.2 0 381.4 171 381.4 381.4 0 210.2-171 381.4-381.4 381.4-210.2 0-381.4-171-381.4-381.4-0-210.2 171.2-381.4 381.4-381.4z"],"grid":0,"tags":["ios-arrow-dropdown"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM608 698.4l-27.6 25.6-228.4-212 228.4-212 27.6 25.6-200.8 186.4 200.8 186.4z"],"grid":0,"tags":["ios-arrow-dropleft-circle"]},{"paths":["M608 325.6l-27.6-25.6-228.4 212 228.4 212 27.6-25.6-200.8-186.4z","M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z"],"grid":0,"tags":["ios-arrow-dropleft"]},{"paths":["M96 512c0 229.8 186.2 416 416 416s416-186.2 416-416-186.2-416-416-416c-229.8 0-416 186.2-416 416zM616.8 512l-200.8-186.4 27.6-25.6 228.4 212-228.4 212-27.6-25.6 200.8-186.4z"],"grid":0,"tags":["ios-arrow-dropright-circle"]},{"paths":["M416 325.6l27.6-25.6 228.4 212-228.4 212-27.6-25.6 200.8-186.4z","M96 512c0 229.8 186.2 416 416 416s416-186.2 416-416-186.2-416-416-416c-229.8 0-416 186.2-416 416zM130.6 512c0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171 381.4-381.4 381.4-210.2 0-381.4-171.2-381.4-381.4z"],"grid":0,"tags":["ios-arrow-dropright"]},{"paths":["M512 928c229.8 0 416-186.2 416-416s-186.2-416-416-416-416 186.2-416 416c0 229.8 186.2 416 416 416zM512 407.2l-186.4 200.8-25.6-27.6 212-228.4 212 228.4-25.6 27.6-186.4-200.8z"],"grid":0,"tags":["ios-arrow-dropup-circle"]},{"paths":["M325.6 608l-25.6-27.6 212-228.4 212 228.4-25.6 27.6-186.4-200.8z","M512 928c229.8 0 416-186.2 416-416s-186.2-416-416-416-416 186.2-416 416c0 229.8 186.2 416 416 416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z"],"grid":0,"tags":["ios-arrow-dropup"]},{"paths":["M574.6 512l-254.6 255.2 64.6 64.8 319.4-320-319.4-320-64.6 64.8z"],"grid":0,"tags":["ios-arrow-forward"]},{"paths":["M752 496h-441.4l132.6-148.8c5.8-6.8 6.4-16.2 0.2-22.4s-17-6.6-22.8-0.2l-160 176c-0.4 0.4-0.8 0.8-1 1.2-0.2 0.2-0.2 0.4-0.4 0.6s-0.4 0.4-0.6 0.8c-0.2 0.2-0.2 0.4-0.4 0.6s-0.2 0.4-0.4 0.6c-0.2 0.2-0.2 0.4-0.4 0.8-0.2 0.2-0.2 0.4-0.4 0.6 0 0.2-0.2 0.4-0.2 0.8 0 0.2-0.2 0.6-0.2 0.8s-0.2 0.4-0.2 0.8c0 0.2-0.2 0.6-0.2 0.8s0 0.6-0.2 0.8c0 0.2 0 0.4 0 0.6-0.2 1-0.2 2.2 0 3.2 0 0.2 0 0.4 0 0.6s0 0.6 0.2 0.8c0 0.2 0.2 0.6 0.2 0.8s0.2 0.4 0.2 0.8c0 0.2 0.2 0.6 0.2 0.8s0.2 0.4 0.2 0.8c0 0.2 0.2 0.4 0.4 0.6s0.2 0.4 0.4 0.8c0.2 0.2 0.2 0.4 0.4 0.6s0.2 0.4 0.4 0.6c0.2 0.2 0.4 0.4 0.6 0.8 0.2 0.2 0.2 0.4 0.4 0.6 0.4 0.4 0.6 0.8 1 1.2l160 176c3.2 3.4 7.2 4.6 11.4 4.6 4 0 8.2-1.6 11.4-4.6 6.2-6.2 6-16 0-22.6l-132.8-148.8h441.4c8.8 0 16-7.2 16-16s-7.2-16-16-16z"],"grid":0,"tags":["ios-arrow-round-back"]},{"paths":["M496 272v441.4l-148.8-132.6c-6.8-5.8-16.2-6.4-22.4-0.2s-6.6 17-0.2 22.8l176 160c0.4 0.4 0.8 0.8 1.2 1 0.2 0.2 0.4 0.2 0.6 0.4s0.4 0.4 0.8 0.6c0.2 0.2 0.4 0.2 0.6 0.4s0.4 0.2 0.6 0.4c0.2 0.2 0.4 0.2 0.8 0.4 0.2 0.2 0.4 0.2 0.6 0.4 0.2 0 0.4 0.2 0.8 0.2 0.2 0 0.6 0.2 0.8 0.2s0.4 0.2 0.8 0.2c0.2 0 0.6 0.2 0.8 0.2s0.6 0 0.8 0.2c0.2 0 0.4 0 0.6 0 1 0.2 2.2 0.2 3.2 0 0.2 0 0.4 0 0.6 0s0.6 0 0.8-0.2c0.2 0 0.6-0.2 0.8-0.2s0.4-0.2 0.8-0.2c0.2 0 0.6-0.2 0.8-0.2s0.4-0.2 0.8-0.2c0.2 0 0.4-0.2 0.6-0.4s0.4-0.2 0.8-0.4c0.2-0.2 0.4-0.2 0.6-0.4s0.4-0.2 0.6-0.4c0.2-0.2 0.4-0.4 0.8-0.6 0.2-0.2 0.4-0.2 0.6-0.4 0.4-0.4 0.8-0.6 1.2-1l176-160c3.4-3.2 4.6-7.2 4.6-11.4 0-4-1.6-8.2-4.6-11.4-6.2-6.2-16-6-22.6 0l-148.8 132.8v-441.4c0-8.8-7.2-16-16-16s-16 7.2-16 16z"],"grid":0,"tags":["ios-arrow-round-down"]},{"paths":["M272 528h441.4l-132.6 148.8c-5.8 6.8-6.4 16.2-0.2 22.4s17 6.6 22.8 0.2l160-176c0.4-0.4 0.8-0.8 1-1.2 0.2-0.2 0.2-0.4 0.4-0.6s0.4-0.4 0.6-0.8c0.2-0.2 0.2-0.4 0.4-0.6s0.2-0.4 0.4-0.6c0.2-0.2 0.2-0.4 0.4-0.8 0.2-0.2 0.2-0.4 0.4-0.6 0-0.2 0.2-0.4 0.2-0.8 0-0.2 0.2-0.6 0.2-0.8s0.2-0.4 0.2-0.8c0-0.2 0.2-0.6 0.2-0.8s0-0.6 0.2-0.8c0-0.2 0-0.4 0-0.6 0.2-1 0.2-2.2 0-3.2 0-0.2 0-0.4 0-0.6s0-0.6-0.2-0.8c0-0.2-0.2-0.6-0.2-0.8s-0.2-0.4-0.2-0.8c0-0.2-0.2-0.6-0.2-0.8s-0.2-0.4-0.2-0.8c0-0.2-0.2-0.4-0.4-0.6s-0.2-0.4-0.4-0.8c-0.2-0.2-0.2-0.4-0.4-0.6s-0.2-0.4-0.4-0.6c-0.2-0.2-0.4-0.4-0.6-0.8-0.2-0.2-0.2-0.4-0.4-0.6-0.4-0.4-0.6-0.8-1-1.2l-160-176c-3.2-3.4-7.2-4.6-11.4-4.6-4 0-8.2 1.6-11.4 4.6-6.2 6.2-6 16 0 22.6l132.6 148.6h-441.2c-8.8 0-16 7.2-16 16 0 9 7.2 16.2 16 16.2z"],"grid":0,"tags":["ios-arrow-round-forward"]},{"paths":["M528 752v-441.4l148.8 132.6c6.8 5.8 16.2 6.4 22.4 0.2s6.6-17 0.2-22.8l-176-160c-0.4-0.4-0.8-0.8-1.2-1-0.2-0.2-0.4-0.2-0.6-0.4s-0.4-0.4-0.8-0.6c-0.2-0.2-0.4-0.2-0.6-0.4s-0.4-0.2-0.6-0.4c-0.2-0.2-0.4-0.2-0.8-0.4-0.2-0.2-0.4-0.2-0.6-0.4-0.2 0-0.4-0.2-0.8-0.2-0.2 0-0.6-0.2-0.8-0.2s-0.4-0.2-0.8-0.2c-0.2 0-0.6-0.2-0.8-0.2s-0.6 0-0.8-0.2c-0.2 0-0.4 0-0.6 0-1-0.2-2.2-0.2-3.2 0-0.2 0-0.4 0-0.6 0s-0.6 0-0.8 0.2c-0.2 0-0.6 0.2-0.8 0.2s-0.4 0.2-0.8 0.2c-0.2 0-0.6 0.2-0.8 0.2s-0.4 0.2-0.8 0.2c-0.2 0-0.4 0.2-0.6 0.4s-0.4 0.2-0.8 0.4c-0.2 0.2-0.4 0.2-0.6 0.4s-0.4 0.2-0.6 0.4c-0.2 0.2-0.4 0.4-0.8 0.6-0.2 0.2-0.4 0.2-0.6 0.4-0.4 0.4-0.8 0.6-1.2 1l-176 160c-3.4 3.2-4.6 7.2-4.6 11.4 0 4 1.6 8.2 4.6 11.4 6.2 6.2 16 6 22.6 0l148.6-132.6v441.2c0 8.8 7.2 16 16 16 9 0 16.2-7.2 16.2-16z"],"grid":0,"tags":["ios-arrow-round-up"]},{"paths":["M767.2 704l64.8-64.6-320-319.4-320 319.4 64.8 64.6 255.2-254.6z"],"grid":0,"tags":["ios-arrow-up"]},{"paths":["M867.8 689.2c-65.8 127.6-195.2 206.8-337.6 206.8-101 0-194.6-39.8-263.8-112.2-68.8-72-106.6-168.4-106.6-271.8s37.8-199.8 106.6-271.8c69.2-72.4 163-112.2 263.8-112.2 101.8 0 187.8 38.6 242.2 108.4 52.6 67.6 69 156.2 46.4 249.8-21.8 90.2-67 131.6-101 150.4-35 19.4-83.6 26.8-104.8 8.8v0c-0.6-0.6-1.2-1.2-1.6-1.8-3-3.8-4.6-10.8-4.8-17s0.4-13.4 2-21.4c1.6-8 3.8-16.8 6.4-25.4l77.2-233.8h-42.6l-20 53c-9.2-24.2-21.2-41.6-36.2-52-15-10.6-31.4-15.8-49-15.8-28.4 0-54.4 7-77.8 20.8-23.6 13.8-43.6 31.8-60.2 54.2s-29.4 47.6-38.6 75.4c-9.2 27.8-13.6 55.8-13.6 83.8 0 16.2 2.4 31.4 7.2 45.4s11.8 26.4 20.8 37.2c9 10.8 20.2 19.4 33.4 25.6s28 9.4 44.6 9.4c20.4 0 39.4-5.4 57-16.8s32.6-24.2 45-36.2h1.6c1.6 18 9.4 31 19.6 40.2 5.2 4.6 12.6 9 22.2 12.2v0.2c42.2 14.4 84.2 6 127.6-18 39.6-22 92.2-69.4 116.6-171 25-103.2 6.4-201.6-52.4-277.2-60.4-77.6-155.4-120.4-267.2-120.4-109.6 0-211.4 43.4-286.6 122-74.6 78-115.6 182.4-115.6 294s41 216 115.6 294c75.2 78.8 177.2 122 286.6 122 154.2 0 294.4-85.8 365.8-224l-28.2-14.8zM567 572.8c-12.2 19.6-26.6 36-43 49.6-16.4 13.4-34 20.2-53.2 20.2-19.6 0-35.8-7.2-48.6-21.4-12.8-14.4-19.2-33.8-19.2-58.6 0-19.2 3.2-40 9.8-62.4 6.6-22.2 16-43 28.2-62s27-34.8 44.2-47.4c17.2-12.6 36.2-19 56.8-19 8.2 0 16 2.2 23.8 6.6 7.6 4.4 14.4 10.2 20.4 17.4s11 15.2 14.8 24.4c3.8 9 5.8 18.6 5.8 28.4 0 18.2-3.6 38.6-10.6 61.2-7.2 22.4-17 43.4-29.2 63z"],"grid":0,"tags":["ios-at-outline"]},{"paths":["M768 184.2c10.6 10 20.4 21 29.4 32.6 58.8 75.4 77.4 173.8 52.4 277.2-24.6 101.4-77 149-116.6 171-43.4 24-85.4 32.4-127.6 18v-0.2c-9.6-3.2-17-7.6-22.2-12.2-10.2-9.2-18-22.2-19.6-40.2h-1.6c-12.4 12-27.2 24.8-45 36.2s-36.6 16.8-57 16.8c-16.6 0-31.4-3-44.6-9.4-13.2-6.2-24.2-14.8-33.4-25.6s-16-23.2-20.8-37.2c-4.8-14-7.2-29.2-7.2-45.4 0-28 4.6-56 13.6-83.8s22-53 38.6-75.4c16.6-22.4 36.6-40.6 60.2-54.2 23.6-13.8 49.4-20.8 77.8-20.8 17.6 0 34 5.2 49 15.8s27 27.8 36.2 52l20-53h42.6l-77 233.6c-2.6 8.6-4.8 17.4-6.4 25.4s-2.2 15.2-2 21.4c0.2 6.2 1.8 13.2 4.8 17 0.4 0.6 1 1.2 1.6 1.8 21.2 18.2 69.8 10.6 104.8-8.8 34.2-18.8 79.4-60.2 101-150.4 22.6-93.6 6-182.2-46.4-249.8-45.6-58.4-109.2-117.6-193.6-133-27.8-5-44.2-7.6-67-7.6-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416c0-133.2-62.6-251.8-160-327.8z","M422.2 621.2c12.8 14.2 29 21.4 48.6 21.4 19.2 0 36.8-6.8 53.2-20.2 16.4-13.6 30.8-30 43-49.6s22-40.6 29-63.2 10.6-43 10.8-61c0-9.8-2-19.4-5.8-28.4-2-4.6-4.2-9-6.6-13.2-2.4-4-5.2-7.8-8.2-11.4-6-7.2-12.8-13-20.4-17.4s-15.6-6.6-23.8-6.6c-20.8 0-39.6 6.4-56.8 19s-32 28.4-44.2 47.4c-12.2 19-21.6 39.6-28.2 62-6.6 22.2-9.8 43-9.8 62.4 0 0 0 0 0 0.2 0 0 0 0 0 0 0 24.8 6.4 44.2 19.2 58.6z"],"grid":0,"tags":["ios-at"]},{"paths":["M687 383c-9.4 0-17 7.6-17 17v314c0 38-15 76.4-41.8 104.8-27.4 28.8-66.6 45.2-104.2 45.2h-24c-79 0-148-72-148-150v-442.2c0-61.2 50.8-109.6 112-109.6s110 48.4 110 109.6v428.6c0 34.4-27.2 67.6-62 67.6s-64-33-64-67.6v-236.4c0-9.4-7.6-17-17-17s-17 7.6-17 17v236.4c0 57.6 44.6 99.6 98 99.6s96-40 96-99.6v-428.6c0-79.8-64.8-143.8-144.6-143.8s-143.4 64-143.4 143.8v442.2c0 46.4 19 93.6 54.6 128.6 35.4 34.8 79 53.4 125.4 53.4h24c96 0 180-82.8 180-182v-314c0-9.4-7.6-17-17-17z"],"grid":0,"tags":["ios-attach"]},{"paths":["M790 192h-330c-93.4 0-146.4 69.4-204 127s-144.2 149.4-144.2 149.4c-9.8 11.2-15.8 25.6-15.8 41.8 0 16 6 30.6 15.8 42 0 0 68.6 75.2 144.2 151 75.6 75.6 113.4 129 204 129h330c77 0 138-65 138-142v-360.2c0-77-61-138-138-138zM896 690c0 29-10.6 56.8-31 77.4-20.2 20.8-46.6 32.6-75 32.6h-330c-65.2 0-96.4-32.6-153-90.8l-171.4-178.4c-3.6-4.2-7.6-11.2-7.6-20.8 0-9.4 4-16.4 7.6-20.6l166.2-172.2c24.4-25.4 47.6-49 73.8-66.6 27.6-18.6 54.4-26.8 84.4-26.8h330c28.6 0 55 10.6 75.2 30.8s30.8 46.6 30.8 75.2v360.2z","M632.8 512l127.2-126.8-29.2-29.2-127.2 127-126.4-126.4-29.2 29.2 126.6 126.2-126.6 126.4 29.2 29 126.4-126.2 127.2 126.8 29.2-29z"],"grid":0,"tags":["ios-backspace-outline"]},{"paths":["M790 192h-330c-93.4 0-146.4 69.4-204 127s-144.2 149.4-144.2 149.4c-9.8 11.2-15.8 25.6-15.8 41.8 0 16 6 30.6 15.8 42 0 0 68.6 75.2 144.2 151 75.6 75.6 113.4 129 204 129h330c77 0 138-65 138-142v-360.2c0-77-61-138-138-138zM730.8 668l-127.2-126.8-126.6 126.2-29-29 126.6-126.4-126.6-126.2 29.2-29.2 126.6 126.4 127.2-127 29.2 29.2-127.4 126.8 127.2 127-29.2 29z"],"grid":0,"tags":["ios-backspace"]},{"paths":["M800 448v-192c0-70.4-57.6-128-128-128h-320c-70.4 0-128 57.6-128 128v192h-160l105 388.6c9.4 34 40.8 59.4 78.2 59.4h529.4c37.4 0 68.8-25 78.6-59l104.8-389h-160zM918 480h0.2l-25.8 96h-156.4v-96h182zM140.4 608h147.6v128h-113l-34.6-128zM320 608h176v128h-176v-128zM704 576h-176v-96h176v96zM496 576h-176v-96h176v96zM496 768v96h-176v-96h176zM528 768h176v96h-176v-96zM528 736v-128h176v128h-176zM736 608h147.8l-34.4 128h-113.4v-128zM256 256c0-25.6 10-49.6 28.2-67.8s42.2-28.2 67.8-28.2h320c25.6 0 49.6 10 67.8 28.2s28.2 42.2 28.2 67.8v192h-512v-192zM288 480v96h-156.2l-26-96h182.2zM200 828.2l-16.4-60.2h104.4v96h-40.8c-22 0-41.4-14.6-47.2-35.8zM824.6 828.4c-6.2 21-25.8 35.6-47.8 35.6h-40.8v-96h104.8l-16.2 60.4z"],"grid":0,"tags":["ios-basket-outline"]},{"paths":["M800 448v-192c0-70.4-57.6-128-128-128h-320c-70.4 0-128 57.6-128 128v192h-160l105 388.6c9.4 34 40.8 59.4 78.2 59.4h529.4c37.4 0 68.8-25 78.6-59l104.8-389h-160zM256 256c0-25.6 10-49.6 28.2-67.8s42.2-28.2 67.8-28.2h320c25.6 0 49.6 10 67.8 28.2s28.2 42.2 28.2 67.8v192h-512v-192zM883.8 608h-147.8v128h113.4l-8.6 32h-104.8v96h-32v-96h-176v96h-32v-96h-176v96h-32v-96h-104.4l-8.6-32h113v-128h-147.6l-8.6-32h156.2v-96h32v96h176v-96h32v96h176v-96h32v96h156.4l-8.6 32z","M528 608h176v128h-176v-128z","M320 608h176v128h-176v-128z"],"grid":0,"tags":["ios-basket"]},{"paths":["M768 288h-608c-35.2 0-64 28.8-64 64v320c0 35.2 28.8 64 64 64h608c35.2 0 64-28.8 64-64v-320c0-35.2-28.8-64-64-64zM800 672c0 17.6-14.4 32-32 32h-608c-17.6 0-32-14.4-32-32v-320c0-17.6 14.4-32 32-32h608c17.6 0 32 14.4 32 32v320z","M740 352h-552c-17.6 0-28 10.4-28 28v264c0 17.6 10.4 28 28 28h552c17.6 0 28-10.4 28-28v-264c0-17.6-10.4-28-28-28zM437.6 616l16.8-86h-54.4l90.4-122-16.8 86h54.4l-90.4 122z","M864 401.2v221.6c38.2-22.2 64-63.4 64-110.8s-25.8-88.6-64-110.8z"],"grid":0,"tags":["ios-battery-charging"]},{"paths":["M768 288h-608c-35.2 0-64 28.8-64 64v320c0 35.2 28.8 64 64 64h608c35.2 0 64-28.8 64-64v-320c0-35.2-28.8-64-64-64zM800 672c0 17.6-14.4 32-32 32h-608c-17.6 0-32-14.4-32-32v-320c0-17.6 14.4-32 32-32h608c17.6 0 32 14.4 32 32v320z","M864 401.2v221.6c38.2-22.2 64-63.4 64-110.8s-25.8-88.6-64-110.8z"],"grid":0,"tags":["ios-battery-dead"]},{"paths":["M768 288h-608c-35.2 0-64 28.8-64 64v320c0 35.2 28.8 64 64 64h608c35.2 0 64-28.8 64-64v-320c0-35.2-28.8-64-64-64zM800 672c0 17.6-14.4 32-32 32h-608c-17.6 0-32-14.4-32-32v-320c0-17.6 14.4-32 32-32h608c17.6 0 32 14.4 32 32v320z","M740 352h-552c-17.6 0-28 10.4-28 28v264c0 17.6 10.4 28 28 28h552c17.6 0 28-10.4 28-28v-264c0-17.6-10.4-28-28-28z","M864 401.2v221.6c38.2-22.2 64-63.4 64-110.8s-25.8-88.6-64-110.8z"],"grid":0,"tags":["ios-battery-full"]},{"paths":["M890.4 96h-633.6c-108.6 0-128.8 55.8-128.8 80.4 60.6 8.4 64 8.4 64 72.4 0 32 0 551 0 551 0 70.6 57.6 128 128.4 128h415.6c70.8 0 126-58.4 126-129v-620.4c4-35 25-63.2 27.2-66.6 2.4-3.8 6.8-8.8 6.8-11 0-2.4-0.6-4.8-5.6-4.8zM830 178.6v620.4c0 26-9.4 48.8-27.4 67.4s-41 29.6-66.4 29.6h-416c-52.8 0-96.2-43.8-96.2-97v-550c0-33.4 0.6-61.6-16.6-80.8-8.6-9.6-21.2-12.6-34.6-16.4 11.4-10 35.4-24 84.2-24h587.2c0 0.2-14.2 12.8-14.2 50.8z","M766 352v416c0 20.4-3.6 36-11 43.8-11.4 11.6-27.6 20.4-40.2 20.4h-374c-17.6 0-30.8-5.4-39-15.8-8.8-10.8-13.8-28.6-13.8-50.2v-414.2h478zM798 320h-542v446c0 56.6 27.4 98 84.8 98h374c22.8 0 46.8-13.4 63-30 16.2-16.8 20.2-42.6 20.2-66v-448z"],"grid":0,"tags":["ios-beaker-outline"]},{"paths":["M340.8 832h374c12.6 0 28.8-8.6 40.2-20.4 7.6-7.8 11-23.2 11-43.8v-415.8h-478v414c0 21.6 5.2 39.4 13.8 50.2 8.2 10.4 21.4 15.8 39 15.8z","M890.4 96h-633.4c-108.8 0-129 55.8-129 80.4 60.6 8.4 64 8.4 64 72.4 0 32 0 551 0 551 0 70.6 57.8 128 128.4 128h415.6c70.8 0 126-58.4 126-129v-620.4c4-35 25-63.2 27.2-66.6 2.4-3.8 6.8-8.8 6.8-11 0-2.4-0.6-4.8-5.6-4.8zM798 768c0 23.4-3.8 49.2-20.2 66-16.2 16.6-40.4 30-63 30h-374c-57.4 0-84.8-41.4-84.8-98v-446h542v448z"],"grid":0,"tags":["ios-beaker"]},{"paths":["M767.4 236.6c0-41.6-34.4-76.6-76.2-76.6l-21-1.4c-12-54-64-94.6-118.2-94.6s-82.2 23.2-103.4 57.8c-17-19.6-42.2-30.8-70.4-30.8-36.6 0-68.2 23-83.4 53h-48.8c-50 0-86 39.2-86 90.8v8c0 57.6 32 41.8 32 79.6 0 35.6 0 213.6 0 213.6 0 26.8-22.4 38.6-22.4 70.4 0 17.6 16 33.6 33.6 33.6h20.8v-352h544c0 0-0.6-9.8-0.6-51.4zM735.2 256h-512.8c0 0-15.6 0-21.6 0s-8.8-7.6-8.8-13.2v-8c0-17.8 6.8-32.8 16.4-43.8 9.2-10.6 22.8-15 37.6-15h69l8.6-19.2c10-21 30.8-34.4 54.6-34.4 18 0 37 10.2 52.4 22.2l21.4 18.6 16-20c22.6-30 52.8-47.6 84.2-47.6 20.6 0 40 6.8 56 19.8 15.6 12.6 26.6 30.2 30.8 49.6l5.2 23.6c0 0 18.8-0.8 47 3.2s44.2 20.8 44.2 44.8l-0.2 19.4z","M616 448c0 22.091-17.909 40-40 40s-40-17.909-40-40c0-22.091 17.909-40 40-40s40 17.909 40 40z","M544 544c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M576 704c0 13.255-10.745 24-24 24s-24-10.745-24-24c0-13.255 10.745-24 24-24s24 10.745 24 24z","M192 928h608v32h-608v-32z","M832 416h-96v-96h-480v544l-32 32h544l-32-32v-128h96c17.6 0 32-14.4 32-32v-256c0-17.6-14.4-32-32-32zM704 864h-416v-512h416v512zM832 704c0 0 0 0 0 0h-96v-256h96c0 0 0 0 0 0v256z"],"grid":0,"tags":["ios-beer-outline"]},{"paths":["M224 640v-352h544c0 0-0.6-9.8-0.6-51.4s-34.4-76.6-76.2-76.6l-21-1.4c-12-54-64-94.6-118.2-94.6s-82.2 23.2-103.4 57.8c-17-19.6-42.2-30.8-70.4-30.8-36.6 0-68.2 23-83.4 53h-48.8c-50 0-86 39.2-86 90.8v8c0 57.6 32 41.8 32 79.6 0 35.6 0 213.6 0 213.6 0 26.8-22.4 38.6-22.4 70.4 0 17.6 16 33.6 33.6 33.6h20.8z","M832 416h-96v-96h-480v544l-64 64v32h608v-32l-64-64v-128h96c17.6 0 32-14.4 32-32v-256c0-17.6-14.4-32-32-32zM576 408c22 0 40 18 40 40s-18 40-40 40-40-18-40-40 18-40 40-40zM576 704c0 13.2-10.8 24-24 24s-24-10.8-24-24 10.8-24 24-24 24 10.8 24 24zM512 512c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zM832 704v0h-96v-256h96v256z"],"grid":0,"tags":["ios-beer"]},{"paths":["M250.6 522.6c-102.6 0-186.6 84-186.6 186.6 0 102.8 84 186.8 186.6 186.8s186.6-84 186.6-186.6c0.2-102.8-83.8-186.8-186.6-186.8zM359.8 818.6c-29.4 29.4-68 45.4-109.2 45.4s-79.8-16.2-109.2-45.4-45.4-68.2-45.4-109.2c0-41.2 16.2-79.8 45.4-109.2 29.4-29.4 68-45.4 109.2-45.4s79.8 16.2 109.2 45.4c29.4 29.4 45.4 68 45.4 109.2 0.2 41-16 79.8-45.4 109.2z","M639.6 255.6c35.6 0 64-28.4 64-64s-28-63.6-63.6-63.6c-35.6 0-64.4 28-64.4 63.6s28.6 64 64 64z","M773.4 522.6c-102.6 0-186.6 84-186.6 186.6s84 186.6 186.6 186.6c102.6 0 186.6-84 186.6-186.6s-84-186.6-186.6-186.6zM882.6 818.6c-29.4 29.4-68 45.4-109.2 45.4s-79.8-16.2-109.2-45.4c-29.4-29.4-45.4-68-45.4-109.2s16.2-79.8 45.4-109.2c29.4-29.4 68-45.4 109.2-45.4s79.8 16.2 109.2 45.4c29.4 29.4 45.4 68 45.4 109.2 0 41-16.2 79.8-45.4 109.2z","M736 384h-96l-59-120.2c-11.2-18.6-31.8-31.8-54.2-31.8-16.8 0-33.6 7.4-44.8 18.6l-143.4 138.2c-11.2 11.2-18.6 28-18.6 44.8 0 34.8 25.2 47.2 37 54.2 91 52.4 123 58.2 123 84.4s0 131.8 0 131.8c0 17.6 14.4 32 32 32s32-14.4 32-32c0 0 0-153.6 0-180s-60.8-48-96.6-76l97.8-103c37.4 57 54.6 103 76 103s114.8 0 114.8 0c17.6 0 32-14.4 32-32s-14.4-32-32-32z"],"grid":0,"tags":["ios-bicycle"]},{"paths":["M572 512l196-174-256.4-274h-31.6v360l-178.8-154-45.2 50 224 192-224 192 45.2 51.6 178.8-157.6v362h31.6l0.4-0.8 256-271.2-196-176zM675.6 689l-131.6 141v-255.6l131.6 114.6zM544 451.2v-257l131.6 142.4-131.6 114.6z"],"grid":0,"tags":["ios-bluetooth"]},{"paths":["M512 895.6c-59.2 0-139.8-13.4-192-31.6 0 0-70 45-160 64 64.6 0 106.6-18 160-32 46 18 133.4 31.6 192 31.6s148-11.6 192-31.6c53.4 14 94 32 160 32-87.6-19-160-64-160-64-52.2 18.2-132.8 31.6-192 31.6z","M891 526c0 0 0 0 0 0l-61.4-28.2-46-243.8v-0.2c-11-53.2-34.8-93.8-79.6-93.8h-69.2l-16.4-64h-213.4l-16.2 64h-68.8c-45.8 0-70.2 41.4-79.6 94l-46 243.8-61.4 28.2c0 0 0 0 0 0-12.4 5.8-21 18.2-21 32.8 0 4.8 1 9.2 2.6 13.4l109.4 291.8c55 0 113.4-38 113.4-38 39.8 20 121.6 37.6 174.6 37.6s134.8-17.6 174.6-37.6c0 0 58.4 38 113.4 38l109.4-291.8c1.6-4.2 2.6-8.6 2.6-13.4 0-14.6-8.6-27-21-32.8zM429.8 128h163.6l8.2 32h-180l8.2-32zM271.8 259.8c7.6-42 22.2-67.8 48.2-67.8h384c25.6 0 39.4 25.6 48.2 68.2l41.8 221.2-72.8-33.4h0.4c17.8 0 33.6-9.2 30.2-32l-30.2-160c-6-22-14.4-32-32.2-32h-354.6c-17.8 0-27.2 10.6-32.2 32l-30.2 160c-2.6 16 12.4 32 30.2 32h0.4l-73 33.4 41.8-221.6zM512 352l-139.4 64h-67.6l29-153.2c0.8-3.2 1.6-5.4 2.2-6.8h351.6c0.6 1.4 1.6 3.8 2.6 7.4l28.8 152.6h-67.6l-139.6-64zM335.4 789.2l-15.4 10c-11.4 7.4-42.4 24-73.4 30.4l-102.6-270.8c0-2.2 1.6-3.2 2.2-3.6l349.8-163.8v439.6c-48-3-112.4-17.6-144.2-33.6l-16.4-8.2zM777.4 829.6c-31-6.4-62-23-73.4-30.4l-15.4-10-16.4 8.2c-31.8 16-96.4 30.8-144.2 33.6v-439.6l349.8 163.8c0.6 0.4 2.2 1.4 2.2 3.6l-102.6 270.8z","M624 532c0 24.301-10.745 44-24 44s-24-19.699-24-44c0-24.301 10.745-44 24-44s24 19.699 24 44z","M448 532c0 24.301-10.745 44-24 44s-24-19.699-24-44c0-24.301 10.745-44 24-44s24 19.699 24 44z"],"grid":0,"tags":["ios-boat-outline"]},{"paths":["M704 864c-52.2 18.2-132.8 31.6-192 31.6s-139.8-13.4-192-31.6c0 0-70 45-160 64 64.6 0 106.6-18 160-32 46 18 133.4 31.6 192 31.6s148-11.6 192-31.6c53.4 14 94 32 160 32-87.6-19-160-64-160-64z","M891 526c0 0 0 0 0 0l-379-174-379 174c0 0 0 0 0 0-12.4 5.8-21 18.2-21 32.8 0 4.8 1 9.2 2.6 13.4l109.4 291.8c55 0 113.4-38 113.4-38 36 18 106.2 34.2 158.6 37.2 5.6 0.4 11 0.4 16 0.4s10.4-0.2 16-0.4c52.4-3 122.6-19 158.6-37.2 0 0 58.4 38 113.4 38l109.4-291.8c1.6-4.2 2.6-8.6 2.6-13.4 0-14.6-8.6-27-21-32.8zM424 576c-13.2 0-24-19.6-24-44s10.8-44 24-44 24 19.6 24 44-10.8 44-24 44zM600 576c-13.2 0-24-19.6-24-44s10.8-44 24-44 24 19.6 24 44-10.8 44-24 44z","M783.8 254v-0.2c-11.2-53.2-35-93.8-79.8-93.8h-69.2l-16.4-64h-213.4l-16.2 64h-68.8c-45.8 0-70.2 41.4-79.6 94l-39.4 208.8 68.4-31.4 33.2-175.4c5-21.4 14.6-32 32.2-32h354.2c17.8 0 26.2 10 32.2 32l33.2 175.4 68.6 31.4-39.2-208.8z"],"grid":0,"tags":["ios-boat"]},{"paths":["M510 704.2l0.2 1.6 0.4 1.8 30.4 152c0.8 2.8 1.2 5.6 1.2 8.4 0 19.2-16.6 28-32 28-9.4 0-17.8-3-23.6-8.4-5.6-5-8.4-11.6-8.4-19.6 0-2.4 0.2-4.6 0.8-7v-0.8l31-156zM510 672c-15.2 0-28 10.8-31.2 25v0l-31.2 157c-1 4.6-1.6 9.2-1.6 14 0 35.4 28.6 60 64 60s64-24.6 64-60c0-5.8-0.8-11.4-2.2-16.8l-30-150c-1.4-16.4-15-29.2-31.8-29.2v0z","M666 730.2l84 61.2 1.4 0.8c0.6 0.4 2.2 1.8 3.4 2.8 0.8 0.8 1.8 1.4 2.6 2.2 0.8 0.6 2.2 3.4 2.6 7.6 0.2 5.6-1.6 11.2-4.8 14.4-2.8 2.8-7.6 4.6-12.8 4.6s-8.6-1.8-9.6-2.8c-0.4-0.6-1-1.2-1.4-1.8-1-1-2.2-2.4-2.4-3l-1.2-1.6-61.8-84.4zM631.8 672.2c-6 0-11.8 2.4-16.6 7.2-8.2 8.2-9.4 20.8-3.4 30.8l90 123.6c1.8 3 4.4 5.6 6.8 8.4 8 9.2 20.6 14 33.8 14 12.8 0 26-4.6 35.4-14 19.2-19.2 18.8-54 0-69.4-3.4-2.8-6.6-5.8-10.2-7.8l-119.2-87c-5.6-4-11.2-5.8-16.6-5.8v0z","M357.8 730.4l-62.4 85.6c-0.6 1-1.4 2-2.4 3-3.2 3.2-7.4 5-12 5s-8.8-1.8-12-5c-6.6-6.6-6.6-17.4 0-24 1-1 2.2-2 3.6-2.8l1.4-0.8 1.4-1 82.4-60zM391.2 672c-5.6 0-11 1.8-15.4 5.6l-119.2 86.8c-3.6 2.2-7.2 4.8-10.2 7.8-19.2 19.2-19.2 50.2 0 69.4 9.6 9.6 22 14.4 34.6 14.4s25-4.8 34.6-14.4c2.6-2.6 4.8-5.4 6.8-8.4l90-123.2c6-10 5-22.4-3.4-30.6-5-5-11.4-7.4-17.8-7.4v0z","M558.6 136c18.6 6.8 41 18 61.6 33.2 29.8 21.8 65.2 58.4 65.2 108 0 28.2-4.8 49.4-15.8 68.6-13 23.2-36 45.2-70.4 67.6-14.6 9.6-31.2 18.8-48.8 28.8-59.6 33.6-132 74.2-169.4 151-5.8-4.4-11.8-10-17.8-16.4-27-29.8-37.2-68-30.4-113.4 7.6-49.6 52.4-91.4 99.8-135.6 56.4-51.8 118.8-109.8 126-191.8zM525.4 96c24 161.6-203.4 226-224 362.6s96 181.4 96 181.4c32.6-113.2 144.8-151.2 219.4-199.6 81.4-52.8 100.6-102.6 100.6-163 0-115.2-144.6-181.4-192-181.4v0z","M711.4 392.2c-6.6 12.6-14.6 24.4-25 35.8 0 0 2.8 22.2 4 40.8s-1.4 34.2-3.4 40c-13 38-30.2 64.2-52.8 79.6-19.6 13.4-44 19.6-77 19.6-12.8 0-32.8-7.8-48.4-21.8s-22.2-22.4-22.2-22.4c-8.2 7-15 13-22.2 21 22.6 32.8 62.6 55.4 92.6 55.4 72 0 128-27 160-120.8 10.6-29.8 4.4-98.8-5.6-127.2z","M374.2 155.8c-3 0-5.8 0.2-8.6 0.6 4.6 57.2-60 88-64 129.6-2.4 25.2 11 50 22 57.6 7.6-9.6 21.4-23.8 21.4-23.8-9-7.4-13.4-25.4-11-33.6s12-19.8 21.2-31c13.4-16.4 30.4-37 38.2-63.2 2.6 1.2 5.2 2.4 7.6 4 5.8 3.4 13.6 7.8 19.4 14.8s11.6 13.8 16.8 23c0 0 12.6-15.8 17.6-25.2-19.2-36.2-53.8-52.8-80.6-52.8z","M275.4 670.4l-121 25.2c-11.6 2.4-23.2-4.6-25.8-15.8s4.8-22.2 16.6-24.6c0.6-0.2 1.4-0.2 2-0.4l123-14.6c8.8-1 16.8 5 18 13.4 0.8 7.8-4.8 15-12.8 16.8z","M748.6 670.4l121 25.2c11.6 2.4 23.2-4.6 25.8-15.8s-4.8-22.2-16.6-24.6c-0.6-0.2-1.4-0.2-2-0.4l-123-14.6c-8.8-1-16.8 5-18 13.4-0.8 7.8 4.8 15 12.8 16.8z"],"grid":0,"tags":["ios-bonfire-outline"]},{"paths":["M541.8 701.2c-1.4-16.4-15.2-29.2-31.8-29.2-15.2 0-28 10.8-31.2 25v0l-31.2 157c-1 4.6-1.6 9.2-1.6 14 0 35.4 28.6 60 64 60s64-24.6 64-60c0-5.8-0.8-11.4-2.2-16.8l-30-150z","M611.8 710v0 0z","M777.8 772.6c-3.4-2.8-6.6-5.8-10.2-7.8l-119.2-87c-11.6-7.6-24-7.4-33 1.8-8.2 8.2-9.4 20.8-3.4 30.8l90 123.6c1.8 3 4.4 5.6 6.8 8.4 15.6 18.2 50.2 19.2 69.2 0 18.8-19.6 18.6-54.4-0.2-69.8z","M745 670v0 0z","M870.8 640c-15.6 0-111.2 0-119 0s-14.8 4.4-16.2 12.4c-1.2 7.2 2.6 14.2 9.4 17.6v0c0 0 0.2 0 0.2 0l115.4 35.6c16.6 3.8 35.4-11 35.4-29.6 0-23.6-9.6-36-25.2-36z","M278.4 670v0 0z","M278.4 670v0c6.6-3.2 10.6-10.4 9.4-17.6-1.4-8-7.8-12.4-16.2-12.4s-103.8 0-119 0-24.6 16.6-24.6 35.2 18.2 34.2 34.8 30.4l115.4-35.6c-0 0 0.2 0 0.2 0z","M375.8 677.6l-119.2 86.8c-3.6 2.2-7.2 4.8-10.2 7.8-19.2 19.2-19.2 50.2 0 69.2 19.2 19.2 50.2 19.2 69.2 0 2.6-2.6 4.8-5.4 6.8-8.4l90-123.2c6-10 5-22.4-3.4-30.6-9.2-9-23.6-9.6-33.2-1.6z","M717.4 277.4c0-115.2-144.8-181.4-192-181.4 24 161.6-203.4 226-224 362.6s96 181.4 96 181.4c32.6-113.2 144.8-151.2 219.4-199.6 81.4-52.8 100.6-102.6 100.6-163z","M717.4 519.2c10-29.4 3.8-98.6-6-126.8-18 35-52.6 64.8-94.4 92-17.2 11.2-41.8 21.6-59.6 31.8-37.4 21-68 41.2-92.6 68.8 22.6 32.8 62.6 55.4 92.6 55.4 72-0.4 128-27.4 160-121.2z","M323.6 343.8c23.4-30.2 49.8-47.6 76.4-72.4 26.8-25 44.2-42.4 55-62.6-21.4-40.2-61.6-56.2-89.4-52.2 4.6 57.2-60 88-64 129.6-2.6 25.2 10.8 50 22 57.6z"],"grid":0,"tags":["ios-bonfire"]},{"paths":["M256 96v832l256-192.8 256 192.8v-832h-512zM736 864l-224-168.6-224 168.6v-736h448v736z"],"grid":0,"tags":["ios-bookmark-outline"]},{"paths":["M256 96v832l256-192.8 256 192.8v-832h-512z"],"grid":0,"tags":["ios-bookmark"]},{"paths":["M534.4 404c0 0 0 0 0 0-14 0-29.8 2.6-46.6 5.8-23.8 4.6-40 14.2-40 14.2s7 54.6 0 117c-7 62.4-16 85-16 85s10.4 24.2 80 30c7.8 0.6 15.2 1 22 1 49 0 72.8-14.6 72.8-14.6s7.2-10.8 9.2-44.4c3.8-64.2-13.4-136.8-33-171-9.6-17.2-26.8-23-48.4-23zM583.8 596c-0.6 10.2-1.8 17.4-2.8 22.2-9 3-24.6 6.6-47.2 6.6-6.2 0-12.8-0.2-19.4-0.8-23.8-2-38-6.2-46.2-9.6 3.4-14.8 7.8-37.6 11.4-69.8 4.4-40.2 3.6-77 2.2-100 3.6-1.2 7.8-2.2 12.2-3 12.2-2.4 27.6-5 40.4-5v0 0 0c16.8 0 19.4 4.4 20.6 6.6 8.2 14.2 16.2 38.6 21.8 64.8 6.2 29.8 8.6 61.2 7 88z","M168.8 224c-53 0-104.8 137-104.8 288s46 288 103 288c66.8 0 233-160 233-160s11.4-25.2 19.8-67.2l3.6-20.8c1.4-9.4 2.6-19.4 3.4-30 0.6-7 1-13.6 1.2-19.8l0.6-19.6c1.6-32-5-65.2-5-65.2-44.2-80.4-184.6-193.4-254.8-193.4zM288.4 695c-86.6 69.4-116.2 73-121.4 73-6.4 0-25.2-16.2-42.6-66-18-51.4-28.4-120.6-28.4-190 0-66 10.6-133.8 29.2-185.8 19.8-55.4 39.6-69.6 43.6-70.2 6.6 0 22 2 49 15.6 21.2 10.6 44.8 25.8 68.6 44.4 46.2 35.8 86.6 78.6 106.4 112.6 1.4 8.2 3.8 26.2 3.8 44.4-16.2-7-41.8-15.8-77.4-22.8-56-11-84.8-6.2-86-6-1.8 0.4-3.2 2-3.4 3.8 0 2 1.4 3.6 3.2 4 0.4 0 37.6 7.6 113.8 33.8 17 5.8 28.6 10 38 13.4 4 1.4 7.4 2.6 10.8 3.8-0.2 5.6-0.6 11-1 16.6-0.8 9-1.8 18.4-3 27.4l-1 5.6c-11 4-26.2 9-43.4 13.6-34 9-76 20-76 20-2 0.6-3.2 2.4-3 4.6 0.4 2 2.2 3.4 4.2 3.4 3.2-0.2 70.8-5.4 112.6-13.6-4.6 19.6-9.6 34-12.4 41.2-11.8 11.2-45.6 42.4-84.2 73.2z","M855.2 224c-72.8 0-204.8 113-248.6 193.6l-1.6 2.8c0 0 2.8 5 3.8 6.8 6.8 12 13.4 28.6 18.8 48l5.8 23.4c4.4 20.4 7.4 42.4 8.4 64.4l0.4 18c0 5.8-0.2 11.4-0.6 17-2 33.4-9.2 44.2-9.2 44.2 15.2 21 150 157.8 224.4 157.8 57 0 103-137 103-288s-51.6-288-104.6-288zM857 768c-22.8 0-65.4-23.8-114.2-63.8-32.4-26.6-59.6-53.6-74-69 2.2-9 3.8-20.6 4.8-35.4 0.2-3.2 0.4-6.6 0.4-10 42.2 11.4 120.4 19.2 124.2 19.6 0.2 0 0.2 0 0.4 0 1.8 0 3.6-1.4 4-3.2 0.4-2-0.8-4-2.8-4.6-0.4-0.2-43.4-13.2-81-23-17.6-4.6-33.2-9.8-44.8-14.2v-2.2l0.2-0.4v-0.4c-1.8-21.4-4-44-8.4-65.6 40.8-22.6 126-61 127-61.4 1.8-0.8 2.8-2.8 2.2-4.8s-2.4-3.2-4.4-2.8c-0.4 0-30.8 5.2-70.6 19.2-20.2 7-42.6 14.8-61 21.2l-0.4-1.2c-4.8-17.2-10.6-32.8-16.8-45.4 21.2-33.4 57.8-72.6 98.4-105.4 54.4-43.8 95-59.4 115-59.4 4 0.6 23.8 14.6 43.6 70.2 18.6 52.2 29.2 120 29.2 185.8 0 69.4-10.4 138.6-28.4 190-17.4 50-36.2 66.2-42.6 66.2z"],"grid":0,"tags":["ios-bowtie-outline"]},{"paths":["M581.6 427c-9.6-17-27.6-22.6-49.6-22.6v-0.4c-12 0-28.6 2.6-45.2 5.8-23.8 4.6-39.4 14.2-39.4 14.2s7.2 54.6 0.2 117c-7 62.4-15.8 85-15.8 85s10.6 24.2 80 30c7.8 0.6 15.2 1 22 1 49 0 72.8-14.6 72.8-14.6s6.6-10.8 8.6-44.2c3.8-64.4-14-137-33.6-171.2z","M423.4 417.6c-44-80.4-184.4-193.6-254.6-193.6-53-0-104.8 137-104.8 288s46 288 103 288c66.8 0 233-160 233-160s11.4-25.2 19.8-67.2l3.6-20.8c1.4-9.4 2.6-19.4 3.4-30 0.6-7 1-13.6 1.2-19.8l0.6-19.6c1.4-32-5.2-65-5.2-65zM230 448c0-2 1.4-3.6 3.4-3.8 1.2-0.2 29.8-5 86 6 42 8.2 70.2 19.2 85.4 26.4l-2.6 28.6c-5.2-1.8-10.6-3.6-17-6-9.4-3.4-21-7.4-38-13.4-76.2-26.2-113.4-33.8-113.8-33.8-2-0.4-3.4-2.2-3.4-4zM395 578.2c-40.2 9.4-118.8 15.4-122.2 15.6-2 0.2-4-1.2-4.2-3.4-0.4-2 1-4 3-4.6 0 0 42-11 76-20 23-6 42.2-13 52.8-17l-5.4 29.4z","M855.2 224c-72.8 0-204.8 113-248.6 193.6l-1.6 2.8c0 0 2.8 5 3.8 6.8 6.8 12 13.4 28.6 18.8 48l5.8 23.4c4.4 20.4 7.4 42.4 8.4 64.4l0.4 18c0 5.8-0.2 11.4-0.6 17-2 33.4-9.2 44.2-9.2 44.2 15.2 21 150 157.8 224.4 157.8 57 0 103-137 103-288s-51.6-288-104.6-288zM719.6 446.2c39.8-14 70.4-19.2 70.6-19.2 2-0.4 4 0.8 4.4 2.8 0.6 2-0.4 4-2.2 4.8-1 0.4-101.4 45.8-136.4 67 0 0 0 0.4 0 0.4v0c0 0 0-0.2 0-0.4l-7.6-30.6v-0.2c20-6.6 47-16.2 71.2-24.6zM802.4 606.2c-0.4 1.8-2 3.2-4 3.2-0.2 0-0.2 0-0.4 0-4.2-0.4-98.8-9.8-136-23.2-4-23.2 1.8-24.8 1.8-25.8 11.8 4.6 31.6 11.8 54.8 18 37.6 10 80.6 23 81 23 2 0.8 3.2 2.8 2.8 4.8z"],"grid":0,"tags":["ios-bowtie"]},{"paths":["M299 566.6c-103.8 0-167.8 91.4-167.8 190.2 0 45.4-20.2 78.4-67.2 96.2 28.6 55.6 124 75 191.4 75 16.8 0 31.8-1.2 43.6-3.4 71.2-12.8 160.2-49.8 181.4-154 24.6-121.2-77.6-204-181.4-204zM449 764.4c-8 39.2-27.2 69-59 91.4-25.2 17.8-57.6 30.4-96.6 37.4-7.2 1.2-19.6 2.8-38 2.8-50.8 0-108.2-11.6-141-34.2 32-24.4 48.8-60 48.8-104.8 0-42 13.8-82.8 37.6-111.8 17.4-21.2 48.6-46.4 98.2-46.4 48.4 0 96.2 21.8 124.8 56.6 17.2 21.2 35.6 57.2 25.2 109z","M935.2 120.8c-15.4-15.4-33.6-24.8-52.2-24.8-12.6 0-25.4 4.4-37.6 14l-350.2 308.2c-6.8-1.8-13.2-2.8-19.4-2.8-9.6 0-18.6 2.4-26.4 7.6l-127.2 105.6c-3.2 3.2-3 8.6 0.2 11.8 1 1 2.2 1.6 3.4 2 1.2 0 2.6 0.2 3.8 0.2 0 0 0 0 0.2 0 95.8 6.8 184 75.6 180.6 181 0 1 0 2-0.2 3 0.2 1.6 1 3.4 2.2 4.6 1.6 1.6 3.8 2.4 5.8 2.4s4.2-0.8 5.8-2.4c0 0 0 0 0.2 0 0.2-0.2 0.2-0.2 0.4-0.4l108.6-124.4c8.4-12.8 9.4-28.4 4.8-45.8l308.4-350c23.4-30 14.8-64-11.2-89.8zM921.4 190l-319.2 362.4 4.6 16.6c2.2 8 2.2 14.2 0.2 18.4l-70.8 81c-9.2-36.4-28.8-69.4-57.4-96-26.6-24.6-59.6-42.8-95.8-53l85-70.4c1.6-0.8 3.8-1.6 7.6-1.6 3.2 0 7 0.6 11 1.6l16.6 4.6 362.8-319c5.8-4.4 11.4-6.6 17-6.6 9.2 0 19.8 5.4 29.6 15.4 8.4 8.4 13.8 17.6 15 25.8 0.8 4.4 1 11.6-6.2 20.8z","M322.2 528.4v0 0z"],"grid":0,"tags":["ios-brush-outline"]},{"paths":["M299 566.6c-103.8 0-167.8 91.4-167.8 190.2 0 45.4-20.2 78.4-67.2 96.2 28.6 55.6 124 75 191.4 75 16.8 0 31.8-1.2 43.6-3.4 71.2-12.8 160.2-49.8 181.4-154 24.6-121.2-77.6-204-181.4-204z","M935.2 120.8c-15.4-15.4-33.6-24.8-52.2-24.8-12.6 0-25.4 4.4-37.6 14l-350.2 308.2c-6.8-1.8-13.2-2.8-19.4-2.8-9.6 0-18.6 2.4-26.4 7.6l-127.2 105.6c-3.2 3.2-3 8.6 0.2 11.8 1 1 2.2 1.6 3.4 2 1.2 0 2.6 0.2 3.8 0.2 0 0 0 0 0.2 0 95.8 6.8 184 75.6 180.6 181 0 1 0 2-0.2 3 0.2 1.6 1 3.4 2.2 4.6 1.6 1.6 3.8 2.4 5.8 2.4s4.2-0.8 5.8-2.4c0 0 0 0 0.2 0 0.2-0.2 0.2-0.2 0.4-0.4l108.6-124.4c8.4-12.8 9.4-28.4 4.8-45.8l308.4-350c23.4-30 14.8-64-11.2-89.8z","M322.2 528.4v0 0z"],"grid":0,"tags":["ios-brush"]},{"paths":["M912 512c-9.2 0-18 2.6-25.2 7.2-10.8-4.8-28.8-10.6-54.8-12.2-0.6-55.4-11-108-29.2-155.4 17-12.6 31.6-28.8 42.6-47.6 0.8 0 1.8 0 2.6 0 26.4 0 48-21.4 48-48s-21.4-48-48-48c-26.4 0-48 21.4-48 48 0 14 6 26.6 15.6 35.4-6 9.6-14.6 20.2-26 29.8-55-115.4-158.8-193.2-277.6-193.2s-222.6 77.8-277.8 193c-11.4-9.6-19.8-20.2-25.8-29.8 9.6-8.8 15.6-21.4 15.6-35.4 0-26.6-21.4-48-48-48s-48 21.4-48 48c0 26.6 21.4 48 48 48 0.8 0 1.8 0 2.6 0 11.2 18.8 25.6 35 42.6 47.6-18.2 47.4-28.6 100-29.2 155.6-26.2 1.6-44 7.4-54.8 12.2-7.4-4.6-16-7.2-25.2-7.2-26.6 0-48 21.4-48 48s21.4 48 48 48 48-21.4 48-48c0-5-0.8-9.8-2.2-14.4 8-2.6 19.6-5.4 35-6.6 4.6 78 28.4 149.6 66 207.8-12 9-29.2 26-39.8 53.4-24.2 2.6-43 23-43 47.8 0 26.6 21.4 48 48 48s48-21.4 48-48c0-16.8-8.6-31.4-21.6-40 7.8-18 19-29 26.8-35 55 71.4 132.4 117.4 218.8 122.6 2.4 0.2 4.4 0.2 6.4 0.2 0.6 0 1.4 0 2 0 2.4 0 4.8 0.2 7.4 0.2 0 0 0 0 0 0s0 0 0 0 0 0 0 0c2.6 0 5 0 7.4-0.2 0.6 0 1.4 0 2 0 2 0 4.2-0.2 6.6-0.2v0c86.4-5.2 163.8-51.4 218.8-122.6 7.8 6 19 17 27 35.2-13 8.6-21.6 23.4-21.6 40 0 26.6 21.4 48 48 48 26.4 0 48-21.4 48-48 0-24.8-18.8-45.2-43-47.8-10.8-27.6-27.8-44.4-39.8-53.6 37.6-58.2 61.4-129.8 66-207.6 15.4 1 27 3.8 35 6.6-1.4 4.6-2.2 9.4-2.2 14.4 0 26.6 21.4 48 48 48s48-21.4 48-48-21.4-48.2-48-48.2zM848.2 240c8.8 0 16 7.2 16 16s-7.2 16-16 16c-8.8 0-16-7.2-16-16s7-16 16-16zM176 272c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.8-7.2 16-16 16zM112 576c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.8-7.2 16-16 16zM224 864c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.8-7.2 16-16 16zM800.2 832c8.8 0 16 7.2 16 16s-7.2 16-16 16c-8.8 0-16-7.2-16-16s7.2-16 16-16zM512 160c88.8 0 168.4 49.4 221.4 127-11 18.8-24.4 36.4-40.4 52.2-48.4 48.4-112.6 75-181 75s-132.6-26.6-181-75c-15.8-15.8-29.4-33.4-40.4-52.2 53-77.6 132.6-127 221.4-127zM224 512c0-71.8 17.8-138.8 48-194.4 49 73.4 130.8 123.2 224 128.2v417.8c-151.4-10.4-272-164-272-351.6zM528 863.4v-417.6c93-5.2 175-54.8 224-128.2 30.4 55.8 48 122.6 48 194.6 0 187.4-120.6 341-272 351.2zM912 576c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.8-7.2 16-16 16z"],"grid":0,"tags":["ios-bug-outline"]},{"paths":["M749.2 254.6c-58.4-77.6-143-126.6-237.2-126.6s-178.8 49-237.2 126.6c12.8 31.2 31.6 60 56.2 84.6 48.4 48.4 112.6 75 181 75s132.6-26.6 181-75c24.6-24.6 43.6-53.2 56.2-84.6z","M253.6 285.6c-3.4 5.6-6.8 11.4-10 17.2-5.8-3.6-10.6-7.4-15.4-11.6-2.4-2-6-7.8-9-14.8 10.8-22.6 2.4-50-19.8-62.6-23.2-13-52.4-4.8-65.4 18.4s-4.8 52.4 18.4 65.4c2.6 1.4 5 2.6 7.6 3.4 5.6 12.6 14.6 28.6 27 39 8.4 7 17.6 14.2 30.4 21.4-14.4 40.6-23.2 84.6-25 130.8-22 0.4-37.2 4.2-51 8.2-8.4 2.4-16.4 6.8-23.6 11.8-2-0.2-3.8-0.4-5.8-0.4-26.6 0-48 21.4-48 48s21.4 48 48 48c25.8 0 47-20.4 48-46 10-3 19.8-5.4 34.2-5.6 6.4 66 26.6 127 57.2 178.4-28.4 22-45.8 46-53.2 72.6 0 0-1.6 0.8-3.8 2.8-2 1.6-3.8 3.2-5.6 5.2-17.8 19.8-16.2 50 3.6 67.8s50 16.2 67.8-3.6c16.2-18 16.2-44.8 1.2-62.8 6.2-11.2 12.4-18 27.4-30 54.2 63.4 126.8 104 207.4 108.8v-449.6c-106.6-5.8-197.8-69.6-242.6-160.2z","M912 512.2c-2 0-4 0.2-5.8 0.4-7.2-5-15.4-9.2-23.6-11.8-13.8-4-28.8-7.8-51-8.2-2-46.2-10.8-90.4-25-130.8 12.8-7.2 22-14.4 30.4-21.4 12.4-10.4 21.4-26.6 27-39 2.6-1 5.2-2 7.6-3.4 23.2-13 31.4-42.2 18.4-65.4s-42.2-31.4-65.4-18.4c-22.2 12.4-30.6 39.8-19.8 62.6-3.2 6.8-6.8 12.8-9 14.8-4.8 4-9.6 7.8-15.4 11.6-3.2-5.8-6.6-11.6-10-17.2-44.8 90.6-135.8 154.2-242.4 160v450c80.6-4.8 153.2-45.6 207.4-108.8 14.8 11.8 21.2 18.8 27.4 30-15 18-15 44.8 1.2 62.8 17.8 19.8 48 21.4 67.8 3.6s21.4-48 3.6-67.8c-1.8-2-3.6-3.6-5.6-5.2-2.2-1.8-3.8-2.8-3.8-2.8-7.4-26.6-24.8-50.6-53.2-72.6 30.6-51.4 50.8-112.4 57.2-178.4 14.4 0.2 24 2.6 34.2 5.6 1 25.6 22 46 48 46 26.6 0 48-21.4 48-48s-21.6-48.2-48.2-48.2z"],"grid":0,"tags":["ios-bug"]},{"paths":["M695.8 128v0c8 0 18 2 28 6l-89.4 89.8 3 16.4 18.4 102.4 4 21.8 21.8 4 119 21.6 11.8-11.8 78-78.4c6 14.2 6 26 5.8 30.8-1.4 24-11.4 61-50 99.6-29.8 29.8-78.6 49.8-121.6 49.8-19 0-35.8-3.8-50-11.2v0 0c-7-3.6-18-8.4-31.8-8.4-11.2 0-28 3.4-44.6 19.4-18 17.6-362.6 384.8-377.4 400.4l-0.8 0.8c-11.4 13.2-26.8 15.2-35 15.2-14.8 0-29.4-6-40.2-16.4-10.8-11-17-26.8-16.4-42.4 0.4-9.2 3.2-22.4 15-32.4l1.2-0.8c15.6-14.8 384.6-362.2 399.8-377.2v0 0c15.8-15.8 19.2-32.4 19.4-43.6 0-13.8-4.8-25.2-7-30.8v0 0c-36.4-85.4 20.4-155.2 38.8-174.4v0 0c34.6-36.8 79.4-48.4 98.4-49.4 0-0.8 0.8-0.8 1.8-0.8zM695.8 96c-1.4 0-2.8 0-4 0.2-25 1.4-78.6 15.4-120 59.4-40.2 42.4-82.2 121.2-45 209 4.4 10.6 9.4 24.6-5.4 39.4-15.2 14.8-399.4 376.6-399.4 376.6-36 31-33.4 88.4-0.2 121.8 17 16.8 40 25.6 62.6 25.6 22.2 0 43.8-8.4 59.2-26.2 0 0 358.8-382.2 376.4-399.6 8-7.8 15.4-10.2 22.2-10.2 6.6 0 12.6 2.4 17.2 4.8 19.8 10.2 42 14.8 64.8 14.8 53.6 0 110-24.8 144.4-59.2 48.8-48.8 57.8-96 59.2-120.2 1.4-24-6.8-55.8-33.4-82.2l-105 105.4-102.4-18.6-18.4-102.4 105-105.4c-22.2-22.2-53.6-33-77.8-33v0z","M205 858.6c-11 10.8-28.8 10.8-39.8 0-10.8-11-10.8-28.8 0-39.8 11-10.8 28.8-10.8 39.8 0 10.8 11.2 10.8 29 0 39.8z"],"grid":0,"tags":["ios-build-outline"]},{"paths":["M894.4 250l-105 105.4-102.4-18.6-18.4-102.4 105-105.4c-22.2-22.2-53.6-33-77.8-33-1.4 0-2.8 0-4 0.2-25 1.4-78.6 15.4-120 59.4-40.2 42.4-82.2 121.2-45 209 4.4 10.6 9.4 24.6-5.4 39.4-15.2 14.8-399.4 376.6-399.4 376.6-36 31-33.4 88.4-0.2 121.8 17 16.8 40 25.6 62.6 25.6 22.2 0 43.8-8.4 59.2-26.2 0 0 358.8-382.2 376.4-399.6 8-7.8 15.4-10.2 22.2-10.2 6.6 0 12.6 2.4 17.2 4.8 19.8 10.2 42 14.8 64.8 14.8 53.6 0 110-24.8 144.4-59.2 48.8-48.8 57.8-96 59.2-120.2 1.6-23.8-6.8-55.6-33.4-82.2z"],"grid":0,"tags":["ios-build"]},{"paths":["M800 377.6c0-155.8-132.2-281.6-288-281.6s-288 125.8-288 281.6c0 62.2 26.4 118.2 60.4 166.2h-0.6c21.8 30 42.8 55.4 63 90 44 75.6 37.2 148.6 37.4 163v3h256v-3c0-17.8-7.2-87.4 36.8-163 20.2-34.6 41.2-60 63-90h-0.2c33.8-47.8 60.2-104 60.2-166.2zM702 540.6c-1.2 1.6-2.2 3-3.4 4.6-16.2 21.8-33 44.4-49.4 72.4-34.6 59.4-40.8 116.4-41.6 150.4h-31.6v-224.2l64-127.8h-33.2l-62.8 127.8v224.2h-64v-224.2l-62.8-127.8h-33.2l64 127.8v224.2h-31.8c-1-34-7.8-91.4-41.8-150-9-15.4-18.2-30-27.4-42h0.4l-37.2-51.2c-31.6-43.2-54.2-94.2-54.2-147.2 0-66.8 32-129.8 79.2-177s110-73 176.8-73 129.6 25.6 176.8 72.8c47.2 47.2 79.2 110 79.2 176.8 0 53-22.6 103.8-54.2 147.2l-11.8 16.2z","M448 896h128v32h-128v-32z","M416 832h192v32h-192v-32z"],"grid":0,"tags":["ios-bulb-outline"]},{"paths":["M800 377.8c0-155.8-132.2-281.8-288-281.8s-288 126.2-288 281.8c0 62 26.4 118.2 60.4 166.2h-0.6c21.8 30 42.8 55.4 63 90 44 75.6 37.2 148.6 37.4 163v3h64v-256.2l-64.2-127.8h33.2l62.8 127.8v256.2h64v-256.2l62.8-127.8h33.2l-64 127.8v256.2h64v-3c0-17.8-7.2-87.4 36.8-163 20.2-34.6 41.2-60 63-90h-0.2c34-48 60.4-104.2 60.4-166.2z","M448 896h128v32h-128v-32z","M416 832h192v32h-192v-32z"],"grid":0,"tags":["ios-bulb"]},{"paths":["M832 832c-17 37.4-48 32-127.8 32 0 21-2.2 32 6.6 32s100.8 0 110.2 0 8.4-7.6 11-64z","M192 832c3 56.8 1.6 64 11 64s101.4 0 110.2 0c8.8 0 6.6-11 6.6-32-79.8 0-100.8 6-127.8-32z","M752 704c0 26.51-21.49 48-48 48s-48-21.49-48-48c0-26.51 21.49-48 48-48s48 21.49 48 48z","M368 704c0 26.51-21.49 48-48 48s-48-21.49-48-48c0-26.51 21.49-48 48-48s48 21.49 48 48z","M768 128h-512c-35.2 0-64 28.8-64 64v0 560c0 44 36 80 80 80h480c44 0 80-36 80-80v-560c0-35.2-28.8-64-64-64zM800 752c0 26.4-21.6 48-48 48h-480c-26.4 0-48-21.6-48-48v-144h576v144zM224 544v-255.6c0-17.6 14.8-32.4 32.4-32.4h239.6v320h-239.6c-17.6 0-32.4-14.4-32.4-32zM800 544c0 17.6-14.4 32-32 32h-240v-320h240c17.6 0 32 14.8 32 32.4v255.6zM768 224h-512c-17.6 0-32-14.4-32-32s14.4-32 32-32h512c17.6 0 32 14.4 32 32s-14.4 32-32 32z"],"grid":0,"tags":["ios-bus-outline"]},{"paths":["M704.2 864c0 21-2.2 32 6.6 32s100.8 0 110.2 0 8.2-7.6 11-64c-17 37.4-48 32-127.8 32z","M192 832c3 56.8 1.6 64 11 64s101.4 0 110.2 0c8.8 0 6.6-11 6.6-32-79.8 0-100.8 6-127.8-32z","M768 128h-512c-35.2 0-64 28.8-64 64v0 560c0 44 36 80 80 80h480c44 0 80-36 80-80v-560c0-35.2-28.8-64-64-64zM320 752c-26.6 0-48-21.4-48-48s21.4-48 48-48 48 21.4 48 48-21.4 48-48 48zM496 576h-239.6c-17.6 0-32.4-14.4-32.4-32v-255.6c0-17.6 14.8-32.4 32.4-32.4h239.6v320zM704 752c-26.6 0-48-21.4-48-48s21.4-48 48-48 48 21.4 48 48-21.4 48-48 48zM800 544c0 17.6-14.4 32-32 32h-240v-320h240c17.6 0 32 14.8 32 32.4v255.6zM768 224h-512c-17.6 0-32-14.4-32-32s14.4-32 32-32h512c17.6 0 32 14.4 32 32s-14.4 32-32 32z"],"grid":0,"tags":["ios-bus"]},{"paths":["M64 800h896v32h-896v-32z","M400 768c30 0 131.4 0 160 0 17.6 0 116-24 189.4-160.8 6.2 0.6 12.4 0.8 18.6 0.8 106 0 192-78.8 192-176 0-77.2-54.2-142.8-129.8-166.6 1.2-23.4 1.8-47.8 1.8-73.4h-704c0 512 242 576 272 576zM928 432c0 79.4-71.8 144-160 144-1 0-2.2 0-3.2 0 30.4-67.2 54.4-157.2 63.4-277.4 58.4 21.4 99.8 73.2 99.8 133.4zM160.4 224h639.2c-2.2 98.4-14.6 185.8-36.8 260.2-19.4 64.8-46.4 119.8-80.2 163.4-49 63.4-101.6 88.4-121.4 88.4s-136.6 0-160.2 0-74.4-25.2-123.4-88.4c-33.8-43.6-60.8-98.6-80.2-163.4-22.4-74.4-34.8-161.8-37-260.2z"],"grid":0,"tags":["ios-cafe-outline"]},{"paths":["M64 800h896v32h-896v-32z","M400 768c30 0 131.4 0 160 0 17.6 0 116-24 189.4-160.8 6.2 0.6 12.4 0.8 18.6 0.8 106 0 192-78.8 192-176 0-77.2-54.2-142.8-129.8-166.6 1.2-23.4 1.8-47.8 1.8-73.4h-704c0 512 242 576 272 576zM928 432c0 79.4-71.8 144-160 144-1 0-2.2 0-3.2 0 30.4-67.2 54.4-157.2 63.4-277.4 58.4 21.4 99.8 73.2 99.8 133.4z"],"grid":0,"tags":["ios-cafe"]},{"paths":["M704 192v-64h-32v64h-320v-64h-32v64h-192v704h768v-704h-192zM864 864h-704v-480h704v480zM864 352h-704v-128h160v64h32v-64h320v64h32v-64h160v128z"],"grid":0,"tags":["ios-calendar-outline"]},{"paths":["M831.8 671c-29.2-30-112.2-86.2-166.6-86.2-12.6 0-23.6 2.8-32.6 8.6-26.6 17-47.8 30.2-58 30.2-5.6 0-11.6-5-24.8-16.4l-2.2-2c-36.6-31.8-44.4-40-58.6-54.8l-3.6-3.8c-2.6-2.6-4.8-5-7-7.2-12.4-12.8-21.4-22-53.2-58l-1.4-1.6c-15.2-17.2-25.2-28.4-25.8-36.6-0.6-8 6.4-21 24.2-45.2 21.6-29.2 22.4-65.2 2.6-107-15.8-33-41.6-64.6-64.4-92.4l-2-2.4c-19.6-24-42.4-36-67.8-36-28.2 0-51.6 15.2-64 23.2-1 0.6-2 1.4-3 2-27.8 17.6-48 41.8-55.6 66.4-11.4 37-19 85 35.6 184.8 47.2 86.4 90 144.4 158 214.2 64 65.6 92.4 86.8 156 132.8 70.8 51.2 138.8 80.6 186.4 80.6 44.2 0 79 0 128.6-59.8 52-62.8 30.4-101.2-0.8-133.4zM808.8 782.8c-40 48.4-63 48.4-104.6 48.4-40.6 0-103.6-28-168.4-74.6-62-44.8-89.6-65.4-151.8-129.2-65.8-67.4-107.2-123.6-152.8-207-48.2-88.2-42.8-126.8-33-158.6 5.2-17 20.8-35.2 42-48.4 1-0.6 2-1.4 3.2-2 10.6-6.8 28.2-18.2 47.4-18.2 16 0 30.2 8 43.8 24.6l2 2.4c51 62.4 90.8 117.6 60.8 158.4-21.2 28.6-32.4 48-30.6 68 1.6 19.4 14.6 34 34.2 56l1.4 1.6c32.2 36.4 41.4 46 54.2 59 2.2 2.2 4.4 4.6 7 7.2l3.6 3.8c14.8 15.4 23 23.8 60.6 56.8l2.2 2c16 14 27.8 24.2 45 24.2 17.8 0 37.4-11.2 74.6-35 3.8-2.4 9.2-3.8 16-3.8 43.4 0 118.2 49.6 144.4 76.6 24 24.4 36 42.8-1.2 87.8z"],"grid":0,"tags":["ios-call-outline"]},{"paths":["M831.8 671c-29.2-30-112.2-86.2-166.6-86.2-12.6 0-23.6 2.8-32.6 8.6-26.6 17-47.8 30.2-58 30.2-5.6 0-11.6-5-24.8-16.4l-2.2-2c-36.6-31.8-44.4-40-58.6-54.8l-3.6-3.8c-2.6-2.6-4.8-5-7-7.2-12.4-12.8-21.4-22-53.2-58l-1.4-1.6c-15.2-17.2-25.2-28.4-25.8-36.6-0.6-8 6.4-21 24.2-45.2 21.6-29.2 22.4-65.2 2.6-107-15.8-33-41.6-64.6-64.4-92.4l-2-2.4c-19.6-24-42.4-36-67.8-36-28.2 0-51.6 15.2-64 23.2-1 0.6-2 1.4-3 2-27.8 17.6-48 41.8-55.6 66.4-11.4 37-19 85 35.6 184.8 47.2 86.4 90 144.4 158 214.2 64 65.6 92.4 86.8 156 132.8 70.8 51.2 138.8 80.6 186.4 80.6 44.2 0 79 0 128.6-59.8 52-62.8 30.4-101.2-0.8-133.4z"],"grid":0,"tags":["ios-call"]},{"paths":["M869.4 406.8l31-4.8c0 0 0 0 0 0 14.2 0 44.8-6 51-12.4s8.4-11.6 8.4-17.2-3.4-15.8-9.6-22.6c-6-6.8-32-10.6-47.4-12.6-4.4-0.6-7.8-0.8-10.4-0.8-6.4 0-8.2 1.4-11 3.2-4.6 3-6 23.4-6.4 34l-16.2 3.6c-9.6-25-22.8-71.2-43-108-23-41.6-47-54.8-57-58-9.8-3-18.8-5.2-86-12.2-67.4-7-126-7-160.8-7s-93.4 0-161.2 7.2c-67.2 6.8-76.2 9-86 12.2-10 3.2-34 16.4-57 58-20.2 36.8-33.4 83-43 108l-16.2-3.6c-0.4-10.6-1.8-31.2-6.4-34-2.8-1.8-4.8-3.4-11-3.4-2.6 0-5.8 0.2-10.2 0.8-15.2 2-41.2 5.6-47.4 12.4-6 6.8-9.4 16.6-9.4 22.2s2.2 11.8 8.4 18.2c6.2 6.4 37 12.4 51 12.4 0 0 0 0 0 0l31 4.8c0 0-53.6 28.4-82.4 60.8 0 0-8.2 49-8.2 115.8 0 96 11.6 176.6 11.6 176.6 53 9.2 92.4 12.4 131.8 13.4 10.8 0.2 21.2 0.4 31.8 0.4 8.6 0 17.4 0 26.6-0.2 48.8-0.6 31.6-14.8 53.4-14.8 0.2 0 0.6 0 0.8 0 22.6 0.4 110 9 192 9s169.4-8.6 192-9c0.2 0 0.6 0 0.8 0 21.6 0 4.4 14.2 53.4 14.6 9 0 17.6 0.2 26 0.2 10.8 0 21.4-0.2 32.6-0.4 39.4-1 79-4.4 131.8-13.6 0 0 11.6-80.6 11.6-176.8 0-67-8.2-115.8-8.2-115.8-29-32.4-82.6-60.6-82.6-60.6zM220.8 308.8c8.6-20.2 28-54.2 44.2-65.6 0 0 94-19.2 247-19.2s247 19.2 247 19.2c16.2 11.2 35.6 45.2 44.2 65.6s22.8 67.6 20.6 73c-1.6 4 0.4 6.6-10.8 6.6-3.6 0-8.8-0.2-16-0.8-28.6-2.2-199-4.6-285-4.6s-256.2 2.4-285 4.6c-7.2 0.6-12.2 0.8-16 0.8-11.4 0-9.2-2.6-10.8-6.6-2.2-5.6 12-52.8 20.6-73zM919.6 732.2c-36.6 5.6-68.6 8.4-103.8 9.2-10.2 0.2-20.2 0.4-31.8 0.4-7.4 0-15.6 0-25.6-0.2-11-0.2-16.2-1-18.2-1.6-7.2-6.6-17-13.2-35.4-13.2-0.4 0-0.8 0-1.4 0-7.8 0.2-21 1-39.4 2-38.4 2.4-96.6 6.8-152 7-55.4 0-113.6-4.6-152.2-7-18.4-1.2-31.6-2-39.4-2-0.4 0-0.8 0-1.4 0-18.4 0-28.2 6.6-35.4 13.2-2 0.4-7.2 1.4-18.2 1.6-10.6 0.2-18.8 0.2-26.2 0.2-11.2 0-21.2-0.2-31-0.4-35.2-1-67.4-3.8-103.8-9.2-3.4-30.2-8.4-86.4-8.4-148.8 0-46.6 4.2-84.6 6.4-101.4 21.4-20.8 55.2-41.2 67.4-47.8l27.6-15c0 0 88.6-4 314.6-4s314.4 4 314.4 4l27.8 15c12.2 6.6 46 26.8 67.4 47.6 2.2 16.8 6.4 54.6 6.4 101.6 0 62.2-5 118.6-8.4 148.8z","M277.6 556.6c-19.8 0-59.6-2-69-2.4-9.4-0.2-17.6 7.6-22.4 7.6s-51-7.2-56-29.8c-5-22.4 0-46 0-45.6 31-1.4 61-0.4 117 15.6 56.2 15.8 87.2 46.6 87.2 46.6s-37 8-56.8 8z","M684.4 678.6c-25.4 3.4-117 4.4-172.4 4.4s-147-1-172.4-4.4c-26.2-3.4-59.6-34.6-36.8-60.4 15.2-17 41.6-27.2 97.8-34.6 59.6-7.6 97.2-8.6 111.2-8.6s51.6 1 111.2 8.6c56.2 7.4 86.4 19.2 97.8 34.6 20.8 27.6-10.2 56.8-36.4 60.4z","M893.8 532.2c-5 22.4-51.2 29.8-56 29.8s-13-7.8-22.4-7.6c-9.4 0.4-49.2 2.4-69 2.4s-56.8-8-56.8-8 31-30.8 87.2-46.6c56-16 86-17 117-15.6-0-0.4 5 23-0 45.6z","M802 824.6c0 4.2 2.6 7.4 6.4 7.4 0 0 106 0 113 0 9.8 0 11.8-7 12.4-11 2.8-16.8 3.8-42.6 3.8-42.6-51.4 9.4-97.6 11-135.6 12v34.2z","M90.4 821c0.6 4 2.6 11 12.4 11 7 0 113.4 0 113.4 0 3.8 0 6-3.2 6-7.4v-34.2c-38-1-84.4-2.6-135.8-12-0.2 0.2 1.2 25.8 4 42.6z"],"grid":0,"tags":["ios-car-outline"]},{"paths":["M951.8 468c-28.8-32.6-82.4-61.6-82.4-61.6l31-6.2c0 0 0 0 0 0 14.2 0 44.8-4.6 51-10.8 6.2-6.4 8.4-10.8 8.4-16.4s-3.4-15.4-9.6-22.2c-6-6.8-32-10.4-47.4-12.4-15.2-2-17.4 0-21.4 2.4-4.6 3-6 23.4-6.4 34l-16.2 3.6c-9.6-25-22.8-71.2-43-108-23-41.6-47-54.8-57-58-9.8-3-18.8-5.2-86-12.2-67.4-7.2-126-8.2-160.8-8.2s-93.4 1-161.2 8.2c-67.2 6.8-76.2 9-86 12.2-10 3.2-34 16.4-57 58-20.2 36.8-33.4 83-43 108l-16.2-3.6c-0.4-10.6-1.8-31.2-6.4-34-4-2.6-6-4.4-21.4-2.4-15.2 2-41.2 5.6-47.4 12.4-6 6.8-9.4 16.6-9.4 22.2s2.2 10.2 8.4 16.6c6.2 6.4 37 10.8 51 10.8 0 0 0 0 0 0l31 6.2c0 0-53.6 29.2-82.4 61.6 0 0-8.2 49.4-8.2 116.2 0 96 11.6 176.8 11.6 176.8 53 9.2 92.4 12.6 131.8 13.6 19.8 0.4 37.8 0.4 58.4 0.2 49.6-0.6 31.2-15 54.2-14.6 22.6 0.4 110 8 192 8s169.4-7.6 192-8c23-0.4 4.6 14.2 54.2 14.6 20.6 0.2 38.8 0.2 58.4-0.2 39.4-1 79-4.4 131.8-13.6 0 0 11.6-80.6 11.6-176.8 0.2-67.2-8-116.4-8-116.4zM220.8 309.8c8.6-20.2 28-54.2 44.2-65.6 0 0 94-20.2 247-20.2s247 20.2 247 20.2c16.2 11.2 35.6 45.2 44.2 65.6 8.6 20.2 22.8 67.6 20.6 73s2.2 8.2-26.8 5.8c-28.8-2.2-199-4.6-285-4.6s-256.2 2.4-285 4.6c-29 2.4-24.8-0.4-26.8-5.8-2.2-5.6 12-52.8 20.6-73zM247.6 541.6c-19.8 0-59.6-2-69-2.4-9.4-0.2-17.6 7.6-22.4 7.6s-51-7.2-56-29.8c-5-22.4 0-46 0-45.6 31-1.4 61-0.4 117 15.6 56.2 15.8 87.2 46.6 87.2 46.6s-37 8-56.8 8zM684.4 679.6c-25.4 3.4-117 4.4-172.4 4.4s-147-1-172.4-4.4c-26.2-3.4-59.6-34.6-36.8-60.4 15.2-17 41.6-27.2 97.8-34.6 59.6-7.6 97.2-8.6 111.2-8.6s51.6 1 111.2 8.6c56.2 7.4 86.4 19.2 97.8 34.6 20.8 27.6-10.2 56.8-36.4 60.4zM923.8 517.2c-5 22.4-51.2 29.8-56 29.8s-13-7.8-22.4-7.6c-9.4 0.4-49.2 2.4-69 2.4s-56.8-8-56.8-8 31-30.8 87.2-46.6c56-16 86-17 117-15.6-0-0.4 5 23-0 45.6z","M802 824.6c0 4.2 2.4 7.4 6.2 7.4 0 0 106 0 113 0 9.8 0 11.8-7 12.4-11 2.8-16.8 4-42.6 4-42.6-51.4 9.4-97.6 11-135.6 12v34.2z","M90.2 821c0.6 4 2.6 11 12.4 11 7 0 113.4 0 113.4 0 3.8 0 6.2-3.2 6.2-7.4v-34.2c-38-1-84.4-2.6-135.8-12-0.2 0.2 1 25.8 3.8 42.6z"],"grid":0,"tags":["ios-car"]},{"paths":["M864 224h-704c-35.2 0-64 28.8-64 64v448c0 35.2 28.8 64 64 64h704c35.2 0 64-28.8 64-64v-448c0-35.2-28.8-64-64-64zM160 256h704c17.6 0 32 14.4 32 32v64h-768v-64c0-17.6 14.4-32 32-32zM896 384v96h-768v-96h768zM864 768h-704c-17.6 0-32-14.4-32-32v-224h768v224c0 17.6-14.4 32-32 32z","M192 640h64v32h-64v-32z","M320 640h384v32h-384v-32z"],"grid":0,"tags":["ios-card-outline"]},{"paths":["M864 224h-704c-35.2 0-64 28.8-64 64v448c0 35.2 28.8 64 64 64h704c35.2 0 64-28.8 64-64v-448c0-35.2-28.8-64-64-64zM160 256h704c17.6 0 32 14.4 32 32v64h-768v-64c0-17.6 14.4-32 32-32zM864 768h-704c-17.6 0-32-14.4-32-32v-224h768v224c0 17.6-14.4 32-32 32z","M192 640h64v32h-64v-32z","M320 640h384v32h-384v-32z"],"grid":0,"tags":["ios-card"]},{"paths":["M80 736h864v32h-864v-32z","M96 800h832v32h-832v-32z","M64 192v512h896v-512h-896zM928 672h-832v-448h832v448z","M768 256h128v32h-128v-32z","M768 608h128v32h-128v-32z","M128 256h128v32h-128v-32z","M128 608h128v32h-128v-32z","M512 592c-79.4 0-144-64.6-144-144s64.6-144 144-144 144 64.6 144 144-64.6 144-144 144zM512 336c-61.8 0-112 50.2-112 112s50.2 112 112 112 112-50.2 112-112-50.2-112-112-112z"],"grid":0,"tags":["ios-cash-outline"]},{"paths":["M80 736h864v32h-864v-32z","M96 800h832v32h-832v-32z","M512 336c-61.8 0-112 50.2-112 112s50.2 112 112 112 112-50.2 112-112-50.2-112-112-112z","M64 192v512h896v-512h-896zM256 640h-128v-32h128v32zM256 288h-128v-32h128v32zM512 592c-79.4 0-144-64.6-144-144s64.6-144 144-144 144 64.6 144 144-64.6 144-144 144zM896 640h-128v-32h128v32zM896 288h-128v-32h128v32z"],"grid":0,"tags":["ios-cash"]},{"paths":["M862 641.2c0-8.8 2.4-17.2 6.6-24.4 1.2-2.2 2.8-4.2 4.2-6.2 34.8-52 55.2-114.2 55.2-180.6 0.6-184.4-155-334-347.4-334-167.8 0-307.8 114.2-340.6 265.8-4.8 22.2-7.4 44.8-7.4 68.4 0 184.6 149.6 338.2 342 338.2 30.6 0 71.8-9.2 94.4-15.4s45-14.4 50.8-16.6 12.2-3.4 18.6-3.4c7.2 0 14 1.4 20.2 4l113.4 40.2c0 0 4.8 2 7.8 2 8.8 0 16-7 16-16 0-2-1-5.4-1-5.4l-32.8-116.6zM770.2 707.2c-10-4-20.6-6.4-31.6-6.4-8.2 0-20.2 1.6-24.4 3.2s-22.6 7.6-22.6 7.6c-8.4 2.8-19.8 7.6-30.4 10.2-28 7.2-60.2 14.4-86.4 14.4-83.8 0-162.2-32.2-220.6-90.6-28.2-28.2-50.2-61-65.6-97.4-15.8-37.6-23.8-77.4-23.8-118.2 0-20.4 2.2-41.2 6.6-61.6 14.4-66.8 53-127.6 108.4-171.4 27.6-21.8 58.8-39 92.2-50.8 34.8-12.2 71.4-18.4 108.8-18.4 44 0 86.6 8.4 126.6 25.2 38.6 16.2 72.8 39.2 102 68.4 56 56.6 86.6 130.6 86.6 208.6v0 0c0 57.8-17.2 114-49.4 162.4-0.2 0.2-0.4 0.6-0.6 0.8-1.4 1.8-3.2 4.4-5 7.6-7 12.2-10.8 24.8-10.8 40.2s16.4 65 26 96.4l-86-30.2z","M610.6 791.4c-12.6 12.2-24.2 20.8-24.2 20.8-49.8 40.4-112.8 62.8-179 62.8-37.6 0-74.2-7.2-109-21.4-0.8-0.4-1.6-0.6-2-0.8v0c-1.2-0.6-2.4-1-3.6-1.2-14-4.6-29.4-4-42.8 1.4l-85 33.6 18.6-97c0.2-1 0.2-2 0.2-3 0-10.2-2.6-20-7.8-28.6l-0.8-1.4c-1-1.6-2-3.6-3.4-5.4-28.8-43.4-44-93.8-44-145.8 0-60 21.2-125.6 75.6-185.8 1.2-8.6 2.6-17.2 4.6-25.6 2-9 4.4-18 7-26.8l-16 14.2c-65.4 57-103 138.6-103 223.6 0 58.6 17.2 115.2 49.6 164 0.2 0.2 0.4 0.4 0.6 0.8 0.4 0.4 1.2 1.8 1.6 2.8 0.4 0.6 0.6 1.2 1 1.6 2 3.4 3 6.8 3.2 10.8l-23.8 124c-1.2 5.8 1 11.6 5.4 15.4 3 2.4 6.6 3.6 10.2 3.6 2 0 4-0.4 5.8-1.2l112.2-44.2c3.6-1.4 7.4-2.2 11.4-2.2 3.6 0 7.2 0.6 10.6 1.8 0.4 0.2 1 0.4 1.4 0.4v0c0.2 0.2 0.4 0.2 0.6 0.2 38.6 16 79.6 24 121.4 24 93.2 0 180.8-40.2 240.2-110.2 0 0 6.4-8.8 13.8-19.2-7.6 2.4-16 5-24.4 7.4-7.2 2.2-16.2 4.4-26.2 6.6z"],"grid":0,"tags":["ios-chatbubbles-outline"]},{"paths":["M862 641.2c0-8.8 2.4-17.2 6.6-24.4 1.2-2.2 2.8-4.2 4.2-6.2 34.8-52 55.2-114.2 55.2-180.6 0.6-184.4-155-334-347.4-334-167.8 0-307.8 114.2-340.6 265.8-4.8 22.2-7.4 44.8-7.4 68.4 0 184.6 149.6 338.2 342 338.2 30.6 0 71.8-9.2 94.4-15.4s45-14.4 50.8-16.6 12.2-3.4 18.6-3.4c7.2 0 14 1.4 20.2 4l113.4 40.2c0 0 4.8 2 7.8 2 8.8 0 16-7 16-16 0-2-1-5.4-1-5.4l-32.8-116.6z","M622.4 806.8c-0.6 1-0.2 1.4 1.4 0.8-0.2-0.6-0.6-0.8-1.4-0.8z","M637 785c-7.2 2-16.4 4.2-26.4 6.4-21 4.4-47.8 9-68 9-192.4 0-342-153.6-342-338.2 0-13.2 1.4-30 3-42.8 1.2-8.6 2.6-17.2 4.6-25.6 2-9 4.4-18 7-26.8l-16 14.2c-65.6 57.2-103.2 138.8-103.2 223.8 0 58.6 17 115 49.6 164 4.6 7 7.2 12.4 6.4 16s-23.8 124-23.8 124c-1.2 5.8 1 11.6 5.4 15.4 3 2.4 6.6 3.6 10.2 3.6 2 0 4-0.4 5.8-1.2l112.2-44.2c3.6-1.4 7.4-2.2 11.4-2.2 0 0 4.8-0.4 12.6 2.6 37.8 14.8 79.6 24 121.4 24 93.2 0 180.8-40.2 240.2-110.2 0 0 6.4-8.8 13.8-19.2-7.4 2.6-15.8 5.2-24.2 7.4z"],"grid":0,"tags":["ios-chatbubbles"]},{"paths":["M432 714c0.8 0 0.8-0.2 0-0.4-0.8 0.2-1 0.4 0 0.4z","M680.2 354.6l-249.6 251.4-94.4-94.4-35.8 35.6 130.2 130 284.6-286.4z","M864 160v704h-704v-704h704zM896 128h-768v768h768v-768z"],"grid":0,"tags":["ios-checkbox-outline"]},{"paths":["M128 128v768h768v-768h-768zM432 714c-1 0-0.8-0.2 0-0.4 0.8 0.2 0.8 0.4 0 0.4zM430.6 677.2l-130-130 35.6-35.6 94.4 94.4 249.6-251.4 35 36.2-284.6 286.4z","M432 714c0.8 0 0.8-0.2 0-0.4-0.8 0.2-1 0.4 0 0.4z"],"grid":0,"tags":["ios-checkbox"]},{"paths":["M680.2 354.6l-249.6 251.4-94.4-94.4-35.6 35.6 112 112c5 5 11.8 9 17.8 9s12.6-4 17.6-8.8l267.4-268.8-35.2-36z","M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z"],"grid":0,"tags":["ios-checkmark-circle-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM447.8 659.4c-4.8 4.8-11.6 8.8-17.6 8.8s-12.8-4.2-17.8-9l-112-112 35.6-35.6 94.4 94.4 249.6-251.4 35 36.2-267.2 268.6z"],"grid":0,"tags":["ios-checkmark-circle"]},{"paths":["M447.8 659.4c-4.8 4.8-11.6 8.8-17.6 8.8s-12.8-4.2-17.8-9l-112-112 35.6-35.6 94.4 94.4 249.6-251.4 35 36.2-267.2 268.6z"],"grid":0,"tags":["ios-checkmark"]},{"paths":["M544 191.4c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M800 128h-184.2c8.2 9.2 14.6 20 18.8 32h149.4c8.8 0 16 7.2 16 16v704c0 8.8-7.2 16-16 16h-544c-8.8 0-16-7.2-16-16v-704c0-8.8 7.2-16 16-16h149.4c4.2-12 10.6-22.8 18.8-32h-184.2c-17.6 0-32 14.4-32 32v736c0 17.6 14.4 32 32 32h576c17.6 0 32-14.4 32-32v-736c0-17.6-14.4-32-32-32z","M352 222v34h-96v608h512v-608h-96v-34c0-17.6-12.8-30-30.4-30h-33.6c0-11.2-2-22-5.4-32-4.2-12-10.6-22.8-18.8-32-17.6-19.8-43.2-32-71.8-32s-54.2 12.2-71.8 32c-8.2 9.2-14.6 20-18.8 32-3.4 10-5.4 20.8-5.4 32h-29c-17.6 0-35 12.4-35 30zM672 320v-32h64v544h-448v-544h64v32h320zM448 224v-33c0-35.8 28.2-64 64-64s64 28.2 64 64v33h64v64h-256v-64h64z"],"grid":0,"tags":["ios-clipboard-outline"]},{"paths":["M288 832h448v-544h-32v64h-384v-64h-32z","M641.6 192h-33.6c0-11.2-2-22-5.4-32-4.2-12-10.6-22.8-18.8-32-17.6-19.8-43.2-32-71.8-32s-54.2 12.2-71.8 32c-8.2 9.2-14.6 20-18.8 32-3.4 10-5.4 20.8-5.4 32h-29c-17.6 0-35 12.4-35 30v98h320v-98c-0-17.6-12.8-30-30.4-30zM512 223.4c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32c0 17.6-14.4 32-32 32z","M704 222c0 0.6 0 1.4 0 2v-2z","M800 128h-184.2c8.2 9.2 14.6 20 18.8 32l0.2 0.2c1.6-0.2 3.4-0.2 5.2-0.2 34.6 0 62.8 27.6 64 62v0 34h64v608h-512v-608h64v-22c0-35.4 23.4-68 64-68 0.8 0 1.8 0 2.6 0 1 0 1.8 0 2.8 0 3.4-18 10.6-28.8 18.8-38h-184.2c-17.6 0-32 14.4-32 32v736c0 17.6 14.4 32 32 32h576c17.6 0 32-14.4 32-32v-736c0-17.6-14.4-32-32-32z"],"grid":0,"tags":["ios-clipboard"]},{"paths":["M528 176c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M528 848c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M864 512c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M192 512c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M237 344c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M819 680c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M696 221c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M360 803c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M237 680c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M819 344c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M360 221c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M696 803c0 8.837-7.163 16-16 16s-16-7.163-16-16c0-8.837 7.163-16 16-16s16 7.163 16 16z","M539.8 496c-5.8-10-16.2-15.6-26.8-16l-60-110.8c-4.6-7.6-14.4-10-22-5.4s-10 14.4-5.4 22l59.2 109.8c-5.8 9.6-6.4 22.2-0.4 32.6 3 5 7 9 11.8 11.6v228.2c0 8.8 7.2 16 16 16s16-7.2 16-16v-228.2c15.2-9 20.4-28.4 11.6-43.8z","M806.2 217.8c-162.4-162.4-425.8-162.4-588.4 0s-162.4 425.8 0 588.4c162.4 162.4 425.8 162.4 588.4 0 162.4-162.4 162.4-426 0-588.4zM781.6 781.6c-148.6 148.6-390.6 148.6-539.2 0s-148.6-390.6 0-539.2 390.6-148.6 539.2 0c148.8 148.6 148.8 390.6 0 539.2z"],"grid":0,"tags":["ios-clock-outline"]},{"paths":["M806.2 217.8c-162.4-162.4-425.8-162.4-588.4 0s-162.4 425.8 0 588.4c162.4 162.4 425.8 162.4 588.4 0 162.4-162.4 162.4-426 0-588.4zM512 160c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16c0-8.8 7.2-16 16-16zM207.2 336c4.4-7.6 14.2-10.2 21.8-5.8s10.2 14.2 5.8 21.8c-4.4 7.6-14.2 10.2-21.8 5.8s-10.2-14.2-5.8-21.8zM176 528c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.8-7.2 16-16 16zM229 693.8c-7.6 4.4-17.4 1.8-21.8-5.8s-1.8-17.4 5.8-21.8 17.4-1.8 21.8 5.8c4.4 7.6 1.8 17.4-5.8 21.8zM357.8 811c-4.4 7.6-14.2 10.2-21.8 5.8s-10.2-14.2-5.8-21.8c4.4-7.6 14.2-10.2 21.8-5.8s10.2 14.2 5.8 21.8zM352 234.8c-7.6 4.4-17.4 1.8-21.8-5.8s-1.8-17.4 5.8-21.8c7.6-4.4 17.4-1.8 21.8 5.8s1.8 17.4-5.8 21.8zM512 864c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.8-7.2 16-16 16zM528 539.8v228.2c0 8.8-7.2 16-16 16s-16-7.2-16-16v-228.4c-4.8-2.8-8.8-6.6-11.8-11.6-6-10.4-5.4-23 0.4-32.6l-59.2-109.8c-4.6-7.6-2-17.4 5.4-22 7.6-4.6 17.4-2 22 5.4l60 110.8c10.8 0.2 21.2 6 26.8 16 9 15.6 3.8 35-11.6 44zM688 816.8c-7.6 4.4-17.4 1.8-21.8-5.8s-1.8-17.4 5.8-21.8c7.6-4.4 17.4-1.8 21.8 5.8s1.8 17.4-5.8 21.8zM693.8 229c-4.4 7.6-14.2 10.2-21.8 5.8s-10.2-14.2-5.8-21.8c4.4-7.6 14.2-10.2 21.8-5.8s10.2 14.2 5.8 21.8zM816.8 688c-4.4 7.6-14.2 10.2-21.8 5.8s-10.2-14.2-5.8-21.8c4.4-7.6 14.2-10.2 21.8-5.8s10.2 14.2 5.8 21.8zM811 357.8c-7.6 4.4-17.4 1.8-21.8-5.8s-1.8-17.4 5.8-21.8 17.4-1.8 21.8 5.8c4.4 7.6 1.8 17.4-5.8 21.8zM848 528c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16c0 8.8-7.2 16-16 16z"],"grid":0,"tags":["ios-clock"]},{"paths":["M806.2 217.8c-162.4-162.4-425.8-162.4-588.4 0s-162.4 425.8 0 588.4c162.4 162.4 425.8 162.4 588.4 0s162.4-426 0-588.4zM781.6 781.6c-148.6 148.6-390.6 148.6-539.2 0s-148.6-390.6 0-539.2 390.6-148.6 539.2 0c148.8 148.6 148.8 390.6 0 539.2z","M680.4 320l-168.8 168.4-168-167.6-23.6 23.6 168 167.6-168 167.6 23.6 23.6 168-167.6 168.8 168.4 23.6-23.6-168.8-168.4 168.8-168.4z"],"grid":0,"tags":["ios-close-circle-outline"]},{"paths":["M806.2 217.8c-162.4-162.4-425.8-162.4-588.4 0s-162.4 425.8 0 588.4c162.4 162.4 425.8 162.4 588.4 0s162.4-426 0-588.4zM704 680.4l-23.6 23.6-168.8-168.4-168 167.6-23.6-23.6 168-167.6-168-167.6 23.6-23.6 168 167.6 168.8-168.4 23.6 23.6-168.8 168.4 168.8 168.4z"],"grid":0,"tags":["ios-close-circle"]},{"paths":["M680.4 320l-168.8 168.6-168-167.8-23.6 23.6 168 167.6-168 167.8 23.6 23.4 168-167.6 168.8 168.4 23.6-23.4-168.8-168.6 168.8-168.4z"],"grid":0,"tags":["ios-close"]},{"paths":["M960 832h-896v-640h896v640zM96 800h832v-576h-832v576zM540 780c-9.4 0-18.8 0-28 0s-18.4 0-27.8 0c-71.4 0-162-0.8-227.6-6.8-72.2-6.6-113-48.2-118-120l-1-15.4c-3.4-50-5.6-83-5.6-126.2 0-48 0.2-78.2 6.8-142 7.2-70.8 48-112 117.8-119.2 64-6.4 174.6-6.4 255.6-6.4 80.8 0 191.6 0 255.6 6.4 69.8 7 110.4 48.2 117.8 119.2 6.6 63.8 6.8 94 6.8 142 0 43-2.2 76-5.6 126l-1 15.6c-4.8 71.8-45.6 113.4-118 120-66 6-156.4 6.8-227.8 6.8zM512 748v0c9.2 0 18.6 0 28 0 70.8 0 160.2-0.8 224.6-6.6 56-5.2 85.2-34.8 89-90.4l1-15.6c3.4-49.2 5.6-81.8 5.6-123.8 0-47-0.2-76.6-6.6-138.8-5.8-56.2-34-85-89.2-90.6-62.4-6.2-172.2-6.2-252.4-6.2s-190 0-252.2 6.4c-55 5.6-83.4 34.4-89.2 90.6-6.4 62.2-6.6 91.8-6.6 138.8 0 42 2.2 74.6 5.6 124l1 15.4c3.8 55.6 32.8 85.2 89 90.4 64.4 6 153.8 6.6 224.6 6.6 9.4-0.2 18.8-0.2 27.8-0.2z","M675.4 356.8c34.4 0 58.8 8.6 74.8 26.4 11.2 12.4 18.8 31.6 22.6 54.8h-28.2c-10.8-35.4-39.8-59.6-75.8-59.6-22.4 0-41.6 8-55.8 23.2-12.8 13.6-20.8 32.4-24.2 56v0 0c-0.2 1-3 22.6-3 56.4 0 29.8 2 46.8 2.6 51.4 4.4 47.2 37 80.2 79.6 80.2 22.2 0 42.4-8.4 57-23.6 9.6-10 16-22.2 19.6-36.2h28.8c-3.4 23.4-10.8 41.6-22.4 54.6-15.4 17.6-43.4 26.4-83.4 26.4-20.2 0-37.8-2.2-52.2-6.8-11.4-3.6-20.8-10-28.4-19.4-8.6-10.6-15.4-26-20.2-45.4-5.2-21.6-8-49.2-8-82.4 0-33.4 3.2-61.2 9.6-82.2 5.8-19.4 13.8-34.6 23.6-45.4 9.4-10.4 20.2-17.2 33.2-21.4 14.8-4.6 31.8-7 50.2-7zM675.4 324.8c-21.8 0-41.8 2.8-60 8.6s-34 15.8-47.2 30.2c-13.2 14.4-23.4 33.6-30.8 57.8-7.2 24.2-11 54.6-11 91.4 0 36 3 66 8.8 90.2 6 24.2 14.6 43.4 26.2 57.8s26.2 24.4 43.6 30c17.6 5.6 38.2 8.4 61.8 8.4 50 0 86-12.8 107.6-37.4s32.4-60.6 32.4-107.8h-92.2c0 0 0 5 0 6.8v1.4c0 32.6-20.2 51.8-47.2 51.8s-45.2-21.6-47.8-51.8c0 0-2.4-15.8-2.4-47.8s2.8-52 2.8-52c4.8-34 21.4-51.8 48.4-51.8 26.8 0 48.2 23.2 48.2 58.4 0 0.2 0 1 0 1h90.2c0-43.8-11-83.2-33.2-108-21.6-24.8-54.4-37.2-98.2-37.2v0z","M365.6 356.8c34.4 0 58.8 8.6 74.8 26.4 11.2 12.4 18.8 31.6 22.6 54.8h-28.2c-10.8-35.4-39.8-59.6-75.8-59.6-22.4 0-41.6 8-55.8 23.2-12.8 13.6-20.8 32.4-24.2 56v0 0c-0.2 1-3 22.6-3 56.4 0 29.8 2 46.8 2.6 51.4 4.4 47.2 37 80.2 79.6 80.2 22.2 0 42.4-8.4 57-23.6 9.6-10 16-22.2 19.6-36.2h28.8c-3.4 23.4-10.8 41.6-22.4 54.6-15.4 17.6-43.4 26.4-83.4 26.4-20.2 0-37.8-2.2-52.2-6.8-11.4-3.6-20.8-10-28.4-19.4-8.6-10.6-15.4-26-20.2-45.4-5.2-21.6-8-49.2-8-82.4 0-33.4 3.2-61.2 9.6-82.2 5.8-19.4 13.8-34.6 23.6-45.4 9.4-10.4 20.2-17.2 33.2-21.4 14.8-4.6 31.8-7 50.2-7zM365.6 324.8c-21.8 0-41.8 2.8-60 8.6s-34 15.8-47.2 30.2c-13.2 14.4-23.4 33.6-30.8 57.8-7.2 24.2-11 54.6-11 91.4 0 36 3 66 8.8 90.2 6 24.2 14.6 43.4 26.2 57.8s26.2 24.4 43.6 30c17.6 5.6 38.2 8.4 61.8 8.4 50 0 86-12.8 107.6-37.4s32.4-60.6 32.4-107.8h-92.2c0 0 0 5 0 6.8v1.4c0 32.6-20.2 51.8-47.2 51.8s-45.2-21.6-47.8-51.8c0 0-2.4-15.8-2.4-47.8s2.8-52 2.8-52c4.8-34 21.4-51.8 48.4-51.8 26.8 0 48.2 23.2 48.2 58.4 0 0.2 0 1 0 1h90.2c0-43.8-11-83.2-33.2-108-21.6-24.8-54.4-37.2-98.2-37.2v0z"],"grid":0,"tags":["ios-closed-captioning-outline"]},{"paths":["M64 192v640h896v-640h-896zM860 511.6c0 41.8-2.2 74.4-5.6 123.8l-1 15.6c-3.8 55.6-32.8 85.2-89 90.4-64.4 6-153.8 6.6-224.6 6.6-9.4 0-18.6 0-27.8 0v0c-9.2 0-18.4 0-27.8 0-70.8 0-160.4-0.8-224.6-6.6-56-5.2-85.2-34.8-89-90.4l-1-15.4c-3.4-49.4-5.6-82-5.6-124 0-47 0.2-76.6 6.6-138.8 5.8-56.2 34-85 89.2-90.6 62.4-6.4 172.2-6.4 252.2-6.4 80.2 0 190 0 252.4 6.4 55 5.6 83.4 34.4 89.2 90.6 6.2 62.2 6.6 91.8 6.4 138.8z","M675.4 324.8c-21.8 0-41.8 2.8-60 8.6s-34 15.8-47.2 30.2c-13.2 14.4-23.4 33.6-30.8 57.8-7.2 24.2-11 54.6-11 91.4 0 36 3 66 8.8 90.2 6 24.2 14.6 43.4 26.2 57.8s26.2 24.4 43.6 30c17.6 5.6 38.2 8.4 61.8 8.4 50 0 86-12.8 107.6-37.4s32.4-60.6 32.4-107.8h-92.2c0 0 0 5 0 6.8v1.4c0 32.6-20.2 51.8-47.2 51.8s-45.2-21.6-47.8-51.8c0 0-2.4-15.8-2.4-47.8s2.8-52 2.8-52c4.8-34 21.4-51.8 48.4-51.8 26.8 0 48.2 23.2 48.2 58.4 0 0.2 0 1 0 1h90.2c0-43.8-11-83.2-33.2-108-21.6-24.8-54.4-37.2-98.2-37.2v0z","M365.6 324.8c-21.8 0-41.8 2.8-60 8.6s-34 15.8-47.2 30.2c-13.2 14.4-23.4 33.6-30.8 57.8-7.2 24.2-11 54.6-11 91.4 0 36 3 66 8.8 90.2 6 24.2 14.6 43.4 26.2 57.8s26.2 24.4 43.6 30c17.6 5.6 38.2 8.4 61.8 8.4 50 0 86-12.8 107.6-37.4s32.4-60.6 32.4-107.8h-92.2c0 0 0 5 0 6.8v1.4c0 32.6-20.2 51.8-47.2 51.8s-45.2-21.6-47.8-51.8c0 0-2.4-15.8-2.4-47.8s2.8-52 2.8-52c4.8-34 21.4-51.8 48.4-51.8 26.8 0 48.2 23.2 48.2 58.4 0 0.2 0 1 0 1h90.2c0-43.8-11-83.2-33.2-108-21.6-24.8-54.4-37.2-98.2-37.2v0z"],"grid":0,"tags":["ios-closed-captioning"]},{"paths":["M548.6 352c28 0 54.4 10.6 74.8 29.8 20.4 19.4 33.2 46.2 36.4 75.4l2.6 24.2 24.2 4c28.8 4.6 49.6 30 49.6 60.4 0 16.8-6.4 32.4-17.8 44.4-11.2 11.6-25.8 18-41.2 18h-330.4c-15.4 0-30-6.4-41.2-18-11.4-12-17.8-27.8-17.8-44.4 0-28.6 17.8-53.6 44.2-62.2l21.8-7 0.4-22.8c0.4-22.4 18-40.8 39.4-40.8 5.6 0 16.8 2.2 24.2 5.6s17.6 8 17.6 8l15.2-21.8c20.8-32.6 58.4-52.8 98-52.8zM548.6 320c-51.2 0-98.8 26.8-125 67.6-9-4.2-19.2-6.8-29.8-6.8-39 0-70.8 32.2-71.4 72.2-40 13-66.4 50.4-66.4 92.4 0 51.4 40.6 94.4 90.8 94.4h330.2c50.2 0 90.8-42.8 90.8-94.4 0-46.4-33.2-84.8-76.6-91.8-7.6-75-67.2-133.6-142.6-133.6v0z","M512 128c51.8 0 102.2 10.2 149.4 30.2 45.8 19.4 86.8 47 122 82.4 35.2 35.2 63 76.4 82.4 122 20 47.4 30.2 97.6 30.2 149.4s-10.2 102.2-30.2 149.4c-19.4 45.8-47 86.8-82.4 122-35.2 35.2-76.4 63-122 82.4-47.4 20-97.6 30.2-149.4 30.2s-102.2-10.2-149.4-30.2c-45.8-19.4-86.8-47-122-82.4-35.2-35.2-63-76.4-82.4-122-20-47.2-30.2-97.6-30.2-149.4s10.2-102.2 30.2-149.4c19.4-45.8 47-86.8 82.4-122 35.2-35.2 76.4-63 122-82.4 47.2-20 97.6-30.2 149.4-30.2zM512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416v0z"],"grid":0,"tags":["ios-cloud-circle-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM677.2 640h-330.4c-50.2 0-90.8-42.8-90.8-94.4 0-42 26.4-79.6 66.4-92.4 0.6-40 32.4-72.2 71.4-72.2 10.6 0 20.8 2.4 29.8 6.8 26.2-41 73.8-67.6 125-67.6 75.4 0 135 58.6 142.8 133.8 43.4 7 76.6 45.4 76.6 91.8 0 51.4-40.6 94.2-90.8 94.2z"],"grid":0,"tags":["ios-cloud-circle"]},{"paths":["M618.4 432l-154 153.8-58.4-57.8-22 22 69.2 68.6c3 3 7.2 5.6 11 5.6s7.8-2.4 10.8-5.4l165-164.4-21.6-22.4z","M826 452.2c-13.8-128.4-118-228.2-250-228.2-89.6 0-173 45.6-218.8 115.4-15.8-7.4-33.6-11.4-52.2-11.4-68.4 0-124 55-125 123.2-69.8 22-116 85.2-116 156.8 0 87.8 71.2 160 159 160h578c87.8 0 159-72.2 159-160 0-79.2-58-143.8-134-155.8zM801 736h-578c-70 0-127-57.6-127-128 0-28.6 8.8-54 25.6-77.2 17-23.2 40.4-40.4 68-49l22-7 0.4-23.2c0.4-24.6 10.2-47.6 27.6-64.8 17.6-17.2 40.6-26.8 65.2-26.8 13.6 0 26.6 2.8 38.8 8.4l25 11.6 15.2-23c41.6-63.6 115.8-101.4 191.6-101.4 55.6 0 105 20.6 146.2 57.8 41 37 66.6 87.4 72.6 142l2.6 24.4 24.2 3.8c29.4 4.6 56.6 19.8 76.2 42.8 19.8 23.2 30.8 51.2 30.8 81.6 0 70.4-57 128-127 128z"],"grid":0,"tags":["ios-cloud-done-outline"]},{"paths":["M826 452.2c-13.8-128.4-118-228.2-250-228.2-89.6 0-173 45.6-218.8 115.4-15.8-7.4-33.6-11.4-52.2-11.4-68.4 0-124 55-125 123.2-69.8 22-116 85.2-116 156.8 0 87.8 71.2 160 159 160h578c87.8 0 159-72.2 159-160 0-79.2-58-143.8-134-155.8zM475 618.6c-3 3-7.2 5.4-10.8 5.4s-8-2.6-11-5.6l-69.2-68.4 22-21.8 58.4 57.8 154-153.8 21.6 22.2-165 164.2z"],"grid":0,"tags":["ios-cloud-done"]},{"paths":["M354.236 723.86l-23.232 23.206 180.996 180.934 181.162-180.884-23.232-23.208-141.39 141.268v-449.176h-32.86v449.176z","M826.024 324.226c-13.732-128.436-117.942-228.226-250.024-228.226-89.676 0-173.070 45.624-218.792 115.43-15.892-7.318-33.566-11.43-52.208-11.43-68.416 0-123.962 54.974-124.954 123.154-69.862 22.072-116.046 85.162-116.046 156.846 0 87.812 71.188 160 159 160h193v-32h-193c-70.028 0-127-57.696-127-128 0-28.544 8.886-54.094 25.7-77.2 16.942-23.28 40.452-40.308 67.988-49.008l22.020-7.020 0.336-23.124c0.358-24.548 10.186-47.59 27.674-64.85 17.502-17.274 40.688-26.792 65.284-26.792 13.52 0 26.58 2.856 38.82 8.492l25.046 11.532 15.11-23.066c41.614-63.536 115.714-101.464 191.524-101.464 55.626 0 104.96 20.53 146.18 57.808 40.932 37.020 66.688 87.474 72.526 142.070l2.606 24.376 24.214 3.83c29.454 4.658 56.506 19.844 76.174 42.762 19.86 23.142 30.798 51.174 30.798 81.654 0 70.304-56.972 128-127 128h-193v32h193c87.812 0 159-72.188 159-160 0-79.296-58.054-143.768-133.976-155.774z"],"grid":0,"tags":["ios-cloud-download-outline"]},{"paths":["M496 865.176l-141.604-141.316-23.312 23.206 180.956 180.934 181.142-180.884-23.512-23.208-141.67 141.268v-225.176h-32z","M826.024 324.226c-13.732-128.436-117.942-228.226-250.024-228.226-89.676 0-173.070 45.624-218.792 115.43-15.892-7.318-33.566-11.43-52.208-11.43-68.416 0-123.962 54.974-124.954 123.154-69.862 22.072-116.046 85.162-116.046 156.846 0 87.812 71.188 160 159 160h273v-224h32v224h273c87.812 0 159-72.188 159-160 0-79.296-58.054-143.768-133.976-155.774z"],"grid":0,"tags":["ios-cloud-download"]},{"paths":["M826.024 452.226c-13.732-128.436-117.942-228.226-250.024-228.226-89.676 0-173.070 45.624-218.792 115.43-15.892-7.318-33.566-11.43-52.208-11.43-68.416 0-123.962 54.974-124.954 123.154-69.862 22.072-116.046 85.162-116.046 156.846 0 87.812 71.188 160 159 160h578c87.812 0 159-72.188 159-160 0-79.296-58.054-143.768-133.976-155.774zM801 736h-578c-70.028 0-127-57.696-127-128 0-28.544 8.886-54.094 25.7-77.2 16.942-23.28 40.452-40.308 67.988-49.008l22.020-7.020 0.336-23.124c0.358-24.548 10.186-47.59 27.674-64.85 17.502-17.274 40.688-26.792 65.284-26.792 13.52 0 26.58 2.856 38.82 8.492l25.046 11.532 15.11-23.066c41.614-63.536 115.714-101.464 191.524-101.464 55.626 0 104.96 20.53 146.18 57.808 40.932 37.020 66.688 87.474 72.526 142.070l2.606 24.376 24.214 3.83c29.454 4.658 56.506 19.844 76.174 42.762 19.86 23.142 30.798 51.174 30.798 81.654 0 70.304-56.972 128-127 128z"],"grid":0,"tags":["ios-cloud-outline"]},{"paths":["M669.93 524.14l23.232-23.206-180.998-180.934-181.16 180.886 23.232 23.208 141.388-141.27 0.002 513.176h32.86l-0.002-513.176z","M826.024 356.226c-13.732-128.436-117.942-228.226-250.024-228.226-89.676 0-173.070 45.624-218.792 115.43-15.892-7.318-33.566-11.43-52.208-11.43-68.416 0-123.962 54.974-124.954 123.154-69.862 22.072-116.046 85.162-116.046 156.846 0 87.812 71.188 160 159 160h193v-32h-193c-70.028 0-127-57.696-127-128 0-28.544 8.886-54.094 25.7-77.2 16.942-23.28 40.452-40.308 67.988-49.008l22.020-7.020 0.336-23.124c0.358-24.548 10.186-47.59 27.674-64.85 17.502-17.274 40.688-26.792 65.284-26.792 13.52 0 26.58 2.856 38.82 8.492l25.046 11.532 15.11-23.066c41.614-63.536 115.714-101.464 191.524-101.464 55.626 0 104.96 20.53 146.18 57.808 40.932 37.020 66.688 87.474 72.526 142.070l2.606 24.376 24.214 3.83c29.454 4.658 56.506 19.844 76.174 42.762 19.86 23.142 30.798 51.174 30.798 81.654 0 70.304-56.972 128-127 128h-193v32h193c87.812 0 159-72.188 159-160 0-79.296-58.054-143.768-133.976-155.774z"],"grid":0,"tags":["ios-cloud-upload-outline"]},{"paths":["M496 672h32v224h-32v-224z","M826.024 356.226c-13.732-128.436-117.942-228.226-250.024-228.226-89.676 0-173.070 45.624-218.792 115.43-15.892-7.318-33.566-11.43-52.208-11.43-68.416 0-123.962 54.974-124.954 123.154-69.862 22.072-116.046 85.162-116.046 156.846 0 87.812 71.188 160 159 160h273v-289.176l-141.576 141.27-23.326-23.208 181.112-180.886 180.974 180.934-23.484 23.206-141.7-141.316v289.176h273c87.812 0 159-72.188 159-160 0-79.296-58.054-143.768-133.976-155.774z"],"grid":0,"tags":["ios-cloud-upload"]},{"paths":["M826.024 452.226c-13.732-128.436-117.942-228.226-250.024-228.226-89.676 0-173.070 45.624-218.792 115.43-15.892-7.318-33.566-11.43-52.208-11.43-68.416 0-123.962 54.974-124.954 123.154-69.862 22.072-116.046 85.162-116.046 156.846 0 87.812 71.188 160 159 160h578c87.812 0 159-72.188 159-160 0-79.296-58.054-143.768-133.976-155.774z"],"grid":0,"tags":["ios-cloud"]},{"paths":["M553.2 590.8c-1 0-2.2-0.2-3.2-0.2-5.2 0-10.4 0-15.6 0.6-18.4-81.6-91.2-143.2-178.4-143.2-101 0-183 82-183 183.2 0 6.2 0.4 12.2 1 18.2-61.6 5.4-110 60.4-110 123.6 0 66.8 53.2 125 120 125h369.2c83.4 0 150.8-69.6 150.8-153s-67.6-154.2-150.8-154.2zM637 830c-22.6 22.8-52.4 36-83.8 36h-369.2c-23.2 0-45.2-10.2-61.8-27.8-16.6-17.4-26.2-41.6-26.2-65.6 0-22.8 8.4-44.8 23.8-62 15.2-17 35.4-27.4 57-29.4l32.2-2.8-3.2-32.2c-0.4-5-0.8-10.2-0.8-15.2 0-83.4 67.8-151.2 151-151.2 34.8 0 67.6 11.6 94.8 33.8 26.4 21.6 45 51.6 52.4 84.6l6.4 28.4 28.8-3.8c3.2-0.4 7.4-0.8 11.6-0.8h3.2c31.4 0 61.2 13 83.8 36.2s35.2 54 35.2 86c-0.2 32.2-12.6 63-35.2 85.8z","M900 612c-5 0.2-10 0.4-15 0.4-82.8 0-160.8-31.6-219.4-88.8s-90.8-133.2-90.8-214.2c0-46 10.4-90.6 30.4-131 8.8-17.8 17.8-34.6 30-50.6h-0.6c-21.6 2.4-40.4 6.6-60.6 12.8-123.6 38-215.6 145.4-228.2 275.4 3.6-0.2 7-0.2 10.6-0.2 7.2 0 14.4 0.4 21.6 1.2 5.4-51.6 24.8-100.2 56.8-142.2 34.4-45.2 82.6-80.2 136.6-99.4-18.8 42.2-28.4 87.2-28.4 134 0 89.6 35.8 173.8 100.6 237 64.6 63 150.4 97.8 241.8 97.8 1.6 0 3.2 0 4.8 0-41.6 43.4-95.6 72.8-154.2 85.2 0.4 4.8 0.6 9.6 0.6 14.4 0 6.2-0.4 12.2-0.8 18.2 75-14 140.8-52.8 188.4-107.4 13.8-15.8 26-30.6 36.6-49-20.2 5-40.4 5.4-60.8 6.4z"],"grid":0,"tags":["ios-cloudy-night-outline"]},{"paths":["M553.2 590.4c-5 0-9.8 0-14.6 0.4-1.4 0.2-2.8 0.2-4.2 0.4-8.6-38.2-29-71.8-57.2-97-2-1.8-4.2-3.6-6.2-5.4-2-1.6-4-3.2-6-4.6-2.8-2.2-5.8-4.2-8.8-6-5.6-3.6-11.2-7-17.2-10-2.2-1.2-4.6-2.2-6.8-3.4-23.2-10.8-49-16.8-76.2-16.8 0 0 0 0 0 0-2 0-3.8 0-5.8 0-0.2 0-0.4-0.2-0.6-0.2-1.8 0-3.8 0-5.6 0 0 0 0 0 0 0s0 0.2 0 0.2c-96 6.2-171 85.8-171 183 0 6.2 0.4 12.2 1 18.2-61.6 5.4-110 59.4-110 122.6 0 4.2 0.2 8.4 0.6 12.4 6 61.4 56.8 111.6 119.4 111.6h369.2c75.6 0 138.2-56.4 149.2-129.2 0 0 0 0 0 0v0 0c0.4-2.2 0.6-4.2 0.8-6.4 0-0.8 0.2-1.6 0.2-2.4 0.2-1.6 0.2-3.2 0.4-4.8 0-0.8 0-1.4 0.2-2.2 0.2-2.2 0.2-4.6 0.2-7 0-10.4-1-20.6-3-30.6-14.4-69.2-75.2-122.8-148-122.8z","M900 612c-5 0.2-10 0.4-15 0.4-82.8 0-160.8-31.6-219.4-88.8s-90.8-133.2-90.8-214.2c0-46 10.4-90.6 30.4-131 8.8-17.8 17.8-34.6 30-50.6h-0.6c-21.6 2.4-40.4 6.6-60.6 12.8-123.6 38-215.6 145.4-228.2 275.4 3.6-0.2 7-0.2 10.6-0.2 49 0 97 17 135.2 48.2 30.4 24.8 53.6 57.6 67 94.2 47 1.2 91 20.8 124.6 55.2 34.4 35.2 53.2 81.6 53.2 130.4 0 6.2-0.4 12.2-0.8 18.2 75-14 140.8-52.8 188.4-107.4 13.8-15.8 26-30.6 36.6-49-20 5-40.2 5.4-60.6 6.4z"],"grid":0,"tags":["ios-cloudy-night"]},{"paths":["M472 224c57 0 108 18.8 147.2 54.2 35.4 31.8 60.8 76.6 71.6 126l5.8 26.6 27.4-1.8c3.2-0.2 7.4-0.2 10.2-0.2 2.4 0 4.8 0 7 0 2.4 0 5 0 7.4 0 47.2 0 92 19.6 126.2 55 34.2 35.6 53 82 53 130.8 0 48.6-18.8 95.4-52.8 130.2-34 34.6-79.6 54.8-127.2 54.8h-515.8c-36.2 0-69.2-15.8-95.4-42.8-26.2-26.6-40.6-62.6-40.6-100 0-35.8 13.2-71 37-98.8 23.6-27.6 54.8-44.6 87.8-47.4l32.2-3-3.2-32c-0.6-6.8-1.4-14.6-1.4-22.6 0-60.6 23.6-118 66.2-161.6 42.6-43.4 98.6-67.4 157.4-67.4zM472 192c-140 0-255.6 119.4-255.6 261.6 0 8.6 0.6 17.2 1.6 25.6-86.4 7.8-154 88-154 176.8 0 94 75.8 176 169.2 176h515.6c116.6 0 211.2-98.8 211.2-216s-94.6-217.6-211.2-217.6c-4.6 0-9.6-0.4-14.4-0.4-4.2 0-8.4 0-12.2 0.2-23.6-107-110.2-206.2-250.2-206.2v0z"],"grid":0,"tags":["ios-cloudy-outline"]},{"paths":["M472 192c-140 0-255.6 119.4-255.6 261.6 0 8.6 0.6 17.2 1.6 25.6-86.4 7.8-154 88-154 176.8 0 94 75.8 176 169.2 176h515.6c116.6 0 211.2-98.8 211.2-216s-94.6-217.6-211.2-217.6c-4.6 0-9.6-0.4-14.4-0.4-4.2 0-8.4 0-12.2 0.2-23.6-107-110.2-206.2-250.2-206.2v0z"],"grid":0,"tags":["ios-cloudy"]},{"paths":["M640 320.4l27.6-26.4 228.4 218-228.4 218-27.6-26.4 200.8-191.6z","M384 320.4l-27.6-26.4-228.4 218 228.4 218 27.6-26.4-200.8-191.6z","M637.8 511l23.2 23.2-149 137-149-137 23.2-23.2 109.4 97.4v-255.6h32.8v255.6z"],"grid":0,"tags":["ios-code-download"]},{"paths":["M640 320.4l27.6-26.4 228.4 218-228.4 218-27.6-26.4 200.8-191.6z","M384 320.4l-27.6-26.4-228.4 218 228.4 218 27.6-26.4-200.8-191.6z","M544 512c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M416 512c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M672 512c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z"],"grid":0,"tags":["ios-code-working"]},{"paths":["M640 320.4l27.6-26.4 228.4 218-228.4 218-27.6-26.4 200.8-191.6z","M384 320.4l-27.6-26.4-228.4 218 228.4 218 27.6-26.4-200.8-191.6z"],"grid":0,"tags":["ios-code"]},{"paths":["M522.2 160l11.2 44.8 5 19.8 20 3.8 44 8.6 12-15.8 28.4-37.2 13.2 5.4-6.8 45.4-3 19.8 16.6 11.4 21.4 14.6 16.6 11.4 17.4-10 39.2-22.6 10.2 10.2-33.2 55.8 12 17 15 21.2 11.2 16 19.4-2.6 44.2-6.2 5.6 13.4-51.4 39 3.6 19.4 5 26.4 3.8 19.8 61.8 16.4v14.6l-62 16.2-3.6 20.2-5 27-3.6 19.4 15.8 11.8 34.6 26-5.6 13.2-62.6-9-11.2 16.2-15.8 22.8-11.6 16.8 31.4 54.2-10.4 10.4-37-21.4-18-10.6-37.2 27-15.6 11.4 2.8 19.2 6.4 42.8-13.4 5.6-26.4-34.6-12.2-15.8-19.6 4-27.2 5.4-19.8 4-4.8 19.6-11 42.4h-14.4l-11.4-42.8-5-19.2-19.4-4-46.8-9.8-12.2 16.4-26.4 35.6-13.4-5.6 5.8-44.2 2.6-20-16.8-11-22.4-14.6-16.8-11-17.2 10.4-39 23.4-10-10 23.4-40 9.8-16.8-10.4-16.4-14.2-22.6-11-17.6-20.6 3-45.2 6.8-5.6-13.2 53-39.8-4-19.8-5-25-4-19.8-19.4-5-46-11.6v-14.2l65.2-16.4 4.2-19.4 5.2-24.4 4.4-20-16.4-12.4-38-28.6 5.6-13.4 46.4 6.6 20.4 2.8 11-17.4 24-37.6-10.2-17-24.8-41.6 10-10 41.2 24.6 16.6 10 40-24.6 17.8-11-2.8-20.6-6.4-47 13.4-5.6 40.2 54.2 19.8-3.8 44-8.4 5.2-19.6 12-45.6h14.2zM547 128h-64l-18.4 69.4-24.2 4.6-43-58.2-59.2 24.6 9.6 71.4-23.4 14.4-62.4-37.6-45.2 45.2 37.6 63-13.4 21-71-10-24.4 59.2 57.8 43.4-5.4 24.4-70 17.8v64l69.8 17.8 5 25-56.6 42.6 24.6 59 70-10 14.2 22.6-35.8 61.2 45.2 45.2 60.4-36.4 22.4 14.6-9 68.6 59.2 24.4 41.2-55.6 26.8 5.6 17.6 66.8h64l16.6-66.8 27.2-5.4 41.4 54 59.2-24.4-10-67.4 20.4-14.8 58 33.8 45.2-45.2-33.6-57.8 15.8-22.8 67.6 9.6 24.6-59-54.4-41 5-27 66-17.2v-64l-66-17.4-5-26.4 55.4-41.8-24.4-59.4-68.8 9.6-15-21.2 35.4-59.4-45.2-45.2-60.4 34.8-21.4-14.6 10.6-70-59-24.6-43.2 56.6-24.6-4.8-17.4-68.8z","M512 256c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256zM290.8 547c-1.8-11.6-2.8-23.2-2.8-35 0-59.8 23.4-116 65.6-158.4 42.4-42.2 98.6-65.6 158.4-65.6 12 0 23.8 1 35.6 2.8 2.8 0.4 5.8 1 8.6 1.6l-55.6 207.8-208.4 55.8c-0.4-3-1-6-1.4-9zM651.4 687.4c-39.4 31.4-88.2 48.6-139.4 48.6-59.8 0-116-23.4-158.4-65.6-22.2-22.2-39-48-50.2-76.4-0.8-2.2-1.8-4.4-2.4-6.6l206.8-55 149.8 149.8c-2 1.8-4 3.4-6.2 5.2zM685.8 653.2c-1.8 2.2-3.6 4.4-5.6 6.6l-150-150 56-209.2c2.2 0.8 4.4 1.6 6.6 2.4 28.6 11.2 54.8 28.2 77.2 50.4 42.6 42.6 66 98.8 66 158.6 0 52-17.6 101.4-50.2 141.2z"],"grid":0,"tags":["ios-cog-outline"]},{"paths":["M593.2 303.2c-2.2-0.8-4.4-1.6-6.6-2.4l-56 209.2 150 150c2-2.2 3.8-4.4 5.6-6.6 32.2-40 49.8-89.4 49.8-141.4 0-59.8-23.4-116-65.6-158.4-22.4-22.4-48.6-39.4-77.2-50.4z","M556.2 292.4c-2.8-0.6-5.8-1-8.6-1.6-11.6-1.8-23.6-2.8-35.6-2.8-59.8 0-116 23.4-158.4 65.6-42.2 42.4-65.6 98.6-65.6 158.4 0 11.8 1 23.6 2.8 35 0.4 3 1 6 1.6 8.8l208.4-55.8 55.4-207.6z","M301 587.4c0.8 2.2 1.6 4.4 2.4 6.6 11.2 28.2 28 54.2 50.2 76.4 42.4 42.2 98.6 65.6 158.4 65.6 51.2 0 100-17.2 139.4-48.6 2.2-1.6 4.2-3.4 6.2-5.2l-149.8-149.8-206.8 55z","M896 545.6v-64l-66.6-17.4-5.2-26.4 55.2-41.8-24.4-59.2-68.8 9.6-15-21.2 35.4-59.4-45.2-45.2-60.4 34.8-21.4-14.6 10.6-70-59-24.8-43.2 56.6-24.6-5.2-17.4-69.4h-64l-18.4 69.8-24.2 4.8-43-58-59.2 24.6 9.6 71.4-23.4 14.4-62.6-37.4-45.2 45.2 37.6 63-13.4 21-71-10-24.2 59.2 57.8 43.4-4.8 24.4-69.6 17.8v64l69.4 17.8 4.8 25-56.8 42.6 24.6 59.2 70-10 14.2 22.6-35.8 61.2 45.2 45.2 60.4-36.4 22.4 14.6-9 68.6 59.2 24.4 41.2-55.6 26.8 5 17.6 66.2h64l16.6-66.2 27.2-5.2 41.4 54.2 59.2-24.4-10-67.4 20.4-14.8 58 33.8 45.2-45.2-33.6-57.8 15.8-22.8 67.6 9.6 24.6-59-54.6-41 5.4-27 66.6-17.2zM512 768c-141.4 0-256-114.6-256-256s114.6-256 256-256 256 114.6 256 256-114.6 256-256 256z"],"grid":0,"tags":["ios-cog"]},{"paths":["M822.8 600.6l-367.6-364c0 0 0 0 0 0l-112.4-112.6c-18.6-18.6-43.2-28-67.8-28s-49.2 9.4-67.8 28v0c-37.4 37.4-37.4 98.4 0 135.8l98.6 98.6-209.8 208.4 342.6 329.2c0 0 270.2-261.4 292.2-283.4 11.6-11.6 36.4-14.2 57.2-14.2 19 0 34.8 2.2 34.8 2.2zM229.6 237.2c-12-12-18.6-28-18.6-45.2s6.6-33.2 18.6-45.2c12-12 28-18.6 45.2-18.6s33.2 6.6 45.2 18.6l99 99-90.8 90.2-98.6-98.8zM708 590c-17.8 17.8-204.6 198.6-269.6 261.6l-296.6-285.2 299.8-298.2 305.2 302.2c-16.6 3.8-29.4 10.4-38.8 19.6z","M832 672c0 0-96 106.6-96 159.8s43 96.2 96 96.2c0 0 0 0 0 0 53 0 96-43.2 96-96.2 0-53.2-96-159.8-96-159.8zM877.2 877.2c-12 12.2-28.2 18.8-45.2 18.8-35.2 0-64-28.8-64-64.2 0-3.8 2-25.6 41.6-80.6 7.8-10.8 15.4-20.8 22.4-29.4 6.8 8.4 14.4 18.4 22 29 40 55.4 42 77.2 42 81 0 17.2-6.6 33.2-18.8 45.4z"],"grid":0,"tags":["ios-color-fill-outline"]},{"paths":["M822.8 600.6l-367.6-364c0 0 0 0 0 0l-112.4-112.6c-18.6-18.6-43.2-28-67.8-28s-49.2 9.4-67.8 28v0c-37.4 37.4-37.4 98.4 0 135.8l98.6 98.6-209.8 208.4 342.6 329.2c0 0 270.2-261.4 292.2-283.4 11.6-11.6 36.4-14.2 57.2-14.2 19 0 34.8 2.2 34.8 2.2zM229.6 237.2c-12-12-18.6-28-18.6-45.2s6.6-33.2 18.6-45.2c12-12 28-18.6 45.2-18.6s33.2 6.6 45.2 18.6l99 99-90.8 90.2-98.6-98.8z","M832 672c0 0-96 106.6-96 159.8s43 96.2 96 96.2c0 0 0 0 0 0 53 0 96-43.2 96-96.2 0-53.2-96-159.8-96-159.8z"],"grid":0,"tags":["ios-color-fill"]},{"paths":["M570.8 160c91.2 0 174.4 29.2 234.4 82.2 37.8 33.6 58.8 78 58.8 125.2s-20.8 91.6-58.8 125.2l-60.6 53.8c-20.8 18.4-32.2 42.4-32.2 67.8 0 25.2 11.4 49.2 32.2 67.8 18.6 16.4 32.8 22.8 61.2 27.6l1.6 0.2c11.8 2 25.2 4.2 31 9.4 5.8 5.4 9.6 16 9.6 26.2 0 5.4-1.4 15.2-9 22-69.2 61.4-170 96.8-276.4 96.8-1 0-2.2 0-3.2 0-53-0.4-104.4-9.2-152.8-26.2-50.2-17.8-94.6-43.4-132-76.4-37.4-33.2-66.4-71.8-86-114.8-19-41.6-28.6-85.4-28.6-130.2s9.6-88.4 28.4-129.8c19.6-43 48.6-81.6 86-114.8 80.6-71.2 188.6-112 296.4-112zM570.8 128c-111.4 0-227.8 40.6-317.6 120.2-167 147.6-167 389.4 0 537 83 73.4 195 110 305.8 110.8 1.2 0 2.4 0 3.4 0 110.8 0 220-35.8 297.6-104.8 28.6-25.4 23.8-73.2 0-95.6-13.2-12.2-32.6-15.2-49.2-18-23-3.8-31.8-8-45.2-20-28.6-25.4-28.6-62.2 0-87.6l60.6-53.8c92.8-82 92.8-216.4 0-298.4-68.2-60-160-89.8-255.4-89.8v0z","M640 288c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zM640 256c-35.4 0-64 28.6-64 64s28.6 64 64 64 64-28.6 64-64-28.6-64-64-64v0z","M448 266c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zM448 234c-35.4 0-64 28.6-64 64s28.6 64 64 64 64-28.6 64-64-28.6-64-64-64v0z","M304 400c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zM304 368c-35.4 0-64 28.6-64 64s28.6 64 64 64 64-28.6 64-64-28.6-64-64-64v0z","M320 588c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32zM320 556c-35.4 0-64 28.6-64 64s28.6 64 64 64 64-28.6 64-64-28.6-64-64-64v0z","M592 800c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zM592 640c-35.2 0-64 28.8-64 64s28.8 64 64 64 64-28.8 64-64-28.8-64-64-64z"],"grid":0,"tags":["ios-color-palette-outline"]},{"paths":["M860.2 695.8c-13.2-12.2-32.6-15.2-49.2-18-23-3.8-31.8-8-45.2-20-28.6-25.4-28.6-62.2 0-87.6l60.6-53.8c92.8-82 92.8-216.4 0-298.4-68.4-60.2-160.2-90-255.6-90-111.4 0-227.8 40.6-317.6 120.2-167 147.6-167 389.4 0 537 83 73.4 195 110 305.8 110.8 1.2 0 2.4 0 3.4 0 110.8 0 220-35.8 297.6-104.8 28.8-25.4 24-73.2 0.2-95.4zM240 432c0-35.4 28.6-64 64-64s64 28.6 64 64-28.6 64-64 64-64-28.6-64-64zM320 684c-35.4 0-64-28.6-64-64s28.6-64 64-64 64 28.6 64 64-28.6 64-64 64zM448 362c-35.4 0-64-28.6-64-64s28.6-64 64-64 64 28.6 64 64-28.6 64-64 64zM592 800c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zM640 384c-35.4 0-64-28.6-64-64s28.6-64 64-64 64 28.6 64 64-28.6 64-64 64z"],"grid":0,"tags":["ios-color-palette"]},{"paths":["M384 299.4l-68 68 512.2 512.2 67.8-68-512-512.2zM425.2 431.4l22.8-22.8 403 403-22.8 22.8-403-403z","M368 128h32v80h-32v-80z","M368 536h32v80h-32v-80z","M560 352h80v32h-80v-32z","M128 352h80v32h-80v-32z","M200.223 211.181l22.627-22.627 56.568 56.568-22.627 22.627-56.568-56.568z","M256.8 477.050l22.627 22.627-56.568 56.568-22.627-22.627 56.568-56.568z","M545.154 188.548l22.627 22.627-56.568 56.568-22.627-22.627 56.568-56.568z"],"grid":0,"tags":["ios-color-wand-outline"]},{"paths":["M366 124h48v128h-48v-128z","M366 532h48v128h-48v-128z","M548 358h128v48h-128v-48z","M595.8 212.2l-33.2-33.2-90.4 90.6 33.2 33.4z","M190.2 218.2l90.4 90.8 33.2-33.4-90.4-90.6z","M184.2 558.2l33.2 33.4 90.4-90.6-33.2-33.4z","M116 358h128v48h-128v-48z","M384.4 306.8l-68 68.4 86.8 87 68.2-68.2z","M894 817.6l-390.6-391.6-68.2 68.2 390.8 391.8z"],"grid":0,"tags":["ios-color-wand"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4s381.4 171.2 381.4 381.4c0 210.2-171.2 381.4-381.4 381.4z","M448 448l-192 320 320-192 192-320-320 192zM349.2 674.8l122-203.4 81.4 81.4-203.4 122z"],"grid":0,"tags":["ios-compass-outline"]},{"paths":["M552.6 552.6l-81.2-81.2-122.2 203.4z","M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM576 576l-320 192 192-320 320-192-192 320z"],"grid":0,"tags":["ios-compass"]},{"paths":["M274.6 852.8c-11 10.8-28.8 10.8-39.8 0-10.8-11-10.8-28.8 0-39.8 11-10.8 28.8-10.8 39.8 0 10.8 11 10.8 29 0 39.8z","M760.2 128.2v0 0z","M426.2 481.4l51.8-51.8c6.2 6-2-2.2 17.2 16.6 8.4-7.8 16.2-15.2 23.2-22-38.4-37.8-29-28.4-29-28.4-2.8-2.8-7.6-4.6-12.6-4.6-2.8 0-5.8 0.6-8.4 2l-11.4 6c-56.2-55.6-70.8-80.6-68.6-123.6 2.2-44.8 24.6-74.4 61.2-105.4 49.6-42.2 121.4-30.6 121.4-30.6 16 0-8.2-17-20.8-25-18.8-12-46.6-19.2-75.8-19.2-28.6 0-60.8 5-93.6 18.6-93 38-148.2 91-162.4 105-14 14-33.6 36-45.8 53.4s3.8 42-12.2 58-49.6 0-49.6 0c-2.8 0-5.8 1-7.8 3.2l-68.4 67.8c-4.4 4.4-4.4 11.4 0 15.6l127.2 126.4c2.2 2.2 5 3.2 7.8 3.2s5.8-1 7.8-3.2l66.4-69.6c4.4-4.4 4.4-11.4 0-15.6 0 0-10.6-10.4-24.2-24s1.6-38.8 10.6-46.8c9-8.2 23.2-13.6 42.4-13.6 8.6 0 14.8 1.4 22.8 3.6 24.4 6.8 51.6 31.8 101.8 81.6l-7.8 13c-4.6 7.6-1.8 16.6 2.6 20.8 0 0-10-9.8 26.2 26.4 8-7.4 15.6-14.8 23.2-22-18-18.6-9.2-9.8-15.2-15.8zM420 435.8l-8-8c-47.8-47.6-76.6-73.2-107.8-81.8-10.2-2.8-19-4.8-31.4-4.8-23 0-39.4 5.4-57.4 17.4-21 14-37.2 44.2-37.2 63 0 19 13.4 29 24.6 40.4l-38.8 38.4-92-91.2 38.6-38.2 15.2 2.4c25.8 0 45.6-7 58.8-20 17.4-17.4 16-40.2 15-53.6-0.2-3.2-0.6-8-0.4-10.4 11-15.4 29-35.6 41.4-47.8 23-22.8 73.4-66 152-98 23-9.4 47-14.8 71.4-15.8-13.8 4.4-25.4 10.2-34.6 17.6v0 0c-46.2 37.2-70.8 80.6-73 129-2.8 57.8 20.6 91 78 147.8l2.8 2.8-14.2 14.2-3-3.4z","M886.4 809.6l-77.8 77.2c-32-38.2-123.6-143-217.4-240.2-7.2 7.6-14.6 15.4-22 23.4 117.2 121.4 230.2 255.6 230.2 255.6 2.2 2.2 5 3.2 7.8 3.2s5.8-1 7.8-3.2l110.4-109.6c4.4-4.4 4.4-11.4 0-15.6 0 0-138-114.6-260.8-231.6-6.8 7.2-14.2 15-22 23.2 98 93.2 204.8 185.4 243.8 217.6z","M959 250.2l-105 105.4-102.4-18.6-18.4-102.4 105-105.4c-22.4-22.4-53.6-33.2-78-33.2-1.4 0-2.8 0-4 0.2-25 1.4-78.6 15.4-120 59.4-40 42.4-82.2 121.4-45 209 4.4 10.6 9.4 24.6-5.4 39.4-3 2.8-19.8 18.8-45 42.6-7.2 6.8-15 14-23.2 22-16.2 15.2-34.2 32.4-53.6 50.6-7.6 7.2-15.4 14.6-23.2 22-114.2 107.8-254.2 239.4-254.2 239.4-36 31-33.4 88.4-0.2 121.8 17 16.8 40 25.6 62.6 25.6 22.2 0 43.8-8.4 59.2-26.2 0 0 131.2-139.8 238.8-254.2 7.4-8 14.8-15.8 22-23.4 18.6-19.8 36-38.2 51.6-54.6 7.8-8.4 15.2-16.2 22-23.2 23-24.4 38.8-40.8 42-44 8-7.8 15.4-10.2 22.2-10.2 6.6 0 12.6 2.4 17.2 4.8 19.8 10.2 42 14.8 64.8 14.8 53.6 0 110-24.8 144.4-59.2 48.8-48.8 57.8-96 59.2-120.2 1.4-23.8-6.8-55.6-33.4-82.2zM960.4 330.6c-1.4 24-11.4 61-50 99.6-29.8 29.8-78.6 49.8-121.6 49.8-19 0-35.8-3.8-50-11.2v0 0c-7-3.6-18-8.4-31.8-8.4-11.2 0-28 3.4-44.6 19.4-18 17.6-362.6 384.8-377.4 400.4l-0.8 0.8c-11.4 13.2-26.8 15.2-35 15.2-14.8 0-29.4-6-40.2-16.4-10.8-11-17-26.8-16.4-42.4 0.4-9.2 3.2-22.4 15-32.4l1.2-0.8c15.6-14.8 384.6-362.2 399.8-377.2v0 0c15.8-15.8 19.2-32.4 19.4-43.6 0-13.8-4.8-25.2-7-30.8v0 0c-36.4-85.4 20.4-155.2 38.8-174.4v0 0c34.6-36.8 79.4-48.4 98.4-49.4 0.8 0 1.6 0 2.4 0 8 0 18 2 28 6l-89.4 89.8 3 16.4 18.4 102.4 4 21.8 21.8 4 119 21.6 11.8-11.8 78-78.4c5.6 13.4 5.6 25.4 5.2 30z"],"grid":0,"tags":["ios-construct-outline"]},{"paths":["M760.2 128.2v0 0z","M550.2 114.6c-18.8-12-46.6-19.2-75.8-19.2-28.6 0-60.8 5-93.6 18.6-93 38-148.2 91-162.4 105-14 14-33.6 36-45.8 53.4s3.8 42-12.2 58-49.6 0-49.6 0c-2.8 0-5.8 1-7.8 3.2l-68.4 67.8c-4.4 4.4-4.4 11.4 0 15.6l127.2 126.4c2.2 2.2 5 3.2 7.8 3.2s5.8-1 7.8-3.2l66.4-69.6c4.4-4.4 4.4-11.4 0-15.6 0 0-10.6-10.4-24.2-24s1.6-38.8 10.6-46.8c9-8.2 23.2-13.6 42.4-13.6 8.6 0 14.8 1.4 22.8 3.6 24.4 6.8 51.6 31.8 101.8 81.6l-7.8 13c-4.6 7.6-1.8 16.6 2.6 20.8 0 0-10-9.8 26.2 26.4l100.2-94.4c-38.4-37.8-29-28.4-29-28.4-2.8-2.8-7.6-4.6-12.6-4.6-2.8 0-5.8 0.6-8.4 2l-11.4 6c-56.2-55.6-70.8-80.6-68.6-123.6 2.2-44.8 24.6-74.4 61.2-105.4 49.6-42.2 121.4-30.6 121.4-30.6 16-0.6-8.2-17.6-20.8-25.6z","M925.4 800.2c0 0-138-114.6-260.8-231.6l-95.6 101.4c117.2 121.4 230.2 255.6 230.2 255.6 2.2 2.2 5 3.2 7.8 3.2s5.8-1 7.8-3.2l110.4-109.6c4.6-4.4 4.6-11.4 0.2-15.8z","M959 250.2l-105 105.4-102.4-18.6-18.4-102.4 105-105.4c-22.4-22.4-53.6-33.2-78-33.2-1.4 0-2.8 0-4 0.2-25 1.4-78.6 15.4-120 59.4-40 42.4-82.2 121.4-45 209 4.4 10.6 9.4 24.6-5.4 39.4-3 2.8-19.8 18.8-45 42.6-7.2 6.8-15 14-23.2 22-16.2 15.2-34.2 32.4-53.6 50.6-7.6 7.2-15.4 14.6-23.2 22-114.2 107.8-254.2 239.4-254.2 239.4-36 31-33.4 88.4-0.2 121.8 17 16.8 40 25.6 62.6 25.6 22.2 0 43.8-8.4 59.2-26.2 0 0 131.2-139.8 238.8-254.2 7.4-8 14.8-15.8 22-23.4 18.6-19.8 36-38.2 51.6-54.6 7.8-8.4 15.2-16.2 22-23.2 23-24.4 38.8-40.8 42-44 8-7.8 15.4-10.2 22.2-10.2 6.6 0 12.6 2.4 17.2 4.8 19.8 10.2 42 14.8 64.8 14.8 53.6 0 110-24.8 144.4-59.2 48.8-48.8 57.8-96 59.2-120.2 1.4-23.8-6.8-55.6-33.4-82.2zM274.6 852.8c-11 10.8-28.8 10.8-39.8 0-10.8-11-10.8-28.8 0-39.8 11-10.8 28.8-10.8 39.8 0 10.8 11 10.8 29 0 39.8z"],"grid":0,"tags":["ios-construct"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 130.6c210.2 0 381.4 171 381.4 381.4 0 93.2-33.6 178.4-89.2 244.8 0 0-0.2-0.2-0.2-0.2-40-16.4-131.8-48.2-185.8-64.2-4.8-1.4-5.4-1.8-5.4-21.4 0-16.2 6.6-32.6 13.2-46.6 7.2-15 15.4-40.4 18.4-63.2 8.4-9.8 20-29 27.2-65.8 6.4-32.4 3.4-44.2-0.8-55.2-0.4-1.2-1-2.4-1.2-3.4-1.6-7.6 0.6-47 6.2-77.6 3.8-21-1-65.6-29.8-102.6-18.2-23.4-53.2-52-117-56h-35c-62.8 4-97.6 32.6-116 56-29 37-33.8 81.6-30 102.6 5.6 30.6 7.8 70 6.2 77.6-0.4 1.4-0.8 2.4-1.2 3.6-4.2 11-7.4 22.8-0.8 55.2 7.4 36.8 18.8 56 27.2 65.8 3 22.8 11.4 48 18.4 63.2 5.2 11 7.6 26 7.6 47.2 0 19.8-0.8 20-5.2 21.4-56 16.6-144.4 48.4-180.2 63.8-55.8-66.4-89.4-151.8-89.4-245 0-210.2 171.2-381.4 381.4-381.4zM242.8 782c39.8-16 117.2-43.6 166.2-58.2h0.4c16.8-5.2 23.2-17 25.6-26 1.8-6.4 2-13 2-26 0-26.2-3.4-45.4-10.6-60.8-5.8-12.2-13.2-34.4-15.8-53.8l-1.2-9.4-6.2-7.2c-3.8-4.4-13.6-18.4-20.2-51.2-5.2-26-2.8-32-0.8-37.4v-0.4l0.2-0.6c0.4-1.2 1.2-3.2 2-5.6l0.4-2c3.4-16-1.2-63.8-6-90-2.2-12.4 0.6-47.6 23.6-77.2 14.2-18 41.6-40.2 91.8-43.6h33c51.2 3.4 78.8 25.6 92.8 43.8 23.2 29.6 25.8 64.8 23.6 77.2-4.8 26-9.4 74-6 90l0.4 1.2c0.8 3 1.8 5.6 2.4 7.2 2.2 5.6 4.2 11.8-0.8 37.2-6.6 32.8-16.2 46.6-20 51.2l-6.2 7.2-1.2 9.6c-2.6 19.4-10 41.4-15.6 53.6-8 17-16.2 37.6-16.2 60.2 0 11.6 0.2 19.2 2.2 26.4 2.6 8.8 9 20.4 25.8 25.6h0.4c47.4 14 127.8 41.6 172 58.8-69 68.8-164.2 111.4-269 111.4-104.8 0.2-199.8-42.4-269-111.2z"],"grid":0,"tags":["ios-contact-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 130.6c210.2 0 381.4 171 381.4 381.4 0 93-33.4 178.2-88.8 244.4-40-16.4-131.8-48.2-185.8-64.2-4.8-1.4-5.4-1.8-5.4-21.4 0-16.2 6.6-32.6 13.2-46.6 7.2-15 15.4-40.4 18.4-63.2 8.4-9.8 20-29 27.2-65.8 6.4-32.4 3.4-44.2-0.8-55.2-0.4-1.2-1-2.4-1.2-3.4-1.6-7.6 0.6-47 6.2-77.6 3.8-21-1-65.6-29.8-102.6-18.2-23.4-53.2-52-117-56h-35c-62.8 4-97.6 32.6-116 56-29 37-33.8 81.6-30 102.6 5.6 30.6 7.8 70 6.2 77.6-0.4 1.4-0.8 2.4-1.2 3.6-4.2 11-7.4 22.8-0.8 55.2 7.4 36.8 18.8 56 27.2 65.8 3 22.8 11.4 48 18.4 63.2 5.2 11 7.6 26 7.6 47.2 0 19.8-0.8 20-5.2 21.4-56.2 16.6-145.2 48.6-180.8 64-55.8-66.4-89.4-151.8-89.4-245 0-210.2 171.2-381.4 381.4-381.4z"],"grid":0,"tags":["ios-contact"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416zM511.8 893.2c-104.8 0.2-199.8-42.4-269-111.2l-22.8-25c-6.2-7.4-12-14.8-17.6-22.6 9.4-8 20.2-15 31.6-19.2 21-8 44.8-7.6 66.6-13.2 18-4.6 40.4-11.8 54.4-24.8 12.8-12 14.2-30.4 15.4-47 1-14 0.8-27.8 0.8-41.8 0-9.8-11.4-15.4-17-23.2-9-12.2-9.4-30.4-11.2-45-0.8-6.4-1-14.6-6.4-19-6-4.8-10.4-7.4-13.4-15-4-10.4-5.4-21.6-8.6-32.4-2-7 5-13.6 7.8-19.4 5.2-10.6-3.8-27-5.6-38-5.6-32.8-5.4-68.6 18.2-94.6 47.4-52.4 156-35.8 171.6 37.8 4.8 23 1.8 49.8-4.6 72.2-2.8 9.6-6 16.6-0.4 26 8.4 13.6 4.8 22.4 0.8 37.6-3.2 12.6-7.2 18.2-16.8 26-8 6.4-6.8 22.4-8.2 31.6-1.6 11.2-2.6 23-9.4 32.4-2.6 3.6-16.8 14.8-16.8 18.6 0 22-1 44.4 2.8 66.2 5.2 31 31.2 38.4 57.2 49 26.4 10.2 57 6.4 82.6 19 26.4 13 51.8 36.8 59.4 66.2 0 0 4.4 38.2 4.2 80-44.8 18.4-94 28.8-145.6 28.8zM804.2 756.8l-0.2-0.2-23.2 25.2c-26.8 26.6-57.4 49.4-91.2 67.2l-0.6-33.2c0-59-35.6-111-91.6-130.4-27-9.4-56.2-10-83.2-19.4-8.2-2.8-24.4-6.2-27.8-15.6-3.2-9.2-3.2-20-3.8-29.6-0.4-7.6-0.6-15.2-0.6-22.8 0-5 12.8-15.6 15.6-20.2 10.8-18 11.8-42.2 13.8-62.6 17.4 4.8 19.6-27.4 22.6-37.2 2.2-6.8 10-41.8-5.2-47.2 5-8.8 7-19.6 8.4-29.4 4-25.6 5.6-53.6-2.2-78.6-16.2-52-66-81.2-118.6-82.8-53.4-1.8-107 23.8-127 75.6-9.6 25.2-8.8 52.6-5.6 79 1.4 12 3.4 25.4 9.4 36.2-12.8 5.6-9 35.4-6.8 42.6 3.2 10.2 6 46.8 24.2 41.8 1.6 16.2 3.4 32.8 7.8 48.6 3 10.6 9.2 19.6 16.4 27.8 3.6 4 5.4 4.4 5.2 9.6-0.2 15.6 0.2 32.4-3.8 47.6s-37.4 21.6-50.8 24.4c-36 7.4-69.2 10.8-99.2 33.2-0.6 0.4-1 0.8-1.4 1.2-34.4-57.2-54.2-124.2-54.2-195.6 0-210.2 171.2-381.4 381.4-381.4s381.4 171 381.4 381.4c0 59.2-13.6 115.4-37.8 165.4-8.8-25.6-30.4-44.8-57-53.6-16.2-5.2-47.4-6.8-59-20.8-5.8-7-2-33.2-2-33.2 50.4-2.8 62-12.2 62-12.2 7.8-4.6 4.2-5.4 0.2-12.2-21.8-36.6-12-83-13-123.2-0.8-33.4-9.6-70-40-88.8-15.2-9.4-39.4-13.8-62.8-13.8-19 0-37.4 2.8-50.6 8.2-84.8 34-34.8 146.4-63.8 210.8-5 10.8-12.2 14.6 0.4 21 0 0 15 8.8 57.8 12.6 0 0 0.6 25.2 0 27.8-2.2 9.8-23.6 16.6-31.6 18.8-8.2 2.2-30.8 9.2-58.2 22.6 0 0 30.4 3 50 9.8 13.6-9.2 33.8-11.4 48-17.6s20.6-11.6 23.2-26.6-1-66.4-1-66.4c-24.4 1.8-53.8-3.4-53.8-3.4 8.2-26.4 8-55.4 8-83.4 0-24.4-0.2-47.6 5.2-65.4 4.8-16 12.8-25 28-31v0 0c8.8-3.6 23.6-5.8 38.4-5.8 23.2 0 39.2 4.8 46 9 19.6 12.2 24.4 40.6 24.8 62.4 0.2 9-0.2 18.8-0.6 29.2-1 26.6-2.4 55.8 6.6 84-0.2 0-0.2 0-0.4 0 0 0-26.6 3.6-52.6 0.6l-2.8 34.6c-1.4 14.2-3.8 35.8 9.6 52 15.4 18.6 40.4 23.8 60.4 27.8 5.2 1 10.4 2.2 13.4 3 15.2 5 41.4 18.8 44.8 62.6-8.6 14-18.4 27.4-29 40z"],"grid":0,"tags":["ios-contacts-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416zM689 816c0-59-35.6-111-91.6-130.4-27-9.4-56.2-10-83.2-19.4-8.2-2.8-24.4-6.2-27.8-15.6-3.2-9.2-3.2-20-3.8-29.6-0.4-7.6-0.6-15.2-0.6-22.8 0-5 12.8-15.6 15.6-20.2 10.8-18 11.8-42.2 13.8-62.6 17.4 4.8 19.6-27.4 22.6-37.2 2.2-6.8 10-41.8-5.2-47.2 5-8.8 7-19.6 8.4-29.4 4-25.6 5.6-53.6-2.2-78.6-16.2-52-66-81.2-118.6-82.8-53.4-1.8-107 23.8-127 75.6-9.6 25.2-8.8 52.6-5.6 79 1.4 12 3.4 25.4 9.4 36.2-12.8 5.6-9 35.4-6.8 42.6 3.2 10.2 6 46.8 24.2 41.8 1.6 16.2 3.4 32.8 7.8 48.6 3 10.6 9.2 19.6 16.4 27.8 3.6 4 5.4 4.4 5.2 9.6-0.2 15.6 0.2 32.4-3.8 47.6s-37.4 21.6-50.8 24.4c-36 7.4-69.2 10.8-99.2 33.2-0.6 0.4-1 0.8-1.4 1.2-34.4-57.2-54.2-124.2-54.2-195.6 0-210.2 171.2-381.4 381.4-381.4s381.4 170.8 381.4 381.2c0 59.2-13.6 115.4-37.8 165.4-8.8-25.6-30.4-44.8-57-53.6-16.2-5.2-47.4-6.8-59-20.8-5.8-7-2-33.2-2-33.2 50.4-2.8 62-12.2 62-12.2 7.8-4.6 4.2-5.4 0.2-12.2-21.8-36.6-12-83-13-123.2-0.8-33.4-9.6-70-40-88.8-15.2-9.4-39.4-13.8-62.8-13.8-19 0-37.4 2.8-50.6 8.2-84.8 34-34.8 146.4-63.8 210.8-5 10.8-12.2 14.6 0.4 21 0 0 15 8.8 57.8 12.6 0 0 0.6 25.2 0 27.8-2.2 9.8-23.6 16.6-31.6 18.8-8.2 2.2-30.8 9.2-58.2 22.6 0 0 30.4 3 50 9.8 0 0 52.8 12 92 50 36 34.8 41.2 77.4 42 128.6-10.4 7-21.2 13.4-32.4 19.2l-0.6-33z"],"grid":0,"tags":["ios-contacts"]},{"paths":["M392 416h-200v32h256v-256h-32v200l-265.8-264-22.2 22.2z","M632 416h200v32h-256v-256h32v200l265.8-264 22.2 22.2z","M392 608h-200v-32h256v256h-32v-200l-265.8 264-22.2-22.2z","M632 608h200v-32h-256v256h32v-200l265.8 264 22.2-22.2z"],"grid":0,"tags":["ios-contract"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM783.6 783.6c-35.2 35.2-76.4 63-122 82.4-47.4 20-97.6 30.2-149.4 30.2v-768.2c51.8 0 102.2 10.2 149.4 30.2 45.8 19.4 86.8 47 122 82.4 35.2 35.2 63 76.4 82.4 122 20 47.4 30.2 97.6 30.2 149.4s-10.2 102.2-30.2 149.4c-19.6 45.8-47.2 86.8-82.4 122.2z"],"grid":0,"tags":["ios-contrast"]},{"paths":["M736 832h-576v-544h448.234l32-32h-512.234v608h640v-480.234l-32 32z","M475.246 568.168l-19.412-19.414 342.646-342.646-22.626-22.628-359.854 359.822v64.698h64.432l360.090-359.968-22.628-22.572z","M888.426 160.624l-24.93-24.932c-5.328-4.758-12.384-7.692-20.004-7.692-7.624 0-14.608 2.936-19.858 7.7l-24.302 24.3 64.786 64.786 24.3-24.3c4.766-5.25 7.582-12.234 7.582-19.858 0-7.62-2.816-14.678-7.574-20.004z"],"grid":0,"tags":["ios-create-outline"]},{"paths":["M512 640h-128v-128l256-256h-512v608h640v-480z","M775.854 183.48l-359.854 359.822v64.698h64.432l360.090-359.968z","M888.426 160.624l-24.93-24.932c-5.328-4.758-12.384-7.692-20.004-7.692-7.624 0-14.608 2.936-19.858 7.7l-24.302 24.3 64.786 64.786 24.3-24.3c4.766-5.25 7.582-12.234 7.582-19.858 0-7.62-2.816-14.678-7.574-20.004z"],"grid":0,"tags":["ios-create"]},{"paths":["M256 128h32v96h-32v-96z","M288 736v-416h-32v448h448v-32z","M800 736h96v32h-96v-32z","M128 256v32h608v608h32v-640z"],"grid":0,"tags":["ios-crop-outline"]},{"paths":["M256 128h64v96h-64v-96z","M320 704v-352h-64v416h416v-64z","M800 704h96v64h-96v-64z","M128 256v64h576v576h64v-640z"],"grid":0,"tags":["ios-crop"]},{"paths":["M512 64l-448 192v448l448 256 448-256v-448l-448-192zM908 268.4l-396 223.6-393.6-224.4 393.6-171.6 396 172.4zM96 291.6l400 228.4v394l-400-228.6v-393.8zM528 914v-394l400-226.2v391.6l-400 228.6z"],"grid":0,"tags":["ios-cube-outline"]},{"paths":["M941.6 248.4l-429.6-184.4-429.6 184.4 429.6 245.8z","M528 952l432-247.2v-430.2l-432 247.2z","M64 274.6v430.2l432 247.2v-430.2z"],"grid":0,"tags":["ios-cube"]},{"paths":["M256.8 271.4c-22.8-56-29.6-109.8 9-143.4l206 276 20-26.8-210-281.2c-17.8 0-28.8 1.8-37 7.8-23.8 17.8-38.2 51.2-38.6 87.2-0.4 27 6.6 57.2 20.8 92.4 17 42 85 140.4 155.8 237.2 1.4 2 3.2 3.8 5 5.4 5.8-9.4 12-19 18-28.2-52.2-71.6-132.4-185.2-149-226.4z","M780.8 109.8c-10.4-9.6-27-13.8-40-13.8l-254.8 342c0 0-0.2 0.2-0.2 0.2l-29 39.4c-0.2 0.2-0.4 0.6-0.6 0.8-1 1.6-15 21.8-30.4 45.4-6 9.2-12.2 19-18 28.2-7 11.2-13.2 22-17.6 30.4-7.2 14.2-14.6 28.8-21.4 43-7.4 15-14.4 29.2-20.8 41.4-20.4-14.6-44-22.2-68.6-22.2-35 0-67.4 15.4-91.6 43.2-23 26.4-35.8 61.4-35.8 98.4s12.8 72 35.8 98.6c24.2 27.8 56.8 43.2 91.6 43.2 28.8 0 56-10.4 78.4-30 21-18.2 36-42.6 43.6-70.8 2-6.2 23.2-69.4 52.2-114.6 18.4-28.8 44.4-46.8 59.2-55.6l27-19.4c0 0 25.2-17.4 76.2-83.4s161-223 180.4-270.8c14.4-35.2 21.2-65.6 20.8-92.4-0.2-35.8-11.8-58.6-36.4-81.2zM766.8 271.4c-22.8 56-173.6 263.8-200.8 295.4s-54.6 54.8-54.6 54.8-51.8 22.2-84.8 73.8c-33 51.4-55.8 122.6-55.8 122.6v0c-11.8 45.2-48.2 78.2-91.4 78.2-52.8 0-95.6-49.2-95.6-109.8s42.8-109.8 95.6-109.8c21.6 0 41.4 8.2 57.4 22 3.2 2.6 6 5.2 8 7.6 0 0 0.2 0.2 0.2 0.2 1 1 1.8 2 2.6 3 1.8 1.8 3.6 2.6 5.4 2.6 4.8 0 10.4-6.6 19-22.4 13.6-25.2 30.2-60.6 46.6-92.6s63.6-100.6 63.6-100.6l29-39.4 246.6-329c38.6 33.8 31.8 87.4 9 143.4z","M744 644.6c-24.6 0-48.2 7.6-68.6 22.2-6.4-12.2-13.4-26.4-20.8-41.4-6.8-13.8-13.8-28-20.8-41.6l-21.8 27.8c14 27.8 27.6 56.6 39.2 78 8.6 16 14.2 22.4 19 22.4 1.8 0 3.6-1 5.4-2.6 0.8-1 1.8-2 2.6-3 0 0 0.2-0.2 0.2-0.2 2-2.6 4.6-5.2 8-7.6 16-13.8 35.8-22 57.4-22 52.8 0 96 49.2 96 109.8s-43 109.6-95.8 109.6c-43.2 0-79.6-33-91.4-78.2v0c0 0-22.8-71.2-55.8-122.6-9.4-14.8-20.6-27.2-31.4-37.4l-26 19.6c10.4 9.2 21.4 20.8 30.6 35 29 45.2 50 108.4 52.2 114.6 7.6 28.2 22.6 52.6 43.6 70.8 22.6 19.6 49.8 30 78.4 30 70.6 0 128-63.6 128-141.8s-57.6-141.4-128.2-141.4z","M279.8 842.2c-26.6 0-48-25.2-48-56s21.4-56 48-56c26.6 0 48 25.2 48 56s-21.6 56-48 56z","M544.2 544.4c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M744.2 842.2c-26.6 0-48-25.2-48-56s21.4-56 48-56c26.6 0 48 25.2 48 56s-21.4 56-48 56z"],"grid":0,"tags":["ios-cut-outline"]},{"paths":["M616 554.4c51-66 161-223 180.4-270.8 14.4-35.2 21.2-65.6 20.8-92.4-0.4-35.8-12-58.6-36.6-81.2-10.4-9.6-27-13.8-40-13.8l-254.6 341.8c0 0-0.2 0.2-0.2 0.2l-29 39.4c-0.2 0.2-0.4 0.6-0.6 0.8-1 1.6-15 21.8-30.4 45.4-6 9.2-12.2 19-18 28.2-7 11.2-13.2 22-17.6 30.4-7.2 14.2-14.6 28.8-21.4 43-7.4 15-14.4 29.2-20.8 41.4-20.4-14.6-44-22.2-68.6-22.2-35 0-67.4 15.4-91.6 43.2-23 26.4-35.8 61.4-35.8 98.4s12.8 72 35.8 98.6c24.2 27.8 56.8 43.2 91.6 43.2 28.8 0 56-10.4 78.4-30 21-18.2 36-42.6 43.6-70.8 2-6.2 23.2-69.4 52.2-114.6 18.4-28.8 44.4-46.8 59.2-55.6l27-19.4c0 0.2 25.4-17.4 76.2-83.2zM279.8 842.2c-26.6 0-48-25.2-48-56s21.4-56 48-56c26.6 0 48 25.2 48 56s-21.6 56-48 56zM512.2 576.4c-17.6 0-32-14.4-32-32s14.4-32 32-32c17.6 0 32 14.4 32 32s-14.4 32-32 32z","M383 520.8c1.4 2 3.2 3.8 5 5.4 3.4-5.6 7.2-11.4 10.8-17.2l93-131.6-210-281.4c-17.8 0-28.8 1.8-37 7.8-23.8 17.8-38.2 51.2-38.6 87.2-0.4 27 6.6 57.2 20.8 92.4 17.2 42 85.2 140.4 156 237.4z","M744 644.6c-24.6 0-48.2 7.6-68.6 22.2-6.4-12.2-13.4-26.4-20.8-41.4-6.8-13.8-13.8-28-20.8-41.6l-21.8 27.8-72.8 66.2c10.4 9.2 21.4 20.8 30.6 35 29 45.2 50 108.4 52.2 114.6 7.6 28.2 22.6 52.6 43.6 70.8 22.6 19.6 49.8 30 78.4 30 70.6 0 128-63.6 128-141.8s-57.4-141.8-128-141.8zM744.2 842.2c-26.6 0-48-25.2-48-56s21.4-56 48-56c26.6 0 48 25.2 48 56s-21.4 56-48 56z"],"grid":0,"tags":["ios-cut"]},{"paths":["M992 768v-576h-960v576h350v32h-128v32h514v-32h-128v-32h352zM64 224h896v512h-896v-512z"],"grid":0,"tags":["ios-desktop-outline"]},{"paths":["M992 768v-576h-960v576h350v32h-128v32h514v-32h-128v-32h352zM64 224h896v512h-896v-512z","M96 256h832v448h-832v-448z"],"grid":0,"tags":["ios-desktop"]},{"paths":["M512 363.6c81.8 0 148.6 66.6 148.6 148.6 0 81.8-66.6 148.4-148.6 148.4-39.8 0-77-15.4-105-43.4s-43.4-65.2-43.4-105c-0.2-82 66.6-148.6 148.4-148.6zM512 624.6c62.2 0 112.8-50.6 112.8-112.8s-50.6-112.8-112.8-112.8-112.8 50.6-112.8 112.8c0 62.2 50.6 112.8 112.8 112.8zM512 331.6c-99.8 0-180.6 80.8-180.6 180.6s80.8 180.4 180.6 180.4 180.6-80.8 180.6-180.4c0-99.8-80.8-180.6-180.6-180.6v0zM512 592.6c-44.6 0-80.8-36.2-80.8-80.8s36.2-80.8 80.8-80.8 80.8 36.2 80.8 80.8c0 44.6-36.2 80.8-80.8 80.8v0z","M512 128c51.8 0 102.2 10.2 149.4 30.2 45.8 19.4 86.8 47 122 82.4s63 76.4 82.4 122c20 47.4 30.2 97.6 30.2 149.4s-10.2 102.2-30.2 149.4c-19.4 45.8-47 86.8-82.4 122s-76.4 63-122 82.4c-47.4 20-97.6 30.2-149.4 30.2s-102.2-10.2-149.4-30.2c-45.8-19.4-86.8-47-122-82.4-35.2-35.2-63-76.4-82.4-122-20-47.2-30.2-97.6-30.2-149.4s10.2-102.2 30.2-149.4c19.4-45.8 47-86.8 82.4-122 35.2-35.2 76.4-63 122-82.4 47.2-20 97.6-30.2 149.4-30.2zM512 772c69.4 0 134.8-27 183.8-76.2s76.2-114.4 76.2-183.8-27-134.8-76.2-183.8-114.4-76.2-183.8-76.2-134.8 27-183.8 76.2-76.2 114.4-76.2 183.8 27 134.8 76.2 183.8 114.4 76.2 183.8 76.2zM512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416v0zM512 740c-126 0-228-102.2-228-228s102-228 228-228 228 102 228 228-102 228-228 228v0z"],"grid":0,"tags":["ios-disc-outline"]},{"paths":["M512 331.6c-99.8 0-180.6 80.8-180.6 180.6s80.8 180.4 180.6 180.4 180.6-80.8 180.6-180.4c0-99.8-80.8-180.6-180.6-180.6zM512 592.8c-44.6 0-80.8-36.2-80.8-80.8s36.2-80.8 80.8-80.8 80.8 36.2 80.8 80.8-36.2 80.8-80.8 80.8z","M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416zM512 740c-126 0-228-102.2-228-228s102-228 228-228 228 102 228 228-102 228-228 228z"],"grid":0,"tags":["ios-disc"]},{"paths":["M544 128h-288v768h512v-545l-224-223zM544 173.2l179.6 178.8h-179.6v-178.8zM288 864v-704h224v224h224v480h-448z"],"grid":0,"tags":["ios-document-outline"]},{"paths":["M768 352v-1l-224-223v224z","M512 128h-256v768h512v-512h-256z"],"grid":0,"tags":["ios-document"]},{"paths":["M733.8 364l-228 234.2-92.2-93.8-34.8 35.4 109.2 111.4c4.8 4.8 11.4 9 17.4 9 5.8 0 12.4-4 17.2-8.8l245.4-251.4-34.2-36z","M290.8 504.2l-34.8 35.4 109.2 111.4c4.8 4.8 11.4 9 17.4 9 5.8 0 12.4-4 17.2-8.8l17.4-17.8-126.4-129.2z","M595.2 380l-124 127.4 34.4 35 123.8-126.6z"],"grid":0,"tags":["ios-done-all"]},{"paths":["M928 192v512h-832v-512h832zM928 160h-832c-17.6 0-32 14.4-32 32v512c0 17.6 13.8 32 31.6 32h832.4c17.6 0 32-14.4 32-32v-512c0-17.6-14.4-32-32-32v0z","M768 768l64 160h33.2l-65.2-160z","M225.2 768l-65.2 160h33.2l64-160z","M496 768h32v96h-32v-96z","M864 256v384h-704v-384h704zM896 224h-768v448h768v-448z","M512 96c-17.6 0-32 14.4-32 32h64c0-17.6-14.4-32-32-32z"],"grid":0,"tags":["ios-easel-outline"]},{"paths":["M768 768l64 160h33.2l-65.2-160z","M225.2 768l-65.2 160h33.2l64-160z","M496 768h32v96h-32v-96z","M160 256h704v384h-704v-384z","M928 160h-832c-17.6 0-32 14.4-32 32v512c0 17.6 13.8 32 31.6 32h832.4c17.6 0 32-14.4 32-32v-512c0-17.6-14.4-32-32-32zM896 672h-768v-448h768v448z","M512 96c-17.6 0-32 14.4-32 32h64c0-17.6-14.4-32-32-32z"],"grid":0,"tags":["ios-easel"]},{"paths":["M512 96c23.2 0 53 13.6 84 38.4 33.4 26.8 67.2 65.2 97.2 111.2 31.6 48.2 58 102.6 76.4 157.6 20.2 60.2 30.4 118.8 30.4 174.4 0 57.4-7.2 109.4-21.6 154.4-13.4 42.6-33.2 79-58.6 108.4-24.6 28.4-54.6 50.2-89.2 64.8-35.2 14.8-75 22.4-118.6 22.4s-83.4-7.6-118.6-22.4c-34.6-14.6-64.6-36.4-89.2-64.8-25.4-29.4-45.2-65.8-58.6-108.4-14.2-45.2-21.6-97-21.6-154.4 0-55.6 10.2-114.4 30.4-174.4 18.4-55 44.8-109.4 76.4-157.6 30.2-46 63.8-84.4 97.2-111.2 31-24.8 60.8-38.4 84-38.4zM512 64c-128 0-320 266.4-320 513.8s128 382.2 320 382.2 320-134.8 320-382.2-192-513.8-320-513.8v0z"],"grid":0,"tags":["ios-egg-outline"]},{"paths":["M512 64c-128 0-320 266.4-320 513.8s128 382.2 320 382.2 320-134.8 320-382.2-192-513.8-320-513.8v0z"],"grid":0,"tags":["ios-egg"]},{"paths":["M256 448h32v-224h576v576h-576v-224h-32v256h640v-640h-640z","M595.8 386.2l23.2-23.2 149 149-149 149-23.2-23.2 109.4-109.4h-577.2v-32.8h577.2z"],"grid":0,"tags":["ios-exit-outline"]},{"paths":["M256 192v303.6h449.2l-109.4-109.4 23.2-23.2 149 149-149 149-23.2-23.2 109.4-109.4h-449.2v303.6h640v-640z","M128 495.6h128v32.8h-128v-32.8z"],"grid":0,"tags":["ios-exit"]},{"paths":["M184 160h200v-32h-256v256h32v-200l265.8 264 22.2-22.2z","M840 160h-200v-32h256v256h-32v-200l-265.8 264-22.2-22.2z","M184 864h200v32h-256v-256h32v200l265.8-264 22.2 22.2z","M840 864h-200v32h256v-256h-32v200l-265.8-264-22.2 22.2z"],"grid":0,"tags":["ios-expand"]},{"paths":["M240.8 80l514.8 880 27.6-16-514.8-880z","M512 288c-24.6 0-48 2.6-71 7.6l13.2 22.6c18.8-3.6 38-5.4 57.8-5.4 148 0 262 102.2 348 199.2-53.8 54.6-118.4 121.2-198 161.4l12.6 21.6c91.6-46.6 164.8-125.8 221.4-183-88.8-102.8-214.8-224-384-224z","M512 711.2c-152.2 0-243.2-91.6-348-199.2 71.6-72.6 134-127.4 198.4-161l-12.6-21.6c-73 38.4-143.2 101.4-221.8 182.6 115.6 118.4 212.6 224 384 224 24.6 0 48.2-2.8 71-7.8l-13.2-22.6c-18.8 3.6-38 5.6-57.8 5.6z","M626 612c24.6-26.4 39.6-61.6 39.6-100 0-82.4-68.8-149.4-153.6-149.4-10.2 0-20.4 1-30 2.8l13.4 23c5.4-0.6 11-1 16.6-1 70.6 0 128 55.8 128 124.4 0 29-10.2 55.8-27.4 77l13.4 23.2z","M398 412c-24.6 26.4-39.6 61.6-39.6 100 0 82.4 68.8 149.4 153.6 149.4 10.4 0 20.4-1 30.2-2.8l-13.4-23c-5.4 0.6-11 1-16.6 1-70.6 0-128-55.8-128-124.4 0-29 10.2-55.8 27.4-77l-13.6-23.2z","M432.8 471.4c-6.6 12.2-10.4 26-10.4 40.6 0 46.6 37.6 84.6 85 87l-16.6-28.2c-24.8-8.6-42.8-31.6-42.8-58.6 0-4.2 0.4-8.4 1.2-12.4l-16.4-28.4z","M591.2 552.6c6.6-12.2 10.4-26 10.4-40.6h-25.6c0 4.2-0.4 8.4-1.2 12.4l16.4 28.2z"],"grid":0,"tags":["ios-eye-off-outline"]},{"paths":["M240.8 80l514.8 880 27.6-16-514.8-880z","M512 288c-24.6 0-48 2.6-71 7.6l40.8 70c9.8-1.8 19.8-2.8 30.2-2.8 84.8 0 153.6 67 153.6 149.4 0 38.4-15 73.4-39.6 100l48.6 83c91.6-46.6 164.8-125.8 221.4-183-88.8-103-214.8-224.2-384-224.2z","M512 661.4c-84.8 0-153.6-67-153.6-149.4 0-38.4 15-73.4 39.6-100l-48.2-82.4c-73 38.2-143.2 101.2-221.8 182.4 115.6 118.4 212.6 224 384 224 24.6 0 48.2-2.8 71-7.8l-40.8-69.8c-9.8 2-19.8 3-30.2 3z","M601.4 506.8c-7.8 3.4-16.4 5.2-25.4 5.2-3 0-6-0.2-8.8-0.6l24 41.2c6.6-12.2 10.4-26 10.4-40.6 0-1.8 0-3.6-0.2-5.2z","M432.8 471.4c-6.6 12.2-10.4 26-10.4 40.6 0 46.6 37.6 84.6 85 87l-74.6-127.6z"],"grid":0,"tags":["ios-eye-off"]},{"paths":["M592 96c-185.6 0-336 150.4-336 336 0 87 33 166.4 87.4 226l-119.4 119.4-84.6-84.6c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l84.6 84.6-100.6 100.6c-6.2 6.2-6.2 16.4 0 22.6 3.2 3.2 7.2 4.6 11.4 4.6s8.2-1.6 11.4-4.6l100.6-100.6 84.6 84.6c3.2 3.2 7.2 4.6 11.4 4.6s8.2-1.6 11.4-4.6c6.2-6.2 6.2-16.4 0-22.6l-85-84.6 119.4-119.4c59.6 54.2 139 87.4 226 87.4 185.6 0 336-150.4 336-336s-150.4-336-336-336zM807 647c-57.4 57.4-133.8 89-215 89s-157.6-31.6-215-89-89-133.8-89-215 31.6-157.6 89-215 133.8-89 215-89 157.6 31.6 215 89 89 133.8 89 215-31.6 157.6-89 215z"],"grid":0,"tags":["ios-female"]},{"paths":["M512 576c-59.6 0-109.8-40.8-124-96h-228v288h704v-288h-228c-14.2 55.2-64.4 96-124 96z","M737 256h-1v160h-32v-160h-384v160h-32v-160h-1l-127 192h256c0 53 43 96 96 96s96-43 96-96h256l-127-192z"],"grid":0,"tags":["ios-filing"]},{"paths":["M911.6 548c-0.2 0-0.4 0-0.8 0-8.8-0.4-15.6-7.8-15.2-16.6 0.2-5.4 0.4-15.2 0.4-21.4 0-85.6-36.8-192.2-82.2-237.6-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0c51.4 51.4 91.6 165.6 91.6 260.2 0 6.4-0.2 16.6-0.4 22.8-0.4 8.6-7.4 15.2-16 15.2z","M764 222.6c-3.6 0-7.2-1.2-10.2-3.8-71.4-59.4-155-90.8-241.8-90.8-82.6 0-159.8 24-223.4 69.6-7.2 5.2-17.2 3.4-22.4-3.6-5.2-7.2-3.4-17.2 3.6-22.4 69.2-49.4 153-75.6 242.2-75.6 94.4 0 185 34 262.2 98.4 6.8 5.6 7.8 15.8 2 22.6-3 3.6-7.6 5.6-12.2 5.6z","M142.4 703.6c-6.8 0-13.2-4.4-15.4-11.4-19-63.6-31-116.2-31-182.2 0-100.6 36.4-197.6 102.4-273.4 5.8-6.6 16-7.4 22.6-1.6s7.4 16 1.6 22.6c-61 70-94.6 159.6-94.6 252.4 0 62 11.4 112.2 29.8 173 2.6 8.4-2.2 17.4-10.6 20-1.6 0.4-3.2 0.6-4.8 0.6z","M244.2 847.2c-0.4 0-0.6 0-1 0-8.8-0.6-15.6-8-15-17 5.8-98-1.4-133.2-10.6-177.8-6.6-32.4-14.2-69-18.8-135.6-6.2-86 21.8-166.8 78.4-227.8 59.6-64 145.2-99.2 241.2-99.2 71 0 137.2 24.8 191 71.4 52.4 45.4 91.8 110.4 114.2 188 25 86.2 32 194.8 20.2 314-0.8 8.8-8.8 15.2-17.4 14.4-8.8-0.8-15.2-8.6-14.4-17.4 11.2-115.2 4.6-219.8-19.2-302-20.8-71.6-56.8-131.4-104.6-172.8-48-41.6-106.8-63.6-170-63.6-87 0-164.2 31.6-217.6 89-50.6 54.4-75.6 126.8-70 203.8 4.6 64.4 11.8 100 18.2 131.4 9.6 46.8 17.2 83.8 11.2 186-0.4 8.8-7.4 15.2-15.8 15.2z","M337.4 896.6c-0.8 0-1.4 0-2.2-0.2-8.8-1.2-14.8-9.4-13.6-18 16-112.8-0.8-237.2-19.2-344-11.6-67.2 1.6-125.8 38.2-169.4 38.6-45.8 102.6-73 171.4-73 57.2 0 109 22.6 149.4 65.6 40.8 43 68.6 105.4 80.4 180 10 63 15 114.4 15.2 157 0.6 86-10 154.6-10.4 157.4-1.4 8.8-9.6 14.8-18.2 13.4-8.8-1.4-14.8-9.6-13.4-18.2 0.2-0.6 10.6-69.2 10.2-152.4-0.2-41-5-90.8-14.8-152.2-21.4-134.8-97.4-218.6-198.4-218.6-59.6 0-114.4 23-147 61.6-30.8 36.6-41.4 84.8-31.2 143.2 18.8 109.2 36 236.8 19.4 354-1.2 8-8 13.8-15.8 13.8z","M632.6 906c-1 0-2 0-3-0.2-8.6-1.6-14.4-10-12.8-18.8 7-36.4 5.6-74.2 5.6-74.6-0.4-8.8 6.6-16.2 15.4-16.6 0.2 0 0.4 0 0.6 0 8.6 0 15.6 6.8 16 15.4 0 1.6 1.4 41.8-6.2 81.8-1.2 7.6-8 13-15.6 13z","M432.2 922.6c-0.6 0-1.4 0-2-0.2-8.8-1.2-15-9.2-13.8-18 14.4-112.6 8.8-235.6-16.8-365.4-11.8-59.6 4.4-94.6 19.8-113.4 20-24.4 51.4-37.8 88.6-37.8 57.8 0 102 41.4 121.4 113.8 15.2 56.4 23.8 136.8 25.2 232.6 0.2 8.8-7 16-15.8 16.2 0 0-0.2 0-0.2 0-8.8 0-15.8-7-16-15.8-1.2-93-9.6-170.8-24.2-224.6-21.8-81.2-70.4-90-90.4-90-27.4 0-50 9.2-63.8 26-16 19.4-20.4 49.4-13.2 86.8 26.2 133.2 32 259.6 17 375.6-1 8.4-7.8 14.2-15.8 14.2z","M532 928c-0.6 0-1.2 0-1.8 0-8.8-1-15.2-8.8-14.2-17.6 15.8-142.6 3.6-330.6-25.8-402.2-3.4-8.2 0.6-17.6 8.6-21 8.2-3.4 17.6 0.6 21 8.6 31.8 77 44.6 268.2 28.2 417.8-1 8.4-8 14.4-16 14.4z"],"grid":0,"tags":["ios-finger-print"]},{"paths":["M447.8 96c51.4 269.2-193.4 263.8-191.8 534.8 1.4 222 210 297.2 256.2 297.2 46.4 0 227.8-48.2 253.8-297.2 21.4-202.8-144.8-416-318.2-534.8zM512.2 913.2c0 0-81.4-66.6-81.4-148.6s81.2-148.6 81.2-148.6 80.6 66.6 80.6 148.6c-0 82-80.4 148.6-80.4 148.6zM734.4 628c-5.6 53.8-19.4 101.2-41 141-17.4 32.4-40.2 59.6-67.4 81.2-13 10.4-26.6 18.8-39.6 25.6 20-29.6 38.2-68.2 38.2-111.2 0-94.4-87.6-167.8-91.4-170.8l-21.2-17.4-21.2 17.4c-3.8 3-92 76.4-92 170.8 0 40.6 16.4 77.2 35.2 106.2-14.8-8-30.4-18.2-46-30.6-29.4-23.6-52.8-51.2-69.4-82.4-20.2-37.6-30.4-80.4-30.8-127-0.8-118.8 48.2-177.8 100-240.2 49.2-59.2 99.6-120.2 99-226.8 65 53.6 122.6 117 165.6 183.6 62.8 96.6 91 193.6 82 280.6z"],"grid":0,"tags":["ios-flame-outline"]},{"paths":["M447.8 96c51.4 269.2-193.4 263.8-191.8 534.8 1.4 222 210 297.2 256.2 297.2 46.4 0 227.8-48.2 253.8-297.2 21.4-202.8-144.8-416-318.2-534.8zM512.2 913.2c0 0-81.4-66.6-81.4-148.6s81.2-148.6 81.2-148.6 80.6 66.6 80.6 148.6c-0 82-80.4 148.6-80.4 148.6z"],"grid":0,"tags":["ios-flame"]},{"paths":["M547.8 264l-33 178.2-6.8 37.8h168l-199.6 280 33-178.2 6.6-37.8h-167.8l199.6-280zM605.4 128l-319.4 448h191.6l-59 320 319.4-448h-191.6l59-320z"],"grid":0,"tags":["ios-flash-outline"]},{"paths":["M605.4 128l-319.4 448h191.6l-59 320 319.4-448h-191.6l59-320z"],"grid":0,"tags":["ios-flash"]},{"paths":["M873.8 708.8l-233.8-390.8v-190h32v-32h-64v230.8l5 7.6 233.2 389.6c13.6 25.6 18.6 52 18 76-0.4 18.6-4 35.8-13 51.2-17 28.2-46.4 44.8-81.2 44.8h-511.8c-35 0-65-16.8-82-45.4-23.8-39.6-21.8-76.2 4.6-126.2l182.8-308.4h116.4v-32h-97.4l29.4-49.6 4-7.6v-6.8h96v-32h-96v-64h64v-32h-64v-64h160v-32h-224v32h32v190l-231.8 390.8c-16.8 31.8-25 62.8-24.2 91.2 2.2 73 57.4 128 130.2 128h511.8c72.6 0 124.2-55.2 126-128 0.6-28.4-5.2-59.4-22.2-91.2z","M216.6 717.2c-13.8 21-21.8 48.2-21.8 67 0 55.2 31.6 79.6 91.4 79.6h451.8c59.6 0 90-31.4 91.4-80 0.6-19-6.2-45.4-20.2-66.6l-143.8-237.2h-306.4l-142.4 237.2zM647.4 512l134.4 221.8 0.4 0.2 0.4 0.4c10.8 16.4 15.2 36.6 15 48.4-0.4 15.6-5 28-13.4 35.6-9.6 8.6-25.4 13.6-46 13.6h-452.2c-22.2 0-38.6-4.4-47.4-12-3-2.4-12-10.2-12-36.2 0-11.8 5.8-32.8 16.6-49.4l0.4-0.6h0.4l133.2-221.8h270.2z"],"grid":0,"tags":["ios-flask-outline"]},{"paths":["M782 734l-0.4-0.2-134.2-221.8h-270.2l-133.2 221.8h-0.4l-0.4 0.6c-11 16.6-16.6 37.6-16.6 49.4 0 25.8 9 33.6 12 36.2 9 7.6 25.4 12 47.4 12h452c20.6 0 36.4-5 46-13.6 8.4-7.6 13-20 13.4-35.6 0.4-11.8-4.2-32-15-48.4l-0.4-0.4z","M873.8 708.8l-233.8-390.8v-190h32v-32h-320v32h32v190l-231.8 390.8c-16.8 31.8-25 62.8-24.2 91.2 2.2 73 57.4 128 130.2 128h511.8c72.6 0 124.2-55.2 126-128 0.6-28.4-5.2-59.4-22.2-91.2zM432 192h48v32h-48v-32zM432 288h80v32h-80v-32zM398.6 384h81.4v32h-100.4l19-32zM829.2 784c-1.4 48.4-31.8 80-91.4 80h-451.8c-59.8 0-91.4-24.4-91.4-79.6 0-19 8-46 21.8-67l142.6-237.4h306.4l143.6 237.4c14 21.2 20.8 47.8 20.2 66.6z"],"grid":0,"tags":["ios-flask"]},{"paths":["M770.2 460.4c-53.4 0-120.2 13.8-172.6 27-1.8-6.4-4.2-12.4-7.4-18.2 46.4-27.6 103.4-65 141-102.8 73.4-73.4 96.6-127.2 75.2-148.6-5.2-5.2-12-7.6-20.6-7.6-27.6 0-72 26.8-128 82.8-37.6 37.6-75.2 94.4-102.8 140.8-5.6-3.2-11.8-5.6-18.2-7.6 13.4-52.4 27-119 27-172.2 0-103.8-21.6-158.2-52-158.2s-52 54.4-52 158.2c0 53.2 13.6 120 27 172.2-6.4 1.8-12.4 4.4-18.2 7.6-27.6-46.4-65-103.2-102.8-140.8-56-56-100.6-82.8-128-82.8-8.6 0-15.4 2.6-20.6 7.6-21.6 21.6 1.6 75.2 75.2 148.6 37.8 37.8 94.6 75.2 141 102.8-3 5.6-5.6 11.8-7.4 18.2-52.4-13.4-119.2-27-172.6-27-103.6 0-157.4 21.2-157.4 51.6s53.8 52.4 157.8 52.4c53.4 0 120.4-13.8 172.8-27.2 1.8 6.2 4.4 12.4 7.6 18-46.6 27.6-103.6 65.2-141.4 103-73.4 73.4-96.6 127.2-75.2 148.6 5.2 5.2 12 7.6 20.6 7.6 27.6 0 72-26.8 128-82.8 37.8-37.8 75.6-95 103.2-141.6 5.6 3 11.6 5.6 18 7.4-13.4 52.4-27.2 119.6-27.2 173 0 103.8 21.6 157.2 52 157.2s52-53.4 52-157.2c0-53.6-13.8-120.6-27.2-173 6.2-1.8 12.2-4.2 18-7.4 27.6 46.6 65.2 103.8 103.2 141.6 56 56 100.6 82.8 128 82.8 8.6 0 15.4-2.6 20.6-7.6 21.6-21.6-1.6-75.2-75.2-148.6-37.8-37.8-95-75.4-141.4-103 3.2-5.6 5.6-11.6 7.6-18 52.4 13.4 119.4 27.2 172.8 27.2 103.8 0 157.8-21.6 157.8-52s-54.2-52-158.2-52zM678.8 314c65.8-65.8 97.8-73.2 105.6-74-0.4 4.2-2.4 13.6-11.8 29.6-12.6 21.6-34 47.8-62.2 75.8-25.2 25.2-63.6 54-112.4 84.4-1.2-1.2-2.4-2.4-3.6-3.6 30.4-48.4 59.4-87 84.4-112.2zM499.4 156.6c4.8-18 9.8-26.2 12.6-29.4 2.8 3.4 7.8 11.4 12.6 29.4 6.4 24.2 9.8 57.8 9.8 97.6 0 35.6-6.8 83.2-19.8 139-0.8 0-1.6 0-2.6 0-0.8 0-1.6 0-2.6 0-13-55.8-19.8-103.4-19.8-139 0.2-39.6 3.4-73.4 9.8-97.6zM426 430c-48.6-30.4-87.2-59.2-112.4-84.4-28-28-49.4-54.2-62.2-75.8-9.4-16-11.6-25.4-11.8-29.6 7.6 0.8 39.8 8.2 105.6 74 25.2 25.2 54 63.6 84.4 112.4-1.2 1-2.4 2.2-3.6 3.4zM253.8 534.8c-39.6 0-73.4-3.4-97.4-10-18-4.8-26-10-29.2-12.8 3.2-2.6 11.2-7.8 29.4-12.4 24-6.2 57.6-9.4 97.2-9.4 35.6 0 83.4 6.8 139.4 19.8 0 0.6 0 1.4 0 2 0 1 0 2 0 2.8-56 13.2-103.8 20-139.4 20zM345.2 710.8c-65.8 65.8-97.8 73.2-105.6 74 0.4-4.2 2.4-13.6 11.8-29.6 12.6-21.6 34-47.8 62.2-75.8 25.2-25.2 64-54.2 113-84.8 1 1.2 2.2 2.2 3.4 3.4-30.6 48.8-59.6 87.6-84.8 112.8zM524.6 867.8c-4.8 18-10 26-12.6 29-2.6-3.2-7.8-11-12.6-29-6.4-24-9.6-57.6-9.6-97.2 0-35.8 6.8-83.6 20-139.8 0.8 0 1.6 0 2.4 0s1.6 0 2.4 0c13 56.2 20 104.2 20 139.8-0.4 39.8-3.6 73.2-10 97.2zM512 576c-35.4 0-64-28.6-64-64s28.6-64 64-64 64 28.6 64 64-28.6 64-64 64zM597.4 594.6c49 30.4 87.8 59.4 113 84.8 28 28 49.6 54.2 62.2 75.8 9.4 16 11.6 25.4 11.8 29.6-7.6-0.8-39.8-8.2-105.6-74-25.2-25.2-54.2-64-84.8-113 1.2-1 2.4-2 3.4-3.2zM867.6 525c-24 6.4-57.8 9.6-97.4 9.6-35.6 0-83.4-6.8-139.4-19.8 0-1 0-2 0-2.8 0-0.6 0-1.4 0-2 56-13 103.8-19.8 139.4-19.8 39.6 0 73.2 3.4 97.4 9.6 18 4.8 26 9.8 29.2 12.6-3.2 2.8-11.2 8-29.2 12.6z","M636.8 752.8c-17-17-33.8-37.4-49.6-59 4 26.4 6.6 52.8 6.6 76.8 0 23.4-1 45-3.2 64.2 24.6 43.6 48.6 65.4 68 65.4 3.2 0 6.4-0.6 9.4-1.8 22-9 26.6-46.6 9-108.6-12.8-10.6-26.2-23-40.2-37zM656.4 869.6c-5-2.8-17.4-11.8-35.2-41.4 1.2-14.6 2-30.4 2.2-47 9.4 9 18.4 17.6 27.4 25.2 9.4 37 7.8 56.2 5.6 63.2z","M387.6 272.2c16.8 16.8 33.4 37 49.2 58.4-4-26.4-6.4-52.6-6.4-76.4 0-23.4 1-45 3.2-64.2-24.6-43.6-48.6-65.4-68-65.4-3.2 0-6.4 0.6-9.4 1.8-22 9-26.6 46.6-9 108.6 12.8 10.8 26.4 23.2 40.4 37.2zM367.6 155.4c5 2.8 17.4 11.8 35.2 41.4-1.2 14.6-2 30.2-2.2 46.8-9.2-9-18.4-17.4-27.4-25.2-9.4-36.8-7.8-56-5.6-63z","M271.6 637.2c17-17 37.4-33.8 59-49.6-26.4 4-52.8 6.6-76.8 6.6-23.4 0-45-1-64.2-3.2-51 28.8-72.2 56.4-63.6 77.4 5.2 12.8 20.2 19.8 44.2 19.8 17 0 38.6-3.4 64.4-10.8 10.8-12.8 23-26.2 37-40.2zM170.2 658.6c-7.6 0-12.6-1-15.2-1.8 2.8-5.2 11.8-17.4 41.4-35.2 14.6 1.2 30.4 2 47 2.2-9 9.2-17.4 18.4-25.2 27.4-19 4.8-35.4 7.4-48 7.4z","M752.4 387.6c-17 17-37.4 33.8-59 49.6 26.4-4 52.8-6.6 76.8-6.6 23.4 0 45 1 64.2 3.2 51-28.8 72.2-56.4 63.6-77.4-5.2-12.8-20.2-19.8-44.2-19.8-17 0-38.6 3.4-64.4 10.8-10.8 13-23 26.4-37 40.2zM853.8 366.4c7.6 0 12.6 1 15.2 1.8-2.8 5.2-12 17.4-41.4 35.2-14.6-1.2-30.4-2-47-2.2 9-9.2 17.4-18.4 25.2-27.4 19-5 35.4-7.4 48-7.4z","M387.2 752.8c-16.6 16.6-32.6 31.2-47.6 43.2-15.6 56.4-11 90.8 9.8 99.8 3.2 1.4 6.4 2 9.8 2 20.6 0 46.4-24 73.4-72.4-1.4-16.8-2.2-35-2.2-54.6 0-24 2.6-50.4 6.6-76.8-16 21.4-32.8 41.8-49.8 58.8zM361.6 867c-1.6-5.6-4-20.8 4.2-54.2 11.2-9.4 22.8-20 34.8-31.6 0.2 13 0.6 25.4 1.6 37.2-19.4 32.8-34 45.4-40.6 48.6z","M636.8 272.4c16.6-16.6 32.4-31 47.4-43 15.8-56.8 11.4-91.6-9.6-100.4-3.2-1.4-6.4-2-9.8-2-20.6 0-46.4 24-73.4 72.4 1.4 16.8 2.2 35 2.2 54.6 0 24.2-2.6 50.6-6.6 77.4 16-21.4 32.8-42 49.8-59zM662.4 157.8c1.6 5.6 4 20.8-4.4 54.8-11.2 9.4-22.8 20-34.6 31.4-0.2-13.2-0.6-25.8-1.6-37.6 19.4-32.8 34-45.2 40.6-48.6z","M199.2 433c16.8-1.4 35-2.2 54.6-2.2 24 0 50.2 2.6 76.6 6.6-21.4-15.8-41.8-32.6-58.8-49.6-16.6-16.6-31.2-32.6-43.4-47.8-22.6-6.2-41.8-9.2-57.2-9.2-22.8 0-37.2 6.6-42.4 19-9.2 21.8 14.2 51.8 70.6 83.2zM171.2 360.4c10.8 0 24.6 2 40.2 5.8 9.4 11.2 20 22.8 31.6 34.8-13 0.2-25.4 0.6-37.2 1.6-32.8-19.4-45.2-34-48.6-40.6 2.8-0.8 7.2-1.6 14-1.6z","M824.8 592c-16.8 1.4-35 2.2-54.6 2.2-24 0-50.4-2.6-76.8-6.6 21.6 15.8 42 32.8 59 49.6 16.6 16.6 31 32.6 43.2 47.6 22.8 6.4 41.8 9.4 57.2 9.4 22.8 0 37.2-6.6 42.4-19 9.4-22-14-51.8-70.4-83.2zM852.8 664.6c-10.8 0-24.6-2-40.4-6-9.4-11.2-20-22.8-31.6-34.8 13-0.2 25.4-0.6 37.2-1.6 32.8 19.4 45.2 34 48.6 40.6-2.6 1-7 1.8-13.8 1.8z"],"grid":0,"tags":["ios-flower-outline"]},{"paths":["M770.2 460.4c-53.4 0-120.2 13.8-172.6 27-1.8-6.4-4.2-12.4-7.4-18.2 46.4-27.6 103.4-65 141-102.8 73.4-73.4 96.6-127.2 75.2-148.6-5.2-5.2-12-7.6-20.6-7.6-27.6 0-72 26.8-128 82.8-37.6 37.6-75.2 94.4-102.8 140.8-5.6-3.2-11.8-5.6-18.2-7.6 13.4-52.4 27-119 27-172.2 0-103.8-21.6-158.2-52-158.2s-52 54.4-52 158.2c0 53.2 13.6 120 27 172.2-6.4 1.8-12.4 4.4-18.2 7.6-27.6-46.4-65-103.2-102.8-140.8-56-56-100.6-82.8-128-82.8-8.6 0-15.4 2.6-20.6 7.6-21.6 21.6 1.6 75.2 75.2 148.6 37.8 37.8 94.6 75.2 141 102.8-3 5.6-5.6 11.8-7.4 18.2-52.4-13.4-119.2-27-172.6-27-103.6 0-157.4 21.2-157.4 51.6s53.8 52.4 157.8 52.4c53.4 0 120.4-13.8 172.8-27.2 1.8 6.2 4.4 12.4 7.6 18-46.6 27.6-103.6 65.2-141.4 103-73.4 73.4-96.6 127.2-75.2 148.6 5.2 5.2 12 7.6 20.6 7.6 27.6 0 72-26.8 128-82.8 37.8-37.8 75.6-95 103.2-141.6 5.6 3 11.6 5.6 18 7.4-13.4 52.4-27.2 119.6-27.2 173 0 103.8 21.6 157.2 52 157.2s52-53.4 52-157.2c0-53.6-13.8-120.6-27.2-173 6.2-1.8 12.2-4.2 18-7.4 27.6 46.6 65.2 103.8 103.2 141.6 56 56 100.6 82.8 128 82.8 8.6 0 15.4-2.6 20.6-7.6 21.6-21.6-1.6-75.2-75.2-148.6-37.8-37.8-95-75.4-141.4-103 3.2-5.6 5.6-11.6 7.6-18 52.4 13.4 119.4 27.2 172.8 27.2 103.8 0 157.8-21.6 157.8-52s-54.2-52-158.2-52zM512 544c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32z","M636.8 752.8c-17-17-33.8-37.4-49.6-59 4 26.4 6.6 52.8 6.6 76.8 0 23.4-1 45-3.2 64.2 24.6 43.6 48.6 65.4 68 65.4 3.2 0 6.4-0.6 9.4-1.8 22-9 26.6-46.6 9-108.6-12.8-10.6-26.2-23-40.2-37z","M387.6 272.2c16.8 16.8 33.4 37 49.2 58.4-4-26.4-6.4-52.6-6.4-76.4 0-23.4 1-45 3.2-64.2-24.6-43.6-48.6-65.4-68-65.4-3.2 0-6.4 0.6-9.4 1.8-22 9-26.6 46.6-9 108.6 12.8 10.8 26.4 23.2 40.4 37.2z","M271.6 637.2c17-17 37.4-33.8 59-49.6-26.4 4-52.8 6.6-76.8 6.6-23.4 0-45-1-64.2-3.2-51 28.8-72.2 56.4-63.6 77.4 5.2 12.8 20.2 19.8 44.2 19.8 17 0 38.6-3.4 64.4-10.8 10.8-12.8 23-26.2 37-40.2z","M752.4 387.6c-17 17-37.4 33.8-59 49.6 26.4-4 52.8-6.6 76.8-6.6 23.4 0 45 1 64.2 3.2 51-28.8 72.2-56.4 63.6-77.4-5.2-12.8-20.2-19.8-44.2-19.8-17 0-38.6 3.4-64.4 10.8-10.8 13-23 26.4-37 40.2z","M387.2 752.8c-16.6 16.6-32.6 31.2-47.6 43.2-15.6 56.4-11 90.8 9.8 99.8 3.2 1.4 6.4 2 9.8 2 20.6 0 46.4-24 73.4-72.4-1.4-16.8-2.2-35-2.2-54.6 0-24 2.6-50.4 6.6-76.8-16 21.4-32.8 41.8-49.8 58.8z","M636.8 272.4c16.6-16.6 32.4-31 47.4-43 15.8-56.8 11.4-91.6-9.6-100.4-3.2-1.4-6.4-2-9.8-2-20.6 0-46.4 24-73.4 72.4 1.4 16.8 2.2 35 2.2 54.6 0 24.2-2.6 50.6-6.6 77.4 16-21.4 32.8-42 49.8-59z","M199.2 433c16.8-1.4 35-2.2 54.6-2.2 24 0 50.2 2.6 76.6 6.6-21.4-15.8-41.8-32.6-58.8-49.6-16.6-16.6-31.2-32.6-43.4-47.8-22.6-6.2-41.8-9.2-57.2-9.2-22.8 0-37.2 6.6-42.4 19-9.2 21.8 14.2 51.8 70.6 83.2z","M824.8 592c-16.8 1.4-35 2.2-54.6 2.2-24 0-50.4-2.6-76.8-6.6 21.6 15.8 42 32.8 59 49.6 16.6 16.6 31 32.6 43.2 47.6 22.8 6.4 41.8 9.4 57.2 9.4 22.8 0 37.2-6.6 42.4-19 9.4-22-14-51.8-70.4-83.2z"],"grid":0,"tags":["ios-flower"]},{"paths":["M912.6 320c-2.2 0-8.6 0-16.6 0v-82c0-26.6-18.8-46-45.6-46h-388.6c-5.6 0-8.6-1.2-12.2-4.8l-45.4-45.4c-9.8-9.2-17.8-13.8-34.6-13.8h-192.2c-27.6 0-49.4 20.6-49.4 46v146c-8 0-14.2 0-16.6 0-25.6 0-50.6 10.2-47 48.6s47 477.4 47 477.4c5.4 35.6 23.4 50 50 50h705c25.4 0 42-15.6 46-50 0 0 44.4-425.8 47.2-467s-17.8-59-47-59zM160 174c0-8.6 8.8-14 17.4-14h192.2c7 0 7.4 0.4 12.4 5l45 44.8c9.6 9.6 20.8 14.2 34.8 14.2h388.6c9 0 13.6 5.2 13.6 14v82c-144 0-560 0-704 0v-146zM880.4 846c-1.6 9.4-7.4 18-16 18h-700.4c-9 0-19-7-20.6-18l-48-478c0-8.8 7.2-16 16-16h801.2c8.8 0 16 7.2 16 16l-48.2 478z"],"grid":0,"tags":["ios-folder-open-outline"]},{"paths":["M896 238c0-26.6-18.8-46-45.6-46h-388.6c-5.6 0-8.6-1.2-12.2-4.8l-45.4-45.4c-9.8-9.2-17.8-13.8-34.6-13.8h-192.2c-27.6 0-49.4 20.6-49.4 46v114h768v-50z","M128 320c-8 0-14.2 0-16.6 0-25.6 0-50.6 10.2-47 48.6s47 477.4 47 477.4c5.4 35.6 23.4 50 50 50h705c25.4 0 42-15.6 46-50 0 0 44.4-425.8 47.2-467 2.8-41-17.8-59-47.2-59-2.2 0-8.6 0-16.6 0h-767.8z"],"grid":0,"tags":["ios-folder-open"]},{"paths":["M64 128v64l352 384v256l192 64v-320l352-384v-64h-896zM928 180l-352 384v287.6l-128-42.6v-245l-352-384v-20h832v20z"],"grid":0,"tags":["ios-funnel-outline"]},{"paths":["M64 128v64l352 384v256l192 64v-320l352-384v-64h-896z"],"grid":0,"tags":["ios-funnel"]},{"paths":["M832 320c0-70.6-57.4-128-128-128s-128 57.4-128 128c0 65.2 48.8 119 112 127v1c0 46-19.8 84.8-59 115-42.6 33-97.4 48.2-135.8 55-86.4 15.6-128.2 66.6-143.2 89.4-5.2-1.2-10.6-2.2-16-2.8v-385.4c64.2-7 114-61.2 114-127.2 0-70.6-57.4-128-128-128s-128 57.4-128 128c0 64.6 47.8 118 110 126.8v386.6c-62.2 8.8-110 62.2-110 126.8 0 70.6 57.4 128 128 128s128-57.4 128-128c0-48.6-27.2-91-67.2-112.6 14.6-20.2 50.2-57.4 118-69.8 42-7.6 102-24.4 149.6-61.2 46.8-36.2 71.4-84.6 71.4-140.4v-1c63.4-8.2 112.2-62 112.2-127.2zM224 192c0-53 43-96 96-96s96 43 96 96-43 96-96 96-96-43-96-96zM416 832c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM704 416c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"],"grid":0,"tags":["ios-git-branch"]},{"paths":["M944 496h-176c-0.2 0-0.4 0-0.6 0-8.2-134-119.4-240-255.4-240s-247.2 106-255.4 240c-0.2 0-0.4 0-0.6 0h-176c-8.8 0-16 7.2-16 16s7.2 16 16 16h176c0.2 0 0.4 0 0.6 0 8.2 134 119.4 240 255.4 240s247.2-106 255.4-240c0.2 0 0.4 0 0.6 0h176c8.8 0 16-7.2 16-16s-7.2-16-16-16zM670.4 670.4c-42.4 42.4-98.6 65.6-158.4 65.6s-116-23.2-158.4-65.6c-42.2-42.4-65.6-98.6-65.6-158.4s23.4-116 65.6-158.4c42.4-42.2 98.6-65.6 158.4-65.6s116 23.4 158.4 65.6c42.2 42.4 65.6 98.6 65.6 158.4s-23.4 116-65.6 158.4z"],"grid":0,"tags":["ios-git-commit"]},{"paths":["M447.4 692.6c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l103.2 100.8h-208c-98.4 0-114-84.6-114-176v-320.8c64.2-7 114-61.2 114-127.2 0-70.6-57.4-128-128-128s-128 57.4-128 128c0 64.6 47.8 118 110 126.8v321.2c0 28.6 0 81.8 18 126 22 54.4 66.6 82 128 82h208l-99.4 100.8c-6.2 6.2-6.2 16.4 0 22.6 3.2 3 7.2 4.6 11.4 4.6s8.2-1.4 11.4-4.6l115.2-114.8c12.6-12.6 12.6-32.8 0-45.2l-119.2-118.8zM96 192c0-53 43-96 96-96s96 43 96 96-43 96-96 96-96-43-96-96z","M850 705.2v-321.2c0-28.6 0-81.8-18-126-22-54.4-66.6-82-128-82h-208l99.4-100.8c6.2-6.2 6.2-16.4 0-22.6-3.2-3-7.2-4.6-11.4-4.6s-8.2 1.4-11.4 4.6l-115.2 114.8c-12.6 12.6-12.6 32.8 0 45.2l119.2 118.8c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-103.2-100.8h208c98.4 0 114 84.6 114 176v320.8c-64.2 7-114 61.2-114 127.2 0 70.6 57.4 128 128 128s128-57.4 128-128c0-64.6-47.8-118-110-126.8zM832 928c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"],"grid":0,"tags":["ios-git-compare"]},{"paths":["M768 448c-65.4 0-119.4 49.2-127 112.4-18.2 0-59.2-2.6-111-22.6-65.2-25.4-159.8-84.4-243-221.6 55.6-13.8 97-64.2 97-124.2 0-70.6-57.4-128-128-128s-128 57.4-128 128c0 64.6 47.8 118 110 126.8v386.6c-62.2 8.6-110 62-110 126.6 0 70.6 57.4 128 128 128s128-57.4 128-128c0-66-49.8-120.2-114-127.2v-355.2c85.4 133 181.2 191.8 248.4 218 55.6 21.6 100.2 24.8 122 24.8 0.2 0 0.4 0 0.8 0 8 62.8 61.8 111.6 127 111.6 70.6 0 128-57.4 128-128s-57.6-128-128.2-128zM160 192c0-53 43-96 96-96s96 43 96 96-43 96-96 96-96-43-96-96zM352 832c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM768 672c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"],"grid":0,"tags":["ios-git-merge"]},{"paths":["M896 192c0-70.6-57.4-128-128-128s-128 57.4-128 128c0 64.6 47.8 118 110 126.8h2v119.2l-240 118.2-240-118.2v-119c63.2-7.8 112-61.6 112-127 0-70.6-57.4-128-128-128s-128 57.4-128 128c0 64.6 47.8 118 110 126.8h2v139.2l256 126v120.6c-63.2 7.8-112 61.6-112 127 0 70.6 57.4 128 128 128s128-57.4 128-128c0-64.6-47.8-118-110-126.8h-2v-120.8l256-126v-139c63.2-8 112-61.8 112-127zM160 192c0-53 43-96 96-96s96 43 96 96-43 96-96 96-96-43-96-96zM608 831.6c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96zM768 288c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"],"grid":0,"tags":["ios-git-network"]},{"paths":["M384 192c0-70.6-57.4-128-128-128s-128 57.4-128 128c0 64.6 47.8 118 110 126.8v386.6c-62.2 8.6-110 62-110 126.6 0 70.6 57.4 128 128 128s128-57.4 128-128c0-66-49.8-120.2-114-127.2v-385.6c64.2-7 114-61.2 114-127.2zM160 192c0-53 43-96 96-96s96 43 96 96-43 96-96 96-96-43-96-96zM352 832c0 53-43 96-96 96s-96-43-96-96 43-96 96-96 96 43 96 96z","M786 705.2v-321.2c0-28.6 0-81.8-18-126-22-54.4-66.6-82-128-82h-208l99.4-100.8c6.2-6.2 6.2-16.4 0-22.6-3.2-3-7.2-4.6-11.4-4.6s-8.2 1.4-11.4 4.6l-115.2 114.8c-12.6 12.6-12.6 32.8 0 45.2l119.2 118.8c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6l-103.2-100.8h208c98.4 0 114 84.6 114 176v320.8c-64.2 7-114 61.2-114 127.2 0 70.6 57.4 128 128 128s128-57.4 128-128c0-64.6-47.8-118-110-126.8zM768 928c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96z"],"grid":0,"tags":["ios-git-pull-request"]},{"paths":["M512 96c-0.2 0-0.2 0-0.4 0 0 0 0 0-0.2 0s-0.4 0-0.4 0c-229.4 0.6-415 186.6-415 416s185.6 415.4 415 416c0.2 0 0.4 0 0.4 0s0.2 0 0.2 0 0.2 0 0.4 0c229.8 0 416-186.2 416-416s-186.2-416-416-416zM528.6 345c44.2-1.2 87-7 128.4-17 12.4 49 20.2 105.6 21.4 167.6h-149.8v-150.6zM528.6 311.6v-179.6c44.8 12.4 90.4 72.2 119.2 164-38.4 9.2-78.2 14.4-119.2 15.6zM495.4 131.6v180.2c-41.4-1.2-81.6-6.6-120.2-16 29.2-92.4 75-152.6 120.2-164.2zM495.4 345v150.4h-150.8c1.2-62 9-118.6 21.4-167.6 41.6 10 85 16 129.4 17.2zM311 495.4h-181.2c3.6-85.6 35.6-164 86.6-226 37 20.4 76.4 37.2 117.6 49.6-13.6 53-21.6 112.8-23 176.4zM311 528.6c1.2 63.4 9.2 123.4 22.8 176.4-41.2 12.6-80.4 29.2-117.6 49.6-51-62-82.8-140.4-86.6-226h181.4zM344.6 528.6h150.8v150.2c-44.4 1.2-87.8 7.2-129.4 17.4-12.4-49-20.2-105.6-21.4-167.6zM495.4 712.2v180.4c-45.2-11.8-91-71.8-120.2-164.2 38.6-9.6 78.8-15 120.2-16.2zM528.6 892v-180c41 1.2 80.8 6.6 119.4 15.8-29 92-74.4 151.8-119.4 164.2zM528.6 678.8v-150.2h149.8c-1.2 61.8-9 118.4-21.4 167.4-41.4-10-84.2-16-128.4-17.2zM711.8 528.6h182.4c-3.6 85.6-35.6 163.8-86.6 226-37.4-20.6-77-37.4-118.6-50 13.6-53 21.6-112.6 22.8-176zM711.8 495.4c-1.2-63.4-9.2-123.2-22.6-176.2 41.6-12.6 81.2-29.4 118.4-49.8 51 62 83 140.4 86.6 226.2h-182.4zM784.8 243.8c-33.2 17.6-68 32.2-104.6 43.2-19.4-62.6-46.8-113.6-79-147.2 70.8 17 134 53.8 183.6 104zM421.6 140.2c-32.2 33.4-59.4 84.4-78.6 146.6-36.2-11-70.8-25.4-103.6-43 49-50 111.8-86.6 182.2-103.6zM239.2 780c32.8-17.6 67.6-32 103.6-43 19.4 62.4 46.6 113.2 78.8 146.8-70.4-17-133.2-53.6-182.4-103.8zM601.2 884.2c32.4-33.6 59.6-84.6 79.2-147.4 36.6 11 71.4 25.6 104.6 43.2-49.6 50.4-113 87.2-183.8 104.2z"],"grid":0,"tags":["ios-globe-outline"]},{"paths":["M512 96c-0.2 0-0.2 0-0.4 0 0 0 0 0-0.2 0s-0.4 0-0.4 0c-229.4 0.6-415 186.6-415 416s185.6 415.4 415 416c0.2 0 0.4 0 0.4 0s0.2 0 0.2 0 0.2 0 0.4 0c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 894.8c-0.2 0-0.2 0-0.4 0 0 0 0 0-0.2 0s-0.4 0-0.4 0c-210.8-0.6-381.8-171.8-381.8-382.8s170.8-382.2 381.8-382.6c0.2 0 0.2 0 0.4 0 0 0 0.2 0 0.2 0 0.2 0 0.2 0 0.4 0 211.4 0 382.8 171.4 382.8 382.8 0 211.2-171.4 382.6-382.8 382.6z","M644.6 343.6c-37.4 9-76 14.4-115.8 15.6v136.2h135.2c-1.2-56.2-8.2-107.2-19.4-151.8z","M528.6 165v163.8c37-1.2 73-6 107.6-14.4-26.2-82.8-67-137.2-107.6-149.4z","M386.8 314.2c35 8.4 71.2 13.4 108.4 14.6v-164.2c-40.6 11.8-82 66.2-108.4 149.6z","M761.2 266.8c-45.2-46-103-79.6-167.8-95 29.6 30.6 54.4 77.4 72.2 134.6 33.4-10.2 65.4-23.4 95.6-39.6z","M694.6 495.4h166.6c-3.6-77.6-32.6-148.8-79-205.2-34.2 18.8-70.4 34.2-108.2 45.6 12.2 48 19.4 102.2 20.6 159.6z","M359 495.4h136.4v-136.2c-40.2-1.2-79.2-6.6-116.8-15.8-11.4 44.6-18.4 95.8-19.6 152z","M664 528.6h-135.4v136c39.8 1.2 78.6 6.4 116 15.6 11.2-44.4 18.2-95.6 19.4-151.6z","M378.6 680.4c37.6-9.2 76.6-14.6 116.8-15.8v-136h-136.4c1.2 56.2 8.2 107.4 19.6 151.8z","M495.4 859.2v-164.2c-37.2 1.2-73.6 6.2-108.6 14.6 26.4 83.4 67.8 138 108.6 149.6z","M593.4 852.2c64.8-15.6 122.6-49 168-95.2-30.2-16.2-62.2-29.4-95.6-39.6-17.8 57.4-42.8 104-72.4 134.8z","M429.4 172.2c-64.2 15.6-121.6 49-166.6 94.8 30 16 61.6 29.2 94.6 39.2 17.8-57 42.6-103.4 72-134z","M674 688.2c38 11.4 74.2 26.8 108.4 45.6 46.4-56.4 75.4-127.6 79-205.2h-166.6c-1.4 57.4-8.6 111.4-20.8 159.6z","M528.6 695v164c40.6-12.2 81.4-66.6 107.6-149.6-34.6-8.4-70.6-13.2-107.6-14.4z","M349.2 335.6c-37.6-11.4-73.6-26.6-107.4-45.4-46.4 56.4-75.4 127.6-79 205.2h165.8c1-57.6 8.4-111.8 20.6-159.8z","M328.4 528.6h-165.8c3.6 77.6 32.6 148.8 79 205.2 33.8-18.6 69.8-34 107.4-45.4-12-48-19.4-102.2-20.6-159.8z","M262.6 757c45 45.8 102.4 79.2 166.8 94.8-29.4-30.6-54.2-77.2-72-134.2-33 10.2-64.8 23.4-94.8 39.4z"],"grid":0,"tags":["ios-globe"]},{"paths":["M896 384v-32h-224v-224h-32v224h-256v-224h-32v224h-224v32h224v256h-224v32h224v224h32v-224h256v224h32v-224h224v-32h-224v-256h224zM640 640h-256v-256h256v256z"],"grid":0,"tags":["ios-grid-outline"]},{"paths":["M384 384h256v256h-256v-256z","M128 128v768h768v-768h-768zM832 384h-160v256h160v32h-160v160h-32v-160h-256v160h-32v-160h-160v-32h160v-256h-160v-32h160v-160h32v160h256v-160h32v160h160v32z"],"grid":0,"tags":["ios-grid"]},{"paths":["M924.8 433.8l-68.4-67.8c-2.2-2.2-5-3.2-7.8-3.2s-5.8 1-7.8 3.2l-7.4 7.4c-10.6 0-27.2-1.4-36.2-10.4-13.8-13.6 2.2-40.6-10.2-58-12.2-17.4-31.8-39.4-45.8-53.4s-69.2-66.8-162.4-105c-32.8-13.4-65-18.6-93.6-18.6-52.6 0-93.8 17-108.4 30.4-10.8 10-22.2 28-6.2 28 1.4 0 3-0.2 4.8-0.4 8.8-1.4 26.4-3 46.4-3 31.2 0 68.4 4.2 88.2 20 32.4 26 59 60.6 61.2 105.4 2.2 43-12.4 68-68.6 123.6l-11.4-6c-2.6-1.4-5.6-2-8.4-2-5 0-9.8 1.8-12.6 4.6 0 0-8.8 8.2-92.8 91.6-124.6 123.2-278.2 247.4-278.2 247.4-4.4 4.4-4.4 11.4 0 15.6l110.4 109.6c2.2 2.2 5 3.2 7.8 3.2s5.8-1 7.8-3.2c0 0 125.2-152.4 249.4-275.6 84-83.4 92.2-92 92.2-92 4.4-4.4 7.2-13.2 2.6-20.8l-7.8-13c50.2-49.8 70.4-71 95-77.8 8-2.2 16.6-3 25.4-3 19.2 0 38 4.4 46.6 9 10.2 5.4 19.4 22.6 20.4 37.2l-19 19c-4.4 4.4-4.4 11.4 0 15.6l68.4 67.8c2.2 2.2 5 3.2 7.8 3.2s5.8-1 7.8-3.2l110.4-109.6c4.6-4.4 4.6-11.6 0.4-15.8zM452.4 594.4c-98.8 98-198.8 215-236.4 259.6l-77.8-77.2c45.2-37.4 163-136.4 261.4-234.2 46.8-46.4 70.2-69.4 81.6-80.6l51.8 51.8c-11.4 11.8-34.6 35-80.6 80.6zM806.4 521.8l-38.6-38.4 4-4 6.4-10.4 3-14.6c-1.6-22.4-15-51.2-37.2-63-14.6-7.8-38.8-12.8-61.8-12.8-12.2 0-23.6 1.4-34 4.2-31.2 8.6-53 30.4-100.8 77.8l-8 8-3.4 3.2-14.2-14.2 2.8-2.8c57.4-56.8 80.8-90 78-147.8-2.2-48.2-26.8-91.6-73-129v0 0c-9.2-7.4-20.8-13.2-34.6-17.6 24.4 1.2 48.4 6.4 71.4 15.8 78.6 32.2 129 75.2 152 98 12.4 12.2 30.2 32.4 41.4 47.8 0.2 2.4-0.2 7-0.4 10.4-1 13.4-2.4 36.4 15 53.6 13.2 13 33 20 58.8 20l15.2-2.4 38.6 38.2-80.6 80z"],"grid":0,"tags":["ios-hammer-outline"]},{"paths":["M491 426c-2.6-1.4-5.6-2-8.4-2-5 0-9.8 1.8-12.6 4.6 0 0-8.8 8.2-92.8 91.6-124.4 123.2-278 247.4-278 247.4-4.4 4.4-4.4 11.4 0 15.6l110.4 109.6c2.2 2.2 5 3.2 7.8 3.2s5.8-1 7.8-3.2c0 0 125.2-152.4 249.4-275.6 84-83.4 92.2-92 92.2-92 4.4-4.4 7.2-13.2 2.6-20.8l-7.8-12.8-59.4-59.6-11.2-6z","M924.8 433.8l-68.4-67.8c-2.2-2.2-5-3.2-7.8-3.2s-5.8 1-7.8 3.2l-7.4 7.4c-10.6 0-27.2-1.4-36.2-10.4-13.8-13.6 2.2-40.6-10.2-58-12.2-17.4-31.8-39.4-45.8-53.4s-69.2-66.8-162.4-105c-32.8-13.4-65-18.6-93.6-18.6-52.6 0-93.8 17-108.4 30.4-10.8 10-22.2 28-6.2 28 1.4 0 3-0.2 4.8-0.4 8.8-1.4 26.4-3 46.4-3 31.2 0 68.4 4.2 88.2 20 32.4 26 59 60.6 61.2 105.4 1.8 36.8-8.6 60.4-46.8 101.4l59.8 59.8c35-34.4 52.6-50.4 73-56 8-2.2 16.6-3 25.4-3 19.2 0 38 4.4 46.6 9 10.2 5.4 19.4 22.6 20.4 37.2l-19 19c-4.4 4.4-4.4 11.4 0 15.6l68.4 67.8c2.2 2.2 5 3.2 7.8 3.2s5.8-1 7.8-3.2l110.4-109.6c4-4.4 4-11.6-0.2-15.8z"],"grid":0,"tags":["ios-hammer"]},{"paths":["M546 127.8c21 0 38 17 38 37.8v265.2c0 8.8 7.2 16 16 16s16-7.2 16-16v-233.2c0-20.8 17-37.8 38-37.8s38 17 38 37.8v297c0 8.8 7.2 16 16 16s16-7.2 16-16v-201.2c0-20.8 17-37.8 38-37.8s38 17 38 37.8v428.6c0 101.6-57.2 174-140.4 174 0 0-60 0-103 0s-73.2-22.2-73.2-22.2c-77.8-46.8-169.6-177.2-204-216.8-35.8-41-70.2-76.4-48.4-98 11.2-10.6 23.4-15.6 36.2-15.6 24.4 0 52.4 17 83 44.4l49.8 43.4v-401.6c0-20.8 17-37.8 38-37.8s38 17 38 37.8v233.2c0 8.8 7.2 16 16 16s16-7.2 16-16v-297c-0-20.8 17-38 38-38zM545.8 96c-38.6 0-69.8 31.2-69.8 69.8v5.2c-10-7-24-11.2-38-11.2-38.6 0-70 31.4-70 69.8v331c-38-33.8-70.4-49-100.6-49-21.8 0-41.6 8.2-58.6 24.2l-0.8 0.4c-11.4 11.4-27.4 36.4-5 76.2 10.2 17.8 26.4 36.4 43.6 56 2.6 3 5.4 6.2 8.2 9.2 7 8 17.2 21 29.2 36 46.2 58.4 116.2 147.2 181.8 187 7.6 5.2 42.2 27.4 90.6 27.4h103c50 0 94.8-22 126.2-60.8 30.4-37 46.4-87.8 46.4-145.2v-428.6c0-38.4-31.4-69.8-70-69.8-14 0-26 4.2-38 11.2v-37.2c0-38.4-31.6-69.8-70.2-69.8-15.8 0-30.4 5.2-42.2 14.2-9.8-26.8-35.6-46-65.8-46v0z"],"grid":0,"tags":["ios-hand-outline"]},{"paths":["M790 234c-23.2 0-42 18.4-42 41v218c0 9.6-9.2 17.2-19 17.2s-19-7.8-19-17.2v-321.4c0-22.6-18.8-41-42-41s-42 18.4-42 41v252.4c0 9.6-7.2 17.2-17 17.2s-17-7.8-17-17.2v-287c0-22.6-18.8-41-42-41s-42 18.4-42 41v321.6c0 9.6-8.2 17.2-18 17.2s-18-7.8-18-17.2v-252.6c0-22.6-20.8-41-44-41s-44 18.4-44 41v434.8l-51.8-47.2c-52.2-45.2-96.6-64.6-132.6-31.2-24.2 23.4 13.8 61.6 53.4 106 38.4 42.8 140 184.6 226.4 235.2 0 0 33.4 24.4 81.2 24.4s114.4 0 114.4 0c92.2 0 156.8-79 156.8-189v-464c0.2-22.4-18.6-41-41.8-41z"],"grid":0,"tags":["ios-hand"]},{"paths":["M512 128c51.8 0 102.2 10.2 149.4 30.2 45.8 19.4 86.8 47 122 82.4 35.2 35.2 63 76.4 82.4 122 20 47.4 30.2 97.6 30.2 149.4s-10.2 102.2-30.2 149.4c-19.4 45.8-47 86.8-82.4 122-35.2 35.2-76.4 63-122 82.4-47.4 20-97.6 30.2-149.4 30.2s-102.2-10.2-149.4-30.2c-45.8-19.4-86.8-47-122-82.4-35.2-35.2-63-76.4-82.4-122-20-47.2-30.2-97.6-30.2-149.4s10.2-102.2 30.2-149.4c19.4-45.8 47-86.8 82.4-122 35.2-35.2 76.4-63 122-82.4 47.2-20 97.6-30.2 149.4-30.2zM512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416v0z","M704 448c0 26.51-21.49 48-48 48s-48-21.49-48-48c0-26.51 21.49-48 48-48s48 21.49 48 48z","M416 448c0 26.51-21.49 48-48 48s-48-21.49-48-48c0-26.51 21.49-48 48-48s48 21.49 48 48z","M512 738c96.6 0 177-70 193-162h-386c16 92 96.4 162 193 162z"],"grid":0,"tags":["ios-happy-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416c0-229.8-186.2-416-416-416zM656 400c26.6 0 48 21.4 48 48s-21.4 48-48 48-48-21.4-48-48 21.4-48 48-48zM368 400c26.6 0 48 21.4 48 48s-21.4 48-48 48-48-21.4-48-48 21.4-48 48-48zM512 738c-96.6 0-177-70-193-162h386.2c-16.2 92-96.6 162-193.2 162z"],"grid":0,"tags":["ios-happy"]},{"paths":["M688 423.6c-8.8 0-16-7.2-16-16 0-80-77.4-144-160-144s-160 64-160 144c0 8.8-7.2 16-16 16s-16-7.2-16-16c0-50 23.6-88.6 59.2-123.2 35.2-34.2 82.4-52.8 132.8-52.8s97.6 18.8 132.8 52.8c35.6 34.4 59.2 73 59.2 123.2 0 8.8-7.2 16-16 16z","M816 520h-48v-95.6c0-140.8-115.2-256-256-256v0 0c-140.8 0-256 115.2-256 256v95.6h-48c-79.2 0-144 64.8-144 144v31.6c0 79.2 64.8 144.4 144 144.4h48c0 8 7.2 15.8 16 15.8s16-7.4 16-16.2v-415.2c0-59.6 23.4-115.8 65.8-158.2s98.6-65.8 158.2-65.8c60 0 115.8 23.4 158.2 65.8s65.8 98.6 65.8 158.2v415.2c0 8.8 7.2 16.2 16 16.2s16-7.8 16-15.8h48c79.2 0 144-65.2 144-144.4v-31.6c0-79.2-64.8-144-144-144zM256 808h-48c-29.8 0-57.8-11.8-79-33.2s-33-49.4-33-79.2v-31.6c0-29.8 11.6-57.8 33-79s49.2-33 79-33h48v256zM928 695.6c0 29.8-11.6 58-33 79.2s-49.2 33.2-79 33.2h-48v-256h48c29.8 0 57.8 11.6 79 33s33 49.2 33 79v31.6z"],"grid":0,"tags":["ios-headset-outline"]},{"paths":["M816 520h-48v-95.6c0-140.8-115.2-256-256-256v0 0c-140.8 0-256 115.2-256 256v95.6h-48c-79.2 0-144 64.8-144 144v31.6c0 79.2 64.8 144.4 144 144.4h48c0 8 7.2 15.8 16 15.8s16-7.4 16-16.2v-413.6c16.4 0 42 0 48 0 8.8 0 16-8 16-16.8 0-80 77.4-144.8 160-144.8s160 64.6 160 144.6c0 8.8 7.2 17.2 16 17.2 5.8 0 31 0 48 0v413.6c0 8.8 7.2 16.2 16 16.2s16-7.8 16-15.8h48c79.2 0 144-65.2 144-144.4v-31.8c0-79.2-64.8-144-144-144z"],"grid":0,"tags":["ios-headset"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416c0-229.8-186.2-416-416-416zM783.6 240.4c35.2 35.2 63 76.4 82.4 122 5.4 12.6 10 25.6 14 38.8l-202.2 13.6c-16.4-28-39.8-51.4-67.8-68l13-202.6c13 4 26 8.6 38.6 14 45.6 19.4 86.6 47 122 82.2zM896 512c0 27-2.8 53.4-8.2 79.2l-195.2-14c7.4-20.4 11.4-42.4 11.4-65.4 0-22.8-4-44.8-11.4-65.2l195.2-14c5.4 26 8.2 52.4 8.2 79.4zM512 672c-88.2 0-160-71.8-160-160s71.8-160 160-160 160 71.8 160 160c0 88.2-71.8 160-160 160zM128 512c0-27 2.8-53.4 8.2-79.2l195.2 14c-7.4 20.4-11.4 42.2-11.4 65.2 0 22.8 4 44.8 11.4 65.2l-195.2 14.2c-5.4-26-8.2-52.4-8.2-79.4zM591.2 136.2l-13.6 195.4c-20.4-7.4-42.6-11.6-65.6-11.6s-45 4-65.6 11.4l-13.8-195.2c25.8-5.4 52.4-8.2 79.2-8.2 27.2 0 53.6 2.8 79.4 8.2zM240.4 240.4c35.2-35.2 76.4-63 122-82.4 12.6-5.4 25.6-10 38.6-14l13 202.6c-27.8 16.6-51.2 40-67.8 67.8l-202.2-13.4c4-13 8.6-26 14-38.6 19.6-45.6 47.2-86.6 82.4-122zM240.4 783.6c-35.2-35.2-63-76.4-82.4-122-5.4-12.6-10-25.6-14-38.6l202.6-13c16.4 27.8 39.8 51 67.6 67.6l-13.2 202.4c-13-4-26-8.6-38.6-14-45.6-19.6-86.6-47.2-122-82.4zM432.8 887.8l14-195.2c20.4 7.4 42.4 11.4 65.2 11.4 23 0 45.2-4 65.8-11.6l13.6 195.4c-25.8 5.4-52.4 8.2-79.2 8.2-27.2 0-53.6-2.8-79.4-8.2zM783.6 783.6c-35.2 35.2-76.4 63-122 82.4-12.6 5.4-25.6 10-38.6 14l-13.4-202.2c28.2-16.6 51.6-40.2 68.2-68.4l202.2 13.6c-4 13-8.6 26-14 38.8-19.6 45.4-47.2 86.4-82.4 121.8z"],"grid":0,"tags":["ios-help-buoy-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416c0-229.8-186.2-416-416-416zM783.6 240.4c35.2 35.2 63 76.4 82.4 122 5.4 12.6 10 25.6 14 38.8l-202.2 13.6c-16.4-28-39.8-51.4-67.8-68l13-202.6c13 4 26 8.6 38.6 14 45.6 19.4 86.6 47 122 82.2zM512 672c-88.2 0-160-71.8-160-160s71.8-160 160-160 160 71.8 160 160c0 88.2-71.8 160-160 160zM240.4 240.4c35.2-35.2 76.4-63 122-82.4 12.6-5.4 25.6-10 38.6-14l13 202.6c-27.8 16.6-51.2 40-67.8 67.8l-202.2-13.4c4-13 8.6-26 14-38.6 19.6-45.6 47.2-86.6 82.4-122zM240.4 783.6c-35.2-35.2-63-76.4-82.4-122-5.4-12.6-10-25.6-14-38.6l202.6-13c16.4 27.8 39.8 51 67.6 67.6l-13.2 202.4c-13-4-26-8.6-38.6-14-45.6-19.6-86.6-47.2-122-82.4zM783.6 783.6c-35.2 35.2-76.4 63-122 82.4-12.6 5.4-25.6 10-38.6 14l-13.4-202.2c28.2-16.6 51.6-40.2 68.2-68.4l202.2 13.6c-4 13-8.6 26-14 38.8-19.6 45.4-47.2 86.4-82.4 121.8z"],"grid":0,"tags":["ios-help-buoy"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z","M519.2 292c-86.4 0-134.6 40.6-135.2 124.4h37.6c-1.2-60.8 31-93 95.8-93 46.4 0 85.2 32.4 85.2 79.6 0 30.6-16.6 55.4-38.8 76.2-45.2 41.6-58 72-60.2 129h38c2.2-51.6 1-61.4 46.6-106.6 30.4-28.4 51.8-56.6 51.8-100.4-0-68.4-54.8-109.2-120.8-109.2z","M520.6 664.6c-18.8 0-34 15-34 33.6s15.2 33.8 34 33.8c18.8 0 34-15 34-33.8 0-18.6-15.2-33.6-34-33.6z"],"grid":0,"tags":["ios-help-circle-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM520.6 732c-18.8 0-34-15-34-33.8 0-18.6 15.2-33.6 34-33.6s34 15 34 33.6c0 18.8-15.2 33.8-34 33.8zM588.2 501.4c-45.6 45-44.4 54.8-46.6 106.6h-38c2.2-57 15-87.4 60.2-129 22-20.6 38.8-45.4 38.8-76.2 0-47.2-38.8-79.8-85.2-79.8-64.8 0-97 32.8-95.8 92.8h-37.6c0.6-84 48.8-124.2 135.2-124.2 66 0 120.8 40.8 120.8 109.2 0 43.8-21.4 72.4-51.8 100.6z"],"grid":0,"tags":["ios-help-circle"]},{"paths":["M520.6 732c-18.8 0-34-15-34-33.8 0-18.6 15.2-33.6 34-33.6s34 15 34 33.6c0 18.8-15.2 33.8-34 33.8zM588.2 501.4c-45.6 45-44.4 54.8-46.6 106.6h-38c2.2-57 15-87.4 60.2-129 22-20.6 38.8-45.4 38.8-76.2 0-47.2-38.8-79.8-85.2-79.8-64.8 0-97 32.8-95.8 92.8h-37.6c0.6-84 48.8-124.2 135.2-124.2 66 0 120.8 40.8 120.8 109.2 0 43.8-21.4 72.4-51.8 100.6z"],"grid":0,"tags":["ios-help"]},{"paths":["M760.8 327.2c-12.8-6.2-24.8-9.2-24.8-9.2 0-123.8-100.2-226-224-226s-224 102.4-224 226.2c0 0-11.4 1.8-24.8 8.8-24.4 12.8-39.4 39.6-39.4 69 0 44.2 35.8 80 80 80 25 0 63.4-11.6 78.2-29.6 30.6 30.2 75.6 45.6 129.8 45.6s99.4-15.4 129.8-45.6c14.6 18 53 29.6 78.2 29.6 44.2 0 80-35.8 80-80 0.2-29.2-17.4-58.2-39-68.8zM720 444c-9 0-21.4-2.4-32.4-6.2-12.8-4.6-21-11.6-21-11.6-10.4-6.8-22.2-27.4-22.2-27.4l-25 24.8c-24 23.8-61 36.4-107.4 36.4-46.2 0-83.4-12.6-107.4-36.4l-25-24.8c0 0-9.2 17.8-22.2 27.4-4 3-8.2 7-21 11.6-10.8 3.8-23.2 6.2-32.4 6.2-26.6 0-48-21.6-48-48 0-16.4 8-31.2 21.4-40 0 0 8.2-5 16.2-7.8 9.2-3 16.8-4 16.8-4 20.2 15.6 42.8 21 42.8 21-17.4-12-32.8-43.4-32.8-43.4v-3.8c0-51.6 20-100.2 56.4-137 36-36.6 84.2-57 135.2-57s99.2 20.2 135.6 57c36.4 36.8 56.4 85.6 56.4 137v4.2c0 0-14 31.2-31.2 43.2 0 0 22.4-5.4 42.6-20.8 0 0 7-0.4 15 2.6s16.2 9 16.2 9c13.4 9 21.4 23.6 21.4 40 0 26.2-21.6 47.8-48 47.8z","M382.2 480.4c-0.2 0.2-0.4 0.4-0.6 0.6l0.6-0.6c0.2 0.2 0 0 0 0z","M642 480.4c-30.6 30.2-75.8 45.6-130 45.6-54 0-99.2-15.2-129.6-45.4l-0.8 0.4c-8 9.4-22.4 17-37.8 22l109.8 375c1.8 5.2 19 54 58.6 54 18.2 0 35-11.8 47.4-29.4 7.4-10.6 11.2-22.8 11.8-24.8l110.6-374c-16.4-5.4-32-13.4-40-23.4zM512.2 567.4l71.6 49.2-71.6 49.2-71.6-49.2 71.6-49.2zM395.6 585.6l-21.4-69.6 10-6c19 20.8 72.2 36.2 103.6 40.4l1 0.6-85.8 59-7.4-24.4zM410.6 637.2l6.4-4.4 71.6 49.2-54.2 37.2-23.8-82zM466.2 828.6l-11.2-38.6 33.6 23.2-22.4 15.4zM512.2 906c-22.6 0-34.2-36.8-34.2-36.8l-2-7.6 36.2-26.2 36.4 26.4-1.8 7.2c-0 0.2-11.4 37-34.6 37zM558.6 828.8l-22.8-15.6 34.2-23.6-11.4 39.2zM581.8 749l-69.6 48-69-47.4-0.8-3 70-48 70.4 48.4-1 2zM590.4 719.6l-54.6-37.6 71.6-49.2 7 4.8-24 82zM629.6 585l-7.4 25.4-14.8-10.2-71.6-49.2 1-0.6c31.2-4.2 74-16.4 103.4-37.6l8 5.2-18.6 67z"],"grid":0,"tags":["ios-ice-cream-outline"]},{"paths":["M438.4 801.8l14.4 44.8 28.8-18z","M571.8 846.8l14.6-45.6-44 27.4z","M481.6 523.8l-1.2-0.8c-40.2-5-73.8-19.6-98.2-43.8-8.2 10-23.6 18-40 23.2l19.8 61.6 9.2 28.4 18.4-11.4 92-57.2z","M389.4 619l-8.2 5 30.8 95.6 69.6-43.4z","M512 695.2l-92.2 57.2 3.4 2.2 88.8 55.2 92.2-57.4-1.6-1z","M604.2 600l-92.2-57.2-92.2 57.2 92.2 57.4z","M641.8 479.4c-24.4 24.2-58 38.8-98.2 43.8l-1.2 0.8 111.2 69.2 9.6-29.6 19.6-60.6c-16.8-5.4-32.6-13.4-41-23.6z","M462.8 878l5.2 16c0 0 15 38 44 38 30 0 44.4-38 44.4-38l5-15.6-49.4-31-49.2 30.6z","M542.4 676.2l70.2 43.8 31-95.6-9-5.4z","M760.8 327.8c-22 25.4-56.2 33.6-56.2 33.6 17.4-12 31.2-43.2 31.2-43.2 0-0.6 0-1 0-1.6 0.2-124-100-224.6-223.8-224.6s-224 101.4-224 225.4c0 0.6 0 2.6 0 2.6h0.6c0 0 14 30.2 31.2 42.2 0 0-34.4-8.6-56.4-34.2-23.6 14-39.6 39.4-39.6 69 0 44.2 35.8 80 80 80 25 0 63.4-11.6 78.2-29.8 30.6 30.4 75.6 45.6 129.8 45.6s99.4-15.4 129.8-45.8c14.6 18.2 53 29.6 78.2 29.6 44.2 0 80-36 80-80.2 0.2-29-15.6-54.6-39-68.6z"],"grid":0,"tags":["ios-ice-cream"]},{"paths":["M128 128v768h768v-768h-768zM864 864h-706v-704h706v704z","M640 352c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M192 192v512h640v-512h-640zM589.2 672h-282.4l141.2-200.4 141.2 200.4zM576.8 598.8l44.6-63.2 96 136.4h-89.2l-51.4-73.2zM800 672h-43.4l-135.2-192-64.2 91-109.2-155-180.2 256h-43.8v-448h576v448z"],"grid":0,"tags":["ios-image-outline"]},{"paths":["M895.6 128.4l-767.6-0.4v768h768v-768l-0.4 0.4zM864 864h-704v-704h704v704z","M832 192h-640v512h640v-512zM608.4 319.6c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32c0-17.8 14.4-32 32-32zM307 672l141.4-201 141.6 201h-283zM629.2 672.2v0l-51.8-73.8 44.6-63.2 96.4 137h-89.2z"],"grid":0,"tags":["ios-image"]},{"paths":["M780.8 243.8l-12.8-179.8-704 48 46.6 639.8 44.4-3.2-11 157.8 768 53.6 48-704-179.2-12.2zM138.4 717.8l-40.2-574.6 640.4-44.8 10 143.2-32.2-2.2-7.4-107-574.8 40.4 30.6 436.4-7.6 107.2-18.8 1.4zM193.2 204l-12.4 175.8-12.4-177.4 510.8-35.8 5 70.6-491-33.2zM881.2 925.8l-705-49.2 44.6-638.6 705 49.2-44.6 638.6z","M720.597 465.539c-17.631-1.234-30.923-16.527-29.689-34.158s16.527-30.923 34.158-29.689c17.631 1.234 30.923 16.527 29.689 34.158s-16.527 30.923-34.158 29.689z","M252.6 272.4l-31.2 447 639 44.6 31.2-447-639-44.6zM338.2 695.4l155-190.2 126.8 209.8-281.8-19.6zM659.2 717.8l-46.4-76.6 49-60 86.4 142.8-89-6.2zM830.6 729.8l-43.4-3-121.6-201-70.4 86.4-98.2-162.4-197.8 242.8-43.6-3 26.8-383.2 575.2 40.2-27 383.2z"],"grid":0,"tags":["ios-images-outline"]},{"paths":["M780.8 243.8l-12.8-179.8-704 48 46.6 639.8 44.4-3.2-11 157.8 768 53.6 48-704-179.2-12.2zM138.4 717.8l-40.2-574.6 640.4-44.8 10 143.2-32.2-2.2-7.4-107-574.8 40.4 30.6 436.4-7.6 107.2-18.8 1.4zM881.2 925.8l-705-49.2 44.6-638.6 705 49.2-44.6 638.6z","M252.6 272.4l-31.2 447 639 44.6 31.2-447-639-44.6zM338.2 695.4l155-190.2 126.8 209.8-281.8-19.6zM659.2 717.8l-46.4-76.6 49-60 86.4 142.8-89-6.2zM754.8 435.8c-1.2 17.6-16.6 31-34.2 29.6s-31-16.6-29.8-34.2c1.2-17.6 16.6-31 34.2-29.6 17.8 1.2 31.2 16.6 29.8 34.2z"],"grid":0,"tags":["ios-images"]},{"paths":["M543 344c0 22.091-17.909 40-40 40s-40-17.909-40-40c0-22.091 17.909-40 40-40s40 17.909 40 40z","M544 688v-256h-96v16h32v240h-32v16h128v-16z","M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z"],"grid":0,"tags":["ios-information-circle-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM503 304c22.2 0 40 18 40 40s-18 40-40 40c-22 0-40-18-40-40s17.8-40 40-40zM576 704h-128v-16h32v-240h-32v-16h96v256h32v16z"],"grid":0,"tags":["ios-information-circle"]},{"paths":["M543 344c0 22.091-17.909 40-40 40s-40-17.909-40-40c0-22.091 17.909-40 40-40s40 17.909 40 40z","M544 688v-256h-96v16h32v240h-32v16h128v-16z"],"grid":0,"tags":["ios-information"]},{"paths":["M851 269.6c9.4-11.8 15-27 15-43.2 0-38.4-31.2-69.8-69.6-69.8-16.4 0-31.4 5.6-43.2 15-68-48.4-150-75.6-239.8-75.6-229.8-0-417.4 185-417.4 415.2s187.4 416.8 417.2 416.8 414.8-186.6 414.8-416.8c0-90-28.6-173.4-77-241.6zM783.6 783.4c-35.2 35.2-76.4 63.2-122.2 82.6-47.4 20-96.4 30.4-148.4 30.4-51.8 0-103.4-10.2-150.8-30.4-45.8-19.4-86.8-47-122.2-82.6-35.2-35.2-63-76.6-82.4-122.4-20-47.4-30.2-97.8-30.2-149.8 0-51.8 10.2-102.4 30.2-149.8 19.4-45.8 47-87 82.4-122.4s76.4-63.2 122.2-82.6c47.4-20 98.8-28.2 150.8-28.2 51.8 0 101 8 148.4 28.2 25.4 10.8 49.4 24.2 71.8 40-4.2 9-6.6 19-6.6 29.8 0 38.4 31.2 69.8 69.6 69.8 10.6 0 20.6-2.4 29.8-6.6 15.8 22.4 29.2 46.4 40 72 20 47.4 30.2 97.8 30.2 149.8 0 51.8-10.2 102.4-30.2 149.8-19.4 45.8-47 87-82.4 122.4z","M513 320.2c-106 0-192 85.6-192 191.8s85.8 192.2 192 192.2c106 0 192-86 192-192.2s-86-191.8-192-191.8z"],"grid":0,"tags":["ios-ionic"]},{"paths":["M935.4 538.4c-8.6-61.8-28.8-114.6-67.6-114.6l-15.2 0.2c-61.2-124-188.4-207-333.2-207-7 0-14 0.2-21 0.6-171.6 9.6-309.4 133.4-343.4 293.6l-22.8 3.2c-34.4 4.8-53.8 69.6-43.2 145 10 72.4 44.2 128 77.2 128 1.4 0 2.8 0 4-0.2l31.4-4.4c65.8 107 184.2 177.4 317 177.4 7 0 14-0.2 21-0.6 170.4-9.4 307.6-131.8 342.8-290.4l14.8-0.8c30.4-5 47.6-62.8 38.2-130zM212.4 748.8l-46.2 6.4c-2.2-0.6-11.2-6-21.6-24.4-11.4-20-19.8-47-23.8-76s-3.2-57.2 2.2-79.6c5-20.4 12.2-28 14.2-29.4l43.2-6c14.4 25.8 27.2 60 33 98.6 6 41.8 8 81.4-1 110.4zM902.2 610.6c-3.6 16-8.6 23.6-11 26l-35 2-5.2 23.6c-8 35.8-21.6 69.8-40.6 101.4-18.8 31-42.2 58.8-69.8 82.4-57.2 49.2-127.4 77.4-202.8 81.6-6.4 0.4-12.8 0.6-19.2 0.6-58.8 0-116.8-15.4-167.8-44.4-49.8-28.4-92-69-121.8-117.8l-10.2-16.6c16-23.8 25.6-63.2 19.2-115-5.6-45.2-30.8-81-54.8-101.6l3.2-14.8c15.2-71.6 54.2-137.4 109.8-185.8 57.4-49.8 128.2-78.2 204.2-82.4 6.4-0.4 13.6-0.6 19.6-0.6 64.4 0 126.4 18 180.6 52 53.2 33.4 95.8 80.8 123.4 137l7.2 15c16.2 38 25 74.2 27.8 115 3-50.6-4.2-85.4-14.2-112l23-0.2c6.8 0 13.8 11.8 16.6 17 8.4 16 15 40.2 19.2 70.2 3.4 24.2 3 48.2-1.4 67.4z","M543.961 698.821c16.985-0.944 31.519 12.059 32.464 29.044s-12.059 31.519-29.044 32.464c-16.985 0.944-31.519-12.059-32.464-29.044s12.059-31.519 29.044-32.464z","M705.6 689.6c-17 1-30 15.4-29 32.4s15.4 30 32.4 29c17-1 30-15.4 29-32.4-0.8-17-15.4-30-32.4-29z","M336 147.2c4.2 2.8 10 4.8 17.2 6 5 0.8 10.6 1.2 16.6 1.2 2.4 0 4.8 0 7.2-0.2 2 0 3.8-0.2 5.8-0.4-0.8-0.8-1.6-1.8-2.4-2.6-0.8 0-1.8 0-2.6 0s-1.6 0-2.4 0c-7.6 0-14.8-0.6-20.8-1.8-7-1.4-13.4-4.2-16.8-6.8-3.2-2.8-2.6-7.4-2.6-7.4 0.6-5.2 4.8-9.6 10.8-14.8 5.4-4.6 12.8-9.4 21.6-14l6.2-3c-1.6 6.6-1.8 13.8-0.4 21 4.2 21.8 21.8 37.8 42.8 40.8l9.4 46.2 31.6-6.4-9.2-45.6c18.8-10.2 29.6-31.6 25.6-53.8-1.4-7-4-13.4-7.8-19-3.6-0.6-8.6-1-14.4-1-11.2 0-26.2 1.2-44 5.2 2.2-0.6 4.2-1.4 6.4-2 15.2-4.2 29-7 43-8.4 17.2-2 30-0.6 33.2-0.2s6 1 8.6 1.8c-1.6 2.4-2.4 5.4-2.4 8.4 0 6.6 4.2 12.4 10 14.8-0.4 0.6-1 1.2-1.4 1.8-1.6 1.8-3.6 3.8-5.8 5.6s-4.4 3.6-7 5.4l-13 7.6c-0.2 1-0.4 2-0.6 3 0.2 0 0.4-0.2 0.4-0.2l16.6-9.4c2.4-1.6 4.8-3.2 6.8-4.8 2.4-1.8 4.4-3.6 6.2-5.6 0.6-0.6 1.4-1.4 2-2 0.6 0 1.2 0 1.8 0 8.8 0 16-7.2 16-16s-7.2-16-16-16c-3.2 0-6.2 1-8.8 2.6-3.6-1.6-7.2-2.6-12.8-3.6s-23.6-2.4-39.2-0.6c-6.2-4.6-17.8-8.4-27.8-8.4-3.2 0-6.2 0.2-9.4 0.8-15.8 3-28.4 13-35.4 26 0 0-23.4 9-39.2 23.4-6.4 5.8-10 12.8-10.6 16.6-1.4 5.8 0.6 11.6 7 15.8zM423.2 92.6c11.6 0 21 9.4 21 21s-9.4 21-21 21c-11.6 0-21-9.4-21-21s9.4-21 21-21z"],"grid":0,"tags":["ios-ionitron-outline"]},{"paths":["M935.4 538.4c-9-64-30.4-118.4-71.8-114.6 12.8 29.2 27 70.4 23.4 144-2.8-51.8-12.6-100.4-34.2-144-64-129.2-201-214.8-354.4-206.2-171.6 9.6-309.4 133.4-343.4 293.6l-22.8 3.2c-34.4 4.8-53.8 69.8-43.2 145 10.6 75.4 47 132.4 81.4 127.6l31.4-4.4c69.2 112.6 196.6 184.6 338 176.8 170.4-9.4 307.6-131.8 342.8-290.4l14.8-0.8c30.2-5 47.4-62.8 38-129.8zM180.4 528c21.4 16.4 44.6 56.6 52.2 110.2 7.8 55.4-3.6 108.2-20.8 128.6 12-29.6 16-74.6 9.4-123.8-6.6-48-22-89.4-40.8-115zM547.6 760.4c-17 1-31.6-12-32.4-29-1-17 12-31.4 29-32.4s31.6 12 32.4 29c1 17-12 31.4-29 32.4zM709.2 751c-17 1-31.6-12-32.4-29-1-17 12-31.4 29-32.4s31.6 12 32.4 29c1 17-12 31.6-29 32.4z","M330.6 140c0 0 0 0.2 0 0 0.2 0.2 0.2 0.4 0.2 0.4s0 0 0 0c0.2 0.4 0.4 0.6 0.6 1 0 0 0 0.2 0 0.2 0.8 2 2.2 3.8 4.6 5.4 4 3 10 4.8 17.2 6 6.8 1 15 1.4 23.8 1 2 0 3.8-0.2 5.8-0.4-0.8-0.8-1.6-1.8-2.4-2.6-0.8 0-1.8 0-2.6 0-8.6 0.2-16.4-0.4-23.2-1.8-7-1.4-12.8-3.6-16.8-6.8-1.2-1-2-1.8-2.6-2.8-0.4-1.4-0.4-3 0-4.6 1-4.6 4.8-9.6 10.8-14.8 5.4-4.6 12.8-9.4 21.6-14 1.6-0.8 3.4-1.8 5.2-2.6 0.2-0.2 0.6-0.2 1-0.4-1.6 6.6-1.8 13.8-0.4 21 4.6 23.8 25 40.6 48.4 41.2l10 52.6 21.4-4-10-52.6c21.6-9.2 34.6-32.2 30-56-1.4-7-4-13.4-7.8-19-10.6-1.6-31.2-1.6-58.4 4.2 2.2-0.6 4.2-1.4 6.4-2 15.2-4.2 29.8-7 43-8.4 1.2-0.2 2.4-0.2 3.6-0.4 2.4-0.2 4.6-0.4 7-0.6 0.4 0 0.8 0 1.2 0 8-0.4 15.4-0.2 21.6 0.6 4.8 0.6 8.8 1.6 12.2 2.8-1.2 1.8-1.8 4-1.8 6.4 0 5.4 3.6 10 8.6 11.6 0 0 0 0 0 0-1.2 1.8-2.6 3.8-4.2 5.6s-3.6 3.8-5.8 5.6c-2.2 1.8-4.4 3.6-7 5.4l-13 7.6c-0.2 1-0.4 2-0.6 3 0.2 0 0.4-0.2 0.4-0.2l16.6-9.4c2.4-1.6 4.8-3.2 6.8-4.8 2.4-1.8 4.4-3.6 6.2-5.6 1.8-1.8 3.4-3.8 4.8-5.6 0.2-0.4 0.4-0.8 0.6-1.2 6-0.8 10.8-5.8 10.8-12 0-6.8-5.4-12.2-12.2-12.2-2 0-3.8 0.6-5.4 1.4-4-2.4-9.6-4.2-16.4-5.4-8.6-1.6-19-2-31-1.2-1.4 0-2.8 0.2-4.2 0.4s-2.6 0.4-4 0.4c-10.6-7-23.8-10-37.2-7.4-15.8 3-28.4 13-35.4 26-2.6 1-5.2 2.2-7.6 3.4-1.4 0.6-2.6 1.2-4 1.8-11.8 5.8-21.2 12.2-27.8 18.2-6.2 5.8-9.8 11.4-10.6 16.6-0.4 2.8 0 5.6 1.4 8 0.2 0.2 0.4 0.6 0.6 1z"],"grid":0,"tags":["ios-ionitron"]},{"paths":["M928 96c0 0-39.6 2.8-106.2 54.4-31 24-324.4 241.2-324.4 241.2l-319.4-15.8-82 73 204 102.4-16 20.2-163.2 8.2-13.4 67.2 121.2 94.4-53.4 107.2 107.4-53 94.6 121.2 67.2-13.4 8.2-163.2 20.2-15.8 102.4 203.8 73-81.8-15.8-319.4c0 0 217.2-293.4 241.2-324 51.8-67.2 54.4-106.8 54.4-106.8zM848.6 183.2l-248.4 333.8 15.6 317.6-33 37-81.4-161.8-17.6-34.8-62.6 49-7.8 152.8-23.4 4.6-98.4-126.2-45.6 22.4 22.8-45.6-126.2-98.4 4.6-23.4 152.8-7.8 49.6-62.2-35.2-17.6-161.8-81.4 37-33 317.8 15.6 334-248.2c9-7 17.4-13 25.2-18-5 7.8-11 16.4-18 25.6z"],"grid":0,"tags":["ios-jet-outline"]},{"paths":["M928 96c0 0-39.6 2.8-106.2 54.4-31 24-324.4 241.2-324.4 241.2l-319.4-15.8-82 73 204 102.4-16 20.2-163.2 8.2-13.4 67.2 121.2 94.4-53.4 107.2 107.4-53 94.6 121.2 67.2-13.4 8.2-163.2 20.2-15.8 102.4 203.8 73-81.8-15.8-319.4c0 0 217.2-293.4 241.2-324 51.8-67.2 54.4-106.8 54.4-106.8z"],"grid":0,"tags":["ios-jet"]},{"paths":["M685.2 436.2c-26.6 0-52.2 0-76.2 8.2-103.2-86.2-375.6-313.8-396.4-335-9.6-9.8-20.2-13.4-30.6-13.4-17.4 0-34 10.4-43.4 19.2-14 13.2-51.2 53.6-41 64 30.6 30.8 54.8 53 67.4 65.6 9.6 9.6 26.8-1.6 39.2 6.6 11 7.2 20 19.8 29.2 29 10.6 10.8 18 15.6 17.8 31.4-0.2 16.6 1 27.6 12.6 40 9.4 10 18.2 15.2 31.8 15.4 18.4 0.4 29.8 4.8 41.8 19.8 11.4 14.2 4.2 28.4 9.8 44 3.6 10.2 32 36.2 36 40.2s22 0 26.6 4.6 34.4 31.6 36.4 40.8-6 18-4 27.2c2.4 11.2 14.4 24.2 21.2 34.8-13.6 31-21.2 65.2-21.2 101.4 0 137 108.8 248 242.8 248s243-111 243-248-108.8-243.8-242.8-243.8zM685.2 896c-116.4 0-211-97-211-216 0-30.8 6.2-60.6 18.4-88.4l7-15.8c0 0-15.4-26.8-20.8-32.4-5.4-5.4 4.4-26.2-1.2-33.2-5.8-7-39.2-50.4-49.4-60.6s-28-3.6-33.4-9c-5.4-5.4-14.6-15.8-17.4-20.8-0.4-1.6-0.4-4.8-0.6-7.6-0.2-10.4-0.6-28-14.2-44.8-17.2-21.6-37-31-65.8-31.8-3.2 0-4.4-0.2-9.4-5.4-3.2-3.4-4-4.4-4-17.8 0.2-27.4-13.4-40.8-23.2-50.4l-38.2-37.2c-15.4-10.2-30.2-10.4-39.8-10.4-2.6 0-5.2 0-6.8-0.4l-43.6-45.4c2-6 15.4-17.8 21.2-23 2.8-2.4 5.2-4.8 7.8-7 5.6-5.2 14.8-10.6 21.6-10.6 2 0 4.2 0.2 7.8 3.8 20.8 21.2 258.8 220.4 398.8 337.2l13.6 11.4 16.8-5.6c19.2-6.4 41.8-6.4 66-6.4 56.6 0 109.6 21.8 149.2 61.2 39.8 39.6 61.6 93.2 61.6 150.6 0 118.8-94.6 215.8-211 215.8z","M768 704c-35.4 0-64 28.6-64 64s28.6 64 64 64 64-28.6 64-64c0-35.4-28.6-64-64-64zM768 800c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32z"],"grid":0,"tags":["ios-key-outline"]},{"paths":["M768 736c-17.6 0-32 14.4-32 32s14.4 32 32 32 32-14.4 32-32-14.4-32-32-32z","M685.2 436.2c-26.6 0-52.2 0-76.2 8.2-103.2-86.2-375.6-313.8-396.4-335-9.6-9.8-20.2-13.4-30.6-13.4-17.4 0-34 10.4-43.4 19.2-14 13.2-51.2 53.6-41 64 30.6 30.8 54.8 53 67.4 65.6 9.6 9.6 26.8-1.6 39.2 6.6 11 7.2 20 19.8 29.2 29 10.6 10.8 18 15.6 17.8 31.4-0.2 16.6 1 27.6 12.6 40 9.4 10 18.2 15.2 31.8 15.4 18.4 0.4 29.8 4.8 41.8 19.8 11.4 14.2 4.2 28.4 9.8 44 3.6 10.2 32 36.2 36 40.2s22 0 26.6 4.6 34.4 31.6 36.4 40.8-6 18-4 27.2c2.4 11.2 14.4 24.2 21.2 34.8-13.6 31-21.2 65.2-21.2 101.4 0 137 108.8 248 242.8 248s243-111 243-248-108.8-243.8-242.8-243.8zM768 832c-35.4 0-64-28.6-64-64s28.6-64 64-64 64 28.6 64 64c0 35.4-28.6 64-64 64z"],"grid":0,"tags":["ios-key"]},{"paths":["M896 735v-476.8c0-18.8-15.8-34.2-34.4-34.2h-699.2c-18.6 0-34.4 15.2-34.4 34.2v476.8h-96.2v31.2c0 6.2 62 33.8 104.2 33.8h752c48.6 0 104-28.2 104.2-33v-32h-96.2zM512 240c4.4 0 8 3.6 8 8s-3.6 8-8 8-8-3.6-8-8c0-4.4 3.6-8 8-8zM160 272.4h704v430.6h-704v-430.6zM596.6 751c0 0-158.6 0-169.2 0s-19.4-12-19.4-15h208c0 3-6 15-19.4 15z"],"grid":0,"tags":["ios-laptop"]},{"paths":["M907.8 765.4c-103.6-16-109.8-25.4-109.8-25.4 31.2-148-46.4-308.2-154.2-397.2-143.6-118.4-361.8-32.4-531.8-212.4-1.6-1.6-3-2.4-4.4-2.4-33.2 0-4 481 200.6 667.8 85.6 78.4 179.8 100.2 255.4 100.2 61.6 0 111-14.6 133.6-25 45.6-21.2 77.4-67.8 77.4-67.8 74 23.2 114.6 24.4 122.6 24.4 1 0 1.4 0 1.4 0 0.8 0.2 1.6 0.2 2.4 0.2 27.6-0 40.6-57.2 6.8-62.4zM683.8 842c-17.8 8.2-63 22-120 22-39.2 0-77.4-6.4-113.4-19-43.8-15.2-84.2-39.8-120.4-72.8-40.8-37.2-77.2-90.4-108-158-26.6-58-48.6-125-65.2-199-13.6-60-23-123.6-26.8-178.8-1.2-19-1.8-34.6-1.8-47.2 92.8 76.4 195.6 92.8 287.6 107.6 77.8 12.4 151.2 24.2 207.8 70.8 51 42.2 93.4 99.4 119.2 161.2 28 66.8 31.8 133.8 25.4 201.4-360-126-529-341-529-341s145 250.4 504.6 401.6c-10.2 13-26.6 35.6-60 51.2z"],"grid":0,"tags":["ios-leaf-outline"]},{"paths":["M907.8 765.4c-103.6-16-111.4-31.4-111.4-31.4 31.2-148-44.8-302.2-152.6-391.2-143.6-118.4-361.8-32.4-531.8-212.4-39.6-42-16.6 471 196.2 665.4 155.6 142 338.8 98.4 389 75.2 45.6-21.2 77.4-67.8 77.4-67.8 83 26 124 24.4 124 24.4 29.2 3.6 44-56.8 9.2-62.2zM724.2 772.2c-272.4-81.8-483.2-375-483.2-375s185.8 221.4 502.8 326.4c0.2 16.2-9.2 39.4-19.6 48.6z"],"grid":0,"tags":["ios-leaf"]},{"paths":["M557.2 693l-135.8 135.8c-30 30-70.2 46.6-113.2 46.6s-83-16.6-113.2-46.6c-30-30-46.6-70.2-46.6-113.2s16.6-83 46.6-113.2l135.8-135.8c7.8-7.8 16.2-14.6 25-20.4 10.2-6.8 21.2-12.2 32.6-16.4 10.6-3.8 21.6-6.6 33-8.2 7.4-1 14.8-1.6 22.4-1.6 3.4 0 6.8 0.2 10.2 0.4 39 2.4 75.2 18.6 103 46.2 27.6 27.6 43.8 64 46.2 103 10.8-2 21.4-5.4 31.2-10-4.4-42.2-22.8-83.4-55-115.6s-73.2-50.6-115.6-55c-11.4-1.2-23-1.4-34.4-0.6-12 0.8-23.8 2.8-35.4 6-12.2 3.2-24.2 7.6-35.6 13.4-18.2 9-35.4 21-50.6 36.2l-135.8 135.8c-74.6 74.6-74.6 196.8 0 271.6v0c74.6 74.6 196.8 74.6 271.6 0l135.8-135.8c15.2-15.2 27.2-32.2 36.2-50.6-12.8 2-25.6 3-38.4 3-5.4 9-12.2 17.4-20 25z","M851.4 172.6v0c-74.6-74.6-196.8-74.6-271.6 0l-135.8 135.8c-15.2 15.2-27.2 32.2-36.2 50.6 12.8-2 25.6-3 38.4-3 5.8-9 12.6-17.4 20.4-25l135.8-135.8c30-30 70.2-46.6 113.2-46.6s83 16.6 113.2 46.6c30 30 46.6 70.2 46.6 113.2 0 42.8-16.6 83-46.6 113.2l-135.8 135.8c-7.8 7.8-16.2 14.6-25 20.4-10.2 6.8-21.2 12.2-32.6 16.4-10.6 3.8-21.6 6.6-33 8.2-7.4 1-14.8 1.6-22.4 1.6-3.4 0-6.8-0.2-10.2-0.4-39-2.4-75.2-18.6-103-46.2-27.6-27.6-43.8-64-46.2-103-10.8 2-21.4 5.4-31.2 10 4.4 42.2 22.8 83.4 55 115.6v0c32.2 32.2 73.2 50.6 115.6 55 11.4 1.2 23 1.4 34.4 0.6 12-0.8 23.8-2.8 35.4-6 12.2-3.2 24.2-7.6 35.6-13.4 18.2-9 35.4-21 50.6-36.2l135.8-135.8c74.2-74.8 74.2-197-0.4-271.6z"],"grid":0,"tags":["ios-link-outline"]},{"paths":["M546 681.8l-135.8 135.8c-27 27-63.2 42-101.8 42s-74.8-14.8-101.8-42c-27-27-42-63.2-42-101.8s14.8-74.8 42-101.8l135.8-135.8c6.8-6.8 14.4-13 22.6-18.4 9.2-6 19-11 29.4-14.8 9.6-3.6 19.6-6 29.8-7.4 6.8-1 13.6-1.4 20.2-1.4 2.8 0 5.6 0.2 9.2 0.4 35 2.2 68 17 92.6 41.6 21.6 21.6 35.6 49.6 40.2 79.6 4.6-0.2 16.4-1 32.4-5.8s26.8-12.6 26.8-12.6c-6.6-42.4-23.2-75.6-54.2-106.4-30.8-30.8-71-51.2-114-58-3.8-0.6-7.4-1.2-11.2-1.6-7.2-0.8-14.6-1.2-22-1.2-5 0-10.2 0.2-15.4 0.6-10.8 0.8-21.4 2.4-32 4.8-2.2 0.4-4.2 1-6.4 1.6-13.4 3.6-26.4 8.4-38.6 14.4-20.2 10-38.8 23.2-54.8 39.2l-135.8 135.8c-39.2 39.2-60.6 91.4-60.6 147s21.6 108 60.6 147c39.2 39.2 91.4 60.6 147 60.6 55.8 0 108-21.6 147-60.6l135.8-135.8c14.4-14.4 26.4-30.8 36-48.6 0 0-22.4 5.4-47.2 5.4s-33.8-1.8-33.8-1.8z","M862.8 161.2c-39.2-39.2-91.4-60.6-147-60.6s-108 21.6-147 60.6l-135.8 135.8c-14.4 14.4-26.4 30.8-36 48.6 0 0 0 0 0 0 10.4-2.4 30.6-4.8 48-4.8s32.4 2.2 32.4 2.2l136.6-136.2c27-27 63.2-42 101.8-42s74.8 14.8 101.8 42c27 27 42 63.2 42 101.8s-14.8 74.8-42 101.8l-135.8 135.6c-6.8 6.8-14.4 13-22.6 18.4-9.2 6-19 11-29.4 14.8-9.6 3.4-19.6 6-29.8 7.4-6.8 1-13.6 1.4-20.2 1.4-2.8 0-5.6-0.2-9.2-0.4-35-2.2-68-17-92.6-41.6-21.2-21.2-35-48.4-39.8-77.6 0 0-13.2-1-31.4 4.6-11.4 3.4-23.2 8.4-28.4 11 6 43 22.8 75.4 54.2 107v0l0.4 0.4c33.4 33.4 78 54.6 125.2 59.6 7.2 0.8 14.6 1.2 22 1.2 5.2 0 10.2-0.2 15.4-0.6 12.8-1 25.8-3 38.2-6.4 13.4-3.6 26.4-8.4 38.6-14.4 20.2-10 38.8-23.2 54.8-39.2l135.8-135.8c39.2-39.2 60.6-91.4 60.6-147s-21.8-108.4-60.8-147.6z"],"grid":0,"tags":["ios-link"]},{"paths":["M864 160v704h-704v-704h704zM896 128h-768v768h768v-768z","M384 304h384v32h-384v-32z","M384 496h384v32h-384v-32z","M384 688h384v32h-384v-32z","M320 320c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M320 512c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M320 704c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z"],"grid":0,"tags":["ios-list-box-outline"]},{"paths":["M128 128v768h768v-768h-768zM288 736c-17.672 0-32-14.328-32-32s14.328-32 32-32 32 14.328 32 32-14.328 32-32 32zM288 544c-17.672 0-32-14.328-32-32s14.328-32 32-32 32 14.328 32 32-14.328 32-32 32zM288 352c-17.672 0-32-14.328-32-32s14.328-32 32-32 32 14.328 32 32-14.328 32-32 32zM768 720h-384v-32h384v32zM768 528h-384v-32h384v32zM768 336h-384v-32h384v32z"],"grid":0,"tags":["ios-list-box"]},{"paths":["M384 304h384v32h-384v-32z","M384 496h384v32h-384v-32z","M384 688h384v32h-384v-32z","M320 320c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M320 512c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M320 704c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z"],"grid":0,"tags":["ios-list"]},{"paths":["M640 512c0 70.692-57.308 128-128 128s-128-57.308-128-128c0-70.692 57.308-128 128-128s128 57.308 128 128z","M944 496h-48.4c-8.2-199.4-168.2-359.4-367.6-367.6v-48.4c0-8.8-7.2-16-16-16s-16 7.2-16 16v48.4c-199.4 8.2-359.4 168.2-367.6 367.6h-48.4c-8.8 0-16 7.2-16 16s7.2 16 16 16h48.4c8.2 199.4 168.4 359.4 367.6 367.6v48.4c0 8.8 7.2 16 16 16s16-7.2 16-16v-48.4c199.4-8.2 359.4-168.4 367.6-367.6h48.4c8.8 0 16-7.2 16-16s-7.2-16-16-16zM760.8 760.8c-62.8 62.8-144.8 98.8-232.8 102.8v-79.6c0-8.8-7.2-16-16-16s-16 7.2-16 16v79.6c-88-4-170.2-40-232.8-102.8-62.8-62.6-99-144.8-102.8-232.8h79.6c8.8 0 16-7.2 16-16s-7.2-16-16-16h-79.6c4-88 40-170.2 102.8-232.8s144.8-99 232.8-102.8v79.6c0 8.8 7.2 16 16 16s16-7.2 16-16v-79.6c88 4 170.2 40 232.8 102.8s99 144.8 102.8 232.8h-79.6c-8.8 0-16 7.2-16 16s7.2 16 16 16h79.6c-3.8 88-40 170.2-102.8 232.8z"],"grid":0,"tags":["ios-locate-outline"]},{"paths":["M768 512c0-8.8 7.2-16 16-16h111.6c-8.2-199.4-168.2-359.4-367.6-367.6v111.6c0 8.8-7.2 16-16 16s-16-7.2-16-16v-111.6c-199.4 8.2-359.4 168.2-367.6 367.6h111.6c8.8 0 16 7.2 16 16s-7.2 16-16 16h-111.6c8.2 199.4 168.4 359.4 367.6 367.6v-111.6c0-8.8 7.2-16 16-16s16 7.2 16 16v111.6c199.4-8.2 359.4-168.4 367.6-367.6h-111.6c-8.8 0-16-7.2-16-16zM512 640c-70.6 0-128-57.4-128-128s57.4-128 128-128 128 57.4 128 128-57.4 128-128 128z","M944 496h-48.4c0.2 5.4 0.4 10.6 0.4 16s-0.2 10.6-0.4 16h48.4c8.8 0 16-7.2 16-16s-7.2-16-16-16z","M128.4 496h-48.4c-8.8 0-16 7.2-16 16s7.2 16 16 16h48.4c-0.2-5.4-0.4-10.6-0.4-16s0.2-10.6 0.4-16z","M496 895.6v48.4c0 8.8 7.2 16 16 16s16-7.2 16-16v-48.4c-5.4 0.2-10.6 0.4-16 0.4s-10.6-0.2-16-0.4z","M528 128.4v-48.4c0-8.8-7.2-16-16-16s-16 7.2-16 16v48.4c5.4-0.2 10.6-0.4 16-0.4s10.6 0.2 16 0.4z"],"grid":0,"tags":["ios-locate"]},{"paths":["M720 448v-144c0-114.86-93.124-208-207.968-208-114.908 0-208.032 93.14-208.032 208v144h-112v480h640v-480h-112zM336 304c0-97.046 78.968-176 176.032-176 97.030 0 175.968 78.954 175.968 176v144h-352v-144zM800 896h-576v-416h576v416z","M512 576c-35.346 0-64 28.654-64 64 0 29.82 20.396 54.878 48 61.984v66.016h32v-66.016c27.604-7.106 48-32.164 48-61.984 0-35.346-28.654-64-64-64zM512 672c-17.644 0-32-14.356-32-32s14.356-32 32-32 32 14.356 32 32-14.356 32-32 32z"],"grid":0,"tags":["ios-lock-outline"]},{"paths":["M720 448v-144c0-114.86-93.124-208-207.968-208-114.908 0-208.032 93.14-208.032 208v144h-112v480h640v-480h-112zM528 701.984v66.016h-32v-66.016c-27.604-7.106-48-32.164-48-61.984 0-35.346 28.654-64 64-64s64 28.654 64 64c0 29.82-20.396 54.878-48 61.984zM688 448h-352v-144c0-97.046 78.968-176 176.032-176 97.030 0 175.968 78.954 175.968 176v144z","M512 608c-17.644 0-32 14.356-32 32s14.356 32 32 32 32-14.356 32-32-14.356-32-32-32z"],"grid":0,"tags":["ios-lock"]},{"paths":["M274 160h572c44.2 0 80 35.8 80 80v544c0 44.2-35.8 80-80 80h-572c-44.2 0-80-35.8-80-80 0-8.8 7.2-16 16-16s16 7.2 16 16c0 26.4 21.6 48 48 48h572c26.4 0 48-21.6 48-48v-544c0-26.4-21.6-48-48-48h-572c-26.4 0-48 21.6-48 48 0 8.8-7.2 16-16 16s-16-7.2-16-16c0-44.2 35.8-80 80-80z","M632.6 493.4l-169.2-168.8c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l151.2 148.8h-478c-8.8 0-16 7.2-16 16s7.2 16 16 16h478l-147.4 148.8c-6.2 6.2-6.2 16.4 0 22.6 3.2 3 7.2 4.6 11.4 4.6s8.2-1.4 11.4-4.6l165.2-164.8c12.6-12.6 12.6-28.8 0-41.2z"],"grid":0,"tags":["ios-log-in"]},{"paths":["M560 864h-384c-44.2 0-80-35.8-80-80v-544c0-44.2 35.8-80 80-80h384c44.2 0 80 35.8 80 80 0 8.8-7.2 16-16 16s-16-7.2-16-16c0-26.4-21.6-48-48-48h-384c-26.4 0-48 21.6-48 48v544c0 26.4 21.6 48 48 48h384c26.4 0 48-21.6 48-48 0-8.8 7.2-16 16-16s16 7.2 16 16c0 44.2-35.8 80-80 80z","M918.6 493.4l-169.2-168.8c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l151.2 148.8h-542c-8.8 0-16 7.2-16 16s7.2 16 16 16h542l-147.4 148.8c-6.2 6.2-6.2 16.4 0 22.6 3.2 3 7.2 4.6 11.4 4.6s8.2-1.4 11.4-4.6l165.2-164.8c12.6-12.6 12.6-28.8 0-41.2z"],"grid":0,"tags":["ios-log-out"]},{"paths":["M380.2 266.2c32.2 3.8 65.6 21.6 93.8 49.8l335.4 335.4 118.6-118.6-355.6-355.4c-108.6-108.6-286.4-108.6-395 0v0c-108.6 108.6-108.6 286.4 0 395l355.6 355.6 118.6-118.6-335.4-335.2c-28.8-28.8-46.8-61.8-50.8-93.2-4.2-32 6.2-60.8 30.6-85.2 23-23.2 52.2-33.4 84.2-29.6zM888.4 533l-79 79-59.2-59.2 79-79 59.2 59.2zM612 809.4l-79 79-59.2-59.2 79-79 59.2 59.2zM296.4 493.8l236.6 236.6-79 79-256.8-256.6c-47.2-47.4-73.2-110.4-73.2-177.8s26-130.4 73.2-177.8c47.2-47.2 110.4-73.2 177.8-73.2s130.4 26 177.8 73.2l256.6 256.8-79 79-236.6-236.6c-65.4-65.4-156-82-217.8-20.2-64 64-45 152.2 20.4 217.6z"],"grid":0,"tags":["ios-magnet-outline"]},{"paths":["M380.2 266.2c32.2 3.8 65.6 21.6 93.8 49.8l335.4 335.4 118.6-118.6-355.6-355.4c-108.6-108.6-286.4-108.6-395 0v0c-108.6 108.6-108.6 286.4 0 395l355.6 355.6 118.6-118.6-335.4-335.2c-28.8-28.8-46.8-61.8-50.8-93.2-4.2-32 6.2-60.8 30.6-85.2 23-23.2 52.2-33.4 84.2-29.6zM888.4 533l-79 79-59.2-59.2 79-79 59.2 59.2zM612 809.4l-79 79-59.2-59.2 79-79 59.2 59.2z"],"grid":0,"tags":["ios-magnet"]},{"paths":["M512 128l-384 256v512h768v-512l-384-256zM864 864h-704v-427.2l229.8 174.2-135.8 154.4 4 4 157.4-138.8 96.6 73.4 96.2-73.4 157.6 139 4-4-136-154.6 230-175.6v428.6zM512 663.6l-306.6-235.6h178.6v-6.4l-219.8-25.4-0.6-0.4 348.4-227.6 349.2 228-221.2 25.4v6.4h180.8l-308.8 235.6z"],"grid":0,"tags":["ios-mail-open-outline"]},{"paths":["M634 610.8l136 154.6-4 4-157.6-139-96.2 73.4-96.8-73.4-157.4 139-4-4 135.8-154.4-261.8-198v483h768v-485.2z","M384 428h-178.6l306.6 235.6 308.8-235.6h-180.8v-6.4l256-29.8v-7.8l-384-256-384 256v8.4l256 29.2z"],"grid":0,"tags":["ios-mail-open"]},{"paths":["M128 256v512h768v-512h-768zM512 535.8l-325.6-247.8h651.2l-325.6 247.8zM160 736v-427.8l230.2 175.2-136.2 154.6 4 4 157.8-139.2 96.2 73.2 96.2-73.2 157.8 139.2 4-4-136.2-154.8 230.2-175v427.8h-704z"],"grid":0,"tags":["ios-mail-outline"]},{"paths":["M896 768v-484.4l-262.2 199.6 136.2 154.8-4 4-157.8-139.2-96.2 73.2-96.2-73.2-157.8 139.2-4-4 136-154.8-262-199.2v484z","M879.4 256h-735.4l368 279.8z"],"grid":0,"tags":["ios-mail"]},{"paths":["M912 96h-224c-8.8 0-16 7.2-16 16s7.2 16 16 16h184l-214 215.4c-59.6-54.2-139-87.4-226-87.4-185.6 0-336 150.4-336 336s150.4 336 336 336c185.6 0 336-150.4 336-336 0-87-33-166.4-87.4-226l215.4-214v184c0 8.8 7.2 16 16 16s16-7.2 16-16v-224c0-8.8-7.2-16-16-16zM736 592c0 81.2-31.6 157.6-89 215s-133.8 89-215 89c-81.2 0-157.6-31.6-215-89s-89-133.8-89-215 31.6-157.6 89-215 133.8-89 215-89c81.2 0 157.6 31.6 215 89s89 133.8 89 215z"],"grid":0,"tags":["ios-male"]},{"paths":["M511.4 213.2c0 0 0 0 0 0h-0.4c-50 0-91-40.6-91-90.6s40.8-90.6 91-90.6 91 40.6 91 90.6c0 24.2-9.4 47-26.6 64-17 17.2-39.8 26.6-64 26.6zM511 64c-32.4 0-58.8 26.2-58.8 58.6s26.4 58.6 58.8 58.6h0.4c0 0 0 0 0 0 15.6 0 30.4-6 41.4-17.2 11-11 17.2-25.8 17.2-41.4-0.2-32.4-26.6-58.6-59-58.6z","M442.4 992c-28.8 0-58-21-58-60.8l2-555.2h-12v210c0 18.6-8 30.2-14.8 36.6-8.6 8.2-20.2 12.8-32.4 12.8s-23.8-4.6-32.4-12.8c-6.8-6.4-14.8-17.8-14.8-36.6v-243.2c0-27.6 10.8-55.6 29.6-76.8 20.8-23.2 49.2-36 80-36h244.6c30.8 0 59.2 12.8 80 36.2 18.8 21.2 29.6 49 29.6 76.6v243.2c0 14.6-5.4 27.6-15.2 36.6-8.8 8-20.6 12.4-33 12.4s-24.2-4.4-33-12.4c-9.8-9-15.2-22-15.2-36.6v-210h-10v555.2c0 39.4-30.8 60.8-59.6 60.8-26.8 0-56.6-18.6-58.8-59.6 0-0.2 0-0.6 0-0.8v-281.6h-16v281.2c0 0.2 0 0.4 0 0.6-1.4 39.4-31.6 60.2-60.6 60.2zM358.4 344h44.2c4.2 0 8.4 1.6 11.4 4.8s4.8 7 4.6 11.4l-2 571.2c0 21.2 13.4 28.8 25.8 28.8 13.6 0 27.6-9 28.4-29.2v-297c0-8.8 7.2-16 16-16h48.2c8.8 0 16 7.2 16 16v297c1.4 21.4 14.6 29 26.8 29 13.2 0 27.4-9 27.4-28.8v-571.2c0-8.8 7.2-16 16-16h42.2c8.8 0 16 7.2 16 16v226c0 16.2 13.4 17 16 17s16-0.8 16-17v-243.2c0-39-31.2-80.8-77.6-80.8h-244.2c-37.2 0-77.6 30.8-77.6 80.8v243.2c0 16.4 12.6 17.2 15 17.2s15-0.8 15-17.2v-226c0.2-8.8 7.4-16 16.4-16z"],"grid":0,"tags":["ios-man-outline"]},{"paths":["M511.4 213.2v0h-0.4c-50 0-91-40.6-91-90.6s40.8-90.6 91-90.6 91 40.6 91 90.6c0 24.2-9.4 47-26.6 64-17 17.2-39.8 26.6-64 26.6z","M442.4 992c-28.8 0-58-21-58-60.8l2-555.2h-12v210c0 18.6-8 30.2-14.8 36.6-8.6 8.2-20.2 12.8-32.4 12.8s-23.8-4.6-32.4-12.8c-6.8-6.4-14.8-17.8-14.8-36.6v-243.2c0-27.6 10.8-55.6 29.6-76.8 20.8-23.2 49.2-36 80-36h244.6c30.8 0 59.2 12.8 80 36.2 18.8 21.2 29.6 49 29.6 76.6v243.2c0 14.6-5.4 27.6-15.2 36.6-8.8 8-20.6 12.4-33 12.4s-24.2-4.4-33-12.4c-9.8-9-15.2-22-15.2-36.6v-210h-10v555.2c0 39.4-30.8 60.8-59.6 60.8-26.8 0-56.6-18.6-58.8-59.6 0-0.2 0-0.6 0-0.8v-281.6h-16v281.2c0 0.2 0 0.4 0 0.6-1.4 39.4-31.6 60.2-60.6 60.2z"],"grid":0,"tags":["ios-man"]},{"paths":["M704.8 256l-191.4-128-192.6 128-192.8-128v640l192.8 128 192.6-128 191.4 128 191.2-128v-640l-191.2 128zM336 284.8l160-106.4v563l-160 106.2v-562.8zM528 176l160 106.8v563.2l-160-107v-563zM160 188l144 95.2v563.2l-144-95.6v-562.8zM864 750.8l-144 96.6v-562.6l144-96.8v562.8z"],"grid":0,"tags":["ios-map-outline"]},{"paths":["M128 128v640l176 116.8v-640z","M336 246v640l160-106.4v-640z","M896 128l-176 117.8v640l176-117.8z","M528 137.6v640l160 107.2v-640z"],"grid":0,"tags":["ios-map"]},{"paths":["M704 510.8c31.2 41.4 48 91.4 48 144.2 0 64.2-25 124.4-70.2 169.8s-105.6 70.2-169.8 70.2-124.4-25-169.8-70.2-70.2-105.6-70.2-169.8c0-52.8 17-103 48.2-144.4l-12.4-3.4-20.4-5.8c-30 43.6-47.4 96.6-47.4 153.6 0 150.2 121.8 273 272 273s272-122.8 272-273c0-56.8-17.4-109.6-47.2-153.2l-32.8 9z","M597.4 540.2l-43.4 12c41 16.6 70 56.8 70 103.8 0 61.8-50.2 112-112 112s-112-50.2-112-112c0-47 29-87.2 69.8-103.8l-43.2-12c-35.6 26.2-58.6 68.4-58.6 115.8 0 79.4 64.6 144 144 144s144-64.6 144-144c0-47.4-23-89.6-58.6-115.8z","M96 96v320l416 116 416-116v-320h-832zM896 128v64h-768v-64h768zM128 392v-168h224v232l-224-64zM512 497.4l-128-34v-239.4h256v239.4l-128 34zM672 456v-232h224v168l-224 64z"],"grid":0,"tags":["ios-medal-outline"]},{"paths":["M96 224v192l256 72v-264z","M512 564.4z","M400 656.4c0 61.8 50.2 112 112 112s112-50.2 112-112c0-47-28.8-87-69.8-103.8l-42.2 11.6-42-11.8c-41.2 17-70 57.2-70 104z","M736.8 502.2l-139.2 38.4c35.4 26.2 58.4 68.4 58.4 115.8 0 79.4-64.6 144-144 144s-144-64.6-144-144c0-47.4 23-89.6 58.6-115.8l-139.2-38.6c-30 43.6-47.4 96.6-47.4 153.6 0 150.2 121.8 272 272 272s272-121.8 272-272c0-57-17.4-109.6-47.2-153.4z","M384 224v272l128 36 128-35.2v-272.8z","M672 224v264l256-72v-192z","M96 96h832v96h-832v-96z"],"grid":0,"tags":["ios-medal"]},{"paths":["M152.2 374c0-76.2 44.4-142 110.6-170h-14.2c-57.4 0-121.4 60.8-132.6 139.6-11.2 1.8-19.8 14.6-19.8 29.8 0 16 9.4 28.6 21.6 29.6 8.4 60 71.4 118 113.8 130.8l20.2 6.4c-55.6-31.6-99.6-97.6-99.6-166.2z","M781 128c17.4 0 31.6 6.4 47.4 21.2 13.8 13.2 26 31.4 36.2 54.2 2 4.8 4 9.2 5.8 13.8v0.4c16.4 42.4 25.6 96.6 25.6 152.4 0 55.6-9 109.6-25.4 152.2v0.4c-1.8 4.6-3.6 9.2-5.8 14.2-10.2 22.4-20.8 38.4-37 54.8-23.8 23.8-40.6 26.4-46.8 26.4-6.4 0-12.2-1.2-28.8-7.4-12.4-4.8-24.8-9.8-37-14.6-62.2-25-126.4-50.8-213-50.8-14.2 0-27.4 5.8-37.2 16.6-29.4 32-25.4 103.4-16.4 208.8 2.4 27.4 4.6 53.4 4.6 70 0 19.8-0.6 32.8-1.8 42.6-0.8 6.8-1.8 10.6-2.6 12.4-1.4 0.2-3.6 0.4-7.2 0.4-14.8 0-36.6-2.8-56.8-7.4-24.4-5.6-36-11.2-39.2-13.4-4.2-5.2-4.6-8-0.4-38.2 4-28.6 30-168.2 41.2-227.8 2.2-11.8 3.8-20.6 4.6-25 4-21.2-6.6-40.4-28.2-51.6-11.2-5.8-24.6-9.2-37.6-12.6-10-2.6-27-7-31.4-10.6l-2-1.6-2.2-1.4c-45.2-26.8-73.2-77.6-73.2-132.4 0-30.4 9-59.8 25.8-85.4 15-22.8 35.4-40.8 59-52.6 15.4-0.2 56-0.4 119.6-0.4 43.8 0 101.2-9.8 162-27.8 61.2-18.2 119-42.6 162.4-68.6l1.2-0.8c7.8-4.4 17.6-10.4 34.6-10.4zM781 96c-27 0-43 10.4-51.6 15.6-86.2 51.8-224.6 92-308 92s-126.8 0.4-126.8 0.4c-63.2 28-109.6 93.8-109.6 170 0 68.4 35.6 128.4 88.8 160 24.2 20.2 91.2 17.6 86.2 44.4s-41 219-46 254-5.8 47 8 64c14 17 83 31.6 120 31.6s43.6-17.4 43.6-87.6-34.6-263.4 17-263.4c96.6 0 163 34.6 238.6 63.4 18 6.8 28.2 9.4 40.2 9.4s37.4-3.8 69.4-36.4c18.4-18.8 31.4-37.6 43.4-64.4 2.2-5.2 4.4-10.4 6.4-16 17.8-46.4 27.4-103.8 27.4-163.8 0-59.8-9.6-117.4-27.6-164-2-5.4-4.2-10.4-6.4-15.4-12-26.8-26.8-48.4-43.4-64.4-21-19-42.8-29.4-69.6-29.4v0z","M770.6 192.6c4.2 0 20 8.2 31.4 33.4 9 20.4 30 74.8 30 144 0 68.4-20.8 123.2-29.8 143.6-10.6 24-25 37-31 39.6-4-2.8-14.2-13.4-25.8-39.6-15.8-36-25-88.4-25-143.6 0-55.8 9.2-108.2 25.2-144 12.2-27.6 23.4-33.4 25-33.4zM770.6 160.6c-20.8 0-40 19.8-54.4 52.4-17 38.4-27.8 94.4-27.8 157 0 62.2 10.8 118.2 27.6 156.4 14.4 33 33.6 59.2 54.6 59.2s46.2-26.2 60.8-59.2c16.8-38.4 32.6-94.4 32.6-156.4 0-62.6-15.6-118.6-32.8-157-14.6-32.4-39.6-52.4-60.6-52.4v0z"],"grid":0,"tags":["ios-megaphone-outline"]},{"paths":["M152.2 374c0-76.2 44.4-142 110.6-170h-14.2c-57.4 0-121.4 60.8-132.6 139.6-11.2 1.8-19.8 14.6-19.8 29.8 0 16 9.4 28.6 21.6 29.6 8.4 60 71.4 118 113.8 130.8l20.2 6.4c-55.6-31.6-99.6-97.6-99.6-166.2z","M900.4 205.6c-2-5.4-4.2-10.4-6.4-15.4-12-26.8-26.8-48.4-43.4-64.4-21-19.4-42.8-29.8-69.6-29.8s-43 10.4-51.6 15.6c-86.2 51.8-224.6 92-308 92s-126.8 0.4-126.8 0.4c-63.2 28-109.6 93.8-109.6 170 0 68.4 35.6 128.4 88.8 160 24.2 20.2 91.2 17.6 86.2 44.4s-41 219-46 254-5.8 47 8 64c14 17 83 31.6 120 31.6s43.6-17.4 43.6-87.6-34.6-263.4 17-263.4c96.6 0 163 34.6 238.6 63.4 18 6.8 28.2 9.4 40.2 9.4s37.4-3.8 69.4-36.4c18.4-18.8 31.4-37.6 43.4-64.4 2.2-5.2 4.4-10.4 6.4-16 17.8-46.4 27.4-103.8 27.4-163.8 0-59.6-9.6-117.2-27.6-163.6zM863.4 526.6c-14.4 32.8-39.8 59.2-60.8 59.2s-40.2-26.2-54.6-59.2c-16.8-38.4-27.6-94.4-27.6-156.4 0-62.6 10.8-118.6 27.8-157 14.4-32.6 33.6-52.4 54.4-52.4 21 0 46 19.8 60.6 52.4 17 38.4 32.8 94.4 32.8 157 0 62-15.6 118-32.6 156.4z"],"grid":0,"tags":["ios-megaphone"]},{"paths":["M128 288h768v32h-768v-32z","M128 496h768v32h-768v-32z","M128 704h768v32h-768v-32z"],"grid":0,"tags":["ios-menu-outline"]},{"paths":["M128 288h768v64h-768v-64z","M128 480h768v64h-768v-64z","M128 672h768v64h-768v-64z"],"grid":0,"tags":["ios-menu"]},{"paths":["M669.8 553c0 0.4 0 0.8-0.2 1.2 0-0.4 0-0.8 0.2-1.2z","M670.4 544.8c0 0.4 0 0.8 0 1.4-0.2-0.6-0.2-1 0-1.4z","M354 536.6v0.2c0 92.2 70.6 167.2 158.2 167.2 18.2 0 35.6-3.2 51.8-9.2l-0.2-0.2c-16.2 6-33.4 9.2-51.6 9.2-87.6-0.2-158.2-75-158.2-167.2z","M512.2 671.6c-69.6 0-126.2-60.6-126.2-135v-146l-32-54.6v200.6c0 92.2 70.6 167.2 158.2 167.2 18.2 0 35.6-3.2 51.8-9.2l-16.6-28.2c-11.2 3.4-23 5.2-35.2 5.2z","M670 536.8v-0.2c0 2.8 0 5.4-0.2 8.2 0.2-2.6 0.2-5.4 0.2-8z","M670.2 546.2c-0.2 2.4-0.2 4.6-0.4 7 0.2-2.4 0.4-4.8 0.4-7z","M640.4 634.8c15.8-23 26.2-50.6 29.2-80.4-3 29.6-13.4 57.2-29.2 80.4v0z","M511.8 96c-59.2 0-110.6 34.2-137.8 84.8l20 33.8c18.2-50.8 64-87 117.8-87 69.6 0 126.2 60.6 126.2 135v273.6c0 24.2-5.8 47-16.4 66.6l18.6 31.4c15.8-23 26.4-50.6 29.4-80.4 0-0.4 0.2-0.8 0.2-1.2 0.2-2.2 0.4-4.6 0.6-7 0-0.4-0.2-0.8-0.2-1.4 0.2-2.8 0-5.4 0-8.2v-272.8c-0.2-92.2-70.8-167.2-158.4-167.2z","M528.4 766.6l-16.4 1.2-16.8-1.2c-57.2-4.2-106.4-29.2-145.8-70.8s-61.4-95.6-61.4-152.2v-127.6h-32v127.6c0 134.4 108 245.2 242 254.8v97.6h-148v32h322v-32h-144v-97.4c30-2.2 58.2-9.4 84.6-21l-15.6-26.6c-22 8.6-45.2 13.8-68.6 15.6z","M768 543.6v-127.6h-32v127.6c0 56.8-20.2 111-58.4 152.4-0.4 0.4-0.4 0.6-0.8 1l15.2 26.4c46.8-46.2 76-109.8 76-179.8z","M267.6 64l-27.6 16.2 516.4 879.8 27.6-16.2z"],"grid":0,"tags":["ios-mic-off-outline"]},{"paths":["M354 536.8c0 92.2 70.6 167.2 158 167.2 18.2 0 35.6-3.2 51.8-9.2l-209.8-358.8v200.8z","M670 536.8v-273.8c0-92.2-70.6-167.2-158-167.2-59 0-110.4 34.2-137.6 84.8l265.4 454c19-27.4 30.2-61.2 30.2-97.8z","M528.4 766.6l-16.4 1.2-16.8-1.2c-57-4.2-106.4-29.2-145.8-70.8s-61.4-95.6-61.4-152.2v-127.6h-32v127.6c0 134.4 108 245.2 242 255v97.4h-148v32h322v-32h-144v-97.4c29.6-2.2 58-9.4 84.2-21l-15.6-26.6c-21.8 8.6-45 14-68.2 15.6z","M768 543.6v-127.6h-32v127.6c0 56.8-20.4 111-58.6 152.6-0.4 0.4-0.6 0.6-1 1l15.4 26.4c46.8-46.4 76.2-110 76.2-180z","M268.4 64l-27.6 16 514.8 880 27.6-16z"],"grid":0,"tags":["ios-mic-off"]},{"paths":["M512 127.8c69.4 0 126 60.6 126 135.2v273.8c0 74.6-56.6 135.2-126 135.2s-126-60.6-126-135.2v-273.8c0-74.6 56.6-135.2 126-135.2zM512 96c-87.4 0-158 74.8-158 167v273.8c0 92.2 70.6 167.2 158 167.2s158-75 158-167.2v-273.8c0-92.2-70.6-167-158-167v0z","M736 416v127.6c0 56.8-20.4 111-58.6 152.6-38 41.4-93.4 66.4-149 70.4l-16.4 1.2-16.8-1.2c-57-4.2-106.4-29.2-145.8-70.8s-61.4-95.6-61.4-152.2v-127.6h-32v127.6c0 134.4 108 245.2 242 255v97.4h-148v32h322v-32h-144v-97.4c132-9.8 240-120.6 240-255v-127.6h-32z"],"grid":0,"tags":["ios-mic-outline"]},{"paths":["M512 96c-87.4 0-158 74.8-158 167v273.8c0 92.2 70.6 167.2 158 167.2s158-75 158-167.2v-273.8c0-92.2-70.6-167-158-167v0z","M736 416v127.6c0 56.8-20.4 111-58.6 152.6-38 41.4-93.4 66.4-149 70.4l-16.4 1.2-16.8-1.2c-57-4.2-106.4-29.2-145.8-70.8s-61.4-95.6-61.4-152.2v-127.6h-32v127.6c0 134.4 108 245.2 242 255v97.4h-148v32h322v-32h-144v-97.4c132-9.8 240-120.6 240-255v-127.6h-32z"],"grid":0,"tags":["ios-mic"]},{"paths":["M560 96h-96c-132 0-240 108-240 240v256c0 126.6 99.4 231.2 224 239.4v96.6h128v-96.6c124.6-8.4 224-112.8 224-239.4v-256c0-132-108-240-240-240zM480 896v-64h64v64h-64zM560 800h-96c-55.2 0-107.4-21.8-146.8-61.2-1-1-1.8-2-2.8-2.8h395.4c-1 1-1.8 2-2.8 2.8-39.6 39.4-91.8 61.2-147 61.2zM735 704h-446c-21.4-33.2-33-71.8-33-112v-16h160v-32h-160v-64h160v-32h-160v-64h160v-32h-160v-16c0-55.2 21.8-107.4 61.2-146.8 27.8-27.8 61.8-46.8 98.8-55.6v90.4h32v-95.4c5.2-0.4 10.6-0.6 16-0.6h32v128h32v-128h32c5.4 0 10.8 0.2 16 0.6v95.4h32v-90.4c37 8.8 71.2 27.8 98.8 55.6 39.4 39.4 61.2 91.6 61.2 146.8v16h-160v32h160v64h-160v32h160v64h-160v32h160v16c0 40.2-11.6 78.8-33 112z"],"grid":0,"tags":["ios-microphone-outline"]},{"paths":["M608 384v-32h192v-16c0-115.6-82.8-212.8-192-235.2v123.2h-32v-127.4c-5.2-0.4-10.6-0.6-16-0.6h-32v160h-32v-160h-32c-5.4 0-10.8 0.2-16 0.6v127.4h-32v-123.2c-109.2 22.4-192 119.6-192 235.2v16h192v32h-192v64h192v32h-192v64h192v32h-192v16c0 40.4 10.2 78.6 28 112h520c17.8-33.4 28-71.6 28-112v-16h-192v-32h192v-64h-192v-32h192v-64h-192z","M751.6 736h-479.2c41.2 54.6 105.4 91.4 177.6 95.6l-2 0.4v96h128v-96l-3-0.4c72.8-4 137.2-40.6 178.6-95.6z"],"grid":0,"tags":["ios-microphone"]},{"paths":["M428.2 174.6c0 0 0 0.2-0.2 0.2-25.6 53.4-38.6 111-38.6 170.8 0 105.6 41 205 115.6 279.6 74.6 74.8 173.6 115.8 279.2 115.8 6.4 0 12.8-0.2 19.2-0.4 0.2 0 0.2 0 0.4 0-67.2 78.4-164.4 123.2-267.4 123.2-94.2 0-182.6-36.8-249.2-103.4s-103.2-155.2-103.2-249.6c0-76.6 24-149.4 69.6-210.8 22-29.4 48.2-55.2 78-76.6 29.6-21.2 62.2-37.6 96.6-48.8zM493.8 128c-25.2 2.8-49.8 8-73.2 15.4-155.8 49.4-268.6 195.2-268.6 367.4 0 212.8 172 385.2 384.4 385.2 117.4 0 222.4-52.8 293-135.8 16.2-19 30.4-39.6 42.8-61.6-22.8 5.6-46.2 9-70 10.2-5.8 0.2-11.8 0.4-17.6 0.4-96.8 0-188-37.8-256.4-106.4-68.6-68.6-106.2-160-106.2-257 0-55.2 12.2-108.6 35.4-157 9.8-21.4 22-41.8 36.4-60.8v0z"],"grid":0,"tags":["ios-moon-outline"]},{"paths":["M493.8 128c-25.2 2.8-49.8 8-73.2 15.4-155.8 49.4-268.6 195.2-268.6 367.4 0 212.8 172 385.2 384.4 385.2 117.4 0 222.4-52.8 293-135.8 16.2-19 30.4-39.6 42.8-61.6-22.8 5.6-46.2 9-70 10.2-5.8 0.2-11.8 0.4-17.6 0.4-96.8 0-188-37.8-256.4-106.4-68.6-68.6-106.2-160-106.2-257 0-55.2 12.2-108.6 35.4-157 9.8-21.4 22-41.8 36.4-60.8v0z"],"grid":0,"tags":["ios-moon"]},{"paths":["M779.2 331l-22.6 22.6 141.6 142.4h-370.2v-370.2l142.4 141.8 22.6-22.8-181-181-181 181 22.6 22.6 142.4-141.6v370.2h-370.2l141.6-142.4-22.6-22.6-180.8 181 181 181 22.6-22.6-141.8-142.4h370.2v370l-142.4-141.6-22.6 22.6 181 181 181-181-22.6-22.6-142.4 141.6v-370h370.2l-141.8 142.4 22.6 22.6 181-181z"],"grid":0,"tags":["ios-move"]},{"paths":["M716.6 96.4c-9.4 1.8-212 40.2-220.4 41.8s-16.2 7.2-16.2 16c0 0 0 515.4 0 518.8 0 3.2-0.2 14.4-4.8 23.4-6.2 11.8-17 20.4-32.2 25.4-6.6 2.2-15.6 4.2-26.2 6.6-48.2 10.8-128.8 29-128.8 103.2 0 62 44.8 90 83.4 94.8 4.2 0.6 9 1.6 14.2 1.6 0 0 0 0 0 0 13.4 0 48-2.8 78.4-22.6 22-14.2 48.2-42.8 48.2-95.6v-476.8l224-45.8v-175.6c-0.2-8.6-7.6-17.6-19.6-15.2zM480 809.6c0 30.8-11.2 54.6-33.6 69-23.8 15.6-52.6 17.4-61 17.4 0 0 0 0 0 0-3.8 0-7.2-0.8-10.2-1.2-4.6-0.6-21-3.8-34.6-14.8-13.8-11-20.8-27.4-20.8-48.4 0-45 49.2-59.8 103.8-72.2 11.4-2.6 21.2-4.8 29.2-7.4 11-3.6 19-8.4 27-13.8v71.4zM704 261.4l-192 37.8v-131.6l192-36.4v130.2z"],"grid":0,"tags":["ios-musical-note-outline"]},{"paths":["M716.6 96.4c-9.4 1.8-212 40.2-220.4 41.8s-16.2 7.2-16.2 16c0 0 0 515.4 0 518.8 0 3.2-0.2 14.4-4.8 23.4-6.2 11.8-17 20.4-32.2 25.4-6.6 2.2-15.6 4.2-26.2 6.6-48.2 10.8-128.8 29-128.8 103.2 0 62 44.8 90 83.4 94.8 4.2 0.6 9 1.6 14.2 1.6 0 0 0 0 0 0 13.4 0 48-2.8 78.4-22.6 22-14.2 48.2-42.8 48.2-95.6v-476.8l224-45.8v-175.6c-0.2-8.6-7.6-17.6-19.6-15.2z"],"grid":0,"tags":["ios-musical-note"]},{"paths":["M812.6 96.4c-9.4 1.8-404 78.4-412.4 80s-16.2 7.2-16.2 16c0 0 0 477 0 480.2s-0.2 14.4-4.8 23.4c-6.2 11.8-17 20.4-32.2 25.4-6.6 2.2-15.6 4.2-26.2 6.6-48.2 10.8-128.8 29.2-128.8 103.6 0 62.2 44.8 90.2 83.4 95 4.2 0.6 9 1.4 14.2 1.4 0 0 0 0 0 0 13.4 0 48-2.6 78.4-22.4 22-14.4 48.2-42.8 48.2-95.6v-438l384-78c0 0 0 273.2 0 281.4s-0.4 17.8-5 26.8c-6.2 11.8-17 20.4-32.4 25.4-6.6 2.2-15.6 4.2-26.2 6.6-48.2 10.8-128.8 29-128.8 103.4 0 67.4 52.6 91.2 83.6 94.6 2.4 0.2 5.2 0.2 8.2 0.2 0 0 0 0 0 0 20.4 0 51.4-5 77.6-20 35.8-20.6 55-53.6 55-96.4v-604.2c-0.2-8.8-7.6-17.8-19.6-15.4zM384 809.6c0 31-11.2 54.6-33.6 69.2-23.8 15.6-52.6 17.4-61 17.4 0 0 0 0 0 0-3.8 0-7.2-0.8-10.2-1.2-4.6-0.6-21-3.8-34.6-14.8-13.8-11-20.8-27.4-20.8-48.4 0-45.2 49.2-60 103.8-72.4 11.4-2.6 21.2-4.8 29.2-7.4 11-3.6 19-8.4 27-13.8v71.4zM800 715.6c0 31-13.2 53.8-38.8 68.6-20.8 11.8-46.2 15.8-61.8 15.8 0 0 0 0 0 0-2.6 0-4.2 0.2-4.8 0-9.2-1-55.2-8.4-55.2-62.4 0-45.2 49.2-60 103.8-72.4 11.4-2.6 21.4-4.8 29.4-7.4 11-3.6 19.2-8.4 27.2-13.8v71.6zM800 261.8l-384 76v-132l384-74.4v130.4z"],"grid":0,"tags":["ios-musical-notes-outline"]},{"paths":["M812.6 96.4c-9.4 1.8-404 78.4-412.4 80s-16.2 7.2-16.2 16c0 0 0 477 0 480.2s-0.2 14.4-4.8 23.4c-6.2 11.8-17 20.4-32.2 25.4-6.6 2.2-15.6 4.2-26.2 6.6-48.2 10.8-128.8 29.2-128.8 103.6 0 62.2 44.8 90.2 83.4 95 4.2 0.6 9 1.4 14.2 1.4 0 0 0 0 0 0 13.4 0 48-2.6 78.4-22.4 22-14.4 48.2-42.8 48.2-95.6v-438l384-78c0 0 0 273.2 0 281.4s-0.4 17.8-5 26.8c-6.2 11.8-17 20.4-32.4 25.4-6.6 2.2-15.6 4.2-26.2 6.6-48.2 10.8-128.8 29-128.8 103.4 0 67.4 52.6 91.2 83.6 94.6 2.4 0.2 5.2 0.2 8.2 0.2 0 0 0 0 0 0 20.4 0 51.4-5 77.6-20 35.8-20.6 55-53.6 55-96.4v-604.2c-0.2-8.8-7.6-17.8-19.6-15.4z"],"grid":0,"tags":["ios-musical-notes"]},{"paths":["M720 512h32v96h-32v-96z","M256 576v-32h234l-32-32h-234v96h330l-32-32z","M600 544h72v26h-46l38 38h40v-96h-136z","M768 512h32v96h-32v-96z","M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416zM512 896c-51.8 0-102.2-10.2-149.4-30.2-45.8-19.4-86.8-47-122-82.4-35.2-35.2-63-76.4-82.4-122-20-47.2-30.2-97.6-30.2-149.4s10.2-102.2 30.2-149.4c17.2-40.8 41.2-78 71.2-110.6l542.6 542.6c-32.6 30-69.6 54-110.6 71.2-47.2 20-97.6 30.2-149.4 30.2zM794.6 772l-542.6-542.6c32.6-30 69.6-54 110.6-71.2 47.2-20 97.6-30.2 149.4-30.2s102.2 10.2 149.4 30.2c45.8 19.4 86.8 47 122 82.4 35.2 35.2 63 76.4 82.4 122 20 47.4 30.2 97.6 30.2 149.4s-10.2 102.2-30.2 149.4c-17.2 40.8-41.2 78-71.2 110.6z","M720.4 425.4c-17.6-8.2-44.2-9.4-91.4-9.4-2.4 0-4.8 0-7.2 0-25.4 0.2-31.8-2.2-40-14.2-5.6-8.4-2-29.6 7.4-43.8 3.2-4.8 3.6-11.2 0.8-16.4s-8.2-8.4-14-8.6c-0.2 0-18.8-0.2-36.6-7.8-21.2-9-31.2-24.2-31.2-46.2 0-51.6 33.8-55 35.8-55 8.8 0 16-7.2 16-16s-7.2-16-16-16c-24 0-67.8 21.6-67.8 87 0 35 18 62 51.4 76 8.4 3.4 16.8 5.8 24 7.2-6.6 19.6-7.2 43.8 3.4 59.4 18 26.6 40.6 26.2 66.6 26.2 2.2 0 4.6 0 7 0 52.6 0 69.4 2.4 78 6.4 11.4 5.2 13.4 15 13.4 31.4 0 1.4 0 0.2 0 2.2h32c0 0 0-1 0-2.2 0-14 0.4-45.4-31.6-60.2z","M800 488c0-52-6-78.4-18.2-99-17.2-29-44.8-37-77.8-37h-34.8c5.8-16.6 10.8-47.6 7-69.8-6.4-37.6-30.8-58.2-68.2-58.2-8.8 0-16 7.2-16 16s7.2 16 16 16c32 0 34.2 16.4 36.8 31.6 5 29-13.6 72.2-13.8 72.6-2.8 5-2.6 11 0.2 15.8s8.2 8 13.8 8h59c21.8 0 38.8 1.8 50.2 21.2 6.2 10.6 13.8 26.8 13.8 82.8h32z","M800 488v0 0c0-0.2 0 0 0 0z"],"grid":0,"tags":["ios-no-smoking-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416zM608 224c37.4 0 61.8 20.6 68.2 58.2 3.8 22.2-1.2 53.2-7 69.8h34.8c33 0 60.6 8.2 77.8 36.8 12.2 20.8 18.2 47.2 18.2 99.2h-32c0-56-7.6-72.2-13.8-82.8-11.4-19.4-28.4-21.2-50.2-21.2h-59c-5.6 0-11-3.2-13.8-7.8-2.8-4.8-3-10.8-0.2-15.8 0.2-0.4 18.8-43.6 13.8-72.6-2.6-15.2-4.8-31.6-36.8-31.6-8.8 0-16-7.2-16-16s7.2-16.2 16-16.2zM544 192c8.8 0 16 7.2 16 16s-7.2 16-16 16c-2 0-35.8 3.4-35.8 55 0 22 10 37.2 31.2 46.2 17.8 7.6 36.4 7.8 36.6 7.8 5.8 0.2 11.2 3.4 14 8.6s2.4 11.6-0.8 16.4c-9.4 14.2-13 35.4-7.4 43.8 8.2 12 14.6 14.4 40 14.2 2.4 0 4.8 0 7.2 0 47.2 0 73.8 1.2 91.4 9.4 32 14.8 31.6 46.2 31.6 60.4 0 1.2 0 2.2 0 2.2h-32c0-2 0-0.8 0-2.2 0-16.4-2-26-13.4-31.4-8.6-4-25.4-6.4-78-6.4-2.4 0-4.8 0-7 0-26 0-48.6 0.4-66.6-26.2-10.6-15.6-10-40-3.4-59.6-7.2-1.4-15.6-3.8-24-7.2-33.4-14-51.4-41-51.4-76-0-65.4 43.8-87 67.8-87zM752 512v96h-32v-96h32zM704 512v96h-40l-96-96h136zM224 608v-96h234l96 96h-330zM783.6 783.6c-3.8 3.8-7.6 7.4-11.6 11l-542.6-542.6c3.6-4 7.2-7.8 11-11.6s7.6-7.4 11.6-11l542.6 542.6c-3.6 3.8-7.2 7.8-11 11.6zM800 608h-32v-96h32v96zM800 488c0 0 0-0.2 0 0v0 0z","M800 488v0 0c0-0.2 0 0 0 0z"],"grid":0,"tags":["ios-no-smoking"]},{"paths":["M576 800c0 36-28.8 64-64 64s-64.4-28-64.4-64h-32c0 54 43.2 96 96.2 96s96.2-42 96.2-96h-32z","M267.6 64l-27.6 16.2 516.4 879.8 27.6-16.2z","M472.6 208.4c33.6-4.2 44.4-4.8 79.4 0 41.6 5.8 83.2 28 110.4 60.8 35.4 42.8 53.4 106.4 53.4 189.2 0 102.8 8.8 169.8 28.4 217.4 10.4 25.2 23.4 44 38 60h-83l18.8 32h146c-70.8-64-116.2-78-116.2-309.8 0-198.2-98-265.8-189.8-281.2 0-1.2 0.2-2.2 0.2-3.4 0-25.4-20.6-46-46-46s-46 20.6-46 46c0 1.2 0 2.4 0.2 3.6-26.2 4.4-53 13.2-77.8 28l16 27.4c20.4-12.4 43.8-21 68-24z","M242.2 736c14.4-16 27.4-34.6 37.8-59.8 19.6-47.6 28.2-114.6 28.2-217.6 0-60.4 9.6-110.8 28.8-150.2l-19-32.4c-25.6 42.8-41.8 101.8-41.8 182.4 0 231.8-45 245.6-116.2 309.6h445.8l-18.8-32h-344.8z"],"grid":0,"tags":["ios-notifications-off-outline"]},{"paths":["M415.6 800c0 54 43.2 96 96.2 96s96.2-42 96.2-96h-192.4z","M267.6 64l-27.6 16.2 516.4 879.8 27.6-16.2z","M747.8 458c0-198.2-98-265.8-189.8-281.2 0-1.2 0.2-2.2 0.2-3.4 0-25.4-20.6-46-46-46s-46 20.6-46 46c0 1.2 0 2.4 0.2 3.6-26.2 4.4-53 13.2-77.8 28l329.4 562.8h146c-70.8-64-116.2-78-116.2-309.8z","M276.2 458.4c0 231.8-45 245.6-116.2 309.6h445.8l-287.8-492c-25.6 42.8-41.8 101.8-41.8 182.4z"],"grid":0,"tags":["ios-notifications-off"]},{"paths":["M576 800c0 34-28.8 64-64 64s-64.4-30-64.4-64h-32c0 52 43.2 95.8 96.2 95.8s96.2-43.8 96.2-95.8h-32z","M747.8 458.4c0-198-98-265.6-189.8-281 0-1.2 0.2-2.2 0.2-3.4 0-25.4-20.6-46-46-46s-46 20.6-46 46c0 1.2 0 2.4 0.2 3.6-91.8 15.6-189.8 83.8-189.8 281.4-0.4 231-45.4 245-116.6 309h704c-70.8-64-116.2-78.2-116.2-309.6zM242.2 736c14.4-16 27.4-34.8 37.8-60 19.6-47.4 28.2-114.6 28.2-217.4 0-82.6 18-146.2 53.6-189 27.2-32.8 67.4-55.4 110.8-61 33.6-4.2 44.4-4.8 79.4 0 41.6 5.8 83.2 28 110.4 60.8 35.4 42.8 53.4 106.4 53.4 189 0 102.8 8.8 169.8 28.4 217.4 10.4 25.2 23.4 44.2 38 60.2h-540z"],"grid":0,"tags":["ios-notifications-outline"]},{"paths":["M415.6 800c0 52 43.2 95.8 96.2 95.8s96.2-43.8 96.2-95.8h-192.4z","M747.8 458.4c0-198-98-265.6-189.8-281 0-1.2 0.2-2.2 0.2-3.4 0-25.4-20.6-46-46-46s-46 20.6-46 46c0 1.2 0 2.4 0.2 3.6-91.8 15.6-189.8 83.8-189.8 281.4-0.4 231-45.4 245-116.6 309h704c-70.8-64-116.2-78.2-116.2-309.6z"],"grid":0,"tags":["ios-notifications"]},{"paths":["M640 544c0-47.6-26.2-89.4-65-111.4l162.4-275.8c-66.2-38.6-143.2-60.8-225.4-60.8-82.4 0-159.8 22.4-226.2 61.2l159.2 277.8c-36.6 22.6-61 63-61 109h-320c0 166.6 93.8 306.8 228.8 384l156.2-272.6c18.6 10.6 40.2 16.6 63 16.6s44.2-6 62.6-16.4l156.6 272.4c135-77.2 228.8-217.4 228.8-384h-320zM330 169.8c56.4-27.4 118.8-41.8 182-41.8 62.8 0 124.8 14.2 180.8 41.4l-147.8 251c-10.6-2.8-21.6-4.4-33-4.4-13.2 0-26 2-38 5.8l-144-252zM281.4 883.4c-51.6-34.6-94.8-79.2-126.4-130.6-33-53.6-52.6-114.2-57.8-176.8h290.8c6 23.2 18.4 43.8 35 60l-141.6 247.4zM416 544c0-34.2 18-64.2 44.8-81.2v0c0.8-0.6 1.6-1 2.4-1.6 14.2-8.4 31-13.2 48.6-13.2 53 0 96 43 96 96s-43 96-96 96-95.8-43-95.8-96zM742.4 883.4l-142.2-247c17-16.2 29.6-37 35.6-60.4h290.8c-5 62.6-24.8 123.2-57.8 176.8-31.4 51.4-74.8 96-126.4 130.6z"],"grid":0,"tags":["ios-nuclear-outline"]},{"paths":["M608 544c0 53.019-42.981 96-96 96s-96-42.981-96-96c0-53.019 42.981-96 96-96s96 42.981 96 96z","M960 544h-320c0 47.8-26.2 89.4-65.2 111.4l156.4 272.6c135-77.2 228.8-217.4 228.8-384z","M512 416c23.4 0 45.4 6.4 64.2 17.4l161.2-276.6c-66.2-38.6-143.2-60.8-225.4-60.8-82.4 0-159.8 22.4-226.2 61.2l159.6 277.6c19.4-12 42.2-18.8 66.6-18.8z","M384 544h-320c0 166.6 93.8 306.8 228.8 384l156.4-272.6c-39-22-65.2-63.6-65.2-111.4z"],"grid":0,"tags":["ios-nuclear"]},{"paths":["M800 864h-640v-640h352v-32h-384v704h704v-384h-32z","M640 128v32h200l-392 393.8 22.2 22.2 393.8-392v200h32v-256z"],"grid":0,"tags":["ios-open-outline"]},{"paths":["M640 128v32h200l-392 393.8 22.2 22.2 393.8-392v200h32v-256z","M470.2 621.6l-67.8-67.6 359.6-362h-634v704h704v-634z"],"grid":0,"tags":["ios-open"]},{"paths":["M704 208c17.674 0 32 14.326 32 32s-14.326 32-32 32-32-14.326-32-32 14.326-32 32-32zM704 176c-35.29 0-64 28.71-64 64s28.71 64 64 64 64-28.71 64-64-28.71-64-64-64v0z","M704 752c17.674 0 32 14.326 32 32s-14.326 32-32 32-32-14.326-32-32 14.326-32 32-32zM704 720c-35.29 0-64 28.71-64 64s28.71 64 64 64 64-28.71 64-64-28.71-64-64-64v0z","M320 480c17.674 0 32 14.326 32 32s-14.326 32-32 32-32-14.326-32-32 14.326-32 32-32zM320 448c-35.29 0-64 28.71-64 64s28.71 64 64 64 64-28.71 64-64-28.71-64-64-64v0z","M414.64 496h545.36v32h-545.36c0.878-5.208 1.36-10.546 1.36-16s-0.48-10.792-1.36-16z","M224 512c0 5.454 0.48 10.792 1.36 16h-161.36v-32h161.36c-0.88 5.208-1.36 10.546-1.36 16z","M798.64 768h161.36v32h-161.36c0.878-5.208 1.36-10.546 1.36-16s-0.48-10.792-1.36-16z","M608 784c0 5.454 0.48 10.792 1.36 16h-545.36v-32h545.36c-0.88 5.208-1.36 10.546-1.36 16z","M798.64 224h161.36v32h-161.36c0.878-5.208 1.36-10.546 1.36-16s-0.48-10.792-1.36-16z","M609.36 224c-0.878 5.208-1.36 10.546-1.36 16s0.48 10.792 1.36 16h-545.36v-32h545.36z"],"grid":0,"tags":["ios-options-outline"]},{"paths":["M64 752h566.7c12.372-28.224 40.562-48 73.3-48s60.93 19.776 73.3 48h182.7v64h-182.7c-12.372 28.224-40.562 48-73.3 48s-60.93-19.776-73.3-48h-566.7z","M64 480h182.7c12.372-28.224 40.562-48 73.3-48s60.93 19.776 73.3 48h566.7v64h-566.7c-12.372 28.224-40.562 48-73.3 48s-60.93-19.776-73.3-48h-182.7z","M64 208h566.7c12.372-28.224 40.562-48 73.3-48s60.93 19.776 73.3 48h182.7v64h-182.7c-12.372 28.224-40.562 48-73.3 48s-60.93-19.776-73.3-48h-566.7z"],"grid":0,"tags":["ios-options"]},{"paths":["M742.8 128h-461.6c-130.2 78-217.2 221-217.2 384s87 304 217.2 384h461.8c130-80 217-221 217-384s-87-306-217.2-384zM733.6 864h-443.2c-57.4-38-105.2-87.4-139-145.4-36.2-62.6-55.4-134.6-55.4-207.4 0-73 19.2-144.6 55.4-207.4 34-58.6 81.8-109.8 138.8-143.8h443.6c61.6 40 104.8 85 138.6 143.6 36.4 63 55.4 134.6 55.4 207.6 0 72.8-19.2 144.8-55.4 207.4-33.6 58.2-81.4 107.4-138.8 145.4z","M640 320h64v192h-64v-192z","M320 288h64v256h-64v-256z","M512 640v0c-35.2 0-64 28.8-64 64v96h128v-96c0-35.2-28.8-64-64-64z"],"grid":0,"tags":["ios-outlet-outline"]},{"paths":["M742.8 128h-461.6c-130.2 78-217.2 221-217.2 384s87 304 217.2 384h461.8c130-80 217-221 217-384s-87-306-217.2-384zM384 544h-64v-256h64v256zM576 800h-128v-96c0-35.2 28.8-64 64-64s64 28.8 64 64v96zM704 512h-64v-192h64v192z"],"grid":0,"tags":["ios-outlet"]},{"paths":["M224 96v736h32v-704h608v738.2c0 16.4-13.4 29.8-29.8 29.8h-644.4c-16.4 0-29.8-13.4-29.8-29.8v-610.2h32v-32h-64v642.2c0 34 27.6 61.8 61.8 61.8h644.6c34 0 61.8-27.6 61.8-61.8v-770.2h-672.2z","M320 224h256v32h-256v-32z","M320 384h480v32h-480v-32z","M320 544h384v32h-384v-32z","M320 704h480v32h-480v-32z"],"grid":0,"tags":["ios-paper-outline"]},{"paths":["M96 541.8l239.8 103.2 59.6 275 115-161.8 233.6 169.8 184-832-832 445.8zM829.8 184.8l-486.2 428.6-174-74.8 660.2-353.8zM367 638l-0.4-2.2 336.2-304.4-300.6 349.6 0.8 0.6h-1l-3.2 103.2-31.8-146.8zM429.8 816.4l3.6-113.4 51.4 36.4-0.2 0.2-54.8 76.8zM724.2 869.6l-274.2-194.6 429.8-509-155.6 703.6z"],"grid":0,"tags":["ios-paper-plane-outline"]},{"paths":["M928 96l-832 445.8 221 95 595.2-524.4-482.8 586.6-2.2 174.8 83.2-115.8 233.6 170z","M339.2 660.6l56.2 259.4h0.8v-1l5.8-237.4 300.6-350.2z"],"grid":0,"tags":["ios-paper-plane"]},{"paths":["M224 96v736h-32v-608h-64v642.2c0 34 27.6 61.8 61.8 61.8h644.6c34 0 61.8-27.6 61.8-61.8v-770.2h-672.2zM320 224h256v32h-256v-32zM320 544h384v32h-384v-32zM800 736h-480v-32h480v32zM800 416h-480v-32h480v32z"],"grid":0,"tags":["ios-paper"]},{"paths":["M320 128h32v108h-32v-108z","M32 416h110v32h-110v-32z","M119 234.8l22-22.2 62.8 63-22 22.2z","M478.8 295.8l-22-22.2 62.6-63 22.2 22.2z","M145 641.4l-22-22.2 62.8-63 22 22.2z","M307.8 535.8c-52.6-10.4-92.4-56.8-92.4-112.4 0-63.2 51.4-114.6 114.6-114.6 36.6 0 69.2 17.2 90.2 44 9.4-5.4 19.2-10.2 29.4-14.2-26.6-37.4-70.2-61.8-119.6-61.8-81 0-146.6 65.6-146.6 146.6 0 73.6 54.2 134.6 125 145-0.6-6.6-1-13.4-1-20.2 0-4.2 0-8.2 0.4-12.4z","M806.6 518.4c-1.6 0-3.2 0-4.8 0-6.2 0-12.2 0-18 0.8-22.6-100.6-112.2-176.4-219.4-176.4-29.2 0-57.2 5.6-82.8 15.8-10.2 4-20 8.8-29.4 14.2-64 37-108.2 104.8-112.4 183.2-0.2 4.2-0.4 8.2-0.4 12.4 0 6.8 0.4 13.6 1 20.2 0 0.8 0.2 1.6 0.2 2.2-75.8 6.8-135.2 74.2-135.2 152 0 82.2 66.6 153.4 148.6 153.4h452.8c102.4 0 185.4-86.8 185.4-189.6-0.2-102.8-83.2-188.2-185.6-188.2zM914.8 817.4c-29.2 30-67.6 46.6-108.2 46.6h-452.8c-63.2 0-116.6-55.8-116.6-121.4 0-29.8 11-58.8 31.2-81.4 19.8-22.4 46.6-36.2 75-38.6l32.2-2.8-3-30.2-0.2-2c-0.6-6.4-1-13-1-19.4 0-3.6 0.2-7.2 0.2-10.6 3.6-67.2 41.6-125.4 96.6-157.2 9.2-5.4 19-10 29-13.6 20.8-7.8 43.4-12 67-12 44.6 0 86.4 15 121.2 43.2 33.8 27.6 57.4 66 67 108.2l6.4 28.4 28.8-3.6c4.2-0.6 9.4-0.6 14.2-0.6h5c40.8 0 79.2 16.4 108.4 45.8 29.2 29.6 45.2 68.8 45.2 110-0.4 41.6-16.4 81.2-45.6 111.2z"],"grid":0,"tags":["ios-partly-sunny-outline"]},{"paths":["M320 128h32v108h-32v-108z","M32 416h110v32h-110v-32z","M119 234.8l22-22.2 62.8 63-22 22.2z","M478.8 295.8l-22-22.2 62.6-63 22.2 22.2z","M145 641.4l-22-22.2 62.8-63 22 22.2z","M330 276.6c-81 0-146.6 65.6-146.6 146.6 0 73.6 54.2 134.6 125 145 0 0-2.4-85.8 37.8-145.8s103.6-84 103.6-84c-26.8-37.4-70.4-61.8-119.8-61.8z","M806.6 518.4c-1.6 0-3.2 0-4.8 0-6.2 0-12.2 0-18 0.8-22.6-100.6-112.2-176.4-219.4-176.4-29.2 0-57.2 5.6-82.8 15.8-10.2 4-20 8.8-29.4 14.2-64 37-108.2 104.8-112.4 183.2-0.2 4.2-0.4 8.2-0.4 12.4 0 6.8 0.4 13.6 1 20.2 0 0.8 0.2 1.6 0.2 2.2-75.8 6.8-135.2 74.2-135.2 152 0 82.2 66.6 153.4 148.6 153.4h452.8c102.4 0 185.4-86.8 185.4-189.6-0.2-102.8-83.2-188.2-185.6-188.2z"],"grid":0,"tags":["ios-partly-sunny"]},{"paths":["M648.6 160.6c-2.4-0.4-4.8-0.6-7.2-0.6v0.2c-0.2 0-0.4 0-0.8 0-44 0-85.8 51.8-95.6 120.6-10.6 73.2 18.8 138 65.4 144.8 2.6 0.4 5.4 0.6 8 0.6 44 0 85.8-51.8 95.6-120.6 10.6-73.4-18.8-138.2-65.4-145zM682.6 300.8c-8 55.8-39.8 93.2-64.2 93.2-1.2 0-2.4 0-3.4-0.2-11.4-1.6-22.2-12.2-29.8-29-9.8-21.6-13-50.4-8.8-79.4 8-55.4 39.6-92.6 64-93.2 1.2 0 3.2 0.2 4 0.2 11.4 1.6 22 12.2 29.6 29 9.8 21.4 12.8 50.4 8.6 79.4z","M641.2 160v0 0z","M884.6 338.8c-7-2.8-14.2-4.2-21.8-4.2-0.2 0-0.6 0-0.8 0v0 0c-39.4 0.6-83.6 38.4-106.8 95.6-27.8 68.4-15 138.4 28.8 156.4 7 2.8 14.2 4.2 21.8 4.2 39.6 0 84.4-38 107.8-95.6 27.6-68.4 14.6-138.4-29-156.4zM883.8 483c-9.4 23-23.2 43.4-39.2 57.4-13.4 11.6-27.6 18.4-39 18.4-3.6 0-6.8-0.6-9.8-1.8-10.6-4.4-18.6-17.2-22-35.4-4.2-23.2-0.4-52.2 10.6-79.2 9.4-23 23.4-43.4 39.2-57.4 13.2-11.6 27-18.2 38.4-18.4 3.8 0 7 0.6 10 1.8 10.6 4.4 18.8 17.2 22.2 35.4 4.4 23.4 0.6 52.2-10.4 79.2z","M655.2 590.8c-55.6-87.2-79.6-120-143.2-120s-87.8 33-143.4 120c-47.6 74.4-143.8 80.6-167.8 143.8-4.8 11.2-7.2 23.4-7.2 36.4 0 51.4 41.6 93 92.8 93 63.6 0 150.2-48 225.8-48s161.8 48 225.4 48c51.2 0 92.6-41.6 92.6-93 0-13-2.6-25.2-7.4-36.4-24-63.4-120-69.4-167.6-143.8zM737.6 832c-25.6 0-58.8-10.2-94-21-43-13.2-87.4-27-131.6-27s-88.6 13.6-131.6 26.8c-35.2 10.8-68.4 21-94 21-33.6 0-61-27.4-61-61 0-8.6 1.6-16.6 4.6-23.8l0.4-1.2c8-21.2 32-34.8 62.2-52 35.2-20 75-42.6 102.8-86 55.4-86.8 71.6-105.4 116.6-105.4 23.6 0 38 5.2 53.2 19 18 16.6 37.6 46.2 63.2 86.4 27.8 43.4 67.4 66 102.6 86 30.2 17.2 54 30.8 62.2 52l0.4 1.2c3.2 7.6 4.8 15.6 4.8 23.8-0 33.8-27.2 61.2-60.8 61.2z","M405.6 426c2.6 0 5.4-0.2 8-0.6 46.8-6.8 76-71.6 65.4-144.8-10-69-51.8-120.6-95.6-120.6-2.6 0-5.4 0.2-8 0.6-46.8 6.8-76 71.6-65.4 144.8 10 68.8 51.8 120.6 95.6 120.6zM350.2 221.2c7.6-16.8 18.4-27.4 29.8-29 1.2-0.2 2.2-0.2 3.4-0.2 24.6 0 56.2 37.4 64.2 93.2 4.2 29 1 58-8.8 79.4-7.6 16.8-18.4 27.4-29.8 29-1.2 0.2-2.2 0.2-3.4 0.2-24.6 0-56.2-37.4-64.2-93.2-4.2-28.8-1-57.8 8.8-79.4z","M240.2 586.6c43.8-18 56.6-88 28.8-156.4-23.4-57.6-68.2-95.6-107.8-95.6-7.6 0-14.8 1.4-21.8 4.2-43.8 18-56.6 88-28.8 156.4 23.4 57.6 68.2 95.6 107.8 95.6 7.6-0 14.8-1.4 21.8-4.2zM140.2 483c-11-27-14.8-56-10.6-79.2 3.4-18.2 11.4-31.2 22-35.4 3-1.2 6.2-1.8 9.8-1.8 11.6 0 25.8 6.6 39 18.4 16 14 29.8 34.4 39.2 57.4 22 54 12.2 105-11.4 114.6-3 1.2-6.2 1.8-9.8 1.8-11.6 0-25.8-6.6-39-18.4-16-14-30-34.4-39.2-57.4z"],"grid":0,"tags":["ios-paw-outline"]},{"paths":["M648.6 160.6c-2.4-0.4-4.8-0.6-7.2-0.6v0.2c-0.2 0-0.4 0-0.8 0-44 0-85.8 51.8-95.6 120.6-10.6 73.2 18.8 138 65.4 144.8 2.6 0.4 5.4 0.6 8 0.6 44 0 85.8-51.8 95.6-120.6 10.6-73.4-18.8-138.2-65.4-145z","M641.2 160v0 0z","M884.6 338.8c-7-2.8-14.2-4.2-21.8-4.2-0.2 0-0.6 0-0.8 0v0 0c-39.4 0.6-83.6 38.4-106.8 95.6-27.8 68.4-15 138.4 28.8 156.4 7 2.8 14.2 4.2 21.8 4.2 39.6 0 84.4-38 107.8-95.6 27.6-68.4 14.6-138.4-29-156.4z","M655.2 590.8c-55.6-87.2-79.6-120-143.2-120s-87.8 33-143.4 120c-47.6 74.4-143.8 80.6-167.8 143.8-4.8 11.2-7.2 23.4-7.2 36.4 0 51.4 41.6 93 92.8 93 63.6 0 150.2-48 225.8-48s161.8 48 225.4 48c51.2 0 92.6-41.6 92.6-93 0-13-2.6-25.2-7.4-36.4-24-63.4-120-69.4-167.6-143.8z","M405.6 426c2.6 0 5.4-0.2 8-0.6 46.8-6.8 76-71.6 65.4-144.8-10-69-51.8-120.6-95.6-120.6-2.6 0-5.4 0.2-8 0.6-46.8 6.8-76 71.6-65.4 144.8 10 68.8 51.8 120.6 95.6 120.6z","M240.2 586.6c43.8-18 56.6-88 28.8-156.4-23.4-57.6-68.2-95.6-107.8-95.6-7.6 0-14.8 1.4-21.8 4.2-43.8 18-56.6 88-28.8 156.4 23.4 57.6 68.2 95.6 107.8 95.6 7.6-0 14.8-1.4 21.8-4.2z"],"grid":0,"tags":["ios-paw"]},{"paths":["M832 306h-50v-50h-28v50h-50v28h50v50h28v-50h50z","M404.8 403.4c0 0 0 0 0 0v0z","M726.6 727.8c-25.8-9.2-62.8-12.4-86.4-17.6-13.6-3-33.4-10.6-40-18.4-6.6-8-2.6-81.8-2.6-81.8s12.2-19.2 18.8-36c6.6-16.8 13.8-62.8 13.8-62.8s13.6 0 18.4-23.8c5.2-26 13.2-36.8 12.2-56.2-1-18-10.4-19-11.4-19 0 0 0 0 0 0s9.8-27.2 11.2-84.8c1.6-68.2-50.6-135.4-148.6-135.4s-150 67-148.6 135.2c1.2 57.4 11.2 84.8 11.2 84.8s0 0 0 0c-1 0-10.4 1-11.4 19-1 19.4 7.2 29.8 12.2 55.8 4.8 23.8 18.4 24 18.4 24s7.2 46.2 13.8 63c6.6 17 18.8 36 18.8 36s4 73.8-2.6 81.8c-6.6 8-26.4 15.4-40 18.4-23.8 5.2-60.6 8.6-86.4 17.8s-105.4 40.2-105.4 104.2h640c0-64-79.6-95-105.4-104.2zM512 800h-274.6c4-6 9.4-10.2 16.4-15.2 14-10.2 32.2-19.6 54.2-27.2 13.6-4.8 33.4-8 50.8-10.6 11.4-1.8 22.2-3.4 31.8-5.6 6.8-1.6 41.6-10 57.6-29.2 9-10.8 11.6-25.4 11.2-64.6-0.2-20-1.2-38.6-1.2-39.4l-0.4-8.4-4.6-7c-3-4.6-11.6-19-16-30.6-3.6-9.4-9.2-38.4-12-56.2 0 0 0.8 2-1-7.4s-16.8-8.6-18.8-16c-1.8-7.2-3.6-13.8-8.6-36.4s5.6-22.4 7.8-32.4c1.2-6.2 0-11.4 0-11.6 0 0 0 0 0 0-0.6-2-8.2-26.8-9.4-75.4-0.6-26.4 9.2-51.2 27.6-69.8 21.2-21.6 52-33 89-33 38 0 68 11.4 89.2 33 18.4 18.6 28.2 43.4 27.6 69.8-1 48.4-8.6 73.2-9.4 75.4 0 0 0 0 0 0 0 0.2-1.2 3.4-0.8 10.4 0.4 10.8 13.6 11 8.6 33.6s-6.8 29.2-8.6 36.4c-1.8 7.2-17 6.6-18.8 16s-1 7.4-1 7.4c-2.8 17.8-8.4 46.8-12 56.2-4.6 11.6-13.2 26-16 30.6l-4.6 7-0.4 8.4c0 0.8-1 19.4-1.2 39.4-0.4 39.2 2.2 53.8 11.2 64.6 16 19 50.8 27.6 57.6 29.2 9.6 2.2 20.4 3.8 31.8 5.6 17.4 2.6 37.2 5.8 50.8 10.6 22 7.8 40.4 17.2 54.2 27.4 7 5 12.4 9.2 16.4 15.2h-274.4z"],"grid":0,"tags":["ios-person-add-outline"]},{"paths":["M832 306h-50v-50h-28v50h-50v28h50v50h28v-50h50z","M726.6 727.8c-25.8-9.2-62.8-12.4-86.4-17.6-13.6-3-33.4-10.6-40-18.4-6.6-8-2.6-81.8-2.6-81.8s12.2-19.2 18.8-36c6.6-16.8 13.8-62.8 13.8-62.8s13.6 0 18.4-23.8c5.2-26 13.2-36.8 12.2-56.2-1-18-10.4-19-11.4-19 0 0 0 0 0 0s9.8-27.2 11.2-84.8c1.6-68.2-50.6-135.4-148.6-135.4s-150 67-148.6 135.2c1.2 57.4 11.2 84.8 11.2 84.8s0 0 0 0c-1 0-10.4 1-11.4 19-1 19.4 7.2 29.8 12.2 55.8 4.8 23.8 18.4 24 18.4 24s7.2 46.2 13.8 63c6.6 17 18.8 36 18.8 36s4 73.8-2.6 81.8c-6.6 8-26.4 15.4-40 18.4-23.8 5.2-60.6 8.6-86.4 17.8s-105.4 40.2-105.4 104.2h640c0-64-79.6-95-105.4-104.2z"],"grid":0,"tags":["ios-person-add"]},{"paths":["M64 352.6v317c0 36.6 29.2 66.2 65.8 66.2h762c36.8 0 68.2-29.6 68.2-66.2v-317c0-36.6-31.4-64.6-68.2-64.6h-762c-36.6 0-65.8 28-65.8 64.6zM110 542v-60c0-4.4 3.6-8 8-8s8 3.6 8 8v60c0 4.4-3.6 8-8 8s-8-3.6-8-8zM938 511c0 19.2-15.6 34.8-34.8 34.8s-34.8-15.6-34.8-34.8c0-19.2 15.6-34.8 34.8-34.8s34.8 15.6 34.8 34.8zM848 320v384h-682v-384h682z","M883.2 511c0 11 9 20 19.8 20 11 0 20-9 20-20s-9-20-20-20c-10.8 0.2-19.8 9-19.8 20z"],"grid":0,"tags":["ios-phone-landscape"]},{"paths":["M671.4 64h-317.2c-36.6 0-66.2 29.2-66.2 65.8v762c0 36.8 29.6 68.2 66.2 68.2h317c36.6 0 64.6-31.4 64.6-68.2v-762c0.2-36.6-27.8-65.8-64.4-65.8zM482 110h60c4.4 0 8 3.6 8 8s-3.6 8-8 8h-60c-4.4 0-8-3.6-8-8s3.6-8 8-8zM513 938c-19.2 0-34.8-15.6-34.8-34.8s15.6-34.8 34.8-34.8c19.2 0 34.8 15.6 34.8 34.8s-15.6 34.8-34.8 34.8zM704 848h-384v-682h384v682z","M513 883.2c-11 0-20 9-20 19.8 0 11 9 20 20 20s20-9 20-20c-0.2-10.8-9-19.8-20-19.8z"],"grid":0,"tags":["ios-phone-portrait"]},{"paths":["M512 128c141.2 0 256 105.6 256 235.4 0 79-48 197.4-138.8 342.8-44.8 71.8-90.2 134-117.2 169.6-27-35.6-72-97.4-116.8-169-91-145.6-139.2-264.4-139.2-343.4 0-129.8 114.8-235.4 256-235.4zM512 96c-159 0-288 119.8-288 267.4 0 208 288 564.6 288 564.6s288-356.6 288-564.6c0-147.6-129-267.4-288-267.4v0z","M512 256c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128-57.4-128-128-128zM512 477.8c-51.8 0-93.8-42-93.8-93.8s42-93.8 93.8-93.8 93.8 42 93.8 93.8-42 93.8-93.8 93.8z"],"grid":0,"tags":["ios-pin-outline"]},{"paths":["M512 96c-159 0-288 119.8-288 267.4 0 208 288 564.6 288 564.6s288-356.6 288-564.6c0-147.6-129-267.4-288-267.4zM512 477.8c-51.8 0-93.8-42-93.8-93.8s42-93.8 93.8-93.8 93.8 42 93.8 93.8-42 93.8-93.8 93.8z"],"grid":0,"tags":["ios-pin"]},{"paths":["M736 350.4c0-39-2-163.4-38.6-231.2-9-16.4-25-23.2-63.4-23.2h-244c-38.6 0-54.4 6.8-63.4 23.2-36.6 67.8-38.6 193-38.6 232 0 182 64 186.2 64 335.6 0 73.4-32 133.4-32 185.4 0 50.2 18 55.6 64 55.6h256c46 0 64-5.8 64-55.8 0-52-32-111.4-32-184.8 0-149.4 64-154.8 64-336.8zM354.8 134c1-1.8 1.4-2 4-3 4-1.6 12.8-3 31.2-3h244c18.2 0 27 1.4 31.2 3 2.8 1 3.2 1.4 4.2 3.2 14.2 26.2 24.4 67.6 30 119.8h-374.6c5.6-52.2 15.8-94 30-120zM669.6 893.2c-2.8 1.2-10.4 2.8-29.6 2.8h-256c-19.2 0-26.8-1.6-29.8-2.8-0.8-1.8-2.2-7.6-2.2-21 0-19.6 6-42.4 12.8-68.6 9-34 19.2-72.6 19.2-116.6 0-77-16.2-119.6-31.8-160.8-16.6-43.8-32.2-85.4-32.2-175 0-22.8 0.8-44.6 2-65h380c1.4 20.4 2 42 2 64.4 0 89.6-15.6 131.4-32.4 175.6-15.6 41.4-31.6 84.2-31.6 161.2 0 44 10.2 82.4 19.2 116.2 7 26.2 12.8 49 12.8 68.6 0 13.4-1.6 19.2-2.4 21z"],"grid":0,"tags":["ios-pint-outline"]},{"paths":["M736 350.4c0-39-2-163.4-38.6-231.2-9-16.4-25-23.2-63.4-23.2h-244c-38.6 0-54.4 6.8-63.4 23.2-36.6 67.8-38.6 193-38.6 232 0 182 64 186.2 64 335.6 0 73.4-32 133.4-32 185.4 0 50.2 18 55.6 64 55.6h256c46 0 64-5.8 64-55.8 0-52-32-111.4-32-184.8 0-149.4 64-154.8 64-336.8zM354.8 134c1-1.8 1.4-2 4-3 4-1.6 12.8-3 31.2-3h244c18.2 0 27 1.4 31.2 3 2.8 1 3.2 1.4 4.2 3.2 14.2 26.2 24.4 67.6 30 119.8h-374.6c5.6-52.2 15.8-94 30-120z"],"grid":0,"tags":["ios-pint"]},{"paths":["M836.6 183c-60.2-27-152-55-323.2-55-170.8 0-260 24.6-323 54.8-55 26.2-38.2 48-26.2 73.2 8 17.2 16.4 23.6 29 23.6 1 0 2 0 2.8-0.2l317.4 616.6 316.6-615c0.6 0 1.2 0 1.8 0 13 0 22-6.8 31-25.2 12.2-24.8 19.6-52.4-26.2-72.8zM266.6 347.8c18-7.8 38-8.8 56.8-2.4 20 6.8 36.4 21.2 45.8 40.2 9.4 19.2 10.8 40.8 4.2 61-6 18-17.8 33-33.8 42.6-26.8-51.6-52.2-101-73-141.4zM593.6 660.8c-43.8 0-79.4-35.8-79.4-80s35.6-80 79.4-80c28 0 53.4 14.6 67.8 38.4l-62.4 121.4c-1.8 0.2-3.6 0.2-5.4 0.2zM677.6 507.6c-20.8-24.4-51.2-38.6-84-38.6-61.2 0-111.2 50.2-111.2 112 0 58 44 105.8 100.2 111.4l-69.2 134.8c-28.6-55.4-95.8-186-159.2-309 23.2-13.6 40.6-35 49.2-61 9.4-28.4 7.4-58.8-5.8-85.6-26.6-54.2-91.4-77-145.6-52.2-10-19.4-18.4-35.8-24.6-47.8 45.8-15.4 126.6-47.6 285.8-47.6 1 0 1.8 0 2.8 0-1.4 54.6 38 103.2 93 111.4 5.4 0.8 10.8 1.2 16.2 1.2 23.2 0 45.8-7.4 64.8-21.6 21.2-15.8 35.6-38.2 41.2-63.8 28.6 8 50.2 16.4 67 22.2l-120.6 234.2zM548 224.6c63.8 2 113.6 9.6 152.6 18.6-4 18.4-14.2 34.6-29.4 46-16.6 12.4-36.8 17.6-57.2 14.6s-38.4-13.8-50.6-30.6c-10.8-14.2-16-31.2-15.4-48.6zM834.2 241.8c-1.8 3.8-3.2 6-4.2 7.2-6.6-0.8-19.6-5.4-33.4-10.2-49.2-17.6-131.4-46.8-283.2-46.8-152.6 0-235.6 28.6-285.2 45.6-13.2 4.6-25.8 8.8-32.6 9.8-0.6-1.2-1.6-2.8-2.8-5.2s-2.2-4.8-3.4-7c-1.8-3.6-4.2-8.4-5.2-11.6 2.2-2 7.4-6.4 19.6-12.2 50.4-24 131.2-51.6 309.4-51.6 173.4 0 260.2 29.8 310.4 52.2 14.4 6.4 16.4 11.2 16.4 11.2 0.2 0.6 1.2 4.2-5.8 18.6z"],"grid":0,"tags":["ios-pizza-outline"]},{"paths":["M836.6 183c-60.2-27-152-55-323.2-55-170.8 0-260 24.6-323 54.8-55 26.2-38.2 48-26.2 73.2 8 17.2 16.4 23.6 29 23.6 1 0 2 0 2.8-0.2l317.4 616.6 316.6-615c0.6 0 1.2 0 1.8 0 13 0 22-6.8 31-25.2 12.2-24.8 19.6-52.4-26.2-72.8zM266.6 347.8c18-7.8 38-8.8 56.8-2.4 20 6.8 36.4 21.2 45.8 40.2 9.4 19.2 10.8 40.8 4.2 61-6 18-17.8 33-33.8 42.6-26.8-51.6-52.2-101-73-141.4zM593.6 660.8c-43.8 0-79.4-35.8-79.4-80s35.6-80 79.4-80c28 0 53.4 14.6 67.8 38.4l-62.4 121.4c-1.8 0.2-3.6 0.2-5.4 0.2zM548 224.6c63.8 2 113.6 9.6 152.6 18.6-4 18.4-14.2 34.6-29.4 46-16.6 12.4-36.8 17.6-57.2 14.6s-38.4-13.8-50.6-30.6c-10.8-14.2-16-31.2-15.4-48.6zM834.2 241.8c-1.8 3.8-3.2 6-4.2 7.2-6.6-0.8-19.6-5.4-33.4-10.2-49.2-17.6-131.4-46.8-283.2-46.8-152.6 0-235.6 28.6-285.2 45.6-13.2 4.6-25.8 8.8-32.6 9.8-0.6-1.2-1.6-2.8-2.8-5.2s-2.2-4.8-3.4-7c-1.8-3.6-4.2-8.4-5.2-11.6 2.2-2 7.4-6.4 19.6-12.2 50.4-24 131.2-51.6 309.4-51.6 173.4 0 260.2 29.8 310.4 52.2 14.4 6.4 16.4 11.2 16.4 11.2 0.2 0.6 1.2 4.2-5.8 18.6z"],"grid":0,"tags":["ios-pizza"]},{"paths":["M430.4 176l187 292.2 9.8 15 18.2-0.6 136.4-4c6.4-0.4 12.4-0.4 18.4-0.4 34.4 0 67.4 4.8 93 13.4 21.2 7.2 30.8 14.8 34.2 18.6-3.2 3.8-13 11.4-34.2 18.6-25.6 8.6-58.6 13.4-93 13.4-5.6 0-12.2 0-18.4-0.4h-0.8l-153.6-3.6-9.8 15.8-187.2 294h-32.2l101.8-270 15.6-41.8-44.4-2-268.6-10.8-10.2 13.4-80 103.2h-1.2l46.4-116.6 4.8-12.2-4.8-11.6-46.4-115.6h1.2l78.8 99.6 10 12.4 16.2-0.6 298.4-9.8-15.8-41.4-101.6-268.2h31.6zM448 144h-96l118 311.4-253.6 8.6-88.4-112h-64l64 160-64 160h64l89.8-115.4 252.2 10.4-118 313h96l196.4-309 135.6 3c6.6 0.4 13.2 0.2 20 0.2 88.4 0 160-28.8 160-64.2s-71.6-64-160-64c-6.8 0-13.4 0.2-20 0.4l-135.6 4.4-196.4-306.8z"],"grid":0,"tags":["ios-plane-outline"]},{"paths":["M448 144h-96l118 311.4-253.6 8.6-88.4-112h-64l64 160-64 160h64l89.8-115.4 252.2 10.4-118 313h96l196.4-309 135.6 3c6.6 0.4 13.2 0.2 20 0.2 88.4 0 160-28.8 160-64.2s-71.6-64-160-64c-6.8 0-13.4 0.2-20 0.4l-135.6 4.4-196.4-306.8z"],"grid":0,"tags":["ios-plane"]},{"paths":["M792.4 577.8c-2.2 9-4.6 18-7.8 26.8 11.6 9 22.8 17.8 33.6 26.6 72 58.2 118 114.4 106.4 114.4-15.8 1-55.2-2.2-142.2-34.2-24.4-9-50.4-19.4-77.6-31.2 39.4-45 63.2-104 63.2-168.4 0-141.4-114.6-256-256-256-114 0-210.4 74.4-243.6 177.2-24-17.2-46.4-34.2-66.6-50.4-72-58.2-95.2-90.4-102.4-104.4-8.6-14 65.2-1.8 152.2 30.2 13.6 5 27.8 10.4 42.2 16 5.6-6.6 11.6-13 17.8-19-131.8-55-228.4-75.4-245-45.8-18 31.8 61.6 113.4 193.6 206.8-2.6 14.8-4 29.8-4 45.4 0 141.4 114.6 256 256 256 64.6 0 123.6-23.8 168.6-63.4 148 65.2 259 91.4 277 59.6 16.4-29.4-50.6-101.4-165.4-186.2zM353.6 353.6c42.4-42.4 98.6-65.6 158.4-65.6s116 23.4 158.4 65.6c42.2 42.4 65.6 98.6 65.6 158.4 0 58.2-22 112.8-62 154.6-61.4-27.8-127.4-61.6-193.6-99-66-37.4-129-76.6-184.6-115 10.2-37 29.8-71 57.8-99zM512 736c-59.8 0-116-23.4-158.4-65.6-42.2-42.4-65.6-98.6-65.6-158.4 0-8.4 0.4-16.8 1.4-25 52.4 35.6 111.6 72.4 175.4 108.6s125.8 68 183.4 94.4c-39 29.8-86.4 46-136.2 46z"],"grid":0,"tags":["ios-planet-outline"]},{"paths":["M792.4 577.8c-2.2 9-4.6 18-7.8 26.8 11.6 9 22.8 17.8 33.6 26.6 72 58.2 118 114.4 106.4 114.4-15.8 1-55.2-2.2-142.2-34.2-24.4-9-50.6-19.4-77.6-31.2 39.4-45 63.2-103.8 63.2-168.4 0-141.4-114.6-256-256-256-114 0-210.4 74.4-243.6 177.4-24-17.2-46.4-34.2-66.6-50.6-72-58.2-95.2-90.4-102.4-104.4-8.6-14 65.2-1.8 152.2 30.2 13.6 5 27.8 10.4 42.2 16 5.6-6.6 11.6-13 17.8-19-131.8-55-228.4-75.4-245-45.8-26.2 46.2 152.2 196.4 398.2 335.8 246 139.2 466.8 214.8 492.8 168.6 16.6-29.4-50.4-101.4-165.2-186.2z","M256.2 504.6c0 2.4-0.2 4.8-0.2 7.4 0 141.4 114.6 256 256 256 51.6 0 99.6-15.2 139.8-41.4-65-28.8-132.8-59-207-101-67.6-38.4-134.2-83.4-188.6-121z"],"grid":0,"tags":["ios-planet"]},{"paths":["M640 512v-320h-256v192h-256v448h768v-320h-256zM384 800h-224v-384h224v384zM608 800h-192v-576h192v576zM864 800h-224v-256h224v256z"],"grid":0,"tags":["ios-podium-outline"]},{"paths":["M128 384h224v448h-224v-448z","M384 192v640h256v-640z","M672 512h224v320h-224v-320z"],"grid":0,"tags":["ios-podium"]},{"paths":["M781.4 195.8c-6.8-5.8-16.8-5-22.6 1.8s-5 16.8 1.8 22.6c86 73.2 135.2 179.4 135.2 291.6 0.2 211.8-172 384.2-383.8 384.2s-384-172.4-384-384.2c0-112.2 49.2-218.4 135.2-291.6 6.8-5.8 7.6-15.8 1.8-22.6s-15.8-7.6-22.6-1.8c-93 79.2-146.4 194.4-146.4 316 0 229.4 186.6 416.2 416 416.2s416-186.8 416-416.2c0-121.6-53.4-236.8-146.6-316z","M514 544c8.8 0 16-7.2 16-16v-416c0-8.8-7.2-16-16-16s-16 7.2-16 16v416c0 8.8 7.2 16 16 16z"],"grid":0,"tags":["ios-power-outline"]},{"paths":["M781.4 199.4c-5.6-4.8-12.8-7.4-20.4-7.4-9.2 0-18 4-23.8 11-5.4 6.4-8 14.4-7.4 22.8s4.6 16 11 21.4c79 67 124.4 164.2 124.4 266.6 0 193.8-158.4 351.6-353.2 351.6s-353.2-157.8-353.2-351.6c0-102.6 45.4-199.8 124.4-266.6 6.4-5.4 10.4-13 11-21.4s-2-16.4-7.4-22.8c-6-7-14.6-11-23.8-11-7.4 0-14.6 2.6-20.4 7.4-93.2 78.8-146.6 193.4-146.6 314.4 0 228.4 186.6 414.2 416 414.2s416-185.8 416-414.2c0-121-53.4-235.6-146.6-314.4z","M514 544c17.6 0 32-14.4 32-32v-384c0-17.6-14.4-32-32-32s-32 14.4-32 32v384c0 17.6 14.4 32 32 32z"],"grid":0,"tags":["ios-power"]},{"paths":["M768 320c35.2 0 64-28.8 64-64s-28.8-64-64-64-64 28.8-64 64 28.8 64 64 64zM768 224c17.6 0 32 14.4 32 32s-14.4 32-32 32-32-14.4-32-32 14.4-32 32-32z","M896 128v261.4l-493.4 493.4-261.4-261.4 493.4-493.4h261.4zM928 96h-306.6l-525.4 525.4 306.6 306.6 525.4-525.4v-306.6z"],"grid":0,"tags":["ios-pricetag-outline"]},{"paths":["M800 256c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z","M928 96h-306.6l-525.4 525.4 306.6 306.6 525.4-525.4v-306.6zM768 320c-35.2 0-64-28.8-64-64s28.8-64 64-64 64 28.8 64 64c0 35.2-28.8 64-64 64z"],"grid":0,"tags":["ios-pricetag"]},{"paths":["M865 224h-65v-96h-576v96h-63c-35.2 0-65 27.6-65 62.6v316.8c0 35 29.8 64.6 65 64.6h95v228h512v-228h97c35.2 0 63-29.6 63-64.6v-316.8c0-35-27.8-62.6-63-62.6zM256 160h512v64h-512v-64zM736 864h-448v-384h448v384zM896 603.4c0 17.4-13.4 32.6-31 32.6h-97v-188h-512v188h-95c-17.6 0-33-15.2-33-32.6v-316.8c0-17.4 15.4-30.6 33-30.6h704c17.6 0 31 13.2 31 30.6v316.8z"],"grid":0,"tags":["ios-print-outline"]},{"paths":["M256 448h512v448h-512v-448z","M255 449h512v448h-512v-448z","M223 129h576v64h-576v-64z","M865 225h-704c-35.29 0-66 25.684-66 60.618v316.786c0 34.936 30.71 66.598 66 66.598h62v-252h576v252h66c35.29 0 62-31.662 62-66.598v-316.786c0-34.934-26.71-60.618-62-60.618z"],"grid":0,"tags":["ios-print"]},{"paths":["M896 576c-30.536 0-56.058 21.39-62.446 50h-118.008l-60.362-181.792c-2.21-6.658-8.492-11.086-15.518-10.956-7.016 0.144-13.118 4.844-15.048 11.59l-108.484 378.638-116.35-698.11c-1.248-7.48-7.574-13.056-15.152-13.358-7.618-0.278-14.322 4.764-16.156 12.122l-124.98 501.866h-179.496v32h192c7.348 0 13.75-5.004 15.526-12.132l109.37-439.182 115.322 691.946c1.23 7.376 7.406 12.918 14.874 13.344 0.306 0.018 0.614 0.026 0.918 0.026 7.098 0 13.398-4.7 15.374-11.594l113.744-396.992 47.69 143.626c2.174 6.542 8.292 10.958 15.186 10.958h130.584c7.78 26.578 32.322 46 61.416 46 35.348 0 64-28.654 64-64s-28.656-64-64.004-64z"],"grid":0,"tags":["ios-pulse-outline"]},{"paths":["M896 546.002c-42.54 0-78.592 27.998-91.192 65.998h-77.714l-56.722-170.834c-4.352-13.106-16.606-21.912-30.366-21.912-0.224 0-0.448 0-0.67 0.008-14.032 0.29-26.234 9.688-30.098 23.176l-88.968 310.524-104.706-628.216c-2.494-14.96-14.898-28.746-31.564-28.746s-27.386 11.552-31.050 26.27l-121.958 489.73h-198.992v63.998h224c14.696 0 27.5-10.006 31.050-24.268l90.736-364.354 102.648 615.88c2.458 14.754 14.794 23.84 29.728 24.688 0.616 0.036 1.228 0.056 1.838 0.056 14.194 0 26.812-7.402 30.762-21.188l99.488-347.234 31.378 94.504c4.346 13.086 16.584 21.916 30.372 21.916h102.216c13.73 36 48.738 62.002 89.784 62.002 53.022 0 96-44.984 96-98 0-53.018-42.978-93.998-96-93.998z"],"grid":0,"tags":["ios-pulse"]},{"paths":["M128 248.4c0-44.4 42-88.4 88.4-88.4 39.6 0 135.6 0 135.6 0v-32h-133.6c-67 0-122.4 53.4-122.4 120.4v135.6h32c0 0 0-91.4 0-135.6z","M896 384h32v-135.6c0-67-55.4-120.4-122.4-120.4h-133.6v32c0 0 96 0 135.6 0 46.4 0 88.4 44 88.4 88.4s0 135.6 0 135.6z","M128 640h-32v135.6c0 67 55.4 120.4 122.4 120.4h133.6v-32c0 0-96 0-135.6 0-46.4 0-88.4-44-88.4-88.4s0-135.6 0-135.6z","M896 775.6c0 44.4-42 88.4-88.4 88.4-39.6 0-135.6 0-135.6 0v32h133.6c67 0 122.4-53.4 122.4-120.4v-135.6h-32c0 0 0 91.4 0 135.6z"],"grid":0,"tags":["ios-qr-scanner"]},{"paths":["M418 224c17.6 0 30 12.4 30 30v384c0 46.6-8.6 90-26.6 128-7 15-13.6 26-18.8 34h-38.6c25.4-38 50-90.6 50-161v-31h-156c-17.6 0-34-16.4-34-34v-320c0-17 15.8-30 34-30h160zM418 192h-160c-35.4 0-66 26.6-66 62v320c0 35.4 30.6 66 66 66h124c0 128-92 192-92 192h128c0 0 62-67.2 62-194 0-91.4 0-283.6 0-384 0-35.4-26.6-62-62-62v0z","M770 224c17.6 0 30 12.4 30 30v384c0 46.6-8.6 90-26.6 128-7 15-13.6 26-18.8 34h-38.6c25.4-38 50-90.6 50-161v-31h-156c-17.6 0-34-16.4-34-34v-320c0-17 15.8-30 34-30h160zM770 192h-160c-35.4 0-66 26.6-66 62v320c0 35.4 30.6 66 66 66h124c0 128-92 192-92 192h128c0 0 62-67.2 62-194 0-91.4 0-283.6 0-384 0-35.4-26.6-62-62-62v0z"],"grid":0,"tags":["ios-quote-outline"]},{"paths":["M418 192h-160c-35.4 0-66 26.6-66 62v320c0 35.4 30.6 66 66 66h124c0 128-92 192-92 192h128c0 0 62-67.2 62-194 0-91.4 0-283.6 0-384 0-35.4-26.6-62-62-62v0z","M770 192h-160c-35.4 0-66 26.6-66 62v320c0 35.4 30.6 66 66 66h124c0 128-92 192-92 192h128c0 0 62-67.2 62-194 0-91.4 0-283.6 0-384 0-35.4-26.6-62-62-62v0z"],"grid":0,"tags":["ios-quote"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z"],"grid":0,"tags":["ios-radio-button-off"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z","M512 192c-176.8 0-320 143.2-320 320s143.2 320 320 320c176.8 0 320-143.2 320-320s-143.2-320-320-320z"],"grid":0,"tags":["ios-radio-button-on"]},{"paths":["M227.8 812c-4.2 0-8.4-1.6-11.6-5-78.6-82-120.2-184-120.2-295s41.6-213 120.4-295c6.2-6.4 16.2-6.6 22.6-0.4s6.6 16.2 0.4 22.6c-72.8 75.8-111.4 170.2-111.4 272.8s38.6 197 111.4 273c6.2 6.4 6 16.6-0.4 22.6-3.2 3-7.2 4.4-11.2 4.4z","M796.2 812c-4 0-8-1.4-11-4.4-6.4-6.2-6.6-16.2-0.4-22.6 72.8-76 111.4-170.4 111.4-273s-38.6-197-111.4-273c-6.2-6.4-6-16.6 0.4-22.6s16.6-6 22.6 0.4c78.8 82 120.4 184 120.4 295s-41.6 213-120.4 295c-3.2 3.6-7.4 5.2-11.6 5.2z","M312.2 731.2c-4.2 0-8.2-1.6-11.4-4.8-56.2-57.2-87.2-132.6-87.2-212.8 0-82 32.2-158.8 90.6-216.2 6.2-6.2 16.4-6.2 22.6 0.2s6.2 16.4-0.2 22.6c-52.4 51.4-81.2 120.2-81.2 193.4 0 71.6 27.6 139.2 78 190.2 6.2 6.4 6.2 16.4-0.2 22.6-3 3.2-7 4.8-11 4.8z","M711.8 731.2c-4 0-8.2-1.6-11.2-4.6-6.2-6.2-6.4-16.4-0.2-22.6 50.2-51 78-118.6 78-190.2 0-73.4-28.8-142-81.2-193.4-6.2-6.2-6.4-16.4-0.2-22.6s16.4-6.4 22.6-0.2c58.4 57.6 90.6 134.4 90.6 216.2 0 80-31 155.6-87.2 212.8-2.8 3-7 4.6-11.2 4.6z","M396 653.8c-4.2 0-8.2-1.6-11.4-4.8-35.8-36.4-55.6-84.8-55.6-135.8 0-52.4 20.6-101.4 58-138.2 6.2-6.2 16.4-6.2 22.6 0.2s6.2 16.4-0.2 22.6c-31.2 30.6-48.4 71.6-48.4 115.4 0 42.8 16.4 83 46.4 113.4 6.2 6.2 6.2 16.4-0.2 22.6-3 3-7 4.6-11.2 4.6z","M628 653.8c-4 0-8.2-1.6-11.2-4.6-6.2-6.2-6.4-16.4-0.2-22.6 30-30.4 46.4-70.8 46.4-113.4 0-43.8-17.2-84.6-48.4-115.4-6.2-6.2-6.4-16.4-0.2-22.6s16.4-6.4 22.6-0.2c37.4 36.8 58 85.8 58 138.2 0 51.2-19.8 99.4-55.6 135.8-3.2 3.2-7.4 4.8-11.4 4.8z","M576 512c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-35.346 28.654-64 64-64s64 28.654 64 64z"],"grid":0,"tags":["ios-radio-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM323.6 727.4c-3.2 3-7.2 4.6-11.2 4.6-4.2 0-8.2-1.6-11.4-4.8-56-57.4-87-133.2-87-213.6 0-82.2 32.2-159.4 90.6-217 6.2-6.2 16.4-6.2 22.6 0.2s6.2 16.4-0.2 22.8c-52.2 51.6-81 120.6-81 194.2 0 71.8 27.6 139.8 77.8 191 6.2 6.2 6.2 16.4-0.2 22.6zM407.6 627c6.2 6.4 6.2 16.4-0.2 22.8-3.2 3-7.2 4.6-11.2 4.6-4.2 0-8.2-1.6-11.4-4.8-35.8-36.6-55.6-85-55.6-136.4 0-52.6 20.6-101.8 57.8-138.6 6.2-6.2 16.4-6.2 22.6 0.2s6.2 16.4-0.2 22.8c-31.2 30.8-48.2 71.8-48.2 115.8-0 42.6 16.4 83 46.4 113.6zM512 576.2c-35.4 0-64-28.8-64-64.2s28.6-64.2 64-64.2 64 28.8 64 64.2c0 35.4-28.6 64.2-64 64.2zM639.2 649.4c-3.2 3.2-7.2 4.8-11.4 4.8-4 0-8-1.6-11.2-4.6-6.2-6.2-6.4-16.4-0.2-22.8 30-30.6 46.4-71 46.4-113.8 0-43.8-17.2-85-48.2-115.8-6.2-6.2-6.4-16.4-0.2-22.8s16.4-6.4 22.6-0.2c37.4 36.8 57.8 86.2 57.8 138.6 0 51.6-19.8 100-55.6 136.6zM723 727.2c-3.2 3.2-7.2 4.8-11.4 4.8-4 0-8-1.6-11.2-4.6-6.2-6.2-6.4-16.4-0.2-22.8 50.2-51.2 77.8-119.2 77.8-191 0-73.6-28.8-142.6-81-194.2-6.2-6.2-6.4-16.4-0.2-22.8s16.4-6.4 22.6-0.2c58.4 57.8 90.6 134.8 90.6 217 0 80.6-31 156.4-87 213.8z"],"grid":0,"tags":["ios-radio"]},{"paths":["M748.8 286.4l-26.6-0.2c-23.6-107-110.2-190.2-250.2-190.2s-255.6 103.4-255.6 245.6l0.6 9.6c-84.6 11.2-153 89-153 177.8 0 94 75.8 177 169.2 177h21.2l-74.8 101.4c-5.2 7.2-3.6 16.6 3.6 21.8 2.6 2 5.8 2.8 8.8 2.8 4.6 0 10.2-1.2 13.6-5.8l88.4-120.2h122.8l-144.6 198c-5.2 7.2-4.4 16 2.8 21.2 2.6 2 6.6 2.8 9.6 2.8 7.4 0 12.2-2.6 15.6-7.2l156-214.8h122.2l-74.6 101.4c-5.2 7.2-3.6 16.6 3.6 21.8 2.6 2 5.8 2.8 8.8 2.8 4.6 0 10.2-1.2 13.6-5.8l88.2-120.2h122.8l-144.6 198c-5.2 7.2-4.2 15.6 3 20.6 2.6 2 6.4 3.4 9.4 3.4 4.6 0 10.2-1.6 13.6-6.2l160.2-220.6c100.8-16.8 177.8-107.4 177.8-213.2-0.2-117.2-94.8-201.6-211.4-201.6zM774.4 671.6c0 0-17.8 2.4-40.4 2.4s-500.8 0-500.8 0c-36 0-70.2-15.8-96.4-43.6-26-27.4-40.8-64.6-40.8-101.8 0-35 13.2-69.4 37-96.8 23.6-27 54.8-44.4 88.2-48.8l29.6-4-2-29.8-0.6-8.6c0.2-58.6 23.4-112.6 65.2-151.8 42-39.2 98.2-60.8 158.6-60.8 58.6 0 110 16.6 148.6 47.8 35.4 28.8 59.8 69.4 70.4 117.4l5.8 26.8c23-1.4 52-1.4 52-1.4 49 0 94.2 17.2 127.4 48.2 33.4 31.2 51.6 74.2 51.6 121.4 0.2 89.2-67.2 169-153.4 183.4z"],"grid":0,"tags":["ios-rainy-outline"]},{"paths":["M748.8 286.4l-26.6-0.2c-23.6-107-110.2-190.2-250.2-190.2s-255.6 103.4-255.6 245.6l0.6 9.6c-84.6 11.2-153 89-153 177.8 0 94 75.8 177 169.2 177h21.2l-74.8 101.4c-5.2 7.2-3.6 16.6 3.6 21.8 2.6 2 5.8 2.8 8.8 2.8 4.6 0 10.2-1.2 13.6-5.8l88.4-120.2h122.8l-144.6 198c-5.2 7.2-4.4 16 2.8 21.2 2.6 2 6.6 2.8 9.6 2.8 7.4 0 12.2-2.6 15.6-7.2l156-214.8h122.2l-74.6 101.4c-5.2 7.2-3.6 16.6 3.6 21.8 2.6 2 5.8 2.8 8.8 2.8 4.6 0 10.2-1.2 13.6-5.8l88.2-120.2h122.8l-144.6 198c-5.2 7.2-4.2 15.6 3 20.6 2.6 2 6.4 3.4 9.4 3.4 4.6 0 10.2-1.6 13.6-6.2l160.2-220.6c100.8-16.8 177.8-107.4 177.8-213.2-0.2-117.2-94.8-201.6-211.4-201.6z"],"grid":0,"tags":["ios-rainy"]},{"paths":["M728.2 512c0 120-97 216.4-216.2 216.4s-216.2-97-216.2-216.4c0-119.2 97-216.2 216.2-216.2v111.6l192-111.4-192-128v88c-141.4 0-256 114.8-256 256.2 0 141.6 114.6 256.2 256 256.2s256-114.2 256-256.2h-39.8z","M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z"],"grid":0,"tags":["ios-refresh-circle-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 768.2c-141.4 0-256-114.6-256-256.2s114.6-256.2 256-256.2v-87.8l192 128-192 111.4v-111.6c-119.2 0-216.2 97-216.2 216.2s97 216.2 216.2 216.2 216.2-96.2 216.2-216.2h39.8c0 142-114.6 256.2-256 256.2z"],"grid":0,"tags":["ios-refresh-circle"]},{"paths":["M512 768.2c-141.4 0-256-114.6-256-256.2s114.6-256.2 256-256.2v-87.8l192 128-192 111.4v-111.6c-119.2 0-216.2 97-216.2 216.2s97 216.2 216.2 216.2 216.2-96.2 216.2-216.2h39.8c0 142-114.6 256.2-256 256.2z"],"grid":0,"tags":["ios-refresh"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z","M256 496h512v34h-512v-34z"],"grid":0,"tags":["ios-remove-circle-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM768 530h-512v-34h512v34z"],"grid":0,"tags":["ios-remove-circle"]},{"paths":["M768 530h-512v-34h512v34z"],"grid":0,"tags":["ios-remove"]},{"paths":["M160 608h704v32h-704v-32z","M160 496h704v32h-704v-32z","M160 384h704v32h-704v-32z"],"grid":0,"tags":["ios-reorder"]},{"paths":["M664.6 327.4l-67.2-66.8c-3.2-3.2-7.2-4.6-11.4-4.6s-8.2 1.6-11.4 4.6c-6.2 6.2-6.2 16.4 0 22.6l53.4 52.8h-356c-79.2 0-144 64.8-144 144v48h32v-48c0-29.8 11.6-57.8 33-79 21.2-21.2 49.4-33 79-33h352l-53.2 52.8c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l71.2-70.8c12.6-12.4 12.6-32.6 0-45.2z","M864.2 496v48c0 29.8-11.6 57.8-33 79-21.4 21.4-49.4 33-79.2 33h-352l53.2-52.8c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-71.2 70.8c-12.6 12.4-12.6 32.6 0 45.2l67.2 66.8c3.2 3.2 7.2 4.6 11.4 4.6s8.2-1.6 11.4-4.6c6.2-6.2 6.2-16.4 0-22.6l-53.2-52.8h356c79.2 0 144-64.8 144-144v-48h-32z"],"grid":0,"tags":["ios-repeat"]},{"paths":["M880 128h-224c-8.8 0-16 7.2-16 16s7.2 16 16 16h184l-680 679.8v-183.8c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16h224c8.8 0 16-7.2 16-16s-8-16-16.8-16h-183.2l680-680v184c0 8.8 7.2 16 16 16s16-7.2 16-16v-224c0-8.8-7.2-16-16-16z"],"grid":0,"tags":["ios-resize"]},{"paths":["M769 128c-49.6 0-95.6 154.6-95.6 320 0 114 64.2 160 64.2 160s12.4 9.6 30.2 12v260c0 8.8 7.2 16 16 16s16-7.2 16-16v-730c0.2-22-20.8-22-30.8-22zM768 162v424c-2-0.2-10-2-14.6-6.2-2.6-2.2-10.4-9.2-20.6-25.8-22.6-36.2-27.2-77.6-27.2-105.8 0-69.8 8.4-142.8 24-200.2 15-56 32.4-79.4 38.4-86v0z","M592 128h-16l20 207c0 8.8-7.2 15.6-16 15.6s-16-6.4-16-15.2l-12-207.4h-16l-12 207c0 8.8-7.2 15.6-16 15.6s-16-6.4-16-15.2l20-207.4h-16c0 0-48 214.2-48 255.8s26.4 78.8 64 90.6c10.6 3.4 16 3.6 16 3.6v402c0 8.8 7.2 16 16 16s16-7.2 16-16v-402c0 0 10.2-1.8 16-3.6 37.2-12 64-48.4 64-90.4s-48-256-48-256zM544 446c-57.2 0-64-53.2-64-63.2 0 0 0.2-5.4 0.6-9 7.8 5.4 17.2 8.6 27.4 8.6 14.4 0 23-6.2 36-6.2s21.6 6.2 36 6.2c10.2 0 19.6-3.2 27.4-8.6 0.4 3.8 0.6 9.2 0.6 9.2 0 9.4-6.8 63-64 63z","M320 128c-53 0-96 127.8-96 255.8 0 34.6 18.4 66.4 46.4 82.6 22.8 13.4 33.6 13.6 33.6 13.6v400c0 8.8 7.2 16 16 16s16-7.2 16-16v-400c0 0 10.2 0 32.4-12.4 28.4-16 47.6-48 47.6-83.6 0-128-43-256-96-256zM352.6 439.2l-0.4 0.4c-1.4 0.8-3.2 2-5.2 2.8-2.4 0.6-4.8 1.4-7 2.6-6.8 1.4-13.6 2.6-19.8 2.6s-13-1.2-19.8-2.6c-2.2-1-4.4-1.8-7-2.4-2-1-4.4-2.4-6-3.4l-0.8-0.4c-18.8-11.2-30.6-32.2-30.6-54.8 0-58.8 9.6-119 26.2-165 9.6-26.4 19-41 25.2-48.6 6.8-8.4 11.6-10.2 12.6-10.2s5.8 1.8 12.6 10.2c6.2 7.6 15.6 22 25.2 48.6 16.6 46 26.2 106 26.2 165-0 22.6-12.4 44.4-31.4 55.2z"],"grid":0,"tags":["ios-restaurant-outline"]},{"paths":["M768 128c-49.6 0-96 154.6-96 320 0 114 64 160 64 160v256c0 17.6 14.4 32 32 32s32-14.4 32-32v-714c0-22-22-22-32-22z","M576 128l20 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l-12-208h-16l-12 208c0 8.8-7.2 16-16 16s-16-7.2-16-16l20-208h-16c0 0-48 214.4-48 256s26.8 77.2 64 90.4v389.6c0 17.6 14.4 32 32 32s32-14.4 32-32v-389.6c37.2-13.2 64-48.4 64-90.4s-48-256-48-256h-16z","M320 128c-53 0-96 128-96 256 0 41.6 26.8 77.2 64 90.4v389.6c0 17.6 14.4 32 32 32s32-14.4 32-32v-389.6c37.2-13.2 64-48.4 64-90.4 0-128-43-256-96-256z"],"grid":0,"tags":["ios-restaurant"]},{"paths":["M137.4 584.6l115.2 114.8c3.2 3.2 7.2 4.6 11.4 4.6s8.2-1.6 11.4-4.6c6.2-6.2 6.2-16.4 0-22.6l-99.4-100.8h576c79.2 0 144-64.8 144-144v-112h-32v112c0 29.8-11.6 57.8-33 79-21.2 21.2-49.4 33-79 33h-576l103.2-100.8c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-119.2 118.8c-12.6 12.4-12.6 32.6 0 45.2z"],"grid":0,"tags":["ios-return-left"]},{"paths":["M886.6 584.6l-115.2 114.8c-3.2 3.2-7.2 4.6-11.4 4.6s-8.2-1.6-11.4-4.6c-6.2-6.2-6.2-16.4 0-22.6l99.4-100.8h-576c-79.2 0-144-64.8-144-144v-112h32v112c0 29.8 11.6 57.8 33 79 21.2 21.2 49.4 33 79 33h576l-103.2-100.8c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l119.2 118.8c12.6 12.4 12.6 32.6 0 45.2z"],"grid":0,"tags":["ios-return-right"]},{"paths":["M512 176c79.4 0 144 64.6 144 144s-64.6 144-144 144-144-64.6-144-144 64.6-144 144-144zM512 144c-97 0-176 79-176 176s79 176 176 176 176-79 176-176-79-176-176-176v0z","M512 96c59.8 0 116 23.4 158.4 65.6s65.6 98.6 65.6 158.4-23.4 116-65.6 158.4-98.6 65.6-158.4 65.6-116-23.4-158.4-65.6-65.6-98.6-65.6-158.4 23.4-116 65.6-158.4 98.6-65.6 158.4-65.6zM512 64c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256v0z","M301.2 560.8c58 50.8 132.8 79.2 210.8 79.2 4.8 0 9.4-0.2 14.2-0.4l-43.4 95.4-70.8 156-74-123.2h-155l118.2-207zM294.2 508.4l-166.2 291.6h192l96 160 96-211.6 67.2-148.4c-21.6 5.2-44.2 8-67.2 8-87 0-165-38.6-217.8-99.6v0z","M722.8 560.8l118.2 207.2h-155.2l-9.4 15.6-64.4 107.6-48.6-107 78.2-171.6c29.4-13 57-30.6 81.2-51.8zM729.8 508.4c-30.2 34.8-68.6 62.4-112 79.6l-89.6 196.2 79.8 175.8 96-160h192l-166.2-291.6z"],"grid":0,"tags":["ios-ribbon-outline"]},{"paths":["M512 576c141.4 0 256-114.6 256-256s-114.6-256-256-256-256 114.6-256 256 114.6 256 256 256zM512 144c97 0 176 79 176 176s-79 176-176 176-176-79-176-176 79-176 176-176z","M512 464c79.4 0 144-64.6 144-144s-64.6-144-144-144-144 64.6-144 144 64.6 144 144 144z","M512 608c-87 0-165-38.6-217.8-99.6l-166.2 291.6h192l96 160 96-211.6 67.2-148.4c-21.6 5.2-44 8-67.2 8z","M729.8 508.4c-30.2 34.8-68.6 62.4-112 79.6l-89.6 196.2 79.8 175.8 96-160h192l-166.2-291.6z"],"grid":0,"tags":["ios-ribbon"]},{"paths":["M757.2 324.2c-57 102.2-32.8 183.4-10.8 256.6 11 37.2 21.6 72.2 21.6 109.2 0 58-23 108.4-66.4 145.4-46.4 39.6-112 60.4-189.6 60.4s-143-21-189.6-60.4c-43.4-37-66.4-87.2-66.4-145.4 0-57.8 13.6-102.4 42.8-140 26-33.6 65.2-63.2 126.8-95.8l13-7c40.4-21.4 54-28.8 88-43.8 63.8-28.4 133.2-52.8 206.4-72.6 8-2.2 16.2-4.4 24.2-6.6zM832 274.2c-37.8 7.8-73.6 16.4-107.4 25.6-81 22-151 47.8-210.8 74.4-38.6 17.2-52.4 24.8-103 51.8-116.8 61.8-186.8 128.6-186.8 264 0 135.6 111.2 238 288 238s288-102.4 288-238c0-135.4-122-237.4 32-415.8v0z","M269 268c42.6 13 94.6 31.4 138.4 55.2 11 6 21 12 30 18-9.6 4.8-19 9.6-28.2 14.4-14.4 7.6-28.8 15.6-42.4 23.6-21.4 12.4-41.6 25.2-60.6 38-1.2-46.8-11-98.6-37.2-149.2zM192 214.8c83 87.4 89.2 193 78.8 268.8 25.6-21 62.4-47.8 112.2-76.8 12.8-7.6 26.6-15.2 41.2-22.8 23.2-12.2 47-23.8 71.6-34.8-18.2-20.2-44.2-38.2-73.2-54-97.4-53-230.6-80.4-230.6-80.4v0z","M689.8 188.6c9.8 12.4 22.8 30.2 33 47.6-59.6 15.8-131.2 39.2-188.6 62-11.2-11-24.4-21.6-39.2-32 42.2-34.2 89.4-53.2 124.4-63.4 29.8-8.6 55.2-12.6 70.4-14.2zM704 155.4c0 0-157.2 4.4-261.4 116 33.2 18.4 59.4 38 78 58.6l5.4 6c74.4-31.2 176.2-63.4 242-78-12.8-43.4-64-102.6-64-102.6v0z","M362.2 137.8c18 11 44.2 29.4 70.6 57.2-9 7.4-17.6 15-25.8 23-28.4-13.4-50.2-22.8-72.8-30.6 7.2-15 16.6-32 28-49.6zM352 96c-30.6 41.6-51.4 84.2-60.6 111.4 42.2 11.8 71 24.6 122.8 49.4 19-21.2 40.8-40.2 65.2-56.8-58.8-75-127.4-104-127.4-104v0z"],"grid":0,"tags":["ios-rose-outline"]},{"paths":["M832 274.2c-37.8 7.8-73.6 16.4-107.4 25.6-81 22-151 47.8-210.8 74.4-38.6 17.2-52.4 24.8-103 51.8-116.8 61.8-186.8 128.6-186.8 264 0 135.6 111.2 238 288 238s288-102.4 288-238c0-135.4-122-237.4 32-415.8v0z","M192 214.8c83 87.4 89.2 193 78.8 268.8 25.6-21 62.4-47.8 112.2-76.8 12.8-7.6 26.6-15.2 41.2-22.8 23.2-12.2 47-23.8 71.6-34.8-18.2-20.2-44.2-38.2-73.2-54-97.4-53-230.6-80.4-230.6-80.4v0z","M704 155.4c0 0-157.2 4.4-261.4 116 33.2 18.4 59.4 38 78 58.6l5.4 6c74.4-31.2 176.2-63.4 242-78-12.8-43.4-64-102.6-64-102.6v0z","M352 96c-30.6 41.6-51.4 84.2-60.6 111.4 42.2 11.8 71 24.6 122.8 49.4 19-21.2 40.8-40.2 65.2-56.8-58.8-75-127.4-104-127.4-104v0z"],"grid":0,"tags":["ios-rose"]},{"paths":["M512 128c51.8 0 102.2 10.2 149.4 30.2 45.8 19.4 86.8 47 122 82.4 35.2 35.2 63 76.4 82.4 122 20 47.4 30.2 97.6 30.2 149.4s-10.2 102.2-30.2 149.4c-19.4 45.8-47 86.8-82.4 122-35.2 35.2-76.4 63-122 82.4-47.4 20-97.6 30.2-149.4 30.2s-102.2-10.2-149.4-30.2c-45.8-19.4-86.8-47-122-82.4-35.2-35.2-63-76.4-82.4-122-20-47.2-30.2-97.6-30.2-149.4s10.2-102.2 30.2-149.4c19.4-45.8 47-86.8 82.4-122 35.2-35.2 76.4-63 122-82.4 47.2-20 97.6-30.2 149.4-30.2zM512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416v0z","M704 448c0 26.51-21.49 48-48 48s-48-21.49-48-48c0-26.51 21.49-48 48-48s48 21.49 48 48z","M416 448c0 26.51-21.49 48-48 48s-48-21.49-48-48c0-26.51 21.49-48 48-48s48 21.49 48 48z","M512 542c-96.6 0-176 70-192 162h384c-16-92-95.4-162-192-162z"],"grid":0,"tags":["ios-sad-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416c0-229.8-186.2-416-416-416zM368 400c26.6 0 48 21.4 48 48s-21.4 48-48 48-48-21.4-48-48 21.4-48 48-48zM320 704c16-92 95.4-162 192-162s176 70 192 162h-384zM656 496c-26.6 0-48-21.4-48-48s21.4-48 48-48 48 21.4 48 48-21.4 48-48 48z"],"grid":0,"tags":["ios-sad"]},{"paths":["M512.8 128l-448.4 256 127.6 73.2v255.8l320 183 320-183v-255.8l96-54.8v365.6h32v-384l-447.2-256zM496 850l-272-155.6v-219l272 155.4v219.2zM800 694.4l-272 155.6v-219.2l272-155.4v219zM512 602l-382.8-218 384-219.2 383 219.2-384.2 218z"],"grid":0,"tags":["ios-school-outline"]},{"paths":["M192 489.2v223.8l304 173.8v-224z","M528 886.8l304-173.8v-223.8l-304 173.6z","M512 128l-448 256 448 256 416-237.8v365.8h32v-384z"],"grid":0,"tags":["ios-school"]},{"paths":["M896.6 849.4l-226.6-226.8c41.6-52 66.6-118.2 66.6-190.2 0-168.2-136.2-304.4-304-304.4-168 0-304 136.4-304 304.4s136.2 304.4 304 304.4c72.4 0 138.8-25.4 191-67.6l226.4 226.8 46.6-46.6zM240.2 625.2c-51.4-51.4-79.6-119.8-79.6-192.6s28.4-141.2 79.6-192.6 119.8-80 192.4-80c72.6 0 141 28.4 192.4 79.8s79.6 119.8 79.6 192.6-28.4 141.2-79.6 192.6c-51.4 51.4-119.8 79.8-192.4 79.8-72.6 0.2-141-28.2-192.4-79.6z"],"grid":0,"tags":["ios-search-outline"]},{"paths":["M689 596c30-47.2 47.6-103.2 47.6-163.4 0-168.2-136.2-304.6-304.2-304.6-168.2 0-304.4 136.4-304.4 304.6s136.2 304.6 304.2 304.6c61 0 117.8-18 165.4-48.8l13.8-9.6 217.2 217.2 67.4-68.6-217-217.2 10-14.2zM602.8 262.4c45.4 45.4 70.4 105.8 70.4 170s-25 124.6-70.4 170c-45.4 45.4-105.8 70.4-170 70.4s-124.6-25-170-70.4c-45.4-45.4-70.4-105.8-70.4-170s25-124.6 70.4-170c45.4-45.4 105.8-70.4 170-70.4s124.6 25 170 70.4z"],"grid":0,"tags":["ios-search"]},{"paths":["M192 499.2l233.2 102.6 114.4 230.2 292.4-640-640 307.2zM456.2 593l311.4-332.4-229.2 497.8-82.2-165.4zM763.6 256.6l-330 314.2-165.6-72.8 495.6-241.4z"],"grid":0,"tags":["ios-send-outline"]},{"paths":["M192 499.2l212 93.4 428-400.6z","M832 192l-396.2 431.4 103.8 208.6z"],"grid":0,"tags":["ios-send"]},{"paths":["M378.4 166c13.4 17 29.8 31.6 48.2 42.8 26.6 16.4 56 25 85.4 25s58.8-8.6 85.4-25c18.4-11.2 34.6-25.8 48.2-42.8 9.4 3.4 18.6 7.2 27.6 11.4-6.4 49.6 8.6 93 44.6 128.8 35.8 35.8 74.8 53.8 116 53.8 4.2 0 8.4-0.2 12.6-0.6 4.2 9 8 18.4 11.6 27.8-43.8 32.8-67.8 76.4-67.8 124.6 0 48.4 23.8 91.8 67.6 124.6-3.4 9.4-7.4 18.8-11.6 27.8-4.2-0.4-8.4-0.6-12.4-0.6-41.4 0-80.4 18.2-116.2 53.8-35.8 36-50.8 79.4-44.6 128.8-9 4.2-18.2 8-27.6 11.4-13.4-17-29.8-31.6-48.2-42.8-26.6-16.4-56-25-85.4-25s-58.8 8.6-85.4 25c-18.4 11.2-34.6 25.8-48.2 42.8-9.4-3.4-18.6-7.2-27.6-11.4 6.4-49.8-8.6-93-44.6-128.8-30.6-30.6-66.6-46-107-46-7 0-14.2 0.4-21.6 1.4-4.2-9-8-18.2-11.4-27.6 17-13.4 31.6-29.8 43-48.2 16.4-26.6 25.2-56.2 25.2-85.4 0-48.4-24-91.8-68-124.8 3.4-9.4 7.4-18.8 11.6-27.8 4.2 0.4 8.4 0.6 12.4 0.6 41.4 0 80.4-18.2 116.2-53.8 35.8-36 50.8-79.4 44.6-128.8 8.8-3.8 18-7.6 27.4-11zM512 736c59.8 0 116-23.2 158.4-65.6s65.6-98.6 65.6-158.4-23.2-116-65.6-158.4-98.6-65.6-158.4-65.6-116 23.2-158.4 65.6-65.6 98.6-65.6 158.4c0 123.6 100.4 224 224 224zM632.8 128c-26 44.4-72.8 73.8-120.8 73.8-47.8 0-94.8-29.4-120.8-73.8-26.8 8-52.4 18.6-76.4 31.6 13 49.8 2.6 90-31.2 124-26.6 26.6-57.4 44.4-93.4 44.4-9.8 0-19.8-1.2-30.4-4-13.2 24-23.8 49.6-31.8 76.4 44.4 26 74 63.8 74 111.6s-29.6 94.8-74 120.8c8 26.8 18.6 52.4 31.6 76.4 13.8-3.6 27-5.4 39.4-5.4 32.2 0 60 12.2 84.4 36.6 34 33.8 44.2 74.2 31.2 124 24.2 13 49.6 23.6 76.4 31.6 26-44.4 73-73.8 120.8-73.8s94.8 29.4 120.8 73.8c26.8-8 52.4-18.6 76.4-31.6-13-49.8-2.6-90 31.2-124 26.6-26.6 57.4-44.4 93.6-44.4 9.8 0 19.8 1.2 30.4 4 13-24.2 23.6-49.8 31.6-76.4-44.2-26-73.6-63.8-73.6-111.6s29.6-85.6 73.8-111.6c-8-26.6-18.6-52.4-31.6-76.4-10.6 2.8-20.8 4-30.6 4-36 0-66.6-17.8-93.4-44.4-33.8-33.8-44.2-74.2-31.2-124-24-13-49.6-23.6-76.4-31.6v0zM512 704c-105.8 0-192-86-192-192s86-192 192-192 192 86 192 192c0 106-86 192-192 192v0z"],"grid":0,"tags":["ios-settings-outline"]},{"paths":["M822.2 512c0-47.8 29.6-85.6 73.8-111.6-8-26.6-18.6-52.4-31.6-76.4-49.8 13-90-6.4-124-40.4-33.8-33.8-44.2-74.2-31.2-124-24-13-49.6-23.6-76.4-31.6-26 44.4-72.8 73.8-120.8 73.8-47.8 0-94.8-29.4-120.8-73.8-26.8 8-52.4 18.6-76.4 31.6 13 49.8 2.6 90-31.2 124-33.8 33.8-74.2 53.4-123.8 40.4-13.2 24-23.8 49.6-31.8 76.4 44.4 26 74 63.8 74 111.6s-29.6 94.8-74 120.8c8 26.8 18.6 52.4 31.6 76.4 49.8-13 90-2.6 123.8 31.2 34 33.8 44.2 74.2 31.2 124 24.2 13 49.6 23.6 76.4 31.6 26-44.4 73-73.8 120.8-73.8s94.8 29.4 120.8 73.8c26.8-8 52.4-18.6 76.4-31.6-13-49.8-2.6-90 31.2-124 33.8-33.8 74.2-53.4 124-40.4 13-24.2 23.6-49.8 31.6-76.4-44.2-26-73.6-63.8-73.6-111.6zM512 704c-105.8 0-192-86-192-192s86-192 192-192 192 86 192 192-86 192-192 192z"],"grid":0,"tags":["ios-settings"]},{"paths":["M896 496l-320-304v170.6c-298.6 42.8-405.4 256-448 469.4 106.6-149.4 234.6-217.6 448-217.6v175l320-293.4zM297.8 638.4c-37 18.4-70.4 41.2-102.4 69.4 22.2-60.4 50.6-111.4 85.4-154.2 33.8-41.6 74.4-75.8 120.8-101.6 51.4-28.6 111.6-48 179-57.6l27.4-2.4v-128l241 231.6-241 224.4v-136l-32-2c-111.2 0-202.2 18.6-278.2 56.4z"],"grid":0,"tags":["ios-share-alt-outline"]},{"paths":["M896 496l-320-304v170.6c-298.6 42.8-405.4 256-448 469.4 106.6-149.4 234.6-217.6 448-217.6v175l320-293.4z"],"grid":0,"tags":["ios-share-alt"]},{"paths":["M576 288v32h224v544h-576v-544h224v-32h-256v608h640v-608z","M386.2 236.2l-23.2-23.2 149-149 149 149-23.2 23.2-109.4-109.4v486h-32.8v-486z"],"grid":0,"tags":["ios-share-outline"]},{"paths":["M528 288v324h-32v-324h-304v608h640v-608z","M528 126.8l109.6 109.4 23.2-23.2-148.8-149-149 149 23.4 23.2 109.6-109.4v161.2h32z"],"grid":0,"tags":["ios-share"]},{"paths":["M745 185.2c-41-29.4-81-57.4-125-57.4s-44 16-108 16-64-16-108-16-84 28-125 57.4c-63.2 45.4-183 172.8-183 172.8l160 186.4v351.6h512v-350.8l160-187.4c0-0-119.8-127.2-183-172.6zM426.2 161.6c19.8 0 50.8 14.6 85.8 14.6s66.2-14.6 85.8-14.6c13.8 0 22.2 7.2 22.2 32 0 46.6-48.4 88-108 88s-108-42.6-108-88c0-24.6 8.2-32 22.2-32zM768 400.2c0-8.8-7.2-16-16-16s-16 7.2-16 16v463.8h-448v-463.8c0-8.8-7.2-16-16-16s-16 7.2-16 16v98.4c-27.2-32-102.8-121.8-117.2-139.2 36-37.4 113.8-115.8 159-148.2 25.8-18.6 52.4-37.6 78.4-46.4-2.8 8.2-4.2 17.8-4.2 29 0 31.4 15.8 62.6 43.2 85.6 26.6 22.2 61 34.4 96.8 34.4 36 0 70.4-12 96.8-33.8 27.4-22.8 43.2-54.2 43.2-86.2 0-11.2-1.4-20.8-4.2-29 26 8.8 52.6 27.8 78.4 46.4 45.2 32.4 122.8 110.8 158.8 148.2-14.8 18-92.2 109.8-117.2 139.2v-98.4z"],"grid":0,"tags":["ios-shirt-outline"]},{"paths":["M745 185.4c-41-29.4-81-57.4-125-57.4s-44 16-108 16-64-16-108-16-84 28-125 57.4c-63.2 45.4-183 172.6-183 172.6s69.2 82.6 103.4 122c25.4 29.4 32 35.6 32 0 0-85.4 0-96 12.6-96s12 7.2 12 16v496h512v-496c0-8.8-0.6-16 12-16s12.6 10.6 12.6 96c0 35.6 6.6 29.4 32 0 34-39.4 103.4-122 103.4-122s-119.8-127.2-183-172.6zM512 282c-60 0-108-41.4-108-88 0-60 48-17.4 108-17.4 59.6 0 108-42.6 108 17.4 0 46.6-48.4 88-108 88z"],"grid":0,"tags":["ios-shirt"]},{"paths":["M886.6 651.4l-71.2-70.8c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6l53.2 52.8h-198l-251.6-314.4c-3-3.6-7.8-5.6-12.6-5.6h-239.8c-8.8 0-16 7.2-16 16s7.2 16 16 16h232.6l114.6 144-114.6 144h-232.6c-8.8 0-16 7.2-16 16s7.2 16 16 16h240c4.8 0 9.2-2 12.2-5.6l115.8-145.4 115.8 145.4c3 3.6 7.6 5.6 12.2 5.6h210l-53.2 52.8c-6.2 6.2-6.2 16.4 0 22.6 3.2 3.2 7.2 4.6 11.4 4.6s8.2-1.6 11.4-4.6l67.2-66.8c12.4-12.6 12.4-32.8-0.2-45.2z","M647.4 368h198.4l-53.2 52.8c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0l71.2-70.8c12.4-12.4 12.4-32.6 0-45l-67.2-66.8c-3.2-3.2-7.2-4.6-11.4-4.6s-8.2 1.6-11.4 4.6c-6.2 6.2-6.2 16.4 0 22.6l53.2 52.8h-209.6c-4.8 0-9.2 2-12.2 5.6l-94.6 120.4 21 24.8 93.2-119z"],"grid":0,"tags":["ios-shuffle"]},{"paths":["M192 192v640h158v-283.6l482 283.6v-640l-482 283.6v-283.6h-158zM351.2 512l15.2-8.8 433.6-255.2v528l-448.8-264zM224 224h94v576h-94v-576z"],"grid":0,"tags":["ios-skip-backward-outline"]},{"paths":["M192 192v640h158v-283.6l482 283.6v-640l-482 283.6v-283.6h-158z"],"grid":0,"tags":["ios-skip-backward"]},{"paths":["M674 192v283.6l-482-283.6v640l482-283.6v283.6h158v-640h-158zM657.8 520.8l-433.8 255.2v-528l449 264-15.2 8.8zM800 800h-94v-576h94v576z"],"grid":0,"tags":["ios-skip-forward-outline"]},{"paths":["M674 192v283.6l-482-283.6v640l482-283.6v283.6h158v-640h-158z"],"grid":0,"tags":["ios-skip-forward"]},{"paths":["M863.4 696.8l-75.2-43.8c26.2-33.8 64.2-49.6 64.8-49.8 8.6-3.4 13.2-13.4 10.4-22.2s-12.2-13.2-20.8-9.6c-2.2 1-50.2 20.6-82.6 65l-213.6-124.4 213.4-124.4c32.2 44.4 80.4 64.2 82.6 65 8.6 3.4 18-0.8 20.8-9.6s-1.8-18.8-10.4-22.2c-0.4-0.2-38.6-15.8-64.8-49.8l75.2-43.8c8.2-4.8 11-15.4 6.2-23.8s-15.2-11.2-23.6-6.4l-75.2 43.8c-15.8-39.6-10.4-81-10.2-81.4 1.4-9.2-4.8-18.4-13.8-20.2s-17.4 4.2-18.6 13.4c-0.4 2.4-7 54.2 15 104.8l-213 124.4v-248c54-6 95-38 97-39.6 7.4-5.8 8-16 2-23-6.2-7-16.8-7.8-24-2-0.4 0.2-32.8 25.8-74.8 31.6v-87.4c0-9.6-8.4-17.4-18-17.4s-18 7.8-18 17.4v87.4c-42-6-74.4-31.4-74.8-31.6-7.4-5.8-18-4.8-24.2 2-6.2 7-5.4 17.2 1.8 23 1.8 1.4 43 33.6 97 39.6v248.2l-213-124.4c22-50.4 15-102.4 14.8-104.8-1.4-9.2-9.6-15.2-18.6-13.4s-15.2 11-13.8 20.2c0 0.4 5.6 41.6-10.2 81.4l-75.2-43.8c-8.2-4.8-18.8-2-23.6 6.4s-2 19 6.4 23.8l75.2 43.8c-26 33.6-64.2 49.6-64.6 49.8-8.6 3.4-13.2 13.4-10.4 22.2s12.2 13.2 20.8 9.6c2.2-0.8 50.2-20.6 82.6-65l213.2 124.2-213.4 124.4c-32.2-44.4-80.4-64.2-82.6-65-8.6-3.4-18 0.8-20.8 9.6s1.8 18.8 10.4 22.2c0.4 0.2 38.6 16 64.6 49.8l-75.2 43.8c-8.2 4.8-11 15.4-6.2 23.8s15.2 11.2 23.6 6.4l75.2-43.8c16 39.8 10.4 81 10.2 81.4-1.4 9.2 4.8 18.4 13.8 20.2s17.4-4.2 18.6-13.4c0.4-2.4 7-54.2-15-104.8l213.2-124.4v248.2c-54 6-95 38-97 39.6-7.4 5.8-8 16-2 23 6.2 7 16.8 7.8 24 2 0.4-0.2 32.8-25.6 74.8-31.6v87.4c0 9.6 8.4 17.4 18 17.4s18-7.8 18-17.4v-87.4c42 6 74.4 31.4 74.8 31.6 7.4 5.8 18 4.8 24.2-2 6.2-7 5.4-17.2-1.8-23-1.8-1.4-43-33.6-97-39.6v-248.2l213 124.4c-22 50.4-15 102.4-14.8 104.8 1.4 9.2 9.6 15.2 18.6 13.4s15.2-11 13.8-20.2c0-0.4-5.6-41.8 10.2-81.4l75.2 43.8c8.2 4.8 18.8 2 23.6-6.4s2-19-6.2-23.8z"],"grid":0,"tags":["ios-snow-outline"]},{"paths":["M871.4 683l-58.2-34c21.4-20.8 45.4-30.8 45.6-31 16.6-6.6 25.2-25.2 19.6-42-4.2-13-16.4-21.8-30-21.8-4.2 0-8.2 0.8-12 2.4-5 2-47 19.8-80.6 59l-175.6-103.6 175.8-103.6c34.2 40.2 78.4 58.2 80.6 59.2 3.8 1.6 8 2.4 12 2.4 13.6 0 25.6-8.8 30-21.8 5.6-17-3-35.4-19.6-42-0.2-0.2-24.4-10.2-45.8-31l58.2-34c15.8-9.2 21.2-29.6 12.2-45.6-6-10.4-17-16.8-28.8-16.8-5.8 0-11.6 1.6-16.6 4.6l-58 33.8c-7-29-3.6-55-3.6-55.2 2.6-17.8-9-34.6-26.4-38.2-2.2-0.4-4.4-0.6-6.6-0.6-15.6 0-28.6 11.2-31.2 26.8l-0.2 0.6c-4.8 20.8-6.2 61.6 7 101.8l-173.2 102.2v-207.2c50-9.4 83.6-32.6 88.8-36.8 8.4-6.6 13.8-16.2 14.8-25.6 0.6-7.6-1.8-15-6.6-20.6-6.4-7.2-16.8-11.2-28.6-11.2-8.8 0-16.8 2.4-22.8 6.8-2.8 1.8-17.6 13-45.6 21v-67.6c0-18-15.6-33.4-34-33.4s-34 15.2-34 33.4v67.4c-22-7.4-37.2-17.4-45.4-22.8-8.2-5.6-18.2-8.4-24.2-8.4-5.8 0-19.6 0.2-27.4 13.2-6 9.8-5.6 18.4-4.8 23.6 1 5.8 3.8 12.6 11 20.4s46.8 32.2 90.8 40.6v206l-183.2-102.6c18.8-52 14.8-99.8 14.8-100.4-2.4-16.4-14-27.4-29.2-27.4-2.2 0-4.4 0.2-6.4 0.6-17 3.6-28 20-25.4 38.2 0.2 1.2 3.8 26.6-3.2 55.2l-59.6-33.8c-5-3-10.8-4.6-16.6-4.6-11.8 0-22.8 6.4-28.8 16.8-9 15.8-3.6 36.2 12.2 45.6l58.2 34c-21.4 20.6-45.4 30.8-45.6 31-16.6 6.6-25.2 25.2-19.6 42 4.2 13 16.4 21.8 30 21.8 4.2 0 8.2-0.8 12-2.4 2-0.8 46.2-19 80.6-59.2l179.8 103.6-179.8 103.6c-33.4-39.4-75.4-57-80.6-59-3.8-1.6-8-2.4-12-2.4-13.6 0-25.6 8.8-30 21.8-5.6 17 3 35.4 19.4 42 0.2 0.2 24.4 10.4 45.8 31l-58.2 34c-15.8 9.2-21.2 29.6-12.2 45.6 6 10.4 17 16.8 28.8 16.8 5.8 0 11.6-1.6 16.6-4.6l58-33.8c7 29 3.6 55 3.6 55.2-2.6 17.8 9 34.4 26.4 38.2 2.2 0.4 4.4 0.6 6.6 0.6 15.8 0 29-11.6 31.2-27.4 1-6.8 6.4-53.6-10.8-100.4l177.2-102.6v206c-42 8.4-79.6 32.8-90.8 42.6l-0.2 0.2c-5.8 4.6-9.2 11.2-9.8 18.6-0.8 9.2 2.8 19.2 10.2 27.4 2.4 2.8 10 11.2 21.6 11.2 6.2 0 12.2-2.4 18.4-7.2l1-0.8c2-1.8 26-17.6 50-25.4v67.4c0 18 15.6 33.4 34 33.4s34-15.2 34-33.4v-67.8c30 8 44.4 21.2 47.6 23.2 5.8 4.4 13.6 6.6 21.8 6.6 11.2 0 21.2-4 27.4-11.2 4.6-5.4 7-12.2 6.4-19.2-0.8-9.4-7-19.4-16.2-26.8-0.4-0.4-33-28.8-87-38.8v-205l173.2 102.2c-14.4 42.6-9.6 83.2-6.6 99.6v0.4c2.4 15.6 12.6 27.2 29 27.2 2.2 0 4.4-0.2 6.6-0.6 17.6-3.6 29.8-20.6 27.4-38-0.2-1.6-2.8-27.2 4-55.6l58.2 34.2c5 3 10.8 5 16.6 5 0 0 0 0 0 0 12 0 23-6.8 28.8-17.2 9-15.6 3.6-36.4-12.2-45.6z"],"grid":0,"tags":["ios-snow"]},{"paths":["M432 714c0.8 0 0.8-0.2 0-0.4-0.8 0.2-1 0.4 0 0.4z","M864 160v704h-704v-704h704zM896 128h-768v768h768v-768z"],"grid":0,"tags":["ios-square-outline"]},{"paths":["M432 714c0.8 0 0.8-0.2 0-0.4-0.8 0.2-1 0.4 0 0.4z","M896 128h-768v768h768v-768z"],"grid":0,"tags":["ios-square"]},{"paths":["M352 896h128v-768h-128v768zM384 160h64v704h-64v-704z","M160 896h128v-320h-128v320zM192 608h64v256h-64v-256z","M544 896h128v-448h-128v448zM576 480h64v384h-64v-384z","M736 256v640h128v-640h-128zM832 864h-64v-576h64v576z"],"grid":0,"tags":["ios-stats-outline"]},{"paths":["M352 896h128v-768h-128v768z","M160 896h128v-320h-128v320z","M544 896h128v-448h-128v448z","M736 256v640h128v-640h-128z"],"grid":0,"tags":["ios-stats"]},{"paths":["M694.4 928h45.6l-98.6-96h-45.6l32.2 32h-232l32.2-32h-45.6l-98.6 96h45.6l34.2-32h296.4z","M400 144h224c8.8 0 16 7.2 16 16s-7.2 16-16 16h-224c-8.8 0-16-7.2-16-16s7.2-16 16-16z","M688 128c53 0 96 43 96 96v448c0 53-43 96-96 96h-352c-53 0-96-43-96-96v-448c0-53 43-96 96-96h352zM336 512h356c35.2 0 64-28.8 64-64v-192c0-35.2-28.6-64-64-64h-356c-35.2 0-64 28.8-64 64v192c0 35.2 28.6 64 64 64zM673 751c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88zM353 751c48.6 0 88-39.4 88-88s-39.4-88-88-88-88 39.4-88 88 39.4 88 88 88zM688 96h-352c-70.6 0-128 57.4-128 128v448c0 70.6 57.4 128 128 128h352c70.6 0 128-57.4 128-128v-448c0-70.6-57.4-128-128-128v0zM336 480c-17.6 0-32-14.4-32-32v-192c0-17.6 14.4-32 32-32h356c17.6 0 32 14.4 32 32v192c0 17.6-14.4 32-32 32h-356zM673 719c-31 0-56-25-56-56s25-56 56-56c31 0 56 25 56 56s-25 56-56 56v0zM353 719c-31 0-56-25-56-56s25-56 56-56c31 0 56 25 56 56s-25 56-56 56v0z"],"grid":0,"tags":["ios-subway-outline"]},{"paths":["M688 96h-352c-70.4 0-128 57.6-128 128v448c0 70.4 57.6 128 128 128h352c70.4 0 128-57.6 128-128v-448c0-70.4-57.6-128-128-128zM400 144h224c8.8 0 16 7.2 16 16s-7.2 16-16 16h-224c-8.8 0-16-7.2-16-16s7.2-16 16-16zM336 752c-31 0-56-25-56-56s25-56 56-56c31 0 56 25 56 56s-25 56-56 56zM688 752c-31 0-56-25-56-56s25-56 56-56c31 0 56 25 56 56s-25 56-56 56zM768 448c0 17.6-14.4 32-32 32h-447.6c-17.6 0-32.4-14.4-32.4-32v-191.6c0-17.6 14.8-32.4 32.4-32.4h447.6c17.6 0 32 14.8 32 32.4v191.6z","M738.4 928h45.6l-98.6-96h-45.6l32.2 32h-320l32.2-32h-45.6l-98.6 96h45.6l34.2-32h384.4z"],"grid":0,"tags":["ios-subway"]},{"paths":["M496 800h32v128h-32v-128z","M496 96h32v128h-32v-128z","M96 496h128v32h-128v-32z","M800 496h128v32h-128v-32z","M296.903 704.327l22.627 22.627-90.509 90.509-22.627-22.627 90.509-90.509z","M794.978 206.523l22.627 22.627-90.509 90.509-22.627-22.627 90.509-90.509z","M319.809 297.039l-22.627 22.627-90.509-90.509 22.627-22.627 90.509 90.509z","M817.341 794.842l-22.627 22.627-90.509-90.509 22.627-22.627 90.509 90.509z","M512 352c88.2 0 160 71.8 160 160s-71.8 160-160 160c-88.2 0-160-71.8-160-160s71.8-160 160-160zM512 320c-105.8 0-192 86.2-192 192s86.2 192 192 192c105.8 0 192-86.2 192-192s-86.2-192-192-192v0z"],"grid":0,"tags":["ios-sunny-outline"]},{"paths":["M496 800h32v128h-32v-128z","M496 96h32v128h-32v-128z","M96 496h128v32h-128v-32z","M800 496h128v32h-128v-32z","M296.903 704.327l22.627 22.627-90.509 90.509-22.627-22.627 90.509-90.509z","M794.978 206.523l22.627 22.627-90.509 90.509-22.627-22.627 90.509-90.509z","M319.809 297.039l-22.627 22.627-90.509-90.509 22.627-22.627 90.509 90.509z","M817.341 794.842l-22.627 22.627-90.509-90.509 22.627-22.627 90.509 90.509z","M512 320c-105.8 0-192 86.2-192 192s86.2 192 192 192c105.8 0 192-86.2 192-192s-86.2-192-192-192v0z"],"grid":0,"tags":["ios-sunny"]},{"paths":["M779 186l-22.6 23.2 141.6 142.8h-514v32h514l-141.6 141.8 22.6 22.4 181-181.2z","M245 473.8l22.6 23.2-141.6 143h514v32h-514l141.6 141.8-22.6 22.2-181-181z"],"grid":0,"tags":["ios-swap"]},{"paths":["M288 640c53 0 96 43 96 96s-43 96-96 96-96-43-96-96 43-96 96-96zM288 608c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128c0-70.6-57.4-128-128-128v0z","M734.4 576c88.8 0 161.2 72.2 161.2 161s-72 159-160.8 159h-446c-88.8 0-161-70.2-161-159s72.2-161 161-161h445.2zM735 544h-446c-106.6 0-193 86.4-193 193s86.4 191 193 191h446c106.6 0 193-84.4 193-191s-86.4-193-193-193v0z","M736 192c53 0 96 43 96 96s-43 96-96 96-96-43-96-96 43-96 96-96zM736 160c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128c0-70.6-57.4-128-128-128v0z","M290 128h445c88.8 0 161 72.2 161 161s-72.2 159-161 159h-446c-88.8 0-160.8-70.2-160.8-159s72.6-161 161.4-161zM289 96c-106.6 0-193 86.4-193 193s86.4 191 193 191h446c106.6 0 193-84.4 193-191s-86.4-193-193-193h-446z"],"grid":0,"tags":["ios-switch-outline"]},{"paths":["M735 544h-446c-106.6 0-193 86.4-193 193s86.4 191 193 191h446c106.6 0 193-84.4 193-191s-86.4-193-193-193zM288 864c-70.6 0-128-57.4-128-128s57.4-128 128-128 128 57.4 128 128c0 70.6-57.4 128-128 128z","M289 480h446c106.6 0 193-84.4 193-191s-86.4-193-193-193h-446c-106.6 0-193 86.4-193 193s86.4 191 193 191zM736 160c70.6 0 128 57.4 128 128s-57.4 128-128 128-128-57.4-128-128c0-70.6 57.4-128 128-128z"],"grid":0,"tags":["ios-switch"]},{"paths":["M986.8 512l-63.6 63.6c19.4-126-19.6-260.4-117-357.8-162.4-162.4-426-162.6-588.4 0-32.6 32.6-58.6 69-78 108l31 15.6c17.8-35.8 41.6-69.4 71.4-99.2 148.6-148.6 390.6-148.6 539.4 0.2 91.2 91.2 126.4 217.2 105.8 336l-68.2-66.4-21.6 21.6 106.4 106.4 105.4-105.4-22.6-22.6z","M781.6 781.6c-148.6 148.6-390.6 148.8-539.4 0-91-91.2-126.2-217.8-105.6-335.8l66.2 66.2 22.6-22.6-105.4-105.4-105.4 105.4 22.6 22.6 63.6-63.6c-19.6 126.8 19.4 260.4 116.8 357.8 162.4 162.4 426 162.4 588.4 0 32.6-32.6 58.6-69.2 78-108l-31-15.6c-17.8 35.8-41.6 69.2-71.4 99z"],"grid":0,"tags":["ios-sync"]},{"paths":["M64 220v584c0 15.6 12.2 28 28 28h840c15.8 0 28-12.4 28-28v-584c0-15.6-12.2-28-28-28h-840c-15.8 0-28 12.6-28 28zM97.4 512.8c0-7.8 6.2-14 14-14s14 6.2 14 14c0 7.8-6.2 14-14 14-7.6 0-14-6.4-14-14zM940 512c0 15.4-13 28-28.2 28-15 0-28-12.4-28-28 0-15.4 12.8-28.2 28-28.2 15.2 0.2 28.2 12.8 28.2 28.2zM864 224v576h-704v-576h704z"],"grid":0,"tags":["ios-tablet-landscape"]},{"paths":["M804 64h-584c-15.6 0-28 12.2-28 28v840c0 15.8 12.4 28 28 28h584c15.6 0 28-12.2 28-28v-840c0-15.8-12.6-28-28-28zM511.2 97.4c7.8 0 14 6.2 14 14s-6.2 14-14 14c-7.8 0-14-6.2-14-14-0-7.6 6.4-14 14-14zM512 940c-15.4 0-28-13-28-28.2 0-15 12.4-28 28-28 15.4 0 28.2 12.8 28.2 28-0.2 15.2-12.8 28.2-28.2 28.2zM800 864h-576v-704h576v704z"],"grid":0,"tags":["ios-tablet-portrait"]},{"paths":["M512 224c194 0 352 124 352 276.6 0 71.8-35.2 138.4-99 187.8-65.6 50.8-154.8 78.6-251 78.6-57.8 0-102-6-139.4-18.6-1.2-0.4-2.6-1-4-1.4-0.6-0.2-1.2-0.4-1.6-0.4-9.4-2.8-19.4-4.2-29.4-4.2-11.2 0-22.2 1.8-32.6 5.2v0l-0.6 0.2c-1.2 0.4-17.8 6.6-22 8.6v0l-79.2 34.4c27.6-87.8 27.6-89.6 27.6-95.2 0-14.2-4.4-28.2-12.6-40.4-1-1.4-2-2.8-3.2-4.2-1.4-1.8-2.6-3.4-3.6-4.6-34.8-43.8-53.2-94.2-53.2-146-0.2-152.4 157.8-276.4 351.8-276.4zM512 192c-212.2 0-384 138.2-384 308.6 0 61.4 22.4 118.6 60.8 166.6 1.8 1.8 5.8 7.6 7.2 9.8 0 0-2-3.2-2.2-3.8 0 0 0 0 0 0v0c0 0 0 0 0 0 4.6 6.6 7.2 14.2 7.2 22.4 0 2.8-35.8 116-35.8 116v0c-2.6 8.8 4.2 17.8 15.2 20 1.6 0.4 3.2 0.4 4.8 0.4 2.6 0 5-0.4 7.4-1l3.2-1.2 101.2-44c1.8-0.8 18-7 20-7.8 0 0 1.2-0.4 1.2-0.4s-0.2 0-1.2 0.4c6.8-2.4 14.4-3.6 22.4-3.6 7.2 0 14.2 1 20.6 3 0.2 0 0.4 0 0.4 0.2 1 0.4 2 0.6 3 1 46.2 15.8 96.8 20.6 150.2 20.6 212 0 382-128.2 382-298.6 0.4-170.4-171.6-308.6-383.6-308.6v0z"],"grid":0,"tags":["ios-text-outline"]},{"paths":["M512 192c-212.2 0-384 138.2-384 308.6 0 61.4 22.4 118.6 60.8 166.6 1.8 1.8 5.8 7.6 7.2 9.8 0 0-2-3.2-2.2-3.8 0 0 0 0 0 0v0c0 0 0 0 0 0 4.6 6.6 7.2 14.2 7.2 22.4 0 2.8-35.8 116-35.8 116v0c-2.6 8.8 4.2 17.8 15.2 20 1.6 0.4 3.2 0.4 4.8 0.4 2.6 0 5-0.4 7.4-1l3.2-1.2 101.2-44c1.8-0.8 18-7 20-7.8 0 0 1.2-0.4 1.2-0.4s-0.2 0-1.2 0.4c6.8-2.4 14.4-3.6 22.4-3.6 7.2 0 14.2 1 20.6 3 0.2 0 0.4 0 0.4 0.2 1 0.4 2 0.6 3 1 46.2 15.8 96.8 20.6 150.2 20.6 212 0 382-128.2 382-298.6 0.4-170.4-171.6-308.6-383.6-308.6v0z"],"grid":0,"tags":["ios-text"]},{"paths":["M606 600.6v-443.8c0-51.4-42-93-94-93s-94 41.6-94 93v443.8c-58 33-97.8 95.6-97.8 167.4 0 106 86 192 192 192s192-86 192-192c0-71.8-40.2-134.6-98.2-167.4zM625 881.2c-30.2 30.2-70.2 46.8-113 46.8-88.4 0-160.2-71.8-160.2-160 0-57.6 31.6-111 81.6-139.6l16.6-9.2v-462.4c0-33.6 27.8-61 62-61s62 27.4 62 61v462.2l15.8 9.2c50.8 28.8 82 82.2 82 139.8 0 42.8-16.8 83-46.8 113.2z","M544 644v-356c0-17.6-14.4-32-32-32s-32 14.4-32 32v356c-56 14.2-96.2 64.4-96.2 124 0 70.6 57.2 128 128 128s128.2-57.4 128.2-128c-0.2-59.6-42-109.8-96-124z"],"grid":0,"tags":["ios-thermometer-outline"]},{"paths":["M606 600.6v-443.6c0-51.4-42-93-94-93s-94 41.6-94 93v443.8c-58 33-98 95.6-98 167.2 0 106 85.8 192 191.8 192s192.2-86 192.2-192c0-72-40-134.6-98-167.4zM512.4 896c-70.6 0-128-57.2-128-128 0-59.6 39.6-109.8 95.6-124v-356c0-17.6 14.4-32 32-32s32 14.4 32 32v356c54 14.2 96.2 64.4 96.2 124 0 70.6-57.2 128-127.8 128z","M607.6 768.4c0 53.019-42.981 96-96 96s-96-42.981-96-96c0-53.019 42.981-96 96-96s96 42.981 96 96z"],"grid":0,"tags":["ios-thermometer"]},{"paths":["M428.6 96c77 0 160.4 8.2 225.2 16.2 43 5.2 68.2 15 92.8 24.2 31.8 12.2 62 23.6 133.4 23.6 8.8 0 16 7.2 16 16s-7.2 16-16 16c-77.4 0-111.6-13-144.8-25.8-23.6-9-46-17.6-85.2-22.4-97.2-12-223-22-330.8-8.2-74.8 9.4-112.2 25-124.4 54.6-4.2 10 1 21.8 5.4 32.2 3 7 5.8 13.2 5.8 19.6 0 11-8.2 17.8-17.8 25.6-12.6 10.4-28.2 23.2-28.2 41.6 0 18.2 9.6 29.6 18.8 40.6 7.4 9 15.2 18.2 15.2 30.2 0 11.2-5.8 19-10.6 25.2-6.4 8.4-13.4 17.8-13.4 42.8 0 17.6 9 25 19.2 33.6 9.2 7.6 28.4 23.6 11.8 47.6-14.6 21-5 45.2 4.8 56.2 10.6 12 16.4 15.6 67.2 12.6 34.4-2 108.4-13.6 157.4-21.2 22.4-3.6 38.6-6 44.8-6.6 9.8-1 23-2.4 35.6 0.8 16.6 4.4 27.6 15.8 31.8 33.2 3.8 15.6-3 29-12.2 47.8-7.4 15.2-17.8 36-27 66.8-14.6 48-19.4 120 2.6 159.6 5.4 9.8 13.8 15.6 25.2 17.4 12 1.8 22-1.8 24.6-3.8 3-5 8-25 12-41 6.6-26.2 14.6-64.8 25.8-89.4 16.4-36.2 69.4-84.8 122-131.4 8-7 14.8-13.2 19.6-17.6 14.8-13.6 31.6-38.2 46.4-60 12-17.6 22.4-33 31.2-41.6 18.8-18.8 45.4-31.2 67.4-31.2 8.8 0 16 7.2 16 16s-7.2 16-16 16c-11.4 0-30.4 7.4-44.6 21.8-6.6 6.6-16.8 21.4-27.4 37-15.8 23-33.6 49.2-51 65.4-5 4.8-12.2 11-20.2 18.2-34.6 30.6-99 87.6-114 120.8-10 22-17.8 59-24 84-7.6 30.6-11.6 45.6-18.4 53.6-9.2 11-26.8 15.8-49.8 15.8s-41.6-14.4-52.6-34.2c-23.4-42-25.4-118-5.4-184.4 10-33.4 21-55.4 29-71.6 6-12.2 10.8-21.8 9.8-26-2.4-9.6-7.4-12.4-32.8-9.8-5.4 0.6-23 3.4-43.2 6.4-49.6 7.8-124.4 19.4-160.4 21.6-52.2 3-72 0.2-92.8-23.4-20.4-23-29.6-63.2-7.4-95.4-1.6-1.4-3.8-3.4-5.8-5-11.8-9.8-31.2-25.8-31.2-58.6 0-35.8 12-51.6 20-62.2 1.4-1.8 3.2-4.4 3.8-5.6-1.2-2.2-4.8-6.6-7.6-10-10.4-12.4-26.2-31.4-26.2-61.2 0-33.6 25-54.2 39.8-66.4 1.4-1.2 3.2-2.6 4.8-4-0.6-1.2-1.2-2.6-1.6-3.8-5.6-13-15.2-34.6-5.6-57.4 21.8-52.4 88.2-66.8 150.4-74 33-3.4 72-7.4 112.8-7.4z"],"grid":0,"tags":["ios-thumbs-down-outline"]},{"paths":["M128 309.2c0 29.8 15.8 48.6 26.2 61.2 2.8 3.2 6.4 7.6 7.6 10-0.6 1.2-2.4 3.8-3.8 5.6-8 10.4-20 26.4-20 62.2 0 32.8 19.4 48.8 30.8 58.2 1.8 1.6 4.2 3.4 5.8 5-22.2 32.2-13 72.4 7.4 95.4 21 23.6 40.6 26.4 92.8 23.4 36-2.2 111-13.8 160.4-21.6 20.2-3.2 37.8-6 43.2-6.4 25.4-2.6 30.4 0 32.8 9.8 1 4.2-3.8 13.8-9.8 26-8 16.2-19 38.4-29 71.6-20.2 66.4-18 142.4 5.4 184.4 11 19.8 29.6 34.2 52.6 34.2s40.6-4.8 49.8-15.8c6.8-8 10.6-23.2 18.4-53.6 6.2-24.8 14-61.8 24-84 15-33.2 79.4-90.2 114-120.8 8.2-7.2 15.2-13.4 20.2-18.2 17.4-16.2 35.2-42.2 51-65.4 10.8-15.6 20.8-30.4 27.4-37 14.2-14.2 33.2-21.8 44.6-21.8 8.8 0 16-7.2 16-16v-319.6c0-8.8-7.2-16-16-16-71.4 0-101.4-11.4-133.4-23.6-24.4-9.4-49.8-19-92.8-24.2-64.8-8-148.4-16.2-225.2-16.2-40.8 0-79.8 4-113.2 7.8-62 7.2-128.4 21.6-150.4 74-9.4 22.8 0 44.4 5.6 57.4 0.6 1.2 1 2.4 1.6 3.8-1.6 1.2-3.2 2.8-4.8 4-14.2 12.2-39.2 32.6-39.2 66.2z"],"grid":0,"tags":["ios-thumbs-down"]},{"paths":["M595.4 928c-77 0-160.4-8.2-225.2-16.2-43-5.2-68.2-15-92.8-24.2-31.8-12.2-62-23.6-133.4-23.6-8.8 0-16-7.2-16-16s7.2-16 16-16c77.4 0 111.6 13 144.8 25.8 23.6 9 46 17.6 85.2 22.4 97.2 12 223 22 330.8 8.2 74.8-9.4 112.2-25 124.4-54.6 4.2-10-1-21.8-5.4-32.2-3-7-5.8-13.2-5.8-19.6 0-11 8.2-17.8 17.8-25.6 12.6-10.2 28.2-23 28.2-41.6 0-18.2-9.6-29.6-18.8-40.6-7.4-9-15.2-18.2-15.2-30.2 0-11.2 5.8-19 10.6-25.2 6.4-8.4 13.4-17.8 13.4-42.8 0-17.6-9-25-19.2-33.6-9.2-7.6-28.4-23.6-11.8-47.6 14.6-21 5-45.2-4.8-56.2-10.6-12-16.4-15.6-67.2-12.6-34.4 2-108.4 13.6-157.4 21.2-22.4 3.6-38.6 6-44.8 6.6-9.8 1-23 2.4-35.6-0.8-16.6-4.4-27.6-15.8-31.8-33.2-3.8-15.6 3-29 12.2-47.8 7.4-15.2 17.8-36 27-66.8 14.6-48 19.4-120-2.6-159.6-5.4-9.8-13.8-15.6-25.2-17.4-12-1.8-22 1.8-24.6 3.8-3 5-8 25-12 41-6.6 26.2-14.6 64.8-25.8 89.4-16.4 36.2-69.4 84.8-122 131.4-8 7-14.8 13.2-19.6 17.6-14.8 13.6-31.6 38.2-46.4 60-12 17.6-22.4 33-31.2 41.6-18.8 18.8-45.4 31.2-67.4 31.2-8.8 0-16-7.2-16-16s7.2-16 16-16c11.4 0 30.4-7.4 44.6-21.8 6.6-6.6 16.8-21.4 27.4-37 15.8-23 33.6-49.2 51-65.4 5-4.8 12.2-11 20.2-18.2 34.6-30.6 99-87.6 114-120.8 10-22 17.8-59 24-84 7.6-30.6 11.6-45.6 18.4-53.6 9.2-11 26.8-15.8 49.8-15.8s41.6 14.4 52.6 34.2c23.4 42 25.4 118 5.4 184.4-10 33.4-21 55.4-29 71.6-6 12.2-10.8 21.8-9.8 26 2.4 9.6 7.4 12.4 32.8 9.8 5.4-0.6 23-3.4 43.2-6.4 49.6-7.8 124.4-19.4 160.4-21.6 52.2-3 72-0.2 92.8 23.4 20.4 23 29.6 63.2 7.4 95.4 1.6 1.4 3.8 3.4 5.8 5 11.6 9.6 30.8 25.6 30.8 58.2 0 35.8-12 51.6-20 62.2-1.4 1.8-3.2 4.4-3.8 5.6 1.2 2.2 4.8 6.6 7.6 10 10.4 12.4 26.2 31.4 26.2 61.2 0 33.6-25 54.2-39.8 66.4-1.4 1.2-3.2 2.6-4.8 4 0.6 1.2 1.2 2.6 1.6 3.8 5.6 13 15.2 34.6 5.6 57.4-21.8 52.4-88.2 66.8-150.4 74-32.6 3.8-71.6 7.8-112.4 7.8z"],"grid":0,"tags":["ios-thumbs-up-outline"]},{"paths":["M896 714.8c0-29.8-15.8-48.6-26.2-61.2-2.8-3.2-6.4-7.6-7.6-10 0.6-1.2 2.4-3.8 3.8-5.6 8-10.4 20-26.4 20-62.2 0-32.8-19.4-48.8-30.8-58.2-1.8-1.6-4.2-3.4-5.8-5 22.2-32.2 13-72.4-7.4-95.4-21-23.6-40.6-26.4-92.8-23.4-36 2.2-111 13.8-160.4 21.6-20.2 3.2-37.8 6-43.2 6.4-25.4 2.6-30.4 0-32.8-9.8-1-4.2 3.8-13.8 9.8-26 8-16.2 19-38.4 29-71.6 20.2-66.4 18-142.4-5.4-184.4-11-19.8-29.6-34.2-52.6-34.2s-40.6 4.8-49.8 15.8c-6.8 8-10.6 23.2-18.4 53.6-6.2 24.8-14 61.8-24 84-15 33.2-79.4 90.2-114 120.8-8.2 7.2-15.2 13.4-20.2 18.2-17.4 16.2-35.2 42.2-51 65.4-10.8 15.6-20.8 30.4-27.4 37-14.2 14.2-33.2 21.8-44.6 21.8-8.8 0-16 7.2-16 16v319.6c0 8.8 7.2 16 16 16 71.4 0 101.4 11.4 133.4 23.6 24.4 9.4 49.8 19 92.8 24.2 64.8 8 148.4 16.2 225.2 16.2 40.8 0 79.8-4 113.2-7.8 62-7.2 128.4-21.6 150.4-74 9.4-22.8 0-44.4-5.6-57.4-0.6-1.2-1-2.4-1.6-3.8 1.6-1.2 3.2-2.8 4.8-4 14.2-12.2 39.2-32.6 39.2-66.2z"],"grid":0,"tags":["ios-thumbs-up"]},{"paths":["M566.4 352l-35.6 118.8-12.4 41.2h105.6l-138.4 219.6 31-115.4 10.8-40.4h-145.6l49.8-224h134.8zM609.4 320h-203.4l-64 288h143.6l-85.6 320 282-448h-120.6l48-160z","M748.8 283.8l-26.6-0.2c-23.4-107.2-110.2-187.6-250.2-187.6s-255.6 100.8-255.6 243l0.6 9.6c-84.4 11.2-153 90.6-153 179.4 0 94 75.8 176 169.4 176h194.6l8.4-32c-126 0-203 0-203 0-36 0-70.2-16.2-96.4-43.8-26-27.4-40.8-64.8-40.8-102 0-35 13.2-69.6 37-97 23.6-27 54.8-44.4 88.2-49l29.6-4-2-29.8-0.6-8.6c0.2-58.6 23.4-112.6 65.2-151.8s98-58.8 158.4-58.8c58.6 0 110 14.6 148.6 45.8 35.4 28.8 59.8 69.4 70.4 117.4l5.8 26.8c23-1.4 52-1.4 52-1.4 49 0 94.2 17.2 127.4 48.2 33.4 31.2 51.6 74.4 51.6 121.6 0 89.4-67.4 169.4-153.6 183.6 0 0-17.8 2.8-40.4 2.8-7.4 0-140.8 0-140.8 0l-20.4 32h161.4c144 0 226-104 226-220 0-117.2-94.6-200.2-211.2-200.2z"],"grid":0,"tags":["ios-thunderstorm-outline"]},{"paths":["M748.8 283.8l-26.6-0.2c-23.4-107.2-110.2-187.6-250.2-187.6s-255.6 100.8-255.6 243l0.6 9.6c-84.4 11.2-153 90.6-153 179.4 0 94 75.8 176 169.4 176h193.6l17.2-64h-141.8l8.6-39 64-288 5.6-25h271.8l-12.4 41.2-35.6 118.8h135.6l-30.8 49-130.4 207h155.2c144 0 226-104 226-220 0-117.2-94.6-200.2-211.2-200.2z","M682 480h-120.6l48-160h-203.4l-64 288h144l-85.8 320z"],"grid":0,"tags":["ios-thunderstorm"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 893.4c-210.2 0-381.4-171-381.4-381.4 0-210.2 171-381.4 381.4-381.4 210.2 0 381.4 171 381.4 381.4 0 210.2-171.2 381.4-381.4 381.4z","M512 512h-192v34.6h226.6v-290.6h-34.6z"],"grid":0,"tags":["ios-time-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM546 546h-226v-34h192v-256h34v290z"],"grid":0,"tags":["ios-time"]},{"paths":["M694.4 928h45.6l-109-106.4-35.2 10.4 32.2 32h-232l32.2-32-34.8-10.4-109.4 106.4h45.6l34.2-32h296.4z","M512 736c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zM512 579c-33.6 0-61 27.4-61 61s27.4 61 61 61 61-27.4 61-61-27.4-61-61-61z","M674 128h-34c0-17.6-14.4-32-32-32h-192c-17.6 0-32 14.4-32 32h-30c-70.6 0-130 55.4-130 126v448c0 70.6 288 130 288 130s288-59.4 288-130v-448c0-70.6-55.4-126-126-126zM418 128h188v32h-188v-32zM768 701c0 3.2-17.4 28.6-130 63.8-54.4 17-107.4 30.8-125.2 34.6-17.8-3.8-71-17.4-125.4-34.4-113-35.2-129.4-60.6-131.4-63.8v-447.2c0-52.4 44.6-94 98-94h30c0 17.6 14.4 32 32 32h192c17.6 0 32-14.4 32-32h34c25.6 0 49 9.4 66.8 27.2s27.2 41.2 27.2 66.8v447z","M672 288c0 0 0 0 0 0v128c0 0 0 0 0 0h-320c0 0 0 0 0 0v-127.8c0 0 0-0.2 0-0.2h320zM672 256h-320c-17.6 0-32 14.4-32 32v128c0 17.6 14.4 32 32 32h320c17.6 0 32-14.4 32-32v-128c0-17.6-14.4-32-32-32v0z"],"grid":0,"tags":["ios-train-outline"]},{"paths":["M595.8 832l32.2 32h-232l32.2-32-34.8-10.4-109.4 106.4h45.6l34.2-32h296.4l34.2 32h45.6l-109-106.4z","M674 128h-34c0-17.6-14.4-32-32-32h-192c-17.6 0-32 14.4-32 32h-30c-70.6 0-130 55.4-130 126v448c0 70.6 288 130 288 130s288-59.4 288-130v-448c0-70.6-55.4-126-126-126zM418 128h188v32h-188v-32zM512 736c-53 0-96-43-96-96s43-96 96-96 96 43 96 96-43 96-96 96zM704 416c0 17.6-14.4 32-32 32h-320c-17.6 0-32-14.4-32-32v-128c0-17.6 14.4-32 32-32h320c17.6 0 32 14.4 32 32v128z","M512 579c-33.6 0-61 27.4-61 61s27.4 61 61 61 61-27.4 61-61-27.4-61-61-61z"],"grid":0,"tags":["ios-train"]},{"paths":["M854.6 832l68.6-68.6c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-68.6 68.6-54.6-54.6c34.4-51 54.6-112.6 54.6-178.8 0-98.8-44.8-187.2-115.2-246l179.2-178v152c0 8.8 7.2 16 16 16s16-7.2 16-16v-192c0-8.8-7.2-16-16-16h-192c-8.8 0-16 7.2-16 16s7.2 16 16 16h152l-181.4 182.4c-51-34.4-112.4-54.4-178.6-54.4s-127.6 20-178.6 54.4l-54.4-54.8 66.4-66.4c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0l-66.4 66.4-104.4-105h152c8.8 0 16-7.2 16-16s-7.2-16-16-16h-192c-8.8 0-16 7.2-16 16v192c0 8.8 7.2 16 16 16s16-7.2 16-16v-152l105 104.4-70.4 70.4c-6.2 6.2-6.2 16.4 0 22.6 3.2 3.2 7.2 4.6 11.4 4.6s8.2-1.6 11.4-4.6l70.4-70.4 51.6 51.2c-70.6 58.6-115.4 147-115.4 245.8 0 176.8 143.2 320 320 320 98.8 0 187.4-44.8 246-115.4l51.4 51.4-68.6 68.6c-6.2 6.2-6.2 16.4 0 22.6 3.2 3.2 7.2 4.6 11.4 4.6s8.2-1.6 11.4-4.6l68.6-68.6 68.6 68.6c3.2 3.2 7.2 4.6 11.4 4.6s8.2-1.6 11.4-4.6c6.2-6.2 6.2-16.4 0-22.6l-69-68.6zM715.6 779.6c-54.4 54.4-126.6 84.4-203.6 84.4s-149.2-30-203.6-84.4c-54.4-54.4-84.4-126.6-84.4-203.6s30-149.2 84.4-203.6c54.4-54.4 126.6-84.4 203.6-84.4s149.2 30 203.6 84.4c54.4 54.4 84.4 126.6 84.4 203.6s-30 149.2-84.4 203.6z"],"grid":0,"tags":["ios-transgender"]},{"paths":["M944 792h-224c-8.8 0-16-7.2-16-16s7.2-16 16-16h184l-328.8-328.4-167.8 168.2c-3 3-7 4.8-11.4 4.8-4.2 0-8.4-1.6-11.4-4.6l-316.4-316.8c-3.2-3.2-4.2-7.4-4.2-11.8 0-4.2 1.2-7.8 4.2-10.8 3.2-3.2 7.2-4.6 11.4-4.6 4 0 8.2 1.6 11.4 4.6l305 305.4 167.8-168c6.2-6.2 16.4-6.2 22.6 0l341.6 338.6v-184c0-8.8 7.2-16 16-16s16 7.2 16 16v224c0 8.8-7.2 15.4-16 15.4z"],"grid":0,"tags":["ios-trending-down"]},{"paths":["M944 256h-224c-8.8 0-16 7.2-16 16s7.2 16 16 16h184l-328.8 328.8-167.8-168c-3-3-7-4.6-11.4-4.6-4.2 0-8.4 1.6-11.4 4.6l-316.4 316.4c-3.2 3.2-4.2 7.4-4.2 11.8 0 4.2 1.2 7.8 4.2 11 3.2 3.2 7.2 4.6 11.4 4.6 4 0 8.2-1.6 11.4-4.6l305-305.4 167.8 168c6.2 6.2 16.4 6.2 22.6 0l341.6-338.6v184c0 8.8 7.2 16 16 16s16-7.2 16-16v-224c0-8.8-7.2-16-16-16z"],"grid":0,"tags":["ios-trending-up"]},{"paths":["M768 192c0-38.6 0-64 0-64h-512c0 0 0 25.4 0 64h-160v16c0 164 61 264.4 164 271.6 25.8 98.4 167.8 151.6 236 159.4v225h-176v32h384v-32h-176v-225c68.2-7.8 210.2-61 236-159.4 103-7.2 164-107.4 164-271.6v-16h-160zM161.4 376.6c-14.2-27.4-31.2-75.6-33.2-152.6h127.8c0 65.8 0 153.6 0 222.8-40-5.4-73-28.8-94.6-70.2zM736 448c0 54.6-47.8 93.4-87.8 116.2-53 30.2-111.4 43.8-136.2 43.8s-83.2-13.6-136.2-43.8c-40-23-87.8-61.6-87.8-116.2v-288h448v288zM862.6 376.6c-21.6 41.4-54.6 64.8-94.6 70.2 0-69.2 0-157 0-222.8h127.8c-2 77-19 125.2-33.2 152.6z"],"grid":0,"tags":["ios-trophy-outline"]},{"paths":["M768 192c0-38.6 0-64 0-64h-512c0 0 0 25.4 0 64h-160v16c0 164 61 264.4 164 271.6 25.8 98.4 167.8 151.6 236 159.4v225h-176v32h384v-32h-176v-225c68.2-7.8 210.2-61 236-159.4 103-7.2 164-107.4 164-271.6v-16h-160zM161.4 376.6c-14.2-27.4-31.2-75.6-33.2-152.6h127.8c0 65.8 0 153.6 0 222.8-40-5.4-73-28.8-94.6-70.2zM862.6 376.6c-21.6 41.4-54.6 64.8-94.6 70.2 0-69.2 0-157 0-222.8h127.8c-2 77-19 125.2-33.2 152.6z"],"grid":0,"tags":["ios-trophy"]},{"paths":["M542 129.6c0-0.6 0-1 0-1.6 0-17.6-13.6-32-30-32s-30 14.4-30 32c0 0.4 0 1 0 1.4-216 16-385.6 207.4-385.6 444 0 0.8-0.4 1.6-0.4 2.6h6.4c12.8-46 52.4-79.6 99.2-79.6 46.6 0 86 33.8 99 79.6h9.8c12.8-46 52.8-79.6 99.6-79.6 36.8 0 70 21 88 52.6v299c0 26.4-22 48-48.4 48s-48.2-21.6-48.2-48c0-8.8-7.2-16-16.2-16-8.8 0-16 7.2-16 16 0 44.2 36.4 80 80.4 80s80.4-35.8 80.4-80v-297.6c18-32.4 50.6-54 88-54 46.6 0 85.6 33.8 98.6 79.6h9.8c12.8-46 52.4-80 99.2-80 47 0 86.8 33.8 99.4 80h3.2c-4-233.2-172.2-429.6-386.2-446.4zM825.6 463.8c-41.8 0-79.2 20.2-104.2 51.8-24.8-31.6-62.2-51.6-104-51.6s-79.2 20.2-104 51.8c-24.8-31.6-62.2-51.8-104-51.8s-79.2 20.2-104 51.8c-24.8-31.6-62.2-51.8-104-51.8-23 0-44.6 6-63.6 16.8 15-71.4 47.2-137.4 94.4-191.4 66-75.4 155.6-121 252-128.2 0 0 13.2-0.8 28.6-0.8 15.6 0 26.4 1 26.4 1 96 7.6 185.6 55 252.4 133.8 44.6 52.6 76 115.2 92 182.6-17.6-9.2-37.4-14-58-14z"],"grid":0,"tags":["ios-umbrella-outline"]},{"paths":["M542 129.6c0-0.6 0-1 0-1.6 0-17.6-13.6-32-30-32s-30 14.4-30 32c0 0.4 0 1 0 1.4-216 16-385.6 207.4-385.6 444 0 0.8-0.4 1.6-0.4 2.6h6.4c12.8-46 52.4-79.6 99.2-79.6 46.6 0 86 33.8 99 79.6h9.8c12.8-46 52.8-79.6 99.6-79.6 36.8 0 70 21 88 52.6v299c0 26.4-22 48-48.4 48s-48.2-21.6-48.2-48c0-8.8-7.2-16-16.2-16-8.8 0-16 7.2-16 16 0 44.2 36.4 80 80.4 80s80.4-35.8 80.4-80v-297.6c18-32.4 50.6-54 88-54 46.6 0 85.6 33.8 98.6 79.6h9.8c12.8-46 52.4-80 99.2-80 47 0 86.8 33.8 99.4 80h3.2c-4-233.2-172.2-429.6-386.2-446.4z"],"grid":0,"tags":["ios-umbrella"]},{"paths":["M512 576c-35.346 0-64 28.654-64 64 0 29.82 20.396 54.878 48 61.984v66.016h32v-66.016c27.604-7.106 48-32.164 48-61.984 0-35.346-28.654-64-64-64zM512 672c-17.644 0-32-14.356-32-32s14.356-32 32-32 32 14.356 32 32-14.356 32-32 32z","M336 448v-144c0-97.046 78.968-176 176.032-176 97.030 0 175.968 78.954 175.968 176v16h32v-16c0-114.86-93.124-208-207.968-208-114.908 0-208.032 93.14-208.032 208v144h-112v480h640v-480h-496zM800 896h-576v-416h576v416z"],"grid":0,"tags":["ios-unlock-outline"]},{"paths":["M512 608c-17.644 0-32 14.356-32 32s14.356 32 32 32 32-14.356 32-32-14.356-32-32-32z","M336 448v-144c0-97.046 78.968-176 176.032-176 97.030 0 175.968 78.954 175.968 176v16h32v-16c0-114.86-93.124-208-207.968-208-114.908 0-208.032 93.14-208.032 208v144h-112v480h640v-480h-496zM528 701.984v66.016h-32v-66.016c-27.604-7.106-48-32.164-48-61.984 0-35.346 28.654-64 64-64s64 28.654 64 64c0 29.82-20.396 54.878-48 61.984z"],"grid":0,"tags":["ios-unlock"]},{"paths":["M660.8 639.8c27-35.8 43.2-79.8 43.2-127.8s-16.2-92-43.2-127.8l-26.6 19.6c22.8 30.2 36.4 67.6 36.4 108.2s-13.6 78-36.4 108.2l26.6 19.6z","M435.8 432h-115.8v160h115.8l138.2 112v-384z"],"grid":0,"tags":["ios-volume-down"]},{"paths":["M499.8 432h-115.8v160h115.8l140.2 112v-384z"],"grid":0,"tags":["ios-volume-mute"]},{"paths":["M730 776c60-70.4 94-168 94-264s-31.2-184.6-83.8-256.2l-27.2 20.6c48.4 65.8 77.2 147.4 77.2 235.6s-28.8 169.8-77.2 235.6l17 28.4z","M702.4 512c0-71.8-24-138-64-191.6l-27 20.2c35.8 48 57.2 107.2 57.2 171.6 0 42.8-9.6 83.4-26.6 120l20.2 34.6c25.6-46 40.2-98.6 40.2-154.8z","M587.8 512c0-48-16.4-92-43.6-127.8l-27 19.6c16 20.8 27.4 45 33 71.4l36.2 61.6c1-8 1.4-16.4 1.4-24.8z","M316.8 432h-116.8v160h116.8l139.2 112v-185.6l-79-134.8z","M325.6 160l-29.6 17 402.4 687 29.6-17z"],"grid":0,"tags":["ios-volume-off"]},{"paths":["M748.2 256l-27.2 20.6c48.2 65.8 77 147.2 77 235.4s-28.8 169.6-77.2 235.4l27.2 20.6c52.6-71.4 83.8-160 83.8-256s-31-184.6-83.6-256z","M640 703.6c40-53.6 64-119.8 64-191.6s-24-138-64-191.6l-27.2 20.2c35.8 48 57.2 107.2 57.2 171.4s-21.4 123.4-57.2 171.4l27.2 20.2z","M546.2 639.8c27.4-35.8 43.8-79.8 43.8-127.8s-16.4-92-43.8-127.8l-27 19.6c23.2 30.2 37 67.6 37 108.2s-13.8 77.8-37 108.2l27 19.6z","M307.8 432h-115.8v160h115.8l140.2 112v-384z"],"grid":0,"tags":["ios-volume-up"]},{"paths":["M416 692.2l-118.8 83.8c-6.4 6-9 15.6-9.2 23.8s2 15 8.2 21.4c6.2 6.6 15.4 10.6 23.8 10.6 8 0 21.8-8.4 28-14.4l122-88.6c6.4-6 10-14.4 10-23.2l16-90-80-80v156.6z","M608 192c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-35.346 28.654-64 64-64s64 28.654 64 64z","M677.8 860.4l-26.6-201.4c-0.8-6-3.4-11.6-7.2-16.2l-99.8-118v-213.4c0-19.4-26.4-23.4-32-23.4h-64c-5 0-9.8 1.2-14.4 3.4l-119 59.4c-17.4 9.2-26.8 26.6-26.8 49.2v112c0 17.6 14.4 32 32 32s32-14.4 32-32v-108.2l64-32v140.2l173 173 25.4 184c2.2 16 16 26.8 31.6 26.8h3.6c17.4-2.2 30.6-18 28.2-35.4z","M726.2 471.6l-166.2-165v90.2l121.2 120.2c12.6 12.4 32.8 12.4 45.2-0.2 6.2-6.2 9.6-12.8 9.6-20.8-0-8.2-3.4-18-9.8-24.4z"],"grid":0,"tags":["ios-walk"]},{"paths":["M512 736c-17.6 0-32 14.4-32 32s14.4 32 32 32c17.6 0 32-14.4 32-32s-14.4-32-32-32z","M488.4 547.4v-131.4h48v131.4l-12 140.6h-24l-12-140.6z","M512 195l362.4 669h-724.8l362.4-669zM512 128l-416 768h832l-416-768z"],"grid":0,"tags":["ios-warning-outline"]},{"paths":["M512 128l-416 768h832l-416-768zM488.4 416h48v131.4l-12 140.6h-24l-12-140.6v-131.4zM512 800c-17.6 0-32-14.4-32-32s14.4-32 32-32c17.6 0 32 14.4 32 32s-14.4 32-32 32z"],"grid":0,"tags":["ios-warning"]},{"paths":["M255.8 752c0-4 1.4-8 4.4-11 6.2-6.4 16.2-6.6 22.6-0.4 41.8 40 93.6 61.6 158.6 65.6 38 2.4 54.2 11.6 70 20.6 18.6 10.6 37.8 21.4 108.4 21.4 143.4 0 244-118.4 244-264v-112c0-49.4-6-97.8-32.2-139.6-25.6-40.8-53.8-74-96.6-95.8-7.8-4-11-13.6-7-21.6 4-7.8 13.6-11 21.6-7 48 24.4 80.4 61.6 109.2 107.2 29.6 47 37 101.2 37 156.6v112c0 163.2-115 296-276 296-78.8 0-102.8-13.6-124-25.6-14.4-8.2-25.6-14.6-56.4-16.4-72.8-4.6-131.2-28.8-178.6-74.4-3.2-3.2-5-7.4-5-11.6z","M545.4 804c0-0.8 0-1.8 0.2-2.6 1.4-8.8 9.6-14.6 18.4-13.2 71 11.6 132.2-4.8 177-47.8 6.4-6.2 16.6-5.8 22.6 0.4 6.2 6.4 5.8 16.6-0.4 22.6-52.4 50.2-123 69.6-204.2 56.2-8-1.2-13.6-8-13.6-15.6z","M128 584v-112c0-55.4 7.6-109.6 37-156.6 28.6-45.6 61.2-82.8 109.2-107.2 7.8-4 17.6-0.8 21.6 7s0.8 17.6-7 21.6c-42.8 21.8-71 55-96.6 95.8-26.4 41.6-32.4 90-32.4 139.4v112c0 69.6 18 140.2 77.6 193.8 60.6 54.8 142 86.2 223.2 86.2 8.8 0 16 7.2 16 16s-7.2 16-16 16c-89 0-178-34.4-244.6-94.4-66.2-59.8-88-139-88-217.6z","M646.4 208c0 20.987-17.013 38-38 38s-38-17.013-38-38c0-20.987 17.013-38 38-38s38 17.013 38 38z","M750.6 258c-3.8 1.2-7.8 2-12.2 2-21 0-38-17-38-38s17-38 38-38c11.4 0 21.4 4.8 28.4 12.6-6-38.8-39.6-68.6-80-68.6h-350c-39.2 0-72.2 28-79.6 65.4 6.8-6 15.6-9.4 25.2-9.4 21 0 38 17 38 38s-17 38-38 38c-3 0-5.8-0.4-8.6-1 14.8 17.8 37.6 29 63 29h350c25.8 0 49.2-11.6 63.8-30zM554.4 208c0-29.8 24.2-54 54-54s54 24.2 54 54-24.2 54-54 54c-29.4 0-54-24.2-54-54z"],"grid":0,"tags":["ios-watch"]},{"paths":["M511.6 136c60.4 48.2 116.2 108 166.2 178.4 82.2 115.4 122 222.8 122 328.6 0 139.4-129.2 252.8-288.2 252.8-98.2 0-188.6-43.4-241.8-115.8-10.8-14.6-19.8-30.2-26.8-46.2-12.6-29.2-19.2-59.6-19.2-90.8 0-0.6 0-1.6 0-2.4 0-1.4 0.2-3 0.2-4.6 2-105.2 42-210.4 122.2-321.6 69-95.6 130.6-151 165.4-178.4zM512.2 96c-46.2 32-117.2 96.2-191.6 199.6s-125.8 215.6-128.2 340c0 2.4-0.2 5-0.2 7.4 0 36.6 7.8 71.6 21.8 103.6 8.2 18.6 18.4 36 30.4 52.4 57 77.6 155.6 128.8 267.6 128.8 176.8 0 320.2-127.6 320.2-284.8 0-126.8-54-243.2-128-347.2s-145.2-164.8-192-199.8v0z","M531.8 822c-31.6 0-65.4-2.8-91.8-14.8 174-27.2 238-91.2 279.6-244.4 10.4 22.4 12.4 47.4 12.4 73.6 0 102.4-89.6 185.6-200.2 185.6z"],"grid":0,"tags":["ios-water-outline"]},{"paths":["M704 296c-74-104-145-165-192-200-46.2 32-117.2 96.2-191.6 199.6s-125.8 215.6-128.2 340c0 2.4-0.2 5-0.2 7.4 0 36.6 7.8 71.6 21.8 103.6 8.2 18.6 18.4 36 30.4 52.4 57 77.6 155.6 128.8 267.6 128.8 176.8 0 320.2-127.6 320.2-284.8 0-126.6-54-243-128-347zM531.8 822c-31.6 0-65.4-2.8-91.8-14.8 174-27.2 238-91.2 279.6-244.4 10.4 22.4 12.4 47.4 12.4 73.6 0 102.4-89.6 185.6-200.2 185.6z"],"grid":0,"tags":["ios-water"]},{"paths":["M512 224c144.6 0 293 58.2 402.8 156.8l-30.8 32.6c-45.8-40.8-97.4-73.6-154-97.4-69-29.2-142.4-44-218-44s-149 14.8-218 44c-56.6 24-108.2 56.6-154 97.4l-30.8-32.6c109.8-98.6 258.2-156.8 402.8-156.8zM512 192c-166 0-332.2 71.6-448 187.4l74.6 79.2c48.6-48.6 105-86.6 167.8-113.2 65.2-27.4 134.2-41.4 205.6-41.4s140.4 14 205.4 41.4c62.8 26.6 119.4 64.6 167.8 113.2l74.6-79.2c-115.6-115.8-281.8-187.4-447.8-187.4v0z","M512 450c91.2 0 177.8 31.8 246.8 89.8l-34 34c-59.8-49.2-134.4-76-212.8-76s-153 26.8-212.8 76l-34-34c69-58 155.6-89.8 246.8-89.8zM512 418c-114.4 0-218 46.2-293.2 120.8l79.2 79.2c57.4-56.8 133.2-88 214-88s156.6 31.2 214 88l79.2-79.2c-75.2-74.6-178.8-120.8-293.2-120.8v0z","M512 674c30.8 0 59.8 10.8 82.6 30.2l-82.6 82.6-82.6-82.6c22.8-19.4 51.8-30.2 82.6-30.2zM512 642c-51.8 0-97.8 24.6-127.2 62.8l127.2 127.2 127.2-127.2c-29.4-38.2-75.4-62.8-127.2-62.8v0z"],"grid":0,"tags":["ios-wifi-outline"]},{"paths":["M512 192c-166 0-332.2 71.6-448 187.4l74.6 79.2c48.6-48.6 105-86.6 167.8-113.2 65.2-27.4 134.2-41.4 205.6-41.4s140.4 14 205.4 41.4c62.8 26.6 119.4 64.6 167.8 113.2l74.6-79.2c-115.6-115.8-281.8-187.4-447.8-187.4v0z","M512 418c-114.4 0-218 46.2-293.2 120.8l79.2 79.2c57.4-56.8 133.2-88 214-88s156.6 31.2 214 88l79.2-79.2c-75.2-74.6-178.8-120.8-293.2-120.8v0z","M512 642c-51.8 0-97.8 24.6-127.2 62.8l127.2 127.2 127.2-127.2c-29.4-38.2-75.4-62.8-127.2-62.8v0z"],"grid":0,"tags":["ios-wifi"]},{"paths":["M528 650c0-44 41-77.4 80.4-109.6 15.8-13 30.8-25 43-38 53-55.4 52.4-103.4 52.4-142.2v-8.2c0-88.4-61.6-249.2-64-256h-256c-2.4 6.8-64 167-64 256v8.2c0 38.6-0.6 86.8 52.4 142.2 12.2 12.8 27.2 25 43 38 39.8 32.2 80.8 65.6 80.8 109.6v246h-144v32h320v-32h-144v-246zM405.4 128h213.2c10.8 32 39 125.4 49.6 192h-312.4c10.6-66.6 39-160 49.6-192zM512 578.8c-6 0-10.4-1.8-14.4-5.6 0 0 0 0 0 0-17.6-21.6-40.4-40.4-62-57.8-15-12.2-29.2-23.8-40.2-35.2-44.2-46-43.8-81.8-43.6-119.8 0-2.8-0.2-5.6 0-8.6h320c0.2 2.8 0 5.6 0 8.6 0.2 38 0.6 73.8-43.6 119.8-11 11.4-25.2 23-40.2 35.2-21.4 17.6-44.4 36.2-62 57.8 0 0 0 0 0 0-3.6 3.8-8 5.6-14 5.6z"],"grid":0,"tags":["ios-wine-outline"]},{"paths":["M528 650c0-44 41-77.4 80.4-109.6 15.8-13 30.8-25 43-38 53-55.4 52.4-103.4 52.4-142.2v-8.2c0-88.4-61.6-249.2-64-256h-256c-2.4 6.8-64 167-64 256v8.2c0 38.6-0.6 86.8 52.4 142.2 12.2 12.8 27.2 25 43 38 39.8 32.2 80.8 65.6 80.8 109.6v246h-144v32h320v-32h-144v-246zM405.4 128h213.2c10.8 32 39 125.4 49.6 192h-312.4c10.6-66.6 39-160 49.6-192z"],"grid":0,"tags":["ios-wine"]},{"paths":["M572 992c-12.2 0-23.6-4.6-32-13.2-6.4-6.6-14.2-18.2-14.2-37.2v-238.8h-27.8v238.8c0 19-8 30.8-14.8 37.4-8.6 8.4-20.2 13-32.6 13s-23.8-4.6-32.6-13c-6.8-6.6-14.8-18.2-14.8-37.4v-238.8h-87.8l89-341.2h-13.6l-48.8 180.8c-8 26.2-27.4 35.6-42.8 35.6 0 0 0 0 0 0-13.2 0-25.8-6.4-34-17.4-9.6-12.8-12.2-29.8-7.2-47.8l58-208.2c8.4-30.4 41.4-76.4 97.4-78.6h196.8c56.8 2.4 88.2 52 97 77.8l0.2 0.8 58 208.6c4.8 18 2 35.2-7.8 48-8.2 10.8-20.8 17.2-33.8 17.2-15.4 0-34.6-9.6-42.6-36.2v-0.4l-48.6-180.2h-15.4l91 341.2h-90.2v238.8c0 19-7.8 30.6-14.2 37.2-8.4 8.6-19.6 13.2-31.8 13.2zM466.6 671h90.6v270.6c0 13.6 7.6 18.4 14.8 18.4s14.8-4.8 14.8-18.4v-270.6h80.6l-91-341.2h80.6l55 203.4c2.4 8.4 7 13.2 12.2 13.2 3.2 0 6.6-1.8 8.8-4.8 3.6-4.8 4.4-12 2.2-20.2l-57.8-207.8c-5.2-15.2-27.2-54-68-55.8h-194.8c-43.4 2-64.2 41.6-68 55.4l-57.8 208.2c-2.2 8.2-1.6 15.2 2 19.8 2.2 3 5.6 4.8 9 4.8v0c5.4 0 10-4.6 12.6-12.8l54.8-203.4h78.6l-89 341.2h78.4v270.6c0 17.6 13.2 18.4 15.8 18.4s15.8-0.8 15.8-18.4v-270.6z","M511.8 212.8c-48.4 0-87.8-40.6-87.8-90.4s39.4-90.4 87.8-90.4 87.8 40.6 87.8 90.4-39.4 90.4-87.8 90.4zM511.8 64c-31 0-56.4 26.2-56.4 58.4s25.2 58.4 56.4 58.4 56.4-26.2 56.4-58.4-25.2-58.4-56.4-58.4z"],"grid":0,"tags":["ios-woman-outline"]},{"paths":["M572 992c-12.2 0-23.6-4.6-32-13.2-6.4-6.6-14.2-18.2-14.2-37.2v-238.8h-27.8v238.8c0 19-8 30.8-14.8 37.4-8.6 8.4-20.2 13-32.6 13s-23.8-4.6-32.6-13c-6.8-6.6-14.8-18.2-14.8-37.4v-238.8h-87.8l89-341.2h-13.6l-48.8 180.8c-8 26.2-27.4 35.6-42.8 35.6v0c-13.2 0-25.8-6.4-34-17.4-9.6-12.8-12.2-29.8-7.2-47.8l58-208.2c8.4-30.4 41.4-76.4 97.4-78.6h196.8c56.8 2.4 88.2 52 97 77.8l0.2 0.8 58 208.6c4.8 18 2 35.2-7.8 48-8.2 10.8-20.8 17.2-33.8 17.2-15.4 0-34.6-9.6-42.6-36.2v-0.4l-48.6-180.2h-15.4l91 341.2h-90.2v238.8c0 19-7.8 30.6-14.2 37.2-8.4 8.6-19.6 13.2-31.8 13.2z","M511.8 212.8c-48.4 0-87.8-40.6-87.8-90.4s39.4-90.4 87.8-90.4 87.8 40.6 87.8 90.4-39.4 90.4-87.8 90.4z"],"grid":0,"tags":["ios-woman"]},{"paths":["M288 536.8v179.2c0 13.8 9 28 22.8 28h57.2v104c0 26.6 21.4 48 48 48s48-21.4 48-48v-104h98v104c0 15 6.8 28.4 17.6 37.2 7.8 6.8 18.2 10.8 29.4 10.8 0.2 0 0.4 0 0.6 0s0.2 0 0.4 0c26.6 0 48-21.4 48-48v-104h55.2c14 0 22.8-14.2 22.8-27.8v-332.2h-448v152.8z","M816 352c-26.6 0-48 21.4-48 48v192c0 26.6 21.4 48 48 48s48-21.4 48-48v-192c0-26.6-21.4-48-48-48z","M208 352c-26.6 0-48 21.4-48 48v192c0 26.6 21.4 48 48 48s48-21.4 48-48v-192c0-26.6-21.4-48-48-48z","M622.4 178.2l37-43.8c0.8-1-0.4-3.2-2.6-5-2.2-1.6-4.8-2-5.4-0.8l-38.4 45.6c-27.2-10.8-60.4-17.6-101.2-17.6-41-0.2-74.4 6.4-101.6 17l-38-44.8c-0.8-1-3.2-0.8-5.4 0.8s-3.4 3.6-2.6 5l36.6 43.2c-96.4 41.8-110.8 144.4-112.8 174.4h447.2c-1.8-30.2-16-131.4-112.8-174zM413.6 277.8c-14.8 0-27-12-27-26.6s12-26.6 27-26.6c14.8 0 27 12 27 26.6s-12 26.6-27 26.6zM610.4 277.8c-14.8 0-27-12-27-26.6s12-26.6 27-26.6c14.8 0 27 12 27 26.6s-12.2 26.6-27 26.6z"],"grid":0,"tags":["logo-android"]},{"paths":["M427.146 512h169.692l-84.854-178.712z","M511.962 64l-447.962 160 92.24 544 355.76 192 355.5-192 92.5-544-448.038-160zM688 704l-53.178-112h-245.654l-53.168 112h-80l256-560 256 560h-80z"],"grid":0,"tags":["logo-angular"]},{"paths":["M667.2 307.8c-67.2 0-95.6 33-142.4 33-48 0-84.6-32.8-142.8-32.8-57 0-117.8 35.8-156.4 96.8-54.2 86-45 248 42.8 386 31.4 49.4 73.4 104.8 128.4 105.4 0.4 0 0.6 0 1 0 47.8 0 62-32.2 127.8-32.6 0.4 0 0.6 0 1 0 64.8 0 77.8 32.4 125.4 32.4 0.4 0 0.6 0 1 0 55-0.6 99.2-62 130.6-111.2 22.6-35.4 31-53.2 48.4-93.2-127-49.6-147.4-234.8-21.8-305.8-38.4-49.4-92.2-78-143-78v0z","M652.4 128c-40 2.8-86.6 29-114 63.2-24.8 31-45.2 77-37.2 121.6 1 0 2 0 3.2 0 42.6 0 86.2-26.4 111.6-60.2 24.6-32.2 43.2-77.8 36.4-124.6v0z"],"grid":0,"tags":["logo-apple"]},{"paths":["M821 558.4c-10-23-25.4-43.2-56.2-60.2-16.4-9-32.2-15.6-50.8-20 10.8-5 20-10.8 32.6-22 15-13.2 26.2-31.4 31.2-46.6 5.2-15 8.2-36 7-56.4-2.2-33.6-8.8-66.2-26.4-89.6s-42.4-41.4-75.2-54c-25.2-9.6-51-15.6-91-17.8v-127.8h-80v128h-64v-128h-82v128h-174.2v96h55.8c17.4 0 29.2 1.6 35.2 4.6 6.2 3 10.6 7 13 12 2.6 5 3.8 16.8 3.8 35v346.4c0 18-1.2 29.6-3.8 34.8s-4 9.8-10.2 12.6c-6.2 2.8-6.4 2.6-23.6 2.6h-52.8l-17.4 96h174v128h82v-128h64v128h80v-128.8c52-2.6 89-9.4 118.8-20.6 38.6-14.4 68.2-35.4 89.4-63s29.8-69.8 31.6-102.4c1.4-29-1.8-66.4-10.8-86.8zM448 300h64v148h-64v-148zM448 724v-180h64v180h-64zM592 307.8c12 5 19.8 15 27.6 25.4 8.6 11.4 13 26.6 13 42.8 0 15.6-5.8 29-15 41-7.6 9.8-13.6 16.6-25.6 22.2v-131.4zM649.6 681.2c-15.6 13.8-24.6 20.2-44.2 27.6-4 1.6-9.4 2.8-13.4 3.8v-165.6c10 1.6 15.2 3.6 22.6 6.8 15.6 6.6 30.4 13.8 39.6 26.4s16 31.2 16 49.4c0 21.8-5.6 38.4-20.6 51.6z"],"grid":0,"tags":["logo-bitcoin"]},{"paths":["M141.4 329l338.4 163.4c8.8 4.2 20.6 6.4 32.2 6.4s23.4-2.2 32.2-6.4l338.4-163.4c17.8-8.6 17.8-22.6 0-31.2l-338.4-163.4c-8.8-4.2-20.6-6.4-32.2-6.4s-23.4 2.2-32.2 6.4l-338.4 163.4c-17.8 8.6-17.8 22.6 0 31.2z","M882.6 496.4c0 0-61.8-29.8-70-33.8s-10.4-3.8-19 0.2-249.6 120.4-249.6 120.4c-9 4.2-20.6 6.4-32.2 6.4s-23.4-2.2-32.2-6.4c0 0-234.6-113.2-245.6-118.6-12-5.8-15.4-5.8-26.2-0.6-11.2 5.4-66.8 32.2-66.8 32.2-17.8 8.6-17.8 22.6 0 31.2l338.4 163.4c8.8 4.2 20.6 6.4 32.2 6.4s23.4-2.2 32.2-6.4l338.4-163.4c18.2-8.4 18.2-22.4 0.4-31z","M882.6 695c0 0-61.8-29.8-70-33.8s-10.4-3.8-19 0.2-249.4 120.6-249.4 120.6c-9 4.2-20.6 6.4-32.2 6.4s-23.4-2.2-32.2-6.4c0 0-234.6-113.2-245.6-118.6-12-5.8-15.4-5.8-26.2-0.6-11.2 5.4-66.8 32.2-66.8 32.2-17.8 8.6-17.8 22.6 0 31.2l338.4 163.4c8.8 4.4 20.6 6.4 32.2 6.4s23.4-2.2 32.2-6.4l338.4-163.4c18-8.6 18-22.6 0.2-31.2z"],"grid":0,"tags":["logo-buffer"]},{"paths":["M377.6 511.85c0 73.892 60.486 134.356 134.4 134.356s134.398-60.462 134.398-134.356c0-73.89-60.484-134.358-134.398-134.358s-134.4 60.468-134.4 134.358z","M953.504 435.59c-0.018 0.010-0.032 0.076-0.048 0.084-3.402-19.754-8.080-39.676-13.978-57.676h-0.214c5.966 18 10.704 38 14.144 58h-0.004c-3.438-20-8.176-40-14.14-58h-310.78c38.088 34 62.716 80.35 62.716 134.104 0 33.592-8.968 62.568-24.628 89.448l-204.484 355.354c0 0-0.018 0.528-0.028 0.528l-0.020 0.568c0.010 0 0.018 0 0.030 0l-0.010-0.524c16.406 1.84 33.062 2.524 49.94 2.524 13.684 0 27.218-0.786 40.598-2.004 20.27-1.822 40.154-5.038 59.554-9.466 199.208-45.48 347.848-223.722 347.848-436.648 0-25.998-2.242-51.506-6.496-76.292z","M512 690.992c-67.202 0-123.202-35.82-154.57-89.57l-205.692-355.8c-20.586 27.792-38.030 58.044-51.806 90.246-23.118 54.022-35.932 113.504-35.932 175.982 0 125.39 51.568 238.72 134.632 320.018 58.684 57.438 133.090 98.866 216.176 117.238l0.058-0.102 155.366-269.208c-17.918 6.716-38.062 11.196-58.232 11.196z","M182.584 209.15l154.7 266.5c15.682-80.624 87.346-143.65 174.716-143.65h410.344c-13.842-30-31.188-60.648-51.558-87.876 0.078 0.042 0.156 0.106 0.234 0.148 20.268 27.152 37.536 57.728 51.324 87.728h0.344c-13.768-30-31.028-60.76-51.336-87.98-0.23-0.12-0.458-0.336-0.684-0.514-81.718-108.972-211.95-179.506-358.668-179.506-52.744 0-103.346 9.138-150.344 25.872-69.23 24.654-130.606 65.834-179.374 118.812l0.284 0.486c0.006-0.008 0.012-0.014 0.018-0.020z"],"grid":0,"tags":["logo-chrome"]},{"paths":["M482.478 607.872c-30.644-20.714-61.484-41.138-92.124-61.86-4.060-2.746-6.86-2.944-11.004-0.058l-77.742 52.308c62.324 41.548 186.392 124.372 186.392 124.372v-107.572c-0.024-2.448-3.106-5.56-5.522-7.19z","M390.184 481.332c30.908-20.32 61.702-40.818 92.218-61.72 2.972-2.036 5.55-7.018 5.598-10.668v-103.412c0 0-124.066 82.248-186.524 123.884 27.4 18.318 53.342 35.826 79.574 52.886 2.040 1.324 6.792 0.568 9.134-0.97z","M539.676 418.708c31.622 21.406 63.366 42.628 95.254 63.63 1.832 1.208 5.84 1.204 7.678 0l79.502-52.934-186.11-124.436v106.7c0.020 2.402 1.61 5.642 3.676 7.040z","M516.218 460.738c-2.42-1.604-7.222-1.056-9.486 0.336-9.634 5.924-18.926 12.406-28.328 18.71-16.496 11.060-50.712 34.046-50.712 34.046l77.684 51.73c3.496 2.314 8.872 2.44 12.52 0.222l78.028-51.986c0.002 0-68.158-45.402-79.706-53.058z","M282 474.232v79.218l59.244-39.676z","M512 64c-247.424 0-448 200.576-448 448s200.576 448 448 448 448-200.576 448-448-200.576-448-448-448zM790 594.012c0 11.57-5.304 19.736-15.022 26.188-82.284 54.628-164.502 109.428-246.572 164.376-11.708 7.836-22.348 7.508-33.968-0.274-81.566-54.628-163.438-109.092-245.25-163.352-10.22-6.778-15.188-15.114-15.188-27.46v-159.458c0-12.282 5.042-20.664 15.248-27.432 81.812-54.26 163.878-108.726 245.448-163.352 11.636-7.792 22.188-8.014 33.876-0.19 82.072 54.948 164.252 109.738 246.522 164.39 9.356 6.212 14.906 13.886 14.906 25.32v161.244z","M632.494 546.468c-30.108 20.444-60.376 40.652-90.772 60.664-4.824 3.176-5.776 6.636-5.722 12.378v102.692l186.078-124.008-77.054-51.764c-4.69-3.208-7.86-3.134-12.53 0.038z","M740 553.352v-79.232l-59.18 39.746z"],"grid":0,"tags":["logo-codepen"]},{"paths":["M512.564 678.976v0z","M128 64l69.892 806.438 313.642 89.562 314.518-89.7 69.948-806.3h-768zM709.352 733.796l-197.214 56.25-196.916-56.496-13.494-155.55h96.506l6.866 79.124 107.172 30.326 0.264 0.546h0.068l106.934-29.704 11.224-128.292h-224.762l-8-100h241.292l8.792-102h-368.084l-8-98h481.16l-43.808 503.796z"],"grid":0,"tags":["logo-css3"]},{"paths":["M580.8 290l-126.8-98 127.2 204.4z","M658 192v326h-72.8l-126.4-197.2 3.4 197.2h-80.2v-214l-74.6-58.6c2 2.4 4 4.8 5.8 7.4 20 27.8 30 61 30 101 0 98.4-61.2 164.2-153.8 164.2h-125.4v0.8l399.2 313.2h496.8v-403.8l-302-236.2z","M259.8 356.2c0-58-28.4-90.2-79.4-90.2h-38.4v178h38c52 0 79.8-30.8 79.8-87.8z"],"grid":0,"tags":["logo-designernews"]},{"paths":["M512 128c-212 0-384 172-384 384 0 212.2 172 384 384 384s384-171.8 384-384c0-212-172-384-384-384zM755.8 305c43.2 50.8 70.6 115.2 75.4 185.8-69.2-3.6-152-3.6-218.4 2.6-8.4-21.2-17-42-26.4-62 76.6-33.2 135.6-76.8 169.4-126.4zM512 192c77.6 0 148.8 27.6 204.2 73.6-34.8 44-89.4 82.2-157.4 111.2-37.2-68.8-80-128-125.6-174.6 25.4-6.4 51.6-10.2 78.8-10.2zM367.2 227c46.2 46 89.6 104.6 127.6 173.2-72.2 22-155 34.6-243.4 34.6-16.8 0-33.2-0.6-49.4-1.6 23-90.2 84-165 165.2-206.2zM192.6 496.8c18.2 0.8 36.6 1.2 55.2 1 100.8-1.2 194.6-17 275.2-42.8 7.6 15.8 14.8 32 21.6 48.6-11 2.6-20.8 5.4-28.6 8.6-110.2 46.2-197 120.8-244 211-49.6-56.4-80-130.2-80-211.2 0-5.2 0.2-10.2 0.6-15.2zM512 832c-74 0-142-25.2-196.2-67.4 42.6-84.4 118.6-154.2 214.4-197.6 9-4.2 21-7.6 34.8-10.6 11.4 31.6 21.6 64.4 30.6 98.4 13.8 53 23.6 105.4 29.6 156.2-35.2 13.4-73.2 21-113.2 21zM685 781c-6-51.4-15.8-104.2-29.8-157.8-6.8-26-14.6-51.2-23-75.8 62.8-5.2 138-4.4 197.8 0-10.8 98.2-66 182.6-145 233.6z"],"grid":0,"tags":["logo-dribbble"]},{"paths":["M354 154l-226 147.8 156.2 125.4 227.8-141z","M128 552.6l226 147.8 158-132.2-227.8-141z","M512 568.2l158 132.2 226-147.8-156.2-125.4z","M896 301.8l-226-147.8-158 132.2 227.8 141z","M512.4 596.6l-159.6 132-68.8-44.4v49.8l228 136 228-136v-49.8l-68.4 44.4z"],"grid":0,"tags":["logo-dropbox"]},{"paths":["M468 544v-96h262.188l14.298-96h-276.486v-3.66c0-71.84 29.95-116.172 158.5-116.172 52.528 0 111.734 4.996 186.378 17.484l19.122-129.92c-76.024-17.486-141.388-23.732-211.886-23.732-229.462 0-328.114 82.45-328.114 234.86v21.14h-100v96h100v96h-100v96h100v53.14c0 152.408 98.594 234.86 328.054 234.86 70.5 0 135.696-6.246 211.718-23.732l-19.238-129.92c-74.644 12.488-133.562 17.484-186.090 17.484-128.552 0-158.446-37.478-158.446-126.172v-25.66h233.59l14.296-96h-247.884z"],"grid":0,"tags":["logo-euro"]},{"paths":["M853.6 128h-683.2c-23.4 0-42.4 19-42.4 42.4v683.2c0 23.4 19 42.4 42.4 42.4h341.6v-304h-91.8v-112h91.8v-82.8c0-99.2 68.8-153.2 157.4-153.2 42.4 0 88 3.2 98.6 4.6v103.6h-70.6c-48.2 0-57.4 22.8-57.4 56.4v71.4h114.8l-15 112h-99.8v304h213.6c23.4 0 42.4-19 42.4-42.4v-683.2c0-23.4-19-42.4-42.4-42.4z"],"grid":0,"tags":["logo-facebook"]},{"paths":["M753.528 64c0 0-410.706 0-476.446 0-65.75 0-85.082 49.596-85.082 80.828 0 31.254 0 759.28 0 759.28 0 35.182 18.85 48.234 29.436 52.534 10.598 4.31 39.832 7.942 57.346-12.336 0 0 224.938-261.79 228.8-265.668 5.842-5.86 5.842-5.86 11.688-5.86 11.688 0 98.384 0 145.534 0 61.148 0 70.98-43.738 77.368-69.504 5.318-21.578 64.978-327.924 84.904-425.118 15.21-74.17-3.586-114.156-73.548-114.156zM742.172 603.274c5.318-21.578 64.978-327.924 84.904-425.118zM725.384 193.34l-19.998 103.468c-2.39 11.3-16.574 23.19-29.726 23.19-13.15 0-191.834 0-191.834 0-20.88 0.002-35.826 12.278-35.826 33.206v26.896c0 20.946 15.038 35.788 35.93 35.788 0 0 148.964 0 163.696 0 14.748 0 29.22 16.218 26.032 32.010-3.204 15.816-18.172 93.138-19.968 101.78-1.804 8.656-11.69 23.45-29.222 23.45-14.776 0-128.538 0-128.538 0-23.41 0-30.488 3.066-46.148 22.586-15.674 19.54-156.512 189.184-156.512 189.184-1.426 1.644-2.82 1.168-2.82-0.624v-592.482c0-13.368 11.586-29.046 28.958-29.046 0 0 367.426 0 382.346 0 14.070-0.002 27.222 13.262 23.63 30.594z"],"grid":0,"tags":["logo-foursquare"]},{"paths":["M1005.2 230c-45-87.4-116-102-116-102s31 64 32 102c0.8 32.2-11 56-54.4 67s-61.6-4-95.6-35-83.2-53-145.2-56c-80-4-154 18-154 18-40-50 40-160 40-160-149 59-187.4 166.6-192 227.4-3.8 48.2 17 81.6 17 81.6s-1 55.6-10 84c-6.2 19.6-33.8 50-52 69-24.4 25.4-25 77 0 114s88 55 134 79 63 42 63 42 2 16.6 1 30.6-6.4 28-18 36.4c-11 7.8-31 1-41-4s-10-12.4-21-16-14.6-8-13-22 4-18-7-37-37-19-59-16-34.6 13.6-34.6 13.6l-32.6-20c0 0 17-31.2 10.4-71.2-14.6-87.6-100-125.6-100-125.6l20.8 88.8c0 0 2.2-5.2 12.8-12.8s16.2-7.2 16.2-7.2 13.2 15.2 18.2 50.6c5 36-13.4 54.4-13.4 54.4l-56.6-36 2-29-77.6-20.6 32.4 73.4 30-8 48 45.4c0 0-31.4 23.4-66 23.4-22 0-44-12-44-12s-2.8-2-1.6-11c1.4-10 13.6-25 13.6-25h-92c0 0 54.6 77.4 130 77.4 62 0 88.4-25 88.4-25l37.6 37.4c0 0 6 11 0 14s-14 7-18 30 36 58 36 58c43.6 35.6 14 64 14 64h544c-18-26-45-36-64-64 0 0-89.6-116.8-3.6-180.8 114.8-85.4 85.6-138.8 82.4-202.8 0 0 63.6-13.2 118.6-67.2s77.8-141.6 39.8-215.2zM390 406c-33.8 9-45 71-45 71 3-126 115-186 130-178s-13 78-42 128c0 0-16-28.2-43-21zM464 436c0 0 36-112 75-119s83 42 83 124-52 130.8-85.6 138.4c-33 7.6-46 4-46 4s55-43.2 47-113.6c-5.6-49.4-62.8-48.4-73.4-33.8z"],"grid":0,"tags":["logo-freebsd-devil"]},{"paths":["M512 64c-247.4 0-448 205.8-448 459.4 0 203 128.4 375 306.4 435.8 2.8 0.6 5.2 0.8 7.6 0.8 16.6 0 23-12.2 23-22.8 0-11-0.4-39.8-0.6-78.2-16.8 3.8-31.8 5.4-45.2 5.4-86.2 0-105.8-67-105.8-67-20.4-53-49.8-67.2-49.8-67.2-39-27.4-0.2-28.2 2.8-28.2 0.2 0 0.2 0 0.2 0 45 4 68.6 47.6 68.6 47.6 22.4 39.2 52.4 50.2 79.2 50.2 21 0 40-6.8 51.2-12 4-29.6 15.6-49.8 28.4-61.4-99.4-11.6-204-51-204-227 0-50.2 17.4-91.2 46-123.2-4.6-11.6-20-58.4 4.4-121.6 0 0 3.2-1 10-1 16.2 0 52.8 6.2 113.2 48.2 35.8-10.2 74-15.2 112.2-15.4 38 0.2 76.4 5.2 112.2 15.4 60.4-42 97-48.2 113.2-48.2 6.8 0 10 1 10 1 24.4 63.2 9 110 4.4 121.6 28.6 32.2 46 73.2 46 123.2 0 176.4-104.8 215.2-204.6 226.6 16 14.2 30.4 42.2 30.4 85 0 61.4-0.6 111-0.6 126 0 10.8 6.2 23 22.8 23 2.4 0 5.2-0.2 8-0.8 178.2-60.8 306.4-233 306.4-435.8 0-253.6-200.6-459.4-448-459.4z"],"grid":0,"tags":["logo-github"]},{"paths":["M915.2 448l-4.2-17.8h-387v163.8h231.2c-24 114-135.4 174-226.4 174-66.2 0-136-27.8-182.2-72.6-47.4-46-77.6-113.8-77.6-183.6 0-69 31-138 76.2-183.4 45-45.2 113.2-70.8 181-70.8 77.6 0 133.2 41.2 154 60l116.4-115.8c-34.2-30-128-105.6-274.2-105.6 0 0 0 0 0 0-112.8 0-221 43.2-300 122-78 77.6-118.4 189.8-118.4 293.8s38.2 210.8 113.8 289c80.8 83.4 195.2 127 313 127 107.2 0 208.8-42 281.2-118.2 71.2-75 108-178.8 108-287.6 0-45.8-4.6-73-4.8-74.2z"],"grid":0,"tags":["logo-google"]},{"paths":["M636.4 461.8l-3.2-14h-313.2v128.2h181.4c-18.8 90-96.8 127.2-168.2 127.2-52 0-100.4-15.6-136.6-50.6-37.2-36.2-57.8-86.2-57.8-140.8 0-54.2 19.6-103.6 55.2-139.2 35.4-35.4 84-50.8 137.4-50.8 61 0 99.8 27.6 116.2 42.2l96-95.4c-27-23.4-100.6-82.6-215.4-82.6 0 0 0 0 0 0-88.6 0-173.4 33.6-235.4 95.6-61 61-92.8 148.8-92.8 230.4s30 165.2 89.2 226.6c63.4 65.4 153.2 99.4 245.8 99.4 84.2 0 163.8-33 220.6-92.6 56-58.8 84.8-140.2 84.8-225.4-0.2-36-3.8-57.4-4-58.2z","M1024 448h-114v-114h-82v114h-114v82h114v114h82v-114h114z"],"grid":0,"tags":["logo-googleplus"]},{"paths":["M128 128v768h768v-768h-768zM556 558v144h-80v-144l-132-240h94.2l79.4 167.2 76-167.2h90.4l-128 240z"],"grid":0,"tags":["logo-hackernews"]},{"paths":["M128 64l69.872 806.426 313.666 89.574 314.49-89.708 69.972-806.292h-768zM743.994 328h-368l7.982 102h352.016l-27.010 302.772-197 56.188-197.364-55.952-13.528-155.008h96.508l6.846 78.574 107.538 29.562 106.844-29.83 11.148-128.306h-334.002l-25.142-299.178 481.578 0.032-8.414 99.146z"],"grid":0,"tags":["logo-html5"]},{"paths":["M672 511.666c0 88.366-71.634 160-160 160s-160-71.634-160-160c0-88.366 71.634-160 160-160s160 71.634 160 160z","M355.61 353.774c42.308-42.308 98.558-65.858 158.39-65.858s116.082 23.674 158.39 65.982c26.844 26.844 46.022 59.102 56.464 95.102h168.146v-226c0-53.020-40.98-94-94-94h-576c-53.020 0-98 40.98-98 94v226h170.144c10.444-36 29.622-68.382 56.466-95.226zM833 295.4c0 14.138-11.46 25.6-25.6 25.6h-76.8c-14.138 0-25.6-11.46-25.6-25.6v-76.8c0-14.138 11.46-25.6 25.6-25.6h76.8c14.138 0 25.6 11.46 25.6 25.6v76.8z","M672.39 670.558c-42.308 42.308-98.558 65.358-158.39 65.358s-116.082-22.924-158.39-65.232c-42.23-42.23-65.518-99.684-65.606-157.684h-161.004v286c0 53.020 44.98 98 98 98h576c53.020 0 94-44.98 94-98v-286h-159.004c-0.086 58-23.374 115.328-65.606 157.558z"],"grid":0,"tags":["logo-instagram"]},{"paths":["M416 176.002h-160v424.996c0 105.16-36.064 134.522-98.824 134.522-29.41 0-55.896-5.042-76.5-12.126l-16.676 124.414c29.4 10.124 74.518 16.192 109.814 16.192 144.096 0 242.186-67.742 242.186-261.96v-426.038z","M764.926 160c-154.886 0-252.926 87.996-252.926 204.308 0 100.166 75.502 162.88 185.282 203.33 79.4 28.316 110.784 53.616 110.784 95.078 0 45.512-36.278 74.85-104.896 74.85-63.726 0-121.578-21.28-160.788-42.51v-0.042l-30.382 126.44c37.278 21.276 106.882 42.51 182.334 42.51 181.374-0.004 265.666-97.104 265.666-211.396 0-97.1-53.916-159.8-170.556-204.326-86.278-34.382-122.54-53.59-122.54-97.084 0-34.4 31.376-65.738 96.086-65.738 63.692 0 107.488 21.414 133.010 34.582l38.25-128c-40-17.562-93.874-32.002-169.324-32.002v0z"],"grid":0,"tags":["logo-javascript"]},{"paths":["M834.4 128h-640.8c-35 0-65.6 25.2-65.6 59.8v642.2c0 34.8 30.6 65.8 65.6 65.8h640.6c35.2 0 61.6-31.2 61.6-65.8v-642.2c0.2-34.6-26.4-59.8-61.4-59.8zM366 768h-110v-342h110v342zM314.8 374h-0.8c-35.2 0-58-26.2-58-59 0-33.4 23.4-59 59.4-59s58 25.4 58.8 59c0 32.8-22.8 59-59.4 59zM768 768h-110v-187c0-44.8-16-75.4-55.8-75.4-30.4 0-48.4 20.6-56.4 40.6-3 7.2-3.8 17-3.8 27v194.8h-110v-342h110v47.6c16-22.8 41-55.6 99.2-55.6 72.2 0 126.8 47.6 126.8 150.2v199.8z"],"grid":0,"tags":["logo-linkedin"]},{"paths":["M895.318 192h-766.636c-35.674 0-64.682 28.968-64.682 64.616v510.698c0 35.672 29.008 64.686 64.682 64.686h766.636c35.674 0 64.682-29.014 64.682-64.688v-510.696c0-35.648-29.008-64.616-64.682-64.616zM568.046 704h-112.096v-192l-84.080 107.756-84.044-107.756v192h-112.088v-384h112.088l84.044 135.96 84.080-135.96h112.096v384zM735.36 704l-139.27-192h84v-192h112.086v192h84.054l-140.87 192z"],"grid":0,"tags":["logo-markdown"]},{"paths":["M511.834 960c-11.54 0-23.072-3.124-33.266-9.198l-105.97-64.88c-15.828-9.124-8.046-12.406-2.886-14.282 21.13-7.562 27.426-11.314 49.894-24.57 2.412-1.334 5.494-0.848 7.91 0.644l79.42 47.008c2.952 1.7 7.114 1.7 9.862 0l310.376-184.492c2.95-1.754 4.83-5.292 4.83-8.882v-373.61c0-3.7-1.88-7.184-4.898-9.056l-310.24-189.344c-2.956-1.788-6.842-1.788-9.796 0l-310.038 189.41c-3.088 1.806-5.032 5.396-5.032 8.99v373.61c0 3.626 1.944 7.026 4.962 8.778l79.858 47.944c47.22 24.408 75.18-0.34 75.18-29.222v-367.398c0-5.304 4.094-9.454 9.192-9.454h45.618c5.030 0 9.194 4.144 9.194 9.454v367.396c0 65.126-38.706 102.496-98.398 102.496-18.312 0-32.794 0-73.104-20.558l-83.168-49.562c-20.592-12.304-33.334-35.292-33.334-59.91v-378.93c0-24.632 12.742-47.568 33.33-59.834l317.37-189.728c20.054-11.76 46.748-11.76 66.664 0l317.3 189.728c20.596 12.298 33.336 35.25 33.336 59.834v378.93c0 24.618-12.74 47.5-33.336 59.906l-317.3 189.548c-10.194 6.072-21.664 9.198-33.396 9.198l-0.134 0.036z","M609.886 703.996c-129.22 0-168.012-63.22-168.012-118.542 0-5.258 4.096-9.458 9.124-9.458h41.042c4.564 0 8.454 3.4 9.124 8.032 6.168 43.204 33.496 62.3 108.648 62.3 66.798 0 94.182-20.692 94.182-57.368 0-21.184-6.926-36.848-110.814-47.394-86.854-8.882-140.576-28.746-140.576-100.59 0-66.27 53.992-104.98 144.468-104.98 92.256 0 152.924 28 158.346 101.658 0.204 2.674-0.736 5.258-2.482 7.288-1.742 1.93-4.156 3.054-6.706 3.054h-41.182c-4.292 0-8.048-3.124-8.918-7.426-8.802-33.906-33.94-46.804-99.126-46.804-72.972 0-81.492 25.506-81.492 45.214 0 23.926 10.062 30.882 108.588 44.344 97.522 13.326 143.866 32.234 143.866 103.104 0 71.562-57.616 117.566-158.15 117.566l0.070 0.002z"],"grid":0,"tags":["logo-nodejs"]},{"paths":["M356.708 574.956c-18.246 0-33.856 8.414-46.402 25.666-12.582 16.956-18.796 37.946-18.796 62.862 0 24.948 6.332 46.016 18.796 63.018 12.546 17.080 28.078 25.542 46.402 25.542 16.988 0 31.778-8.54 44.242-25.542 12.542-17.002 18.796-38.070 18.796-63.018 0-24.838-6.332-45.86-18.796-62.862-12.466-17.174-27.134-25.666-44.242-25.666z","M669.336 574.956c-18.090 0-33.782 8.414-46.364 25.666-12.542 16.956-18.718 37.946-18.718 62.862 0 24.948 6.372 46.016 18.718 63.018 12.582 17.080 28.196 25.542 46.364 25.542 17.066 0 31.812-8.54 44.356-25.542 12.586-17.002 18.836-38.070 18.836-63.018 0-24.838-6.328-45.86-18.836-62.862-12.544-17.174-27.094-25.666-44.356-25.666z","M891.554 344h-0.118c0 0 5.586-28.528 0.628-78.36-4.364-49.832-14.942-95.676-32.246-137.64 0 0-8.844 1.52-25.52 5.792s-44.16 12.598-81.876 29.536c-37.082 17.080-75.972 39.576-116.594 67.010-27.606-7.868-68.816-11.878-123.988-11.878-52.578 0-93.828 4.024-123.954 11.89-89.184-61.718-163.664-95.89-224.184-102.35-17.188 41.964-27.766 87.982-32.090 137.94-4.796 49.878 0.864 78.658 0.864 78.658-48.518 52.504-68.476 128.484-68.476 190.988 0 48.488 1.316 92.156 12.25 130.96 11.128 38.62 25.324 70.26 42.196 94.442 17.222 24.242 38.024 45.576 63.152 63.876 24.934 18.628 47.976 31.924 68.778 40.432 20.922 8.744 44.75 15.204 71.964 19.722 26.66 4.772 46.876 7.29 60.954 7.992 0 0 56 2.988 128.708 2.988s128.59-2.988 128.59-2.988c14.040-0.704 34.29-3.268 61.070-7.992 27.094-4.598 51.042-11.214 71.882-19.722 20.804-8.586 43.886-21.802 68.938-40.432 25.046-18.064 45.812-39.478 63.036-63.876 16.872-24.182 30.988-55.822 42.196-94.442 10.972-38.804 12.29-82.77 12.29-131.258-0.004-60.51-20.040-137.288-68.45-191.288zM760.766 811.29c-55.724 26.182-137.794 36.71-246.644 36.71l-4.286-0.078c-108.886 0-190.722-10.496-245.696-36.82-55.016-26.184-82.542-80.114-82.542-161.476 0-48.66 17.144-87.98 50.964-118.214 14.708-13.030 32.876-22.038 55.29-27.434 22.258-5.116 42.708-5.524 61.938-4.93 18.796 0.83 45.102 4.392 78.688 6.928 33.58 2.594 58.592 6.024 83.522 6.024 23.396 0 54.426-3.914 104.208-7.918 49.98-3.942 86.988-5.942 110.934-2 24.578 4.004 45.972 12.404 64.258 29.484 35.468 31.502 53.204 71.010 53.204 118.168-0.002 81.332-28.276 135.34-83.838 161.556z"],"grid":0,"tags":["logo-octocat"]},{"paths":["M512 64c-247.4 0-448 200.6-448 448 0 183.4 110.4 341 268.2 410.4-1.2-31.2-0.2-68.8 7.8-102.8 8.6-36.4 57.6-244.2 57.6-244.2s-14.4-28.6-14.4-70.8c0-66.4 38.4-116 86.4-116 40.8 0 60.4 30.6 60.4 67.2 0 41-26.2 102.2-39.6 159-11.2 47.6 23.8 86.2 70.8 86.2 84.8 0 142-109 142-238.2 0-98.2-66.2-171.6-186.4-171.6-135.8 0-220.6 101.4-220.6 214.6 0 39 11.6 66.6 29.6 87.8 8.2 9.8 9.4 13.8 6.4 25-2.2 8.2-7 28-9.2 36-3 11.4-12.2 15.4-22.4 11.2-62.6-25.6-91.8-94-91.8-171.2 0-127.2 107.4-279.8 320.2-279.8 171 0 283.6 123.8 283.6 256.6 0 175.8-97.8 307-241.8 307-48.4 0-93.8-26.2-109.4-55.8 0 0-26 103.2-31.6 123.2-9.4 34.6-28 69-45 96 40.2 11.8 82.8 18.4 127 18.4 247.4 0 448-200.6 448-448 0.2-247.6-200.4-448.2-447.8-448.2z"],"grid":0,"tags":["logo-pinterest"]},{"paths":["M799.6 406c-1.6-34.2-6.6-69-21.6-100.2-8.2-17.2-19.4-33-33-46.4-12.6-12.8-27.2-23.4-42.6-32.6-34.2-20.4-75-34-168.8-62s-149.6-36.8-149.6-36.8v716.6l159.8 51.4c0 0 0.2-397.6 0.2-599v-7.6c0-18.6 15-33.6 32.2-33.6h1c17 0 31 15 31 33.6v266.6c22 10.6 58.4 18.6 83.6 18.2 16.6 0.4 33.4-3.4 48-11.4 15.2-8.2 27.8-20.8 36.8-35.6 10.2-16.6 16.4-35.6 19.8-54.6 3.8-21.6 4-44.2 3.2-66.6z","M173.4 715.6c54.8-19.6 178.6-59 178.6-59v-94.4c0 0-153 49.6-222.6 74.2-17.2 6.2-34.6 11.8-51.4 19-19.6 8.2-38.8 17.4-56.2 29.6-7.6 5.2-14.4 11.8-18.4 20.2s-4.4 18.4-1 27.2c4 10.2 11.6 18.6 20.2 25.2 15.6 11.8 34.2 19 52.8 24.4 56.8 18.8 116.8 28 176.8 26.6 29-0.4 72-3.8 100-8.8v-84c0 0-22 5-82.6 25-9.2 3-18.4 6.6-28 8.6-14.2 3.2-28.8 4.2-43.2 4.4-13-0.6-26.4-1.4-38.6-6.2-4.4-2-9.2-4.4-11-9.2-1.6-4 0.6-8 3.4-10.8 5.6-5.8 13.6-9 21.2-12z","M1024 691.8c-0.2-12-7.4-22.4-15.8-30-14.2-12.6-31.8-20.6-49.4-27-11-3.8-18.6-6.6-29.4-10-50.4-16.4-103.8-22.4-156.6-22.6-16 0.6-46.2 1-62 2.8-43.8 5-134.6 30.8-134.6 30.8v97.6c0 0 135-43.2 193-63.6 19.4-6.6 40.2-9.2 60.6-9.2 13 0.4 26.4 1.4 38.8 6.2 4.4 1.8 9 4.4 11 9 1.8 5.2-1.8 10-5.8 13-9.4 7.6-21.4 10.6-32.4 14.8-82 29-265.4 89.4-265.4 89.4v94c0 0 234.4-79.2 341.6-117.6 17.8-6.6 35.8-12.2 52.8-20.8 15.8-8 31.6-17.2 43.6-30.6 6.2-7.2 10-16 10-26.2z"],"grid":0,"tags":["logo-playstation"]},{"paths":["M386.92 498.112c7.446-1.34 15.178-2.082 23.172-2.082l-6.244-0.030h207.646c9.006 0 17.612-1.234 25.816-3.508 38.74-10.726 66.69-45.074 66.69-87.326v-174.448c0-49.664-42.3-86.968-92.578-95.212-31.862-5.248-78.516-7.654-110.178-7.498-31.658 0.172-61.962 2.808-88.554 7.498-78.404 13.646-92.69 42.35-92.69 95.212v57.282h192v32h-254.36c-71.256 0-129.076 85.142-129.626 190.484-0.004 0.506-0.014 1.010-0.014 1.516 0 19.046 1.88 37.44 5.37 54.808 15.926 79.332 65.532 137.192 124.27 137.192h30.36v-91.87c0-53.654 40.292-103.466 98.92-114.018zM407.312 254.004c-19.184 0-34.768-15.57-34.768-34.806 0-19.328 15.548-35.040 34.768-35.040 19.148 0 34.798 15.71 34.798 35.040 0.002 19.236-15.618 34.806-34.798 34.806z","M887.902 445.086c-18.342-73.044-65.836-125.086-121.542-125.086h-30.36v81.344c0 67.83-44.572 116.948-98.978 125.362-5.474 0.848-10.966 1.292-16.602 1.292h-207.718c-9.036 0-17.808 1.168-26.098 3.344-38.244 10.036-66.604 41.858-66.604 83.13v174.454c0 49.664 49.954 78.852 98.962 93.102 58.654 17.062 122.534 20.136 192.732 0 46.606-13.32 92.306-40.242 92.306-93.102v-52.926h-192v-32h254.36c50.48 0 94.214-42.73 115.628-105.098 8.96-26.094 14.012-55.62 14.012-86.902 0-23.536-2.866-46.076-8.098-66.914zM615.734 765.64c19.18 0 34.762 15.57 34.762 34.8 0 19.3-15.582 35.042-34.762 35.042-19.154 0-34.798-15.742-34.798-35.042-0-19.26 15.612-34.8 34.798-34.8z"],"grid":0,"tags":["logo-python"]},{"paths":["M708.2 576.8c0 35.125-28.475 63.6-63.6 63.6s-63.6-28.475-63.6-63.6c0-35.125 28.475-63.6 63.6-63.6s63.6 28.475 63.6 63.6z","M444.2 576.8c0 35.125-28.475 63.6-63.6 63.6s-63.6-28.475-63.6-63.6c0-35.125 28.475-63.6 63.6-63.6s63.6 28.475 63.6 63.6z","M961 502c0-55.4-44.4-100.4-99-100.4-26 0-49.4 10-67.2 26.6-66.4-46.8-156.8-77-257.4-81.4l46.6-155.4 139.2 27.8c0.4 49.4 40.2 89.4 89 89.4 49.2 0 89-40.4 89-90.2s-39.8-90.4-89-90.4c-37.2 0-69 23.2-82.4 56l-170.4-34-58.8 196.4-14.2 0.4c-100.6 4.4-191 34.8-257.4 81.4-17.6-16.6-41.2-26.6-67.2-26.6-54.6 0-99 45-99 100.4 0 39.2 22 73 54.2 89.6-1.6 9.8-2.4 19.6-2.4 29.6 0.4 151.6 178.2 274.8 397.4 274.8s397-123.2 397-275c0-10-0.8-19.8-2.2-29.6 32.2-16.6 54.2-50.4 54.2-89.4zM812.2 163.8c29.6 0 53.6 24.4 53.6 54.4s-24 54.4-53.6 54.4c-29.6 0-53.6-24.4-53.6-54.4s24-54.4 53.6-54.4zM98.4 502c0-35.6 28.6-64.4 63.6-64.4 14.4 0 27.8 5 38.4 13.2-34.6 30.4-60.2 66-74 104.8-16.8-11.8-28-31.4-28-53.6zM772.8 785.8c-69.2 47.8-161.8 74.2-260.8 74.2s-191.6-26.4-260.8-74.2c-65-45-100.8-103.6-100.8-164.8 0-6.4 0.4-13 1.2-19.4 1.4-12 4.4-23.8 8.6-35.4 11.2-31.2 32-60.6 61.4-86.8 8.8-7.8 18.4-15.4 28.8-22.6 0.2-0.2 0.6-0.4 0.8-0.6 69.2-47.8 161.8-74.2 260.8-74.2s191.6 26.4 260.8 74.2c0.2 0.2 0.6 0.4 0.8 0.6 10.4 7.2 20 14.8 28.8 22.6 29.4 26.2 50.2 55.6 61.4 86.8 4.2 11.6 7 23.4 8.6 35.4 0.8 6.4 1.2 12.8 1.2 19.4 0 61.2-35.8 119.8-100.8 164.8zM897.6 555.4c-13.8-38.8-39.4-74.4-74-104.8 10.6-8.2 24-13.2 38.4-13.2 35 0 63.6 29 63.6 64.4 0 22.4-11.2 42-28 53.6z","M641 715.8c-0.4 0.4-48.4 48.4-129 48.8-81.8-0.4-128.8-48.4-129.2-48.8l-25.2 24.8c2.4 2.4 59.2 59 154.4 59.4 95.2-0.4 151.8-57 154.2-59.4l-25.2-24.8z"],"grid":0,"tags":["logo-reddit"]},{"paths":["M239.8 672.2c-61.6 0-111.8 50.2-111.8 111.6 0 61.6 50.2 111.2 111.8 111.2 61.8 0 111.8-49.8 111.8-111.2s-50-111.6-111.8-111.6z","M128 384v159.8c96 0 188.2 28.4 256 96.2s96 159.8 96 256h160c0-279.8-232-512-512-512z","M128 128v159.8c342 0 607.8 266 607.8 608.2h160.2c0-423.4-344-768-768-768z"],"grid":0,"tags":["logo-rss"]},{"paths":["M1023.568 658.216c-3.34-27.198-18.472-48.292-41.59-64.832 5.714 4.080 10.55 7.532-0.11-0.082-14.378-10.262-6.76-4.822-0.094-0.064-57-40.602-131.352-31.578-193.466-9.022-24.894-40.59-25.974-71.566-11.632-115.874 1.858-5.6 0.59-8.708-5.248-11.208-14.172-6.060-34.582-2.854-48.844 0.926-4.924 1.292-8.508 3.8-9.6 8.762-10.308 48.486-42.018 92.896-69.656 133.772-19.462-37.304-17.92-66.174-4.828-105.032 1.596-4.732 0.862-7.248-3.874-9.758-14.52-7.514-36.802-3.824-51.6 0.552-17.018 4.964-42.58 89.188-50.744 105.892-17.062 34.884-32.182 89.33-61.17 117.004-24.6-31.614 45.052-103.034 21.764-131.702-7.876-9.696-22.126-9.446-31.172-1.232 2.17-15.216 3.296-25.218-0.64-38.126-4.162-13.58-14.722-21.374-30.18-20.98-35.99 1.054-67.686 27.63-89.282 52.794-20.554 24.21-74.762 39.254-103.906 53.854-50.064-43.614-158.442-89.894-161.264-164.162-3.056-83.692 96.638-140.49 163.194-174.456 86.56-44.208 219.922-99.216 318.276-50.872 26.098 12.828 36.598 40.342 29.414 66.696-18.736 68.732-94.396 114.586-160.206 135.614-32.378 10.35-67.938 18.054-102.2 16.052-45.91-2.686-81.66-30.448-86.562-32.172-4.098-0.778-3.776 4.522-2.694 7.328 47.632 124.866 288.834 33.362 351.912-30.742 30.378-30.842 48.826-60.73 56.702-107.788 9.232-55.166-31.268-89.684-62.008-103.914-155.836-72.144-371.272 22.336-489.106 118.654-51.136 41.802-115.104 108.22-85.748 177.892 31.86 75.61 129.472 114.38 193.006 160.624-51.408 25.546-115.724 51.966-149.036 99.866-19.048 27.458-25.806 56.718-11.622 87.932 25.144 55.136 116.57 31.244 155.146 6.942 35.34-22.26 59.126-52.14 69.4-90.456 8.91-33.218 7.082-67.732-7.712-99.024l57.17-28.916c-15.394 46.152-22.194 104.006 9.762 145.71 12.804 16.676 46.034 17.35 59.634 0.622 17.632-21.886 29.328-49.31 41.006-74.412-1.364 18.746-3.712 39.992 2.754 56.33 7.42 18.746 24.252 22.582 41.584 10.686 53.040-36.406 86.796-137.304 112.926-196.124 7.104 25.658 14.946 49.096 27.914 72.752 3.204 5.806 2.814 9.548-1.592 14.39-19.37 21.35-65.652 56.958-70.138 85.798-1.048 6.742 3.426 13.198 11.372 14.74 31.146 6.216 65.676-5.062 90.964-22.156 26.376-17.844 34.892-42.174 28.49-71.030-9.152-41.542 21.986-87.96 51.602-122.060 5.438 25.816 13.632 50.662 28.286 73.212-26.15 22.966-65.16 55.528-59.558 93.878 1.976 13.73 14.27 22.602 29.028 19.472 31.566-6.648 58.832-20.226 78.74-44.292 18.046-21.71 11.584-45.402 3.712-69.27 47.744-13.63 96.044-16.354 143.662-0.054 22.99 7.82 41.51 21 52.496 41.636 13.452 25.288 5.878 48.584-20.1 65.208-6.574 4.208-11.124 7.666-8.9 9.486 2.224 1.822 9.8 4.226 26.568-6.304 16.768-10.534 27.020-24.766 29.646-43.45 0.526-5.166 0.51-10.334-0.048-15.51zM225.892 708.734c-2.716 33.346-19.272 60.386-46.35 82.228-15.234 12.316-34.204 22.352-53.040 24.184-18.836 1.834-33.502-2.922-34.756-22.46-3.528-54.986 81.846-108.848 129.25-125.066 4.040 13.72 6.022 27.332 4.864 41.174l0.032-0.060zM432.096 563.828c-7.806 44.618-29.66 124.694-64.628 156.672-4.712 4.286-9.22 4.036-11.618-1.542-20.69-48.118 7.342-147.338 66.164-162.656 6.914-1.778 11.204 1.164 10.082 7.526zM572.718 727.364c16.844-17.924 33.668-35.832 50.538-53.854 2.086 20.042-35.142 59.928-50.538 53.854zM734.146 691.972c-4.696 2.546-15.242 5.030-15.654 1.67-2.964-24.17 23.632-49.748 40.134-61.734 8.906 22.686-1.636 47.668-24.48 60.064z"],"grid":0,"tags":["logo-sass"]},{"paths":["M873.8 593.6c5.6-25 8.4-50.8 8.4-77.4 0-199.4-164-361.2-366.4-361.2-21.4 0-42.2 1.8-62.6 5.2-32.6-20.4-71.2-32.2-112.8-32.2-117.2 0-212.4 93.8-212.4 209.4 0 38.8 10.6 75 29.2 106-4.8 23.4-7.4 47.8-7.4 72.6 0 199.6 164 361.2 366.2 361.2 23 0 45.4-2 67-6 30 15.8 64.2 24.8 100.4 24.8 117.4 0 212.4-93.8 212.4-209.4 0.2-33.4-7.8-65-22-93zM703.8 688.6c-17 23.6-42 42.4-74.4 55.6-32.2 13.2-70.6 19.8-114.6 19.8-52.6 0-96.6-9.2-131.2-27.2-24.6-13.2-44.8-30.8-60.4-52.8s-23.4-44-23.4-65.2c0-13.2 5.2-24.6 15.2-34.2 10-9.2 23-14 38.2-14 12.6 0 23.4 3.6 32.2 11 8.4 7 15.6 17.4 21.4 31 6.6 14.6 13.6 27 21.2 36.8 7.2 9.4 17.4 17.2 30.6 23.4 13.4 6.2 31.2 9.4 53.2 9.4 30.2 0 55-6.4 73.6-19 18.4-12.2 27.2-27 27.2-45 0-14.2-4.6-25.4-14.2-34.2-10-9.2-23-16.4-39.2-21.2-16.6-5.2-39.2-10.6-67.2-16.4-38-8-70.2-17.6-96-28.4-26.2-11-47.4-26.4-63-45.4-15.8-19.4-23.6-43.8-23.6-72.4 0-27.4 8.4-51.8 24.8-73 16.4-21 40.2-37.4 71.2-48.6 30.4-11.2 66.6-16.8 107.4-16.8 32.8 0 61.4 3.8 85.4 11 24.2 7.4 44.4 17.4 60.6 29.8 16 12.4 28 25.6 35.6 39.4 7.6 14 11.4 27.8 11.4 41.2 0 12.8-5 24.6-15 34.8s-22.6 15.6-37.6 15.6c-13.6 0-24.2-3.2-31.6-9.6-6.8-6-14-15.2-21.8-28.6-9.2-17-20.2-30.6-32.8-40.2-12.4-9.2-32.8-14-61.2-14-26.2 0-47.6 5.2-63.4 15.4-15.2 9.8-22.6 21.2-22.6 34.6 0 8.2 2.4 15 7.4 21 5.2 6.2 12.4 11.8 21.8 16.4 9.6 4.8 19.6 8.6 29.4 11.2 10.2 2.8 27.2 7 50.6 12.2 29.8 6.2 57 13.4 81 20.8 24.4 7.8 45.4 17.2 62.6 28.2 17.6 11.2 31.4 25.8 41.4 43 9.8 17.2 14.8 38.8 14.8 63.6 0.8 30.2-7.8 57.4-25 81z"],"grid":0,"tags":["logo-skype"]},{"paths":["M991.996 720.778l-0.378-29.002-28.796-2.556c-30.826-2.792-87.6-14.438-108.602-33.8-32.562-30.022-71.376-72.398-71.376-103.786 0-2.028 0-5.092 8.3-10.372 9.97-6.348 25.178-11.168 38.594-15.42 10.434-3.308 20.288-6.434 28.788-10.472 18.472-8.78 36.996-31.956 34.942-57.614-2.43-30.332-28.848-54.092-60.144-54.092-8.042 0-16.136 1.52-24.054 4.518-16.054 6.082-27.486 8.82-35.41 9.924 1.494-18.638 3.582-40.24 6.422-61.34 10.222-75.896-10.562-147.018-58.528-202.084-50.758-58.266-127.002-90.682-209.188-90.682h-0.566c-82.186 0-158.43 32.416-209.182 90.682-47.964 55.068-68.75 126.69-58.53 202.584 2.832 21.020 4.92 42.462 6.42 61.236-7.94-1.118-19.372-3.996-35.406-10.068-7.93-3.004-16.034-4.59-24.086-4.59-31.282-0.002-57.688 23.704-60.114 54.006-2.054 25.636 16.47 48.786 34.94 57.566 8.502 4.040 18.362 7.156 28.8 10.464 13.414 4.25 28.618 9.064 38.586 15.406 8.294 5.278 8.294 8.336 8.294 10.364 0 17.32-12.382 49.382-71.376 103.776-20.998 19.362-78.11 31.002-109.176 33.794l-29.144 2.622-0.026 29.364c0 3.358 0.624 21.092 12.97 40.638 10.492 16.612 32.146 38.566 75.726 48.814 12.358 2.906 22.372 5.126 30.416 6.908 4.612 1.024 9.11 2.020 12.908 2.906 0.054 0.418 0.108 0.834 0.162 1.246 1.8 14.008 3.222 25.070 8.784 35.5 4.906 9.2 17.148 24.632 44.030 24.632 4.956 0 10.498-0.492 16.944-1.502 3.344-0.526 6.772-1.108 10.4-1.726 14.232-2.424 30.364-5.174 46.902-5.174 20.554 0 37.464 4.376 51.692 13.376 9.062 5.734 17.784 11.944 27.018 18.52 35.982 25.618 76.764 54.656 142.048 54.656 65.452 0 106.586-29.164 142.878-54.892 9.152-6.488 17.796-12.618 26.754-18.284 14.226-9 31.136-13.376 51.692-13.376 16.54 0 32.668 2.75 46.898 5.172 3.628 0.622 7.058 1.204 10.404 1.728 6.446 1.010 11.986 1.502 16.944 1.502 26.88 0 39.124-15.43 44.030-24.626 5.562-10.428 6.984-21.492 8.784-35.498 0.054-0.416 0.11-0.836 0.164-1.258 3.796-0.882 8.296-1.882 12.91-2.904 8.046-1.784 18.058-4.002 30.412-6.908 43.702-10.278 65.222-32.34 75.58-49.036 12.194-19.656 12.592-37.472 12.546-40.842zM416 256c17.672 0 32 21.49 32 48s-14.328 48-32 48-32-21.49-32-48 14.328-48 32-48zM623.23 411.396c-30.494 30.054-69.996 46.604-111.23 46.604-41.676 0-81.208-16.58-111.314-46.686-6.25-6.248-6.248-16.378 0-22.626 6.25-6.248 16.38-6.248 22.626 0 24.064 24.060 55.56 37.312 88.688 37.312 32.774 0 64.3-13.28 88.77-37.396 6.296-6.204 16.426-6.126 22.624 0.164 6.204 6.294 6.13 16.426-0.164 22.628zM608 352c-17.672 0-32-21.492-32-48s14.328-48 32-48 32 21.492 32 48-14.328 48-32 48z"],"grid":0,"tags":["logo-snapchat"]},{"paths":["M960 416.4c0 41-33.2 74.4-74.4 74.4-41 0-74.4-33.2-74.4-74.4 0-41 33.2-74.4 74.4-74.4 41 0 74.4 33.4 74.4 74.4zM885.2 278c-76.2 0-138 61.4-138.8 137.4l-86.4 124c-3.6-0.4-7.2-0.6-10.8-0.6-19.4 0-37.4 5.4-52.8 14.6l-391.6-157.4c-10.2-46.4-51.8-81.4-101.2-81.4-57-0.2-103.6 46.6-103.6 103.6s46.6 103.6 103.6 103.6c19.4 0 37.4-5.4 52.8-14.6l391.6 157.2c10.2 46.6 51.6 81.6 101.2 81.6 53.6 0 98-41.2 103-93.4l133-97.2c76.6 0 138.8-62 138.8-138.6s-62.2-138.8-138.8-138.8zM885.2 323.8c51.4 0 93 41.8 93 93 0 51.4-41.8 92.8-93 92.8-51.4 0-93-41.6-93-92.8 0-51.4 41.6-93 93-93zM103.6 341.8c29.2 0 54.6 16.4 67.4 40.4l-37.8-15.2v0.2c-30.6-11-64.4 4-76.6 34.2-12.2 30.4 1.8 64.6 31.4 77.8v0.2l32.2 12.8c-5.2 1.2-10.8 1.8-16.4 1.8-42.2 0-76.2-34-76.2-76.2-0.2-41.8 33.8-76 76-76zM649.2 566.2c42.2 0 76.2 34 76.2 76.2s-34 76.2-76.2 76.2c-29.4 0-54.8-16.4-67.4-40.6 12.6 5 25 10 37.6 15.2 31 12.4 66.4-2.6 78.8-33.6s-2.6-66.2-33.8-78.8l-31.8-12.8c5.6-1 11-1.8 16.6-1.8z"],"grid":0,"tags":["logo-steam"]},{"paths":["M642.4 792.6c-23.6 0-44.8-5.6-63-16.6-13.8-8.2-23-19.2-28-32.8-5.2-13.8-7.2-44.6-7.2-92.8v-202.4h192v-128h-192v-224h-123.8c-5.4 43-15 89.4-29 117.2s-28 51.6-51.2 71.4c-23.2 19.8-51.2 35.8-83.8 46.6v116.8h96v280.8c0 38 4 67 11.8 87 8 20 22.2 39 42.8 56.8s45.6 31.4 74.6 41c29.2 9.6 62.8 14.4 100.8 14.4 33.4 0 60.6-3.4 89.4-10.2s61-18.6 96.4-35.2v-131.2c-41.8 27.4-83.6 41.2-125.8 41.2z"],"grid":0,"tags":["logo-tumblr"]},{"paths":["M852.6 792c-13.4-8-26.4-22-24-37.6 4.6-30.6 5-43-0.4-51.6-3.8-6.4-11-10-17.2-11.6 4-5 6.2-10.8 7.6-21.8 2.6-20-9.4-82-25.4-131.4s-59.8-100-89.4-136c-52-63.6-45.6-78.4-52.6-199.4-4.4-77-38.6-138.6-139.2-138.6s-134 64-134 118c0 57.4 4 102 4 102 2.6 66.8 2 78.8-16 110.6-9.8 17.4-54 60-71.4 89.4s-15.2 59-49.2 105.6c-24.8 34-27.6 56.8-19.4 88-14 16.4-7.2 39.8-10 49.8-5.2 17.4-27.4 20.6-44.6 22s-30.6 0-37.4 10.6 1.4 32 8.6 60-14.6 30-14.6 62 60 32 119.4 45.4 81.4 32.6 112 32.6 53.6-20.4 76-38.6c14.4-11.8 58-7.4 84.6-7.4s68.6-1.2 91.4 4.8 22.6 41.2 78.6 41.2 69.4-41.4 122-68.6 84-40 84-59.4-30-32-43.4-40zM399.6 903c-2.6 26-25.2 34.2-48.2 32.2-26-2.2-58-15.2-88.2-24.2s-71-15-98-19.8c-30.6-5.4 0-27.2-0.4-68.4-0.2-16-14.2-38.8-8.4-49.4s34.6-4.8 44.6-7.6 25.4-11.4 30.6-23.8c2.8-6.8 3.6-35.4 5.8-45.6 2.2-9.8 15.8-14.4 44.4 0.2s57.8 76.2 84.6 119.6 35.8 60.8 33.2 86.8zM636.6 771.4c4 20.6 6.4 49 1.4 72.6s-14 31-21.4 46c-4.4-13.6 10.6-27.6 8.8-61.6-1-19-1.6-15.6-23 3.6-24.4 21.6-55.2 40.2-106 45-42 4-65-16.6-65-16.6 10 32-8.6 49.4-8.6 49.4 0.6-7.4 1.6-28.6-5-43.2-8-18-18.6-37.4-18.6-37.4s17.2-5.4 23.2-20 4-34.6-17.4-55.4-105-75.2-111.8-84.2c-9.8-13-13.4-20.4-14-46.4s10.8-49.6 8.6-40.6c-1.6 6.4 0.2 13.6 0.2 39.6s15.2 46.6 27.8 50c19 5.2 4-52.2 16-106.2s23.4-65.6 38.4-87.6 38.4-41 34-86.2-0.2-40.2 10.2-23.6c8 13 26.6 48 49.4 44 38.8-6.6 87.8-49.2 95.2-56.4s1.4-14.2-4.6-11.6c-31 13.4-88.6 43-103 36.4s-36.2-41.2-33.6-39c30.8 27.2 39.8 22.2 52.8 18 16.8-5.6 25.6-8.6 57-22.6s41.4-10.6 44.6-17.4-0.8-13.4-9.4-11.4c-12.8 3-6.8 10.2-45.4 24.6-50.6 19-66.6 20.6-88 6-17.2-11.8-30-25.4-30-33.4s16.6-16.6 24.6-22.6 24.6-21.8 24.6-21.8 2-14.4-1.2-25.4c-3.8-13-15.6-18.6-23.8-16.2-8.2 2.2-16 11-13.6 29.6 2 16.6 14 22 14 22s-5.4 7-10.4 9.4c0 0-1.6-0.6-7-12.6s-13.2-39-0.6-62.2 39.2-10.4 47.6 7.6c7.8 16.6 4.8 45.4 4.8 45.4 12-4.4 26-4 42 7-14.2-59.6 19-82.2 44-82.2s44.6 19.2 44.6 50c0 24-7 36.4-13.8 44-8.2-1-16.4-3-12.6-6.8 2.6-2.8 8.8-11.4 8.8-26.4s-11.8-27.4-27.4-27.4c-18.4 0-25.2 16.6-27.4 26s-0.8 17.2-0.4 20.8c1.2 10 21.8 19.2 47.8 25.8s22.6 18 16.6 50.6 12.6 36.6 28.6 67.6 11.4 43.6 31.8 70.4 38 95.6 32.8 153.6c-1.8 21-7.8 20.4 14.6 13.4 11.2-3.4 24-5.4 24-5.4 6.2-12.6 6.8-32.6 7-44.6 0.4-27 1.4-83-53.4-143 0 0 59 43.4 68 124 5 44.6-4 64.8-4 64.8 10.6 2.6 19.6 14.6 25.2 23.6 7.4 12.2-7.8-11.6-40-11.6-17 0-30.6 7.8-37 15.8s-6.2 15.2-6.4 23.4c-14.2-2.4-24.8 0-33.6 9.8-11.2 14-5.6 48.4-1.6 69.2zM816.8 865.8c-48.2 20.8-65.4 47-95.4 63s-55.4 4.6-67.4-16 20.8-56.4 9.4-119.2c-8.8-48.4-12.6-62-9.8-73.6 2.8-11 18.8-8.8 23-7.8 2.6 10.8 13.4 39 54 39 0 0 46.4 5.2 65.4-42.4 0 0 11.4-0.4 14.4 7 4.6 11.6-5.8 33-5.6 42.6 0.6 31.4 23.4 42.2 56.8 64 16.4 11.2 4.2 22.2-44.8 43.4z"],"grid":0,"tags":["logo-tux"]},{"paths":["M160 64l-64 160v608h192v128h128l128-128h160l224-224v-544h-768zM832 576l-128 128h-192.002l-127.998 128v-128h-160v-544h608v416z","M640 286h96v258h-96v-258z","M416 286h96v258h-96v-258z"],"grid":0,"tags":["logo-twitch"]},{"paths":["M984 219c-34.8 15.4-72 25.8-111.2 30.6 40-24 70.8-62 85.2-107.2-37.4 22.2-78.8 38.4-123 47-35.4-37.8-85.8-61.4-141.4-61.4-107 0-193.6 86.8-193.6 193.8 0 15.2 1.6 30 5 44.2-161-8-303.8-85.2-399.2-202.6-16.6 28.6-26.2 62-26.2 97.4 0 67.2 34.4 126.6 86.4 161.4-32-0.8-62-9.6-88-24.2 0 0.8 0 1.6 0 2.4 0 94 66.8 172.2 155.4 190-16.2 4.4-33.4 6.8-51 6.8-12.4 0-24.6-1.2-36.4-3.6 24.6 77 96.2 133 181 134.6-66.2 52-149.8 83-240.6 83-15.6 0-31-1-46.2-2.8 85.4 55.6 187.2 87.6 296.4 87.6 356.6 0 551.4-295.4 551.4-551.6 0-8.4-0.2-16.8-0.6-25 37.8-27.4 70.6-61.4 96.6-100.4z"],"grid":0,"tags":["logo-twitter"]},{"paths":["M822.774 606.512c-6.238-19.154-15.782-37.122-28.602-53.904-12.844-16.764-28.792-31.652-47.86-44.662-19.078-12.996-41.442-23.26-67.106-30.8-10.286-2.726-28.378-7.012-52.208-12.836-17.032-4.148-33-8.4-51-12.734v-211.446c18 4.792 30.504 12.404 43.852 20.86 28.558 18.080 46.464 49.010 51.71 91.010h138.348c-1.308-36-9.3-65.52-23.992-92.040-16.14-29.086-37.954-54.048-65.46-73.912-27.5-19.844-60.45-34.98-96.754-44.91-15.768-4.306-29.702-7.928-47.702-10.366v-66.772h-128v66.334c-14 2.088-30.296 4.89-44.852 8.5-34.484 8.566-64.776 21.736-91.902 39.528-27.142 17.81-48.704 40.224-65.208 67.254-16.502 27.046-24.624 59.040-24.624 96 0 19.17 2.814 37.986 8.314 56.47 5.504 18.482 14.884 35.934 28.084 52.362 13.206 16.428 30.99 31.316 53.374 44.664 22.366 13.344 49.41 24.128 83.152 32.342 18.574 4.69 37.66 9.068 53.66 13.152v239.172c-22-5.838-43.778-14.798-61.356-26.958-18.34-12.654-32.132-27.906-42.396-47.768-9.558-18.458-14.146-41.052-14.814-65.052h-137.432c1.39 42 10.5 78.988 27.344 110.742 17.598 33.208 41.066 59.92 70.408 81.124 29.324 21.226 62.786 36.712 102.396 46.982 17.77 4.608 37.852 7.92 55.852 10.46v70.692h128v-69.080c20-2.138 37.914-5.38 57.054-9.758 37.402-8.546 71.29-22.072 100.632-40.552 29.324-18.48 53.242-42.256 71.222-71.362 17.96-29.082 27.090-64.17 27.090-105.238 0.002-19.156-3.002-38.328-9.224-57.498zM448 419.398c-24-7.486-47.824-18.176-64.102-32.096-17.242-14.71-25.346-35.068-25.346-61.090 0-18.482 4.828-33.88 14.008-46.204 9.16-12.322 19.824-22.076 33.76-29.262 12.36-6.378 27.68-11.13 41.68-14.276v182.928zM685.804 718.942c-5.878 13.346-15.398 25.152-28.606 35.422-13.204 10.266-31.488 18.656-52.754 25.154-9 2.756-16.446 4.888-28.446 6.472v-214.22c20 5.248 36.36 10.664 52.652 16.262 16.124 5.488 31.496 14.886 45.074 28.232 13.57 13.352 20.618 34.060 20.618 62.12 0.002 13.7-2.674 27.21-8.538 40.558z"],"grid":0,"tags":["logo-usd"]},{"paths":["M953.8 228c-10-46.8-35-77.6-81.2-92.6s-129.8-9-188.2 33.6c-59.8 43.6-95.2 119.4-107.6 167.6 29.4-12.6 48-15.4 78-13.8s49 24 49.8 50.6c0.6 19.6-0.4 37.4-7.2 55.4-21.6 57.4-55.4 113-95.2 161.6-5.8 7.2-12.8 13.8-20 19.8-20.4 16.6-37.6 12.2-50.8-10.4-10.8-18.6-18-37.8-24.4-58.2-24.8-79.4-33.6-161.8-47.6-243.2-6.6-39-14-79.6-36-113.8-23.2-35.6-57.2-49.2-100-44-29.4 3.6-73.8 35-95.6 52.8 0 0-112 93.8-163.6 142.8l42.4 54c0 0 35.8-25 55-36.6 11.4-6.8 24.8-8.2 34.4 0.4 9 7.8 19.2 18 24.6 28.2 11.4 21.4 22.4 43.8 29.4 66.8 26.4 88.6 51 177.4 75.6 266.6 12.6 45.6 27.8 88.4 56 127.2 38.6 53.2 79.2 65.4 141.8 43 50.8-18.2 93.2-52.4 132-87.8 66.2-60.4 118.2-130.8 171-202.4 40.8-55.4 74.6-111.4 102.8-174 27.8-62 38.8-127 24.6-193.6z"],"grid":0,"tags":["logo-vimeo"]},{"paths":["M520.124 64c-242.914 0-439.856 195.402-439.856 436.464 0 82.46 23.064 159.58 63.118 225.374l-79.386 234.162 243.528-77.364c63.016 34.57 135.49 54.292 212.596 54.292 242.946 0 439.876-195.43 439.876-436.464 0-241.062-196.93-436.464-439.876-436.464zM738.848 666.22c-10.348 25.654-57.148 49.066-77.798 50.144-20.628 1.094-21.216 15.988-133.68-32.868-112.45-48.868-180.104-167.688-185.438-175.34-5.338-7.624-43.56-62.094-41.498-116.91 2.076-54.826 32.094-80.692 42.808-91.45 10.702-10.774 22.972-12.704 30.464-12.826 8.856-0.144 14.592-0.264 21.146-0.022 6.548 0.248 16.384-1.37 24.9 21.278 8.512 22.646 28.886 78.306 31.492 83.978 2.604 5.678 4.216 12.252 0.204 19.542-4.024 7.306-6.084 11.87-11.922 18.166-5.87 6.296-12.348 14.084-17.584 18.898-5.84 5.33-11.94 11.144-5.8 22.538 6.136 11.386 27.306 48.712 59.558 79.472 41.45 39.542 77.196 52.658 88.196 58.634 11.030 6.008 17.612 5.34 24.452-1.858 6.808-7.198 29.278-31.492 37.192-42.338 7.91-10.876 15.322-8.746 25.484-4.658 10.156 4.104 64.314 33.112 75.346 39.102 11.020 5.978 18.386 9.058 21.020 13.8 2.634 4.76 1.802 27.062-8.542 52.718z"],"grid":0,"tags":["logo-whatsapp"]},{"paths":["M960 530h-496v358l496 72v-430z","M432 530h-368v300l368 53.4v-353.4z","M960 64l-496 70.8v363.2h496v-434z","M432 139.4l-368 52.6v306h368v-358.6z"],"grid":0,"tags":["logo-windows"]},{"paths":["M518 542.6l-65.6 191.4h-0.2l-50.8 146.2c3.6 1 7 1.8 10.6 2.8 0.2 0 0.4 0 0.6 0 31.6 8.4 64.8 13 99 13 17 0 33.6-1 49.8-3.6 22.4-2.8 44-7.6 65-14.2 0 0 0 0 0 0 5.2-1.6 10.4-3.4 15.6-5.2-5.6-12-17.6-38.6-18.2-39.8l-105.8-290.6z","M161.6 361c-20 45.2-33.6 100.8-33.6 151 0 12.6 0.6 25.2 1.8 37.6 13.8 142.4 105.8 262 232.2 315.8 5.2 2.2 10.6 4.4 16 6.4l-186-510.6c-16-0.6-19 0.4-30.4-0.2z","M860.4 350.8c-8.6-18.6-18.8-36.4-30.2-53.2-3.2-4.8-6.8-9.6-10.2-14.4-43-57.6-101.6-102.8-169.8-129.2-42.8-16.8-89.6-26-138.4-26-120.6 0-228.4 56-298.8 143.4-13 16-24.6 33.2-35 51.2 28.4 0.2 63.6 0.2 67.6 0.2 36.2 0 92-4.4 92-4.4 18.8-1.2 20.8 26.2 2.2 28.4 0 0-18.8 2.2-39.6 3.2l125.8 374 75.6-226.6-53.6-147.2c-18.8-1-36.2-3.2-36.2-3.2-18.8-1-16.4-29.6 2-28.4 0 0 57 4.4 91 4.4 36.2 0 92-4.4 92-4.4 18.6-1.2 21 26.2 2.2 28.4 0 0-18.6 2.2-39.4 3.2l124.6 371.2 34.6-115.2c17.4-44.8 26.2-81.8 26.2-111.4 0-42.6-15.4-72.2-28.6-95.2-17.4-28.6-33.8-52.6-33.8-80.8 0-31.8 24-61.4 58-61.4 1.4 0 3 0 4.4 0 52.4-1.4 69.6 50.6 71.8 86 0 0 0 0.8 0 1.2 0.8 14.4 0.2 25 0.2 37.6 0 34.8-6.6 74.2-26.2 123.6l-78 225.6-44.6 131.4c3.6-1.6 7-3.2 10.6-5 113.4-54.8 196-164 213.4-293.4 2.6-17 3.8-34.4 3.8-52 0-57.8-12.8-112.6-35.6-161.6z"],"grid":0,"tags":["logo-wordpress"]},{"paths":["M253.6 496.6c79.4-117.2 155.8-185.6 155.8-185.6s-84.2-97.8-185.6-134.8l-6.6-1.6c-93.8 82.2-153.2 202.8-153.2 337.4 0 101.4 33.8 195 90.4 270 0-8.8 1.2-140.6 99.2-285.4z","M960 512c0-134.6-59.4-255.2-153.2-337.4l-6.4 1.8c-101.4 37-185.8 134.8-185.8 134.8s76.4 68.4 155.8 185.6c98 144.8 99.2 276.6 99 285.4 57-75.2 90.6-168.8 90.6-270.2z","M402.4 161.8c58.6 26.2 109.2 69.2 109.2 69.2s51-42.8 109.6-69.2c73.6-33 129.8-22.6 144.6-19-72.2-49.6-159.6-78.8-253.8-78.8s-181.6 29.2-253.8 78.8c14.4-3.6 70.4-14.2 144.2 19z","M717.4 585.8c-92.6-113.8-205.8-187.8-205.8-187.8s-112.6 74-205.4 187.8c-79.6 97.8-109.2 169.6-125.2 215.6l-2.6 9.6c82 91.4 201 149 333.6 149s251.6-57.6 333.6-149l-2.8-9.6c-16-46-45.8-117.8-125.4-215.6z"],"grid":0,"tags":["logo-xbox"]},{"paths":["M769.2 136.8c-22.6 0-45-1.6-65.2-8.8l-192 320-192-320c-20.2 7.2-41.4 8.8-64 8.8-22.2 0-44.2-1.8-64-8.8l256 425.4v342.6c20-7 41.6-8.8 64-8.8s44 1.8 64 8.8v-342l256-426c-19.8 6.8-40.6 8.8-62.8 8.8z"],"grid":0,"tags":["logo-yahoo"]},{"paths":["M896 64h-160l-224 442.256-224-442.256h-160l224.736 416h-96.736v96h147.128l28.872 62v34h-176v96h176v192h160v-192h176v-96h-176v-34l29.782-62h146.218v-96h-96.578l224.578-416z"],"grid":0,"tags":["logo-yen"]},{"paths":["M1017.2 297.6c0-90-66.2-162.4-148-162.4-110.8-5.2-223.8-7.2-339.2-7.2-6 0-12 0-18 0s-12 0-18 0c-115.2 0-228.4 2-339.2 7.2-81.6 0-147.8 72.8-147.8 162.8-5 71.2-7.2 142.4-7 213.6-0.2 71.2 2 142.4 6.8 213.8 0 90 66.2 163 147.8 163 116.4 5.4 235.8 7.8 357.2 7.6 121.6 0.4 240.6-2 357.2-7.6 81.8 0 148-73 148-163 4.8-71.4 7-142.6 6.8-214 0.4-71.2-1.8-142.4-6.6-213.8zM414 707.8v-393l290 196.4-290 196.6z"],"grid":0,"tags":["logo-youtube"]},{"paths":["M512 96c-229.75 0-416 186.25-416 416s186.25 416 416 416 416-186.25 416-416-186.25-416-416-416zM726 554h-172v172h-84v-172h-172v-84h172v-172h84v172h172v84z"],"grid":0,"tags":["md-add-circle"]},{"paths":["M832 554.666h-277.334v277.334h-85.332v-277.334h-277.334v-85.332h277.334v-277.334h85.332v277.334h277.334v85.332z"],"grid":0,"tags":["md-add"]},{"paths":["M940 249.674l-196.886-163.56-55.628 65.862 196.884 163.538 55.63-65.84zM334.384 149.838l-55.652-65.838-194.732 165.674 55.628 65.838 194.756-165.674zM533.402 345.256h-64.202v254.892l203.298 121.078 32.102-53.106-171.2-99.834v-223.030zM512 175.33c-214 0-385.202 172.042-385.202 382.332 0 210.298 171.202 382.338 385.202 382.338 211.872 0 385.202-172.040 385.202-382.338 0-210.288-173.33-382.332-385.202-382.332zM512 855.040c-164.786 0-299.6-133.812-299.6-297.376 0-163.554 134.814-297.368 299.6-297.368 164.788 0 299.6 133.812 299.6 297.368 0 165.678-134.812 297.376-299.6 297.376z"],"grid":0,"tags":["md-alarm"]},{"paths":["M309.4 928h533.4c47 0 85.4-38.4 85.4-85.4v-533.2c0-47-38.4-85.4-85.4-85.4h-533.4c-47 0-85.4 38.4-85.4 85.4v533.4c0 46.8 38.4 85.2 85.4 85.2z","M181.4 96h533.4c47 0 85.4 38.4 85.4 85.4v10.6h-522.8c-47 0-85.4 38.4-85.4 85.4v522.6h-10.6c-47 0-85.4-38.4-85.4-85.4v-533.2c0-47 38.4-85.4 85.4-85.4z"],"grid":0,"tags":["md-albums"]},{"paths":["M512 96c-228.8 0-416 187.202-416 416s187.2 416 416 416c228.8 0 416-187.202 416-416s-187.2-416-416-416zM560 720h-96v-80h96v80zM560 544h-96v-256h96v256z"],"grid":0,"tags":["md-alert"]},{"paths":["M64 512c28.2 70 72.4 132 128 181.2v-362.4c-55.6 49.2-99.8 111.2-128 181.2z","M960 512c-28.2-70-72.4-132-128-181.2v362.4c55.6-49.2 99.8-111.2 128-181.2z","M512 210c-94.2 0-182 26.8-256 73v457.8c74 46.2 161.8 73 256 73s182-26.8 256-73v-457.8c-74-46.2-161.8-73-256-73zM704 480v128h-64v-64h-96v64h-64v-64h-96v64h-64v-192h64v64h96v-64h64v64h96v-64h64v64z"],"grid":0,"tags":["md-american-football"]},{"paths":["M758.8 356.6l-174.4 266.8c13.6 16.6 21.6 37.6 21.6 60.6 0 53-43 96-96 96s-96-43-96-96c0-6 0.6-12 1.6-17.8l-115.2-67c-17.2 16.6-40.6 26.8-66.6 26.8-17.2 0-33.2-4.6-47.2-12.4l-122.6 114.8v114.4c0 47 38.4 85.4 85.4 85.4h725.4c47 0 85.4-38.4 85.4-85.4v-425.2l-117.2-77.8c-16.2 12.6-36.6 20.2-58.8 20.2-8.8 0-17.4-1.2-25.4-3.4z","M234 434c53 0 96 43 96 96 0 4.2-0.4 8.4-0.8 12.4l120.2 67.2c16.6-13.6 37.6-21.6 60.8-21.6 7.2 0 14.2 0.8 20.8 2.2l174.8-270.8c-11.2-15.6-17.8-34.8-17.8-55.6 0-53 43-96 96-96s96 43 96 96c0 7.8-1 15.4-2.6 22.6l82.6 55.2v-160.2c0-47-38.4-85.4-85.4-85.4h-725.2c-47 0-85.4 38.4-85.4 85.4v458.6l80-76.6c-3.8-10.4-6-21.6-6-33.4 0-53 43-96 96-96z"],"grid":0,"tags":["md-analytics"]},{"paths":["M512 64c-247.424 0-448 200.576-448 448s200.576 448 448 448 448-200.576 448-448-200.576-448-448-448zM783.53 783.53c-72.53 72.526-168.96 112.47-271.53 112.47s-199-39.944-271.53-112.47c-72.526-72.53-112.47-168.96-112.47-271.53s39.944-199 112.47-271.53c72.53-72.526 168.96-112.47 271.53-112.47s199 39.944 271.53 112.47c72.526 72.53 112.47 168.96 112.47 271.53s-39.944 199-112.47 271.53z","M400.086 212.134c-81.262 30.342-146.868 92.764-181.434 171.866h293.348l-111.914-171.866z","M825.594 576c4.198-20.68 6.406-42.082 6.406-64 0-73.248-24.628-140.734-66.032-194.668l-143.968 258.668h203.594z","M719.946 268.79c-55.932-47.868-128.558-76.79-207.946-76.79-15.932 0-31.588 1.182-46.896 3.43l156.6 252.57 98.242-179.21z","M198.408 448c-4.2 20.68-6.408 42.082-6.408 64 0 73.278 24.648 140.788 66.082 194.732l143.918-258.732h-203.592z","M623.918 811.864c81.262-30.342 146.866-92.764 181.43-171.864h-293.348l111.918 171.864z","M304.092 755.242c55.926 47.848 128.536 76.758 207.908 76.758 15.938 0 31.598-1.184 46.912-3.432l-156.584-252.568-98.236 179.242z"],"grid":0,"tags":["md-aperture"]},{"paths":["M192 352h160v-160h-160v160zM432 832h160v-160h-160v160zM192 832h160v-160h-160v160zM192 592h160v-160h-160v160zM432 592h160v-160h-160v160zM672 192v160h160v-160h-160zM432 352h160v-160h-160v160zM672 592h160v-160h-160v160zM672 832h160v-160h-160v160z"],"grid":0,"tags":["md-apps"]},{"paths":["M928 304h-208c0-114-93.124-207.718-208-207.718s-208 93.718-208 207.718h-208c37.376 432 26 624 26 624h779.998c-0.002 0-11.376-196 26.002-624zM512 148.21c86.016 0 155.998 69.79 155.998 155.79h-311.998c0-86 69.982-155.79 156-155.79zM408 795.28v-337.546l285.998 168.774-285.998 168.772z"],"grid":0,"tags":["md-appstore"]},{"paths":["M907.188 200.002l-64.706-78.598c-11.544-16.15-32.316-25.404-53.154-25.404h-554.658c-20.832 0-41.602 9.254-53.152 25.404l-64.702 78.598c-13.88 13.844-20.816 34.668-20.816 57.77v577.78c0 50.848 41.6 92.448 92.45 92.448h647.106c50.848 0 92.444-41.6 92.444-92.45v-577.78c0-23.1-6.926-43.924-20.812-57.768zM512 766.218l-254.22-254.218h161.78v-92.448h184.886v92.448h161.78l-254.226 254.218zM193.068 188.442l36.972-46.222h554.662l43.93 46.222h-635.564z"],"grid":0,"tags":["md-archive"]},{"paths":["M854 469.25h-519.408l239.404-239.404-61.996-59.846-342 342 342 342 59.844-59.848-237.252-239.402h519.408v-85.5z"],"grid":0,"tags":["md-arrow-back"]},{"paths":["M554.75 170v519.408l239.404-239.404 59.846 61.996-342 342-342-342 59.848-59.844 239.402 237.252v-519.408h85.5z"],"grid":0,"tags":["md-arrow-down"]},{"paths":["M512 96c-229.75 0-416 186.25-416 416s186.25 416 416 416 416-186.25 416-416-186.25-416-416-416zM512 640l-192-192h384l-192 192z"],"grid":0,"tags":["md-arrow-dropdown-circle"]},{"paths":["M256 384l256 256 256-256z"],"grid":0,"tags":["md-arrow-dropdown"]},{"paths":["M928 512c0-229.75-186.25-416-416-416s-416 186.25-416 416 186.25 416 416 416 416-186.25 416-416zM384 512l192-192v384l-192-192z"],"grid":0,"tags":["md-arrow-dropleft-circle"]},{"paths":["M640 256l-256 256 256 256z"],"grid":0,"tags":["md-arrow-dropleft"]},{"paths":["M512 928c229.75 0 416-186.25 416-416s-186.25-416-416-416-416 186.25-416 416 186.25 416 416 416zM448 704v-384l192 192-192 192z"],"grid":0,"tags":["md-arrow-dropright-circle"]},{"paths":["M384 256l256 256-256 256z"],"grid":0,"tags":["md-arrow-dropright"]},{"paths":["M928 512c0-229.75-186.25-416-416-416s-416 186.25-416 416 186.25 416 416 416 416-186.25 416-416zM704 576h-384l192-192 192 192z"],"grid":0,"tags":["md-arrow-dropup-circle"]},{"paths":["M256 640l256-256 256 256z"],"grid":0,"tags":["md-arrow-dropup"]},{"paths":["M170 554.75h519.408l-239.404 239.404 61.996 59.846 342-342-342-342-59.844 59.848 237.252 239.402h-519.408v85.5z"],"grid":0,"tags":["md-arrow-forward"]},{"paths":["M802.8 448h-428l166-158.8c23.8-25 23.8-65.4 0-90.4s-62.4-25-86.4 0l-276.4 268c-12 11.6-18 27.4-18 44.8v0.8c0 17.4 6 33.2 18 44.8l276.2 268c24 25 62.6 25 86.4 0s23.8-65.4 0-90.4l-166-158.8h428c33.8 0 61.2-28.6 61.2-64 0.2-36-27.2-64-61-64z"],"grid":0,"tags":["md-arrow-round-back"]},{"paths":["M198.8 569.8l268 276.2c11.6 12 27.4 18 44.8 18h0.8c17.4 0 33.2-6 44.8-18l268-276.2c25-24 25-62.6 0-86.4s-65.4-23.8-90.4 0l-158.8 166v-428c0-33.8-28.6-61.2-64-61.2-36 0-64 27.4-64 61.2v428l-158.8-166c-25-23.8-65.4-23.8-90.4 0s-25 62.4 0 86.4z"],"grid":0,"tags":["md-arrow-round-down"]},{"paths":["M569.8 825.2l276.2-268c12-11.6 18-27.4 18-44.8v-0.8c0-17.4-6-33.2-18-44.8l-276.2-268c-24-25-62.6-25-86.4 0s-23.8 65.4 0 90.4l166 158.8h-428c-34-0-61.4 28.6-61.4 64 0 36 27.4 64 61.2 64h428l-166 158.8c-23.8 25-23.8 65.4 0 90.4 24 25 62.6 25 86.6 0z"],"grid":0,"tags":["md-arrow-round-forward"]},{"paths":["M825.2 454.2l-268-276.2c-11.6-12-27.4-18-44.8-18h-0.8c-17.4 0-33.2 6-44.8 18l-268 276.2c-25 24-25 62.6 0 86.4s65.4 23.8 90.4 0l158.8-166v428c0 33.8 28.6 61.2 64 61.2 36 0 64-27.4 64-61.2v-428l158.8 166c25 23.8 65.4 23.8 90.4 0s25-62.4 0-86.4z"],"grid":0,"tags":["md-arrow-round-up"]},{"paths":["M554.75 854v-519.408l239.404 239.404 59.846-61.996-342-342-342 342 59.848 59.844 239.402-237.252v519.408h85.5z"],"grid":0,"tags":["md-arrow-up"]},{"paths":["M531.2 424.6c-21 0-37 8.8-48 26.4s-18.2 44-21.6 79.2c-1.8 23.4 0 41 5.4 53s14.2 18 26.2 18c11 0 20.6-3 29.2-8.8s16.2-16.6 22.6-32.4l12.2-132c-4.4-1-8.8-1.8-13-2.4-4.6-0.8-8.8-1-13-1z","M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416zM767.6 499.8c-1.8 42.8-15.2 79.8-40 111.2-24.8 31.2-62 46.8-111.2 46.8-16.4 0-30.6-4.4-42.4-13.2-12-8.8-20.4-21.4-25.2-37.6-8.2 16.6-18.8 29-31.4 37.2s-27.4 12.4-44.4 12.4c-30.2 0-53.2-11.6-69.2-34.6s-21.8-53.6-17.6-91.8c5.2-48.8 20-88 44.4-117.4s54-44 88.8-44c24.4 0 44.2 2.6 59 7.6s31.2 11.4 49 22l-1-0.2h1.6l-15.4 166.8c-1 17 0.2 29.2 3.4 35.6 3.4 6.4 7.8 9.8 13.4 9.8 22.6 0 40.8-10.2 54.4-31.2s21.2-47.2 22.8-79.2c3.2-66-10.2-117.4-40.4-154.2s-76.6-55.4-139.4-55.4c-61 0-109.6 19.8-145.6 59.6s-55.4 93.8-58.6 162.4c-3.4 66.8 11.2 119.6 43.8 158.2 32.6 38.8 79.4 58.2 140.6 58.2 17 0 34.6-1.8 53-5.4 18.2-3.6 34.2-8.2 47.4-13.6l11.6 48.4c-13.6 8.2-30.8 14.6-51.8 19.2s-41.4 6.8-61.4 6.8c-81.6 0-144.6-24.2-188.6-72.8-44-48.4-64.4-114.8-61-199.2 3.6-83.6 29.8-149.8 78.2-198.8 48.6-49 113-73.4 193.4-73.4 79 0 139.6 23.2 181.4 69.4 42.4 46.4 61.6 109.8 58.4 190.4z"],"grid":0,"tags":["md-at"]},{"paths":["M682.668 256v469.332c0 93.876-76.792 170.668-170.668 170.668-93.874 0-170.666-76.792-170.666-170.668v-490.664c0-59.73 46.936-106.668 106.666-106.668 59.728 0 106.666 46.938 106.666 106.668v490.666c0 23.458-19.21 42.666-42.668 42.666s-42.666-19.208-42.666-42.666v-405.334h-64v405.334c0.002 59.728 46.938 106.666 106.668 106.666s106.668-46.938 106.668-106.666v-490.666c0-93.866-76.792-170.668-170.668-170.668s-170.668 76.802-170.668 170.668v490.664c0.002 130.126 104.544 234.668 234.668 234.668s234.668-104.542 234.668-234.668v-469.332h-64z"],"grid":0,"tags":["md-attach"]},{"paths":["M867 192h-532.6c-24.4 0-43.6 12.4-56.4 31.2l-192 288.8 192 288.4c12.8 18.8 32 31.6 56.4 31.6h532.4c39 0 71-32 71-71.2v-497.6c0.2-39.2-31.8-71.2-70.8-71.2zM760.4 639.6l-50 50.2-127.4-127.6-127.4 127.6-50-50.2 127.4-127.6-127.4-127.6 50-50.2 127.4 127.6 127.4-127.6 50 50.2-127.4 127.6 127.4 127.6z"],"grid":0,"tags":["md-backspace"]},{"paths":["M176 256h96v512h-96v-512z","M464 256h96v512h-96v-512z","M320 288h96v448h-96v-448z","M608 288h96v448h-96v-448z","M752 256h96v512h-96v-512z","M208 208v-96h-176v800h176v-96h-80v-608z","M816 112v96h80v608h-80v96h176v-800z"],"grid":0,"tags":["md-barcode"]},{"paths":["M731.8 805.2l-45.8 27-32-56 40.4-23.8c-10.4-17-19.6-34.8-27.8-53.4-2.8-6.2-5.4-12.6-7.8-19l-50.2 11.6-14.2-63.2 45.2-10.4c-5.6-24.2-9.4-48-11-74h-48.6v-64h48.6c1.6-24 5.4-49.6 11-73.6l-45.2-10.4 14.2-63.2 50.2 11.6c2.6-6.4 5.2-12.8 8-19.2 8.2-18.4 17.4-36.2 27.6-53.2l-40.4-23.8 32-56 45.6 27c10.4-12.8 21.6-25 33.4-36.6-70.2-54.4-158-86.6-253-86.6s-182.8 32.2-253 86.4c11.8 11.6 23 24 33.4 36.6l45.6-26.8 32 56-40.4 23.8c10.2 17 19.6 34.8 27.6 53.2 2.8 6.4 5.4 12.8 8 19.2l50.2-11.6 14.2 63.2-45.2 10.4c5.6 24.2 9.2 49.6 11 73.6h48.6v64h-48.6c-1.6 26-5.4 49.8-11 74l45.2 10.4-14.2 63.2-50.2-11.6c-2.4 6.4-5 12.6-7.8 19-8.2 18.4-17.4 36.2-27.8 53.4l40.4 23.8-32 56-45.8-27c-10.4 12.6-21.4 24.8-33.2 36.4 70.2 54.2 158 86.4 253 86.4s182.8-32.2 253-86.4c-11.8-11.6-22.8-23.8-33.2-36.4z","M787.6 252l36.2 21.4-32 56-42.4-25c-10 16.6-19 33.8-26.6 51.8-0.4 0.8-0.8 1.8-1 2.6l42 9.8-14.2 63.2-47.8-11c-4.6 19.4-7.6 39.2-9.2 59.2h47.4v64h-47.2c1.6 20 4.6 40 9.2 59.6l47.8-11 14.2 63.2-42 9.8c0.4 0.8 0.6 1.6 1 2.4 7.6 18 16.6 35.4 26.6 52l42.2-24.8 32 56-36 21.2c6.6 7.8 13.6 15.4 21 22.6 1.2 1.2 2.6 2.6 4 4 71.2-75 115.2-176.2 115.2-287s-44-212-115.4-286.8c-1.4 1.4-2.8 2.6-4 4-7.4 7.4-14.4 15-21 22.8z","M236.4 772.2l-36-21.2 32-56 42.2 24.8c10.2-16.6 19-34 26.6-52 0.4-0.8 0.6-1.6 1-2.4l-42-9.8 14.2-63.2 47.8 11c4.6-19.6 7.6-39.6 9.2-59.6h-47.4v-64h47.2c-1.6-20-4.6-39.8-9.2-59.2l-47.8 11-14.2-63.2 42-9.8c-0.4-0.8-0.6-1.8-1-2.6-7.6-18-16.4-35.4-26.6-51.8l-42.4 25-32-56 36.2-21.4c-6.8-7.8-13.8-15.4-21.2-22.8-1.2-1.2-2.6-2.6-4-4-71 75-115 176.2-115 287s44 212 115.4 286.8c1.4-1.4 2.8-2.6 4-4 7.2-7.2 14.2-14.8 21-22.6z"],"grid":0,"tags":["md-baseball"]},{"paths":["M724.2 410.4l-178.4-265.4c-7.8-11.4-20.8-17-33.8-17s-26 5.6-33.8 17.4l-178.4 265h-195c-22.4 0-40.8 18.2-40.8 40.4 0 3.6 0.4 7.2 1.6 11l103.4 375c9.4 34 40.8 59 78.2 59h529.4c37.4 0 68.8-25 78.6-59l103.4-375 1.2-11c0-22.2-18.4-40.4-40.8-40.4h-194.8zM389.8 410.4l122.2-178 122.2 178h-244.4zM512 734.2c-44.8 0-81.4-36.4-81.4-81s36.6-81 81.4-81 81.4 36.4 81.4 81c0 44.6-36.6 81-81.4 81z"],"grid":0,"tags":["md-basket"]},{"paths":["M383.2 544c-7.6 110-52.8 214.2-129 295.4 63.2 50 141.8 82 225.8 88.6v-384h-96.8z","M544 928c84-6.6 163-38.8 226.2-89-76-81.2-121-185-128.6-295h-97.6v384z","M480 96c-84 6.4-161 38-223.8 87.2 76 81.8 120.6 186.8 127.4 296.8h96.4v-384z","M641.4 480c6.8-110 51.2-214.8 127-296.6-63-49.2-140.4-81-224.4-87.4v384h97.4z","M817.2 228.4c-34.4 37-61.4 79.4-80.2 125.8-16.4 40.4-26.2 81.8-29.2 125.8h220.2c-7.4-96-48.2-184.4-110.8-251.6z","M737 666.2c19.2 47.4 46.6 90.2 81.8 127.6 61.8-67 101.8-153.8 109.2-249.8h-219.8c3.2 42 13 83 28.8 122.2z","M287.8 354.2c-19-46.6-46-89-80.6-126.2-62.8 67.2-103.8 156-111.2 252h221c-3.2-44-13-85.6-29.2-125.8z","M205.4 794.2c35.4-37.6 63-80.6 82.2-128 16-39.2 25.6-80.2 29-122.2h-220.6c7.4 96 47.6 183.2 109.4 250.2z"],"grid":0,"tags":["md-basketball"]},{"paths":["M676.4 153.6h-74.8v-89.6h-179.2v89.6h-74.8c-32.8 0-59.6 26.8-59.6 59.6v686.8c0 33.2 26.8 60 59.6 60h328.4c33.2 0 60-26.8 60-59.6v-687.2c0-32.8-26.8-59.6-59.6-59.6zM467.2 870.4v-246.4h-89.6l179.2-336v246.4h89.6l-179.2 336z"],"grid":0,"tags":["md-battery-charging"]},{"paths":["M676.4 153.6h-74.8v-89.6h-179.2v89.6h-74.8c-32.8 0-59.6 26.8-59.6 59.6v686.8c0 33.2 26.8 60 59.6 60h328.4c33.2 0 60-26.8 60-59.6v-687.2c0-32.8-26.8-59.6-59.6-59.6zM640 864h-256v-614.4h256v614.4z"],"grid":0,"tags":["md-battery-dead"]},{"paths":["M676.4 153.6h-74.8v-89.6h-179.2v89.6h-74.8c-32.8 0-59.6 26.8-59.6 59.6v686.8c0 33.2 26.8 60 59.6 60h328.4c33.2 0 60-26.8 60-59.6v-687.2c0-32.8-26.8-59.6-59.6-59.6z"],"grid":0,"tags":["md-battery-full"]},{"paths":["M896.2 69.8c0-2.4-0.8-5.8-5.8-5.8h-633.4c-108.6 0-128.8 54.8-128.8 79.6 60.6 8.4 63.8 9.4 63.8 73.4 0 32 0 614 0 614 0 70.6 57.8 129 128.6 129h415.4c70.6 0 128-58.4 128-129 0 0 0-7.4 0-20.4v-664c4.4-35 24-63.6 26.2-67 2.4-3.8 6-7.6 6-9.8zM708.4 864h-355.8c-31.8 0-59.4-23.8-64.6-54.2v-649.8h480v639.4c0 36-24.8 64.6-59.6 64.6z","M364 320v452c0 8.8 7.2 16 16 16h296c8.8 0 16-7.2 16-16v-452h-328z"],"grid":0,"tags":["md-beaker"]},{"paths":["M832 280h-32v-12c17.8-18 32-45.8 32-76 0-70.6-57.4-128-128-128-32.6 0-62.2 12.2-84.8 32.2-24.8-20.2-56.4-32.2-90.8-32.2-31.6 0-60.8 10.2-84.6 27.4-19.8-17-45.8-27.4-74-27.4-34.2 0-64.8 15.2-85.6 39-23.4-24-56-39-92.2-39-70.6 0-128 57.4-128 128 0 32.4 12.2 62 32 84.6v109.4c0 53 43 96 96 96v349c0 70.6 57.6 129 128.4 129h351.6c70.6 0 128.2-58.4 128.2-129 0 0 0-7.4 0-20.4v-66.6h32c100 0 128-65.4 128-136v-192c-0.2-70.6-34.2-136-128.2-136zM704 384h-416v-107.4c0.6-0.8 1.4-1.6 2-2.4 2.4-3 4.8-6 7-9.2 3 2.4 6 4.8 9.2 6.8 18.2 12.2 40 19.4 63.4 19.4 12.8 0 25.2-2.2 36.6-6 25.6 40.4 70.6 67.4 122 67.4 44 0 83.4-19.8 109.8-50.8 11.4-13.4 20.4-28.8 26.2-45.8h39.8v128zM192 256.2v150c-18 0-32-14.4-32-32v-126.6c-16-9-26.8-24.2-30.6-42-1-4.2-1.4-8.8-1.4-13.4 0-35.2 28.8-64 64-64 23.6 0 46.6 15.4 60.2 30.8s53.4 15.4 67.8 0c13.6-14.6 28.6-30.8 49.6-30.8 12 0 23.2 4.4 31.8 11.6 3.8 3.2 7.2 7 9.8 11.2 2.2 3.6 4 8.4 6.2 11.6 5.4 6.8 13 11 22.4 11 8.8 0 16.6-3.8 22-10 1.2-1.4 2.4-3 3.4-4.6 4-5 8.4-9.6 13.4-13.6 13.6-10.8 31-17.2 49.6-17.2 21.2 0 40.4 8.2 54.8 21.8 3.4 3.2 13.4 9 26.4 10.2 9 0.8 12.2 0.6 16.4 0 20.6-2.6 28.8-9.4 32.8-13.2 11.6-11.6 27.6-18.8 45.2-18.8 35.2 0 64 28.8 64 64 0.4 6.2-0.6 12.4-2.4 18.2-5-11-16.2-18.4-29.2-18.4h-110c0 0-17.4-1.4-17.4 16.4s-5.8 34.2-15.6 47.4c-14.6 19.8-38.2 32.8-64.8 32.8-29.8 0-55.8-16.2-69.6-40.4-3.2-5.4-5.6-11.2-7.4-17.2-0.2-1.2-0.6-2.2-0.8-3.2-4-11.8-15-20.4-28.2-20.4-7.8 0-15 3-20.4 8 0 0 0 0-0.2 0.2-4.8 4.2-10.6 7.4-16.8 9.4-4.8 1.6-10 2.4-15.4 2.4-15 0-29.4-8-37.6-17.2-20-22.8-47.4-13.6-59.4-11s-24.4 23.4-24.4 23.4c-2.2 4.2-4.8 8-7.8 11.6-12 13.4-30.4 22-48.4 22zM864 608c0 35.4-12.6 48-48 48h-16v-288h16c35.4 0 48 12.6 48 48v192z"],"grid":0,"tags":["md-beer"]},{"paths":["M661.332 262.404c37.336 0 67.196-29.87 67.196-67.202s-29.86-67.202-67.196-67.202c-37.332 0-67.192 29.87-67.192 67.202s29.86 67.202 67.192 67.202zM773.332 522.668c-102.664 0-186.664 84-186.664 186.666s84 186.666 186.664 186.666c102.668 0 186.668-84 186.668-186.666s-84-186.666-186.668-186.666zM773.332 840c-72.804 0-130.664-57.86-130.664-130.666s57.86-130.666 130.664-130.666c72.808 0 130.668 57.86 130.668 130.666s-57.86 130.666-130.668 130.666zM611.194 448h156.806v-64h-117.69l-69.24-120.268c-11.21-18.666-31.738-31.728-54.14-31.728-16.798 0-33.596 7.464-44.798 18.666l-143.464 138.13c-11.202 11.202-18.666 28-18.666 44.798 0 24.262 18.404 42.93 37.070 54.13l122.928 76.54v171.732h64v-224l-78.666-64 85.858-89.066 60.002 89.066zM250.666 522.668c-102.666 0-186.666 84-186.666 186.666s84 186.666 186.666 186.666c102.666 0 186.666-84 186.666-186.666s-83.998-186.666-186.666-186.666zM250.666 840c-72.798 0-130.666-57.86-130.666-130.666s57.868-130.666 130.666-130.666c72.798 0 130.666 57.86 130.666 130.666s-57.868 130.666-130.666 130.666z"],"grid":0,"tags":["md-bicycle"]},{"paths":["M798 319.8l-257-255.8h-45v340l-206.6-205.6-63.4 63.2 251.6 250.4-251.6 250.4 63.4 63.2 206.6-205.6v340h45l257-255.8-193.6-192.2c0 0 193.6-192.2 193.6-192.2zM586 235.6l84.6 84.2-84.6 84.2v-168.4zM670.6 704.2l-84.6 84.2v-168.4c0 0 84.6 84.2 84.6 84.2z"],"grid":0,"tags":["md-bluetooth"]},{"paths":["M168.51 826h2.126c68.246 0 127.954-38.042 170.61-84.988 42.65 46.946 102.36 85.524 170.608 85.524s127.958-38.668 170.61-85.612c42.654 46.944 102.36 85.076 170.606 85.076h2.124l102.506-277.56c4.252-10.658 2.126-23.282-2.14-33.952-4.272-10.666-14.474-16.974-25.134-21.246l-76.426-24.976v-196.3c0-46.946-39.312-85.966-86.232-85.966h-127.958l-31.986-106h-191.938l-31.99 106h-127.958c-46.916 0-85.938 39.020-85.938 85.964v196.3l-76.148 25.066c-10.66 4.272-21.164 10.668-25.436 21.334-4.27 10.67-6.316 20.98-2.062 33.774l102.156 277.562zM256 272h512v168.522l-256-83.21-256 83.21v-168.522z","M682.462 816.014c-104.506 72.534-236.712 72.516-341.216-0.018 0 0-115.276 128.004-213.264 128.004h42.654c59.708 0 117.292-23.452 170.61-51.188 106.63 55.468 234.586 55.456 341.216-0.014 53.318 27.738 110.9 51.202 170.608 51.202h42.656c-95.302 0-213.264-127.986-213.264-127.986z"],"grid":0,"tags":["md-boat"]},{"paths":["M512 96c44 0 80 36 80 80s-36 80-80 80-80-36-80-80 36-80 80-80zM896 384.2h-256v543.8h-85.4v-288h-85.4v288h-85.2v-543.8h-256v-85.4h768v85.4z"],"grid":0,"tags":["md-body"]},{"paths":["M544.4 701.2c-1.6-16.4-16.4-29.2-34.6-29.2-16.6 0-30.4 10.8-33.8 25v0l-33.8 185c-1 4.6-1.6 9.2-1.6 14 0 35.4 31 64 69.4 64s69.4-28.6 69.4-64c0-5.8-0.8-11.4-2.4-16.8l-32.6-178z","M620.2 710v0 0z","M808.6 780.6c-3.8-2.8-7.2-5.8-11.2-7.8l-137.8-95c-12.6-7.6-26-7.4-35.8 1.8-9 8.2-10.2 20.8-3.6 30.8l106 131.6c2 3 4.6 5.6 7.2 8.4 17 18.2 54.4 19.2 75 0 20.8-19.6 20.6-54.4 0.2-69.8z","M764.4 670v0 0z","M900.8 645l-129-4.6c-8.4-1.2-16 4.2-17.4 12-1.4 7.2 3 14.2 10.2 17.6v0c0 0 0.2 0 0.2 0l125 35.6c18 3.8 38.2-4.6 38.2-23.2-0-23.8-6.6-35-27.2-37.4z","M259 670v0 0z","M259 670v0c7.2-3.2 11.4-10.4 10.2-17.6-1.4-8-9-13.2-17.4-12l-129 4.6c-20.8 2.4-26.8 13.6-26.8 37.2 0 18.6 19.8 27.2 37.6 23.2l125-35.6c0.2 0.2 0.2 0.2 0.4 0.2z","M364.4 677.6l-137.8 94.8c-4 2.2-7.8 4.8-11.2 7.8-20.8 19.2-20.8 50.2 0 69.2 20.8 19.2 54.2 19.2 75 0 2.8-2.6 5.2-5.4 7.2-8.4l106-131.2c6.6-10 5.4-22.4-3.6-30.6-9.6-9-25.2-9.6-35.6-1.6z","M512 64c0 0 60.4 70.8 60.4 128.8 0 55.6-36.4 100.6-91.8 100.6-55.8 0-97.8-45-97.8-100.6l0.8-13.8c-54.4 64.6-87 152.4-87 243.6 0 119.2 96.4 215.6 215.6 215.6s215.6-96.4 215.6-215.6c-0.2-145.2-71.8-315.2-215.8-358.6zM504.2 557.4c-48 0-86.8-37.8-86.8-84.6 0-43.6 28.2-74.4 75.8-84 47.6-9.8 97-32.6 124.6-69.6 10.6 34.8 15.8 71.4 15.8 108.8 0 71.4-58 129.4-129.4 129.4z"],"grid":0,"tags":["md-bonfire"]},{"paths":["M852.4 160.8l-340.4 64-340.4-64c-43.6-6.8-75.6 33.8-75.6 75.2v489c0 41.4 32 65.2 75.6 75.2l340.4 63.8 340.4-64c43.6-10 75.6-33.8 75.6-75.2v-488.8c0-41.4-32-82-75.6-75.2zM852.4 724.8l-302.4 64v-489l302.4-64v489zM474 788.8l-302.4-64v-488.8l302.4 64v488.8z"],"grid":0,"tags":["md-book"]},{"paths":["M720 128h-416c-44.004 0-80 35.996-80 80v688l288-128 288 128v-688c0-44.004-35.996-80-80-80z"],"grid":0,"tags":["md-bookmark"]},{"paths":["M810.4 128h-42c30 11.4 45.6 41.2 45.6 85.4v597.4c0 44.2-14 74.6-45.6 85.4h42c47.4 0 85.6-38.4 85.6-85.4v-597.4c0-47-38.2-85.4-85.6-85.4z","M691 128.4c-2.8-0.2-5.6-0.4-8.4-0.4h-469.2c-47 0-85.4 38.4-85.4 85.4v597.4c0 47 38.4 85.4 85.4 85.4h469.4c2.8 0 5.6-0.2 8.4-0.4 43-4.2 77-40.8 77-85v-597.4c-0.2-44.2-34.2-80.8-77.2-85zM416 512l-112-64-112 64v-320h224v320z"],"grid":0,"tags":["md-bookmarks"]},{"paths":["M552 608h-80c-30.8 0-56-25.2-56-56v-80c0-30.8 25.2-56 56-56h80c30.8 0 56 25.2 56 56v80c0 30.8-25.2 56-56 56z","M352 560v-96c0-36.4 17.4-68.8 44.4-89.2-12.4-54.8-204.4-182.8-268.4-182.8-35.2 0-64 28.8-64 64v512c0 35.2 28.6 64 64 64 64 0 256-128 268.4-182.8-27-20.4-44.4-52.8-44.4-89.2z","M896 192c-64 0-256 128-268.4 182.8 27 20.4 44.4 52.8 44.4 89.2v96c0 36.4-17.4 68.8-44.4 89.2 12.4 54.8 204.4 182.8 268.4 182.8 35.4 0 64-28.8 64-64v-512c0-35.2-28.8-64-64-64z"],"grid":0,"tags":["md-bowtie"]},{"paths":["M704 288v-79.2c0-44.8-36-80.8-80.8-80.8h-222.4c-44.8 0-80.8 36-80.8 80.8v79.2h-224v527.2c0 44.8 36 80.8 80.8 80.8h670.4c44.8 0 80.8-36 80.8-80.8v-527.2h-224zM624 288h-224v-80h224v80z"],"grid":0,"tags":["md-briefcase"]},{"paths":["M848 128h-672c-53.2 0-96 43.2-96 96v576c0 52.8 42.8 96 96 96h672c52.8 0 96-43.2 96-96v-576c0-52.8-42.8-96-96-96zM848 800h-672v-448h672v448z"],"grid":0,"tags":["md-browsers"]},{"paths":["M299.8 604.4c-78.2 0-141.4 62-141.4 138.6 0 60.6-54.6 92.4-94.4 92.4 43.4 56.6 117.4 92.6 188.6 92.6 104.2 0 188.6-82.8 188.6-184.8 0-76.8-63.2-138.8-141.4-138.8zM946.2 171.4l-63.2-62c-18.4-18-48-18-66.4 0l-422.6 414.2 129.6 127 422.4-414c18.6-18 18.6-47.2 0.2-65.2z"],"grid":0,"tags":["md-brush"]},{"paths":["M896 320h-134.8c-21.6-37.4-51.4-69.6-87.4-94l78.2-78.4-67.6-67.6-104.2 104.2c-22.2-5.4-44.6-8.2-68.2-8.2s-46 2.8-67.6 8.2l-104.8-104.2-67.6 67.6 77.8 78.2c-35.6 24.4-65.2 56.6-86.8 94h-135v96h100.4c-2.4 15.8-4.4 31.6-4.4 48v48h-96v96h96v48c0 16.4 2 32.2 4.4 48h-100.4v96h134.8c50 86 142.6 144 249.2 144s199.2-58 249.2-144h134.8v-96h-100.4c2.4-15.8 4.4-31.6 4.4-48v-48h96v-96h-96v-48c0-16.4-2-32.2-4.4-48h100.4v-95.8z"],"grid":0,"tags":["md-bug"]},{"paths":["M948.2 796.4l-370-372.4c36.6-94 16.2-204.6-61-282.2-81.4-81.8-203.4-98.2-301-53.2l174.8 176-122 122.8-179-176c-48.6 98-28.2 220.8 53 302.6 77.2 77.8 187 98.2 280.6 61.4l370 372.4c16.2 16.4 40.6 16.4 57 0l93.6-94c20.4-16.6 20.4-45.2 4-57.4z"],"grid":0,"tags":["md-build"]},{"paths":["M512 340.272c50.998 0 99.134 20.050 135.542 56.458 36.408 36.406 56.458 84.544 56.458 135.542 0 35.242-8.844 68.062-26.288 97.546-16.678 28.196-40.874 52.072-69.97 69.052l-31.742 18.524v178.606h-128v-178.606l-31.742-18.524c-59.374-34.648-96.258-98.486-96.258-166.598 0-50.998 20.050-99.134 56.458-135.542s84.544-56.458 135.542-56.458zM554.666 64c-12.792 0-85.332 0-85.332 0v128h85.332v-128zM812.792 171.728l-76.792 76.814 59.728 59.73 76.812-76.792-59.748-59.752zM211.208 171.728l-59.75 59.75 76.812 76.792 59.73-59.728-76.792-76.814zM512 276.272c-140.792 0-256 115.208-256 256 0 93.876 51.208 177.062 128 221.876v205.852h256v-205.854c76.792-44.812 128-125.876 128-221.876 0-140.792-115.208-255.998-256-255.998v0zM960 489.604h-128v85.334h128v-85.334zM192 489.604h-128v85.334h128v-85.334z"],"grid":0,"tags":["md-bulb"]},{"paths":["M160 704c0 38.396 27.728 49.062 53.334 72.542v76.792c0 23.458 19.198 42.668 42.666 42.668h42.666c23.468 0 42.668-19.208 42.668-42.668v-42.666h341.332v42.666c0 23.458 19.208 42.668 42.668 42.668h42.666c23.458 0 42.666-19.208 42.666-42.668v-76.792c25.606-23.48 53.334-36.27 53.334-72.542v-407.332c0-149.334-164.272-168.668-352-168.668s-352 19.334-352 168.668v407.332zM320 735.978c-36.272 0-64-27.728-64-64 0-36.27 27.728-64 64-64s64 27.73 64 64c0 36.272-27.728 64-64 64zM704 735.978c-36.272 0-64-27.728-64-64 0-36.27 27.728-64 64-64s64 27.73 64 64c0 36.272-27.728 64-64 64zM768 490.666h-512v-213.332h512v213.332z"],"grid":0,"tags":["md-bus"]},{"paths":["M96 800h736v96h-736v-96z","M848 128h-688v448c0 88 72 160 160 160h288c88 0 160-72 160-160v-128h80c44 0 80-36 80-80v-160c0-44-36-80-80-80zM848 352h-80v-128h80v128z"],"grid":0,"tags":["md-cafe"]},{"paths":["M736 96h-448c-53.2 0-96 43.2-96 96v640c0 52.8 42.8 96 96 96h448c52.8 0 96-43.2 96-96v-640c0-52.8-42.8-96-96-96zM400 832h-96v-96h96v96zM400 656h-96v-96h96v96zM400 480h-96v-96h96v96zM560 832h-96v-96h96v96zM560 656h-96v-96h96v96zM560 480h-96v-96h96v96zM720 832h-96v-272h96v272zM720 480h-96v-96h96v96zM720 288h-416v-96h416v96z"],"grid":0,"tags":["md-calculator"]},{"paths":["M736.010 544h-192v192h192v-192zM672.010 128v64h-320v-64h-96v64h-48.020c-44.004 0-80 35.996-80 80v544c0 44.004 35.996 80 80 80h608.020c44.004 0 80-35.996 80-80v-544c0-44.004-35.996-80-80-80h-48v-64h-96zM816.010 816h-608.020v-424h608.020v424z"],"grid":0,"tags":["md-calendar"]},{"paths":["M853.332 661.334c-53.332 0-104.542-8.542-151.458-23.458-14.938-4.272-32-2.146-42.664 10.666l-93.878 93.856c-121.604-61.856-219.728-160-281.604-281.606l93.878-93.854c10.664-10.666 14.924-27.728 10.664-42.666-17.074-49.062-25.604-100.272-25.604-153.606 0-23.458-19.198-42.666-42.666-42.666h-149.334c-23.468 0-42.666 19.208-42.666 42.666 0 401.062 324.272 725.334 725.332 725.334 23.46 0 42.668-19.208 42.668-42.666v-149.334c0-23.458-19.208-42.666-42.668-42.666z"],"grid":0,"tags":["md-call"]},{"paths":["M638 560c0 69.588-56.412 126-126 126s-126-56.412-126-126c0-69.588 56.412-126 126-126s126 56.412 126 126z","M880 192h-176l-64-64h-256l-64 64h-176c-44.184 0-80 35.816-80 80v544c0 44.184 35.816 80 80 80h736c44.184 0 80-35.816 80-80v-544c0-44.184-35.816-80-80-80zM512 784c-123.71 0-224-100.29-224-224s100.29-224 224-224 224 100.29 224 224-100.29 224-224 224z"],"grid":0,"tags":["md-camera"]},{"paths":["M806.416 234.666c-8.542-25.604-32-42.666-59.75-42.666h-469.332c-27.75 0-51.208 17.062-59.75 42.666l-89.584 234.668v320c0 23.458 19.208 42.666 42.666 42.666h42.668c23.458 0 42.666-19.208 42.666-42.666v-21.334h512v21.334c0 23.458 19.208 42.666 42.666 42.666h42.668c23.458 0 42.666-19.208 42.666-42.666v-320l-89.584-234.668zM277.334 640c-36.25 0-64-27.73-64-64s27.75-64 64-64 64 27.732 64 64-27.75 64-64 64zM746.666 640c-36.25 0-64-27.73-64-64s27.75-64 64-64 64 27.732 64 64-27.75 64-64 64zM213.334 426.666l64-170.666h469.332l64 170.666h-597.332z"],"grid":0,"tags":["md-car"]},{"paths":["M870.4 160h-716.8c-49.8 0-89.2 39.2-89.2 88l-0.4 528c0 48.8 39.8 88 89.6 88h716.8c49.8 0 89.6-39.2 89.6-88v-528c0-48.8-39.8-88-89.6-88zM870.4 776h-716.8v-264h716.8v264zM870.4 336h-716.8v-88h716.8v88z"],"grid":0,"tags":["md-card"]},{"paths":["M339.2 755.2c-45.764 0-83.2 37.436-83.2 83.202 0 45.764 37.436 83.2 83.2 83.2s83.202-37.436 83.202-83.2c-0.002-45.768-37.44-83.202-83.202-83.202zM96 102.4v83.2h83.2l149.766 303.364-62.616 101.908c-6.236 10.4-10.4 24.964-10.4 39.53 0 55.7 38.050 83.2 89.65 83.2h486.4v-80h-476.214c-6.236 0-10.4-4.164-10.4-10.4 0-2.072 4.414-10.4 4.414-10.4l41.564-65.6h309.908c31.202 0 58.256-16.634 72.8-43.672l149.764-257.6c2.474-4.922 4.164-12.492 4.164-20.798 0-22.892-18.728-39.53-41.6-39.53h-615.672l-39.528-83.202h-135.2zM748.798 755.2c-45.764 0-83.2 37.436-83.2 83.202 0 45.764 37.436 83.2 83.2 83.2s83.202-37.438 83.202-83.202c0-45.766-37.438-83.2-83.202-83.2z"],"grid":0,"tags":["md-cart"]},{"paths":["M64 192v512h896v-512h-896zM385 640h-160.8c0-53.2-43-96.2-96.2-96.2v-159.8c70.6 0 128-57.4 128-128h129c-39.8 47-65 115.6-65 192s25.2 145 65 192zM896 543.8c-52 0-96 43-96 96.2h-161c39.8-47 65-115.6 65-192s-25.2-145-65-192h129c0 70.6 57.4 128 128 128v159.8z","M64 768h896v64h-896v-64z"],"grid":0,"tags":["md-cash"]},{"paths":["M783.106 128h-667.892c-8.952 0-19.214 7.49-19.214 16.318v428.434c0 8.826 10.262 17.248 19.214 17.248h114.786v177.788l180.256-177.788h372.85c8.954 0 14.894-8.422 14.894-17.248v-428.434c0-8.828-5.942-16.318-14.894-16.318z","M912.792 254h-64.792v333.14c0 31.974-13.83 52.86-50.304 52.86h-361.504l-77.81 78h259.376l180.242 178v-178h114.792c8.956 0 15.208-8.524 15.208-17.364v-428.43c0-8.828-6.252-18.206-15.208-18.206z"],"grid":0,"tags":["md-chatboxes"]},{"paths":["M265.6 736c-40.4 0-89.6-49.2-89.6-89.6v-326.4h-19.2c-33.4 0-60.8 27.4-60.8 60.8v547.2l117-116h430.2c33.4 0 60.8-28.2 60.8-61.8v-14.2h-438.4z","M858.2 96h-558.4c-38.4 0-69.8 31.4-69.8 69.8v452.2c0 38.4 31.4 70 69.8 70h476.4l151.8 106v-628.2c0-38.4-31.4-69.8-69.8-69.8z"],"grid":0,"tags":["md-chatbubbles"]},{"paths":["M337.062 430.938l-59.728 59.728 192 192 426.666-426.666-59.728-59.728-366.938 364.79-132.272-130.124zM810.666 810.666h-597.332v-597.332h426.666v-85.334h-426.666c-46.938 0-85.334 38.396-85.334 85.334v597.332c0 46.938 38.396 85.334 85.334 85.334h597.332c46.938 0 85.334-38.396 85.334-85.334v-341.332h-85.334v341.332z"],"grid":0,"tags":["md-checkbox-outline"]},{"paths":["M810.666 128h-597.332c-46.938 0-85.334 38.396-85.334 85.334v597.332c0 46.938 38.396 85.334 85.334 85.334h597.332c46.938 0 85.334-38.396 85.334-85.334v-597.332c0-46.938-38.396-85.334-85.334-85.334zM426.666 725.334l-213.332-213.334 59.728-59.728 153.604 153.604 324.272-324.272 59.728 59.73-384 384z"],"grid":0,"tags":["md-checkbox"]},{"paths":["M341.436 432.964l-58.236 58.236 187.2 187.2 416-416-58.236-58.236-357.764 355.672-128.964-126.872zM844.8 512c0 183.036-149.766 332.8-332.8 332.8s-332.8-149.764-332.8-332.8 149.764-332.8 332.8-332.8c31.2 0 62.4 4.164 91.528 12.482l64.472-64.482c-47.836-20.8-99.836-31.2-156-31.2-228.8 0-416 187.2-416 416s187.2 416 416 416 416-187.2 416-416h-83.2z"],"grid":0,"tags":["md-checkmark-circle-outline"]},{"paths":["M512 96c-228.8 0-416 187.2-416 416s187.2 416 416 416 416-187.2 416-416-187.2-416-416-416zM426.6 733.8l-213.2-213.2 59.8-59.8 153.6 153.6 324.2-324.2 59.8 59.8-384.2 383.8z"],"grid":0,"tags":["md-checkmark-circle"]},{"paths":["M372.602 679.786l-180.602-180.864-64 61.014 244.602 244.064 523.398-522.988-64-61.012z"],"grid":0,"tags":["md-checkmark"]},{"paths":["M810.666 160h-174.7c-14.208-55.208-64.324-96-123.966-96s-109.758 40.792-123.966 96h-174.7c-46.938 0-85.334 38.396-85.334 85.334v629.33c0 46.938 38.396 85.336 85.334 85.336h597.332c46.938 0 85.334-38.398 85.334-85.336v-629.33c0-46.938-38.396-85.334-85.334-85.334zM512 160c23.458 0 42.666 19.198 42.666 42.666s-19.208 42.668-42.666 42.668-42.666-19.2-42.666-42.668 19.208-42.666 42.666-42.666zM816 880h-608v-640h80v144h448v-144h80v640z"],"grid":0,"tags":["md-clipboard"]},{"paths":["M806.2 217.8c-162.4-162.4-425.8-162.4-588.4 0s-162.4 425.8 0 588.4c162.4 162.4 425.8 162.4 588.4 0 162.4-162.4 162.4-426 0-588.4zM773.2 324.2c15.2-8.8 35-3.6 43.8 11.8 8.8 15.2 3.6 35-11.8 43.8-15.2 8.8-35 3.6-43.8-11.8-8.8-15.2-3.6-35 11.8-43.8zM160 512c0-17.6 14.4-32 32-32s32 14.4 32 32-14.4 32-32 32-32-14.4-32-32zM250.8 699.8c-15.2 8.8-35 3.6-43.8-11.8-8.8-15.2-3.6-35 11.8-43.8 15.2-8.8 35-3.6 43.8 11.8 8.8 15.2 3.6 35-11.8 43.8zM262.6 368c-8.8 15.2-28.4 20.6-43.8 11.8-15.2-8.8-20.6-28.4-11.8-43.8 8.8-15.2 28.4-20.6 43.8-11.8s20.6 28.6 11.8 43.8zM336 207.2c15.2-8.8 35-3.6 43.8 11.8 8.8 15.2 3.6 35-11.8 43.8s-35 3.6-43.8-11.8c-8.8-15.4-3.4-35 11.8-43.8zM320.4 428.6l31.2-53.2 190.4 113.8v278.8h-62v-246.8l-159.6-92.6zM379.8 805.2c-8.8 15.2-28.4 20.6-43.8 11.8s-20.6-28.4-11.8-43.8c8.8-15.2 28.4-20.6 43.8-11.8 15.2 8.8 20.6 28.4 11.8 43.8zM512 864c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32-14.4 32-32 32zM512 224c-17.6 0-32-14.4-32-32s14.4-32 32-32 32 14.4 32 32c0 17.6-14.4 32-32 32zM688 816.8c-15.2 8.8-35 3.6-43.8-11.8-8.8-15.2-3.6-35 11.8-43.8 15.2-8.8 35-3.6 43.8 11.8s3.4 35-11.8 43.8zM699.8 250.8c-8.8 15.2-28.4 20.6-43.8 11.8s-20.6-28.4-11.8-43.8c8.8-15.2 28.4-20.6 43.8-11.8s20.6 28.6 11.8 43.8zM816.8 688c-8.8 15.2-28.4 20.6-43.8 11.8-15.2-8.8-20.6-28.4-11.8-43.8 8.8-15.2 28.4-20.6 43.8-11.8s20.6 28.6 11.8 43.8zM832 544c-17.6 0-32-14.4-32-32s14.4-32 32-32c17.6 0 32 14.4 32 32s-14.4 32-32 32z"],"grid":0,"tags":["md-clock"]},{"paths":["M512 96c-230.882 0-416 185.118-416 416 0 230.872 185.118 416 416 416 230.87 0 416-185.128 416-416 0-230.882-185.128-416-416-416zM720.004 661.762l-58.24 58.234-149.764-149.762-149.762 149.762-58.242-58.234 149.766-149.762-149.766-149.762 58.242-58.232 149.762 149.756 149.762-149.756 58.24 58.232-149.764 149.762 149.766 149.762z"],"grid":0,"tags":["md-close-circle"]},{"paths":["M810 273.596l-59.596-59.596-238.404 238.404-238.404-238.404-59.596 59.596 238.404 238.404-238.404 238.404 59.596 59.596 238.404-238.404 238.404 238.404 59.596-59.596-238.404-238.404z"],"grid":0,"tags":["md-close"]},{"paths":["M64 192v640h896v-640h-896zM876 511.6c0 46.8-2.8 82.4-6.6 140.4s-33.6 98.8-103.4 105.2c-69.8 6.4-167.6 7-254 6.8-85.8 0.2-184-0.2-254-6.8-69.8-6.4-99.4-47.2-103.4-105.2s-6.6-93.6-6.6-140.4c0-46.8 0.2-77.2 6.6-140.4s40.2-98.4 103.4-104.8 172-6.4 254-6.4 190.8 0 254 6.4c63.2 6.4 97 41.8 103.4 104.8 6.4 63.2 6.6 93.8 6.6 140.4z","M715 560.8v1.4c0 32.6-20.2 51.8-47.2 51.8s-45.2-21.6-47.8-51.8c0 0-2.4-15.8-2.4-47.8s2.8-52 2.8-52c4.8-34 21.4-51.8 48.4-51.8 26.8 0 48.2 23.2 48.2 58.4 0 0.2 0 1 0 1h90.2c0-43.8-11-83.2-33.2-108-22-24.8-55-37.2-98.6-37.2-21.8 0-41.8 2.8-60 8.6s-34 15.8-47.2 30.2c-13.2 14.4-23.4 33.6-30.8 57.8-7.2 24.2-11 54.6-11 91.4 0 36 3 66 8.8 90.2 6 24.2 14.6 43.4 26.2 57.8s26.2 24.4 43.6 30c17.6 5.6 38.2 8.4 61.8 8.4 50 0 86-12.8 107.6-37.4s32.4-60.6 32.4-107.8h-92.2c0.4 0 0.4 5 0.4 6.8z","M405.2 560.8v1.4c0 32.6-20.2 51.8-47.2 51.8s-45.2-21.6-47.8-51.8c0 0-2.4-15.8-2.4-47.8s2.8-52 2.8-52c4.8-34 21.4-51.8 48.4-51.8 26.8 0 48.2 23.2 48.2 58.4 0 0.2 0 1 0 1h90.2c0-43.8-11-83.2-33.2-108-22-24.8-55-37.2-98.6-37.2-21.8 0-41.8 2.8-60 8.6s-34 15.8-47.2 30.2c-13.2 14.4-23.4 33.6-30.8 57.8-7.2 24.2-11 54.6-11 91.4 0 36 3 66 8.8 90.2 6 24.2 14.6 43.4 26.2 57.8s26.2 24.4 43.6 30c17.6 5.6 38.2 8.4 61.8 8.4 50 0 86-12.8 107.6-37.4s32.4-60.6 32.4-107.8h-92.2c0.4 0 0.4 5 0.4 6.8z"],"grid":0,"tags":["md-closed-captioning"]},{"paths":["M512 96c-228.8 0-416 187.2-416 416s187.2 416 416 416c228.8 0 416-187.2 416-416s-187.2-416-416-416zM699.2 678.4c0 0-351.518 0-353.598 0-68.636 0-124.8-56.164-124.8-124.798 0-68.638 56.164-124.8 124.8-124.8 2.082 0 4.164 0 6.234 0 18.728-72.8 83.202-124.798 160.166-124.798 91.528 0 166.398 74.87 166.398 166.396h20.8c58.236 0 104 45.764 104 104.002 0 58.234-45.764 103.998-104 103.998z"],"grid":0,"tags":["md-cloud-circle"]},{"paths":["M806.004 434.002c-28.008-137.998-148.008-242.002-294.004-242.002-115.996 0-215.996 65.996-265.996 162.002-120 12.002-214.004 113.994-214.004 237.998 0 131.992 107.998 240 240 240h520c110 0 200-90 200-200 0-105.996-81.992-192.002-185.996-197.998zM426.666 725.334l-149.332-149.334 59.728-59.728 89.604 89.604 221.876-221.876 59.73 59.728-281.606 281.606z"],"grid":0,"tags":["md-cloud-done"]},{"paths":["M806.004 434.002c-28.008-137.998-148.008-242.002-294.004-242.002-115.996 0-215.996 65.996-265.996 162.002-120 12.002-214.004 113.994-214.004 237.998 0 131.992 107.998 240 240 240h520c110 0 200-90 200-200 0-105.996-81.992-192.002-185.996-197.998zM448 536v-152h128v152h136l-200 200-200-200h136z"],"grid":0,"tags":["md-cloud-download"]},{"paths":["M806.002 434.002c-28.008-137.998-148.006-242.002-294.002-242.002-115.996 0-215.998 65.996-265.994 162-120.002 12.004-214.006 113.996-214.006 238 0 131.992 108.008 240 240 240h520c110 0 200-90 200-200.002 0-105.994-81.994-191.998-185.998-197.996zM792 752h-520c-88.008 0-160-71.992-160-160 0-88 71.992-160 160-160h28.008c25.996-92 110-160 211.992-160 121.992 0 220 98 220 220v20h60c65.996 0 120 54.006 120 120 0 65.996-54.004 120-120 120z"],"grid":0,"tags":["md-cloud-outline"]},{"paths":["M806.004 434.002c-28.008-137.998-148.008-242.002-294.004-242.002-115.996 0-215.996 65.996-265.996 162.002-120 12.002-214.004 113.994-214.004 237.998 0 131.992 107.998 240 240 240h520c110 0 200-90 200-200 0-105.996-81.992-192.002-185.996-197.998zM576 552v152h-128v-152h-136l200-200 200 200h-136z"],"grid":0,"tags":["md-cloud-upload"]},{"paths":["M806.004 434.002c-28.008-137.998-148.008-242.002-294.004-242.002-115.996 0-215.996 65.996-265.996 162.002-120 12.002-214.004 113.994-214.004 237.998 0 131.992 107.998 240 240 240h520c110 0 200-90 200-200 0-105.996-81.992-192.002-185.996-197.998z"],"grid":0,"tags":["md-cloud"]},{"paths":["M246.8 366c0.8-0.2 1.6-0.2 2.4-0.4-1 0.2-1.6 0.4-2.4 0.4z","M683 606.8c-21.6-111.4-118.6-194.8-235-194.8-68 0-130.2 24-173 78.2 58.8 4.4 113.4 26.2 155.4 68.4 31.2 31.4 53.2 69.8 64.2 111.6h-57.4c-26.2-75.2-96-129-181.2-129-10.2 0-24.6 1.2-35.4 3.4-91.4 18.8-156.6 95.2-156.6 190 0 106.8 86 193.6 192 193.6h416c88.2 0 160-72.2 160-161.2-0.2-85.4-65.8-154.4-149-160.2z","M225 450.8c27.2-34.6 61.4-61 101.6-78.4 36.8-16 77.6-24 121.4-24 12.2 0 24.4 0.8 36.4 2.2-12.2-36.2-18.8-75.2-18.8-115.6 0-49.2 9.8-96.2 27.6-138.8-169.4 41.2-295.2 195.2-295.2 378.4 0 3.2 0 6.4 0.2 9.6 0.2 0 0.4-0.2 0.6-0.2l26.2-33.2z","M835.2 613.6c26.6 28.4 45.2 63 54.2 100.2 33-42.8 57.4-92.8 70.6-147-42.4 18-89 27.8-137.8 27.8-2.4 0-4.8 0-7.2 0 7 5.8 13.8 12.2 20.2 19z"],"grid":0,"tags":["md-cloudy-night"]},{"paths":["M246.8 366c0.8-0.2 1.6-0.2 2.4-0.4-1 0.2-1.6 0.4-2.4 0.4z","M786.4 438.4c-25.4-129.2-138.6-226.4-274.4-226.4-79.4 0-152 28-201.8 90.8 68.6 5.2 132.2 30.4 181.4 79.6 36.4 36.4 62 81 74.8 129.6h-67c-30.6-87.4-112-150-211.4-150-12 0-28.6 1.4-41.2 4-106.8 22-182.8 110.8-182.8 221 0 124.2 100.4 225 224 225h485.4c103 0 186.6-84 186.6-187.6 0-98.8-76.6-179.2-173.6-186z"],"grid":0,"tags":["md-cloudy"]},{"paths":["M469.2 320v251.4l-89.4-87.2-59.8 59.8 192 192 192-192-59.8-62-89.4 89.4v-251.4h-85.6z","M380.8 708.2l-197-196.2 196.8-196.2-60-59.8-256.6 256 256.8 256 60-59.8zM643.2 708.2l196.8-196.2-196.8-196.2 60-59.8 256.8 256-256.8 256c0 0-60-59.8-60-59.8z"],"grid":0,"tags":["md-code-download"]},{"paths":["M380.8 708.2l-197-196.2 196.8-196.2-60-59.8-256.6 256 256.8 256 60-59.8zM643.2 708.2l196.8-196.2-196.8-196.2 60-59.8 256.8 256-256.8 256c0 0-60-59.8-60-59.8z","M311.2 552h80v-80h-80v80zM712.8 472h-80v80h80v-80zM472 552h80v-80h-80v80z"],"grid":0,"tags":["md-code-working"]},{"paths":["M380.8 708.2l-197-196.2 196.8-196.2-60-59.8-256.6 256 256.8 256 60-59.8zM643.2 708.2l196.8-196.2-196.8-196.2 60-59.8 256.8 256-256.8 256c0 0-60-59.8-60-59.8z"],"grid":0,"tags":["md-code"]},{"paths":["M960 576v-128h-69.4c-4-24.2-10.4-47.6-18.6-70l60-34.6-64-110.8-60 34.6c-15.4-18.6-32.6-35.8-51.2-51.2l34.6-60-110.8-64-34.6 60c-22.4-8.4-45.8-14.6-70-18.6v-69.4h-128v69.4c-24.2 4-47.6 10.4-70 18.6l-34.6-60-110.8 64 34.6 60c-18.6 15.4-35.8 32.6-51.2 51.2l-60-34.6-64 110.8 60 34.6c-8.4 22.4-14.6 45.8-18.6 70h-69.4v128h69.4c4 24.2 10.4 47.6 18.6 70l-60 34.6 64 110.8 60-34.6c15.4 18.6 32.6 35.8 51.2 51.2l-34.6 60 110.8 64 34.6-60c22.4 8.4 45.8 14.6 70 18.6v69.4h128v-69.4c24.2-4 47.6-10.4 70-18.6l34.6 60 110.8-64-34.6-60c18.6-15.4 35.8-32.6 51.2-51.2l60 34.6 64-110.8-60-34.6c8.4-22.4 14.6-45.8 18.6-70h69.4zM754 355.8l-93.8 34.2c-22-26.6-51-47.2-84.2-59v-99.8c74.4 16.8 137.8 62.4 178 124.6zM448 231.2v99.8c-33.2 11.8-62.2 32.4-84.2 59l-93.8-34.2c40.2-62.2 103.6-107.8 178-124.6zM224 512c0-12.2 0.8-24.2 2.2-36l93.8 34.2c0 0.6 0 1.2 0 1.8 0 35.6 9.8 69 26.6 97.6l-64.2 76.4c-36.6-48.4-58.4-108.6-58.4-174zM512 800c-47.4 0-92-11.4-131.6-31.8l64.2-76.4c21 7.8 43.6 12.2 67.4 12.2s46.4-4.4 67.4-12.2l64.2 76.4c-39.6 20.4-84.2 31.8-131.6 31.8zM741.6 686l-64.2-76.4c16.8-28.6 26.6-62 26.6-97.6 0-0.6 0-1.2 0-1.8l93.8-34.2c1.4 11.8 2.2 23.8 2.2 36 0 65.4-21.8 125.6-58.4 174z"],"grid":0,"tags":["md-cog"]},{"paths":["M273 155.4l74 134-283 282 368.8 356.6 304.8-297.2 108.8-22.8-513.6-512-59.8 59.4zM641 571.4h-411.2l205.6-204.6 205.6 204.6z","M846.6 608c0 0-113.4 123-113.4 184.2 0 61.4 50.8 111 113.4 111s113.4-49.8 113.4-111c0-61.2-113.4-184.2-113.4-184.2z"],"grid":0,"tags":["md-color-fill"]},{"paths":["M883.6 240.2l-99.8-99.8c-16.6-16.6-43.6-16.6-60.2 0l-133.2 133.2-82.2-81.6-60.2 60.2 60.6 60.6-380.6 380.6v202.6h202.6l380.6-380.6 60.6 60.6 60.2-60.2-82-82 133.2-133.2c17-16.8 17-43.6 0.4-60.4zM295.2 810.8l-82-82 343.8-343.8 82 82-343.8 343.8z"],"grid":0,"tags":["md-color-filter"]},{"paths":["M512 128c-211.198 0-384 172.802-384 384 0 211.208 172.802 384 384 384 36.272 0 64-27.728 64-64 0-17.062-6.396-32-17.062-42.666-10.666-10.668-17.062-25.606-17.062-42.668 0-36.27 27.728-64 64-64h76.792c117.334 0 213.334-96 213.334-213.332-0.002-187.73-172.794-341.334-384.002-341.334zM277.334 512c-36.272 0-64-27.728-64-64s27.728-64 64-64c36.27 0 64 27.728 64 64s-27.73 64-64 64zM405.334 341.334c-36.272 0-64-27.73-64-64 0-36.272 27.728-64 64-64 36.27 0 64 27.728 64 64 0 36.27-27.73 64-64 64zM618.666 341.334c-36.27 0-64-27.73-64-64 0-36.272 27.73-64 64-64 36.272 0 64 27.728 64 64 0 36.27-27.728 64-64 64zM746.666 512c-36.27 0-64-27.728-64-64s27.73-64 64-64c36.272 0 64 27.728 64 64s-27.728 64-64 64z"],"grid":0,"tags":["md-color-palette"]},{"paths":["M401.6 314.4l-72.8 74.8 494.6 506.8 72.6-74.8z","M362 128h74v136h-74v-136z","M362 524h74v136h-74v-136z","M540 352h138v74h-138v-74z","M611.2 231.6l-51.4-52.6-94.2 96.6 51.2 52.4z","M337.6 275.6l-94.2-96.6-51.2 52.6 94.2 96.4z","M192.2 555.8l51.2 52.4 94.2-96.4-51.2-52.6z","M128 352h130v74h-130v-74z"],"grid":0,"tags":["md-color-wand"]},{"paths":["M512 462.716c-26.884 0-49.286 22.4-49.286 49.284s22.4 49.286 49.286 49.286 49.286-22.4 49.286-49.286-22.402-49.284-49.286-49.284zM512 64c-246.4 0-448 201.6-448 448s201.6 448 448 448 448-201.6 448-448-201.6-448-448-448zM610.568 610.568l-367.368 170.232 170.232-367.358 367.368-170.242-170.232 367.368z"],"grid":0,"tags":["md-compass"]},{"paths":["M861.8 786.8l-382.2-380.4c31.8-81.2 14.2-176.4-53.2-243.4-70.8-70.6-177-84.6-262-45.8l152.2 151.6-106.2 105.8-155.8-151.6c-42.2 84.6-24.6 190.4 46.2 261 67.2 67 162.8 84.6 244.2 53l28.8 28.6-210.4 210.4c-15.2 11.4-15.2 38 3.8 53.2l87.6 87.4c15.2 15.2 38.2 15.2 53.4 0l192.2-224.8 226.8 225.8c14.2 14.2 35.4 14.2 49.6 0l81.4-81.2c17.8-14.2 17.8-39 3.6-49.6z","M988.8 433.2l-69-68.2c-4.4-4.4-11.6-4.4-16 0l-7.4 7.4-37-31.6c0 0 2.4-20-9.8-37.4-12.4-17.4-32.2-39.6-46.4-53.8-14.2-14-68.2-67.8-139.4-102.8-71.4-35.4-121.8-50.8-181.8-50.8v59.4c0 0 57.4 33.2 90.2 59.4 32.6 26.2 33.6 119 33.6 119l-57 57 113 112.2 62-72.6c25.8-7 47.6-7.6 60.4-0.6l27.4 26.6-19.2 19c-4.4 4.4-4.4 11.4 0 15.8l69 68.2c4.4 4.4 11.6 4.4 16 0l111.4-110.4c4.2-4.4 4.2-11.6 0-15.8z"],"grid":0,"tags":["md-construct"]},{"paths":["M512 96c-228.8 0-416 187.2-416 416s187.2 416 416 416 416-187.2 416-416-187.2-416-416-416zM512 220.8c68.6 0 124.8 56.2 124.8 124.8s-56.2 124.8-124.8 124.8-124.8-56.2-124.8-124.8 56.2-124.8 124.8-124.8zM512 811.6c-104 0-195.6-54-249.6-133.2 2-83.2 166.4-129 249.6-129s247.6 45.8 249.6 129c-54 79-145.6 133.2-249.6 133.2z"],"grid":0,"tags":["md-contact"]},{"paths":["M478.416 687.874c-35.56 20.206-76.684 31.752-120.51 31.752-43.818 0-84.934-11.542-120.492-31.74-94.326 28.776-152.128 124.114-173.414 208.114h587.824c-21.278-84-79.074-179.366-173.408-208.126z","M357.906 240.070c-116.958 0-211.772 94.788-211.772 211.716s94.814 211.714 211.772 211.714c116.958 0 211.772-94.788 211.772-211.714 0-116.928-94.816-211.716-211.772-211.716zM357.906 613.046c-67.342 0-124.89-45.026-147.994-101.046h295.988c-23.108 56.022-80.652 101.046-147.994 101.046z","M645.204 768h314.796c-21.276-84-79.074-163.382-173.406-192.144-35.562 20.208-76.686 31.746-120.512 31.746-29.646 0-58.048-5.308-84.336-14.98-14.89 24.94-33.854 51.184-55.948 69.812 52.692 20.274 92.494 65.566 119.406 105.566z","M613.090 400h200.986c-23.108 56-80.654 100.586-147.994 100.586-17.75 0-34.808-3.384-50.75-9.020-2.676 17.418-7.086 34.14-13.040 50.236 20.132 6.348 41.558 9.724 63.79 9.724 116.958 0 211.772-94.82 211.772-211.744 0-116.93-94.814-211.732-211.772-211.732-74.98 0-140.854 39.406-178.486 98.18 63.618 36.536 110.326 99.77 125.494 173.77z"],"grid":0,"tags":["md-contacts"]},{"paths":["M128 742.4h153.59v153.6h102.41v-256h-256v102.4zM281.59 281.6h-153.59v102.4h256v-256h-102.41v153.6zM640 896h102.4v-153.6h153.6v-102.4h-256v256zM742.4 281.6v-153.6h-102.4v256h256v-102.4h-153.6z"],"grid":0,"tags":["md-contract"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416zM738.2 738.2c-60.4 60.6-140.8 93.8-226.2 93.8v-640c85.4 0 165.8 33.2 226.2 93.8 60.6 60.4 93.8 140.8 93.8 226.2s-33.2 165.8-93.8 226.2z"],"grid":0,"tags":["md-contrast"]},{"paths":["M592 96h-239c-44.2 0-81 34.8-81 79v17h-15c-44.2 0-81 34.8-81 79v576c0 44.2 36.8 81 81 81h416c44.2 0 79-36.8 79-81v-15h17c44.2 0 79-36.8 79-81v-399l-256-256zM592 185.2l166.8 166.8h-166.8v-166.8zM688 847c0 9.4-6.8 17-15 17h-416c-8.8 0-17-8.2-17-17v-576c0-8.2 7.6-15 17-15h15v511c0 44.2 20.8 65 65 65h351v15zM784 751c0 9.4-6.8 17-15 17h-416c-8.8 0-17-8.2-17-17v-576c0-8.2 7.6-15 17-15h175v256h256v335z"],"grid":0,"tags":["md-copy"]},{"paths":["M128 736v160h160l471.454-471.458-159.998-159.996-471.456 471.454zM883.204 300.796c17.062-17.062 17.062-42.668 0-59.73l-100.27-100.27c-17.062-17.062-42.668-17.062-59.73 0l-78.936 78.938 159.998 159.996 78.938-78.934z"],"grid":0,"tags":["md-create"]},{"paths":["M704 625.4h75.6v-305.4c0-41.6-34-75.6-75.6-75.6h-305.4v75.6h305.4v305.4zM320 692.4v-596.4h-75.6v148.4h-148.4v75.6h148.4v372.4c0 41.6 34 75.6 75.6 75.6h384v160h75.6v-160h148.4v-75.6h-608z"],"grid":0,"tags":["md-crop"]},{"paths":["M934.6 336.2c-3.6 0-7 0.6-10.2 2l-355.2 184.2c0 0-0.2 0-0.2 0-15.2 9.4-25 25-25 42.8v371.8c0 12.8 11.2 23 25.4 23 4.4 0 8.6-1 12.2-2.8 0.4-0.2 0.8-0.4 1-0.6l350-185.6c16.4-9 27.4-25.4 27.4-44.2v-367.6c0-12.8-11.4-23-25.4-23z","M908.6 237l-363.4-163.4c0 0-21.4-9.6-33.2-9.6s-33 9.6-33 9.6l-363.8 163.4c0 0-16 6.6-16 19 0 13.2 16.6 23 16.6 23l371 195.6c7.6 3.4 16.2 5.2 25.2 5.2 9.2 0 17.8-2 25.4-5.4l370.8-195.8c0 0 15-8 15-23 0.2-12.6-14.6-18.6-14.6-18.6z","M455 522.4l-355.4-184.4c-3-1.2-6.6-2-10.2-2-14 0-25.4 10.2-25.4 23v367.6c0 18.8 11 35.2 27.4 44.2l0.4 0.2 349.4 185.4c3.8 2.2 8.4 3.4 13.2 3.4 14 0 25.4-10.4 25.4-23v-371.6c0.2-17.8-9.8-33.6-24.8-42.8z"],"grid":0,"tags":["md-cube"]},{"paths":["M406.2 316.6c10.4-22.4 16.2-47 16.2-73.4 0-99-80.2-179.2-179.2-179.2s-179.2 80.2-179.2 179.2 80.2 179.2 179.2 179.2c26.4 0 51-5.8 73.4-16.2l105.8 105.8-105.8 105.8c-22.4-10.4-47-16.2-73.4-16.2-99 0-179.2 80.2-179.2 179.2s80.2 179.2 179.2 179.2 179.2-80.2 179.2-179.2c0-26.4-5.8-51-16.2-73.4l105.8-105.8 313.6 313.6h134.4v-44.8l-553.8-553.8zM243.2 332.8c-49.2 0-89.6-39.8-89.6-89.6s40.4-89.6 89.6-89.6 89.6 39.8 89.6 89.6-40.4 89.6-89.6 89.6zM243.2 870.4c-49.2 0-89.6-39.8-89.6-89.6s40.4-89.6 89.6-89.6 89.6 39.8 89.6 89.6-40.4 89.6-89.6 89.6zM512 534.4c-12.6 0-22.4-9.8-22.4-22.4s9.8-22.4 22.4-22.4c12.6 0 22.4 9.8 22.4 22.4s-9.8 22.4-22.4 22.4zM825.6 108.8l-268.8 268.8 89.6 89.6 313.6-313.6v-44.8h-134.4z"],"grid":0,"tags":["md-cut"]},{"paths":["M874.666 64h-725.332c-46.938 0-85.334 38.394-85.334 85.332v565.334c0 46.938 38.396 85.334 85.334 85.334h277.332l-85.332 96v64h341.332v-64l-85.332-96h277.332c46.938 0 85.334-38.396 85.334-85.334v-565.334c0-46.938-38.396-85.332-85.334-85.332zM874.666 640h-725.332v-490.668h725.332v490.668z"],"grid":0,"tags":["md-desktop"]},{"paths":["M512 96c-229.6 0-416 186.4-416 416s186.4 416 416 416 416-186.4 416-416-186.4-416-416-416zM512 699.2c-103.6 0-187.2-83.6-187.2-187.2s83.6-187.2 187.2-187.2 187.2 83.6 187.2 187.2-83.6 187.2-187.2 187.2zM512 470.4c-22.8 0-41.6 18.8-41.6 41.6s18.8 41.6 41.6 41.6 41.6-18.8 41.6-41.6-18.8-41.6-41.6-41.6z"],"grid":0,"tags":["md-disc"]},{"paths":["M576 96h-304c-44.184 0-80 35.816-80 80v672c0 44.184 35.816 80 80 80h480c44.184 0 80-35.816 80-80v-496l-256-256zM544 384v-224l224 224h-224z"],"grid":0,"tags":["md-document"]},{"paths":["M775.162 279.424l-61.652-61.424-279.684 278.638 61.662 61.438 279.674-278.652zM962.344 218l-466.856 462.938-182.78-182.102-61.654 61.43 244.434 245.734 528.512-526.576-61.656-61.424zM0 560.266l246.642 245.734 61.658-61.426-244.432-245.738-63.868 61.43z"],"grid":0,"tags":["md-done-all"]},{"paths":["M832 399h-182.8v-271h-274.4v271h-182.8l320 316.2 320-316.2zM192 805.6v90.4h640v-90.4h-640z"],"grid":0,"tags":["md-download"]},{"paths":["M256 352h512v256h-512v-256z","M896 192h-768c-17.6 0-32 14.4-32 32v512c0 17.6 13.8 32 31.6 32h768.4c17.6 0 32-14.4 32-32v-512c0-17.6-14.4-32-32-32zM832 672h-640v-384h640v384z","M160 928h114l45-128h-112.8z","M558.8 96h-93.6l-23 64h139.6z","M750 928h114l-46-128h-113z","M464 800h96v64h-96v-64z"],"grid":0,"tags":["md-easel"]},{"paths":["M512 64c-140.8 0-352 266.4-352 513.8s140.8 382.2 352 382.2 352-134.8 352-382.2-211.2-513.8-352-513.8z"],"grid":0,"tags":["md-egg"]},{"paths":["M430.938 665.604l59.726 59.728 213.336-213.332-213.336-213.334-59.726 59.73 110.938 110.938h-413.876v85.332h411.728l-108.79 110.938zM810.668 128h-597.336c-46.936 0-85.332 38.396-85.332 85.332v170.668h85.332v-170.666h597.336v597.336h-597.336v-170.67h-85.332v170.668c0 46.936 38.396 85.332 85.332 85.332h597.336c46.936 0 85.332-38.396 85.332-85.332v-597.336c0-46.936-38.396-85.332-85.332-85.332z"],"grid":0,"tags":["md-exit"]},{"paths":["M793.59 793.6h-153.59v102.4h256v-256h-102.41z","M793.6 230.41v153.59h102.4v-256h-256v102.41z","M230.41 230.4h153.59v-102.4h-256v256h102.41z","M230.4 793.59v-153.59h-102.4v256h256v-102.41z"],"grid":0,"tags":["md-expand"]},{"paths":["M512.2 289.6c112.4 0 203.8 90.6 203.8 202.2 0 26.2-5.2 51-14.6 74l119 118c61.6-51 110-116.8 139.8-192-70.6-177.4-244.6-303.2-448.4-303.2-57 0-111.6 10.2-162.2 28.2l88 87.4c23.2-9.2 48.2-14.6 74.6-14.6zM104.8 179.4l111.8 110.8c-67.8 52-120.8 121.6-152.6 201.6 70.4 177.4 244.4 303.2 448.2 303.2 63.2 0 123.4-12.2 178.4-34l136.6 135 51.8-51.4-722.6-716.6-51.6 51.4zM330 402.8l63.2 62.6c-2 8.4-3.2 17.4-3.2 26.2 0 67 54.6 121.2 122.2 121.2 9 0 18-1.2 26.4-3.2l63.2 62.6c-27.2 13.4-57.4 21.4-89.6 21.4-112.4 0-203.8-90.6-203.8-202.2-0-31.6 8.2-61.4 21.6-88.6zM505.6 371.4l128.4 127.4 0.8-6.4c0-67-54.6-121.2-122.2-121.2l-7 0.2z"],"grid":0,"tags":["md-eye-off"]},{"paths":["M512 210c-203.6 0-376.8 124.8-448 302 71.2 177.2 244.4 302 448 302s376.8-124.8 448-302c-71.2-177.2-244.4-302-448-302zM512 713.4c-112 0-203.6-90.6-203.6-201.4s91.6-201.4 203.6-201.4 203.6 90.6 203.6 201.4-91.6 201.4-203.6 201.4zM512 391.2c-67.2 0-122.2 54.4-122.2 120.8s55 120.8 122.2 120.8 122.2-54.4 122.2-120.8-55-120.8-122.2-120.8z"],"grid":0,"tags":["md-eye"]},{"paths":["M960 512l-435.2-292v584l435.2-292zM64 220v584l435.2-292-435.2-292z"],"grid":0,"tags":["md-fastforward"]},{"paths":["M800 352c0-159-129-288-288-288s-288 129-288 288c0 142.8 103.8 261.2 240 284v100h-144v96h144v128h96v-128h144v-96h-144v-100c136.2-22.8 240-141.2 240-284zM320 352c0-105.8 86.2-192 192-192s192 86.2 192 192-86.2 192-192 192-192-86.2-192-192z"],"grid":0,"tags":["md-female"]},{"paths":["M898.4 416h-52.4v-64l-28.8-96h-51.2v-64l-30-96h-448l-30 96v64h-51.2l-28.8 96v64h-52.4l-29.6 96v330.6c0 47 70.4 85.4 117.4 85.4h629.4c43.6 0 85.4-39.4 85.4-82v-334l-29.8-96zM352 192h320v64h-320v-64zM270 352h484v64h-484v-64zM834 576h-165.2c-14.8 73-79.4 128-156.8 128s-142-55-156.8-128h-165.2v-64h644v64z"],"grid":0,"tags":["md-filing"]},{"paths":["M752 128v85.334h-80v-85.334h-320v85.334h-80v-85.334h-80v768h80v-85.332h80v85.332h320v-85.332h80v85.332h80v-768h-80zM352 725.334h-80v-85.334h80v85.334zM352 554.668h-80v-85.334h80v85.334zM352 384h-80v-85.332h80v85.332zM752 725.334h-80v-85.334h80v85.334zM752 554.668h-80v-85.334h80v85.334zM752 384h-80v-85.332h80v85.332z"],"grid":0,"tags":["md-film"]},{"paths":["M156.2 411.2c-4.8 0-9.8-1.2-14.2-3.8-13.4-7.8-18-24.8-10.2-38.2 35.6-60 143.8-200.2 380.2-200.2 102.4 0 192.2 27.2 266.8 80.8 61.4 44 95.8 93.8 112.2 117.8 8.8 12.8 5.4 30-7.4 38.8-12.8 8.6-30.4 5.4-39.2-7.4-29.8-43.2-120.2-174.4-332.4-174.4-207.2 0-300.8 120.8-331.4 172.6-5.2 9.2-14.6 14-24.4 14z","M631 960c-2.4 0-4.6-0.2-7-0.8-171.4-43-235.4-216.2-238-223.4l-0.4-1.6c-1.4-5-35.8-123.8 17-193.4 24.2-31.8 61-48 109.6-48 45.2 0 77.8 14.2 100.2 43.6 18.4 24 25.8 53.6 33 82.2 15 59.4 25.8 90.6 88.2 93.8 27.4 1.4 45.4-14.8 55.6-28.6 27.6-37.6 32.4-99 11.6-153-26.8-70-121.6-201.8-288.8-201.8-71.4 0-137 23.2-189.6 66.8-43.6 36.2-78.2 87.2-94.8 139.6-30.8 97.6 9.6 251 10 252.4 4 14.8-5 30.2-20 34-15 4-30.6-5-34.6-19.8-1.8-7-45-170.6-9.4-283.4 38.8-122.2 158.4-245.4 338.4-245.4 83.2 0 161.8 28.6 227.4 82.6 50.8 42 92.4 98.4 114 154.8 27.6 72 20.2 152.8-18.8 205.6-26 35.2-63 53.6-104 51.6-106.8-5.4-126-80.8-140-135.8-14.4-56.4-23.6-83.6-78.6-83.6-30.2 0-51.4 8.4-64.6 25.8-18 23.8-19.4 61-17.4 88 2 28.2 8 51 9.4 55.6 4.4 11.2 61.6 153 198.6 187.4 15.2 3.8 24.2 19 20.4 33.8-3.4 12.6-14.8 21-27.4 21z","M411 947.2c-7.6 0-15-3-20.6-8.8-68.6-72.8-107.4-154.2-122-256v-0.6c-8.2-67.4 3.8-162.8 62.6-228.4 43.4-48.4 104.4-73 181-73 90.6 0 161.8 42.6 206.2 123 32.2 58.4 38.6 116.6 38.8 119 1.6 15.4-9.8 29-25.2 30.6s-29.4-9.6-31-24.8v0c0-0.6-5.6-50.6-33-99.4-34.4-61.4-86.8-92.6-156-92.6-59.8 0-106.6 18.2-138.8 54.2-46.4 51.8-55.4 131.6-49 184.4 12.8 90 47 161.6 107.4 225.6 10.6 11.2 10 29-1.4 39.4-5.2 4.8-12.2 7.4-19 7.4z","M727 867c-60 0-111-16.8-151.8-50.2-82-66.8-91.2-175.6-91.6-180.2-1.2-15.4 10.4-28.8 26-30s29 10.2 30.2 25.6c0.2 1.6 8.4 90.6 71.6 141.8 37.4 30.2 87.4 42.2 149 35.2 15.4-1.8 29.4 9.2 31.2 24.6s-9.4 29.2-24.8 30.8c-13.6 1.6-27 2.4-39.8 2.4z","M774.4 125.2c-23.4-15.4-106.4-61.2-262.4-61.2-163.8 0-247 50.6-265.4 63.4-1.2 0.8-2.4 1.6-3.4 2.6-0.2 0.2-0.4 0.2-0.4 0.2v0c-5.8 5.2-9.4 12.6-9.4 20.8 0 15.4 12.6 27.8 28.2 27.8 6.2 0 11.8-2 16.4-5.2v0l-0.2 0.2c0.8-0.6 72.6-54 234.2-54s233.4 53.6 234.2 54l-0.2-0.2 0.4-0.4c4.8 3.6 10.6 5.6 17 5.6 15.6 0 28.2-12.4 28.2-27.8 0-11.6-7-21.6-17.2-25.8z"],"grid":0,"tags":["md-finger-print"]},{"paths":["M792 166.4c-27.6 3.4-62.2 8.4-99.2 8.4-57.6 0-110-13.6-163-24.4-53.8-11-109.4-22.4-168.2-22.4-117.2 0-157 24.2-161.2 26.8l-8.4 5.8v735.4h96v-356.4c19.4-2.4 43.8-4 73.8-4 54.6 0 105.6 20 159.6 31 55.2 11.2 112 23 173.8 23 36.8 0 69.2-4.8 96.8-8 15-1.8 28-3.4 40-5.4v-415.8c-10 2-25 4.2-40 6z"],"grid":0,"tags":["md-flag"]},{"paths":["M786.6 444.2l-0.4 20.8c-1.6 23.4-15.8 86.8-44.2 109.4 14-30.4 34.6-94.4 20.4-165.4-39.2-195-187.4-277.8-376.4-309l-34.4-4.4c79 94.4 112.2 163.4 99.4 233.6-4.6 25.2-20 46.8-28 63.2 0 0 4.8-25.8 4-57.4-0.6-28.4-13.2-62-36-79.2 7 36.8-1.6 67-18.2 95.4-49.4 84.4-170.8 115.6-180.8 271.6v7.6c0 107.4 51.2 198 137.4 250-13.6-24.6-24-70.4-11.4-120.4 8 47.4 28 72 49.8 103.6 16.4 23.4 38.2 38.6 66.2 49.8s62 14.4 95.8 14.4c111.6 0 182.8-36.2 238.2-101s64.2-136 64.2-212.8-17-121.8-45.6-169.8z"],"grid":0,"tags":["md-flame"]},{"paths":["M320 96v448h128v384l256-512h-128l128-320h-384z"],"grid":0,"tags":["md-flash"]},{"paths":["M873.8 708.8l-201.8-324.8v-192h64v-96h-448v96h64v192l-199.8 324.8c-16.8 31.8-25 62.8-24.2 91.2 2.2 73 57.4 128 130.2 128h511.8c72.6 0 124.2-55.2 126-128 0.6-28.4-5.2-59.4-22.2-91.2zM310.2 608l59-96h286.2l59.6 96h-404.8z"],"grid":0,"tags":["md-flask"]},{"paths":["M810.2 512c50.4-23.8 85.8-74.2 85.8-133.8 0-82-67.2-148.6-150-148.6-31.8 0-60.6 9.6-85.2 26.2l1.2-11.2c0-82-67.2-148.6-150-148.6s-150 66.6-150 148.6l1.2 11.2c-24-16.6-53.4-26.2-85.2-26.2-82.8 0-150 66.6-150 148.6 0 59.4 35.4 110 85.8 133.8-50.4 23.8-85.8 74.2-85.8 133.8 0 82 67.2 148.6 150 148.6 31.8 0 60.6-9.6 85.2-26.2l-1.2 11.2c0 82 67.2 148.6 150 148.6s150-66.6 150-148.6l-1.2-11.2c24 16.6 53.4 26.2 85.2 26.2 82.8 0 150-66.6 150-148.6 0-59.6-35.4-110-85.8-133.8zM512 660.6c-82.8 0-150-66.6-150-148.6s67.2-148.6 150-148.6 150 66.6 150 148.6c0 82-67.2 148.6-150 148.6z"],"grid":0,"tags":["md-flower"]},{"paths":["M874.668 288h-362.656l-85.336-96h-277.344c-46.938 0-85.332 38.396-85.332 85.334v469.332c0 46.938 38.394 85.334 85.332 85.334h725.336c46.938 0 85.332-38.396 85.332-85.334v-373.332c0-46.938-38.394-85.334-85.332-85.334zM896 746.666c0 11.564-9.77 21.334-21.332 21.334h-725.336c-11.564 0-21.332-9.77-21.332-21.334v-394.666h746.668c11.562 0 21.332 9.77 21.332 21.334v373.332z"],"grid":0,"tags":["md-folder-open"]},{"paths":["M426.676 192h-277.344c-46.938 0-85.332 38.396-85.332 85.334v469.332c0 46.938 38.394 85.334 85.332 85.334h725.336c46.938 0 85.332-38.396 85.332-85.334v-373.332c0-46.938-38.394-85.334-85.332-85.334h-362.656l-85.336-96z"],"grid":0,"tags":["md-folder"]},{"paths":["M512 96c-229.4 0-416 186.6-416 416s186.6 416 416 416 416-186.6 416-416-186.6-416-416-416zM254 476.4l78.4 35.8 34.2 133.8-31.2 58.6-114.4-1.4c-29.8-45.2-48.6-97-55-150.6l88-76.2zM688.6 704.6l-31.2-58.6 34.2-134 78.2-35.6 88 76.2c-6.2 53.6-25.2 105.4-55 150.6l-114.2 1.4zM753.4 412.2l-87.2 39.2-122.2-103.2v-94.4l95.8-65.2c59.6 23.8 112.8 64.6 151.2 115.6l-37.6 108zM382.6 188.8l95.4 65v94.4l-122 103-86-39.2-37.4-107.2c38.6-52.2 90.2-92 150-116zM436.8 852c-1.4-0.4-2.6-0.6-4-1l-41-110.2 29.4-58.8h181.6l30 60.6-39.6 107.8c-2 0.4-4 1-6 1.4-23 4.6-54 7.6-80.8 8.2-23.4-0.2-46.8-3-69.6-8z"],"grid":0,"tags":["md-football"]},{"paths":["M416 800h192v-95.988h-192v95.988zM64 224v95.988h896v-95.988h-896zM224 561.566h576v-99.11h-576v99.11z"],"grid":0,"tags":["md-funnel"]},{"paths":["M312 430h-48v62h-62v48h62v60h48v-60h60v-48h-60z","M738.6 288h-453.2c-122.4 0-221.4 93-221.4 222.8 0 130 99 225.2 221.4 225.2h453c122.4 0 221.4-95.2 221.4-225.2 0.2-129.8-98.8-222.8-221.2-222.8zM288.4 633c-66.2 0-120-54.2-120-121s53.8-121 120-121 120 54.2 120 121c0 66.8-53.6 121-120 121zM694.6 538.2c-14.4 14.4-38 14.4-52.4 0s-14.4-38 0-52.4c14.4-14.4 38-14.4 52.4 0s14.4 38 0 52.4zM769.6 613.2c-14.4 14.4-38 14.4-52.4 0s-14.4-38 0-52.4c14.4-14.4 38-14.4 52.4 0s14.6 38 0 52.4zM769.6 463.2c-14.4 14.4-38 14.4-52.4 0s-14.4-38 0-52.4c14.4-14.4 38-14.4 52.4 0s14.6 38 0 52.4zM844.8 538.2c-14.4 14.4-38 14.4-52.4 0s-14.4-38 0-52.4c14.4-14.4 38-14.4 52.4 0s14.4 38 0 52.4z"],"grid":0,"tags":["md-game-controller-a"]},{"paths":["M326 320h-48v62h-62v48h62v60h48v-60h60v-48h-60z","M934.2 408.2c-10.4-126.2-95.4-216.2-214.2-216.2h-416c-118.8 0-203.6 90-214 216.2 0 0-26 269.4-26 327.8s43 96 96 96c26.2 0 50-10.6 68-27.8v0h-0.6l156.6-162.2h256l156.6 162-0.6 0.2c18 17.2 41.8 27.8 68 27.8 53 0 96-40.6 96-96s-25.8-327.8-25.8-327.8zM302 524c-66.2 0-120-54.2-120-121s53.8-121 120-121 120 54.2 120 121c0 66.8-53.8 121-120 121zM676.2 429.2c-14.4 14.4-38 14.4-52.4 0s-14.4-38 0-52.4c14.4-14.4 38-14.4 52.4 0s14.4 38 0 52.4zM751.2 504.2c-14.4 14.4-38 14.4-52.4 0s-14.4-38 0-52.4c14.4-14.4 38-14.4 52.4 0s14.4 38 0 52.4zM751.2 354.2c-14.4 14.4-38 14.4-52.4 0s-14.4-38 0-52.4c14.4-14.4 38-14.4 52.4 0s14.4 38 0 52.4zM826.2 429.2c-14.4 14.4-38 14.4-52.4 0s-14.4-38 0-52.4c14.4-14.4 38-14.4 52.4 0s14.4 38 0 52.4z"],"grid":0,"tags":["md-game-controller-b"]},{"paths":["M832 320c0-70.6-57.4-128-128-128s-128 57.4-128 128c0 47.4 25.8 88.6 64 110.8v17.2c0 39.8-15.6 67.4-50.6 89.8-30.8 19.6-76.2 34.2-135 43-28 4.2-51.4 12-70.4 21.4v-299.4c38.2-22.2 64-63.4 64-110.8 0-70.6-57.4-128-128-128s-128 57.4-128 128c0 47.4 25.8 88.6 64 110.8v418.4c-38.2 22.2-64 63.4-64 110.8 0 70.6 57.4 128 128 128s128-57.4 128-128c0-33.2-12.6-63.4-33.4-86.2 3.8-9.8 19.4-32.6 58.8-38.6 77.6-11.6 137.8-31.8 184.6-61.6 72-45.6 110-114 110-197.6v-17.2c38.2-22.2 64-63.4 64-110.8zM320 112c44.2 0 80 35.8 80 80s-35.8 80-80 80-80-35.8-80-80 35.8-80 80-80zM320 912c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zM704 400c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"],"grid":0,"tags":["md-git-branch"]},{"paths":["M960 448h-199.6c-28.4-110.4-128.4-192-247.4-192s-219 81.6-247.4 192h-201.6v128h201.6c28.4 110.4 128.4 192 247.4 192s219-81.6 247.4-192h199.6v-128zM513 672c-88 0-159.6-71.8-159.6-160s71.6-160 159.6-160c88 0 159.6 71.8 159.6 160s-71.6 160-159.6 160z"],"grid":0,"tags":["md-git-commit"]},{"paths":["M384 764h-44c-49.2 0-58-7.2-67.6-19.2-11-13.8-16.4-38.2-16.4-108.4v-333.6c38.2-22.2 64-63.4 64-110.8 0-70.6-57.4-128-128-128s-128 57.4-128 128c0 47.4 25.8 88.6 64 110.8v333.6c0 92.8 7.4 141.6 44.2 188 39.8 50.2 90 71.6 167.8 71.6h44v128l192-192-192-192v124zM192 112c44.2 0 80 35.8 80 80s-35.8 80-80 80-80-35.8-80-80 35.8-80 80-80z","M896 721.2v-339.6c0-92.8-7.4-141.6-44.2-188-39.8-50.2-90-69.6-167.8-69.6h-44v-124l-192 192 192 192v-128h44c49.2 0 58 5.2 67.6 17.2 11 13.8 16.4 38.2 16.4 108.4v339.6c-38.2 22.2-64 63.4-64 110.8 0 70.6 57.4 128 128 128s128-57.4 128-128c0-47.4-25.8-88.6-64-110.8zM832 912c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"],"grid":0,"tags":["md-git-compare"]},{"paths":["M768 448c-47.4 0-88.8 25.8-110.8 64-36.6-1-104.8-8.2-151-36.2-64.6-38.8-129.2-106.2-174-181 31.4-23.4 52-60.6 52-102.8 0-70.6-57.4-128-128-128s-128.2 57.4-128.2 128c0 47.4 25.8 88.6 64 110.8v418.4c-38.2 22.2-64 63.4-64 110.8 0 70.6 57.4 128 128 128s128-57.4 128-128c0-47.4-25.8-88.6-64-110.8v-232.8c37.4 38.8 78.2 72 120 97.2 77.6 46.8 174 53.8 217.2 54.6 22.2 38.2 63.4 63.8 110.8 63.8 70.6 0 128-57.4 128-128s-57.4-128-128-128zM176 192c0-44.2 35.8-80 80-80s80 35.8 80 80-35.8 80-80 80-80-35.8-80-80zM336 832c0 44.2-35.8 80-80 80s-80-35.8-80-80 35.8-80 80-80 80 35.8 80 80zM768 656c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"],"grid":0,"tags":["md-git-merge"]},{"paths":["M896 192c0-70.6-57.4-128-128-128s-128 57.4-128 128c0 47.2 25.8 88.6 64 110.8v105.6l-192 96-192-96v-105.6c38.2-22.2 64-63.6 64-110.8 0-70.6-57.4-128-128-128s-128 57.4-128 128c0 47.2 25.8 88.6 64 110.8v184.8l256 128v105.6c-38.2 22.2-64 63.6-64 110.8 0 70.6 57.4 128 128 128s128-57.4 128-128c0-47.2-25.8-88.6-64-110.8v-105.6l256-128v-184.8c38.2-22.2 64-63.6 64-110.8zM256 112c44.2 0 80 35.8 80 80s-35.8 80-80 80-80-35.8-80-80 35.8-80 80-80zM512 912c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zM768 272c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"],"grid":0,"tags":["md-git-network"]},{"paths":["M832 753.2v-339.6c0-92.8-7.4-141.6-44.2-188-39.8-50.2-90-71.6-167.8-71.6h-44v-122l-192 192 192 192v-130h44c49.2 0 58 7.2 67.6 19.2 11 13.8 16.4 38.2 16.4 108.4v339.6c-38.2 22.2-64 63.4-64 110.8 0 70.6 57.4 128 128 128s128-57.4 128-128c0-47.4-25.8-88.6-64-110.8zM768 944c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z","M256 96c-70.6 0-128 57.4-128 128 0 47.4 25.8 88.6 64 110.8v418.4c-38.2 22.2-64 63.4-64 110.8 0 70.6 57.4 128 128 128s128-57.4 128-128c0-47.4-25.8-88.6-64-110.8v-418.4c38.2-22.2 64-63.4 64-110.8 0-70.6-57.4-128-128-128zM256 944c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80zM256 304c-44.2 0-80-35.8-80-80s35.8-80 80-80 80 35.8 80 80-35.8 80-80 80z"],"grid":0,"tags":["md-git-pull-request"]},{"paths":["M960 352h-896v96h22l10 43c32 135 81 181 192 181s192-34.8 192-181v-43c0 0 3-32 32-32s32 32 32 32v43.6c0 146 84.2 180.4 194 180.4s158-50 190-180.4l10-43.6h22v-96z"],"grid":0,"tags":["md-glasses"]},{"paths":["M512 96c-229.752 0-416 186.25-416 416s186.248 416 416 416c229.75 0 416-186.25 416-416s-186.25-416-416-416zM468.902 865.998c-78.928-9.452-151.956-44.784-209.038-101.864-67.348-67.348-104.436-156.89-104.436-252.134 0-85.74 30.072-166.848 85.202-231.318 1.42 17.034 4.926 35.296 4.028 48.35-3.28 47.59-7.976 77.374 19.88 117.524 10.852 15.638 13.518 38.056 18.8 56.156 5.166 17.708 25.804 26.996 40.038 37.906 28.718 22.018 56.192 47.61 86.644 66.988 20.098 12.79 32.652 19.152 26.766 43.678-4.734 19.724-6.056 31.874-16.26 49.446-3.114 5.362 11.754 39.836 16.702 44.784 14.996 14.994 29.876 28.75 46.222 42.25 25.342 20.938-2.462 48.144-14.548 78.234zM764.134 764.134c-51.266 51.266-115.398 84.972-185.112 98.162 9.88-24.432 27.472-46.14 43.79-58.724 14.194-10.952 31.972-32.018 39.386-48.704 7.408-16.664 17.222-31.11 27.154-46.434 14.13-21.798-34.838-54.672-50.706-61.562-35.708-15.502-62.588-36.42-94.322-58.75-22.61-15.908-68.514 8.308-94.040-2.834-34.962-15.266-63.766-41.792-94.156-64.678-31.36-23.618-29.844-51.152-29.844-85.994 24.564 0.906 59.508-6.798 75.816 12.956 5.146 6.234 22.84 34.084 34.684 24.188 9.676-8.086-7.17-40.498-10.424-48.118-10.010-23.43 22.808-32.568 39.606-48.456 21.92-20.728 68.94-53.236 65.224-68.094s-47.048-56.954-72.498-50.386c-3.814 0.984-37.394 36.194-43.882 41.718 0.172-11.492 0.344-22.982 0.52-34.474 0.11-7.256-13.536-14.704-12.902-19.384 1.6-11.828 34.524-33.294 42.714-42.714-5.738-3.586-25.318-20.404-31.244-17.936-14.348 5.98-30.552 10.1-44.9 16.078 0-4.976-0.604-9.65-1.324-14.266 28.752-12.73 59.174-21.582 90.62-26.304l28.168 11.32 19.888 23.602 19.848 20.466 17.35 5.59 27.558-25.99-7.106-18.554v-16.678c54.5 7.916 105.968 28.248 151.044 59.6-8.064 0.722-16.926 1.908-26.924 3.18-4.13-2.44-9.428-3.548-13.93-5.246 13.062 28.084 26.686 55.78 40.528 83.492 14.786 29.602 47.586 61.354 53.346 92.602 6.788 36.832 2.078 70.288 5.792 113.622 3.576 41.73 47.048 89.144 47.048 89.144s20.074 6.838 36.768 4.456c-15.562 61.566-47.466 118.028-93.538 164.104z"],"grid":0,"tags":["md-globe"]},{"paths":["M819.2 128h-614.4c-42.2 0-76.8 34.6-76.8 76.8v614.4c0 42.2 34.6 76.8 76.8 76.8h614.4c42.2 0 76.8-34.6 76.8-76.8v-614.4c0-42.2-34.6-76.8-76.8-76.8zM358.4 819.2h-153.6v-153.6h153.6v153.6zM358.4 588.8h-153.6v-153.6h153.6v153.6zM358.4 358.4h-153.6v-153.6h153.6v153.6zM588.8 819.2h-153.6v-153.6h153.6v153.6zM588.8 588.8h-153.6v-153.6h153.6v153.6zM588.8 358.4h-153.6v-153.6h153.6v153.6zM819.2 819.2h-153.6v-153.6h153.6v153.6zM819.2 588.8h-153.6v-153.6h153.6v153.6zM819.2 358.4h-153.6v-153.6h153.6v153.6z"],"grid":0,"tags":["md-grid"]},{"paths":["M948.2 796.4l-488.6-460.8c0 0 17.6-115.4 52.4-143.6 35-28.4 96-64 96-64v-64c-64 0-117.6 16.6-193.8 54.6-76 37.8-133.6 95.6-148.8 110.8s-36.2 39-49.4 57.8-10.6 40.2-10.6 40.2l-39.4 34-8-8c-4.6-4.6-12.4-4.6-17 0l-73.6 73.6c-4.6 4.6-4.6 12.4 0 17l118.8 118.8c4.6 4.6 12.4 4.6 17 0l73.6-73.6c4.6-4.6 4.6-12.4 0-17l-20.6-20.6 29.2-28.6c13.6-7.4 50.8-17.8 78.2-10.2l429.8 534.6c16.2 16.4 40.6 16.4 57 0l93.6-94.2c20.6-16 20.6-44.6 4.2-56.8z"],"grid":0,"tags":["md-hammer"]},{"paths":["M901.358 547c-29.17-29.154-72.108-31.78-101.278-2.624l-83.374 83.328c-21.704 21.672-47.86 21.718-63.128 3.704-10.114-11.936-6.122-48.748-3.288-72.098l41.814-343.698c3.734-30.706-18.14-60.37-48.86-64.102-30.716-3.734-58.644 19.878-62.382 50.578l-46.122 269.954c-2.41 6.716-7.58 7.876-8.162-1.164l-15.698-350.878c0-30.93-25.084-56-56.028-56-30.946 0-56.030 25.070-56.030 56l-1.104 353.504c0.292 4.080-3.208 5.248-3.84 0.588l-49.846-275.938c-5.5-30.438-34.646-52.406-65.096-46.906-30.454 5.496-50.678 36.374-45.182 66.806l44.386 322.91c0.046 5.744-1.882 9.026-4.616 1.662l-66.218-177.034c-10.36-29.144-42.392-46.13-71.552-35.778-29.158 10.354-44.402 44.122-34.046 73.262l116.084 379.25c0.606 2.092 1.248 4.17 1.906 6.236l0.242 0.78c0.022 0.062 0.050 0.116 0.070 0.176 32.148 98.948 125.13 170.482 234.844 170.482 70.232 0 143.182-24.756 198.714-67.344 0.002 0 0.006-0.004 0.006-0.004 59.98-36.102 252.142-242.694 252.142-242.694 29.174-29.154 24.816-73.798-4.358-102.958z"],"grid":0,"tags":["md-hand"]},{"paths":["M512 96c-230.874 0-416 187.2-416 416s185.126 416 416 416 416-187.2 416-416c0-228.8-187.198-416-416-416zM512 844.8c-183.036 0-332.808-149.766-332.808-332.8 0-183.036 149.774-332.8 332.808-332.8s332.808 149.764 332.808 332.8c0 183.036-149.772 332.8-332.808 332.8zM657.6 470.4c35.366 0 62.402-27.036 62.402-62.4s-27.038-62.4-62.402-62.4c-35.364 0-62.4 27.036-62.4 62.4s27.036 62.4 62.4 62.4zM366.4 470.4c35.364 0 62.4-27.036 62.4-62.4s-27.038-62.4-62.4-62.4c-35.366 0-62.402 27.036-62.402 62.4s27.038 62.4 62.402 62.4zM512 740.8c97.766 0 178.872-60.328 212.162-145.602h-424.324c33.29 85.274 114.396 145.602 212.162 145.602z"],"grid":0,"tags":["md-happy"]},{"paths":["M512 96c-212 0-384 176.4-384 394.2v306.6c0 72.6 57.2 131.4 128 131.4h128v-352.2h-170.6v-85.8c0-169.4 133.6-306.6 298.6-306.6s298.6 137 298.6 306.6v85.8h-170.6v352h128c70.8 0 128-58.6 128-131.4v-306.4c0-217.8-172-394.2-384-394.2z"],"grid":0,"tags":["md-headset"]},{"paths":["M699.2 128c-72.8 0-141.436 33.484-187.2 87.894-45.766-54.41-114.4-87.894-187.2-87.894-128.964 0-228.8 100.442-228.8 230.19 0 159.032 141.436 286.696 355.672 483.388l60.328 54.422 60.328-54.422c214.234-196.694 355.672-324.358 355.672-483.388 0-129.748-99.836-230.19-228.8-230.19zM537.672 786.514l-8.438 7.746-17.234 15.546-17.232-15.544-8.428-7.738c-100.836-92.564-187.922-172.508-245.492-243.988-55.914-69.426-80.848-126.28-80.848-184.346 0-45.73 16.844-87.862 47.43-118.632 30.484-30.668 72.166-47.558 117.37-47.558 52.268 0 103.94 24.334 138.22 65.090l48.98 58.232 48.978-58.232c34.282-40.756 85.952-65.090 138.222-65.090 45.206 0 86.886 16.89 117.372 47.556 30.584 30.772 47.428 72.902 47.428 118.634 0 58.066-24.934 114.918-80.844 184.342-57.568 71.48-144.65 151.418-245.484 243.982z"],"grid":0,"tags":["md-heart-outline"]},{"paths":["M512 896l-60.328-54.422c-214.236-196.694-355.672-324.358-355.672-483.388 0-129.748 99.836-230.19 228.8-230.19 72.798 0 141.434 33.484 187.2 87.894 45.764-54.41 114.398-87.894 187.2-87.894 128.964 0 228.8 100.442 228.8 230.19 0 159.032-141.438 286.696-355.672 483.388l-60.328 54.422z"],"grid":0,"tags":["md-heart"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416-186.2-416-416-416zM634 808l-24.4-79.2c26-11.6 49.8-28 70.6-48.8s37.2-44.6 48.8-70.6l79 24.2c-15.8 38.6-39.4 74-69.8 104.4-30.2 30.6-65.6 54.2-104.2 70zM390 216l24.4 79.2c-26 11.6-49.8 28-70.6 48.8s-37.2 44.6-48.8 70.6l-79-24.2c15.8-38.6 39.4-74 69.8-104.4 30.2-30.6 65.6-54.2 104.2-70zM512 384c70.6 0 128 57.4 128 128s-57.4 128-128 128-128-57.4-128-128c0-70.6 57.4-128 128-128zM738.2 285.8c30.4 30.4 53.8 65.8 69.8 104.2l-79 24.4c-11.8-26-28-49.8-48.8-70.6s-44.6-37.2-70.6-48.8l24.2-79c38.6 15.8 74 39.4 104.4 69.8zM285.8 738.2c-30.4-30.2-54-65.6-69.8-104.2l79-24.4c11.8 26 28 49.8 48.8 70.6s44.6 37.2 70.6 48.8l-24.2 79c-38.6-15.8-74-39.4-104.4-69.8z"],"grid":0,"tags":["md-help-buoy"]},{"paths":["M512 96c-229.6 0-416 186.4-416 416s186.4 416 416 416 416-186.4 416-416-186.4-416-416-416zM554 762h-84v-84h84v84zM553.6 636h-83.2c0-134 124.8-124.4 124.8-207.6 0-45.8-37.4-83.4-83.2-83.4s-83.2 39-83.2 83h-83.2c0-92 74.4-166 166.4-166s166.4 74.2 166.4 166.2c0 104-124.8 115.8-124.8 207.8z"],"grid":0,"tags":["md-help-circle"]},{"paths":["M578 896h-132v-130h132v130zM576 700h-128c0-202 192-190.2 192-318 0-70.4-57.6-126.8-128-126.8s-128 60.8-128 128.8h-128c0-142 114.6-256 256-256s256 112.8 256 254c0 159.8-192 178-192 318z"],"grid":0,"tags":["md-help"]},{"paths":["M416 896v-256h192v256h195.2v-384h124.8l-416-384-416 384h124.8v384z"],"grid":0,"tags":["md-home"]},{"paths":["M256.2 512l256 448 256-448z","M784 322c6-18 9.4-45.4 9.4-65.8 0-106.2-86-192.2-192.2-192.2-62.8 0-118.4 30-153.6 76.6 0 0-18.2 28-21.6 58l-6.8-2c-4.6-18-7.4-40 3.2-63-14.8-5-18.8-5.6-35.2-5.6-83.4 0-151.2 67.6-151.2 151.2 0 12.6 1.6 31 4.6 42.8-27.8 7-48.6 32.2-48.6 62v0c0 35.2 28.8 64 64 64h512c35.2 0 64-28.8 64-64v0c0-29.6-20.4-54.8-48-62z"],"grid":0,"tags":["md-ice-cream"]},{"paths":["M896 810.666v-597.332c0-46.938-38.396-85.334-85.334-85.334h-597.332c-46.938 0-85.334 38.396-85.334 85.334v597.332c0 46.938 38.396 85.334 85.334 85.334h597.332c46.938 0 85.334-38.396 85.334-85.334zM362.666 576l106.668 128 149.332-192 192 256h-597.332l149.332-192z"],"grid":0,"tags":["md-image"]},{"paths":["M915.2 280.4l-165-8-9.6-107.6c-2-22.6-22.2-38.4-45.8-36.6l-591.8 48.6c-23.6 2-40.6 21-38.8 43.4l42.4 471.6c2 22.6 22.4 38.4 45.8 36.6l30-2.4-4.8 91.6c-1.2 25.2 18.4 45.6 44.8 47l660.2 31.4c26.4 1.2 48.2-17.2 49.6-42.4l27.8-526.6c1.2-25-18.6-45.4-44.8-46.6zM205.4 291l-14.2 269.6-35 49.4-32.2-356c0-0.4 0-0.6 0-1s0-0.6 0-1c2-10 8.8-18 19.2-18.8l522-42.8c10.4-0.8 19.4 6 21 15.8 0 0.4 0.6 0.4 0.6 0.8 0 0.2 0.6 0.4 0.6 0.8l5.4 61.6-438-21c-26.4-0.8-48.2 17.6-49.4 42.6zM873.4 764.8l-169.6-199-74.8 68.6-138.4-161.6-245.4 261.4 20.8-398.2c0 0 0-0.6 0-0.8 2-10.8 12.4-18.6 23.8-18l582.4 28c11.6 0.6 20.6 9.4 20.8 20.4 0 0.4 0.6 0.6 0.6 1l-20.2 398.2z","M768 512c35.2 0 64-28.8 64-64s-28.6-64-64-64c-35.2 0-64 28.6-64 64s28.6 64 64 64z"],"grid":0,"tags":["md-images"]},{"paths":["M869.4 376c-37.6-36-87.6-56-141-56-53.2 0-103.2 19.8-140.8 55.8l-35.2 31.8 66.2 64.2 34.2-31c20.2-19.2 47-30 75.4-30s55.2 10.6 75.4 29.8c20 19.2 30.8 44.6 30.8 71.6s-11 52.2-30.8 71.2c-20.2 19.2-47 30-75.4 30s-55.2-10.6-75.4-29.8l-216.4-207.6c-37.8-36-87.8-56-140.8-56-53.4 0-103.4 19.8-141 56-37.8 36.2-58.6 84.4-58.6 136 0 51.4 20.8 99.8 58.6 136 37.6 36 87.6 56 141 56s103.4-19.8 140.8-56l75.6-72.2 75.4 72.2c37.8 36 87.8 56 140.8 56 53.4 0 103.4-19.8 140.8-55.8 38-36.2 58.8-84.4 58.8-136 0.2-51.6-20.6-100-58.4-136.2zM371 583.4c-20.2 19.2-47 30-75.4 30s-55.2-10.6-75.4-29.8c-20-19.2-30.8-44.6-30.8-71.6s11-52.2 30.8-71.2c20.2-19.2 47-30 75.4-30s55.2 10.6 75.4 29.8l74.8 71.6-74.8 71.2z"],"grid":0,"tags":["md-infinite"]},{"paths":["M512 96c-229.6 0-416 186.4-416 416s186.4 416 416 416 416-186.4 416-416c0-229.6-186.4-416-416-416zM554 720h-84v-250h84v250zM554 388h-84v-84h84v84z"],"grid":0,"tags":["md-information-circle"]},{"paths":["M464 470h96v274h-96v-274z","M464 280h96v96h-96v-96z"],"grid":0,"tags":["md-information"]},{"paths":["M512 328.6c-101.2 0-183.4 82.2-183.4 183.4s82.2 183.4 183.4 183.4 183.4-82.2 183.4-183.4c0-101.2-82.2-183.4-183.4-183.4z","M875.6 249.2c0 48.38-39.22 87.6-87.6 87.6s-87.6-39.22-87.6-87.6c0-48.38 39.22-87.6 87.6-87.6s87.6 39.22 87.6 87.6z","M890.6 339.6c-14.8 16.8-33.8 30-55.2 38 17.2 41.4 26.8 86.8 26.8 134.4 0 193.2-157.2 350.4-350.4 350.4s-350.4-157.2-350.4-350.4c0-193.2 157.2-350.4 350.4-350.4 53.8 0 104.6 12.2 150.2 33.8 9-21 23-39.2 40.6-53.2-57-29.4-121.8-46.2-190.6-46.2-229.8 0-416 186.2-416 416s186.2 416 416 416 416-186.2 416-416c0-61.4-13.4-119.8-37.4-172.4z"],"grid":0,"tags":["md-ionic"]},{"paths":["M957.4 539.6c-9.4-66.8-37.4-123.6-71.4-119.6 13.6 30.6 24.2 73.6 20.6 150.6-3-54-13.2-104.8-36-150.6-67.4-135-211.4-224.4-372.6-215.4-180.4 10-325.4 139.4-361.2 306.6l-24 3.4c-36.2 5-56.6 72.8-45.6 151.4s49.4 138.4 85.6 133.4l33.2-4.6c72.8 117.6 206.8 193 355.6 184.8 179.2-9.8 323.4-137.8 360.4-303.4l15.4-1c31.8-5.2 49.8-65.6 40-135.6zM163.2 528.8c14.2 11.2 53 37 62.8 115.2s-17.8 117.8-30 134.2c12.6-31 13-78 6-129.4-6.8-50-19-93.4-38.8-120zM549.4 771.4c-17.8 1-33.2-12.6-34.2-30.4s12.6-32.8 30.6-33.8c17.8-1 33.2 12.6 34.2 30.4s-12.8 33-30.6 33.8zM719.4 761.8c-17.8 1-33.2-12.6-34.2-30.4s12.6-32.8 30.6-33.8c17.8-1 33.2 12.6 34.2 30.4 1 17.6-12.8 32.8-30.6 33.8z","M321.2 123.4c0 0 0.2 0 0 0 0.2 0.2 0.2 0.4 0.2 0.4s0 0 0 0c0.2 0.4 0.4 0.8 0.6 1 0 0 0 0.2 0 0.2 0.8 2.2 2.4 4 4.8 5.8 4.2 3 10.4 5 18 6.2 7.2 1.2 15.8 1.4 25 1 2 0 4-0.2 6.2-0.4-0.8-1-1.8-1.8-2.6-2.8-1 0-1.8 0-2.8 0-9 0.2-17.4-0.4-24.4-1.8-7.4-1.4-13.6-3.8-17.6-7.2-1.2-1-2-2-2.8-3-0.4-1.4-0.4-3 0-4.8 1-4.8 5-10 11.4-15.6 5.8-4.8 13.4-9.8 22.8-14.6 1.8-1 3.6-1.8 5.6-2.8 0.4-0.2 0.6-0.2 1-0.4-1.6 7-2 14.4-0.6 21.8 4.8 25 26.4 42.4 51 43.2l10.4 55 22.6-4.2-10.4-55c22.6-9.6 36.4-33.6 31.6-58.6-1.4-7.4-4.2-14-8.2-19.8-11.2-1.6-32.8-1.6-61.4 4.4 2.2-0.6 4.4-1.4 6.8-2 16-4.4 31.4-7.4 45.2-8.8 1.2-0.2 2.6-0.2 3.8-0.4 2.4-0.2 5-0.4 7.4-0.6 0.4 0 0.8 0 1.2 0 8.6-0.4 16.2-0.2 22.6 0.8 5 0.6 9.4 1.6 12.8 3-1.2 2-2 4.2-2 6.6 0 5.8 3.8 10.6 9 12.2 0 0 0 0 0 0-1.2 2-2.6 4-4.4 6s-3.8 3.8-6 5.8c-2.2 1.8-4.8 3.8-7.4 5.6l-13.6 7.8c-0.2 1-0.4 2.2-0.6 3.2 0.2 0 0.4-0.2 0.6-0.2l17.6-9.8c2.6-1.6 5-3.4 7.2-5 2.4-2 4.6-3.8 6.6-5.8s3.6-4 5-5.8c0.2-0.4 0.4-0.8 0.6-1.2 6.4-0.8 11.2-6 11.2-12.6 0-7-5.8-12.8-12.8-12.8-2 0-4 0.6-5.8 1.4-4.2-2.6-10-4.4-17.2-5.8-9-1.6-20-2-32.6-1.4-1.4 0-3 0.2-4.4 0.4s-2.8 0.4-4.2 0.4c-11.2-7.2-25-10.4-39.2-7.8-16.6 3-30 13.6-37.2 27.2-2.8 1.2-5.4 2.2-8 3.4-1.4 0.6-2.8 1.2-4.2 2-12.4 6.2-22.4 12.6-29.2 19-6.6 6-10.4 12-11.2 17.4-0.4 3 0 5.8 1.6 8.2-0 0.8 0.2 1.2 0.4 1.6z"],"grid":0,"tags":["md-ionitron"]},{"paths":["M960 64c0 0-46.8-1.4-118.6 54.2-33.4 25.8-351.6 255.4-351.6 255.4l-337.6-8.4-88.2 78.8 219.6 110.4-17.2 21.6-175.8 0.2-14.4 81 126.2 97.4-53.2 119.6 120-52.8 97.4 126.2 81-14.4 0.2-175.6 21.8-17 110.6 219.4 78.6-88.2-8.4-337.4c0 0 229.8-318 255.6-351.2 55.4-72.2 54-119.2 54-119.2z"],"grid":0,"tags":["md-jet"]},{"paths":["M498.4 448c-28.4-80.4-110.2-144-200.4-144-114.4 0-202 93.6-202 208s91.6 208 206 208c90.2 0 168.2-63.6 196.4-144h205.6v128h138.2v-128h85.8v-128h-429.6zM303.2 581c-38 0-69-31-69-69s31-69 69-69 69 31 69 69-31 69-69 69z"],"grid":0,"tags":["md-key"]},{"paths":["M512 797c-44.6 0-81 36.6-81 81.4s36.4 81.4 81 81.4 81-36.6 81-81.4c0-44.6-36.4-81.4-81-81.4zM273 64c-44.6 0-81 36.6-81 81.4s36.4 81.4 81 81.4 81-36.6 81-81.4-36.4-81.4-81-81.4zM273 308.4c-44.6 0-81 36.6-81 81.4s36.4 81.4 81 81.4 81-36.6 81-81.4-36.4-81.4-81-81.4zM273 552.8c-44.6 0-81 36.6-81 81.4s36.4 81.4 81 81.4 81-36.6 81-81.4c0-44.8-36.4-81.4-81-81.4zM751 227c44.6 0 81-36.6 81-81.4s-36.4-81.6-81-81.6-81 36.6-81 81.4 36.4 81.6 81 81.6zM512 552.8c-44.6 0-81 36.6-81 81.4s36.4 81.4 81 81.4 81-36.6 81-81.4c0-44.8-36.4-81.4-81-81.4zM751 552.8c-44.6 0-81 36.6-81 81.4s36.4 81.4 81 81.4 81-36.6 81-81.4c0-44.8-36.4-81.4-81-81.4zM751 308.4c-44.6 0-81 36.6-81 81.4s36.4 81.4 81 81.4 81-36.6 81-81.4-36.4-81.4-81-81.4zM512 308.4c-44.6 0-81 36.6-81 81.4s36.4 81.4 81 81.4 81-36.6 81-81.4-36.4-81.4-81-81.4zM512 64c-44.6 0-81 36.6-81 81.4s36.4 81.4 81 81.4 81-36.6 81-81.4-36.4-81.4-81-81.4z"],"grid":0,"tags":["md-keypad"]},{"paths":["M874.668 832c46.938 0 85.332-38.394 85.332-85.332v-533.332c0-46.938-38.394-85.336-85.332-85.336h-725.336c-46.938 0-85.332 38.398-85.332 85.336v533.332c0 46.938 38.394 85.332 85.332 85.332h-149.332c0 46.938 128 64 192 64h640c64 0 192-17.062 192-64h-149.332zM149.332 213.336h725.336v543.996h-725.336v-543.996zM512 869.332c-23.458 0-42.666-19.208-42.666-42.668 0-23.458 19.208-42.664 42.666-42.664s42.666 19.208 42.666 42.664c0 23.46-19.208 42.668-42.666 42.668z"],"grid":0,"tags":["md-laptop"]},{"paths":["M832 575.2c0-333.4-320-511.2-320-511.2s-320 177.8-320 511.2c0 237.6 162.6 281 256 286.4v98.4h128v-98.6c93.4-5.2 256-48.6 256-286.2z"],"grid":0,"tags":["md-leaf"]},{"paths":["M149.2 512c0-76.6 62.2-138.8 138.8-138.8h176v-85.2h-176c-123.6 0-224 100.4-224 224s100.4 224 224 224h176v-85.2h-176c-76.6 0-138.8-62.2-138.8-138.8zM320 556h384v-88h-384v88zM736 288h-176v85.2h176c76.6 0 138.8 62.2 138.8 138.8s-62.2 138.8-138.8 138.8h-176v85.2h176c123.6 0 224-100.4 224-224s-100.4-224-224-224z"],"grid":0,"tags":["md-link"]},{"paths":["M816 128h-608c-44.182 0-80 35.816-80 80v608c0 44.184 35.818 80 80 80h608c44.184 0 80-35.816 80-80v-608c0-44.184-35.816-80-80-80zM608 736h-320v-96h320v96zM736 560h-448v-96h448v96zM736 384h-448v-96h448v96z"],"grid":0,"tags":["md-list-box"]},{"paths":["M160 560h512v96h-512v-96z","M160 368h640v96h-640v-96z","M160 176h704v96h-704v-96z","M160 752h576v96h-576v-96z"],"grid":0,"tags":["md-list"]},{"paths":["M512 352c-88.008 0-160.002 72-160.002 160 0 88.008 71.994 160 160.002 160 88.010 0 159.998-71.992 159.998-160 0-88-71.988-160-159.998-160zM893.876 469.334c-19.21-177.062-162.148-320-339.21-339.198v-66.136h-85.332v66.134c-177.062 19.198-320 162.136-339.208 339.198h-66.126v85.334h66.124c19.208 177.062 162.144 320 339.208 339.208v66.126h85.332v-66.124c177.062-19.208 320-162.146 339.21-339.208h66.126v-85.334h-66.124zM512 810.666c-164.274 0-298.668-134.396-298.668-298.666 0-164.272 134.394-298.666 298.668-298.666 164.27 0 298.664 134.396 298.664 298.666s-134.394 298.666-298.664 298.666z"],"grid":0,"tags":["md-locate"]},{"paths":["M752 372h-40v-80c0-110-90-200-200-200s-200 90-200 200v80h-40c-44.004 0-80 35.996-80 80v400c0 44.004 35.996 80 80 80h480c44.004 0 80-35.996 80-80v-400c0-44.004-35.996-80-80-80zM512 736c-44.004 0-80-35.996-80-80s35.996-80 80-80 80 35.996 80 80-35.996 80-80 80zM636.004 372h-248.008v-80c0-68.008 56.006-124.004 124.004-124.004 68.008 0 124.004 55.996 124.004 124.004v80z"],"grid":0,"tags":["md-lock"]},{"paths":["M512 96c-85.8 0-168.4 26-238.4 75-68.4 48-120.4 114.4-150.2 192.2l-7.4 20.8h91.4l3.8-10c16.4-35.6 38.8-67.8 67-96 62.4-62.4 145.4-96.8 233.8-96.8s171.4 34.4 233.8 96.8c62.4 62.4 96.8 145.4 96.8 233.8 0 88.2-34.4 171.4-96.8 233.8s-145.4 96.8-233.8 96.8c-88.2 0-171.2-34.4-233.8-96.8-28-28-50.6-60.2-67-95.8l-3.8-10h-91.4l7.2 20.8c29.8 77.8 81.8 144.2 150.2 192.2 70.2 49.4 152.6 75.2 238.6 75.2 229.4 0 416-186.6 416-416s-186.6-416-416-416z","M96 554.8h379.4l-87.2 89.4 59.8 59.8 192-192-192-192-62 59.8 89.4 89.4h-379.4v85.6z"],"grid":0,"tags":["md-log-in"]},{"paths":["M384 554.8h379.4l-87.2 89.4 59.8 59.8 192-192-192-192-62 59.8 89.4 89.4h-379.4v85.6z","M511.4 842.6c-88.2 0-171-34.4-233.4-96.8s-96.6-145.4-96.6-233.8c0-88.2 34.4-171.4 96.6-233.8 62.4-62.4 145.2-96.8 233.4-96.8 88 0 170.6 34.2 233 96.4l60.6-60.6c-17-16.8-35.6-32.4-55.4-46.4-70.2-48.8-152.4-74.8-238.2-74.8-229 0-415.4 186.6-415.4 416s186.4 416 415.4 416c85.8 0 168-26 238-75 20-14 38.4-29.4 55.4-46.4l-60.4-60.4c-62.2 62.2-145 96.4-233 96.4z","M896.008 513.694l-1.697-1.697 1.697-1.697 1.697 1.697-1.697 1.697z"],"grid":0,"tags":["md-log-out"]},{"paths":["M767.2 197.6c-63-66-151.2-101.2-255.2-101.6-103.8 0.4-192 35.6-255 101.6-63.4 66.4-97 160-97 270.4 0 87 3.6 138.4 25.8 231.6 0 0 45.4 151.4 71 208.2 7 15.6 14.8 23.6 31 18.6 12.8-4 93.6-35.8 109.4-43.2 15.8-7.2 23.2-17.2 17.8-30.4-7.6-18.4-67.8-191.2-67.8-191.2-16.8-72.6-23.2-107.8-23.2-188.6 0-56.4 19.6-108.2 55.4-145.8 35-36.6 82-56.8 132.6-56.8s97.6 20.2 132.6 56.8c35.8 37.6 55.4 89.2 55.4 145.6 0 80-6.4 128-23.4 188.8s-64.4 180.2-67.8 191.2c-3.4 11.2 4.2 25 17.8 30.4s98.6 39.2 109.4 43.2c10.8 4 21.2 1.2 29-15.4 8-16.6 49.2-122.8 73-211.4 24-88.6 26-144.6 26-231.6 0-110.4-33.4-203.8-96.8-270.4zM346.2 839.4l-45.8 19.2c-13.8-32.6-34.4-86.4-51.8-154.4l44-13 53.6 148.2zM723.4 858.6l-45.8-19.2c14.4-33.2 38.2-90.2 53.2-148.2l44 13c-16.8 67.8-37.4 121.8-51.4 154.4z"],"grid":0,"tags":["md-magnet"]},{"paths":["M960 403.334c0-29.866-14.938-57.606-40.542-72.532l-407.458-202.802-407.458 202.802c-23.48 14.926-40.542 42.666-40.542 72.532v407.332c0 46.938 38.394 85.334 85.332 85.334h725.336c46.938 0 85.332-38.396 85.332-85.334v-407.332zM512 608l-342.738-224 342.738-170.666 342.738 170.666-342.738 224z"],"grid":0,"tags":["md-mail-open"]},{"paths":["M874.664 160h-725.328c-46.938 0-85.336 38.396-85.336 85.334v533.332c0 46.938 38.398 85.334 85.336 85.334h725.328c46.938 0 85.336-38.396 85.336-85.334v-533.332c0-46.938-38.398-85.334-85.336-85.334zM864 341.334l-352 234.666-352-234.666v-85.334l352 234.666 352-234.666v85.334z"],"grid":0,"tags":["md-mail"]},{"paths":["M832 96h-256v96h188.2l-213.4 213.2c-47-33.4-104.6-53.2-166.8-53.2-159 0-288 129-288 288s129 288 288 288 288-129 288-288c0-62.2-19.8-119.8-53.2-166.8l213.2-213.4v188.2h96v-352h-96zM384 832c-105.8 0-192-86.2-192-192s86.2-192 192-192 192 86.2 192 192-86.2 192-192 192z"],"grid":0,"tags":["md-male"]},{"paths":["M512 213.2c41.2 0.2 74.6-33.2 74.6-74.6 0-41.2-33.4-74.6-74.6-74.6s-74.6 33.4-74.6 74.6c0 41.2 33.4 74.6 74.6 74.6z","M586.8 230h-149.6c-56.4 0-93.2 49.6-93.2 96.8v227.2c0 44 62 44 62 0v-210h12v571.2c0 60.8 84 58.8 86 0v-329.2h16v329.4c3.4 62.4 86 56.4 86-0.2v-571.2h10v210c0 44 64 44 64 0v-227.2c0-47-37-96.8-93.2-96.8z"],"grid":0,"tags":["md-man"]},{"paths":["M874.666 128c-4.352 0-8.792 2.738-18.352 6.414s-216.314 83.19-216.314 83.19l-256-89.604-241.062 81.062c-8.544 2.146-14.938 10.666-14.938 21.332v644.272c0 12.792 8.542 21.334 21.332 21.334 3.656 0 13.010-4.66 18.174-6.638s216.494-82.968 216.494-82.968l256 89.606 241.062-81.062c8.542-2.146 14.938-10.668 14.938-21.334v-644.272c0-12.79-8.542-21.332-21.334-21.332zM640 810.666l-256-89.604v-507.73l256 89.606v507.728z"],"grid":0,"tags":["md-map"]},{"paths":["M547 304.2h-451l108.2-207.8h481.4z","M685.6 754.4c0 95.656-77.544 173.2-173.2 173.2s-173.2-77.544-173.2-173.2c0-95.656 77.544-173.2 173.2-173.2s173.2 77.544 173.2 173.2z","M697.8 598.2l230.2-294-138.6-207.8-276.6 415.6c64.6 0 125.4 25.4 171 71 5 5 9.6 10 14 15.2z","M411.6 533.2l-107-161.2h-207.8l180.2 323c10.4-42.4 32.2-81.2 64-112.8 20.8-20.6 44.6-37.2 70.6-49z"],"grid":0,"tags":["md-medal"]},{"paths":["M703.8 512l216.2-124.8-96-166.4-216 124.8v-249.6h-192v249.6l-216-124.8-96 166.4 216.2 124.8-216.2 124.8 96 166.4 216-124.8v249.6h192v-249.6l216 124.8 96-166.4z"],"grid":0,"tags":["md-medical"]},{"paths":["M704 288v-79.2c0-44.8-36-80.8-80.8-80.8h-222.4c-44.8 0-80.8 36-80.8 80.8v79.2h-224v527.2c0 44.8 36 80.8 80.8 80.8h670.4c44.8 0 80.8-36 80.8-80.8v-527.2h-224zM400 208h224v80h-224v-80zM672 656h-112v112h-96v-112h-112v-96h112v-112h96v112h112v96z"],"grid":0,"tags":["md-medkit"]},{"paths":["M764.2 286.8l-46.2 46c29.4 29.4 47.8 70.4 47.8 115.2s-18.4 85.8-47.8 115.2l46.2 46.2c41.2-41.2 66.8-98.4 66.8-161.2s-25.6-120.2-66.8-161.4z","M856.4 198l-45.4 45.4c52.2 52.2 84.6 124.8 84.6 204.6 0 79.6-32.2 152.2-84.6 204.6l45.4 45.4c63.8-64.2 103.6-152.6 103.6-250s-39.6-185.8-103.6-250z","M640 368.2v-208.2h-64l-192 160h-256l-64 32v224l64 32 160 256h96l-60-256h60l192 128h64v-208.2c36.8-3.4 64-37.8 64-79.8s-27.2-76.4-64-79.8z"],"grid":0,"tags":["md-megaphone"]},{"paths":["M128 768h768v-85.332h-768v85.332zM128 554.668h768v-85.334h-768v85.334zM128 256v85.33h768v-85.33h-768z"],"grid":0,"tags":["md-menu"]},{"paths":["M735.902 709.308l-361.902-361.226v0.692l-221.776-221.712-48.382 48.082 270.158 269.796v57.632c0 75.58 62.242 137.428 137.82 137.428 17.22 0 33.904-3.24 49.13-9.090l64.778 64.548c-34.666 17.586-73.624 27.72-113.564 27.72-125.972 0-242.73-97.18-242.73-233.18h-77.888c0 154.002 124.454 285.404 274.454 306.028v163.974h92v-163.974c44-6.704 86.132-22.444 123.254-45.244l190.556 190.156 48.066-48-67.694-67.57-116.432-115.918 116.448 115.918-116.296-116.060z","M650 502.572v-301.144c0-75.58-62.418-137.428-138-137.428s-138 61.848-138 137.428v50.488l274.218 273.936c1.34-7.582 1.782-15.358 1.782-23.28z","M832.878 490h-77.882c0 40.992-10.996 79.352-29.862 112.394l55.144 55.032c33.046-48.22 52.6-105.574 52.6-167.426z","M919.998 892.854l-67.794-67.486 67.71 67.57z"],"grid":0,"tags":["md-mic-off"]},{"paths":["M512 640c75.424 0 137.142-61.848 137.142-137.428v-301.144c0-75.58-61.718-137.428-137.142-137.428s-137.142 61.848-137.142 137.428v301.144c0 75.58 61.718 137.428 137.142 137.428zM754.278 489.096c0 137.428-116.564 233.63-242.278 233.63s-242.278-96.204-242.278-233.63h-77.722c0 155.746 123.438 286.306 274.288 306.93v163.974h91.426v-163.974c150.848-22.904 274.286-151.184 274.286-306.93h-77.722z"],"grid":0,"tags":["md-mic"]},{"paths":["M768 224v-55.2c0-58-49-104.8-109.6-104.8h-292.6c-60.8-0-109.8 46.8-109.8 104.8v55.2h304v74h-304v86h304v74h-304v86h304v74h-304v83.6c0 58 49 104.4 109.8 104.4h60.2v154h172v-154h60.4c60.6 0 109.6-46.4 109.6-104.4v-83.6h-112v-74h112v-86h-112v-74h112v-86h-112v-74h112z"],"grid":0,"tags":["md-microphone"]},{"paths":["M390 250c0-52.6 10.6-102.6 29.8-148.2-182.4 44.2-317.8 208.4-317.8 404.2 0 229.6 186.4 416 416 416 195.8 0 360-135.4 404.2-317.8-45.6 19.2-95.8 29.8-148.2 29.8-212 0-384-172-384-384z"],"grid":0,"tags":["md-moon"]},{"paths":["M592 272c0-44.004-35.996-80-80-80s-80 35.996-80 80 35.996 80 80 80 80-35.996 80-80zM592 752c0-44.004-35.996-80-80-80s-80 35.996-80 80 35.996 80 80 80 80-35.996 80-80zM592 512c0-44.004-35.996-80-80-80s-80 35.996-80 80 35.996 80 80 80 80-35.996 80-80z"],"grid":0,"tags":["md-more"]},{"paths":["M960 512l-192-192v128h-192v-192h128l-192-192-192 192h128v192h-192v-128l-192 192 192 192v-128h192v192h-128l192 192 192-192h-128v-192h192v128z"],"grid":0,"tags":["md-move"]},{"paths":["M512 128v450.2c-25.2-14.6-54.2-23.4-85.4-23.4-94.2 0-170.6 76.4-170.6 170.6s76.4 170.6 170.6 170.6 170.6-76.4 170.6-170.6v-426.8h170.8v-170.6h-256z"],"grid":0,"tags":["md-musical-note"]},{"paths":["M320 128v515.2c-16.4-5.4-34.4-8.2-53.2-8.2-76.6 0-138.8 54.2-138.8 130.8s62.2 130.2 138.8 130.2c76.6 0 139.2-56.4 139.2-138.2v-357.8h404v243.2c-16.4-5.4-34.4-8.2-53.2-8.2-76.6 0-138.8 54.2-138.8 130.8s62.2 130.2 138.8 130.2c76.6 0 139.2-56.4 139.2-138.2v-629.8h-576zM810 320h-404v-106h404v106z"],"grid":0,"tags":["md-musical-notes"]},{"paths":["M512 128l-320 738.124 29.876 29.876 290.124-128 290.124 128 29.876-29.876z"],"grid":0,"tags":["md-navigate"]},{"paths":["M720 512h32v96h-32v-96z","M224 608h259.2l-96-96h-163.2z","M729 120.2c-0.8-0.4-1.4-0.8-2-1.2-21.8-12-45-21.4-68.8-29.6-3.6-1.2-7.2-2.4-10.8-3.6-42.8-13.6-88.2-21.8-135.4-21.8-247.4 0-448 200.6-448 448 0 168.6 93.2 315.2 230.8 391.6 0.8 0.4 1.4 1 2.2 1.4 21.8 12 45 21.4 68.8 29.6 3.6 1.2 7.2 2.4 10.8 3.6 42.8 13.6 88 21.8 135.4 21.8 247.4 0 448-200.6 448-448 0-168.6-93.2-315.4-231-391.8zM512 852.8c-18.6 0-36.8-1.8-54.4-4.8-19.6-3.2-38.6-8.2-57-14.6-3.8-1.2-7.6-2.4-11.2-3.8-13-5-25.8-10.6-38-17.2-107.2-57.4-180.2-170.4-180.2-300.6 0-74.4 24.8-142.8 65.4-198.8l474.4 474.4c-56.2 40.6-124.6 65.4-199 65.4zM787.6 710.8l-474.4-474.4c56-40.4 124.2-65.2 198.8-65.2 18.6 0 36.6 1.8 54.4 4.8 19.6 3.2 38.6 8.2 57 14.6 3.6 1.2 7.4 2.4 11.2 3.8 12.4 4.8 24.4 10 36 16.2 108.4 57 182.4 170.6 182.4 301.6-0.2 74.4-25 142.6-65.4 198.6z","M704 512h-68l68 68z","M768 512h32v96h-32v-96z","M720.2 425.4c-17.6-8.2-44-11.4-91.2-11.4-2.4 0-4.8 0-7.2 0-25.4 0.2-31.8-0.2-40-12.2-5.6-8.4-2-29.6 7.4-43.8 3.2-4.8 3.6-11.2 0.8-16.4s-8.2-8.4-14-8.6c-0.2 0-18.8-0.2-36.6-7.8-21.2-9-31.2-24.2-31.2-46.2 0-51.6 43.6-55.4 45.6-55.4v-32c-24 0-77.6 22-77.6 87.4 0 35 18 62 51.4 76 8.4 3.4 16.8 5.8 24 7.2-6.6 19.6-7.2 41.8 3.4 57.4 18 26.6 40.6 26.4 66.6 26.2 2.2 0 4.6 0 7 0 52.6 0 69.2 4.6 77.8 8.6 11.4 5.2 13.6 15 13.2 31.4 0 1.4 0 0.8 0 2h32c0-0.8 0-0.8 0-2 0-14.2 0.6-45.6-31.4-60.4z","M800 488c0-51.4-6-78.4-18.2-99.2-17.2-28.8-44.8-44.8-77.8-44.8h-34.8c5.8-16.6 10.8-39.6 7-61.8-6.4-37.6-38.2-60-86.2-60v32c42 0 52.2 18.2 54.8 33.4 5 29-13.6 64.2-13.8 64.6-2.8 5-2.6 11 0.2 15.8s8.2 7.8 13.8 7.8h59c21.8 0 38.8 9.8 50.2 29.2 6.2 10.6 13.8 27 13.8 82.8h32v0.2z"],"grid":0,"tags":["md-no-smoking"]},{"paths":["M512 927.312c45.628 0 82.95-37.312 82.95-83.312h-165.9c-0 46 37.322 83.312 82.95 83.312z","M262.166 214.344l0.106 0.148-66.092-65.938-48.172 48.212 126.084 126.306c-20.316 37.97-32.092 81.32-32.092 127.068v229.11l-82 83.312v41.438h595.486l72.364 72.66 48.158-48.602-24.208-24.058h0.632l-590.266-589.656z","M782 450.14c0-127.052-90-235.354-208-262.436v-29.156c0-35.412-26.742-62.486-62-62.486-35.256 0-62 27.074-62 62.486v29.156c-30 6.876-58.096 19.002-83.5 35.326l415.5 415.68v-188.57z"],"grid":0,"tags":["md-notifications-off"]},{"paths":["M514 240.942c14.166 0 47.822 8.958 47.822 8.958 91.178 20.894 155.356 104.878 155.356 199.7v255.224l34.218 34.374h-478.792l34.218-34.374v-255.224c0-94.82 64.178-178.806 155.356-199.7 0 0 36.086-8.958 47.822-8.958zM512 96c-35.204 0-62.118 27.036-62.118 62.4v29.118c-118.030 27.046-207.060 135.202-207.060 262.082v228.8l-82.822 83.2v41.6h704v-41.6l-82.822-83.2v-228.8c0-126.88-89.032-235.036-207.060-262.082v-29.118c0-35.364-26.914-62.4-62.118-62.4v0zM594.822 844.8h-165.646c0 45.762 37.266 83.2 82.824 83.2s82.822-37.438 82.822-83.2v0z"],"grid":0,"tags":["md-notifications-outline"]},{"paths":["M512 928c45.558 0 82.822-37.438 82.822-83.2h-165.646c-0 45.762 37.266 83.2 82.824 83.2zM781.178 678.4v-228.8c0-126.88-89.032-235.036-207.060-262.082v-29.118c0-35.364-26.914-62.4-62.118-62.4s-62.118 27.036-62.118 62.4v29.118c-118.030 27.046-207.060 135.202-207.060 262.082v228.8l-82.822 83.2v41.6h704v-41.6l-82.822-83.2z"],"grid":0,"tags":["md-notifications"]},{"paths":["M672 544c0-59.6-32.6-111.4-80.8-139l146.2-248.2c-66.2-38.6-143.2-60.8-225.4-60.8-82.4 0-159.8 22.4-226.2 61.2l143.2 250c-46.2 28-77 78.8-77 136.8h-288c0 166.6 93.8 306.8 228.8 384l140.2-244.8c23.4 13.2 50.2 20.8 79 20.8 28.6 0 55.4-7.6 78.6-20.6l140.6 244.6c135-77.2 228.8-217.4 228.8-384h-288z"],"grid":0,"tags":["md-nuclear"]},{"paths":["M714.4 471.2l-165-165.2h-1.6c-16.2-12-36.4-20.6-56.8-20.6-27.4 0-52.2 12.6-68.6 32.6h-1.2l-315.2 510.2v1.6c-6 12.4-10 26.6-10 41.6 0 48.8 39.4 88.6 88.6 88.6 18.8 0 36-5.8 54.8-18.2l465.8-336.2c21.8-16.6 34.8-43.2 34.8-72 0-24-9.4-46.4-25.6-62.4z","M928 290.2l-58.4-98-73.2 40.6 63-111.8-98.2-57-134.6 255.6 82.6 82.8z"],"grid":0,"tags":["md-nutrition"]},{"paths":["M810.68 810.664h-597.36v-597.328h266.68v-85.336h-266.68c-46.938 0-85.32 38.394-85.32 85.336v597.328c0 46.942 38.382 85.336 85.32 85.336h597.36c46.938 0 85.32-38.394 85.32-85.336v-266.664h-85.32v266.664zM576 128v85.336h174.948l-430.95 430.93 59.732 59.732 430.952-430.94v174.942h85.318v-320h-320z"],"grid":0,"tags":["md-open"]},{"paths":["M64 768h544v64h-544v-64z","M800 768h160v64h-160v-64z","M768 895c0 35.898-28.654 65-64 65v0c-35.346 0-64-29.102-64-65v-190c0-35.898 28.654-65 64-65v0c35.346 0 64 29.102 64 65v190z","M64 480h160v64h-160v-64z","M416 480h544v64h-544v-64z","M384 607c0 35.898-28.654 65-64 65v0c-35.346 0-64-29.102-64-65v-190c0-35.898 28.654-65 64-65v0c35.346 0 64 29.102 64 65v190z","M64 192h544v64h-544v-64z","M800 192h160v64h-160v-64z","M768 319c0 35.898-28.654 65-64 65v0c-35.346 0-64-29.102-64-65v-190c0-35.898 28.654-65 64-65v0c35.346 0 64 29.102 64 65v190z"],"grid":0,"tags":["md-options"]},{"paths":["M739 64h-454.2c-121.8 0-220.8 101.2-220.8 225.2v445.6c0 124 99 225.2 220.8 225.2h454.4c121.8 0 221-101.2 221-225.2v-445.6c-0.2-124-99.2-225.2-221.2-225.2zM350 502v1.4c0 21.8-18.2 40.8-39.8 40.8h-46.6c-21.6 0-39.8-19-39.8-40.8v-207.2c2-21.6 18.4-40.4 39.8-40.4h46.6c21.8 0 39.8 19.6 39.8 41.6v204.6zM594 796.8c0 22.8-17.8 35.2-40.2 35.2h-83.6c-22.4 0-40.2-16.2-40.2-39.2v-58.6c0-46.6 36.2-84.6 82-84.6s82 38 82 84.6v62.6zM800 502v1.4c0 21.8-18.2 40.8-39.8 40.8h-48.6c-21.6 0-39.8-19-39.8-40.8v-207.2c2-21.6 18.4-40.4 39.8-40.4h48.6c21.6 0 39.8 19.6 39.8 41.6v204.6z"],"grid":0,"tags":["md-outlet"]},{"paths":["M96 541.8l237.8 89.2 29.6 297 148.6-208 208 208 208-832-832 445.8zM685.8 793.8l-165.8-167 229.8-322.8-362.6 275.6-137.4-49.6 582-312.4-146 576.2z"],"grid":0,"tags":["md-paper-plane"]},{"paths":["M928 128h-544c-17.6 0-32 15.4-32 33v63h-204c-46.2 0-84 37.8-84 84v415c0 95.2 78 173 172 173h559.4c90.2 0 164.6-73.8 164.6-164v-572c0-17.6-14.4-32-32-32zM352 288v384h-84v-345.6c0-13.6-1.6-26.6-6.6-38.4h90.6zM318 798.8c-22 21.2-51.6 33.2-81 33.2-29 0-56.2-11.4-77-32-20.6-20.6-32-48-32-77v-396.6c0-21.2 16.8-38.4 38-38.4s38 17.2 38 38.4v377.6c0 17.6 14.4 32 32 32h115c-3 23.2-14.4 45.2-33 62.8zM896 732c0 26.6-10.8 51.6-29.8 70.6s-44.4 29.4-70.8 29.4h-420.8c25.6-29.8 41.4-67.8 41.4-109v-529h480v538z","M496 272h320v112h-320v-112z","M496 448h320v64h-320v-64z","M496 576h320v64h-320v-64z","M816 704h-320c0 0 0 64-16 64 14 0 277.2 0 297.4 0 38.6 0 38.6-42 38.6-64z"],"grid":0,"tags":["md-paper"]},{"paths":["M496.062 233.62l49.356-49.356 38.466 38.466-49.356 49.356-38.466-38.466z","M352 251.4c-90.6 0-164.6 74-164.6 164.6 0 35 11 67.4 29.8 94 30.6-26 67.8-45.2 109.4-55.2l26.4-33.2c27.2-34.2 61.4-60.4 101.6-77.8 12.2-5.2 24.8-9.6 38-13.2-29-47.4-81.2-79.2-140.6-79.2z","M324 128h56v82h-56v-82z","M64 388h82v56h-82v-56z","M163.2 553.6l-1.6-1.6-49.4 49.4 38.4 38.4 49.4-49.4z","M158.578 184.26l49.356 49.356-38.466 38.466-49.356-49.356 38.466-38.466z","M811.2 577.2c-21.8-110.4-118.8-193.2-235.2-193.2-68 0-130.2 23.8-173 77.6 58.8 4.4 113.4 26 155.6 67.8 31.2 31.2 53.2 69.2 64.2 110.6h-57.4c-26.2-74.6-96-128-181.2-128-10.2 0-24.6 1.2-35.4 3.4-91.6 18.8-156.8 94.6-156.8 188.6 0 106 86 192 192 192h416c88.4 0 160-71.6 160-160 0-84.4-65.6-153-148.8-158.8z"],"grid":0,"tags":["md-partly-sunny"]},{"paths":["M192 896h213.4v-768h-213.4v768zM618.6 128v768h213.4v-768h-213.4z"],"grid":0,"tags":["md-pause"]},{"paths":["M919 381c-9.4-25.4-25.4-43.8-46.2-53.2-9.6-4.2-19.4-6.4-29.6-6.4-43.4 0-87.4 40.4-109.8 100.6-27.6 74.6-11.6 147.6 37.2 170 9.8 4.4 20.2 6.8 31.2 6.8 44.2 0 89.2-37 111.8-92.2 17-42 19-88.8 5.4-125.6z","M290.6 422c-22.2-60.2-66.4-100.6-109.8-100.6-10.2 0-20.2 2.2-29.6 6.4-20.8 9.4-36.6 27.8-46.2 53.2-13.8 36.8-11.8 83.6 5.4 125.4 22.6 55.2 67.6 92.2 111.8 92.2 10.8 0 21.4-2.2 31.2-6.8 48.8-22.2 64.8-95.2 37.2-169.8z","M387 413.6c4 0.2 8 0 12-0.4 23.4-2.2 44.6-14.2 61.2-34.6 26.8-33 34.2-84.4 28.6-137.4-8.6-81.6-51.6-142.6-109.6-145.2 0 0-8.2 0-12.4 0.4-25.6 2.6-48.8 15.8-67 38.4-26.6 32.8-39.4 81.4-34.2 130.2 8.6 80.8 61.8 146 121.4 148.6z","M512 477.4c-138.6 0-277.4 164.8-277.4 323.2 0 47.2 23.6 85.2 47 100.8 28.8 19.2 49 26.8 91 26.8 50 0 63.6-17.6 87-33 17-11.2 31.6-20.8 52.4-20.8s35.4 9.6 52.4 20.8c23.4 15.4 37 33 87 33 42.2 0 62.4-7.6 91-26.8 23.2-15.6 47-53.6 47-100.8 0-158.4-138.8-323.2-277.4-323.2z","M625.2 413c4 0.4 8 0.6 12 0.4 59.6-2.6 113-67.8 121.6-148.6 5.2-48.8-7.6-97.6-34.2-130.2-18.4-22.6-40.6-35.2-66.2-37.6-4.2-0.4-13.4-0.6-13.4-0.6-57.8 2.6-100.8 63-109.6 144.8-5.6 53 1.8 104.6 28.6 137.4 16.8 20 38 32 61.2 34.4z"],"grid":0,"tags":["md-paw"]},{"paths":["M674.908 464c67.198 0 122.184-54.004 122.184-120 0-65.994-54.986-120-122.184-120s-122.18 54.006-122.18 120c-0 65.996 54.982 120 122.18 120zM349.092 464c67.198 0 122.18-54.004 122.18-120 0-65.994-54.982-120-122.18-120s-122.184 54.006-122.184 120c0 65.996 54.986 120 122.184 120zM349.092 552c-95.716 0-285.092 45.996-285.092 140v108h576v-108c0-94.004-195.198-140-290.908-140zM674.908 574.006c-12.21 0-20.65 0-34.908 1.994 46.852 34.004 64 56 64 116v108h256v-108c0-94.004-189.376-117.994-285.092-117.994z"],"grid":0,"tags":["md-people"]},{"paths":["M608 512c105.61 0 192-86.402 192-192s-86.39-192-192-192-192 86.402-192 192 86.39 192 192 192zM608 608c-127.196 0-384 64.804-384 192v96h768v-96c0-127.196-256.804-192-384-192z","M224 448v-128h-64v128h-128v64h128v128h64v-128h128v-64h-128z"],"grid":0,"tags":["md-person-add"]},{"paths":["M512 512c105.61 0 192-86.402 192-192s-86.39-192-192-192-192 86.402-192 192 86.39 192 192 192zM512 608c-127.196 0-384 64.804-384 192v96h768v-96c0-127.196-256.804-192-384-192z"],"grid":0,"tags":["md-person"]},{"paths":["M960 717.712v-411.426c0-45.262-36.652-82.286-81.456-82.286h-733.088c-44.804 0-81.456 37.024-81.456 82.286v411.426c0 45.264 36.652 82.288 81.456 82.288h733.090c44.802 0 81.454-37.024 81.454-82.288zM224 728v-432h576v432h-576z"],"grid":0,"tags":["md-phone-landscape"]},{"paths":["M717.712 64h-411.426c-45.262 0-82.286 36.652-82.286 81.456v733.090c0 44.802 37.024 81.454 82.286 81.454h411.426c45.264 0 82.288-36.652 82.288-81.456v-733.088c0-44.804-37.024-81.456-82.288-81.456zM728 800h-432v-576h432v576z"],"grid":0,"tags":["md-phone-portrait"]},{"paths":["M800 842.6v-533.2c0-47-38.4-85.4-85.4-85.4h-533.2c-47 0-85.4 38.4-85.4 85.4v533.4c0 47 38.4 85.4 85.4 85.4h533.4c46.8-0.2 85.2-38.6 85.2-85.6zM314.6 608l90.6 128 133.4-192 176 256h-533.2l133.2-192z","M842.6 96h-533.2c-47 0-85.4 38.4-85.4 85.4v10.6h522.6c47 0 85.4 38.4 85.4 85.4v522.6h10.6c47 0 85.4-38.4 85.4-85.4v-533.2c0-47-38.4-85.4-85.4-85.4z"],"grid":0,"tags":["md-photos"]},{"paths":["M65.2 512h446.8v-446.8c-10-0.8-21.2-1.2-32-1.2-229.8 0-416 186.2-416 416 0 10.8 0.4 22 1.2 32z","M219.6 804.4c76.2 94.8 193.2 155.6 324.4 155.6 229.8 0 416-186.2 416-416 0-131.2-60.8-248.2-155.6-324.4-63.4-51-142.4-83.8-228.4-90.4v446.8h-446.8c6.6 86 39.4 165 90.4 228.4z"],"grid":0,"tags":["md-pie"]},{"paths":["M512 64c-176.008 0-320 141.114-320 313.602 0 235.198 320 582.398 320 582.398s320-347.2 320-582.398c0-172.488-143.992-313.602-320-313.602zM512 489.602c-63.992 0-114.288-49.29-114.288-112 0-62.714 50.294-112 114.288-112s114.288 49.286 114.288 112c0 62.71-50.296 112-114.288 112z"],"grid":0,"tags":["md-pin"]},{"paths":["M128 96l85.8 758.4c5.2 41.6 41 73.6 85 73.6h426.6c44 0 79.8-32 85-73.6l85.6-758.4h-768zM782 345.6h-540l-18.8-166.4h577.2l-18.4 166.4z"],"grid":0,"tags":["md-pint"]},{"paths":["M814.4 260.8c-93-37.8-194.8-56.8-302.4-56.8-107.8 0-216.6 20.6-302.4 56-16.2 6.6-30.6 18-20.2 39s322.4 661 322.4 661l322-659.8c6.4-13.8 1.8-30.8-19.4-39.4zM372.4 408c-37.4 0-64-28.6-64-64s26.6-64 64-64c37.4 0 64 28.6 64 64s-26.6 64-64 64zM512 694c-37.4 0-64-28.6-64-64s26.6-64 64-64c37.4 0 64 28.6 64 64s-26.6 64-64 64zM651.6 448c-37.4 0-64-28.6-64-64s26.6-64 64-64c37.4 0 64 28.6 64 64s-26.6 64-64 64z","M873.8 132c-104.4-41.2-233.2-68-361.8-68s-255.2 24.2-361.8 66.8c-9.4 3.8-22.2 11.2-22.2 27.6l19.4 48.2c5.6 9.8 17.4 16.4 30.2 16.4 3.6 0 8.6-0.6 14.6-3 98-37.8 206.2-59.2 320-59.2s230.4 23.2 320 59.2c7.2 2.8 11.2 3 14.6 3 13.2 0 24.4-6.6 30-16.2l19.6-48.2c-0.4-14.6-10-21.6-22.6-26.6z"],"grid":0,"tags":["md-pizza"]},{"paths":["M896 672v-80l-320-208v-225.6c0-35.366-29.64-62.4-64-62.4-34.358 0-64 27.036-64 62.4v225.6l-320 208v80l320-96v227.204l-96 62.398v62.398l160-32 160 32v-62.398l-96-62.398v-227.204l320 96z"],"grid":0,"tags":["md-plane"]},{"paths":["M271.4 302c-5 6-9.8 12-14.4 18.4 64.4 72.6 152.2 153 248.4 227.4 75.6 58.4 152.6 110.4 222.8 150.2 11.8 6.6 23.4 13 34.6 18.8 5-6 9.8-12 14.4-18.4 23.4-32.2 36.2-66.4 46.6-107.2 1.6-6.4 3-12.8 4.2-19 31.6-166-71.2-329.8-237-371.8-74-18.8-148.2-10.2-212.6 19.4-42.8 19.8-76.4 45.8-107 82.2z","M836.4 653.6c-8.2 22-14.8 35-14.8 35 36.4 42.2 49.2 67.8 63.8 92.8 4.8 8.2 14.8 26.2 1.8 24.8-3.4-0.6-7-1.4-11-2.6-42.6-10.8-102.4-37.4-168.6-74.8-71.6-40.6-149.8-93.4-226.6-152.6-102.2-79-195-164.6-261.2-241-30.6-35.2-55.2-68.4-71.4-95.8-4.8-8.2-7.8-12.6-11.2-20.8-5-12.4 10-10.2 14-9.2 29.8 7.6 70 19.8 116.4 47.6 0 0 8.6-9.6 27.8-22.8-45.6-30.8-89.2-55.4-130.4-71-46.2-17.6-82.2-13.6-95 7.4-24.4 39.8 28 144.6 130.6 264-43 172 61.2 346.6 233 390 82.2 20.8 164.8 7.8 233.6-30 76.2 35.2 144.2 57.2 193.8 69.8 47.8 12.2 80.8 11 93.6-9.8 22.2-36.4-24.2-103.6-118.2-201z"],"grid":0,"tags":["md-planet"]},{"paths":["M192 104v816l640-408-640-408z"],"grid":0,"tags":["md-play"]},{"paths":["M64 448h256v384h-256v-384z","M384 256h256v576h-256v-576z","M704 576h256v256h-256v-256z"],"grid":0,"tags":["md-podium"]},{"paths":["M558.2 96h-92.4v462.2h92.4v-462.2zM781.4 196.4l-65.6 65.6c73 58.8 119.8 148.8 119.8 250 0 178.8-144.6 323.6-323.6 323.6s-323.6-144.8-323.6-323.6c0-101.2 46.6-191.4 119.2-250.6l-65.2-65.2c-89.6 76.4-146.4 189.2-146.4 315.8 0 229.8 186.2 416 416 416s416-186.2 416-416c0-126.6-56.8-239.4-146.6-315.6z"],"grid":0,"tags":["md-power"]},{"paths":["M832 128h-316.8l-362.2 375.2c-16 16-24.6 37-25 58-0.6 22.6 7.8 45.2 25 62.4l247.4 247.2c16 16 41.6 25 57.6 25s45.6-7.8 62.8-25l375.2-358.8v-320l-64-64zM770.6 333.4c-43.4 12.2-82.6-20-82.6-61.4 0-35.4 28.6-64 64-64 41.4 0 73.6 39.2 61.4 82.6-5.8 20.6-22.2 37-42.8 42.8z"],"grid":0,"tags":["md-pricetag"]},{"paths":["M884 214v282l-425.6 407.4c16 16 41.6 24.6 57.6 24.6s45.6-7.4 62.8-24.6l381.2-359.4v-256l-76-74z","M768 96h-320l-359.4 375.2c-16 16-24 35.6-24.6 56.8-0.6 22.6 7.4 46.6 24.6 63.8l247.6 247.2c16 16 41.6 25 57.6 25s45.4-7.8 62.6-25l375.6-359v-320l-64-64zM706.6 301.4c-43.4 12.2-82.6-20-82.6-61.4 0-35.4 28.6-64 64-64 41.4 0 73.6 39.2 61.4 82.6-5.8 20.6-22.2 37-42.8 42.8z"],"grid":0,"tags":["md-pricetags"]},{"paths":["M799.9 320h-575.8c-70.452 0-128.1 57.606-128.1 128v277.334h159.798v170.666h512.402v-170.666h159.8v-277.334c0-70.394-57.65-128-128.1-128zM704 832h-384v-256h384v256zM768.202 128h-512.404v160h512.402v-160z"],"grid":0,"tags":["md-print"]},{"paths":["M856 538c-43 0-81.2 26.2-96.8 66h-82.4l-62.8-161.4c-5.4-16.4-20.6-27.4-38-27.4-0.4 0-0.6 0-0.8 0-17.6 0.4-32.8 12-37.6 29l-67.2 270.8-111-583.6c-3.4-20.2-20.2-35.4-39.4-35.4-19 0-33.8 12.4-38.8 32.4l-100.6 475.6h-116.6v80h148c18.4 0 34.4-12.4 38.8-30.4l61.4-321.2 108.2 564.2c3 17.6 17.8 30.2 37.2 31.4 0.8 0 1.6 0 2.4 0 18.6 0 33.8-10.6 38.4-27l80.4-325.8 31 81.4c5.4 16.4 20.6 27.4 38 27.4h112.8c16.6 38 54.2 62 95.2 62 27.8 0 53.8-11.2 73.6-31.6 19.6-20.2 30.4-46.6 30.4-74.4 0.2-57.2-45.4-102-103.8-102z"],"grid":0,"tags":["md-pulse"]},{"paths":["M192 248.4c0-13.8 10.4-24.4 24.4-24.4h135.6v-96h-133.6c-67 0-122.4 53.4-122.4 120.4v135.6h96v-135.6z","M807.2 128h-135.2v96h134.4c13.8 0 25.6 10.4 25.6 24.4v135.6h96v-135.6c0-67-54-120.4-120.8-120.4z","M832 773.6c0 13.8-10.4 24.4-24.4 24.4h-135.6v98h135.6c67 0 120.4-55.4 120.4-122.4v-133.6h-96v133.6z","M216.4 798c-13.8 0-24.4-10.4-24.4-24.4v-133.6h-96v133.6c0 67 55.4 122.4 122.4 122.4h133.6v-98h-135.6z"],"grid":0,"tags":["md-qr-scanner"]},{"paths":["M192.8 832h154.2l101.8-193.2v-446.8h-320v446.8h154.2l-90.2 193.2zM640.8 832h154.2l100-193.2v-446.8h-318.2v446.8h164l-100 193.2z"],"grid":0,"tags":["md-quote"]},{"paths":["M512 96c-228.798 0-416 187.202-416 416s187.202 416 416 416 416-187.202 416-416-187.202-416-416-416zM512 844.798c-183.036 0-332.798-149.764-332.798-332.798s149.762-332.8 332.798-332.8 332.8 149.764 332.8 332.8-149.764 332.798-332.8 332.798z"],"grid":0,"tags":["md-radio-button-off"]},{"paths":["M512 304c-114.4 0-208 93.6-208 208s93.6 208 208 208 208-93.6 208-208-93.6-208-208-208zM512 96c-228.798 0-416 187.202-416 416s187.202 416 416 416 416-187.202 416-416-187.202-416-416-416zM512 844.8c-183.036 0-332.8-149.766-332.8-332.8s149.764-332.8 332.8-332.8 332.8 149.764 332.8 332.8-149.764 332.8-332.8 332.8z"],"grid":0,"tags":["md-radio-button-on"]},{"paths":["M147.6 283.8c-30.4 12-51.6 43.6-51.6 79v512c0 47 37 85.4 83.2 85.4h665.6c46.2 0 83.2-38.4 83.2-85.4v-512c0-47.4-37-85.4-83.2-85.4h-486.8l343.6-142.6-28.2-70.8-525.8 219.8zM320 876c-70.8 0-128-57.2-128-128s57.2-128 128-128 128 57.2 128 128-57.2 128-128 128zM832 533.4h-64v-92.4h-89.6v92.4h-486.4v-170.6h640v170.6z"],"grid":0,"tags":["md-radio"]},{"paths":["M278 800c0 0-46 50.6-46 81.4 0 25.6 20.6 46.6 46 46.6s46-21 46-46.6c0-30.8-46-81.4-46-81.4z","M434 736c0 0-46 50.6-46 81.4 0 25.6 20.8 46.6 46 46.6 25.4 0 46-21 46-46.6 0-30.8-46-81.4-46-81.4z","M590 800c0 0-46 50.6-46 81.4 0 25.6 20.6 46.6 46 46.6 25.2 0 46-21 46-46.6 0-30.8-46-81.4-46-81.4z","M746 736c0 0-46 50.6-46 81.4 0 25.6 20.8 46.6 46 46.6 25.4 0 46-21 46-46.6 0-30.8-46-81.4-46-81.4z","M786.4 322.4c-25.4-129.2-138.6-226.4-274.4-226.4-79.4 0-152 28-201.8 90.8 68.6 5.2 132.2 30.4 181.4 79.6 36.4 36.4 62 81 74.8 129.6h-67c-30.6-87.4-112-150-211.4-150-12 0-28.6 1.4-41.2 4-106.8 22-182.8 110.8-182.8 221 0 124.2 94.8 233 218.4 233h485.4c103 0 192.4-92 192.4-195.6-0.2-98.8-76.8-179.2-173.8-186z"],"grid":0,"tags":["md-rainy"]},{"paths":["M739.6 320c-106.8 0-192.4 85.6-192.4 192 0 47.2 15.8 89 43.8 122.2h-157.6c28-33.2 43.8-75 43.8-122.2 0-106.4-85.8-192-192.4-192s-192.8 85.6-192.8 192 85.8 192 192.4 192h455c106.8 0 192.4-85.6 192.4-192s-85.6-192-192.2-192zM284.4 634.2c-68.2 0-122.4-54.2-122.4-122.2s54.2-122.2 122.4-122.2 122.4 54.2 122.4 122.2-54 122.2-122.4 122.2zM739.6 634.2c-68.2 0-122.4-54.2-122.4-122.2s54.2-122.2 122.4-122.2 122.4 54.2 122.4 122.2-54.2 122.2-122.4 122.2z"],"grid":0,"tags":["md-recording"]},{"paths":["M64 674.4l103.6 29.6c45.8-139.4 177.4-235.6 332-235.6 85.6 0 163 31.4 223.6 82.2l-158.2 153.4h395v-384l-159.2 152.6c-80.8-70.4-185.6-113.6-301.4-113.6-203 0.2-374.6 132.4-435.4 315.4z"],"grid":0,"tags":["md-redo"]},{"paths":["M512 96c-228.8 0-416 187.2-416 416s187.2 416 416 416 416-187.2 416-416-187.2-416-416-416zM736 484h-196l89.6-89.6c-29.4-30.8-71.4-50.4-117.6-50.4-92.4 0-168 75.6-168 168s75.6 168 168 168c69.8 0 130.6-42.4 155.2-104h59.6c-27.8 92.6-112.6 160-214.8 160-124.6 0-224-100.8-224-224s100.8-224 224-224c61.6 0 117.6 25.2 158.2 65.8l65.8-65.8v196z"],"grid":0,"tags":["md-refresh-circle"]},{"paths":["M512 776c-145.194 0-264-118.81-264-264 0-145.202 118.806-264 264-264 72.6 0 138.598 30.8 184.812 79.202l-140.812 140.798h308v-308l-103.396 103.404c-63.792-63.808-151.792-103.404-248.604-103.404-193.594 0-352 158.406-352 352s156.188 352 352 352c162.090 0 296.574-108.268 338.802-256h-93.102c-37.49 99.122-134.276 168-245.7 168z"],"grid":0,"tags":["md-refresh"]},{"paths":["M512 96c-229.75 0-416 186.25-416 416s186.25 416 416 416 416-186.25 416-416-186.25-416-416-416zM726 554h-428v-84h428v84z"],"grid":0,"tags":["md-remove-circle"]},{"paths":["M192 470h640v84h-640v-84z"],"grid":0,"tags":["md-remove"]},{"paths":["M192 696h640v72h-640v-72z","M192 256h640v72h-640v-72z","M192 401.4h640v71.2h-640v-71.2z","M192 551.6h640v71.2h-640v-71.2z"],"grid":0,"tags":["md-reorder"]},{"paths":["M298.6 304h426.6v124.8l170.6-166.4-170.4-166.4v124.8h-512v249.6h85.4v-166.4zM725.4 720h-426.8v-124.8l-170.6 166.4 170.6 166.4v-124.8h512v-249.6h-85.4v166.4z"],"grid":0,"tags":["md-repeat"]},{"paths":["M595.2 96l129.8 129.8-499.2 499.2-129.8-129.8v332.8h332.8l-129.8-129.8 499.2-499.2 129.8 129.8v-332.8z"],"grid":0,"tags":["md-resize"]},{"paths":["M329.704 559.878l123.668-120.502-305.932-295.964c-67.252 65.528-67.252 173.354 0 238.88l182.264 177.586z","M624.778 483.76c67.272 29.604 160.566 8.464 227.82-59.186 82.444-80.33 99.818-196.606 34.726-257.92-62.93-63.42-182.262-46.49-264.708 33.842-69.436 67.65-91.132 158.552-60.748 221.972-95.478 95.136-423.104 414.346-423.104 414.346l60.754 59.186 299.42-291.732 299.416 291.732 60.748-59.186-299.418-291.738 65.094-61.316z"],"grid":0,"tags":["md-restaurant"]},{"paths":["M865.6 272v192h-621l168.8-172.4-66.4-67.6-283 288 283 288 66.4-67.6-168.8-172.4h715.4v-288h-94.4z"],"grid":0,"tags":["md-return-left"]},{"paths":["M64 272v288h715.4l-168.8 172.4 66.4 67.6 283-288-283-288-66.4 67.6 168.8 172.4h-621v-192h-94.4z"],"grid":0,"tags":["md-return-right"]},{"paths":["M880 192h-176l-64-64h-256l-64 64h-176c-44.2 0-80 35.8-80 80v544c0 44.2 35.8 80 80 80h736c44.2 0 80-35.8 80-80v-544c0-44.2-35.8-80-80-80zM736 534h-195.4l89.6-90.2c-29.4-30.8-71.4-51-117.6-51-92.4 0-168 75.6-168 168s75.6 168 168 168c71 0 132.4-43 156.4-107h59.2c-26.8 94-112.4 163-215.6 163-124.6 0-224-100.8-224-224s100.8-224 224-224c61.6 0 117.4 25.2 158 65.8l65.6-65.8v197.2z"],"grid":0,"tags":["md-reverse-camera"]},{"paths":["M499.2 804v-584l-435.2 292 435.2 292zM524.8 512l435.2 292v-584l-435.2 292z"],"grid":0,"tags":["md-rewind"]},{"paths":["M512 64c-141.4 0-256 114.6-256 256s114.6 256 256 256 256-114.6 256-256-114.6-256-256-256zM512 480c-88.4 0-160-71.6-160-160s71.6-160 160-160 160 71.6 160 160-71.6 160-160 160z","M387.4 614.8c-38.2-16.2-72.4-39.2-101.6-68.6-2.8-2.8-5.6-5.6-8.2-8.6l-149.6 262.4h192l96 160 147-324c-16.8 2.6-33.8 4-51 4-43.2 0-85-8.4-124.6-25.2z","M746.6 537.8c-2.6 2.8-5.4 5.8-8.2 8.6-29.2 29.2-63.4 52.4-101.4 68.4l-49 107.6-43.8 96.8 63.8 140.8 96-160h192l-149.4-262.2z"],"grid":0,"tags":["md-ribbon"]},{"paths":["M521.2 429.6c47.6-81.8 96-143.2 182.8-192.8 16.6-9.6 42.4-16 45.6-17.8-168.2-51.6-237.6-155-237.6-155s-69.4 103.4-241 153c11.6 6.8 33 13 61.4 27.4 69 34.8 125 102.6 188.8 185.2z","M492.6 506.8c-119.2-184.4-229.8-253.2-396.6-253.2 108.4 157.2 104 349.2 104 430.8 0 152.2 139.6 275.6 312 275.6 115.2 0 215.8-55.2 270-137.4-71-55.2-170.2-131.4-289.4-315.8z","M928 253.6c0 0-110.4-4.6-170.4 30.8-86 51-148.8 122.6-190.8 206.4 77.6 104 146 175.8 190.8 218.8 21.4 20.4 39.6 36.4 55 49 7.4-23.6 11.6-48.6 11.6-74.4-0.2-81.6-34.8-228.2 103.8-430.6z"],"grid":0,"tags":["md-rose"]},{"paths":["M512 576c-90.886 0-167.35 52.152-204.41 128h408.82c-37.060-75.848-113.524-128-204.41-128z","M512 96c-230.874 0-416 187.2-416 416s185.126 416 416 416 416-187.2 416-416c0-228.8-187.198-416-416-416zM512 844.8c-183.036 0-332.808-149.766-332.808-332.8 0-183.036 149.774-332.8 332.808-332.8s332.808 149.764 332.808 332.8c0 183.036-149.772 332.8-332.808 332.8z","M657.6 470.4c35.366 0 62.402-27.036 62.402-62.4s-27.038-62.4-62.402-62.4c-35.364 0-62.4 27.036-62.4 62.4s27.036 62.4 62.4 62.4z","M366.4 470.4c35.364 0 62.4-27.036 62.4-62.4s-27.038-62.4-62.4-62.4c-35.366 0-62.402 27.036-62.402 62.4s27.038 62.4 62.402 62.4z"],"grid":0,"tags":["md-sad"]},{"paths":["M227 562.4v170.6l285 163 285-163v-170.6l-285 163-285-163zM512 128l-448 256 448 256 366.6-209.4v294.8h81.4v-341.4l-448-256z"],"grid":0,"tags":["md-school"]},{"paths":["M675.018 610.744h-35.002l-13.142-10.972c41.582-50.464 67.844-114.108 67.844-186.514-0.002-157.994-126.926-285.258-284.448-285.258-155.366 0-282.27 127.264-282.27 285.258s126.904 285.256 284.45 285.256c70.022 0 135.662-26.334 185.982-68.016l13.122 10.974v35.102l218.806 219.426 65.64-65.828-220.982-219.428zM412.45 610.744c-109.404 0-196.926-87.774-196.926-197.486 0-109.716 87.522-197.484 196.926-197.484 109.4 0 196.924 87.768 196.924 197.484 0 109.712-87.524 197.486-196.924 197.486z"],"grid":0,"tags":["md-search"]},{"paths":["M96 896l832-384-832-384v298.666l596 85.334-596 85.334z"],"grid":0,"tags":["md-send"]},{"paths":["M827.934 553.6c2.12-12.47 2.12-27.036 2.12-41.6s-2.12-27.036-2.12-41.6l89.334-68.636c8.52-6.236 10.638-16.634 4.26-27.036l-85.098-143.528c-4.258-8.328-17.014-12.47-25.534-8.328l-106.372 41.602c-21.276-16.636-46.788-31.202-72.32-41.602l-14.896-110.234c-2.12-8.308-10.638-16.636-21.276-16.636h-170.196c-10.636 0-19.154 8.328-21.274 16.636l-17.016 110.234c-25.534 10.4-48.928 24.964-72.342 41.602l-106.372-41.602c-10.638-4.142-21.276 0-25.534 8.328l-85.098 143.53c-4.238 8.306-2.122 20.798 4.258 27.036l91.482 68.634c0 14.564-2.12 27.036-2.12 41.6s2.12 27.036 2.12 41.6l-89.336 68.636c-8.52 6.236-10.636 16.634-4.26 27.036l85.098 143.528c4.26 8.328 17.016 12.47 25.534 8.328l106.374-41.602c21.274 16.636 46.788 31.202 72.32 41.602l17.016 110.234c2.138 10.4 10.636 16.636 21.274 16.636h170.196c10.638 0 19.156-8.328 21.276-16.636l17.036-110.234c25.514-10.4 48.928-24.964 72.32-41.602l106.374 41.602c10.636 4.142 21.274 0 25.534-8.328l85.098-143.53c4.258-8.306 2.12-20.798-4.26-27.036l-93.6-68.634zM510.936 657.6c-82.978 0-148.92-64.47-148.92-145.6s65.942-145.6 148.92-145.6 148.922 64.47 148.922 145.6-65.944 145.6-148.922 145.6z"],"grid":0,"tags":["md-settings"]},{"paths":["M896 496l-320-304v170.668c-298.668 42.666-405.334 256-448 469.332 106.666-149.332 234.666-217.604 448-217.604v174.938l320-293.334z"],"grid":0,"tags":["md-share-alt"]},{"paths":["M767.644 688.854c-32.090 0-62.048 10.652-83.442 31.958l-305.914-176.84c2.142-10.656 4.284-19.186 4.284-29.838 0-10.656-2.142-19.186-4.284-29.838l301.652-174.7c23.524 21.306 53.482 34.082 87.704 34.082 70.59 0 128.356-57.532 128.356-127.84 0-70.304-57.766-127.838-128.356-127.838-70.594 0-128.358 57.534-128.358 127.84 0 10.654 2.13 19.186 4.284 29.838l-301.642 174.7c-23.534-21.308-53.482-34.082-87.712-34.082-70.592 0-126.216 57.532-126.216 127.84 0 70.306 57.754 127.84 128.356 127.84 34.23 0 64.178-12.778 87.712-34.084l303.782 176.842c-2.152 8.51-4.282 17.042-4.282 27.694 0 68.188 55.612 123.574 124.074 123.574 68.458 0 124.072-55.386 124.072-123.574 0.002-68.188-55.61-123.574-124.070-123.574z"],"grid":0,"tags":["md-share"]},{"paths":["M640 128c-22.2 38.2-80.6 64-128 64s-105.8-25.8-128-64l-256 64v192l154-32-26 544h512l-26-544 154 32v-192l-256-64z"],"grid":0,"tags":["md-shirt"]},{"paths":["M444.4 376.2l-248.8-248.2-67.6 67.6 248.2 248.2 68.2-67.6zM632 128l98 98-602 602.4 67.6 67.6 602.4-602 98 98v-264h-264zM647.8 579.6l-67.6 67.6 150.2 150.2-98.4 98.6h264v-264l-98 98c0 0-150.2-150.4-150.2-150.4z"],"grid":0,"tags":["md-shuffle"]},{"paths":["M341.4 512l554.6 384v-768l-554.6 384z","M128 128h128v768h-128v-768z"],"grid":0,"tags":["md-skip-backward"]},{"paths":["M128 128v768l554.6-384-554.6-384z","M768 128h128v768h-128v-768z"],"grid":0,"tags":["md-skip-forward"]},{"paths":["M922.8 597l-16.6-61.8-176 47.2-120.8-69.8 120.8-69.8 176 47.2 16.6-61.8-114.2-30.6 115.4-66.6-48-83-113.2 65.4 30.6-114.2-61.8-16.6-47.2 176-124.4 71.8v-142.2l129-128.8-45.4-45.2-83.6 83.6v-133.8h-96v131.2l-83.4-83.4-45.2 45.2 128.6 128.8v142.8l-121.4-70-47.2-176-61.8 16.6 30.6 114.2-115.4-66.8-48 83.2 113.4 65.4-114.2 30.6 16.6 61.8 175.8-47.2 125.2 72.2-125.2 72.4-175.8-47.2-16.6 61.8 114.2 30.6-113.4 65.4 48 83 115.4-66.6-30.6 114 61.8 16.6 47.2-175.8 121.4-70.2v141.8l-128.6 128.8 45.2 45.2 83.4-83.6v131.2h96v-133.6l83.8 83.4 45-45.2-128.8-128.6v-141.2l124.4 72 47.2 175.8 61.8-16.6-30.6-114 113.2 65.4 48-83.2-115.4-66.6z"],"grid":0,"tags":["md-snow"]},{"paths":["M256 832h512v96h-512v-96z","M512 576c35.4 0 64-28.6 64-64s-28.6-64-64-64c-6 0-12 0.8-17.6 2.4l-133.4-97.4-8 7 97.8 133.4c-1.8 5.8-2.8 12-2.8 18.6 0 35.4 28.6 64 64 64z","M512 96c-229.8 0-416 186.2-416 416 0 96.6 33 185.4 88.2 256h117.6l52.2-52.2-45.8-45.8-44.2 44c-39.8-48.6-64.2-108-70.4-170h62.4v-64h-62.4c6.2-62 30.6-121.4 70.4-170l44.2 44 45.8-45.8-44-44.2c48.6-39.8 108-64.2 170-70.4v62.4h64v-62.4c62 6.2 121.4 30.6 170 70.4l-44 44.2 45.8 45.8 44.2-44c39.8 48.6 64.2 108 70.4 170h-62.4v64h62.4c-6.2 62-30.6 121.4-70.4 170l-44.2-44-45.8 45.8 52.2 52.2h117.6c55.2-70.6 88.2-159.4 88.2-256-0-229.8-186.2-416-416-416z"],"grid":0,"tags":["md-speedometer"]},{"paths":["M810.666 213.334v597.332h-597.332v-597.332h597.332zM810.666 128h-597.332c-46.938 0-85.334 38.396-85.334 85.334v597.332c0 46.938 38.396 85.334 85.334 85.334h597.332c46.938 0 85.334-38.396 85.334-85.334v-597.332c0-46.938-38.396-85.334-85.334-85.334v0z"],"grid":0,"tags":["md-square-outline"]},{"paths":["M810.666 128h-597.332c-46.938 0-85.334 38.396-85.334 85.334v597.332c0 46.938 38.396 85.334 85.334 85.334h597.332c46.938 0 85.334-38.396 85.334-85.334v-597.332c0-46.938-38.396-85.334-85.334-85.334z"],"grid":0,"tags":["md-square"]},{"paths":["M916 420.818l-290.534-24.952-113.466-267.866-113.486 267.868-290.514 24.95 220.384 191.048-66.062 284.134 249.678-150.628 249.66 150.628-66.042-284.132 220.382-191.050zM545.062 690.574l-33.062-19.948-0.004-378.554 69.58 164.26 178.108 15.296-135.138 117.15 40.484 174.174-119.968-72.378z"],"grid":0,"tags":["md-star-half"]},{"paths":["M916 420.818l-290.534-24.952-113.466-267.866-113.486 267.868-290.514 24.95 220.384 191.048-66.062 284.134 249.678-150.628 249.66 150.628-66.042-284.132 220.382-191.050zM545.062 690.572l-33.062-19.948-153.036 92.328 40.496-174.172-135.142-117.152 178.084-15.296 69.594-164.262 69.58 164.26 178.108 15.296-135.138 117.15 40.484 174.174-119.968-72.378z"],"grid":0,"tags":["md-star-outline"]},{"paths":["M512 745.372l249.66 150.628-66.042-284.132 220.382-191.050-290.534-24.95-113.466-267.868-113.486 267.868-290.514 24.95 220.384 191.050-66.062 284.132z"],"grid":0,"tags":["md-star"]},{"paths":["M352 128h128v768h-128v-768z","M160 672h128v224h-128v-224z","M544 544h128v352h-128v-352z","M736 352h128v544h-128v-544z"],"grid":0,"tags":["md-stats"]},{"paths":["M464 613.334h96v-261.334h-96v261.334z","M815.34 340.542l61.572-61.572-67.884-67.882-61.57 61.572c-65.024-50.546-146.72-80.66-235.458-80.66-212.078 0-384 171.922-384 384s171.922 384 384 384 384-171.922 384-384c0-88.738-30.114-170.434-80.66-235.458zM724.132 788.132c-56.664 56.664-132 87.868-212.132 87.868s-155.47-31.204-212.132-87.868c-56.664-56.662-87.868-132-87.868-212.132s31.204-155.47 87.868-212.132c56.662-56.664 132-87.868 212.132-87.868s155.468 31.204 212.132 87.868c56.664 56.662 87.868 132 87.868 212.132s-31.204 155.47-87.868 212.132z","M384 64h256v96h-256v-96z"],"grid":0,"tags":["md-stopwatch"]},{"paths":["M512 96c-187.728 0-352 21.336-352 170.668v426.664c0 83.208 66.124 149.332 149.334 149.332l-53.334 53.336v32h512v-32l-53.334-53.336c83.208 0 149.334-66.124 149.334-149.332v-426.664c0-149.332-164.272-170.668-352-170.668zM320 768c-36.272 0-64-27.73-64-64 0-36.274 27.728-64 64-64s64 27.726 64 64c0 36.27-27.728 64-64 64zM480 480h-224v-192h224v192zM704 768c-36.272 0-64-27.73-64-64 0-36.274 27.728-64 64-64s64 27.726 64 64c0 36.27-27.728 64-64 64zM768 480h-224v-192h224v192z"],"grid":0,"tags":["md-subway"]},{"paths":["M554.6 64h-85.4v128h85.4v-128zM812.8 151.4l-76.8 76.8 59.8 59.8 76.8-76.8-59.8-59.8zM211.2 151.4l-59.8 59.8 76.8 76.8 59.8-59.8-76.8-76.8zM512 256c-140.8 0-256 115.2-256 256s115.2 256 256 256 256-115.2 256-256-115.2-256-256-256v0zM960 469.4h-128v85.4h128v-85.4zM192 469.4h-128v85.4h128v-85.4zM795.8 736l-59.8 59.8 76.8 76.8 59.8-59.8-76.8-76.8zM228.2 736l-76.8 76.8 59.8 59.8 76.8-76.8-59.8-59.8zM554.6 832h-85.4v128c12.8 0 85.4 0 85.4 0v-128z"],"grid":0,"tags":["md-sunny"]},{"paths":["M262.6 462.2l-198.6 199 198.6 198.8v-149.2h349v-99.4h-349v-149.2zM960 362.8l-198.6-198.8v149.2h-349v99.4h349v149.2l198.6-199z"],"grid":0,"tags":["md-swap"]},{"paths":["M336 432h189.8c29 29.6 69.4 48 114.2 48 88.4 0 160-71.6 160-160s-71.6-160-160-160c-44.8 0-85.2 18.4-114.2 48h-189.8c-61.6 0-112 50.4-112 112s50.4 112 112 112zM302.2 286.2c9.2-9.2 21.2-14.2 33.8-14.2h151.4c-4.8 15.2-7.4 31.2-7.4 48s2.6 32.8 7.4 48h-151.4c-12.6 0-24.8-5-33.8-14.2-9.2-9.2-14.2-21.2-14.2-33.8s5-24.8 14.2-33.8z","M688 592h-189.8c-29-29.6-69.4-48-114.2-48-88.4 0-160 71.6-160 160s71.6 160 160 160c44.8 0 85.2-18.4 114.2-48h189.8c61.6 0 112-50.4 112-112s-50.4-112-112-112zM721.8 737.8c-9.2 9.2-21.2 14.2-33.8 14.2h-151.4c4.8-15.2 7.4-31.2 7.4-48s-2.6-32.8-7.4-48h151.4c12.6 0 24.8 5 33.8 14.2 9.2 9.2 14.2 21.2 14.2 33.8s-5 24.8-14.2 33.8z"],"grid":0,"tags":["md-switch"]},{"paths":["M512 186.18v-122.18l-160 162.908 160 162.912v-122.186c131.992 0 240 109.964 240 244.366 0 40.726-10 79.428-28.008 114.032l58.008 59.062c31.992-50.914 50-109.976 50-173.094 0-179.198-144.004-325.82-320-325.82zM512 756.368c-132.002 0-240-109.976-240-244.368 0-40.726 10-79.418 27.998-114.040l-57.998-59.052c-32.002 48.872-50 109.964-50 173.092 0 179.198 144.004 325.82 320 325.82v122.18l160-162.906-160-162.914v122.188z"],"grid":0,"tags":["md-sync"]},{"paths":["M64 240c0 85.8 0 444.6 0 544 0 26.6 21.4 48 48 48 60.8 0 742 0 800 0 26.6 0 48-21.4 48-48v-544c0-26.6-21.4-48-48-48-58 0-739.4 0-800 0-26.6 0-48 21.4-48 48zM832 256v512h-672v-512h672zM924 512c0 15.4-13 28-28.2 28-15 0-28-12.4-28-28 0-15.4 12.8-28.2 28-28.2 15.2 0.2 28.2 12.8 28.2 28.2z"],"grid":0,"tags":["md-tablet-landscape"]},{"paths":["M784 64c-85.8 0-444.6 0-544 0-26.6 0-48 21.4-48 48 0 60.8 0 742 0 800 0 26.6 21.4 48 48 48h544c26.6 0 48-21.4 48-48 0-58 0-739.4 0-800 0-26.6-21.4-48-48-48zM768 832h-512v-672h512v672zM512 924c-15.4 0-28-13-28-28.2 0-15 12.4-28 28-28 15.4 0 28.2 12.8 28.2 28-0.2 15.2-12.8 28.2-28.2 28.2z"],"grid":0,"tags":["md-tablet-portrait"]},{"paths":["M767.6 184.4c-70.6-55.4-159.4-88.4-255.6-88.4-96 0-184.6 33-255.2 88 83.2 89.6 128.6 206 128 328.6-0.6 122-46.6 237.2-129.8 325.8 70.8 56 160.2 89.6 257 89.6 97 0 186.6-33.6 257.6-90-83-88.6-129-203.6-129.6-325.4-0.6-122.4 44.6-238.6 127.6-328.2z","M706.2 510.2c0 53.8 10.2 106 30.2 155.6 19.2 47.2 46.6 89.8 81.6 127.2 68.2-74.2 110-173 110-281 0-109-42.4-208.4-111.6-282.8-34.2 37-61.2 79.2-80 125.4-20 49.6-30.2 102-30.2 155.6z","M318.6 510.2c0-53.8-10.2-106-30.2-155.6-18.8-46.4-45.8-88.8-80.4-125.8-69.4 74.4-112 174-112 283.2 0 108.4 42 207.2 110.4 281.4 35.2-37.4 62.8-80.2 82-127.6 20-49.4 30.2-101.8 30.2-155.6z"],"grid":0,"tags":["md-tennisball"]},{"paths":["M816 128h-624c-44.004 0-64 35.996-64 80v688l128-128h560c44.004 0 80-35.996 80-80v-480c0-44.004-35.996-80-80-80zM396.8 484h-76.8v-80h76.8v80zM550.4 484h-76.8v-80h76.8v80zM704 484h-76.8v-80h76.8v80z"],"grid":0,"tags":["md-text"]},{"paths":["M606 600.4v-443.6c0-51.4-42-93-94-93s-94 41.6-94 93v443.8c-58 33-97.8 95.6-97.8 167.4 0 106 86 192 192 192s192-86 192-192c0-72-40.2-134.6-98.2-167.6zM480 156.8c0-16 15.4-29 32-29s32 13 32 29v99.2h-64v-99.2z"],"grid":0,"tags":["md-thermometer"]},{"paths":["M628 128h-344c-31.4 0-57.2 19.2-68.4 46.8l-114.4 270.8c-3.4 8.8-5.2 18-5.2 28v77.2c0 42.2 34 89.2 75.6 89.2h238.6l-36 163-1.2 12c0 15.8 6.4 30.2 16.6 40.6l40 40.2 252.4-254.4c13.6-13.8 22-33 22-54.2v-384c0-42.2-34.4-75.2-76-75.2z","M800 128h128v448h-128v-448z"],"grid":0,"tags":["md-thumbs-down"]},{"paths":["M396 896h344c31.4 0 57.2-19.2 68.4-46.8l114.2-270.8c3.4-8.8 5.2-18 5.2-28v-77.2c0-42.2-34-89.2-75.6-89.2h-238.4l36-163 1.2-12c0-15.8-6.4-30.2-16.6-40.6l-40.4-40.4-252 254.6c-13.6 13.8-22 33-22 54.2v384c0 42.2 34.4 75.2 76 75.2z","M96 448h128v448h-128v-448z"],"grid":0,"tags":["md-thumbs-up"]},{"paths":["M786.4 322.4c-25.4-129.2-138.6-226.4-274.4-226.4-79.4 0-152 28-201.8 90.8 68.6 5.2 132.2 30.4 181.4 79.6 36.4 36.4 62 81 74.8 129.6h-67c-30.6-87.4-112-150-211.4-150-12 0-28.6 1.4-41.2 4-106.8 22-182.8 110.8-182.8 221 0 124.2 100.4 201 224 201h136v-206h198.2l-66.4 134h66.2l-36 72h187.4c103 0 186.6-60 186.6-163.6 0-98.8-76.6-179.2-173.6-186z","M424 736h44v192l118-256h-162z"],"grid":0,"tags":["md-thunderstorm"]},{"paths":["M511.6 96c-229.6 0-415.6 186.4-415.6 416s186 416 415.6 416c230 0 416.4-186.4 416.4-416s-186.4-416-416.4-416zM512 844.8c-183.8 0-332.8-149-332.8-332.8s149-332.8 332.8-332.8 332.8 149 332.8 332.8-149 332.8-332.8 332.8z","M532.8 304h-62.4v249.6l218.4 131 31.2-51.2-187.2-111v-218.4z"],"attrs":[{"opacity":0.9},{"opacity":0.9}],"grid":0,"tags":["md-time"]},{"paths":["M465.8 743.2c0 25.4 20.8 46.2 46.2 46.2s46.2-20.8 46.2-46.2c0-25.4-20.8-46.2-46.2-46.2s-46.2 20.6-46.2 46.2zM465.8 96v184.8h92.4v-88.6c156.6 22.6 277.4 156.6 277.4 319.8 0 178.8-144.6 323.6-323.6 323.6s-323.6-144.8-323.6-323.6c0-77.6 27.2-148.8 73-204.4l250.6 250.6 65.2-65.2-314.4-314.2v1c-101.2 75.6-166.8 195.8-166.8 332.2 0 229.8 185.8 416 416 416 229.8 0 416-186.2 416-416s-186.2-416-416-416h-46.2zM789.4 512c0-25.4-20.8-46.2-46.2-46.2s-46.2 20.8-46.2 46.2 20.8 46.2 46.2 46.2c25.4 0 46.2-20.8 46.2-46.2zM234.6 512c0 25.4 20.8 46.2 46.2 46.2s46.2-20.8 46.2-46.2-20.8-46.2-46.2-46.2-46.2 20.8-46.2 46.2z"],"grid":0,"tags":["md-timer"]},{"paths":["M160 693.332c0 83.208 66.124 149.332 149.334 149.332l-53.334 53.336v32h512v-32l-53.334-53.336c83.208 0 149.334-66.124 149.334-149.332v-426.664c0-149.332-164.272-170.668-352-170.668s-352 21.336-352 170.668v426.664zM512 752c-44.004 0-80-35.994-80-79.998s35.996-80.002 80-80.002 80 35.998 80 80.002-35.996 79.998-80 79.998zM768 448h-512v-192h512v192z"],"grid":0,"tags":["md-train"]},{"paths":["M704 64v70h126.2l-162.8 161c-15-14.4-26.4-22-26.4-22-36.6-25.8-81-41-129-41-60.4 0-115.2 24-155.6 62.8l-30.4-30 62.8-62.8-57-57-63 63-75-74h126.2v-70h-256v256h70v-137.4l80.6 79.8-62.4 62.4 57 57 62.8-62.8 38.8 38.4c-14.6 29.8-23 63.4-23 99 0 109.6 79 200.8 182.2 220.4v90.6h-126v80.6h126v112h84v-112h126v-80.4h-126v-90.6c101.6-19.8 182.4-111 182.4-220.6 0-35.4-8.4-69.6-23-99.2l176.6-174.6v137.4h70v-256h-256zM512 580c-70.6 0-128-57.4-128-128s57.4-128 128-128c70.6 0 128 57.4 128 128s-57.4 128-128 128z"],"grid":0,"tags":["md-transgender"]},{"paths":["M256 810.858c0 46.834 38.396 85.142 85.334 85.142h341.334c46.936 0 85.332-38.308 85.332-85.142v-490.858h-512v490.858zM832 192h-160l-53.57-64h-212.858l-53.572 64h-160v64h640v-64z"],"grid":0,"tags":["md-trash"]},{"paths":["M960 794v-269l-102.6 102.6-282.2-282-179.2 179.4-268.8-269-63.2 63.2 332 332.6 179.2-179.4 218.6 218.8-102.6 102.8h268.8z"],"grid":0,"tags":["md-trending-down"]},{"paths":["M691.2 256l102.6 102.6-218.6 218.8-179.2-179.2-332 332.6 63.2 63.2 268.8-269 179.2 179.4 282.2-282 102.6 102.6v-269h-268.8z"],"grid":0,"tags":["md-trending-up"]},{"paths":["M784 210c1.8-54 0.4-112 0.2-114h-545.6c0 2-1.6 60 0.2 114h-142.8c0 136 19.8 204.6 42 253.4s52.8 90.6 117.4 140.6c60.2 46.6 191 107.2 208.6 115.2v56.6c-9.2 20-47 56.4-166.6 56.4h-41.4v96h512v-96h-51.4c-121.4 0-150-38.2-156.6-56.4v-56.6c18.6-9.2 161.8-80.6 208.8-115 50.4-36.8 101.8-103 117.4-140.6s41.8-129.6 41.8-253.6h-144zM219.2 423.8c-17.6-36.4-28-75.8-31.4-123.8h57.4c1.4 12 2.8 22.6 4.6 32.6 13.2 78.4 29.6 140.4 51.4 193-34.6-27-62.6-61.6-82-101.8zM804.8 423.8c-19.8 40.6-48 75.4-83.2 102.6 22-52.4 38-113.6 51.6-193.8 1.6-10 3.2-20.6 4.6-32.6h58.6c-3.6 48-13.8 87.4-31.6 123.8z"],"grid":0,"tags":["md-trophy"]},{"paths":["M820.2 488.2c24 0 53.2 21.8 67.6 51.8h40.2c-0.6-100-42.4-203-118.8-281.8-72.6-74.8-166-121-265.2-131.4-6-18-23-30.8-43.2-30.8-20 0-37 13-43 30.6-207.2 21-361.8 192.8-361.8 405.8 0 2.2 0.2 3.6 0.8 7.6h43.6c13.6-30 44.4-51.8 70.6-51.8 34 0 63 21.8 73 51.8h39.6c8.2-30 33.8-51.4 66-51.4 35.6 0 66.2 29 68.2 65.2v236.6c0 18.6 0.2 48.2-26.8 48.2-13.8 0-33.2-3.6-33.2-32v-42.6h-86v42.6c0 69.2 47.2 121.4 120 121.4 39 0 66.6-17 87-37.4 26.2-26.4 27-69.4 27-100.2v-238.2c4-51.6 47.8-63.4 83.8-63.4 34.4 0 64.6 23.2 75.6 51.2h41c10.2-30 39.6-51.8 74-51.8z"],"grid":0,"tags":["md-umbrella"]},{"paths":["M524.6 359.2c-115.8 0-220.6 43.2-301.4 113.6l-159.2-152.8v384h395l-158.2-153.6c60.8-50.6 138-82.2 223.6-82.2 154.6 0 286.2 96.4 332 235.6l103.6-29.6c-60.8-182.8-232.4-315-435.4-315z"],"grid":0,"tags":["md-undo"]},{"paths":["M752 372h-40v-80c0-110-90-200-200-200s-200 90-200 200h75.996c0-68.008 56.006-124.004 124.004-124.004 68.008 0 124.004 55.996 124.004 124.004h-0.004v80h-364c-44.004 0-80 35.996-80 80v400c0 44.004 35.996 80 80 80h480c44.004 0 80-35.996 80-80v-400c0-44.004-35.996-80-80-80zM512 736c-44.004 0-80-35.996-80-80s35.996-80 80-80 80 35.996 80 80-35.996 80-80 80z"],"grid":0,"tags":["md-unlock"]},{"paths":["M768 439v-170.4c0-26.8-22.4-48.6-49.8-48.6h-604.4c-27.4-0-49.8 21.8-49.8 48.6v486.6c0 26.8 22.4 48.8 49.8 48.8h604.4c27.4 0 49.8-22 49.8-48.6v-170.4l192 194.6v-535.2l-192 194.6z"],"grid":0,"tags":["md-videocam"]},{"paths":["M128 384v256h170.668l213.332 223.086v-702.17l-213.332 223.084h-170.668zM704 512c0-76.798-42.666-144.814-106.666-177.726v353.272c64-30.73 106.666-98.746 106.666-175.546z"],"grid":0,"tags":["md-volume-down"]},{"paths":["M128 384v256h170.668l213.332 223.086v-702.17l-213.332 223.084h-170.668z"],"grid":0,"tags":["md-volume-mute"]},{"paths":["M811 512c0 45.434-9.766 88.724-27.206 127.71l63.76 63.76c31.012-56.81 48.446-122.164 48.446-191.47 0-186.512-128-344.508-298-384v89.956c124 37.308 213 155.808 213 294.044z","M512 160.916l-102.042 104.96 102.042 102.038z","M841.684 793.77l-659.452-659.456-48 48 180.998 180.826-16.56 20.86h-170.67v256h170.668l213.332 223.086v-303.086l189.83 189.372c-30.24 25.514-65.83 45.054-103.83 56.672v89.956c62-14.344 117.992-44.326 164.63-85.618l79.22 79.386 48-48.086-48.004-48.078-0.162 0.166z","M704.376 512c0-76.798-42.376-144.814-106.376-177.726v119.64l101.602 101.602c3.108-14.038 4.774-28.608 4.774-43.516z"],"grid":0,"tags":["md-volume-off"]},{"paths":["M128 384v256h170.668l213.332 223.086v-702.17l-213.332 223.084h-170.668zM704 512c0-76.798-42.666-144.814-106.666-177.726v353.272c64-30.73 106.666-98.746 106.666-175.546zM597.334 128v89.956c123.728 37.308 213.334 155.808 213.334 294.044 0 138.238-89.606 256.738-213.334 294.044v89.956c170.666-39.492 298.666-197.486 298.666-384 0-186.512-128-344.508-298.666-384z"],"grid":0,"tags":["md-volume-up"]},{"paths":["M576 224c44.446 0 79.994-35.552 79.994-80 0-44.45-35.548-80-79.994-80s-80.006 35.55-80.006 80c0 44.448 35.56 80 80.006 80z","M576 464h208v-80h-144l-89.604-138.666c-15.396-23.334-36.272-36.272-61.866-36.272-6.396 0-17.656 1.062-25.598 3.494l-222.932 75.444v224h80v-160l81.062-32-161.062 640h80l113.396-328.542 100.604 136.542v192h76v-256l-114.062-192 39.49-123.728 40.572 75.728z"],"grid":0,"tags":["md-walk"]},{"paths":["M64 928h896l-448-832-448 832zM560 800h-96v-96h96v96zM560 640h-96v-192h96v192z"],"grid":0,"tags":["md-warning"]},{"paths":["M832 512c0-102.002-48.008-192.002-121.992-250l-38.008-230h-320l-38.008 230c-73.984 57.998-121.992 147.998-121.992 250 0 101.992 48.008 191.992 121.992 250l38.008 230h320l38.008-230c73.984-58.008 121.992-148.008 121.992-250zM272 512c0-132.002 108.008-240 240-240s240 107.998 240 240c0 131.992-108.008 240-240 240s-240-108.008-240-240z"],"grid":0,"tags":["md-watch"]},{"paths":["M761 326.6l-249-262.6-249 262.6c-137.2 144.8-137.2 380 0 524.8 68.6 72.4 158.8 108.6 249 108.6s180.4-36.2 249-108.6c137.4-144.8 137.4-380 0-524.8z"],"grid":0,"tags":["md-water"]},{"paths":["M512 457.438c-45.758 0-83.194 37.058-83.194 82.36 0 45.304 37.436 82.364 83.194 82.364 45.756 0 83.194-37.058 83.194-82.364 0-45.302-37.438-82.36-83.194-82.36zM761.6 539.796c0-135.892-112.326-247.078-249.6-247.078s-249.6 111.186-249.6 247.078c0 90.606 49.922 170.894 124.792 214.144l41.614-72.064c-49.944-28.834-83.208-80.306-83.208-142.080 0-90.59 74.866-164.716 166.402-164.716 91.542 0 166.402 74.126 166.402 164.716 0 61.774-33.266 113.246-83.208 142.080l41.614 72.064c74.866-43.248 124.792-123.538 124.792-214.144zM512 128c-228.806 0-416 185.308-416 411.796 0 152.374 83.184 284.14 208 356.204l41.598-72.064c-99.838-57.648-166.414-162.648-166.414-284.138 0-181.186 149.782-329.436 332.816-329.436s332.812 148.25 332.812 329.436c0 121.49-66.568 228.542-166.41 284.138l41.598 72.064c124.812-72.064 208-203.83 208-356.204 0-226.488-187.194-411.796-416-411.796z"],"grid":0,"tags":["md-wifi"]},{"paths":["M469.334 554.666v261.334h-213.334v80h512v-80h-213.334v-261.334l341.334-341.332v-85.334h-768v85.334l341.334 341.332zM320 298.666l-85.334-85.332h554.668l-85.334 85.332h-384z"],"grid":0,"tags":["md-wine"]},{"paths":["M380.8 297.2l-58.8 208.6c-12.6 45.6 41.4 63.4 54.6 20.6l52.6-192.4h14.8l-90.4 338h84.4v254c0 46 64 46 64 0v-254h20v254c0 46 62 46 62 0v-254h86.8l-92.4-338h16.8l52.6 192.4c13 43.8 66.6 25 54.6-20.4l-58.8-208.8c-8-23.6-36.4-65.2-84-67.2h-94.6c-49.2 2-77.4 43.2-84.2 67.2z","M585.2 138.4c0-41.2-32.8-74.6-73.2-74.6s-73.2 33.4-73.2 74.6c0 41.2 32.8 74.6 73.2 74.6s73.2-33.4 73.2-74.6z"],"grid":0,"tags":["md-woman"]},{"paths":["M876.8 384.8c24.4-28.4 39.2-64.6 39.2-104.4 0.2-87.6-71-159.2-160.8-164.2-3.2-0.2-6.2-0.2-9.6-0.2-40.8-0.2-78.2 13.6-107.6 36.2l107.6 104.8-21 20.8c-51.4-38.8-114-64-182-69.8v-0.2c0-17-14-31-31-31s-31 14-31 31v0.2c-67.8 5.8-130.2 31-181.4 69.8l-20.8-20.8 107.6-104.8c-29.4-22.8-66.8-36.4-107.4-36.2-3.2 0-6.4 0.2-9.6 0.2-90 5-161.2 76.6-160.8 164.2 0 39.6 14.8 76 39.2 104.4l108-105.2 19 19c-70.2 63.8-114.2 156-114.2 258.4 0 87.8 32.4 168 86 229.4l-72.8 89.2 24.6 20.4 70.4-85.8c63.2 60.4 148.8 97.8 243.2 97.8h0.2c0 0 0.4 0 0.6 0 94.4 0 180.4-37.4 243.6-97.8l70.4 86 24.6-20.2-73-89.4c53.6-61.6 86-141.8 86-229.4 0-102.2-44-194.6-114.4-258.6l19-19 108.2 105.2zM152.4 335.6c-8.4-17.2-12.8-36.8-13-56-0.2-70.2 56.8-129.2 131-133.6 25.4-1.4 46.2 2.8 64.2 12.2l-182.2 177.4zM831.8 553c0 175.4-144 314.2-320.2 314.2-176 0-319.6-138.8-319.6-314.2s143.6-317.4 319.8-317.4c176.2-0 320 141.8 320 317.4zM689.4 158.4c17.6-9.6 38.6-13.6 64.2-12.2 74.4 4 131.2 63 131 133.6 0 19.2-4.6 38.8-13 56.2l-182.2-177.6z","M512 320v256h-192v32h224v-288z"],"grid":0,"tags":["ios-alarm-outline"]},{"paths":["M876.8 384.8c24.4-28.4 39.2-64.6 39.2-104.4 0.2-87.6-71-159.2-160.8-164.2-3.2-0.2-6.2-0.2-9.6-0.2-40.8-0.2-78.2 13.6-107.6 36.2l107.6 104.8-21.2 20.8c-51.4-38.8-114.4-64-182.4-69.8v-0.2c0-17-14-31-31-31s-31 14-31 31v0.2c-68 5.8-130 31-181.2 69.8l-20.8-20.6 107.6-104.8c-29.4-22.8-66.8-36.4-107.4-36.2-3.2 0-6.4 0.2-9.6 0.2-90 5-161.2 76.6-160.8 164.2 0 39.6 14.8 76 39.2 104.4l108-105.2 19 19c-70.2 63.8-114.2 156-114.2 258.4 0 87.8 32.4 168 86 229.4l-72.8 89.2 25 20.2 70.4-85.8c63.2 60.4 148.8 97.8 243.2 97.8h0.2c0 0 0.4 0 0.6 0 94.4 0 180.4-37.4 243.6-97.8l70.4 86 24.6-20.2-73-89.4c53.6-61.6 86-141.8 86-229.4 0-102.2-44-194.6-114.4-258.6l19-19 108.2 105.2zM544 608h-224v-32h192v-256h32v288z"],"grid":0,"tags":["ios-alarm"]},{"paths":["M928 288v576h-832v-576h832zM960 256h-896v640h896v-640z","M144 192h736v32h-736v-32z","M208 128h608v32h-608v-32z"],"grid":0,"tags":["ios-albums-outline"]},{"paths":["M960 256h-896v640h896v-640z","M144 192h736v32h-736v-32z","M208 128h608v32h-608v-32z"],"grid":0,"tags":["ios-albums"]},{"paths":["M704 256.8l-64.6-64.8-319.4 320 319.4 320 64.6-64.8-254.6-255.2z"],"grid":0,"tags":["ios-arrow-back"]},{"paths":["M96 768h160v-32h-128v-448h128v-32h-160z","M768 256v32h128v448h-128v32h160v-512z","M224 384h32v256h-32v-256z","M768 384h32v256h-32v-256z","M640 320h32v384h-32v-384z","M352 320h32v384h-32v-384z","M494 352h32v320h-32v-320z"],"grid":0,"tags":["ios-barcode-outline"]},{"paths":["M96 256v512h832v-512h-832zM256 640h-32v-256h32v256zM384 704h-32v-384h32v384zM526 672h-32v-320h32v320zM672 704h-32v-384h32v384zM800 640h-32v-256h32v256z"],"grid":0,"tags":["ios-barcode"]},{"paths":["M925.372 558.738c0.264-2.364 0.514-4.73 0.738-7.108 0.008-0.076 0.014-0.156 0.022-0.234 1.218-12.97 1.868-26.106 1.868-39.396 0-229.726-186.26-416-416-416-15.902 0-31.584 0.924-47.024 2.662-0.178 0.020-0.36 0.036-0.54 0.056 0 0.002 0 0.004 0 0.006-194.022 22.094-347.552 177.674-366.458 372.65-0.002 0-0.006 0-0.008 0-0.144 1.496-0.262 2.994-0.39 4.492-0.272 3.152-0.506 6.314-0.706 9.486-0.052 0.836-0.112 1.67-0.16 2.508-0.128 2.242-0.232 4.49-0.326 6.742-0.022 0.562-0.042 1.124-0.064 1.686-0.194 5.214-0.324 10.448-0.324 15.712 0 229.726 186.274 416 416 416 5.254 0 10.478-0.13 15.686-0.324 0.586-0.022 1.172-0.042 1.756-0.066 2.22-0.092 4.438-0.196 6.648-0.32 0.908-0.050 1.812-0.116 2.718-0.172 3.208-0.206 6.402-0.444 9.59-0.72 1.408-0.122 2.82-0.23 4.226-0.368 0-0.002 0-0.006 0-0.008 194.988-18.904 350.558-172.432 372.652-366.458 0.002 0 0.004 0 0.008 0 0.032-0.274 0.056-0.55 0.088-0.826zM893.33 512c0 5.136-0.132 10.244-0.334 15.332-20.668-0.936-41.104-3.38-61.228-7.328l12.22-38.112-30.464-9.768-12.976 40.47c-15.182-4.224-30.16-9.302-44.884-15.276-9.952-4.036-19.702-8.446-29.25-13.208l23.036-34.006-26.494-17.948-24.718 36.492c-24.482-14.7-47.406-31.954-68.61-51.624l29.46-29.46-22.626-22.626-29.46 29.46c-19.11-20.594-35.928-42.816-50.35-66.508l36.974-25.044-17.944-26.492-34.648 23.47c-5.194-10.262-9.996-20.75-14.348-31.48-5.686-14.018-10.552-28.268-14.654-42.704l41.624-13.346-9.77-30.468-39.422 12.64c-4.208-20.846-6.82-42.028-7.792-63.458 5.088-0.202 10.194-0.334 15.33-0.334 210.262-0.004 381.328 171.064 381.328 381.326zM130.674 512c0-2.634 0.046-5.258 0.1-7.878 18.128 1.118 36.078 3.374 53.782 6.818l-14.23 44.382 30.47 9.77 15-46.782c15.384 4.256 30.56 9.392 45.476 15.442 10.35 4.198 20.478 8.808 30.394 13.792l-26.81 39.58 26.492 17.946 28.438-41.984c24.076 14.558 46.64 31.586 67.53 50.966l-33.706 33.706 22.626 22.628 33.708-33.708c19.936 21.488 37.4 44.738 52.228 69.592l-41.506 28.116 17.944 26.492 38.946-26.38c4.566 9.222 8.8 18.634 12.694 28.232 6.322 15.59 11.668 31.458 16.032 47.556l-45.664 14.64 9.768 30.466 43.062-13.806c3.216 17.012 5.358 34.244 6.43 51.644-2.622 0.052-5.244 0.1-7.878 0.1-210.26-0.002-381.328-171.070-381.326-381.33zM551.786 891.258c-1.242-19.948-3.822-39.822-7.718-59.492l48.2-15.454-9.768-30.464-45.792 14.682c-7.892-28.83-18.712-57.020-32.468-84.108l40.344-27.328-17.946-26.492-37.976 25.724c-15.776-26.188-34.466-51.104-56.080-74.29l34.162-34.162-22.626-22.626-34.164 34.162c-22.576-21.042-46.786-39.32-72.216-54.828l25.392-37.486-26.492-17.944-26.892 39.7c-27.096-13.948-55.318-24.934-84.188-32.988l14.316-44.65-30.47-9.77-15.040 46.904c-20.362-4.136-40.954-6.848-61.62-8.134 18.336-176.074 156.984-316.908 332.046-338.622 1.148 23.716 4.19 47.352 9.086 70.678l-51.87 16.632 9.77 30.468 49.806-15.97c8.090 28.288 19.008 55.934 32.772 82.492l-44.644 30.242 17.946 26.492 42.472-28.77c15.376 25.056 33.47 48.91 54.232 71.18l-38.408 38.408 22.626 22.628 38.408-38.41c22.894 21.338 47.47 39.842 73.294 55.49l-29.11 42.972 26.496 17.948 30.656-45.256c26.56 13.578 54.2 24.31 82.458 32.236l-16.336 50.954 30.464 9.768 17.050-53.18c22.602 4.624 45.488 7.508 68.448 8.62-21.712 175.060-162.546 313.706-338.62 332.044z"],"grid":0,"tags":["ios-baseball-outline"]},{"paths":["M512 96c-16.088 0-31.95 0.946-47.564 2.722v0 0c-207.326 23.61-368.436 199.638-368.436 413.278 0 229.726 186.274 416 416 416 213.654 0 389.666-161.106 413.276-368.436v0 0c1.778-15.61 2.724-31.474 2.724-47.564 0-229.726-186.26-416-416-416zM519.878 893.228c-1.078-17.386-3.21-34.61-6.418-51.608l-43.022 13.792-9.77-30.468 45.624-14.628c-4.366-16.112-9.712-31.988-16.040-47.588-3.886-9.588-8.122-18.994-12.682-28.21l-38.928 26.372-17.944-26.494 41.488-28.108c-14.832-24.858-32.298-48.114-52.238-69.606l-33.704 33.706-22.626-22.626 33.704-33.704c-20.884-19.378-43.442-36.404-67.514-50.96l-28.432 41.976-26.494-17.946 26.806-39.576c-9.92-4.982-20.054-9.598-30.412-13.8-14.91-6.042-30.076-11.18-45.45-15.434l-15 46.784-30.472-9.77 14.23-44.384c-17.712-3.446-35.67-5.706-53.808-6.824 0.218-10.746 0.876-21.39 1.968-31.906 20.678 1.294 41.278 3.996 61.654 8.136l15.036-46.908 30.474 9.772-14.318 44.656c28.866 8.054 57.084 19.042 84.18 32.988l26.898-39.708 26.496 17.946-25.4 37.496c25.424 15.508 49.63 33.784 72.2 54.822l34.164-34.164 22.628 22.628-34.166 34.164c21.618 23.19 40.312 48.11 56.088 74.302l37.998-25.738 17.946 26.496-40.366 27.34c13.756 27.092 24.578 55.284 32.464 84.116l45.838-14.698 9.77 30.472-48.244 15.468c3.894 19.656 6.462 39.522 7.708 59.454-10.518 1.096-21.164 1.75-31.914 1.97zM821.922 550.586l-17.058 53.208-30.472-9.77 16.348-50.986c-28.248-7.928-55.88-18.658-82.436-32.232l-30.67 45.282-26.496-17.946 29.128-42.998c-25.824-15.652-50.398-34.154-73.288-55.492l-38.41 38.408-22.624-22.628 38.404-38.406c-20.762-22.27-38.854-46.124-54.228-71.18l-42.496 28.786-17.948-26.496 44.67-30.254c-13.762-26.556-24.678-54.198-32.768-82.482l-49.836 15.98-9.77-30.474 51.902-16.642c-4.894-23.326-7.886-46.964-9.044-70.674 10.378-1.288 20.892-2.136 31.508-2.568 1.014 21.486 3.718 42.668 7.944 63.614l39.488-12.718 9.814 30.424-41.578 13.316c4.102 14.436 8.982 28.676 14.666 42.696 4.352 10.726 9.156 21.206 14.348 31.462l34.63-23.458 17.946 26.492-36.954 25.032c14.418 23.692 31.238 45.914 50.348 66.508l29.458-29.462 22.628 22.626-29.464 29.462c21.204 19.672 44.124 36.926 68.604 51.626l24.704-36.47 26.496 17.946-23.024 33.988c9.554 4.766 19.312 9.178 29.27 13.216 14.708 5.964 29.674 11.042 44.842 15.262l12.968-40.44 30.466 9.77-12.208 38.086c20.232 3.968 40.572 6.622 61.252 7.648-0.43 10.624-1.286 21.144-2.57 31.536-22.972-1.128-45.874-3.97-68.49-8.598z"],"grid":0,"tags":["ios-baseball"]},{"paths":["M512 96c-229.726 0-416 186.272-416 416s186.274 416 416 416c229.742 0 416-186.276 416-416s-186.258-416-416-416zM893.328 512c0 0.096-0.004 0.194-0.004 0.29-44.63-3.442-87.978-13.944-129.24-31.398-35.776-15.132-68.906-35.010-98.958-59.268 41.38-59.002 76.884-122.424 105.648-189.43 75.316 69.706 122.554 169.338 122.554 279.806zM745.212 210.522c-0.56 1.352-1.1 2.708-1.67 4.056-27.816 65.766-62.124 127.912-102.572 185.974-3.076-2.898-6.126-5.828-9.126-8.826-38.214-38.214-68.214-82.708-89.166-132.24-17.394-41.126-27.866-84.326-31.342-128.802 0.222 0 0.442-0.008 0.664-0.008 87.768-0.002 168.694 29.822 233.212 79.846zM479.35 132.088c8.862 116.252 62.088 220.082 142.782 294.624-18.99 25.498-39.218 50.152-60.638 73.93-95.108-100.064-209.63-181.492-337.534-238.264 63.272-72.912 153.706-121.628 255.39-130.29zM561.374 547.68c72.458 81.34 130.96 172.876 174.37 272.906-50.8 36.934-111.020 61.658-176.324 69.796-4.544-95.632-39.042-183.414-94.358-254.142 33.904-27.526 66.074-57.106 96.312-88.56zM524.078 540.078c-25.408 25.406-51.954 49.324-79.556 71.74-77.474-85.77-187.662-141.412-310.9-147.27 8.14-65.292 32.864-125.5 69.792-176.292 118.39 51.376 224.89 123.894 316.664 215.666 6.646 6.646 13.18 13.378 19.624 20.178-5.148 5.372-10.348 10.702-15.624 15.978zM131.016 496.46c50.476 2.29 98.872 13.594 142.9 32.218 49.534 20.952 94.026 50.952 132.24 89.166 4.508 4.508 8.89 9.11 13.168 13.79-62.828 47.83-130.854 88.098-203.416 120.364-53.264-65.588-85.236-149.124-85.236-239.998 0-5.208 0.136-10.382 0.344-15.54zM238.134 777.052c71.976-32.868 139.62-73.574 201.828-121.042 22.498 28.744 41.044 60.23 55.36 94.074 19.228 45.458 30.026 93.448 32.228 142.9-5.16 0.208-10.34 0.344-15.55 0.344-107.366 0-204.498-44.622-273.866-116.276zM761.62 800.042c-44.978-101.342-105.44-194.28-178.382-275.818 22.202-24.538 43.268-50.122 63.112-76.672 68.342 54.684 153.042 89.77 245.602 96.726-8.58 101.838-57.33 192.416-130.332 255.764z"],"grid":0,"tags":["ios-basketball-outline"]},{"paths":["M512 96c-229.726 0-416 186.272-416 416s186.274 416 416 416c229.742 0 416-186.276 416-416s-186.258-416-416-416zM761.594 800.064c-8.316 7.216-16.96 14.058-25.884 20.544-43.408-100.030-101.876-191.59-174.336-272.93-30.236 31.456-62.406 61.036-96.312 88.56 55.318 70.728 89.832 158.508 94.378 254.138-10.504 1.31-21.142 2.172-31.888 2.606-2.206-49.454-13-97.442-32.228-142.9-14.316-33.844-32.862-65.33-55.36-94.074-62.208 47.466-129.846 88.186-201.82 121.052-7.766-8.022-15.184-16.382-22.23-25.058 72.56-32.268 140.582-72.542 203.41-120.372-4.278-4.68-8.66-9.282-13.168-13.79-38.214-38.214-82.708-68.214-132.24-89.166-44.030-18.624-92.424-29.928-142.9-32.216 0.434-10.758 1.296-21.406 2.606-31.918 123.24 5.858 233.426 61.506 310.9 147.276 27.604-22.416 54.15-46.334 79.556-71.74 5.276-5.276 10.476-10.606 15.624-15.976-6.446-6.8-12.978-13.534-19.624-20.18-91.774-91.772-198.274-164.29-316.664-215.664 6.486-8.922 13.33-17.564 20.544-25.878 127.902 56.774 242.424 138.202 337.534 238.264 21.422-23.778 41.648-48.432 60.638-73.93-80.694-74.542-133.912-178.376-142.776-294.624 10.546-0.898 21.208-1.384 31.98-1.404 3.476 44.476 13.948 87.676 31.342 128.802 20.952 49.534 50.952 94.026 89.166 132.24 3 3 6.050 5.93 9.124 8.826 40.452-58.062 74.758-120.208 102.574-185.974 0.57-1.348 1.11-2.706 1.67-4.056 8.838 6.852 17.362 14.084 25.558 21.67-28.766 67.004-64.264 130.43-105.644 189.432 30.052 24.26 63.182 44.136 98.958 59.27 41.262 17.454 84.61 27.956 129.24 31.396-0.008 10.774-0.486 21.434-1.376 31.982-92.556-6.958-177.262-42.036-245.602-96.718-19.844 26.55-40.91 52.134-63.112 76.672 72.95 81.54 133.382 174.494 178.362 275.838z"],"grid":0,"tags":["ios-basketball"]},{"paths":["M512 95.918c35.29 0 64 28.702 64 63.982s-28.71 63.98-64 63.98-64-28.702-64-63.98c0-35.28 28.71-63.982 64-63.982zM512 63.928c-53.020 0-96 42.966-96 95.972 0 53.004 42.98 95.97 96 95.97s96-42.966 96-95.97c0-53.006-42.98-95.972-96-95.972v0z","M848 288h-672c-26.51 0-48 21.494-48 48s21.49 48 48 48h200.902c11.098 0 26.394 8.59 34.432 29.416 9.302 24.11 4.74 66.66-1.078 102.888l-7.846 42.52c-0.038 0.208-0.41 0.2-0.41 0.406l-64.458 344.476c-4.606 26.102 12.974 50.988 39.080 55.594 2.816 0.496 5.688 0.734 8.436 0.734 22.714 0 41.834-16.38 45.94-39.672l41.002-239.878v0.332c0 0 14.5-62.816 38.904-62.816h2.192c24.904 0 34.904 62.816 34.904 62.816v-0.164l42.966 239.79c4.104 23.284 24.662 39.63 47.526 39.63 2.774 0 5.71-0.242 8.536-0.736 26.106-4.606 43.642-29.52 39.038-55.622l-64.698-344.502c-0.004-0.016 0.022-0.040 0.018-0.054-0.038-0.208-0.064-0.434-0.104-0.644l-7.542-42.822c-5.818-36.238-10.376-78.166-1.076-102.274 8.038-20.828 24.336-29.418 34.434-29.418h200.902c26.51 0 48-21.494 48-48s-21.49-48-48-48zM176 352.226c-8.822 0-16-7.292-16-16.114s7.178-16.114 16-16.114h672c8.822 0 16 7.18 16 16s-7.178 16-16 16h-203c-31.076 0-54.876 29.476-61.964 47.844-9.692 25.114-10.008 63.884-0.776 121.376l-0.018 0.208 0.012 0.22 6.734 38.276 1.124 6.482 64.504 343.256c1 5.668-1.24 9.922-2.664 11.954-1.426 2.034-4.67 5.598-10.358 6.602-0.952 0.166-1.91 0.252-2.854 0.252-7.786 0-14.414-5.278-15.766-12.944l-42.464-239.524h-0.030c-0.542-4-3.656-20.1-10.044-37.542-4.556-12.434-9.688-22.068-15.688-30.010-14.182-18.776-30.478-22.448-41.652-22.448h-2.192c-10.94 0-27.006 3.462-41.42 21.876-6.1 7.792-11.458 17.342-16.38 29.604-7.256 18.074-11.010 35.308-11.416 37.226l-0.22 0.738-41.456 239.8c-1.386 7.772-7.5 13.192-14.882 13.192-0.918 0-1.864-0.086-2.806-0.254-5.68-1-8.91-4.55-10.33-6.576-1.418-2.026-3.648-6.272-2.646-11.95l64.87-345.016 7.594-42.91 0.042-0.252c9.258-57.658 9.054-96.6-0.664-121.782-7.086-18.362-27.152-47.474-63.52-47.474z"],"grid":0,"tags":["ios-body-outline"]},{"paths":["M608 159.676c0 53.019-42.981 96-96 96s-96-42.981-96-96c0-53.019 42.981-96 96-96s96 42.981 96 96z","M848 288h-672c-26.51 0-48 21.49-48 48s21.49 48 48 48h196.902c11.158 2 26.394 7.674 34.432 28.504 9.302 24.112 4.74 67.212-1.078 103.454l-7.55 42.79c-0.038 0.208-0.078 0.414-0.116 0.622-0.004 0.016-0.004 0.024-0.008 0.040l-60.75 344.536c-4.606 26.106 12.828 51 38.934 55.606 26.11 4.602 50.666-12.832 55.268-38.942l41.966-239.914v0.334c0 0 12.5-65.030 36.904-65.030h2.192c24.904 0 36.904 65.030 36.904 65.030v-0.166l41.966 239.826c4.602 26.11 29.326 43.498 55.436 38.896 26.106-4.606 43.456-29.524 38.85-55.628l-60.792-344.552c-0.004-0.016-0.026-0.040-0.030-0.054-0.038-0.208-0.088-0.434-0.126-0.644l-7.554-42.828c-5.818-36.242-10.382-79.262-1.082-103.376 8.040-20.828 23.272-26.504 34.43-28.504h196.902c26.51 0 48-21.49 48-48s-21.49-48-48-48z"],"grid":0,"tags":["ios-body"]},{"paths":["M695.242 128c-81.882 0-158.242 28-183.156 88.99-27.086-60.99-101.27-88.99-183.154-88.99-110.402 0-200.932 51.96-200.932 158v566h44.28c25.72-52.668 88.476-84 156.65-84 80.448 0 147.754 55.056 163.234 128h39.428c15.478-72.944 82.99-128 163.444-128 68.17 0 122.298 23.332 156.858 84h44.106v-566c0-106.040-90.354-158-200.758-158zM496 821.852c-36-51.742-97.46-85.852-167-85.852-69.538 0-129 20.11-167 71.852l-2 1.074v-526.926c6-83.65 80.178-122 168.586-122 90.324 0 164.29 37.416 166.726 123.616-0.034 1.458 0.032 2.918 0.032 4.384l0.656 26.206v507.646zM864 296v511.852c-36-51.742-99.462-71.852-169-71.852-69.54 0-131 34.11-167 85.852v-533.852c0-88.224 75.318-128 167.174-128 88.406 0 162.826 22.35 168.826 106v30z"],"grid":0,"tags":["ios-book-outline"]},{"paths":["M328.932 128c-110.4 0-200.932 51.96-200.932 158v566h44.282c25.72-52.668 88.476-84 156.65-84 80.448 0 147.754 55.056 163.232 128h3.836v-705.308c-34.48-42.79-98.038-62.692-167.068-62.692z","M695.242 128c-68.664 0-133.426 19.702-167.242 62.022v705.978h3.594c15.478-72.944 82.99-128 163.444-128 68.17 0 122.298 23.332 156.858 84h44.104v-566c0-106.040-90.354-158-200.758-158z"],"grid":0,"tags":["ios-book"]},{"paths":["M864 128h-300.8c-20.6 0-38.6 9.2-51.2 23.4v0 0c-12.4-14.4-30.6-23.4-51.2-23.4h-300.8c-37.6 0-66 26.6-66 64v572.2c0 37.6 28.4 67.8 66 67.8 0 0 259 0 286.6 0s49.4 8.4 49.4 38.8c0 18.2 0 25.2 0 25.2h32c0 0 0-6.8 0-25.2 0-30.6 21.8-38.8 49.4-38.8s286.6 0 286.6 0c37.6 0 66-30.2 66-67.8v-572.2c0-37.4-28.4-64-66-64zM496 822.2c-9.4-15.6-27-22.2-47.6-22.2h-288.4c-18.8 0-32-17-32-35.8v-572.2c0-18.8 13.2-32 32-32 0 0 261.2 0 286.6 0 25.6 0 49.4 25.6 49.4 44.4v617.8zM640 160c37.6 0 86 0 128 0v200.8l-45.8-29-18.2-12.8-18.2 12.8-45.8 29v-200.8zM896 764.2c0 18.8-13.2 35.8-32 35.8h-288.4c-20.6 0-38.2 4.6-47.6 22.2v-617.8c0-18.8 23.8-44.4 49.4-44.4 4.4 0 15.4 0 30.6 0v262l96-64 96 64v-262c37.2 0 64 0 64 0 18.8 0 32 13.4 32 32v572.2z"],"grid":0,"tags":["ios-bookmarks-outline"]},{"paths":["M685.8 330.8l18.2-12.8 18.2 12.8 45.8 29v-231.8c-41.4 0-89 0-128 0v231.8l45.8-29z","M864 128c0 0-26.6 0-64 0v293l-96-64-96 64v-293c-24.2 0-41.2 0-44.8 0-16.2 0-35.2 14.4-35.2 30s0 658 0 658l-16 11-16-11c0 0 0-644 0-658s-18.4-30-35.2-30-300.8 0-300.8 0c-37.6 0-66 26.6-66 64v572.2c0 37.6 28.4 67.8 66 67.8 0 0 259 0 286.6 0s49.4 8.4 49.4 38.8c0 18.2 0 25.2 0 25.2h32c0 0 0-6.8 0-25.2 0-30.6 21.8-38.8 49.4-38.8s286.6 0 286.6 0c37.6 0 66-30.2 66-67.8v-572.2c0-37.4-28.4-64-66-64z"],"grid":0,"tags":["ios-bookmarks"]},{"paths":["M832 256v-32h-64v32h-96v-64c-1-36.4-27.2-64-64.4-64h-198.2c-37.2 0-57.4 27.4-57.4 64v64h-96v-32h-64v32h-96v640h832v-640h-96zM384 255v-58.8c0-20.4 5.8-36.2 27.4-36.2h194.2c20.8 0 34.4 15.4 34.4 36.2v59.8h-256v-1zM896 864h-768v-448h768v448zM896 384h-768v-96h64v32h64v-32h512v32h64v-32h64v96z"],"grid":0,"tags":["ios-briefcase-outline"]},{"paths":["M192 224h64v32h-64v-32z","M96 416h832v480h-832v-480z","M768 224h64v32h-64v-32z","M832 256v64h-64v-64h-96v-64c-1-36.4-27.2-64-64.4-64h-198.2c-37.2 0-57.4 27.4-57.4 64v64h-96v64h-64v-64h-96v128h832v-128h-96zM640 255v1h-256v-59.8c0-20.4 5.8-36.2 27.4-36.2h194.2c20.8 0 34.4 15.4 34.4 36.2v58.8z"],"grid":0,"tags":["ios-briefcase"]},{"paths":["M128 288v608h607.8v-608h-607.8zM703.8 864h-543.8v-544h543.8v544z","M896 128h-608v128h32v-96h544v544h-96v32h128z"],"grid":0,"tags":["ios-browsers-outline"]},{"paths":["M128 288v608h607.8v-608h-607.8z","M288 128v128h480v480h128v-608z"],"grid":0,"tags":["ios-browsers"]},{"paths":["M288 320h448v-128h-448v128zM320 224h384v64h-384v-64z","M736 128h-448c-35.4 0-64 28.6-64 64v640c0 35.4 28.6 64 64 64h448c35.4 0 64-28.6 64-64v-640c0-35.4-28.6-64-64-64zM768 832c0 17.6-14.4 32-32 32h-448c-17.6 0-32-14.4-32-32v-640c0-17.6 14.4-32 32-32h448c17.6 0 32 14.4 32 32v640z","M320 480v-96h-32v128h128v-32h-32z","M320 640v-96h-32v128h128v-32h-32z","M320 800v-96h-32v128h128v-32h-32z","M480 480v-96h-32v128h128v-32h-32z","M640 480v-96h-32v128h128v-32h-32z","M480 640v-96h-32v128h128v-32h-32z","M480 800v-96h-32v128h128v-32h-32z","M640 800v-256h-32v288h128v-32h-32z"],"grid":0,"tags":["ios-calculator-outline"]},{"paths":["M736 128h-448c-35.4 0-64 28.6-64 64v640c0 35.4 28.6 64 64 64h448c35.4 0 64-28.6 64-64v-640c0-35.4-28.6-64-64-64zM720 560v256h-96v-256h96zM720 400v96h-96v-96h96zM560 720v96h-96v-96h96zM560 560v96h-96v-96h96zM560 400v96h-96v-96h96zM400 720v96h-96v-96h96zM400 560v96h-96v-96h96zM400 400v96h-96v-96h96zM304 304v-96h416v96h-416z"],"grid":0,"tags":["ios-calculator"]},{"paths":["M128 384h768v512h-768v-512z","M896 192h-192v96h-32v-96h-320v96h-32v-96h-192v160h768z","M320 128h32v64h-32v-64z","M672 128h32v64h-32v-64z"],"grid":0,"tags":["ios-calendar"]},{"paths":["M835 320h-123.4c-64.2-72-84.4-96-109-96h-177c-24.6 0-44.4 24-109 96h-26.6v-32h-68v32h-27c-35.2 0-67 26.4-67 61.4v352c0 35 31.8 66.6 67 66.6h640c35.2 0 61-31.6 61-66.6v-352c0-35-25.8-61.4-61-61.4zM864 733.4c0 18.6-12.4 34.6-29 34.6h-640c-17.4 0-35-17.4-35-34.6v-352c0-16.4 16.2-29.4 35-29.4h135.6l9.6-6.4c8-9 15.4-20 22.2-27.6 22.6-25.4 39-43.4 50.6-53.8 9.4-8.4 12.4-8.2 12.4-8.2h177c0 0 3.2-0.2 13.4 9 12.2 11 29.4 33 53.2 59.6 5.8 6.6 12 13.6 18.6 21l9.6 6.4h137.8c17.6 0 29 12 29 29.4v352z","M512 379c-94.2 0-171 76.8-171 171s76.8 171 171 171 171-76.8 171-171-76.8-171-171-171zM512 689c-76.8 0-139-62.2-139-139s62.2-139 139-139 139 62.2 139 139-62.2 139-139 139z","M704 384h34v34h-34v-34z","M576 550c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-35.346 28.654-64 64-64s64 28.654 64 64z"],"grid":0,"tags":["ios-camera-outline"]},{"paths":["M835 320h-123.4c-64.2-72-84.4-96-109-96h-177c-24.6 0-44.4 24-109 96h-26.6v-32h-68v32h-27c-35.2 0-67 26.4-67 61.4v352c0 35 31.8 66.6 67 66.6h640c35.2 0 61-31.6 61-66.6v-352c0-35-25.8-61.4-61-61.4zM512 721c-94.2 0-171-76.8-171-171s76.8-171 171-171 171 76.8 171 171-76.8 171-171 171zM738 418h-34v-34h34v34z","M512 411c-76.8 0-139 62.2-139 139s62.2 139 139 139 139-62.2 139-139-62.2-139-139-139zM512 614c-35.4 0-64-28.6-64-64s28.6-64 64-64 64 28.6 64 64-28.6 64-64 64z"],"grid":0,"tags":["ios-camera"]},{"paths":["M320 800c-26.496 0-48 21.504-48 48s21.504 48 48 48 48-21.504 48-48-21.504-48-48-48zM320 864c-8.822 0-16-7.178-16-16s7.178-16 16-16 16 7.178 16 16-7.178 16-16 16z","M769 800c-26.496 0-48 21.504-48 48s21.504 48 48 48 48-21.504 48-48-21.504-48-48-48zM769 864c-8.822 0-16-7.178-16-16s7.178-16 16-16 16 7.178 16 16-7.178 16-16 16z","M896 256l-649.646-64.708c-3.256-13.944-8.738-29.32-23.676-41.334-18.628-14.98-48.714-21.958-94.678-21.958v32.002c37.228 0 62.334 5.012 74.624 14.894 8.916 7.17 11.288 16.846 14.33 31.978l-0.048 0.008 84.104 467.276c4.826 28.844 14.388 50.418 26.582 65.972 14.494 18.494 33.474 27.87 56.408 27.87h480v-32h-480c-9.454 0-38.272 0.246-51.498-67.51l-10.858-60.32 542.356-96.17 32-256zM837.18 484.696l-521.202 91.98-63.464-352.6 607.738 61.216-23.072 199.404z"],"grid":0,"tags":["ios-cart-outline"]},{"paths":["M320 800c-26.496 0-48 21.504-48 48s21.504 48 48 48 48-21.504 48-48-21.504-48-48-48z","M769 800c-26.496 0-48 21.504-48 48s21.504 48 48 48 48-21.504 48-48-21.504-48-48-48z","M896 256l-649.646-64.708c-3.256-13.944-8.738-29.32-23.676-41.334-18.628-14.98-48.714-21.958-94.678-21.958v32.002c37.228 0 62.334 5.012 74.624 14.894 8.916 7.17 11.288 16.846 14.33 31.978l-0.048 0.008 84.104 467.276c4.826 28.844 14.388 50.418 26.582 65.972 14.494 18.494 33.474 27.87 56.408 27.87h480v-32h-480c-9.454 0-38.272 0.246-51.498-67.51l-10.858-60.32 542.356-96.17 32-256z"],"grid":0,"tags":["ios-cart"]},{"paths":["M128 128h512v192h32v-224h-576v448h224v-32h-192z","M352 352v448h325.2l128 128h26.8v-128h96v-448h-576zM896 768h-96v109.2l-110-109.2h-306v-384h512v384z"],"grid":0,"tags":["ios-chatboxes-outline"]},{"paths":["M672 96h-576v448h224v-224h352z","M352 352v448h325.2l128 128h26.8v-128h96v-448h-576z"],"grid":0,"tags":["ios-chatboxes"]},{"paths":["M732.39 424.244c2.37-13.056 3.612-26.504 3.612-40.244 0-123.712-100.29-224.002-224.002-224.002s-224.002 100.29-224.002 224.002c0 13.74 1.242 27.188 3.612 40.244-94.378 26.36-163.612 112.968-163.612 215.756 0 123.712 100.29 224.002 224.002 224.002 62.684 0 119.342-25.758 160-67.254 40.658 41.496 97.316 67.254 160 67.254 123.712 0 224.002-100.29 224.002-224.002 0-102.788-69.234-189.394-163.612-215.756zM319.998 384c0-105.87 86.13-192.002 192.002-192.002s192.002 86.132 192.002 192.002c0 11.552-1.026 22.87-2.99 33.866-9.498-1.228-19.18-1.868-29.012-1.868-62.684 0-119.342 25.758-160 67.254-40.658-41.496-97.316-67.254-160-67.254-9.832 0-19.514 0.638-29.012 1.868-1.964-10.996-2.99-22.314-2.99-33.866zM544.002 640c0 39.16-11.792 75.612-32.002 106.012-20.208-30.4-32.002-66.852-32.002-106.012 0-11.552 1.026-22.87 2.99-33.866 9.498 1.228 19.18 1.868 29.012 1.868s19.514-0.638 29.012-1.868c1.964 10.996 2.99 22.314 2.99 33.866zM512 576.002c-6.968 0-13.85-0.382-20.628-1.112 5.252-14.524 12.21-28.238 20.628-40.902 8.42 12.664 15.376 26.378 20.628 40.902-6.778 0.73-13.66 1.112-20.628 1.112zM459.582 568.728c-59.512-16.91-107.332-61.874-128.21-119.62 6.78-0.728 13.66-1.112 20.628-1.112 54.706 0 104.138 23 139.144 59.834-13.45 18.378-24.176 38.872-31.562 60.898zM532.856 507.834c35.006-36.836 84.438-59.836 139.144-59.836 6.968 0 13.85 0.382 20.628 1.112-20.878 57.746-68.7 102.708-128.21 119.62-7.386-22.028-18.112-42.522-31.562-60.896zM352 832.002c-105.872 0-192.002-86.13-192.002-192.002 0-87.704 59.11-161.862 139.584-184.728 23.464 69.966 80.53 124.514 152.028 144.486-2.37 13.054-3.612 26.504-3.612 40.242 0 49.434 16.026 95.118 43.146 132.168-35.006 36.834-84.438 59.834-139.144 59.834zM672 832.002c-54.708 0-104.138-23-139.144-59.836 27.122-37.048 43.146-82.732 43.146-132.166 0-13.738-1.242-27.188-3.612-40.242 71.498-19.972 128.562-74.52 152.028-144.486 80.474 22.868 139.584 97.026 139.584 184.728 0 105.872-86.13 192.002-192.002 192.002z"],"grid":0,"tags":["ios-color-filter-outline"]},{"paths":["M732.388 424.244c2.37-13.056 3.614-26.504 3.614-40.244 0-123.712-100.292-224-224.002-224-123.714 0-224.002 100.288-224.002 224 0 13.74 1.244 27.188 3.612 40.244-94.374 26.36-163.61 112.968-163.61 215.756 0 123.71 100.288 224 224 224 62.682 0 119.34-25.758 160-67.254 40.656 41.496 97.316 67.254 159.998 67.254 123.71 0 224.002-100.29 224.002-224 0-102.788-69.238-189.394-163.612-215.756zM511.996 790.746c-0.968 0.99-1.958 1.964-2.95 2.938-6.402-6.788-12.378-13.974-17.902-21.518-27.122-37.050-43.148-82.732-43.148-132.166 0-13.738 1.244-27.188 3.614-40.242-71.498-19.972-128.562-74.52-152.028-144.486-3.188-9.504-5.744-19.294-7.644-29.318 1.884-0.58 3.764-1.178 5.67-1.708-0.092-0.504-0.17-1.014-0.258-1.518 8.372-2.098 16.926-3.734 25.64-4.86 9.496-1.23 19.178-1.868 29.010-1.868 62.682 0 119.34 25.756 160 67.252 40.656-41.496 97.316-67.252 159.998-67.252 9.832 0 19.514 0.638 29.012 1.868 8.71 1.126 17.266 2.76 25.632 4.858-0.086 0.506-0.164 1.014-0.258 1.52 1.91 0.534 3.79 1.128 5.676 1.71-1.898 10.024-4.458 19.814-7.644 29.316-23.464 69.966-80.532 124.514-152.026 144.484 2.37 13.056 3.614 26.506 3.614 40.244 0 49.434-16.028 95.116-43.148 132.166-5.524 7.544-11.504 14.734-17.906 21.52-0.992-0.974-1.982-1.948-2.954-2.94z","M541.012 606.134c-9.498 1.228-19.18 1.868-29.012 1.868s-19.516-0.638-29.012-1.868c-1.964 10.996-2.992 22.312-2.992 33.866 0 39.16 11.796 75.612 32.004 106.010 20.208-30.398 32.004-66.85 32.004-106.010 0-11.552-1.028-22.87-2.992-33.866z","M692.626 449.11c-6.78-0.728-13.66-1.112-20.628-1.112-54.708 0-104.138 23-139.142 59.834 13.45 18.376 24.176 38.868 31.562 60.896 59.51-16.91 107.33-61.872 128.208-119.618z","M532.628 574.89c-5.25-14.524-12.21-28.238-20.628-40.902-8.418 12.664-15.378 26.378-20.628 40.902 6.778 0.728 13.66 1.112 20.628 1.112s13.85-0.382 20.628-1.112z","M352 447.998c-6.968 0-13.85 0.382-20.628 1.112 20.878 57.746 68.698 102.708 128.212 119.62 7.386-22.030 18.11-42.522 31.562-60.896-35.006-36.836-84.44-59.836-139.146-59.836z"],"grid":0,"tags":["ios-color-filter"]},{"paths":["M608 192h-32v160h160v-32h-128z","M650.6 128h-330.6v96h-96v672h480v-96h96v-522l-149.4-150zM672 864h-416v-608h64v544h352v64zM768 768h-416v-608h285.4l130.6 131.2v476.8z"],"grid":0,"tags":["ios-copy-outline"]},{"paths":["M288 832v-608h-64v672h480v-64h-384z","M650.6 128h-330.6v672h480v-522l-149.4-150zM736 352h-160v-160h32v128h128v32z"],"grid":0,"tags":["ios-copy"]},{"paths":["M576 288v32h224v544h-576v-544h224v-32h-256v608h640v-608z","M386.2 504.6l-23.2 23.2 149 149 149-149-23.2-23.2-109.4 109.4v-486h-32.8v486z"],"grid":0,"tags":["ios-download-outline"]},{"paths":["M528 288v326l109.6-109.4 23.2 23.2-148.8 149-149-149 23.4-23.2 109.6 109.4v-326h-304v608h640v-608z","M496 128h32v160h-32v-160z"],"grid":0,"tags":["ios-download"]},{"paths":["M894.2 512.4c-90.6-104.4-215.8-224.4-382.2-224.4-67.2 0-128.8 19-193.8 59.6-54.8 34.4-111 82.8-188.2 162.4l-2 2 13.4 13.8c110.2 112.8 205.4 210.2 370.6 210.2 73 0 143.8-23.8 216.4-72.8 61.8-41.8 114.4-94.8 156.6-137.6l11-11-1.8-2.2zM512 320c66.2 0 129.8 19 194.4 61.2 47.8 31.2 94.8 73.4 147.4 132.2-76.6 77.4-191.6 190.6-341.8 190.6-68.4 0-128.4-16.8-188.4-56.4-55-36.2-104.6-86.6-152.4-135.6 118.2-119.4 216.8-192 340.8-192z","M512 672c88.2 0 160-71.8 160-160s-71.8-160-160-160c-88.2 0-160 71.8-160 160s71.8 160 160 160zM512 384.6c70.4 0 128 57.2 128 127.4s-57.6 127.4-128 127.4c-70.4 0-127.8-57.2-127.8-127.4s57.4-127.4 127.8-127.4z","M576 512v0c0 35-28.8 64-63.6 64s-64.4-30.4-64.4-65.4 31.6-62.6 64-62.6v-32c-53 0-95.8 43.2-95.8 96.4s43 96.2 95.8 96.2 96-43.2 96-96.2v-0.4h-32z"],"grid":0,"tags":["ios-eye-outline"]},{"paths":["M894.2 512.4c-90.6-104.4-215.8-224.4-382.2-224.4-67.2 0-128.8 19-193.8 59.6-54.8 34.4-111 82.8-188.2 162.4l-2 2 13.4 13.8c110.2 112.8 205.4 210.2 370.6 210.2 73 0 143.8-23.8 216.4-72.8 61.8-41.8 114.4-94.8 156.6-137.6l11-11-1.8-2.2zM512 672c-88.2 0-160-71.8-160-160s71.8-160 160-160c88.2 0 160 71.8 160 160s-71.8 160-160 160z","M500.8 453.6c0-13.8 4-26.8 11-37.6-53 0-95.8 43.2-95.8 96.4s43 96.2 95.8 96.2 96-43 96-96.2v0c-10.8 7-23.8 11-37.6 11-38.2-0.2-69.4-31.4-69.4-69.8z"],"grid":0,"tags":["ios-eye"]},{"paths":["M96 310l367 202-367 201.8v-403.8zM544 311.6l352 200.4-352 200.8v-400.8zM512 256v246.4l-448-246.4v512l448-246.4v246.4l448-256-448-256z"],"grid":0,"tags":["ios-fastforward-outline"]},{"paths":["M512 256v246.4l-448-246.4v512l448-246.4v246.4l448-256-448-256z"],"grid":0,"tags":["ios-fastforward"]},{"paths":["M737 256h-450l-127 192v320h704v-320l-127-192zM826.8 448h-90.8v-136l90.8 136zM320 288h384v160h-96c0 53-43 96-96 96s-96-43-96-96h-96v-160zM288 312v136h-90.8l90.8-136zM832 736h-640v-256h196c14.2 55.2 64.4 96 124 96s109.8-40.8 124-96h196v256z"],"grid":0,"tags":["ios-filing-outline"]},{"paths":["M112 176v672h800v-672h-800zM256 816h-112v-96h112v96zM256 688h-112v-96h112v96zM256 560h-112v-96h112v96zM256 432h-112v-96h112v96zM256 304h-112v-96h112v96zM736 816h-448v-288h448v288zM736 496h-448v-288h448v288zM880 816h-112v-96h112v96zM880 688h-112v-96h112v96zM880 560h-112v-96h112v96zM880 432h-112v-96h112v96zM880 304h-112v-96h112v96z"],"grid":0,"tags":["ios-film-outline"]},{"paths":["M112 176v672h800v-672h-800zM256 816h-112v-96h112v96zM256 688h-112v-96h112v96zM256 560h-112v-96h112v96zM256 432h-112v-96h112v96zM256 304h-112v-96h112v96zM736 528h-448v-32h448v32zM880 816h-112v-96h112v96zM880 688h-112v-96h112v96zM880 560h-112v-96h112v96zM880 432h-112v-96h112v96zM880 304h-112v-96h112v96z"],"grid":0,"tags":["ios-film"]},{"paths":["M736 224c-22 2.8-49.8 7-79.4 7-46.2 0-88-11.4-130.4-20.4-43-9.2-87.4-18.6-134.4-18.6-93.8 0-125.6 20.2-128.8 22.4l-6.8 4.8v612.8h32v-286.6c12-5 43.6-13.8 103.8-13.8 43.6 0 84.4 16.6 127.8 26 44 9.4 89.6 19.2 139 19.2 29.4 0 55.4-4 77.4-6.6 12-1.4 22.6-2.8 32-4.4v-346.8c-9.4 1.8-20.2 3.4-32.2 5zM736 538c-22 2.8-47.8 7-77.4 7-46.2 0-90-9.4-132.4-18.4-43-9.2-87.2-26.6-134.2-26.6-51.4 0-83.8 6-103.8 12v-274.6c12-5 43.8-13.6 103.8-13.6 43.6 0 84.4 8.6 127.8 18 44 9.4 87.6 21.2 137 21.2 29.4 0 57.4-4 79.4-6.6l-0.2 281.6z"],"grid":0,"tags":["ios-flag-outline"]},{"paths":["M736 224c-22 2.8-49.8 7-79.4 7-46.2 0-88-11.4-130.4-20.4-43-9.2-87.4-18.6-134.4-18.6-93.8 0-125.6 20.2-128.8 22.4l-6.8 4.8v612.8h32v-286.6c12-5 43.6-13.8 103.8-13.8 43.6 0 84.4 16.6 127.8 26 44 9.4 89.6 19.2 139 19.2 29.4 0 55.4-4 77.4-6.6 12-1.4 22.6-2.8 32-4.4v-346.8c-9.4 1.8-20.2 3.4-32.2 5z"],"grid":0,"tags":["ios-flag"]},{"paths":["M914 192h-484c-5.582 0-8.542-1.17-12.188-4.816l-45.338-45.326c-9.744-9.192-17.752-13.858-34.474-13.858h-224c-27.57 0-50 20.634-50 46v672c0 26.634 23.366 50 50 50h800c25.366 0 46-22.43 46-50v-608c0-26.654-19.346-46-46-46zM114 160h224c6.994 0 7.474 0.378 12.35 4.976l44.834 44.836c9.68 9.68 20.744 14.188 34.816 14.188h484c8.896 0 14 5.104 14 14v84.752c-5.008-1.776-10.39-2.752-16-2.752h-800c-5.61 0-10.992 0.976-16 2.752v-148.752c0-8.646 9.344-14 18-14zM928 846c0 8.656-5.354 18-14 18h-800c-8.916 0-18-9.084-18-18v-478c0-8.822 7.178-16 16-16h800c8.822 0 16 7.178 16 16v478z"],"grid":0,"tags":["ios-folder-outline"]},{"paths":["M944 352h-864c-8.822 0-16 7.178-16 16v478c0 26.634 23.366 50 50 50h800c25.366 0 46-22.43 46-50v-478c0-8.822-7.178-16-16-16z","M914 192h-484c-5.582 0-8.542-1.17-12.188-4.816l-45.338-45.326c-9.744-9.192-17.752-13.858-34.474-13.858h-224c-27.57 0-50 20.634-50 46v148.752c5.008-1.776 10.39-2.752 16-2.752h864c5.61 0 10.992 0.976 16 2.752v-84.752c0-26.654-19.346-46-46-46z"],"grid":0,"tags":["ios-folder"]},{"paths":["M512 96c-229.726 0-416 186.272-416 416s186.274 416 416 416c229.744 0 416-186.276 416-416s-186.26-416-416-416zM594.302 884.358c-27.028 5.314-60.654 8.374-88 8.9-26.396-0.39-52.148-3.47-77-8.986-4.288-1.098-8.766-2.276-13.61-3.554l-48.834-130.87 39.29-77.848h211.708l1.14 2.152 38.68 77.704-47.236 128.564c-5.334 1.428-10.716 2.738-16.138 3.938zM178.634 327.044l36.726 105.576-84.608 73.22c1.032-64.77 18.288-125.664 47.882-178.796zM379.156 154.56l114.844 78.592v116.294l-141.994 120.134-107.14-48.818-44.664-128.038c44.018-62.408 106.276-111.064 178.954-138.164zM650.050 494.412l1.842 1.53-36.754 144.058h-206.276l-36.97-144.906 0.89-0.752 137.746-116.54 139.522 116.61zM893.252 505.842l-84.908-73.476 36.85-105.63c29.7 53.208 47.024 114.21 48.058 179.106zM823.128 292.134l-44.864 128.966-107.984 48.776-142.28-120.43v-116.294l115.192-78.83c72.724 26.966 135.81 75.504 179.936 137.812zM132.288 546.828l107.512-93.036 100.196 45.708 39.436 154.574-40.866 77.058-139.72-1.83c-36.696-52.72-60.428-115.092-66.558-182.474zM685.438 731.13l-40.868-77.058 39.504-154.832 99.994-45.562 107.644 93.15c-6.13 67.382-29.864 129.754-66.554 182.472l-139.72 1.83zM510.514 205.34l-92.252-62.996c30-7.612 61.402-11.672 93.738-11.67 31.922 0 62.932 3.964 92.586 11.388l-94.072 63.278zM332.846 763.058l1.696 5.022 39.892 99.562c-58.478-22.702-110.022-59.408-150.464-106.012l108.876 1.428zM649.126 867.808l35.868-97.216 3.254-7.496 111.784-1.464c-40.544 46.718-92.246 83.492-150.906 106.176z"],"grid":0,"tags":["ios-football-outline"]},{"paths":["M512 96c-229.726 0-416 186.272-416 416s186.274 416 416 416c229.744 0 416-186.276 416-416s-186.26-416-416-416zM594.302 884.358c-27.028 5.314-60.654 8.374-88 8.9-26.396-0.39-52.148-3.47-77-8.986-4.288-1.098-8.766-2.276-13.61-3.554l-48.834-130.87 39.29-77.848h211.708l1.14 2.152 38.68 77.704-47.236 128.564c-5.334 1.428-10.716 2.738-16.138 3.938zM379.156 154.56l114.844 78.592v116.294l-141.994 120.134-107.14-48.818-44.664-128.038c44.018-62.408 106.276-111.064 178.954-138.164zM823.128 292.134l-44.864 128.966-107.984 48.776-142.28-120.43v-116.294l115.192-78.83c72.724 26.966 135.81 75.504 179.936 137.812zM132.288 546.828l107.512-93.036 100.196 45.708 39.436 154.574-40.866 77.058-139.72-1.83c-36.696-52.72-60.428-115.092-66.558-182.474zM685.438 731.13l-40.868-77.058 39.504-154.832 99.994-45.562 107.644 93.15c-6.13 67.382-29.864 129.754-66.554 182.472l-139.72 1.83z"],"grid":0,"tags":["ios-football"]},{"paths":["M389.644 480h-69.644v-69.524c0-5.634-5.208-10.476-10.606-10.476h-44.29c-5.396 0-9.104 4.744-9.104 10.356v69.644h-70.934c-5.23 0-9.066 4.286-9.066 9.542v42.854c0 5.396 4.062 11.606 9.722 11.606h70.278v70.934c0 5.23 4.286 9.066 9.542 9.066h42.854c5.396 0 11.606-4.062 11.606-9.722v-70.28h69.524c5.634 0 10.476-5.208 10.476-10.606v-44.29c-0.002-5.396-4.746-9.104-10.358-9.104z","M724.628 558.126c-21.472 0-38.902 17.030-38.902 38.306 0 21.11 17.43 38.168 38.902 38.168 21.566 0 38.996-17.058 38.996-38.168 0-21.276-17.428-38.306-38.996-38.306z","M639.532 474.33c-21.472 0-38.902 17.206-38.902 38.336 0 21.132 17.43 38.306 38.902 38.306 21.566 0 38.996-17.174 38.996-38.306 0-21.13-17.43-38.336-38.996-38.336z","M809.724 474.33c-21.458 0-38.884 17.206-38.884 38.336 0 21.132 17.428 38.306 38.884 38.306 21.474 0 38.904-17.174 38.904-38.306 0-21.13-17.428-38.336-38.904-38.336z","M724.628 390.602c-21.472 0-38.902 17.204-38.902 38.338 0 21.132 17.43 38.292 38.902 38.292 21.566 0 38.996-17.158 38.996-38.292 0-21.136-17.428-38.338-38.996-38.338z","M738.538 324c51.676 0 99.408 18.628 134.408 52.458 35.504 34.314 55.054 82.036 55.054 134.378 0 52.606-19.612 100.81-55.222 135.738-35.126 34.452-82.8 53.426-134.24 53.426h-453.060c-51.424 0-99.096-18.974-134.234-53.43-35.624-34.934-55.244-83.136-55.244-135.734 0-52.334 19.56-100.056 55.078-134.376 35.008-33.83 82.74-52.46 134.4-52.46h453.060zM738.538 292h-453.060c-122.396 0-221.478 90.916-221.478 218.836 0 128.002 99.082 221.164 221.478 221.164h453.058c122.444 0 221.464-93.162 221.464-221.164 0-127.92-99.020-218.836-221.462-218.836v0z"],"grid":0,"tags":["ios-game-controller-a-outline"]},{"paths":["M738.538 292h-453.060c-122.396 0-221.478 90.916-221.478 218.836 0 128.002 99.082 221.164 221.478 221.164h453.058c122.444 0 221.464-93.162 221.464-221.164 0-127.92-99.020-218.836-221.462-218.836zM400 533.394c0 5.396-4.842 10.606-10.476 10.606h-69.524v70.278c0 5.66-6.208 9.722-11.606 9.722h-42.854c-5.256 0-9.542-3.836-9.542-9.066v-70.934h-70.276c-5.66 0-9.722-6.208-9.722-11.606v-42.854c0-5.256 3.836-9.542 9.066-9.542h70.934v-69.644c0-5.612 3.708-10.356 9.106-10.356h44.29c5.396 0 10.606 4.842 10.606 10.476v69.526h69.644c5.612 0 10.356 3.708 10.356 9.106v44.288zM639.532 550.972c-21.472 0-38.902-17.174-38.902-38.306 0-21.13 17.43-38.336 38.902-38.336 21.566 0 38.996 17.206 38.996 38.336 0 21.132-17.43 38.306-38.996 38.306zM724.628 634.602c-21.472 0-38.902-17.058-38.902-38.168 0-21.278 17.43-38.306 38.902-38.306 21.566 0 38.996 17.030 38.996 38.306 0 21.108-17.428 38.168-38.996 38.168zM724.628 467.23c-21.472 0-38.902-17.158-38.902-38.292s17.43-38.338 38.902-38.338c21.566 0 38.996 17.204 38.996 38.338s-17.428 38.292-38.996 38.292zM809.724 550.972c-21.458 0-38.884-17.174-38.884-38.306 0-21.13 17.428-38.336 38.884-38.336 21.474 0 38.904 17.206 38.904 38.336 0 21.132-17.428 38.306-38.904 38.306z"],"grid":0,"tags":["ios-game-controller-a"]},{"paths":["M616.152 407.858c-22.116 0-40.152 18.028-40.152 40.208 0 22.178 18.038 40.214 40.152 40.214 22.262 0 40.296-18.038 40.296-40.214 0.002-22.182-18.034-40.208-40.296-40.208z","M703.976 495.756c-22.116 0-40.106 17.898-40.106 40.212 0 22.128 17.99 40.032 40.106 40.032 22.292 0 40.296-17.902 40.296-40.032 0.002-22.314-18.004-40.212-40.296-40.212z","M270.468 368.734c-43.28 0-78.468 35.606-78.468 79.286 0 43.73 35.188 79.246 78.468 79.246 43.31 0 78.498-35.516 78.498-79.246 0-43.68-35.186-79.286-78.498-79.286zM270.246 486.914c-21.376 0-38.686-17.442-38.686-38.894 0-21.45 17.31-38.882 38.686-38.882 21.282 0 38.594 17.434 38.594 38.882 0 21.452-17.312 38.894-38.594 38.894z","M703.976 320c-22.116 0-40.106 18.028-40.106 40.214 0 22.18 17.99 40.166 40.106 40.166 22.292 0 40.296-17.986 40.296-40.166 0.002-22.186-18.004-40.214-40.296-40.214z","M791.894 407.858c-22.21 0-40.202 18.028-40.202 40.208 0 22.178 17.99 40.214 40.202 40.214 22.118 0 40.106-18.038 40.106-40.214 0-22.182-17.988-40.208-40.106-40.208z","M932.558 497.732c-42.314-176.942-87.262-270.978-176.908-297.66-19.53-5.802-36.154-8.072-51.498-8.072-55.196 0-93.876 29.366-192.16 29.366-98.348 0-137.004-29.362-192.124-29.366-15.33 0-31.926 2.27-51.442 8.072-89.738 26.682-134.684 120.718-176.922 297.66-42.362 176.946-34.668 304.726 15.358 328.578 8.142 3.89 16.462 5.69 24.908 5.69 43.388 0 90.278-47.676 135.318-104.094 51.308-64.21 64.228-65.906 220.556-65.906h48.686c156.294 0 169.256 1.692 220.564 65.906 45.052 56.414 91.94 104.008 135.33 104.008 8.452 0 16.768-1.758 24.914-5.646 50.010-23.852 57.704-151.59 15.42-328.536zM903.354 797.432c-3.67 1.752-7.208 2.568-11.128 2.568-12.044 0-28.154-8.098-46.59-23.416-18.362-15.26-38.614-37.018-63.74-68.478-25.918-32.44-47.334-56.458-87.056-67.898-33.294-9.586-77.248-10.208-158.508-10.208h-48.686c-81.266 0-125.222 0.622-158.518 10.21-39.706 11.438-61.12 35.37-87.046 67.816-25.112 31.454-45.36 53.254-63.724 68.516-18.432 15.316-34.54 23.436-46.586 23.436-3.864 0-7.502-0.83-11.136-2.564-19.112-9.114-45.144-95.346 1.996-292.258 42.774-179.182 84.762-253.554 154.918-274.414 15.266-4.54 29.108-6.744 42.318-6.744 19.484 0 37.198 4.634 59.624 10.498 32.14 8.406 72.144 18.87 132.504 18.87 60.296 0 100.292-10.456 132.43-18.858 22.458-5.872 40.2-10.508 59.73-10.508 13.236 0 27.102 2.208 42.37 6.742 70.074 20.856 112.060 95.234 154.912 274.428 47.050 196.912 21.022 283.15 1.916 292.262z"],"grid":0,"tags":["ios-game-controller-b-outline"]},{"paths":["M270.246 409.136c-21.376 0-38.686 17.434-38.686 38.882 0 21.454 17.31 38.894 38.686 38.894 21.282 0 38.594-17.442 38.594-38.894 0-21.448-17.312-38.882-38.594-38.882z","M932.558 497.732c-42.314-176.942-87.262-270.978-176.908-297.66-19.53-5.802-36.154-8.072-51.498-8.072-55.196 0-93.876 29.366-192.16 29.366-98.348 0-137.004-29.362-192.124-29.366-15.33 0-31.926 2.27-51.442 8.072-89.738 26.682-134.684 120.718-176.922 297.66-42.362 176.946-34.668 304.726 15.358 328.578 8.142 3.89 16.462 5.69 24.908 5.69 43.388 0 90.278-47.676 135.318-104.094 51.308-64.21 64.228-65.906 220.556-65.906h48.686c156.294 0 169.256 1.692 220.564 65.906 45.052 56.414 91.94 104.008 135.33 104.008 8.452 0 16.768-1.758 24.914-5.646 50.010-23.852 57.704-151.59 15.42-328.536zM270.468 527.266c-43.28 0-78.468-35.516-78.468-79.246 0-43.68 35.188-79.286 78.468-79.286 43.31 0 78.498 35.606 78.498 79.286 0 43.73-35.186 79.246-78.498 79.246zM616.152 488.28c-22.116 0-40.152-18.038-40.152-40.214 0-22.18 18.038-40.208 40.152-40.208 22.262 0 40.296 18.028 40.296 40.208 0.002 22.176-18.034 40.214-40.296 40.214zM703.976 576c-22.116 0-40.106-17.902-40.106-40.032 0-22.314 17.99-40.212 40.106-40.212 22.292 0 40.296 17.898 40.296 40.212 0.002 22.13-18.004 40.032-40.296 40.032zM703.976 400.38c-22.116 0-40.106-17.986-40.106-40.166 0-22.188 17.99-40.214 40.106-40.214 22.292 0 40.296 18.028 40.296 40.214 0.002 22.18-18.004 40.166-40.296 40.166zM791.894 488.28c-22.21 0-40.202-18.038-40.202-40.214 0-22.18 17.99-40.208 40.202-40.208 22.118 0 40.106 18.028 40.106 40.208 0 22.176-17.988 40.214-40.106 40.214z"],"grid":0,"tags":["ios-game-controller-b"]},{"paths":["M930.8 494c-4.4-44-24.8-86-57.8-116.8-34.2-31.8-78.6-49.4-125.4-49.4-83 0-154.6 54.8-177 134-14-14-37-23.4-58.6-23.4s-44.6 9.4-58.6 23.4c-22.4-79.2-94-134-177-134-46.6 0-91.2 17.4-125.4 49.2-33 31-53.4 73-57.8 117h-29.2v36h29.2c4.4 44 24.8 86 57.8 116.8 34.2 31.8 78.6 49.4 125.4 49.4 101.6 0 184.2-82.4 184.2-184 0-0.2 0-0.2 0-0.2v0c0-19.8 23-43.2 51.4-43.2s51.4 23.4 51.4 43.2v0c0 0 0 0 0 0.2 0 101.6 82.6 184 184.2 184 46.6 0 91.2-17.4 125.4-49.4 33-30.8 53.4-73 57.8-117h29.2v-36h-29.2zM747.6 666c-85 0-154-69.2-154-154 0-85 69.2-154 154-154 85 0 154 69.2 154 154 0 85-69 154-154 154zM276.4 666c-85 0-154-69.2-154-154 0-85 69.2-154 154-154 85 0 154 69.2 154 154 0 85-69 154-154 154z"],"grid":0,"tags":["ios-glasses-outline"]},{"paths":["M930.8 494c-4.4-44-24.8-86-57.8-116.8-34.2-31.8-78.6-49.4-125.4-49.4-83 0-154.6 54.8-177 134-14-14-37-23.4-58.6-23.4s-44.6 9.4-58.6 23.4c-22.4-79.2-94-134-177-134-46.6 0-91.2 17.4-125.4 49.2-33 31-53.4 73-57.8 117h-29.2v36h29.2c4.4 44 24.8 86 57.8 116.8 34.2 31.8 78.6 49.4 125.4 49.4 101.6 0 184.2-82.4 184.2-184 0-0.2 0-0.2 0-0.2v0c0-19.8 23-43.2 51.4-43.2s51.4 23.4 51.4 43.2v0c0 0 0 0 0 0.2 0 101.6 82.6 184 184.2 184 46.6 0 91.2-17.4 125.4-49.4 33-30.8 53.4-73 57.8-117h29.2v-36h-29.2z"],"grid":0,"tags":["ios-glasses"]},{"paths":["M718.77 160c-78.838 0-164.428 35.198-206.77 105.6-42.34-70.402-127.932-105.6-206.77-105.6-137.936 0-241.23 86.476-241.23 231.558 0 62.576 25.124 143.848 81.846 211.314 56.718 67.47 90.458 103.4 200.306 176 109.848 72.604 165.848 85.128 165.848 85.128s56-12.524 165.848-85.128c109.846-72.6 143.588-108.53 200.306-176 56.722-67.466 81.846-148.738 81.846-211.314 0-145.082-103.294-231.558-241.23-231.558zM853.66 582.282c-53.704 63.88-84.36 97.79-193.458 169.894-80.474 53.192-130.504 72.602-148.204 78.466-17.7-5.866-67.728-25.278-148.204-78.466-109.096-72.104-139.752-106.012-193.458-169.896-24.13-28.702-43.714-62.548-56.632-97.886-11.58-31.684-17.704-63.786-17.704-92.836 0-60.568 20.262-111.286 58.594-146.67 18.28-16.874 40.316-29.984 65.504-38.968 25.89-9.238 54.532-13.92 85.132-13.92 76.036 0 146.434 35.364 179.348 90.092l27.422 45.596 27.422-45.596c32.916-54.728 103.314-90.092 179.348-90.092 30.6 0 59.242 4.682 85.132 13.918 25.188 8.986 47.224 22.096 65.504 38.968 38.332 35.386 58.594 86.104 58.594 146.672 0 29.050-6.124 61.152-17.708 92.836-12.916 35.336-32.5 69.184-56.632 97.888z"],"grid":0,"tags":["ios-heart-outline"]},{"paths":["M718.77 160c-78.838 0-164.428 35.198-206.77 105.6-42.34-70.402-127.932-105.6-206.77-105.6-137.936 0-241.23 86.476-241.23 231.558 0 62.576 25.124 143.848 81.846 211.314 56.718 67.47 90.458 103.4 200.306 176 109.848 72.604 165.848 85.128 165.848 85.128s56-12.524 165.848-85.128c109.846-72.6 143.588-108.53 200.306-176 56.722-67.466 81.846-148.738 81.846-211.314 0-145.082-103.294-231.558-241.23-231.558z"],"grid":0,"tags":["ios-heart"]},{"paths":["M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256zM800 864h-160v-256h-256v256h-160v-368.62l288-230.4 288 230.4v368.62z","M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996zM288 307.198l-64 51.2v-134.398h64v83.198z"],"grid":0,"tags":["ios-home-outline"]},{"paths":["M512 224l-320 256v416h224v-256h192v256h224v-416l-320-256z","M512 128l-192 153.6v-89.6h-128v191.998l-64 50.998 23.020 22.768 360.98-288.784 360.98 288.786 23.020-22.77-384-306.996z"],"grid":0,"tags":["ios-home"]},{"paths":["M902.458 376.196c-37.094-36.262-86.558-56.196-139.288-56.196-52.726 0-102.19 19.934-139.284 56.196l-84.458 82.374 27.298 26.894 84.458-82.612c29.866-29.058 69.528-45.146 111.756-45.146 42.226 0 81.892 16.088 111.756 45.146 61.594 60.278 61.594 158.26 0 218.296-29.864 29.058-69.53 45.146-111.756 45.146-42.228 0-81.89-16.088-111.756-45.146l-251.042-244.952c-37.33-36.262-86.792-56.196-139.288-56.196-52.726 0-102.19 19.934-139.286 56.196-38.338 37.422-57.526 86.686-57.568 135.804-0.042 49.222 19.146 98.298 57.568 135.804 37.096 36.26 86.558 56.196 139.286 56.196 52.73 0 102.19-19.936 139.29-56.196l84.222-82.372-27.294-26.658-84.458 82.374c-29.864 29.058-69.528 45.146-111.758 45.146-42.226 0-81.888-16.088-111.752-45.146-61.598-60.28-61.598-158.26 0-218.296 29.864-29.058 69.526-45.146 111.752-45.146 42.23 0 81.894 16.088 111.758 45.146l251.040 244.954c37.326 36.258 86.79 56.194 139.286 56.194 52.726 0 102.19-19.936 139.286-56.196 38.496-37.344 57.744-86.604 57.774-135.804 0.030-49.202-19.16-98.34-57.542-135.804z"],"grid":0,"tags":["ios-infinite-outline"]},{"paths":["M913.642 364.754c-40.078-39.178-93.518-60.754-150.472-60.754s-110.39 21.576-150.42 60.708l-78.212 75.77 50.12 49.378 77.686-75.538c26.916-26.19 62.642-40.614 100.598-40.614 37.958 0 73.682 14.424 100.564 40.582 26.726 26.154 41.424 60.936 41.386 97.94-0.038 36.886-14.726 71.5-41.354 97.456-26.916 26.19-62.64 40.614-100.598 40.614-37.956 0-73.682-14.424-100.582-40.598l-251.066-244.98c-40.31-39.154-93.736-60.718-150.438-60.718-56.954 0-110.39 21.576-150.46 60.746-40.188 39.226-62.348 91.518-62.394 147.24-0.048 55.644 22.11 107.946 62.384 147.26 40.080 39.178 93.518 60.754 150.47 60.754 56.95 0 110.388-21.576 150.446-60.726l77.988-75.818-50.176-49.004-77.658 75.23c-26.916 26.19-62.642 40.614-100.6 40.614-37.954 0-73.678-14.424-100.56-40.582-26.728-26.154-41.428-60.938-41.388-97.942 0.038-36.886 14.726-71.498 41.356-97.454 26.916-26.19 62.64-40.614 100.594-40.614 37.958 0 73.684 14.424 100.584 40.598l251.064 244.978c40.308 39.156 93.734 60.72 150.436 60.72 56.952 0 110.388-21.576 150.426-60.71 40.358-39.146 62.602-91.454 62.634-147.28 0.034-55.676-22.116-107.974-62.358-147.256z"],"grid":0,"tags":["ios-infinite"]},{"paths":["M851 269.6c9.4-11.8 15-27 15-43.2 0-38.4-31.2-69.8-69.6-69.8-16.4 0-31.4 5.6-43.2 15-68-48.4-150-75.6-239.8-75.6-229.8-0-417.4 185-417.4 415.2s187.4 416.8 417.2 416.8c229.8 0 414.8-186.6 414.8-416.8 0-90-28.6-173.4-77-241.6zM796 182.6c24.4 0 44 19.8 44 44 0 24.4-19.8 44-44 44-24.4 0-44-19.8-44-44s19.6-44 44-44zM783.6 783.4c-35.2 35.2-76.4 63.2-122.2 82.6-47.4 20-96.4 30.4-148.4 30.4-51.8 0-103.4-10.2-150.8-30.4-45.8-19.4-86.8-47-122.2-82.6-35.2-35.2-63-76.6-82.4-122.4-20-47.4-30.2-97.8-30.2-149.8 0-51.8 10.2-102.4 30.2-149.8 19.4-45.8 47-87 82.4-122.4s76.4-63.2 122.2-82.6c47.4-20 98.8-28.2 150.8-28.2 51.8 0 101 8 148.4 28.2 25.4 10.8 49.4 24.2 71.8 40-4.2 9-6.6 19-6.6 29.8 0 38.4 31.2 69.8 69.6 69.8 10.6 0 20.6-2.4 29.8-6.6 15.8 22.4 29.2 46.4 40 72 20 47.4 30.2 97.8 30.2 149.8 0 51.8-10.2 102.4-30.2 149.8-19.4 45.8-47 87-82.4 122.4z","M513 320.2c-106 0-192 85.6-192 191.8s85.8 192.2 192 192.2c106 0 192-86 192-192.2s-86-191.8-192-191.8zM513 671.6c-88.2 0-159.4-71.6-159.4-159.6 0-88.2 71.2-159.2 159.4-159.2s159.4 71.2 159.4 159.2c0 88.2-71.4 159.6-159.4 159.6z"],"grid":0,"tags":["ios-ionic-outline"]},{"paths":["M789.2 682.4c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8zM789.2 864c-41.2 0-74.8-33.6-74.8-74.8s33.6-74.8 74.8-74.8 74.8 33.6 74.8 74.8c0 41.2-33.6 74.8-74.8 74.8z","M512 682.4c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8zM512 864c-41.2 0-74.8-33.6-74.8-74.8s33.6-74.8 74.8-74.8 74.8 33.6 74.8 74.8c0 41.2-33.6 74.8-74.8 74.8z","M234.8 682.4c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8zM234.8 864c-41.2 0-74.8-33.6-74.8-74.8s33.6-74.8 74.8-74.8 74.8 33.6 74.8 74.8c0 41.2-33.4 74.8-74.8 74.8z","M789.2 405.2c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8zM789.2 586.8c-41.2 0-74.8-33.6-74.8-74.8s33.6-74.8 74.8-74.8 74.8 33.6 74.8 74.8c0 41.2-33.6 74.8-74.8 74.8z","M512 405.2c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8zM512 586.8c-41.2 0-74.8-33.6-74.8-74.8s33.6-74.8 74.8-74.8 74.8 33.6 74.8 74.8c0 41.2-33.6 74.8-74.8 74.8z","M234.8 405.2c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8zM234.8 586.8c-41.2 0-74.8-33.6-74.8-74.8s33.6-74.8 74.8-74.8 74.8 33.6 74.8 74.8c0 41.2-33.4 74.8-74.8 74.8z","M789.2 341.6c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8zM789.2 160c41.2 0 74.8 33.6 74.8 74.8s-33.6 74.8-74.8 74.8-74.8-33.6-74.8-74.8c-0-41.2 33.4-74.8 74.8-74.8z","M512 128c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8zM512 309.6c-41.2 0-74.8-33.6-74.8-74.8s33.6-74.8 74.8-74.8 74.8 33.6 74.8 74.8c0 41.2-33.6 74.8-74.8 74.8z","M234.8 128c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8zM234.8 309.6c-41.2 0-74.8-33.6-74.8-74.8s33.6-74.8 74.8-74.8 74.8 33.6 74.8 74.8c0 41.2-33.4 74.8-74.8 74.8z"],"grid":0,"tags":["ios-keypad-outline"]},{"paths":["M789.2 682.4c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8z","M512 682.4c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8z","M234.8 682.4c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8z","M789.2 405.2c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8z","M512 405.2c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8z","M234.8 405.2c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8z","M789.2 341.6c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8z","M512 128c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8z","M234.8 128c-59 0-106.8 47.8-106.8 106.8s47.8 106.8 106.8 106.8c59 0 106.8-47.8 106.8-106.8s-47.8-106.8-106.8-106.8z"],"grid":0,"tags":["ios-keypad"]},{"paths":["M876 375.426l-63.854-110.852-236.146 136.574v-273.148h-128v273.148l-236.146-136.574-63.876 110.852 236.206 136.574-236.188 136.574 63.856 110.852 236.148-136.574v273.148h128v-273.148l236.144 136.574 63.878-110.852-236.206-136.574 236.184-136.574zM832.352 660.25l-31.926 55.732-256.426-147.982v296h-64v-296l-256.426 148-31.938-55.57 256.456-148.394-256.448-148.314 31.928-55.718 256.428 147.996v-296h64v296l256.426-148 31.938 55.57-256.456 148.358 256.444 148.322z"],"grid":0,"tags":["ios-medical-outline"]},{"paths":["M876 375.426l-63.854-110.852-236.146 136.574v-273.148h-128v273.148l-236.146-136.574-63.876 110.852 236.206 136.574-236.188 136.574 63.856 110.852 236.148-136.574v273.148h128v-273.148l236.144 136.574 63.878-110.852-236.206-136.574 236.184-136.574z"],"grid":0,"tags":["ios-medical"]},{"paths":["M544 416v128h128v64h-128v128h-64v-128h-128v-64h128v-128h64zM576 384h-128v128h-128v128h128v128h128v-128h128v-128h-128v-128z","M672 256v-64c-1-36.4-27.2-64-64.4-64h-198.2c-37.2 0-57.4 27.4-57.4 64v64h-256v640h832v-640h-256zM384 196.2c0-20.4 5.8-36.2 27.4-36.2h194.2c20.8 0 34.4 15.4 34.4 36.2v59.8h-256v-59.8zM896 864h-768v-576h768v576z"],"grid":0,"tags":["ios-medkit-outline"]},{"paths":["M544 544v-128h-64v128h-128v64h128v128h64v-128h128v-64h-96z","M672 256v-64c-1-36.4-27.2-64-64.4-64h-198.2c-37.2 0-57.4 27.4-57.4 64v64h-256v640h832v-640h-256zM384 196.2c0-20.4 5.8-36.2 27.4-36.2h194.2c20.8 0 34.4 15.4 34.4 36.2v59.8h-256v-59.8zM704 640h-128v128h-128v-128h-128v-128h128v-128h128v128h128v128z"],"grid":0,"tags":["ios-medkit"]},{"paths":["M512 476c19.8 0 36 16.2 36 36s-16.2 36-36 36-36-16.2-36-36 16.2-36 36-36zM512 448c-35.4 0-64 28.6-64 64s28.6 64 64 64c35.4 0 64-28.6 64-64s-28.6-64-64-64v0z","M256.8 476c19.8 0 36 16.2 36 36s-16.2 36-36 36c-19.8 0-36-16.2-36-36s16.2-36 36-36zM256.8 448c-35.4 0-64 28.6-64 64s28.6 64 64 64c35.4 0 64-28.6 64-64s-28.8-64-64-64v0z","M768 476c19.8 0 36 16.2 36 36s-16.2 36-36 36-36-16.2-36-36 16.2-36 36-36zM768 448c-35.4 0-64 28.6-64 64s28.6 64 64 64 64-28.6 64-64-28.6-64-64-64v0z"],"grid":0,"tags":["ios-more-outline"]},{"paths":["M512 448c-35.4 0-64 28.6-64 64s28.6 64 64 64c35.4 0 64-28.6 64-64s-28.6-64-64-64v0z","M256.8 448c-35.4 0-64 28.6-64 64s28.6 64 64 64c35.4 0 64-28.6 64-64s-28.8-64-64-64v0z","M768 448c-35.4 0-64 28.6-64 64s28.6 64 64 64 64-28.6 64-64-28.6-64-64-64v0z"],"grid":0,"tags":["ios-more"]},{"paths":["M512 129c102.2 0 198.4 39.8 270.8 112.2s112.2 168.4 112.2 270.8-39.8 198.4-112.2 270.8-168.4 112.2-270.8 112.2-198.4-39.8-270.8-112.2c-72.2-72.4-112.2-168.6-112.2-270.8s39.8-198.4 112.2-270.8c72.4-72.2 168.6-112.2 270.8-112.2zM512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416v0z","M704 320l-447.4 192h255.4v256z"],"grid":0,"tags":["ios-navigate-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM512 768v-256h-255.4l447.4-192-192 448z"],"grid":0,"tags":["ios-navigate"]},{"paths":["M716 467.71l0.826-0.078c-0.274-0.274-0.092-0.202-0.37-0.474l-156.868-157.158c-11.666-12-28.386-20.308-46.97-20.308-23.622 0-44.23 12.308-55.27 32.308h-0.014c0 0-14.18 21.988-36.54 57.748l65.062 79.274c5.878 7.538 6.592 15.602 2.822 19.378l-0.228 0.142c-1.818 1.818-4.042 2.66-6.548 2.66-3.816 0-8.284-1.98-12.97-5.536l-71.744-58.836c-47.092 75.31-113.354 181.268-166.9 266.902l38.144 46.674c5.878 7.54 6.592 15.768 2.82 19.544l-0.228 0.228c-1.822 1.826-4.056 2.684-6.574 2.684-3.81 0-8.272-1.962-12.944-5.51l-42.134-33.066c-39.904 63.816-69.372 110.642-73.372 114.446v0.006c-6 10.124-8.17 22.264-8.17 35.328 0 35.31 29.314 63.934 64.57 63.934 15.642 0 29.14-6.79 41.598-15l229.302-168.218-57.676-70.716c-5.88-7.538-6.536-15.774-2.764-19.55l0.256-0.228c1.824-1.824 4.068-2.682 6.588-2.682 3.81 0 8.28 1.962 12.952 5.51l75.728 63.18c109.676-80.492 211.78-154.296 211.78-154.296h0.010c15.678-12 24.946-31.422 24.946-52.476 0-17.408-7.12-34.28-19.12-45.808v-0.006zM691.062 539.668c-5.328 3.868-93.384 67.864-191.528 139.798l-57.612-47.834c-10.49-7.962-21.326-11.996-32.216-11.996-10.93 0-21.184 4.194-28.916 11.818l-0.128 0.124-0.166 0.164-0.166 0.166c-15.616 15.642-15.522 41.646 0.222 61.834l0.22 0.286 0.226 0.276 36.446 44.624-201.312 147.792c-10.132 6.608-16.854 9.314-23.084 9.314-17.644 0-32-14.342-32-31.966 0-6.172 1.388-12.090 4.034-17.246 4.782-6.322 13.2-19.752 37.31-58.702 5.086-8.216 10.504-16.974 16.268-26.258l13.17 10.664 0.4 0.304c10.49 7.962 21.33 12 32.222 12 11.034 0 21.384-4.278 29.142-12.046l0.228-0.226c15.612-15.634 15.512-41.64-0.236-61.832l-0.226-0.288-0.23-0.284-23.628-28.91 135.504-216.692 44.652 36.586c10.508 7.976 21.356 12.020 32.246 12.020 9.908 0 19.262-3.45 26.678-9.78l0.922-0.674 1.742-1.748c15.58-15.606 15.48-41.556-0.236-61.708l-0.24-0.306-50.726-61.378c5.914-9.406 10.914-16.982 14.81-22.976l10.418-16.988c5.554-10.050 15.522-16.314 27.346-16.314 8.734 0 17.52 4.084 24.114 10.86l9.402 9.856h0.244l137.622 138.57v0.752l10.372 9.432c5.586 5.38 9.078 13.564 9.078 22.454 0 10.392-4.516 20.246-12.388 26.458z","M879.988 230.35l-192.832 111.51 132.504-229.876-27.638-15.984-4.976 8.626-141.55 245.57 33.34 33.392 217.112-125.552z"],"grid":0,"tags":["ios-nutrition-outline"]},{"paths":["M718 467.24l-0.212-0.078c-0.272-0.276-0.612-0.886-0.888-1.158l-157.806-158.004c-11.696-12-28.46-20.336-47.094-20.336-23.684 0-44.348 12.336-55.416 32.336h-0.014c0 0-14.218 22.702-36.636 58.498l65.234 79.7c5.894 7.544 6.61 15.79 2.828 19.57l-0.228 0.228c-4.592 4.592-11.788 3.070-19.57-2.828l-71.934-58.878c-47.216 75.386-113.654 181.462-167.342 267.184l38.246 46.724c5.894 7.544 6.61 15.79 2.828 19.57l-0.228 0.228c-4.592 4.592-11.788 3.070-19.57-2.828l-40.44-33.1c-40.010 63.88-69.37 110.754-71.758 114.562v0.006c-6 10.132-10 22.288-10 35.364 0 35.348 28.488 64 63.836 64 15.684 0 28.766-6.796 41.256-15.016l229.684-168.39-57.942-70.79c-5.894-7.544-6.61-15.79-2.828-19.57l0.228-0.228c4.592-4.592 11.788-3.068 19.57 2.83l75.926 62.43c109.97-80.57 212.34-155.266 212.34-155.266h0.010c15.718-12 26.048-30.638 26.048-51.714 0-17.426-6.128-33.5-18.128-45.042v-0.004z","M896 277.562l-32.972-55.388-132.46 76.424 98.462-170.426-55.238-32.172-139.998 242.168 57.176 57.176z"],"grid":0,"tags":["ios-nutrition"]},{"paths":["M382 224v576h-94v-576h94zM414 192h-158v640h158v-640z","M736 224v576h-94v-576h94zM768 192h-158v640h158v-640z"],"grid":0,"tags":["ios-pause-outline"]},{"paths":["M256 192h158v640h-158v-640z","M610 192h158v640h-158v-640z"],"grid":0,"tags":["ios-pause"]},{"paths":["M512 224v0 0z","M698.4 669.6c-27-9.4-56.2-10-83.2-19.4-8.2-2.8-24.4-6.2-27.8-15.6-3.2-9.2-3.2-20-3.8-29.6-0.4-7.6-0.6-15.2-0.6-22.8 0-5 12.8-15.6 15.6-20.2 10.8-18 11.8-42.2 13.8-62.6 17.4 4.8 19.6-27.4 22.6-37.2 2.2-6.8 15.6-53.6-5.2-47.2 5-8.8 7-19.6 8.4-29.4 4-25.6 5.6-53.6-2.2-78.6-16.2-52-66-81.2-118.6-82.8-53.4-1.8-107 23.8-127 75.6-9.6 25.2-8.8 52.6-5.6 79 1.4 12 3.4 25.4 9.4 36.2-19.4-5.8-9 35.4-6.8 42.6 3.2 10.2 6 46.8 24.2 41.8 1.6 16.2 3.4 32.8 7.8 48.6 3 10.6 9.2 19.6 16.4 27.8 3.6 4 5.4 4.4 5.2 9.6-0.2 15.6 0.2 32.4-3.8 47.6s-37.4 21.6-50.8 24.4c-36 7.4-69.2 10.8-99.2 33.2-35 25.8-53.2 66-53.2 109.4 166.6 0 333.2 0 499.8 0 18.8 0 37.4 0 56.2 0 0-59-35.6-111-91.6-130.4-22.4-7.8 22.6 7.8 0 0zM294.2 727.2c11.2-11.8 25.4-22.2 40.8-28 21-8 44.8-7.6 66.6-13.2 18-4.6 40.4-11.8 54.4-24.8 12.8-12 14.2-30.4 15.4-47 1-14 0.8-27.8 0.8-41.8 0-9.8-11.4-15.4-17-23.2-9-12.2-9.4-30.4-11.2-45-0.8-6.4-1-14.6-6.4-19-6-4.8-10.4-7.4-13.4-15-4-10.4-5.4-21.6-8.6-32.4-2-7 5-13.6 7.8-19.4 5.2-10.6-3.8-27-5.6-38-5.6-32.8-5.4-68.6 18.2-94.6 47.4-52.4 156-35.8 171.6 37.8 4.8 23 1.8 49.8-4.6 72.2-2.8 9.6-6 16.6-0.4 26 8.4 13.6 4.8 22.4 0.8 37.6-3.2 12.6-7.2 18.2-16.8 26-8 6.4-6.8 22.4-8.2 31.6-1.6 11.2-2.6 23-9.4 32.4-2.6 3.6-16.8 14.8-16.8 18.6 0 22-1 44.4 2.8 66.2 5.2 31 31.2 38.4 57.2 49 26.4 10.2 57 6.4 82.6 19 26.4 13 51.8 36.8 59.4 66.2-158.6 0-317.2 0-475.8 0-2.8 0-5.6 0-8.4 0 3.8-16.6 13-29.2 24.2-41.2 18.4-19.4-11.8 12.6 0 0z","M288.2 644c14-7 29.2-8.6 44.6-10.2 5.6-0.6 8.2-4.4 4-9.8-8-10.2-35.6-12.2-47.2-16.8-7.2-2.8-9.2-5.4-9.8-13.4-0.2-3.6-2.2-19.6 0.6-22.2 2-2 14.6-1.2 17.4-1.6 11.4-1.4 23-3.8 33.8-8 4.6-1.8 9-4 13-6.8 4.8-3.6-3.6-12.4-5.8-17.2-6.8-15-9.8-31.4-10.8-47.8-2-32.2 3-64.6-3-96.6-9-49-46.8-73.6-95-73.6-29.8 0-59.2 10.2-75.8 36.2-18.4 28.6-17.4 64.2-16.4 96.8 0.6 18.6 1.4 37.4-1.2 56-1.2 8-3 15.8-5.8 23.4-2.2 5.8-13.4 20.2-9 23.2 16.6 11.8 44.6 15.8 64.6 14.2 0.6 9.8 2.4 22.4-1.2 31.6-5.6 14.4-47.4 18.2-60 22.4-35.2 11.8-61.2 41.2-61.2 80.2 36.6 0 73 0 109.6 0 16.4 0 32.8 0 49.4 0 2.6 0 12.6-18.6 15.4-21.6 14-15.6 31.2-29 49.8-38.4 18-9-29.2 14.8 0 0zM205.6 672c-32.6 0-65.2 0-97.8 0 14.2-23.6 49.8-22 73.2-30.4 21.6-7.8 35.4-21 37.6-44 0.2-2.6 0.4-58.4-1.8-58.4-17.4-0.6-35.6-0.2-53-2.8 13.8-44.6 0.6-90.6 8-135.6 5.4-32.6 26.2-50.6 59.4-50.6 31.8 0 55.4 14.8 62.2 46.8 9.6 46.4-4 93.8 10.8 139.8-11 2.8-22.6 3.2-34 3.6-5.6 0.2-11.4 0.4-17 0.6-3.6 0.2-2.4 6.4-2.6 9.4-2 21.8-10 56.2 7.4 73.8-19.2 12-40 28.6-52.4 47.8z","M799.6 704c53.4 0 107 0 160.4 0 0-39-26.2-68.6-61.4-80.2-16.2-5.2-47.4-6.8-59-20.8-5.8-7-2.6-24.8-2-33.2 8.8 0.8 18.4-0.6 27.4-1.8 8.2-1.2 16.2-2.8 24-5.6 3.6-1.4 7.2-2.8 10.6-4.8 7.8-4.6 4.2-5.4 0.2-12.2-21.8-36.6-12-83-13-123.2-0.8-33.4-9.6-70-40-88.8-27.4-17-68-17.6-97.4-5.6-84.8 34-34.8 146.4-63.8 210.8-5 10.8-12.2 14.6 0.4 21 7 3.6 14.6 6 22.2 7.8 11.6 2.8 23.6 4.4 35.6 4.8 2 0 0.6 25.2 0 27.8-2.2 9.8-23.6 12.6-31.6 14.8-8.2 2.2-21.8 2.8-25.8 11.4-6 12.8 19.8 9.6 26.2 10.8 20.6 3.8 38.8 15.2 54.8 28.2 11.8 9.6 27.8 23.2 32.2 38.8zM798.8 649.8c-10.2-9.4-20.8-18.6-32.6-26 17.6-17.6 9.4-51.8 7.4-73.8-1.2-12.6-4-9.4-16.6-9.8-12-0.4-25.6 0.2-37-3.6 14.4-44.6 2.6-90.4 10-135.8 5.6-34.2 29-51 63-51 30.8 0 52 15.4 58.4 46 9.8 46.2-5.2 94 9 140-17 2.6-34.6 2-51.8 2.6-4.2 0.2-3.8 50.2-3.4 54.6 1.4 23.4 12.2 37.6 34.4 46.6 24.2 9.8 62 7.2 76.8 31.8-18.6 0-37 0-55.6 0-11.2 0-22.4 0-33.8 0-14.2 0.2-17.8-12.2-28.2-21.6-10-9.2 8 7.2 0 0z"],"grid":0,"tags":["ios-people-outline"]},{"paths":["M698.4 669.6c22.6 7.8-22.4-7.8 0 0v0z","M698.4 669.6c-27-9.4-56.2-10-83.2-19.4-8.2-2.8-24.4-6.2-27.8-15.6-3.2-9.2-3.2-20-3.8-29.6-0.4-7.6-0.6-15.2-0.6-22.8 0-5 12.8-15.6 15.6-20.2 10.8-18 11.8-42.2 13.8-62.6 17.4 4.8 19.6-27.4 22.6-37.2 2.2-6.8 15.6-53.6-5.2-47.2 5-8.8 7-19.6 8.4-29.4 4-25.6 5.6-53.6-2.2-78.6-16.2-52-66-81.2-118.6-82.8-53.4-1.8-107 23.8-127 75.6-9.6 25.2-8.8 52.6-5.6 79 1.4 12 3.4 25.4 9.4 36.2-19.4-5.8-9 35.4-6.8 42.6 3.2 10.2 6 46.8 24.2 41.8 1.6 16.2 3.4 32.8 7.8 48.6 3 10.6 9.2 19.6 16.4 27.8 3.6 4 5.4 4.4 5.2 9.6-0.2 15.6 0.2 32.4-3.8 47.6s-37.4 21.6-50.8 24.4c-36 7.4-69.2 10.8-99.2 33.2-35 25.8-53.2 66-53.2 109.4 166.6 0 333.2 0 499.8 0 18.8 0 37.4 0 56.2 0 0-59-35.6-111-91.6-130.4z","M286.6 645c1.2-0.6 2.4-1.2 3.2-1.6-0.6 0.2-1.2 0.6-1.6 0.8-0.6 0.2-1 0.4-1.6 0.8z","M286.6 645c-6.8 3.4-15 7.6 1.6-0.8 6-3 4.8-2.4 1.6-0.8 13.6-6.4 28.2-8 42.8-9.4 5.6-0.6 8.2-4.4 4-9.8-8-10.2-35.6-12.2-47.2-16.8-7.2-2.8-9.2-5.4-9.8-13.4-0.2-3.6-2.2-19.6 0.6-22.2 2-2 14.6-1.2 17.4-1.6 11.4-1.4 23-3.8 33.8-8 4.6-1.8 9-4 13-6.8 4.8-3.6-3.6-12.4-5.8-17.2-6.8-15-9.8-31.4-10.8-47.8-2-32.2 3-64.6-3-96.6-9-49-46.8-73.6-95-73.6-29.8 0-59.2 10.2-75.8 36.2-18.4 28.6-17.4 64.2-16.4 96.8 0.6 18.6 1.4 37.4-1.2 56-1.2 8-3 15.8-5.8 23.4-2.2 5.8-13.4 20.2-9 23.2 16.6 11.8 44.6 15.8 64.6 14.2 0.6 9.8 2.4 22.4-1.2 31.6-5.6 14.4-47.4 18.2-60 22.4-35 11.6-61 40-61 80 36.6 0 73 0 109.6 0 16.4 0 32.8 0 49.4 0 2.6 0 12.6-18.6 15.4-21.6 13.6-15 30.2-28 48.2-37.4z","M898.6 623.8c-16.2-5.2-47.4-6.8-59-20.8-5.8-7-2.6-24.8-2-33.2 8.8 0.8 18.4-0.6 27.4-1.8 8.2-1.2 16.2-2.8 24-5.6 3.6-1.4 7.2-2.8 10.6-4.8 7.8-4.6 4.2-5.4 0.2-12.2-21.8-36.6-12-83-13-123.2-0.8-33.4-9.6-70-40-88.8-27.4-17-68-17.6-97.4-5.6-84.8 34-34.8 146.4-63.8 210.8-5 10.8-12.2 14.6 0.4 21 7 3.6 14.6 6 22.2 7.8 11.6 2.8 23.6 4.4 35.6 4.8 2 0 0.6 25.2 0 27.8-2.2 9.8-23.6 12.6-31.6 14.8-8.2 2.2-21.8 2.8-25.8 11.4-6 12.8 19.8 9.6 26.2 10.8 20.6 3.8 38.8 15.2 54.8 28.2 12 9.8 28.2 23 32.6 39 53.4 0 107 0 160.4 0-0.4-40.2-26.6-68.8-61.8-80.4z"],"grid":0,"tags":["ios-people"]},{"paths":["M404.8 403.4v0 0z","M726.6 727.8c-25.8-9.2-62.8-12.4-86.4-17.6-13.6-3-33.4-10.6-40-18.4-6.6-8-2.6-81.8-2.6-81.8s12.2-19.2 18.8-36 13.8-62.8 13.8-62.8 13.6 0 18.4-23.8c5.2-26 13.2-36.8 12.2-56.2-1-18-10.4-19-11.4-19v0c0 0 9.8-27.2 11.2-84.8 1.6-68.2-50.6-135.4-148.6-135.4s-150 67-148.6 135.2c1.2 57.4 11.2 84.8 11.2 84.8v0c-1 0-10.4 1-11.4 19-1 19.4 7.2 29.8 12.2 55.8 4.8 23.8 18.4 24 18.4 24s7.2 46.2 13.8 63c6.6 17 18.8 36 18.8 36s4 73.8-2.6 81.8c-6.6 8-26.4 15.4-40 18.4-23.8 5.2-60.6 8.6-86.4 17.8s-105.4 40.2-105.4 104.2h640c0-64-79.6-95-105.4-104.2zM512 800h-274.6c4-6 9.4-10.2 16.4-15.2 14-10.2 32.2-19.6 54.2-27.2 13.6-4.8 33.4-8 50.8-10.6 11.4-1.8 22.2-3.4 31.8-5.6 6.8-1.6 41.6-10 57.6-29.2 9-10.8 11.6-25.4 11.2-64.6-0.2-20-1.2-38.6-1.2-39.4l-0.4-8.4-4.6-7c-3-4.6-11.6-19-16-30.6-3.6-9.4-9.2-38.4-12-56.2 0 0 0.8 2-1-7.4s-16.8-8.6-18.8-16c-1.8-7.2-3.6-13.8-8.6-36.4s5.6-22.4 7.8-32.4c1.2-6.2 0-11.4 0-11.6v0c-0.6-2-8.2-26.8-9.4-75.4-0.6-26.4 9.2-51.2 27.6-69.8 21.2-21.6 52-33 89-33 38 0 68 11.4 89.2 33 18.4 18.6 28.2 43.4 27.6 69.8-1 48.4-8.6 73.2-9.4 75.4v0c0 0.2-1.2 3.4-0.8 10.4 0.4 10.8 13.6 11 8.6 33.6s-6.8 29.2-8.6 36.4c-1.8 7.2-17 6.6-18.8 16s-1 7.4-1 7.4c-2.8 17.8-8.4 46.8-12 56.2-4.6 11.6-13.2 26-16 30.6l-4.6 7-0.4 8.4c0 0.8-1 19.4-1.2 39.4-0.4 39.2 2.2 53.8 11.2 64.6 16 19 50.8 27.6 57.6 29.2 9.6 2.2 20.4 3.8 31.8 5.6 17.4 2.6 37.2 5.8 50.8 10.6 22 7.8 40.4 17.2 54.2 27.4 7 5 12.4 9.2 16.4 15.2l-274.4-0.2z"],"grid":0,"tags":["ios-person-outline"]},{"paths":["M726.6 727.8c-25.8-9.2-62.8-12.4-86.4-17.6-13.6-3-33.4-10.6-40-18.4-6.6-8-2.6-81.8-2.6-81.8s12.2-19.2 18.8-36 13.8-62.8 13.8-62.8 13.6 0 18.4-23.8c5.2-26 13.2-36.8 12.2-56.2-1-18-10.4-19-11.4-19v0c0 0 9.8-27.2 11.2-84.8 1.6-68.2-50.6-135.4-148.6-135.4s-150 67-148.6 135.2c1.2 57.4 11.2 84.8 11.2 84.8v0c-1 0-10.4 1-11.4 19-1 19.4 7.2 29.8 12.2 55.8 4.8 23.8 18.4 24 18.4 24s7.2 46.2 13.8 63c6.6 17 18.8 36 18.8 36s4 73.8-2.6 81.8c-6.6 8-26.4 15.4-40 18.4-23.8 5.2-60.6 8.6-86.4 17.8s-105.4 40.2-105.4 104.2h640c0-64-79.6-95-105.4-104.2z"],"grid":0,"tags":["ios-person"]},{"paths":["M192 256v640h768v-640h-768zM928 864h-704v-576h704v576z","M64 128v640h96v-32h-64v-576h704v64h32v-96z"],"grid":0,"tags":["ios-photos-outline"]},{"paths":["M192 256v640h768v-640h-768z","M832 128h-768v640h96v-544h672z"],"grid":0,"tags":["ios-photos"]},{"paths":["M576 161.652c90.586 7.41 174.708 46.048 239.618 110.988 72.47 72.5 112.382 168.848 112.382 271.446 0 51.848-10.16 102.084-30.198 149.406-19.36 45.718-47.080 86.768-82.388 122.048-35.308 35.278-76.408 62.962-122.16 82.302-47.346 20.020-97.646 30.162-149.504 30.162-82.386 0-160.94-25.694-227.168-74.292-31.9-23.41-59.914-51.466-83.266-83.384-16.756-22.906-30.844-47.448-42.082-73.268l384.766-96.068v-438.992zM544 128v448l-395.51 98.752c54.816 165.69 211.192 285.248 395.26 285.248 229.75 0 416.25-186.25 416.25-416s-186-416-416-416v0z","M480 96.362v429.886l-360.684 91.46c-18.234-47.136-22.394-113.946-22.316-138.992v-0.142c0-94.622 32.93-187.492 90.346-254.796 33.47-39.236 75.004-69.962 123.442-91.326 49.41-21.79 106.25-33.904 169.212-36.090zM512 64h-11c-320 0-437 232.5-437 414.574 0 0 0.5 113.332 37.82 176.582l410.18-104.010v-487.146z"],"grid":0,"tags":["ios-pie-outline"]},{"paths":["M544 128v448l-395.51 98.752c54.816 165.69 211.192 285.248 395.26 285.248 229.75 0 416.25-186.25 416.25-416s-186-416-416-416v0z","M512 64h-11c-320 0-437 232.5-437 414.574 0 0 0.5 113.332 37.82 176.582l410.18-104.010v-487.146z"],"grid":0,"tags":["ios-pie"]},{"paths":["M288 249.8l419.6 262.2-419.6 262.2v-524.4zM256 192v640l512-320-512-320z"],"grid":0,"tags":["ios-play-outline"]},{"paths":["M256 192v640l512-320-512-320z"],"grid":0,"tags":["ios-play"]},{"paths":["M896 128v-64h-320l-512 576 320 320 46.942-47.808 49.058 47.808 480-544v-288h-64zM384 914.742l-275.22-274.742 480.462-544h274.758v274.754l-433.11 495.98-22.68 22.726-24.21 25.282zM928 402.754l-448 511.988-26.364-25.3 442.364-505.442v-224h32v242.754z","M704 320c35.29 0 64-28.71 64-64s-28.71-64-64-64-64 28.71-64 64 28.71 64 64 64zM704 224c17.672 0 32 14.326 32 32s-14.328 32-32 32-32-14.326-32-32 14.328-32 32-32z"],"grid":0,"tags":["ios-pricetags-outline"]},{"paths":["M928 128v274.754l-473.694 532.206 25.694 25.040 480-544v-288z","M576 64l-512 576 320 320 46.942-47.808 22.696-22.75 442.362-505.442v-320h-320zM704 320c-35.29 0-64-28.71-64-64s28.71-64 64-64 64 28.71 64 64-28.71 64-64 64z","M736 256c0 17.673-14.327 32-32 32s-32-14.327-32-32c0-17.673 14.327-32 32-32s32 14.327 32 32z"],"grid":0,"tags":["ios-pricetags"]},{"paths":["M772.4 288c-121.2 0-219.6 100.2-219.6 224 0 80.8 42 151.4 105 190.8h-291.6c63-39.4 105-110 105-190.8 0-123.8-98.4-224-219.6-224s-219.6 100.2-219.6 224c0 123.8 98.4 224 219.6 224h520.8c121.2 0 219.6-100.2 219.6-224s-98.4-224-219.6-224zM64.6 512c0-105.2 84-190.8 187-190.8 103.2 0 187 85.6 187 190.8s-84 190.8-187 190.8c-103.2 0-187-85.6-187-190.8zM772.4 702.8c-103.2 0-187-85.6-187-190.8s84-190.8 187-190.8 187 85.6 187 190.8-83.8 190.8-187 190.8z","M768 416c53 0 96 43 96 96s-43 96-96 96-96-43-96-96c0-53 43-96 96-96zM768 384c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128c0-70.6-57.4-128-128-128v0z","M256 416c53 0 96 43 96 96s-43 96-96 96-96-43-96-96c0-53 43-96 96-96zM256 384c-70.6 0-128 57.4-128 128s57.4 128 128 128 128-57.4 128-128c0-70.6-57.4-128-128-128v0z"],"grid":0,"tags":["ios-recording-outline"]},{"paths":["M772.4 288c-121.2 0-219.6 99.8-219.6 223.6 0 80.8 42 152.4 105 190.4h-291.6c63-38 105-109.6 105-190.4 0-123.8-98.4-223.8-219.6-223.8s-219.6 100.4-219.6 224c0 123.8 98.4 224.2 219.6 224.2h520.8c121.2 0 219.6-100.2 219.6-224s-98.4-224-219.6-224zM256 640c-70.6 0-128-57.4-128-128s57.4-128 128-128 128 57.4 128 128c0 70.6-57.4 128-128 128zM768 640c-70.6 0-128-57.4-128-128s57.4-128 128-128 128 57.4 128 128c0 70.6-57.4 128-128 128z","M768 416c-53 0-96 43-96 96s43 96 96 96 96-43 96-96c0-53-43-96-96-96z","M256 416c-53 0-96 43-96 96s43 96 96 96 96-43 96-96c0-53-43-96-96-96z"],"grid":0,"tags":["ios-recording"]},{"paths":["M128 800h20.6l38.4-62.4c41-65.4 89.8-125.6 151.6-153.2 48.8-21.8 93.4-37.8 173.4-40v159.6l384-256-384-256v160.6c-126 5.6-216.2 41.4-286.6 112.4-104.6 105.4-97.4 238-97.4 271.4 0.2 17.8 0 43.4 0 63.6zM544 384v-129.4l296.2 193.6-296.2 193.4v-129.6c-182 0-289.2 49.2-384.4 210.8-0 0-17.6-338.8 384.4-338.8z"],"grid":0,"tags":["ios-redo-outline"]},{"paths":["M128 800h20.6l38.4-62.4c41-65.4 89.8-125.6 151.6-153.2 48.8-21.8 93.4-37.8 173.4-40v159.6l384-256-384-256v160.6c-126 5.6-216.2 41.4-286.6 112.4-104.6 105.4-97.4 238-97.4 271.4 0.2 17.8 0 43.4 0 63.6z"],"grid":0,"tags":["ios-redo"]},{"paths":["M603.63 637.216c-26.228 22.058-57.912 34.712-91.63 34.712-72.72 0-132.572-57.93-141.78-123.93h61.22l-77.74-100-75.068 100h58.958c9.392 84 83.434 156 174.41 156 41.8 0 82.34-15.132 114.152-42.436l4.74-4.318-23.198-23.324-4.064 3.296z","M631.472 397.77c-32.376-29.55-74.804-45.678-119.472-45.678-41.8 0-82.338 15.112-114.15 42.412l-4.742 4.104 23.198 23.22 4.066-3.412c25.854-21.744 58.394-34.010 91.628-34.010 72.686 0 132.548 57.594 141.782 127.594h-61.288l77.692 102.45 75.252-102.45h-59.024c-4.482-40-23.864-85.872-54.942-114.23z","M835 320h-123.45c-64.21-72-84.438-96-109.050-96h-177c-24.628 0-44.334 24-109.042 96h-26.458v-32h-68v32h-27c-35.29 0-67 26.434-67 61.368v352.036c0 34.934 31.71 66.596 67 66.596h640c35.29 0 61-31.662 61-66.598v-352.034c0-34.934-25.71-61.368-61-61.368zM864 733.402c0 18.526-12.458 34.598-29 34.598h-640c-17.476 0-35-17.328-35-34.598v-352.034c0-16.332 16.252-29.368 35-29.368h121.458c0 0 8.248 0 12.266 0s6.45-0.398 11.536-6.4 15.404-20.016 22.16-27.59c22.592-25.332 38.914-43.83 50.632-54.264 9.492-8.45 12.422-7.746 12.45-7.746h177c0.032 0 3.222-0.726 13.418 8.438 12.282 11.042 29.41 33.68 53.116 60.396 5.776 6.51 14.428 16.22 18.634 20.88s8.504 6.286 11.542 6.286 12.34 0 12.34 0h123.448c17.664 0 29 11.93 29 29.368v352.034z"],"grid":0,"tags":["ios-reverse-camera-outline"]},{"paths":["M835 320h-123.45c-64.21-72-84.438-96-109.050-96h-177c-24.628 0-44.334 24-109.042 96h-26.458v-32h-68v32h-27c-35.29 0-67 26.434-67 61.368v352.036c0 34.934 31.71 66.596 67 66.596h640c35.29 0 61-31.662 61-66.598v-352.034c0-34.934-25.71-61.368-61-61.368zM626.152 661.564c-31.812 27.304-72.352 42.436-114.152 42.436-90.974 0-165.018-72-174.41-156h-58.958l75.068-100 77.74 100h-61.22c9.208 66 69.060 123.93 141.78 123.93 33.718 0 65.402-12.654 91.63-34.712l4.064-3.294 23.198 23.324-4.74 4.316zM670.188 614.45l-77.692-102.45h61.288c-9.234-70-69.096-127.594-141.782-127.594-33.236 0-65.776 12.266-91.628 34.010l-4.066 3.412-23.198-23.22 4.742-4.104c31.81-27.3 72.35-42.412 114.15-42.412 44.666 0 87.096 16.126 119.472 45.678 31.076 28.358 50.458 74.23 54.94 114.23h59.024l-75.25 102.45z"],"grid":0,"tags":["ios-reverse-camera"]},{"paths":["M928 310v403.8l-367-201.8 367-202zM480 312v400.8l-352-200.8 352-200.4zM512 256l-448 256 448 256v-246.4l448 246.4v-512l-448 246.4v-246.4z"],"grid":0,"tags":["ios-rewind-outline"]},{"paths":["M512 256l-448 256 448 256v-246.4l448 246.4v-512l-448 246.4v-246.4z"],"grid":0,"tags":["ios-rewind"]},{"paths":["M512 128c-247.424 0-448 200.452-448 447.876 0 113.95 42.566 217.94 112.632 297 7.102 8.012 14.482 15.64 22.132 23.124 6.118-6.98 12.464-13.668 19.078-20.282 0.96-0.96 1.944-1.894 2.912-2.844 37.56-36.852 81.042-65.898 129.328-86.322 51.266-21.684 105.742-32.678 161.916-32.678s110.65 10.994 161.916 32.678c48.288 20.424 91.768 49.47 129.328 86.322 0.968 0.95 1.952 1.882 2.912 2.844 6.614 6.614 12.96 13.3 19.078 20.282 7.65-7.484 15.032-15.114 22.132-23.124 70.066-79.060 112.632-183.050 112.632-297 0.004-247.424-200.572-447.876-447.996-447.876zM895.322 738.354c-17.326 40.962-40.858 78.184-70.088 111.552-80.78-79.020-191.306-127.89-313.234-127.89s-232.456 48.66-313.234 127.68c-29.23-33.37-52.762-70.344-70.088-111.306-19.62-46.38-30.456-95.388-32.346-145.388h62.668v-32h-62.668c1.89-50 12.726-100.096 32.346-146.478 18.744-44.314 44.752-84.862 77.384-120.22l53.864 53.786 10.992-11.076 10.554-10.528-0.040-0.054 1.094-1.104-53.902-53.968c35.724-33.294 76.008-59.788 120.958-78.8 46.382-19.62 95.416-30.458 145.416-32.348v74.788h32v-74.792c52 1.89 100.034 12.726 146.416 32.346 44.874 18.98 85.842 45.412 121.524 78.624l-53.95 54.138 1.154 1.094-0.008 0.038 10.57 10.492 11 11.006 54.052-54.114c32.712 35.406 58.784 76.296 77.56 120.69 19.62 46.382 30.458 96.478 32.348 146.478h-64.664v32h64.668c-1.89 50-12.726 98.972-32.346 145.354z","M736.958 349.090l-170.968 147.454c-15.394-10.51-33.984-16.668-53.988-16.668-52.934 0-96 43.066-96 96 0 20.958 6.77 40.356 18.212 56.16l-23.896 23.896 22.624 22.626 24.066-24.066c15.59 10.938 34.546 17.382 54.992 17.382 52.934 0 96-43.066 96-96 0-20.774-6.654-40.010-17.912-55.736l149.698-168.22-2.828-2.828zM512 639.876c-35.346 0-64-28.652-64-64 0-35.346 28.654-64 64-64s64 28.654 64 64c0 35.346-28.654 64-64 64z"],"grid":0,"tags":["ios-speedometer-outline"]},{"paths":["M834 557.484v-1.484h59.628c-1.862-46-12.112-91.218-29.662-132.302-17.286-40.456-41.006-77.33-70.514-109.124l-49.734 49.292-22.458-21.984 49.576-49.358c-32.374-29.672-69.72-53.484-111.030-70.784-42.848-17.946-87.806-27.556-133.806-29.368v67.628h-30v-67.628c-46 1.788-89.9 11.398-132.808 29.37-40.706 17.046-77.916 40.914-110.63 70.942l49.592 49.166-1.098 1.098 0.002 0.012-0.58 0.67-20.54 20.406-49.558-48.958c-29.54 31.864-53.208 68.486-70.352 108.618-17.546 41.080-27.794 86.304-29.654 132.304h57.626v32h-57.626c1.852 44 11.83 88.864 29.658 130.594 15.378 36.002 36.796 69.328 63.662 99.852 77.57-74.754 179.916-115.856 288.308-115.856 108.226 0 210.572 41.352 288.308 116.27 26.708-30.35 48.122-63.958 63.66-100.332 17.83-41.736 27.808-86.528 29.658-130.528h-59.628v-30.516zM608 575.876c0 52.934-43.066 96-96 96-20.446 0-39.402-6.446-54.992-17.382l-24.066 24.066-22.624-22.626 23.896-23.896c-11.444-15.804-18.212-35.204-18.212-56.16 0-52.934 43.066-96 96-96 20.004 0 38.594 6.158 53.988 16.668l146.968-131.454 2.828 2.828-125.698 152.22c11.258 15.726 17.912 34.962 17.912 55.736z","M512 128c-247.424 0-448 200.452-448 447.876 0 113.95 42.566 217.94 112.632 297 7.102 8.012 14.482 15.64 22.132 23.124h44.386c63.426-78.206 160.288-128.192 268.848-128.192s205.424 49.986 268.85 128.192h44.386c7.65-7.484 15.032-15.114 22.132-23.124 70.066-79.060 112.632-183.050 112.632-297 0.002-247.424-200.574-447.876-447.998-447.876zM821.488 841.594c-6.102 6.816-12.784 13.726-20.426 21.128l-0.752 0.73-0.696-0.786c-5.258-5.94-10.986-11.97-17.518-18.44-0.55-0.542-1.11-1.078-1.668-1.614l-1.008-0.97c-34.516-33.532-74.468-59.934-118.75-78.476-47.070-19.712-97.090-29.708-148.672-29.708s-101.602 9.996-148.672 29.708c-44.28 18.542-84.234 44.946-118.75 78.476l-1.008 0.97c-0.558 0.536-1.116 1.070-1.666 1.614-6.532 6.468-12.26 12.5-17.518 18.44l-0.696 0.786-0.754-0.73c-7.642-7.402-14.324-14.312-20.424-21.128-67.028-74.882-103.942-171.258-103.942-271.37 0-109.332 43.004-212.106 121.090-289.388 78.082-77.278 181.904-119.836 292.342-119.836 110.44 0 214.26 42.558 292.34 119.836 78.086 77.284 121.090 180.058 121.090 289.388 0 100.112-36.912 196.486-103.942 271.37z","M576 575.876c0 35.346-28.654 64-64 64s-64-28.654-64-64c0-35.346 28.654-64 64-64s64 28.654 64 64z"],"grid":0,"tags":["ios-speedometer"]},{"paths":["M344.496 609.862l-109.354 318.146 276.858-197.268 276.89 197.268-109.37-318.134 280.48-195.874h-342.774l-105.226-317.99-105.196 317.99h-342.804l280.496 195.862zM512 201.5l82 246.5h262l-216 149.422 85.246 244.962-213.246-151.87v-489.014z"],"grid":0,"tags":["ios-star-half"]},{"paths":["M960 414h-342.8l-105.2-318.2-105.2 318.2h-342.8l280.4 195.8-109.2 318.2 276.8-197.2 276.8 197.2-109.4-318.2 280.6-195.8zM725.2 842.4l-213.2-152-213.2 152 85.2-245-216-149.4h262l82-246.6 82 246.6h262l-216 149.2 85.2 245.2z"],"grid":0,"tags":["ios-star-outline"]},{"paths":["M960 414h-342.8l-105.2-318.2-105.2 318.2h-342.8l280.4 195.8-109.2 318.2 276.8-197.2 276.8 197.2-109.4-318.2 280.6-195.8z"],"grid":0,"tags":["ios-star"]},{"paths":["M795.2 293.4l-3.6-3.4h36.8l17 15.6 45-45.6-81.6-80.6-46.4 44.6 17.6 18.4v37.2l-10-9.4c-62.6-56.6-140-90.4-226-97.8v-76.4h-64v76h-4c-87.4 6-170 45-232 106v-35.6l17.8-18.4-45.8-44.4-81.6 80.4 45 45.6 17-15.6h35.6c-0.6 0-1.4 1.4-2 2.2-65.6 70.2-102 161.8-102 257 0 208.8 172.2 378.8 384.2 378.8 211.6 0 383.8-169.8 383.8-378.6 0-95.2-36-186.2-100.8-256zM512.6 891.4c-191 0-346.2-153.4-346.2-341.8 0-188.6 155.4-341.8 346.2-341.8 191 0 346.2 153.4 346.2 341.8 0.2 188.4-155.2 341.8-346.2 341.8z","M528 514.6v-258.6h-32v258.8c-25 8.6-48 33-48 60.6 0 29.4 20 54 48 61l16 35.6 16-35.6c28-7 48-31.6 48-61 0-29-21-53.4-48-60.8z"],"grid":0,"tags":["ios-stopwatch-outline"]},{"paths":["M795.2 293.4l-3.6-3.4h36.8l17 15.6 45-45.6-81.6-80.6-46.4 44.6 17.6 18.4v37.2l-10-9.4c-62.6-56.6-140-90.4-226-97.8v-76.4h-64v76h-4c-87.4 6-170 45-232 106v-35.6l17.8-18.4-45.8-44.4-81.6 80.4 45 45.6 17-15.6h35.6c-0.6 0-1.4 1.4-2 2.2-65.6 70.2-102 161.8-102 257 0 208.8 172.2 378.8 384.2 378.8 211.6 0 383.8-169.8 383.8-378.6 0-95.2-36-186.2-100.8-256zM528 636.4l-16 35.6-16-35.6c-28-7-48-31.6-48-61 0-27.6 23-52 48-60.6v-258.8h32v258.6c27 7.4 48 31.8 48 60.8 0 29.4-20 54-48 61z"],"grid":0,"tags":["ios-stopwatch"]},{"paths":["M928 512c0-229.726-186.26-416-416-416-229.726 0-416 186.272-416 416 0 229.726 186.274 416 416 416 5.082 0 10.136-0.124 15.174-0.304 0.958-0.034 1.914-0.068 2.87-0.11 1.884-0.080 3.768-0.166 5.646-0.272 1.7-0.094 3.396-0.208 5.094-0.322 1.278-0.088 2.558-0.16 3.834-0.26 2.708-0.208 5.41-0.442 8.11-0.704 0-0.006 0-0.012 0-0.018 194.94-18.948 350.458-172.458 372.548-366.446 0.040-0.002 0.076 0 0.114-0.002 1.208-10.63 2.004-21.334 2.392-32.1-0.032 0.002-0.064 0.002-0.098 0.002 0.19-5.132 0.316-10.282 0.316-15.464zM893.33 512c0 5.136-0.132 10.242-0.334 15.328-47.278-2.152-93.354-12.212-137.232-30.010-51.582-20.916-97.876-51.662-137.594-91.382-39.72-39.72-70.466-86.014-91.384-137.594-17.806-43.912-27.87-90.028-30.012-137.34 5.054-0.2 10.126-0.33 15.228-0.33 210.258-0.002 381.328 171.066 381.328 381.328zM130.674 512c0-2.636 0.046-5.262 0.1-7.884 44.952 2.758 88.776 12.674 130.6 29.634 51.582 20.916 97.876 51.662 137.596 91.382 39.72 39.718 70.464 86.014 91.382 137.596 16.948 41.792 26.86 85.584 29.628 130.498-2.656 0.054-5.312 0.102-7.98 0.102-210.26-0-381.328-171.068-381.326-381.328zM551.886 891.246c-6.546-105.132-49.948-208.396-130.29-288.738-80.372-80.372-183.68-123.778-288.854-130.3 18.344-176.106 157.040-316.956 332.148-338.626 5.19 107.28 48.72 213.050 130.652 294.98 81.898 81.904 187.622 125.426 294.866 130.644-21.706 175.030-162.494 313.658-338.522 332.040z"],"grid":0,"tags":["ios-tennisball-outline"]},{"paths":["M96.1 503.112c-0.002 0.078-0.006 0.154-0.008 0.232 0 0 0.004 0 0.006 0 0-0.076 0-0.154 0.002-0.232z","M520.622 927.83c0.132-0.004 0.266-0.012 0.398-0.014-0.132 0.002-0.266 0.002-0.398 0.008 0-0 0 0.002 0 0.006z","M512 96.002c-5.172 0-10.58 0.128-15.704 0.316l-0.296-0.012c0 0.006 0 0.008 0 0.012-10 0.398-20 1.204-32 2.41 0-0.004 0-0.008 0-0.016 0 0.010 0.166 0.016 0.144 0.024-193.948 22.122-347.308 177.95-366.26 372.82-0.008 0.036 0.090 0.444 0.084 0.444 0.006 0 0.008 0 0.014 0-1.026 10-1.652 20-1.872 32-0.002 0-0.006 0-0.008 0l0.006-0.304c-0.056 2.86-0.108 5.554-0.108 8.43 0 229.704 185.954 415.876 415.682 415.876 13.712 0 28.318-0.766 40.318-2.062 0 0.004 0 0.012 0 0.012 0-0.008 0.426-0.016 0.48-0.028 194.872-18.972 350.494-172.172 372.624-366.072 0.008-0.028 0.176 0.148 0.184 0.148-0.004 0-0.012 0-0.016 0 1.778-16 2.726-31.718 2.726-47.808 0.002-229.702-186.258-416.19-415.998-416.19zM261.26 533.706c-41.79-16.948-85.576-26.86-130.488-29.632 0.22-10.748 0.876-21.39 1.972-31.904 105.136 6.55 208.406 49.954 288.75 130.292s123.752 183.594 130.304 288.718c-10.514 1.096-21.158 1.752-31.908 1.97-2.77-44.906-12.684-88.688-29.632-130.472-20.918-51.58-51.668-97.874-91.392-137.59-39.722-39.72-86.020-70.466-137.606-91.382zM595.444 428.53c-81.928-81.918-125.462-187.67-130.664-294.934 10.5-1.304 21.136-2.16 31.882-2.586 2.146 47.3 12.21 93.404 30.014 137.308 20.922 51.58 51.67 97.872 91.392 137.59 39.724 39.718 86.020 70.464 137.606 91.382 43.908 17.802 90.016 27.866 137.32 30.014-0.426 10.74-1.286 21.378-2.586 31.878-107.28-5.204-213.036-48.732-294.964-130.652z"],"grid":0,"tags":["ios-tennisball"]},{"paths":["M473.2 543.2c9.2 11.4 23 18.8 38.8 18.8 27.6 0 50-22.4 50-50 0-14.6-6.4-27.6-16.4-36.8-1.2-1.4-2.6-3-4.4-4.4 0 0-235.4-175-240.6-170.4s170.6 240.4 170.6 240.4c0.4 0.8 1.4 1.6 2 2.4z","M512.4 96v0h-0.4v224h32v-189.4c195.6 16.6 350.6 181 350.6 381 0 211-171.4 382.8-382.4 382.8s-382.6-171.6-382.6-382.6c0-105.6 43-201.2 112.2-270.4l-23.8-23.6c-75.4 75.4-122 179.4-122 294.2 0 229.8 186.2 416 416 416s416-186.2 416-416c0-229.8-186-416-415.6-416z"],"grid":0,"tags":["ios-timer-outline"]},{"paths":["M512 96c-229.8 0-416 186.2-416 416s186.2 416 416 416c229.8 0 416-186.2 416-416s-186.2-416-416-416zM301 301c5.2-4.6 239.8 169.8 239.8 169.8 2 1.4 3.2 3 4.4 4.4 10 9.2 16.4 22 16.4 36.6 0 27.4-22.2 49.8-49.8 49.8-15.6 0-29.4-7.4-38.6-18.8-0.8-0.8-1.6-1.4-2.2-2.2 0.2 0.2-175-234.8-170-239.6zM512.2 894.4c-211.4 0-382.8-171.4-382.8-382.8 0-105.6 42.8-201.4 112-270.6l23.6 23.6c-63.2 63.2-102.4 150.6-102.4 247 0 192.6 156.8 349.4 349.4 349.4s349-156.8 349-349.4c0-180.6-141-330.2-317-348v156.4h-32v-191.2c211.4 0 383 171.4 383 382.8s-171.6 382.8-382.8 382.8z"],"grid":0,"tags":["ios-timer"]},{"paths":["M800 226.6h-160v-40c0-32.4-26.2-58.6-58.6-58.6h-139c-32.2 0-58.4 26.2-58.4 58.6v40h-160v29.4h42.2l47.2 581.4c0 32.4 26.2 58.6 58.6 58.6h282c32.4 0 58.6-26.2 58.6-58.6l46.6-581.4h40.8v-29.4zM413.2 186.6c0-16.2 13.2-29.4 29.2-29.4h139c16.2 0 29.2 13.2 29.2 29.4v40h-197.4v-40zM683.2 835.8v1.6c0 16.2-13.2 29.4-29.2 29.4h-282c-16.2 0-29.2-13.2-29.2-29.4v-1.6l-47.4-579.8h434.4l-46.6 579.8z","M498 320h28v482h-28v-482z","M640 320h-29.2l-21.4 482h29.2z","M413 320h-29l21.4 482h29.2z"],"grid":0,"tags":["ios-trash-outline"]},{"paths":["M640 226v-39.4c0-32.4-26.2-58.6-58.6-58.6h-139c-32.2 0-58.4 26.2-58.4 58.6v39.4h-160v30h42.2l47.2 581.4c0 32.4 26.2 58.6 58.6 58.6h282c32.4 0 58.6-26.2 58.6-58.6l46.6-581.4h40.8v-30h-160zM414 186.6c0-16.2 12.4-28.6 28.6-28.6h139c16.2 0 28.6 12.4 28.6 28.6v39.4h-196v-39.4h-0.2zM405.4 802l-21.4-482h29l21.8 482h-29.4zM526 802h-28v-482h28v482zM618.6 802h-29.2l21.6-482h29l-21.4 482z"],"grid":0,"tags":["ios-trash"]},{"paths":["M895.8 736.4c0-33.6 7.2-166.2-97.4-271.4-70.4-70.8-160.6-106.8-286.6-112.4v-160.6l-383.8 256 384 256v-159.6c80 2.2 124.8 18.2 173.4 40 61.8 27.6 110.6 88 151.6 153.2l38.4 62.4h20.6c0-20.2-0.2-45.8-0.2-63.6zM864.4 722.8c-95.2-161.6-202.4-210.8-384.4-210.8v129.6l-296.2-193.4 296.2-193.6v129.4c402 0 384.4 338.8 384.4 338.8z"],"grid":0,"tags":["ios-undo-outline"]},{"paths":["M895.8 736.4c0-33.6 7.2-166.2-97.4-271.4-70.4-70.8-160.6-106.8-286.6-112.4v-160.6l-383.8 256 384 256v-159.6c80 2.2 124.8 18.2 173.4 40 61.8 27.6 110.6 88 151.6 153.2l38.4 62.4h20.6c0-20.2-0.2-45.8-0.2-63.6z"],"grid":0,"tags":["ios-undo"]},{"paths":["M607.4 256h-442c-37.6 0-71.4 28.2-71.4 65.4v375.8c0 37.2 33.8 70.8 71.4 70.8h442c37.6 0 66.6-33.6 66.6-70.8v-375.8c0-37.2-29-65.4-66.6-65.4zM640 697.2c0 18.6-13.8 36.8-32.6 36.8h-442c-18.8 0-37.4-18.2-37.4-36.8v-375.8c0-18.6 18-31 36.8-31l442 0.2c18.8 0 33.2 12.2 33.2 30.8v375.8z","M734 426v171.2l196 106.8v-384l-196 106zM896 380v264.6l-128-67v-131.2l128.2-67.2-0.2 0.8z"],"grid":0,"tags":["ios-videocam-outline"]},{"paths":["M607.4 256h-442c-37.6 0-71.4 28.2-71.4 65.4v375.8c0 37.2 33.8 70.8 71.4 70.8h442c37.6 0 66.6-33.6 66.6-70.8v-375.8c0-37.2-29-65.4-66.6-65.4z","M734 426v171.2l196 106.8v-384l-196 106z"],"grid":0,"tags":["ios-videocam"]}];module.exports=exports["default"];
//# sourceMappingURL=icons.js.map

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_redux__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_button__ = __webpack_require__(132);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__events_actions_index__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_gear__ = __webpack_require__(133);
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }







var Setting = function (_PureComponent) {
  _inherits(Setting, _PureComponent);

  function Setting(props) {
    _classCallCheck(this, Setting);

    var _this = _possibleConstructorReturn(this, _PureComponent.call(this, props));

    _this.limitVisibility = function () {
      _this.setState({ visible: true });
    };

    _this.increment = function () {
      return _this.operator(function (val) {
        return val + 1;
      });
    };

    _this.decrement = function () {
      return _this.operator(function (val) {
        return val - 1;
      });
    };

    _this.state = { visible: false };
    return _this;
  }

  Setting.prototype.operator = function operator(cb) {
    var val = cb(this.props.tabLimit);
    if (val < 1) return;
    this.props.setTabLimit(val);
  };

  Setting.prototype.render = function render() {
    return __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
      'div',
      { className: 'settings' },
      !this.state.visible && __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(__WEBPACK_IMPORTED_MODULE_2__components_button__["a" /* default */], {
        classnameBtn: 'settingBtn',
        title: __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(__WEBPACK_IMPORTED_MODULE_4__components_gear__["a" /* default */], null),
        onclick: this.limitVisibility
      }),
      this.state.visible && __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
        'div',
        { className: 'limitBtns' },
        __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(__WEBPACK_IMPORTED_MODULE_2__components_button__["a" /* default */], { classnameBtn: 'limitBtn', title: '<', onclick: this.decrement }),
        __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
          'span',
          { className: 'limitCounter' },
          this.props.tabLimit
        ),
        __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(__WEBPACK_IMPORTED_MODULE_2__components_button__["a" /* default */], { classnameBtn: 'limitBtn', title: '>', onclick: this.increment })
      )
    );
  };

  return Setting;
}(__WEBPACK_IMPORTED_MODULE_0_react__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    tabLimit: state.tabLimit
  };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setTabLimit: function setTabLimit(limit) {
      return dispatch(Object(__WEBPACK_IMPORTED_MODULE_3__events_actions_index__["c" /* setLimit */])(limit));
    }
  };
};

/* harmony default export */ __webpack_exports__["a"] = (Object(__WEBPACK_IMPORTED_MODULE_1_react_redux__["b" /* connect */])(mapStateToProps, mapDispatchToProps)(Setting));

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);


var Button = function Button(_ref) {
  var title = _ref.title,
      onclick = _ref.onclick,
      classnameBtn = _ref.classnameBtn;

  return __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement(
    'button',
    { onClick: onclick, className: classnameBtn },
    title
  );
};
/* harmony default export */ __webpack_exports__["a"] = (Button);

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_png__ = __webpack_require__(134);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__settings_png___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__settings_png__);



var Gear = function Gear() {
  return __WEBPACK_IMPORTED_MODULE_0_react__["default"].createElement('img', { src: __WEBPACK_IMPORTED_MODULE_1__settings_png___default.a, alt: 'Gear' });
};

/* harmony default export */ __webpack_exports__["a"] = (Gear);

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "cbad4f453e944612862c66a78d9d91bd.png";

/***/ })
/******/ ]);
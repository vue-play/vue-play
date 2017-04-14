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
/******/ 	return __webpack_require__(__webpack_require__.s = 64);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("vuex");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("vue");

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var model = {
  actions: {
    cmdShiftK: function cmdShiftK(_ref) {
      var dispatch = _ref.dispatch;

      dispatch('toggleAllPanels');
    },
    cmdShiftL: function cmdShiftL(_ref2) {
      var dispatch = _ref2.dispatch;

      dispatch('toggleLeftPanel');
    },
    cmdShiftD: function cmdShiftD(_ref3) {
      var dispatch = _ref3.dispatch;

      dispatch('toggleBottomPanel');
    },
    cmdShiftLeft: function cmdShiftLeft(_ref4) {
      var dispatch = _ref4.dispatch;

      dispatch('playPrevious');
    },
    cmdShiftRight: function cmdShiftRight(_ref5) {
      var dispatch = _ref5.dispatch;

      dispatch('playNext');
    }
  }
};

exports.default = model;
var validShortcuts = exports.validShortcuts = Object.keys(model.actions);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (spots, query) {
  var scenarios = spots[query.spot];
  if (scenarios) {
    var scenario = scenarios.filter(function (scenario) {
      return scenario.scenario === query.scenario;
    })[0];
    return scenario;
  }
};

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.observeKeyEvents = exports.executeShortcut = exports.parseKey = exports.isModifierPressed = undefined;

var _shortcuts = __webpack_require__(3);

// Key codes
var keyK = 75;
var keyL = 76;
var keyD = 68;
var keyLeft = 37;
var keyRight = 39;
var keyWindows = 91;

var isModifierPressed = exports.isModifierPressed = function isModifierPressed(e) {
  return (e.ctrlKey || e.keyCode === keyWindows || e.metaKey) && e.shiftKey;
};

var parseKey = exports.parseKey = function parseKey(e) {
  if (!isModifierPressed(e)) {
    return false;
  }

  switch (e.keyCode) {
    case keyK:
      e.preventDefault();
      return 'cmdShiftK';
    case keyL:
      e.preventDefault();
      return 'cmdShiftL';
    case keyD:
      e.preventDefault();
      return 'cmdShiftD';
    case keyLeft:
      e.preventDefault();
      return 'cmdShiftLeft';
    case keyRight:
      e.preventDefault();
      return 'cmdShiftRight';
    default:
      return false;
  }
};

var executeShortcut = exports.executeShortcut = function executeShortcut(store, combination) {
  if (combination) {
    if (!_shortcuts.validShortcuts.includes(combination)) {
      console.warn('Combination ' + combination + ' is not a valid shortcut');
      return;
    }
    store.dispatch(combination);
  }
};

var observeKeyEvents = exports.observeKeyEvents = function observeKeyEvents(store) {
  window.onkeydown = function (e) {
    var combination = parseKey(e);
    executeShortcut(store, combination);
  };
};

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _vueRouter = __webpack_require__(61);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _Home = __webpack_require__(42);

var _Home2 = _interopRequireDefault(_Home);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

exports.default = new _vueRouter2.default({
  mode: 'history',
  routes: [{
    path: '*',
    component: _Home2.default
  }]
});

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _highlight = __webpack_require__(55);

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_highlight2.default.registerLanguage('json', __webpack_require__(57));
_highlight2.default.registerLanguage('javascript', __webpack_require__(56));
_highlight2.default.registerLanguage('xml', __webpack_require__(58));

exports.default = _highlight2.default;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var preventSelectStart = exports.preventSelectStart = function preventSelectStart() {
  document.onselectstart = function () {
    return false;
  };
};

var preventSelectStop = exports.preventSelectStop = function preventSelectStop() {
  document.onselectstart = function () {
    return true;
  };
};

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (a, b) {
  return Object.keys(a).every(function (key) {
    return a[key] === b[key];
  });
};

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(37)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(19),
  /* template */
  __webpack_require__(52),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/nickzhebrun/Work/vue-play/src/components/MobileIcon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] MobileIcon.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d422deba", Component.options)
  } else {
    hotAPI.reload("data-v-d422deba", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$spots = _ref.spots,
      spots = _ref$spots === undefined ? [] : _ref$spots;

  _store2.default.registerModule('app', {
    state: {
      spots: spots
    },
    mutations: {
      SET_SPOTS: function SET_SPOTS(state, payload) {
        state.spots = payload;
      }
    },
    actions: {
      setSpots: function setSpots(_ref2, payload) {
        var commit = _ref2.commit;

        commit('SET_SPOTS', payload);
      }
    }
  });

  (0, _vuexRouterSync.sync)(_store2.default, _router2.default);

  return new _vue2.default({
    el: '#app',
    store: _store2.default,
    router: _router2.default,
    render: function render(h) {
      return h('router-view');
    }
  });
};

var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _vuexRouterSync = __webpack_require__(63);

var _store = __webpack_require__(22);

var _store2 = _interopRequireDefault(_store);

var _router = __webpack_require__(6);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 12 */,
/* 13 */,
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(1);

var _findScenario = __webpack_require__(4);

var _findScenario2 = _interopRequireDefault(_findScenario);

var _keyEvents = __webpack_require__(5);

var _Tabs = __webpack_require__(44);

var _Tabs2 = _interopRequireDefault(_Tabs);

var _DeviceToolbar = __webpack_require__(40);

var _DeviceToolbar2 = _interopRequireDefault(_DeviceToolbar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  watch: {
    current: 'updateIframe'
  },
  data: function data() {
    return {
      iframeLoaded: false
    };
  },
  mounted: function mounted() {
    this.updateIframe();
    this.listenChild();
    (0, _keyEvents.observeKeyEvents)(this.$store);
  },

  computed: _extends({}, (0, _vuex.mapGetters)(['mainWidth', 'showDeviceToolbar', 'frameSize']), {
    current: function current() {
      var spot = this.$route.query.spot;

      var _ref = (0, _findScenario2.default)(this.$store.state.app.spots, this.$route.query) || {},
          scenario = _ref.scenario,
          component = _ref.component;

      if (!component) {
        return {};
      }

      return {
        spot: spot, scenario: scenario, component: component
      };
    },
    currentScenario: function currentScenario() {
      return {
        spot: this.current.spot,
        scenario: this.current.scenario
      };
    }
  }),
  methods: _extends({}, (0, _vuex.mapActions)(['addLog', 'updateCurrentScenario', 'setSpots']), {
    postMessage: function postMessage() {
      this.$refs.iframe.contentWindow.postMessage({
        type: 'UPDATE_ROUTE',
        payload: this.currentScenario
      }, location.origin);
    },
    updateIframe: function updateIframe() {
      var _this = this;

      if (this.current.scenario) {
        document.title = this.current.scenario + ' - Vue Play';
      } else {
        document.title = 'Vue Play';
      }
      this.updateCurrentScenario(this.currentScenario);
      if (this.iframeLoaded) {
        this.postMessage();
      } else {
        this.$refs.iframe.onload = function () {
          _this.postMessage();
          _this.iframeLoaded = true;
        };
      }
    },
    listenChild: function listenChild() {
      var _this2 = this;

      window.addEventListener('message', function (_ref2) {
        var data = _ref2.data;

        if (data.type === 'SET_SPOTS') {
          _this2.setSpots(JSON.parse(data.payload));
        }
        if (data.type === 'APPLY_SHORTCUT') {
          (0, _keyEvents.executeShortcut)(_this2.$store, JSON.parse(data.payload));
        }
        if (data.type === 'ADD_LOG') {
          var _current = _this2.current,
              spot = _current.spot,
              scenario = _current.scenario;

          _this2.addLog({
            data: data.payload,
            route: {
              spot: spot, scenario: scenario
            }
          });
          var consoleEl = document.querySelector('.console-body');
          if (consoleEl) {
            _this2.$nextTick(function () {
              consoleEl.scrollTop = consoleEl.scrollHeight;
            });
          }
        }
      });
    }
  }),
  components: {
    Tabs: _Tabs2.default, DeviceToolbar: _DeviceToolbar2.default
  }
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  props: {
    size: {
      type: String
    },
    color: {
      type: String,
      default: '#757575'
    }
  }
};

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//

var _MobileIcon = __webpack_require__(10);

var _MobileIcon2 = _interopRequireDefault(_MobileIcon);

var _DesktopIcon = __webpack_require__(39);

var _DesktopIcon2 = _interopRequireDefault(_DesktopIcon);

var _vuex = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iPhoneUserAgent = "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3";
var iPadUserAgent = "Mozilla/5.0 (iPad; CPU OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3";

exports.default = {
  data: function data() {
    return {
      selectedDevice: null,
      devices: [{ name: 'iPhone 4', width: 320, height: 480, userAgent: iPhoneUserAgent }, { name: 'iPhone 5', width: 320, height: 568, userAgent: iPhoneUserAgent }, { name: 'iPhone 6', width: 375, height: 667, userAgent: iPhoneUserAgent }, { name: 'iPhone 6 Plus', width: 414, height: 736, userAgent: iPhoneUserAgent }, { name: 'iPad', width: 768, height: 1024, userAgent: iPadUserAgent }, { name: 'iPad Pro', width: 1024, height: 1366, userAgent: iPadUserAgent }]
    };
  },

  methods: _extends({}, (0, _vuex.mapActions)(['setFrameSize']), {
    setDevice: function setDevice(device) {
      this.selectedDevice = device;
      if (device) {
        this.setFrameSize({ width: device.width + "px", height: device.height + "px" });
      } else {
        this.setFrameSize();
      }
    }
  }),
  components: { MobileIcon: _MobileIcon2.default, DesktopIcon: _DesktopIcon2.default }
};

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vueSlimModal = __webpack_require__(62);

var _vueSlimModal2 = _interopRequireDefault(_vueSlimModal);

var _vuex = __webpack_require__(1);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  computed: _extends({}, (0, _vuex.mapGetters)(['showHelp'])),
  components: {
    SlimModal: _vueSlimModal2.default
  },
  methods: _extends({}, (0, _vuex.mapActions)(['toggleHelp']))
};

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Sidebar = __webpack_require__(43);

var _Sidebar2 = _interopRequireDefault(_Sidebar);

var _AppMain = __webpack_require__(38);

var _AppMain2 = _interopRequireDefault(_AppMain);

var _HelpModal = __webpack_require__(41);

var _HelpModal2 = _interopRequireDefault(_HelpModal);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'home',
  components: {
    Sidebar: _Sidebar2.default,
    AppMain: _AppMain2.default,
    HelpModal: _HelpModal2.default
  }
}; //
//
//
//
//
//
//
//

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  props: {
    size: String,
    color: {
      type: String,
      default: '#757575'
    }
  }
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _preventSelect = __webpack_require__(8);

var _vuex = __webpack_require__(1);

var _debounce = __webpack_require__(26);

var _debounce2 = _interopRequireDefault(_debounce);

var _MobileIcon = __webpack_require__(10);

var _MobileIcon2 = _interopRequireDefault(_MobileIcon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BOUNDARY = {
  min: 200,
  max: 500
};

exports.default = {
  computed: _extends({}, (0, _vuex.mapGetters)(['leftPanelExpanded', 'visibleScenarios', 'sidebarWidth', 'currentScenario', 'filterKeyword'])),

  data: function data() {
    return {
      resizing: false,
      startX: null,
      originalWidth: null,
      keyword: ''
    };
  },


  components: { MobileIcon: _MobileIcon2.default },

  methods: _extends({}, (0, _vuex.mapActions)(['updatePlayspot', 'updateSidebarWidth', 'toggleHelp', 'filterToys', 'activateSpot', 'toggleDeviceToolbar']), {
    filter: (0, _debounce2.default)(function (_ref) {
      var target = _ref.target;

      this.filterToys(target.value);
    }, 350),
    handleMouseDown: function handleMouseDown(_ref2) {
      var clientX = _ref2.clientX;

      this.resizing = true;
      this.startX = clientX;
      this.originalWidth = parseInt(this.$refs.sidebar.getBoundingClientRect().width, 10) || 0;
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      (0, _preventSelect.preventSelectStart)();
    },
    handleMouseMove: function handleMouseMove(_ref3) {
      var clientX = _ref3.clientX;

      if (!this.resizing || clientX < BOUNDARY.min || clientX > BOUNDARY.max) {
        return;
      }
      this.updateSidebarWidth(this.originalWidth + clientX - this.startX);
    },
    handleMouseUp: function handleMouseUp() {
      this.resizing = false;
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      (0, _preventSelect.preventSelectStop)();
    },
    isActiveSpot: function isActiveSpot(name, index) {
      if (this.filterKeyword) {
        return true;
      }
      if (!this.currentScenario.spot && index === 0) {
        return true;
      }
      return this.currentScenario.spot === name;
    }
  })
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; //
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var _vuex = __webpack_require__(1);

var _highlight = __webpack_require__(7);

var _highlight2 = _interopRequireDefault(_highlight);

var _preventSelect = __webpack_require__(8);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  name: 'console',
  props: {
    example: {
      type: String
    },
    readme: {
      type: String
    }
  },
  computed: _extends({}, (0, _vuex.mapGetters)(['logs', 'bottomPanelExpanded']), {
    highlightedExample: function highlightedExample() {
      if (!this.example) {
        return;
      }
      return _highlight2.default.highlightAuto(this.example).value;
    },
    active: function active() {
      var tab = this.$store.getters.activeTab;
      if (tab === 'console' || tab && this[tab]) {
        return tab;
      }
      return this.readme ? 'readme' : 'console';
    }
  }),
  data: function data() {
    return {
      tabHeight: 200,
      startY: null,
      originalHeight: null,
      resizing: false
    };
  },
  mounted: function mounted() {
    this.boundary = {
      min: this.$refs.header.getBoundingClientRect().height,
      max: this.$refs.panel.parentNode.getBoundingClientRect().height
    };
  },


  methods: _extends({}, (0, _vuex.mapActions)(['setBottomPanelHeight', 'clearLogs', 'updateActiveTab']), {
    handleMouseDown: function handleMouseDown(_ref) {
      var clientY = _ref.clientY;

      this.resizing = true;
      this.startY = clientY;
      this.originalHeight = parseInt(this.$refs.body.getBoundingClientRect().height, 10) || 0;
      document.addEventListener('mousemove', this.handleMouseMove);
      document.addEventListener('mouseup', this.handleMouseUp);
      (0, _preventSelect.preventSelectStart)();
    },
    handleMouseMove: function handleMouseMove(_ref2) {
      var clientY = _ref2.clientY;

      if (!this.resizing || clientY < this.boundary.min || clientY > this.boundary.max) {
        return;
      }
      var height = this.originalHeight - clientY + this.startY;
      this.setTabHeight(height);
    },
    handleMouseUp: function handleMouseUp() {
      this.resizing = false;
      this.setTabHeight(this.tabHeight);
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);
      (0, _preventSelect.preventSelectStop)();
    },
    clearCurrentLogs: function clearCurrentLogs() {
      var _$route$query = this.$route.query,
          scenario = _$route$query.scenario,
          spot = _$route$query.spot;

      this.clearLogs({ scenario: scenario, spot: spot });
    },
    setTabHeight: function setTabHeight(height) {
      this.tabHeight = height;
    }
  })
};

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _vue = __webpack_require__(2);

var _vue2 = _interopRequireDefault(_vue);

var _vuex = __webpack_require__(1);

var _vuex2 = _interopRequireDefault(_vuex);

var _layout = __webpack_require__(23);

var _layout2 = _interopRequireDefault(_layout);

var _playspot = __webpack_require__(24);

var _playspot2 = _interopRequireDefault(_playspot);

var _shortcuts = __webpack_require__(3);

var _shortcuts2 = _interopRequireDefault(_shortcuts);

var _toys = __webpack_require__(25);

var _toys2 = _interopRequireDefault(_toys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vuex2.default);

var store = new _vuex2.default.Store({
  modules: {
    layout: _layout2.default,
    playspot: _playspot2.default,
    shortcuts: _shortcuts2.default,
    toys: _toys2.default
  }
});

exports.default = store;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var TOGGLE_LEFT_PANEL = exports.TOGGLE_LEFT_PANEL = 'TOGGLE_LEFT_PANEL';
var TOGGLE_BOTTOM_PANEL = exports.TOGGLE_BOTTOM_PANEL = 'TOGGLE_BOTTOM_PANEL';
var TOGGLE_ALL_PANELS = exports.TOGGLE_ALL_PANELS = 'TOGGLE_ALL_PANELS';
var UPDATE_SIDEBAR_WIDTH = exports.UPDATE_SIDEBAR_WIDTH = 'UPDATE_SIDEBAR_WIDTH';
var UPDATE_ACTIVE_TAB = exports.UPDATE_ACTIVE_TAB = 'UPDATE_ACTIVE_TAB';
var TOGGLE_HELP = exports.TOGGLE_HELP = 'TOGGLE_HELP';
var TOGGLE_DEVICE_TOOLBAR = exports.TOGGLE_DEVICE_TOOLBAR = 'TOGGLE_DEVICE_TOOLBAR';
var SET_FRAME_SIZE = exports.SET_FRAME_SIZE = 'SET_FRAME_SIZE';

exports.default = {
  state: {
    leftPanelExpanded: true,
    bottomPanelExpanded: true,
    sidebarWidth: 280,
    activeTab: null,
    showHelp: false,
    showDeviceToolbar: false,
    frameSize: {
      width: '100%',
      height: '100%'
    }
  },
  mutations: {
    TOGGLE_LEFT_PANEL: function TOGGLE_LEFT_PANEL(state) {
      state.leftPanelExpanded = !state.leftPanelExpanded;
    },
    TOGGLE_BOTTOM_PANEL: function TOGGLE_BOTTOM_PANEL(state) {
      state.bottomPanelExpanded = !state.bottomPanelExpanded;
    },
    UPDATE_SIDEBAR_WIDTH: function UPDATE_SIDEBAR_WIDTH(state, payload) {
      state.sidebarWidth = payload;
    },
    UPDATE_ACTIVE_TAB: function UPDATE_ACTIVE_TAB(state, payload) {
      state.activeTab = payload;
    },
    TOGGLE_HELP: function TOGGLE_HELP(state) {
      state.showHelp = !state.showHelp;
    },
    TOGGLE_DEVICE_TOOLBAR: function TOGGLE_DEVICE_TOOLBAR(state) {
      state.showDeviceToolbar = !state.showDeviceToolbar;
    },
    SET_FRAME_SIZE: function SET_FRAME_SIZE(state, payload) {
      if (payload) {
        state.frameSize.width = payload.width;
        state.frameSize.height = payload.height;
      } else {
        state.frameSize.width = state.frameSize.height = '100%';
      }
    }
  },
  actions: {
    toggleLeftPanel: function toggleLeftPanel(_ref) {
      var commit = _ref.commit;

      commit(TOGGLE_LEFT_PANEL);
    },
    toggleBottomPanel: function toggleBottomPanel(_ref2) {
      var commit = _ref2.commit;

      commit(TOGGLE_BOTTOM_PANEL);
    },
    toggleAllPanels: function toggleAllPanels(_ref3) {
      var commit = _ref3.commit,
          state = _ref3.state;

      if (state.leftPanelExpanded && state.bottomPanelExpanded || !state.leftPanelExpanded && !state.bottomPanelExpanded) {
        commit(TOGGLE_LEFT_PANEL);
        commit(TOGGLE_BOTTOM_PANEL);
      } else {
        if (state.leftPanelExpanded) {
          commit(TOGGLE_LEFT_PANEL);
        }
        if (state.bottomPanelExpanded) {
          commit(TOGGLE_BOTTOM_PANEL);
        }
      }
    },
    updateSidebarWidth: function updateSidebarWidth(_ref4, payload) {
      var commit = _ref4.commit;

      commit(UPDATE_SIDEBAR_WIDTH, payload);
    },
    updateActiveTab: function updateActiveTab(_ref5, payload) {
      var commit = _ref5.commit;

      commit(UPDATE_ACTIVE_TAB, payload);
    },
    toggleHelp: function toggleHelp(_ref6) {
      var commit = _ref6.commit;

      commit(TOGGLE_HELP);
    },
    toggleDeviceToolbar: function toggleDeviceToolbar(_ref7) {
      var commit = _ref7.commit;

      commit(TOGGLE_DEVICE_TOOLBAR);
    },
    setFrameSize: function setFrameSize(_ref8, payload) {
      var commit = _ref8.commit;

      commit(SET_FRAME_SIZE, payload);
    }
  },
  getters: {
    leftPanelExpanded: function leftPanelExpanded(state) {
      return state.leftPanelExpanded;
    },
    bottomPanelExpanded: function bottomPanelExpanded(state) {
      return state.bottomPanelExpanded;
    },
    bottomPanelHeight: function bottomPanelHeight(state) {
      return state.bottomPanelHeight;
    },
    sidebarWidth: function sidebarWidth(state) {
      return state.sidebarWidth + 'px';
    },
    mainWidth: function mainWidth(state, getters) {
      return 'calc(100% - ' + getters.sidebarWidth + ')';
    },
    activeTab: function activeTab(state) {
      return state.activeTab;
    },
    showHelp: function showHelp(state) {
      return state.showHelp;
    },
    showDeviceToolbar: function showDeviceToolbar(state) {
      return state.showDeviceToolbar;
    },
    frameSize: function frameSize(state) {
      return state.frameSize;
    }
  }
};

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UPDATE_CURRENT_SCENARIO = undefined;

var _arrayFindIndex = __webpack_require__(54);

var _arrayFindIndex2 = _interopRequireDefault(_arrayFindIndex);

var _shallowEqual = __webpack_require__(9);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

var _router = __webpack_require__(6);

var _router2 = _interopRequireDefault(_router);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UPDATE_CURRENT_SCENARIO = exports.UPDATE_CURRENT_SCENARIO = 'UPDATE_CURRENT_SCENARIO';

var updateCurrent = function updateCurrent(state, payload) {
  state.current = payload;
};

exports.default = {
  state: {
    current: null
  },
  mutations: {
    UPDATE_CURRENT_SCENARIO: updateCurrent
  },
  actions: {
    playNext: function playNext(_ref) {
      var commit = _ref.commit,
          getters = _ref.getters,
          state = _ref.state;

      var total = getters.playspotRoutes.length;
      var current = (0, _arrayFindIndex2.default)(getters.playspotRoutes, function (element) {
        return (0, _shallowEqual2.default)(state.current, element);
      });
      var nextIndex = (current + 1) % total;
      var next = getters.playspotRoutes[nextIndex];
      commit(UPDATE_CURRENT_SCENARIO, next);
      _router2.default.push({ query: next });
    },
    playPrevious: function playPrevious(_ref2) {
      var commit = _ref2.commit,
          getters = _ref2.getters,
          state = _ref2.state;

      var total = getters.playspotRoutes.length;
      var current = (0, _arrayFindIndex2.default)(getters.playspotRoutes, function (element) {
        return (0, _shallowEqual2.default)(state.current, element);
      });
      var prevIndex = (total + (current - 1)) % total;
      var prev = getters.playspotRoutes[prevIndex];
      commit(UPDATE_CURRENT_SCENARIO, prev);
      _router2.default.push({ query: prev });
    },
    updateCurrentScenario: function updateCurrentScenario(_ref3, path) {
      var commit = _ref3.commit;

      commit(UPDATE_CURRENT_SCENARIO, path);
    },
    activateSpot: function activateSpot(_ref4, spot) {
      var commit = _ref4.commit,
          getters = _ref4.getters;
      var scenario = getters.visibleScenarios[spot][0].scenario;

      _router2.default.push({ query: { spot: spot, scenario: scenario } });
    }
  },
  getters: {
    currentScenario: function currentScenario(state, getters, rootState) {
      var _rootState$route$quer = rootState.route.query,
          spot = _rootState$route$quer.spot,
          scenario = _rootState$route$quer.scenario;

      return state.current || { spot: spot, scenario: scenario };
    }
  }
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _uid = __webpack_require__(60);

var _uid2 = _interopRequireDefault(_uid);

var _highlight = __webpack_require__(7);

var _highlight2 = _interopRequireDefault(_highlight);

var _shallowEqual = __webpack_require__(9);

var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var matches = function matches(filter, text) {
  var f = filter.toLowerCase();
  var t = text.toLowerCase();
  return t.includes(f);
};

exports.default = {
  state: {
    logs: [],
    filter: ''
  },
  mutations: {
    ADD_LOG: function ADD_LOG(state, payload) {
      state.logs.push(payload);
    },
    CLEAR_CURRENT_LOGS: function CLEAR_CURRENT_LOGS(state, logs) {
      state.logs = logs;
    },
    UPDATE_FILTER: function UPDATE_FILTER(state, payload) {
      state.filter = payload;
    }
  },
  actions: {
    filterToys: function filterToys(_ref, payload) {
      var commit = _ref.commit;

      commit('UPDATE_FILTER', payload);
    },
    addLog: function addLog(_ref2, _ref3) {
      var commit = _ref2.commit;
      var data = _ref3.data,
          route = _ref3.route;

      commit('ADD_LOG', {
        data: data,
        route: route,
        id: (0, _uid2.default)()
      });
    },
    clearLogs: function clearLogs(_ref4, payload) {
      var commit = _ref4.commit,
          state = _ref4.state;

      commit('CLEAR_CURRENT_LOGS', state.logs.filter(function (log) {
        return !(0, _shallowEqual2.default)(payload, log.route);
      }));
    }
  },
  getters: {
    logs: function logs(state, getters) {
      return state.logs.filter(function (log) {
        return (0, _shallowEqual2.default)(log.route, getters.currentScenario);
      }).map(function (log) {
        return _extends({}, log, {
          data: _highlight2.default.highlight('json', JSON.stringify(log.data, null, 2)).value
        });
      });
    },
    visibleScenarios: function visibleScenarios(_ref5, getters, _ref6) {
      var filter = _ref5.filter;
      var app = _ref6.app;

      if (!filter) {
        return app.spots;
      }
      var result = {};

      var _loop = function _loop(name) {
        var scenarios = app.spots[name];
        result[name] = scenarios.filter(function (scenario) {
          return matches(filter, name + ' ' + scenario.scenario);
        });
      };

      for (var name in app.spots) {
        _loop(name);
      }
      return result;
    },
    playspotRoutes: function playspotRoutes(state, _ref7) {
      var visibleScenarios = _ref7.visibleScenarios;

      return Object.keys(visibleScenarios).map(function (name) {
        var scenarios = visibleScenarios[name];
        return scenarios.map(function (scenario) {
          return {
            scenario: scenario.scenario,
            spot: name
          };
        });
      }).reduce(function (current, next) {
        return [].concat(_toConsumableArray(current), _toConsumableArray(next));
      }, []);
    },
    filterKeyword: function filterKeyword(state) {
      return state.filter;
    }
  }
};

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = debounce;
function debounce(func, wait, immediate) {
  var timeout = void 0;

  return function () {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var later = function later() {
      timeout = null;
      if (!immediate) {
        func.apply(_this, args);
      }
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(this, args);
    }
  };
}

/***/ }),
/* 27 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 28 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 29 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 30 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 31 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 34 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 35 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 36 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 37 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(27)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(14),
  /* template */
  __webpack_require__(45),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/nickzhebrun/Work/vue-play/src/components/AppMain.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] AppMain.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-296b4fc2", Component.options)
  } else {
    hotAPI.reload("data-v-296b4fc2", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(30)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(15),
  /* template */
  __webpack_require__(48),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/nickzhebrun/Work/vue-play/src/components/DesktopIcon.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DesktopIcon.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4f098d06", Component.options)
  } else {
    hotAPI.reload("data-v-4f098d06", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(31)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(16),
  /* template */
  __webpack_require__(49),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/nickzhebrun/Work/vue-play/src/components/DeviceToolbar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] DeviceToolbar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5e1e8b0d", Component.options)
  } else {
    hotAPI.reload("data-v-5e1e8b0d", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(29)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(17),
  /* template */
  __webpack_require__(47),
  /* scopeId */
  "data-v-42e90998",
  /* cssModules */
  null
)
Component.options.__file = "/Users/nickzhebrun/Work/vue-play/src/components/HelpModal.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] HelpModal.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-42e90998", Component.options)
  } else {
    hotAPI.reload("data-v-42e90998", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(32)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(18),
  /* template */
  __webpack_require__(50),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "/Users/nickzhebrun/Work/vue-play/src/components/Home.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Home.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8d3da172", Component.options)
  } else {
    hotAPI.reload("data-v-8d3da172", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(28)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(20),
  /* template */
  __webpack_require__(46),
  /* scopeId */
  "data-v-3646c2b8",
  /* cssModules */
  null
)
Component.options.__file = "/Users/nickzhebrun/Work/vue-play/src/components/Sidebar.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Sidebar.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3646c2b8", Component.options)
  } else {
    hotAPI.reload("data-v-3646c2b8", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(34)
__webpack_require__(33)
__webpack_require__(35)
__webpack_require__(36)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(21),
  /* template */
  __webpack_require__(51),
  /* scopeId */
  "data-v-bd4ff334",
  /* cssModules */
  null
)
Component.options.__file = "/Users/nickzhebrun/Work/vue-play/src/components/Tabs.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] Tabs.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-bd4ff334", Component.options)
  } else {
    hotAPI.reload("data-v-bd4ff334", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "main",
    style: ({
      width: _vm.mainWidth
    })
  }, [(_vm.showDeviceToolbar) ? _c('device-toolbar') : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "view"
  }, [_c('iframe', {
    ref: "iframe",
    staticClass: "play-ground",
    style: ({
      width: _vm.frameSize.width,
      height: _vm.frameSize.height
    }),
    attrs: {
      "src": "preview.html",
      "frameborder": "0"
    }
  }), _vm._v(" "), (_vm.current.component) ? _c('tabs', {
    attrs: {
      "example": _vm.current.component.example,
      "readme": _vm.current.component.readme
    }
  }) : _vm._e()], 1)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-296b4fc2", module.exports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('figure', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.leftPanelExpanded),
      expression: "leftPanelExpanded"
    }],
    ref: "sidebar",
    staticClass: "sidebar",
    style: ({
      width: _vm.sidebarWidth
    })
  }, [(_vm.resizing) ? _c('div', {
    staticClass: "resize-indicator"
  }, [_vm._v("W: " + _vm._s(_vm.sidebarWidth))]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "sidebar-border",
    on: {
      "mousedown": _vm.handleMouseDown,
      "mouseup": _vm.handleMouseUp
    }
  }), _vm._v(" "), _c('h1', {
    on: {
      "click": _vm.toggleHelp
    }
  }, [_vm._v("Vue Play")]), _vm._v(" "), _c('a', {
    staticClass: "sidebar-mobile",
    on: {
      "click": _vm.toggleDeviceToolbar
    }
  }, [_c('mobile-icon', {
    attrs: {
      "size": '2em'
    }
  })], 1), _vm._v(" "), _c('div', {
    staticClass: "sidebar-search"
  }, [_c('input', {
    attrs: {
      "placeholder": "Type to filter components..."
    },
    on: {
      "input": _vm.filter
    }
  })]), _vm._v(" "), _c('div', {
    staticClass: "scenarios"
  }, _vm._l((_vm.visibleScenarios), function(scenarios, name, index) {
    return _c('ul', {
      staticClass: "nav-spots",
      class: {
        active: _vm.isActiveSpot(name, index)
      }
    }, [_c('li', {
      staticClass: "nav-spot"
    }, [(scenarios.length > 0) ? _c('div', {
      staticClass: "component-name",
      on: {
        "click": function($event) {
          _vm.activateSpot(name)
        }
      }
    }, [_vm._v("\n          " + _vm._s(name) + "\n        ")]) : _vm._e(), _vm._v(" "), _c('ul', {
      staticClass: "nav-scenarios"
    }, _vm._l((scenarios), function(scenario) {
      return _c('li', {
        staticClass: "nav-scenario"
      }, [_c('router-link', {
        attrs: {
          "exact": "",
          "to": {
            query: {
              spot: name,
              scenario: scenario.scenario
            }
          }
        }
      }, [_vm._v("\n              " + _vm._s(scenario.scenario) + "\n            ")])], 1)
    }))])])
  }))])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-3646c2b8", module.exports)
  }
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('slim-modal', {
    staticClass: "help-modal",
    style: ({
      padding: 0
    }),
    attrs: {
      "overlay-style": {
        backgroundColor: 'rgba(0, 0, 0, 0.74902)'
      },
      "is-open": _vm.showHelp,
      "click-outside": _vm.toggleHelp
    }
  }, [_c('h2', {
    staticClass: "modal-header"
  }, [_vm._v("\n    Shortcuts\n  ")]), _vm._v(" "), _c('div', {
    staticClass: "modal-body"
  }, [_c('div', {
    staticClass: "shortcut"
  }, [_c('span', {
    staticClass: "kbd"
  }, [_vm._v("Command/Ctrl + Shift + L")]), _vm._v(" "), _c('span', {
    staticClass: "desc"
  }, [_vm._v("Toggle Left Panel")])]), _vm._v(" "), _c('div', {
    staticClass: "shortcut"
  }, [_c('span', {
    staticClass: "kbd"
  }, [_vm._v("Command/Ctrl + Shift + D")]), _vm._v(" "), _c('span', {
    staticClass: "desc"
  }, [_vm._v("Toggle Down Panel")])]), _vm._v(" "), _c('div', {
    staticClass: "shortcut"
  }, [_c('span', {
    staticClass: "kbd"
  }, [_vm._v("Command/Ctrl + Shift + K")]), _vm._v(" "), _c('span', {
    staticClass: "desc"
  }, [_vm._v("Toggle All Panels")])]), _vm._v(" "), _c('div', {
    staticClass: "shortcut"
  }, [_c('span', {
    staticClass: "kbd"
  }, [_vm._v("Command/Ctrl + Shift + ←")]), _vm._v(" "), _c('span', {
    staticClass: "desc"
  }, [_vm._v("Play Previous Example")])]), _vm._v(" "), _c('div', {
    staticClass: "shortcut"
  }, [_c('span', {
    staticClass: "kbd"
  }, [_vm._v("Command/Ctrl + Shift + →")]), _vm._v(" "), _c('span', {
    staticClass: "desc"
  }, [_vm._v("Play Next Example")])])]), _vm._v(" "), _c('div', {
    staticClass: "modal-footer"
  }, [_c('button', {
    staticClass: "play-button",
    on: {
      "click": _vm.toggleHelp
    }
  }, [_vm._v("Close")]), _vm._v(" "), _c('a', {
    staticClass: "play-repo",
    attrs: {
      "href": "https://github.com/vue-play/vue-play"
    }
  }, [_vm._v("\n      Check out vue-play on GitHub\n    ")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-42e90998", module.exports)
  }
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    staticClass: "svg-icon",
    style: ({
      width: _vm.size,
      height: _vm.size
    }),
    attrs: {
      "viewBox": "0 0 20 20"
    }
  }, [_c('path', {
    attrs: {
      "fill": _vm.color,
      "d": "M17.125,1.375H2.875c-0.828,0-1.5,0.672-1.5,1.5v11.25c0,0.828,0.672,1.5,1.5,1.5H7.75v2.25H6.625c-0.207,0-0.375,0.168-0.375,0.375s0.168,0.375,0.375,0.375h6.75c0.207,0,0.375-0.168,0.375-0.375s-0.168-0.375-0.375-0.375H12.25v-2.25h4.875c0.828,0,1.5-0.672,1.5-1.5V2.875C18.625,2.047,17.953,1.375,17.125,1.375z M11.5,17.875h-3v-2.25h3V17.875zM17.875,14.125c0,0.414-0.336,0.75-0.75,0.75H2.875c-0.414,0-0.75-0.336-0.75-0.75v-1.5h15.75V14.125z M17.875,11.875H2.125v-9c0-0.414,0.336-0.75,0.75-0.75h14.25c0.414,0,0.75,0.336,0.75,0.75V11.875z M10,14.125c0.207,0,0.375-0.168,0.375-0.375S10.207,13.375,10,13.375s-0.375,0.168-0.375,0.375S9.793,14.125,10,14.125z"
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-4f098d06", module.exports)
  }
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "device-toolbar"
  }, [_c('a', {
    staticClass: "device",
    class: {
      selected: _vm.selectedDevice === null
    },
    on: {
      "click": function($event) {
        _vm.setDevice(null)
      }
    }
  }, [_c('desktop-icon', {
    attrs: {
      "size": '2em'
    }
  }), _vm._v(" "), _c('div', [_vm._v("Default")])], 1), _vm._v(" "), _vm._l((_vm.devices), function(device) {
    return _c('a', {
      staticClass: "device",
      class: {
        selected: _vm.selectedDevice === device
      },
      on: {
        "click": function($event) {
          _vm.setDevice(device)
        }
      }
    }, [_c('mobile-icon', {
      attrs: {
        "size": '2em'
      }
    }), _vm._v(" "), _c('div', [_vm._v(_vm._s(device.name))])], 1)
  })], 2)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-5e1e8b0d", module.exports)
  }
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "app"
  }, [_c('help-modal'), _vm._v(" "), _c('sidebar'), _vm._v(" "), _c('app-main')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-8d3da172", module.exports)
  }
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.bottomPanelExpanded),
      expression: "bottomPanelExpanded"
    }],
    ref: "panel",
    staticClass: "play-tabs"
  }, [(_vm.resizing) ? _c('div', {
    staticClass: "resize-indicator"
  }, [_vm._v("H: " + _vm._s(_vm.tabHeight) + "px")]) : _vm._e(), _vm._v(" "), _c('div', {
    ref: "header",
    staticClass: "tab-header",
    on: {
      "mousedown": _vm.handleMouseDown,
      "mouseup": _vm.handleMouseUp
    }
  }, [(_vm.readme) ? _c('span', {
    staticClass: "title",
    class: {
      active: _vm.active === 'readme'
    },
    on: {
      "mousedown": function($event) {
        $event.stopPropagation();
      },
      "click": function($event) {
        _vm.updateActiveTab('readme')
      }
    }
  }, [_c('svg', {
    attrs: {
      "id": "i-book",
      "viewBox": "0 0 32 32",
      "width": "32",
      "height": "32",
      "fill": "none",
      "stroke": "currentcolor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "6.25%"
    }
  }, [_c('path', {
    attrs: {
      "d": "M16 7 C16 7 9 1 2 6 L2 28 C9 23 16 28 16 28 16 28 23 23 30 28 L30 6 C23 1 16 7 16 7 Z M16 7 L16 28"
    }
  })]), _vm._v("\n      readme\n    ")]) : _vm._e(), _vm._v(" "), _c('span', {
    staticClass: "title",
    class: {
      active: _vm.active === 'console'
    },
    on: {
      "mousedown": function($event) {
        $event.stopPropagation();
      },
      "click": function($event) {
        _vm.updateActiveTab('console')
      }
    }
  }, [_c('svg', {
    attrs: {
      "id": "i-bell",
      "viewBox": "0 0 32 32",
      "width": "32",
      "height": "32",
      "fill": "none",
      "stroke": "currentcolor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "6.25%"
    }
  }, [_c('path', {
    attrs: {
      "d": "M8 17 C8 12 9 6 16 6 23 6 24 12 24 17 24 22 27 25 27 25 L5 25 C5 25 8 22 8 17 Z M20 25 C20 25 20 29 16 29 12 29 12 25 12 25 M16 3 L16 6"
    }
  })]), _vm._v("\n      console"), (_vm.logs.length > 0) ? _c('sup', {
    staticClass: "logs-count"
  }, [_vm._v(_vm._s(_vm.logs.length))]) : _vm._e()]), _vm._v(" "), (_vm.example) ? _c('span', {
    staticClass: "title",
    class: {
      active: _vm.active === 'example'
    },
    on: {
      "mousedown": function($event) {
        $event.stopPropagation();
      },
      "click": function($event) {
        _vm.updateActiveTab('example')
      }
    }
  }, [_c('svg', {
    attrs: {
      "id": "i-code",
      "viewBox": "0 0 32 32",
      "width": "32",
      "height": "32",
      "fill": "none",
      "stroke": "currentcolor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "6.25%"
    }
  }, [_c('path', {
    attrs: {
      "d": "M10 9 L3 17 10 25 M22 9 L29 17 22 25 M18 7 L14 27"
    }
  })]), _vm._v("\n      Example\n    ")]) : _vm._e(), _vm._v(" "), _c('div', {
    staticClass: "tab-actions"
  }, [(_vm.logs.length > 0 && _vm.active === 'console') ? _c('span', {
    staticClass: "tab-action hint--top-left hint--rounded",
    attrs: {
      "aria-label": "clean logs"
    },
    on: {
      "mousedown": function($event) {
        $event.stopPropagation();
      },
      "click": _vm.clearCurrentLogs
    }
  }, [_c('svg', {
    attrs: {
      "id": "i-trash",
      "viewBox": "0 0 32 32",
      "width": "32",
      "height": "32",
      "fill": "none",
      "stroke": "currentcolor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "6.25%"
    }
  }, [_c('path', {
    attrs: {
      "d": "M28 6 L6 6 8 30 24 30 26 6 4 6 M16 12 L16 24 M21 12 L20 24 M11 12 L12 24 M12 6 L13 2 19 2 20 6"
    }
  })])]) : _vm._e(), _vm._v(" "), (_vm.tabHeight !== 0) ? _c('span', {
    staticClass: "tab-action hint--top-left hint--rounded",
    attrs: {
      "aria-label": "Minimize the tab"
    },
    on: {
      "mousedown": function($event) {
        $event.stopPropagation();
      },
      "click": function($event) {
        _vm.setTabHeight(0)
      }
    }
  }, [_c('svg', {
    attrs: {
      "id": "i-external",
      "viewBox": "0 0 32 32",
      "width": "32",
      "height": "32",
      "fill": "none",
      "stroke": "currentcolor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "4.25%"
    }
  }, [_c('path', {
    attrs: {
      "d": "M5 5 L28 5 L28 28 L5 28 L5 5 M10 22 L23 22"
    }
  })])]) : _c('span', {
    staticClass: "tab-action hint--top-left hint--rounded",
    attrs: {
      "aria-label": "Reset the tab height"
    },
    on: {
      "mousedown": function($event) {
        $event.stopPropagation();
      },
      "click": function($event) {
        _vm.setTabHeight(200)
      }
    }
  }, [_c('svg', {
    attrs: {
      "viewBox": "0 0 32 32",
      "width": "32",
      "height": "32",
      "fill": "none",
      "stroke": "currentcolor",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "stroke-width": "4.25%"
    }
  }, [_c('path', {
    attrs: {
      "d": "M5 5 L28 5 L28 28 L5 28 L5 5 M10 10 L23 10 L23 20 L10 20 L10 10"
    }
  })])])])]), _vm._v(" "), (_vm.active === 'readme') ? _c('div', {
    ref: "body",
    staticClass: "tab-body",
    style: ({
      padding: '10px',
      height: _vm.tabHeight + 'px'
    })
  }, [_c('div', {
    staticClass: "markdown-body",
    domProps: {
      "innerHTML": _vm._s(_vm.readme)
    }
  })]) : _vm._e(), _vm._v(" "), (_vm.active === 'console') ? _c('div', {
    ref: "body",
    staticClass: "tab-body console-body",
    style: ({
      height: _vm.tabHeight + 'px'
    })
  }, _vm._l((_vm.logs), function(log) {
    return _c('div', {
      staticClass: "console-item"
    }, [_c('pre', [_c('code', {
      domProps: {
        "innerHTML": _vm._s(log.data)
      }
    })])])
  })) : _vm._e(), _vm._v(" "), (_vm.active === 'example') ? _c('div', {
    ref: "body",
    staticClass: "tab-body",
    style: ({
      height: _vm.tabHeight + 'px'
    })
  }, [_c('pre', [_c('code', {
    domProps: {
      "innerHTML": _vm._s(_vm.highlightedExample)
    }
  })])]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-bd4ff334", module.exports)
  }
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('svg', {
    staticClass: "svg-icon",
    style: ({
      width: _vm.size,
      height: _vm.size
    }),
    attrs: {
      "viewBox": "0 0 20 20"
    }
  }, [_c('path', {
    attrs: {
      "fill": _vm.color,
      "d": "M10,15.654c-0.417,0-0.754,0.338-0.754,0.754S9.583,17.162,10,17.162s0.754-0.338,0.754-0.754S10.417,15.654,10,15.654z M14.523,1.33H5.477c-0.833,0-1.508,0.675-1.508,1.508v14.324c0,0.833,0.675,1.508,1.508,1.508h9.047c0.833,0,1.508-0.675,1.508-1.508V2.838C16.031,2.005,15.356,1.33,14.523,1.33z M15.277,17.162c0,0.416-0.338,0.754-0.754,0.754H5.477c-0.417,0-0.754-0.338-0.754-0.754V2.838c0-0.417,0.337-0.754,0.754-0.754h9.047c0.416,0,0.754,0.337,0.754,0.754V17.162zM13.77,2.838H6.23c-0.417,0-0.754,0.337-0.754,0.754v10.555c0,0.416,0.337,0.754,0.754,0.754h7.539c0.416,0,0.754-0.338,0.754-0.754V3.592C14.523,3.175,14.186,2.838,13.77,2.838z M13.77,13.77c0,0.208-0.169,0.377-0.377,0.377H6.607c-0.208,0-0.377-0.169-0.377-0.377V3.969c0-0.208,0.169-0.377,0.377-0.377h6.785c0.208,0,0.377,0.169,0.377,0.377V13.77z"
    }
  })])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-d422deba", module.exports)
  }
}

/***/ }),
/* 53 */,
/* 54 */
/***/ (function(module, exports) {

module.exports = require("array-find-index");

/***/ }),
/* 55 */
/***/ (function(module, exports) {

module.exports = require("highlight.js/lib/highlight");

/***/ }),
/* 56 */
/***/ (function(module, exports) {

module.exports = require("highlight.js/lib/languages/javascript");

/***/ }),
/* 57 */
/***/ (function(module, exports) {

module.exports = require("highlight.js/lib/languages/json");

/***/ }),
/* 58 */
/***/ (function(module, exports) {

module.exports = require("highlight.js/lib/languages/xml");

/***/ }),
/* 59 */,
/* 60 */
/***/ (function(module, exports) {

module.exports = require("uid");

/***/ }),
/* 61 */
/***/ (function(module, exports) {

module.exports = require("vue-router");

/***/ }),
/* 62 */
/***/ (function(module, exports) {

module.exports = require("vue-slim-modal");

/***/ }),
/* 63 */
/***/ (function(module, exports) {

module.exports = require("vuex-router-sync");

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ })
/******/ ]);
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var firstUpperCase = function firstUpperCase(s) {
  return s.replace(/^(\S)/, function (c) {
    return c.toUpperCase();
  });
};
var noop = function noop() {};
var bindHook = function bindHook(hookType, event, context) {
  return function (event, currentState, from, to) {
    return (context['' + hookType + firstUpperCase(event)] || noop)(event, currentState, from, to);
  };
};

/**
 * Finite state machine, whose state can be any type that is supported by lodash.isEqual method.
 * @param {Object} options options of finite state machine.
 * @param {Any} options.initState initial state of machine.
 * @param {Array} options.transitions transition array of machine, each item includes event name, from state, to state.
 * @param {Object} options.actions actions during a transition by observing lifecycle events.
 */

var FiniteStateMachine = function () {
  function FiniteStateMachine(options) {
    _classCallCheck(this, FiniteStateMachine);

    var initState = options.initState,
        transitions = options.transitions,
        actions = options.actions;

    this.currentState = initState;
    this.actions = actions;
    this.states = new Set();
    this.parseTransitions(transitions);
    this.bindActions(actions);
  }

  _createClass(FiniteStateMachine, [{
    key: 'hasState',
    value: function hasState(name) {
      return this.states.has(name);
    }
  }, {
    key: 'allStates',
    value: function allStates() {
      return Array.from(this.states);
    }
  }, {
    key: 'bindActions',
    value: function bindActions(actions) {
      var _this = this;

      Object.keys(actions).forEach(function (methodName) {
        _this[methodName] = actions[methodName];
      });
    }
  }, {
    key: 'parseTransitions',
    value: function parseTransitions(transitions) {
      var _this2 = this;

      if (!(transitions instanceof Array)) {
        throw new Error('transitions must be Array.');
      }
      transitions.forEach(function (transition) {
        var event = transition.event,
            from = transition.from,
            to = transition.to;

        if (_lodash2.default.isEqual(from, to)) {
          throw new Error('from state and to state should not equal.');
        }
        _this2.states.add(from);
        _this2.states.add(to);
        var beforeHook = bindHook('before', event, _this2);
        var afterHook = bindHook('after', event, _this2);
        _this2[event] = function () {
          if (!_lodash2.default.isEqual(_this2.currentState, from)) {
            throw new Error('Current state is ' + _this2.currentState + ', state can\'t be transformed from ' + from + ' to ' + to + ' by ' + event);
          }
          beforeHook(event, _this2.currentState, from, to);
          _this2.currentState = to;
          afterHook(event, _this2.currentState, from, to);
        };
      });
    }
  }]);

  return FiniteStateMachine;
}();

exports.default = FiniteStateMachine;
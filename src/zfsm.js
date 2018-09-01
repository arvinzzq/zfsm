import _ from 'lodash';

const firstUpperCase = s => s.replace(/^(\S)/, c => c.toUpperCase());
const noop = () => {};
const bindHook = (hookType, event, context) => (event, currentState, from , to) => (context[`${hookType}${firstUpperCase(event)}`] || noop)(event, currentState, from , to);

/**
 * Finite state machine, whose state can be any type that is supported by lodash.isEqual method.
 * @param {Object} options options of finite state machine.
 * @param {Any} options.initState initial state of machine.
 * @param {Array} options.transitions transition array of machine, each item includes event name, from state, to state.
 * @param {Object} options.actions actions during a transition by observing lifecycle events.
 */
class FiniteStateMachine {
  constructor(options) {
    const { initState, transitions, actions } = options;
    this.currentState = initState;
    this.actions = actions;
    this.states = new Set();
    this.parseTransitions(transitions);
    this.bindActions(actions);
  }

  hasState(name) {
    return this.states.has(name);
  }

  allStates() {
    return Array.from(this.states);
  }

  bindActions(actions) {
    Object.keys(actions).forEach(methodName => {
      this[methodName] = actions[methodName];
    });
  }

  parseTransitions(transitions) {
    if (!(transitions instanceof Array)) {
      throw new Error('transitions must be Array.');
    }
    transitions.forEach(transition => {
      const { event, from, to } = transition;
      if (_.isEqual(from, to)) {
        throw new Error('from state and to state should not equal.');
      }
      this.states.add(from);
      this.states.add(to);
      const beforeHook = bindHook('before', event, this);
      const afterHook = bindHook('after', event, this);
      this[event] = () => {
        if (!_.isEqual(this.currentState, from)) {
          throw new Error(`Current state is ${this.currentState}, state can't be transformed from ${from} to ${to} by ${event}`);
        }
        beforeHook(event, this.currentState, from, to);
        this.currentState = to;
        afterHook(event, this.currentState, from, to);
      };
    });
  }
}

export default FiniteStateMachine;
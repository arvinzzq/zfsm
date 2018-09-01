[![npm version](https://img.shields.io/npm/v/zfsm.svg)](https://www.npmjs.com/package/zfsm)

# zfsm

zfsm is a simple finite state 🔀 machine 🤖 TBD. Transition of zfsm can only be synchronous now, but asynchronous transition will be support in future, relax 😜 ~

## Usage

### jsdocs

```javascript
/**
 * Finite state machine, whose state can be any type that is supported by lodash.isEqual method.
 * @param {Object} options options of finite state machine.
 * @param {Any} options.initState initial state of machine.
 * @param {Array} options.transitions transition array of machine, each item includes event name, from state, to state.
 * @param {Object} options.actions actions during a transition by observing lifecycle events.
 */
```

### Example

#### API

* allStates(): return all possible states.
* hasState(name): check whether state exist of configured fsm.

#### Code Snippet

```javascript
import FiniteStateMachine from 'zfsm';

const fsm = new FiniteStateMachine({
  initState: 'solid',
  transitions: [
    { event: 'melt',     from: 'solid',  to: 'liquid' },
    { event: 'freeze',   from: 'liquid', to: 'solid'  },
    { event: 'vaporize', from: 'liquid', to: 'gas'    },
    { event: 'condense', from: 'gas',    to: 'liquid' }
  ],
  actions: {
    beforeMelt: function(...args) {
      console.log('before melted');
      console.log('args: ', args);
    },
    afterMelt: function(...args) {
      console.log('after melted');
      console.log('args: ', args);
    },
    afterFreeze:   function() { console.log('after froze'); },
    beforeVaporize: function() { console.log('before vaporized'); },
    afterCondense: function() { console.log('after condensed'); }
  }
});

console.log('allStates => ', fsm.allStates());

console.log('has state solid => ', fsm.hasState('solid'));

console.log('currentState => ', fsm.currentState);
fsm.melt();
console.log('currentState => ', fsm.currentState);
fsm.freeze();
console.log('currentState => ', fsm.currentState);
fsm.melt();
console.log('currentState => ', fsm.currentState);
fsm.vaporize();
console.log('currentState => ', fsm.currentState);
fsm.condense();
console.log('currentState => ', fsm.currentState);
fsm.freeze();
console.log('currentState => ', fsm.currentState);

console.log('allStates => ', fsm.allStates());
```

#### Output

```javascript
allStates =>  [ 'solid', 'liquid', 'gas' ]
has state solid =>  true
currentState =>  solid
before melted
args:  [ 'melt', 'solid', 'solid', 'liquid' ]
after melted
args:  [ 'melt', 'liquid', 'solid', 'liquid' ]
currentState =>  liquid
after froze
currentState =>  solid
before melted
args:  [ 'melt', 'solid', 'solid', 'liquid' ]
after melted
args:  [ 'melt', 'liquid', 'solid', 'liquid' ]
currentState =>  liquid
before vaporized
currentState =>  gas
after condensed
currentState =>  liquid
after froze
currentState =>  solid
allStates =>  [ 'solid', 'liquid', 'gas' ]
```

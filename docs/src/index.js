import FiniteStateMachine from '../../lib/zfsm';

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
'use strict';

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
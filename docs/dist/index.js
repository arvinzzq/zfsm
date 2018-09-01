'use strict';

var _zfsm = require('../../lib/zfsm');

var _zfsm2 = _interopRequireDefault(_zfsm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fsm = new _zfsm2.default({
  initState: 'solid',
  transitions: [{ event: 'melt', from: 'solid', to: 'liquid' }, { event: 'freeze', from: 'liquid', to: 'solid' }, { event: 'vaporize', from: 'liquid', to: 'gas' }, { event: 'condense', from: 'gas', to: 'liquid' }],
  actions: {
    beforeMelt: function beforeMelt() {
      console.log('before melted');

      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.log('args: ', args);
    },
    afterMelt: function afterMelt() {
      console.log('after melted');

      for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      console.log('args: ', args);
    },
    afterFreeze: function afterFreeze() {
      console.log('after froze');
    },
    beforeVaporize: function beforeVaporize() {
      console.log('before vaporized');
    },
    afterCondense: function afterCondense() {
      console.log('after condensed');
    }
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
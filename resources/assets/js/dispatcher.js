var Dispatcher = require('flux').Dispatcher;
var AppDispatcher = new Dispatcher();

import Actions from './actions/AppActions.js';

AppDispatcher.register((payload) => {
  Actions.call(payload);
  return true;
});

export default AppDispatcher;

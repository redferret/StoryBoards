
class Actions {
  constructor() {
    this._actions = new Map();
  }
  register(actionName, action) {
    this._actions.set(actionName, action);
  }
  call(payload) {
    let action = this._actions.get(payload.action);
    if (action instanceof Function) {
      action(payload);
    } else if (action == undefined || action == null || !(action instanceof Function)) {
      throw new Error(`Action '${payload.action}' is not registered, be sure to require the action in ActionRepo.js`);
    }
  }

  finish(payload) {
    payload.emitOn.map(emitter => {
      var store = emitter.store;
      emitter.componentIds.map(id => {
        store.emit(id);
      })
    });
  }
}

export default new Actions();

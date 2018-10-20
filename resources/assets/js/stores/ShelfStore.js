import EventEmitter from 'events';

class ShelfStore extends EventEmitter {
  constructor() {
    super();

  }

  setCurrentActiveKey(key) {
    this._activeKey = key;
  }

  getCurrentActiveKey() {
    return this._activeKey;
  }
}

export default new ShelfStore();

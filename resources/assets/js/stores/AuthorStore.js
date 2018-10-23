import EventEmitter from 'events';

class AuthorStore extends EventEmitter {
  constructor() {
    super();
    this._watchers = [];
    this._watching = [];
  }

  setAuthorId(id) {
    this._user_id = id;
  }

  getAuthorId() {
    return this._user_id;
  }

  setWatchers(watchers) {
    this._watchers = watchers;
  }

  getWatchers() {
    return this._watchers;
  }

  setWatching(watching) {
    this._watching = watching;
  }

  getWatching() {
    return this._watching;
  }
}

export default new AuthorStore();

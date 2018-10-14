import EventEmitter from 'events';

class BookStore extends EventEmitter {
  constructor() {
    super();
    this._stories = [];
  }

  setStories(stories) {
    this._stories = stories;
  }

  getStories() {
    return this._stories;
  }
}

export default new BookStore();

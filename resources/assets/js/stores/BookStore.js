import EventEmitter from 'events';

class BookStore extends EventEmitter {
  constructor() {
    super();
    this._stories = [];
    this.setMaxListeners(50);
  }

  setStory(story) {
    this._singleStory = story;
  }

  setStories(stories) {
    this._stories = stories;
  }

  getStories() {
    return this._stories;
  }

  getStory(id) {
    return this._singleStory;
  }

}

export default new BookStore();

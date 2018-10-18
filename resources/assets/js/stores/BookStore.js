import EventEmitter from 'events';

class BookStore extends EventEmitter {
  constructor() {
    super();
    this._stories = [];
    this.setMaxListeners(50);
  }

  setStory(story) {
    let id = story.id;
    let index = this._stories.findIndex(story => {
      return story.id == id;
    });
    this._stories[index] = story;
    console.log('BookStory setStory:', story);
  }

  setStories(stories) {
    this._stories = stories;
  }

  getStories() {
    return this._stories;
  }

  getStory(id) {
    let story = this._stories.find(story => {
      return story.id == id;
    });
    console.log('BookStory getStory:', story);
    return story;
  }

}

export default new BookStore();

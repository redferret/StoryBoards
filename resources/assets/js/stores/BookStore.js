import EventEmitter from 'events';

class BookStore extends EventEmitter {
  constructor() {
    super();
    this._stories = [];

    this.setMaxListeners(1000);
  }

  setStories(stories) {
    this._stories = stories;
  }

  getStories() {
    return this._stories;
  }

  getStory(id) {
    return this._stories.find(story => {
      return story.id == id;
    });
  }

  setNewImageName(name) {
    this.newImageName = name;
  }

  getUploadedPhotoName() {
    return this.newImageName;
  }
}

export default new BookStore();

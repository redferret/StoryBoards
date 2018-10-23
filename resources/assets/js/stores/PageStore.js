import EventEmitter from 'events';

class PageStore extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(10000);
    this.storyMapPageIndexes = new Map();
  }

  setCurrentlyViewedPage(storyId, pageIndex) {
    this.storyMapPageIndexes.set(storyId, pageIndex);
  }

  getPageIndexOfStory(storyId) {
    return this.storyMapPageIndexes.get(storyId);
  }

  setNewImageName(name) {
    this.newImageName = name;
  }

  getUploadedPhotoName() {
    return this.newImageName;
  }

}

export default new PageStore();

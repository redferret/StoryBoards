import EventEmitter from 'events';

class PageStore extends EventEmitter {
  constructor() {
    super();
    this.setMaxListeners(500);
    this.storyMapIds = new Map();
  }

  setCurrentlyViewedStoryAndPage(storyId, pageIndex) {
    this.storyMapIds.set(storyId, pageIndex);
  }

  getPageIndexOfStory(storyId) {
    return this.storyMapIds.get(storyId);
  }

  setNewImageName(name) {
    this.newImageName = name;
  }

  getUploadedPhotoName() {
    return this.newImageName;
  }

}

export default new PageStore();

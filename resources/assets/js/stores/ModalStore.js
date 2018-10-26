import AppDispatcher from '../dispatcher.js';
import EventEmitter from 'events';

class ModalStore extends EventEmitter {
  constructor() {
    super();
    this._showModal = false;
  }

  getPageId() {
    return this._pageId;
  }

  setPageId(id) {
    this._pageId = id;
  }

  setBookKey(key) {
    this._bookKey = key;
  }

  setTheCurrentPageText(text) {
    this._currentPageText = text;
  }

  getBookKey() {
    return this._bookKey;
  }

  getCurrentPageText() {
    return this._currentPageText;
  }

  triggerModal(showModal, id) {
    this._showModal = showModal;
    if (id) {
      this.emit(id);
    }
  }

  shouldShow() {
    return this._showModal;
  }

}

export default new ModalStore();

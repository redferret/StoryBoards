import AppDispatcher from '../dispatcher.js';
import EventEmitter from 'events';

import { MODAL_ID, TRIGGER_MODAL } from '../constants.js';

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

  triggerModal(showModal) {
    this._showModal = showModal;
    this.emit(MODAL_ID);
  }

  shouldShow() {
    return this._showModal;
  }

}

export default new ModalStore();

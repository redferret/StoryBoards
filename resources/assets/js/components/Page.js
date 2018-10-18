import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import FlipPage from 'react-flip-page';
import PageStore from '../stores/PageStore.js';
import React from 'react';
import Router from '../router.js';

import {uid} from 'react-uid';

import {
  BOOK_ID,
  CHANGE_IMAGE,
  GET_STORIES,
  GET_STORY,
  IMAGE_ASSET,
  MAIN_ID,
  PAGE_ID,
  REMOVE_IMAGE,
  UPLOAD_IMAGE,
} from '../constants.js';

export default class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.getListenerId = this.getListenerId.bind(this);
    this.photoUploadHandler = this.photoUploadHandler.bind(this);
    this.toggleEditPageText = this.toggleEditPageText.bind(this);
    this.removePageImage = this.removePageImage.bind(this);
    this.renderImage = this.renderImage.bind(this);

    this.state = {
      editTextMode: false
    }
  }

  _onChange() {
  }

  getListenerId() {
    return `${PAGE_ID}_${this.props.id}`;
  }

  componentDidMount() {
    PageStore.on(this.getListenerId(), this._onChange.bind(this));
  }

  componentWillUnmount() {
    PageStore.removeListener(this.getListenerId(), this._onChange.bind(this));
  }

  toggleEditPageText() {
    this.setState({
      editTextMode: !this.state.editTextMode
    })
  }

  removePageImage() {
    AppDispatcher.dispatch({
      action: REMOVE_IMAGE,
      photo_name: this.props.photo_name,
      page_id: this.props.id,
      emitOn: [{
        store: BookStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  photoUploadHandler(event) {
    AppDispatcher.dispatch({
      action: UPLOAD_IMAGE,
      page_photo: event.target.files[0],
      page_id: this.props.id,
      emitOn: [{
        store: BookStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  renderImage() {
    let photo_name = this.props.photo_name;
    if( photo_name != null) {
      return (
        <div>
          <div className='upload-btn-wrapper'>
            <a onClick={this.removePageImage}>Remove Image</a>
          </div>
          <img width='100%' src={Router.route(IMAGE_ASSET, { photo_name })} />
        </div>
      );
    } else {
      return (
        <div className='upload-btn-wrapper'>
          <button className='upload-btn'>Upload a photo</button>
          <input type='file' name='page_photo' onChange={this.photoUploadHandler} />
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div>{`${this.props.index + 1}`}</div>
        <div className='page-image'>
          {this.renderImage()}
        </div>
        <p>
          {this.props.text}
        </p>
        <div className='edit-page-text-div'>
          <a onClick={this.toggleEditPageText}>Edit Page Text</a>
        </div>
      </div>
    );
  }
}

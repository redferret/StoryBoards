import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import FlipPage from 'react-flip-page';
import ModalStore from '../stores/ModalStore.js';
import PageStore from '../stores/PageStore.js';
import React from 'react';
import Router from '../router.js';

import { componentId } from './Book.js';

import {uid} from 'react-uid';

import {
  CREATE_PAGE,
  DELETE_PAGE,
  IMAGE_ASSET,
  MAIN_ID,
  PAGE_ID,
  REMOVE_IMAGE,
  UPLOAD_IMAGE,
} from '../constants.js';

import {
  Button,
} from 'react-bootstrap';

export default class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.photoUploadHandler = this.photoUploadHandler.bind(this);
    this.removePageImage = this.removePageImage.bind(this);
    this.renderImage = this.renderImage.bind(this);
    this.handleTriggerModal = this.handleTriggerModal.bind(this);
    this.handleDeletePage = this.handleDeletePage.bind(this);
    this.handleNewPage = this.handleNewPage.bind(this);
  }

  handleTriggerModal() {
    ModalStore.setTheCurrentPageText(this.props.text);
    ModalStore.setPageId(this.props.id);
    ModalStore.setBookKey(this.props.bookKey);
    ModalStore.triggerModal(true);
  }

  removePageImage() {
    let remove = confirm('Are you sure you want to remove this image?');
    if (remove) {
      AppDispatcher.dispatch({
        action: REMOVE_IMAGE,
        photo_name: this.props.photo_name,
        page_id: this.props.id,
        emitOn: [{
          store: BookStore,
          componentIds: [componentId(this.props.bookKey)]
        }]
      });
    }
  }

  photoUploadHandler(event) {
    AppDispatcher.dispatch({
      action: UPLOAD_IMAGE,
      page_photo: event.target.files[0],
      page_id: this.props.id,
      emitOn: [{
        store: BookStore,
        componentIds: [componentId(this.props.bookKey)]
      }]
    });
  }

  handleNewPage() {
    // + 2 because, +1 to correct for the index and +1 for the new page.
    let page_number = PageStore.getPageIndexOfStory(this.props.story_id) + 2;
    if (isNaN(page_number)) {
      page_number = 2;
    }
    PageStore.setCurrentlyViewedPage(this.props.story_id, page_number - 1);
    AppDispatcher.dispatch({
      action: CREATE_PAGE,
      story_id: this.props.story_id,
      page_number,
      emitOn: [{
        store: BookStore,
        componentIds: [componentId(this.props.bookKey)]
      }]
    });
  }

  handleDeletePage() {
    let page_number = PageStore.getPageIndexOfStory(this.props.story_id) + 1;
    let remove = confirm(`Are you sure you want to delete page ${page_number}?`);
    if (remove) {
      PageStore.setCurrentlyViewedPage(this.props.story_id, page_number - 2);
      AppDispatcher.dispatch({
        action: DELETE_PAGE,
        story_id: this.props.id,
        page_id: this.props.id,
        photo_name: this.props.photo_name,
        emitOn: [{
          store: BookStore,
          componentIds: [componentId(this.props.bookKey)]
        }]
      });
    }
  }

  renderImage() {
    let photo_name = this.props.photo_name;
    if( photo_name != null) {
      return (
        <div>
          <div className='upload-btn-wrapper'>
            <Button bsStyle='warning' onClick={this.removePageImage}>Remove Image</Button>
          </div>
          <img className='image' src={Router.route(IMAGE_ASSET, { photo_name })} />
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
    let deletePageButton = this.props.page_number > 1?
      <Button bsStyle='danger' onClick={this.handleDeletePage}>Delete Page</Button> : null;
    return (
      <div>
        <div>{`Page ${this.props.page_number}`}</div>
        <div>
          <Button bsStyle='info' onClick={this.handleTriggerModal}>Edit Page Text</Button>{' '}
          <Button bsStyle='success' onClick={this.handleNewPage}>Add Page</Button>{' '}
          {deletePageButton}
        </div>
        <div className='page-image'>
          {this.renderImage()}
        </div>
        <div dangerouslySetInnerHTML=
          {{__html: this.props.text}}>
        </div>
      </div>
    );
  }
}

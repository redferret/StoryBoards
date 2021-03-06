import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import FlipPage from 'react-flip-page';
import ModalStore from '../stores/ModalStore.js';
import PageStore from '../stores/PageStore.js';
import React from 'react';
import Router from '../router.js';

import { componentId } from './Book.js';

import { uid } from 'react-uid';

import {
  CREATE_PAGE,
  DELETE_PAGE,
  EDIT_TEXT_ID,
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
    this.renderPageButtons = this.renderPageButtons.bind(this);
  }

  handleTriggerModal() {
    ModalStore.setTheCurrentPageText(this.props.text);
    ModalStore.setPageId(this.props.id);
    ModalStore.setBookKey(this.props.bookKey);
    ModalStore.triggerModal(true, EDIT_TEXT_ID);
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
    if (this.props.published) {
      if (photo_name != null) {
        return <img className='image' src={Router.route(IMAGE_ASSET, { photo_name })} />;
      } else {
        return null;
      }
    } else {
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
            <Button bsStyle='info' onClick={()=>{this.fileUploadRef.click()}}>Upload a photo</Button>
            <div> <i>Recommended Dimensions: Width = 1360, Height = 768</i> </div>
            <input type='file' onChange={this.photoUploadHandler} ref={(ref)=>{this.fileUploadRef = ref}}/>
          </div>
        );
      }
    }
  }

  renderPageButtons() {
    let deletePageButton = this.props.page_number > 1?
      <Button bsStyle='danger' onClick={this.handleDeletePage}>Delete Page</Button> : null;
    if (this.props.published) {
      return null;
    } else {
      return (
        <div>
          <Button bsStyle='info' onClick={this.handleTriggerModal}>Edit Page Text</Button>{' '}
          <Button bsStyle='success' onClick={this.handleNewPage}>Add Page</Button>{' '}
          {deletePageButton}
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <div>{`Page ${this.props.page_number}`}</div>
        {this.renderPageButtons()}
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

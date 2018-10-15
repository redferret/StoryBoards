import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import FlipPage from 'react-flip-page';
import Router from '../router.js';
import React from 'react';

import {uid} from 'react-uid';

import {
  PAGE_ID,
  IMAGE_ASSET,
  UPLOAD_IMAGE,
} from '../constants.js';

export default class Page extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.enableEditPageText = this.enableEditPageText.bind(this);

    this.mounted = false;

    this.state = {
      photo_name: null
    }
  }

  _onChange() {
    if (this.mounted) {
      this.setState({
        photo_name: BookStore.getUploadedPhotoName()
      });
    }
  }

  componentDidMount() {
    this.mounted = true;
    BookStore.on(`${PAGE_ID}_${this.props.id}`, this._onChange.bind(this));
  }

  componentWillUnmount() {
    this.mounted = false;
    BookStore.removeListener(`${PAGE_ID}_${this.props.id}`, this._onChange.bind(this));
  }

  enableEditPageText() {

  }


  fileChangedHandler(event) {
    AppDispatcher.dispatch({
      action: UPLOAD_IMAGE,
      page_photo: event.target.files[0],
      page_id: this.props.id,
      emitOn: [{
        store: BookStore,
        componentIds: [`${PAGE_ID}_${this.props.id}`]
      }]
    });
  }

  render() {
    let photo_name = this.props.photo_name;
    return (
      <div>
        <div>{(this.props.index == 0? 'Cover' : `${this.props.index}`)}</div>
        <div className='page-image'>
          {photo_name != null?
            <img width='100%' src={Router.route(IMAGE_ASSET, { photo_name })} />
            :
            <div className='upload-btn-wrapper'>
              <button className='upload-btn'>Upload a photo</button>
              <input type='file' name='page_photo' onChange={this.fileChangedHandler} />
            </div>
          }
        </div>
        <p>
          {this.props.text}
        </p>
        <div className='edit-page-text-div'>
          <a onClick={this.enableEditPageText}>Edit Page Text</a>
        </div>
      </div>
    );
  }
}

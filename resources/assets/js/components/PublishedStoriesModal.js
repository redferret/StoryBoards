import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import ModalStore from '../stores/ModalStore.js';
import React from 'react';
import Shelf from './Shelf.js';

import { componentId } from './Book.js';
import { Button, Modal } from 'react-bootstrap';
import { PUBLISHED_STORIES_ID } from '../constants.js';

export default class PublishedStoriesModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this._isMounted = false;

    this.state = {
      show: false
    };
  }

  _onChange() {
    if (this._isMounted) {
      this.setState({
        show: ModalStore.shouldShow(),
        stories: BookStore.getAuthorsPublishedStories()
      });
    }
  }

  componentDidMount() {
    this._isMounted = true;
    ModalStore.on(PUBLISHED_STORIES_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    ModalStore.removeListener(PUBLISHED_STORIES_ID, this._onChange.bind(this));
  }

  handleClose() {
    this.shelf.close();
    ModalStore.triggerModal(false, PUBLISHED_STORIES_ID);
  }

  render() {
    return (
      <Modal bsSize='large' show={this.state.show} onHide={this.handleClose}>
        <Modal.Header>
          <Modal.Title>Author's Published Stories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Shelf published stories={this.state.stories} ref={(ref)=>{this.shelf = ref}}/>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

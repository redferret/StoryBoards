import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import ModalStore from '../stores/ModalStore.js';
import React from 'react';

var sanitizeHtml = require('sanitize-html');

import { componentId } from './Book.js';
import { Button, Modal } from 'react-bootstrap';
import { MAIN_ID, EDIT_TEXT_ID, UPDATE_PAGE } from '../constants.js';

export default class EditTextModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleClose = this.handleClose.bind(this);
    this.handleSavePageText = this.handleSavePageText.bind(this);

    this._isMounted = false;

    this.state = {
      show: false,
      text: ''
    };
  }

  _onChange() {
    if (this._isMounted) {
      this.setState({
        show: ModalStore.shouldShow(),
        text: ModalStore.getCurrentPageText()
      })
    }
  }

  componentDidMount() {
    this._isMounted = true;
    ModalStore.on(EDIT_TEXT_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    this._isMounted = false;
    ModalStore.removeListener(EDIT_TEXT_ID, this._onChange.bind(this));
  }

  handleClose() {
    ModalStore.triggerModal(false, EDIT_TEXT_ID);
  }

  handleSavePageText() {
    ModalStore.triggerModal(false, EDIT_TEXT_ID);
    AppDispatcher.dispatch({
      action: UPDATE_PAGE,
      page_id: ModalStore.getPageId(),
      text: sanitizeHtml(this.state.text),
      emitOn: [{
        store: BookStore,
        componentIds: [componentId(ModalStore.getBookKey())]
      }]
    });
  }

  render() {
    return (
      <Modal show={this.state.show}>
        <Modal.Header>
          <Modal.Title>Edit Page Text</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Allowed HTML tags:
            <ul>
              <li>
                h3, h4, h5, h6, blockquote, p, a, ul, ol,
                nl, li, b, i, strong, em, strike, code, hr, br, div,
                table, thead, caption, tbody, tr, th, td, pre, iframe
              </li>
            </ul>
          </div>
          <textarea cols={75} rows={20}
            value={this.state.text} ref={(ref) => {this.textAreaRef = ref}}
            onChange={(event) => {
              this.ignoreBlur = false;
              this.setState({
                text: event.target.value
              });
            }}/>
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='success' onClick={this.handleSavePageText}>Apply Text Changes</Button>
          <Button onClick={this.handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

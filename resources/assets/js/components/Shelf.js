import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import Book from './Book.js';
import FlipPage from 'react-flip-page';
import React from 'react';

import {uid} from 'react-uid';

import {
  PanelGroup,
} from 'react-bootstrap';

import {
  SHELF_ID,
} from '../constants.js';

export default class Shelf extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleShelfPanelSelect = this.handleShelfPanelSelect.bind(this);

    this.state = {
      shelfActiveKey: -1
    }
  }

  _onChange() {
    this.flipBooks = {};
  }

  componentDidMount() {
    BookStore.on(SHELF_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    BookStore.removeListener(SHELF_ID, this._onChange.bind(this));
  }

  handleShelfPanelSelect(bookActiveKey) {
    this.setState({ bookActiveKey });
  }

  render() {

    return (
      <PanelGroup
        accordion
        id='factory-panel-group'
        activeKey={this.state.bookActiveKey}
        onSelect={this.handleShelfPanelSelect}
      >
      {this.props.stories.map(book => <Book key={uid(book)} {...book} />)}
      </PanelGroup>
    );
  }
}

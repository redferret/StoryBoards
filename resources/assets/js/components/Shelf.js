import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import Book, { componentId } from './Book.js';
import FlipPage from 'react-flip-page';
import React from 'react';
import ShelfStore from '../stores/ShelfStore.js';

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
      bookActiveKey: -1
    }
  }

  handleShelfPanelSelect(bookActiveKey) {
    this.setState({ bookActiveKey });
    ShelfStore.setCurrentActiveKey(bookActiveKey);
    BookStore.emit(componentId(bookActiveKey));
  }

  render() {
    return (
      <PanelGroup
        accordion
        id='factory-panel-group'
        activeKey={ShelfStore.getCurrentActiveKey()}
        onSelect={this.handleShelfPanelSelect}
      >
      {this.props.stories.map(book => {
        let bookKey = uid(book);
        return <Book key={bookKey} bookKey={bookKey} {...book} />
      })}
      </PanelGroup>
    );
  }
}

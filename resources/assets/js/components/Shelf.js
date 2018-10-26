import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import Book, { componentId } from './Book.js';
import FlipPage from 'react-flip-page';
import React from 'react';
import ShelfStore from '../stores/ShelfStore.js';

import { uid } from 'react-uid';

import {
  PanelGroup,
} from 'react-bootstrap';

import { SHELF_ID } from '../constants.js';

export default class Shelf extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleShelfPanelSelect = this.handleShelfPanelSelect.bind(this);
    this.renderBooks = this.renderBooks.bind(this);
    this.close = this.close.bind(this);

    this.state = {
      renderToggle: true,
      bookActiveKey: -1
    }
  }

  _forceClose() {
    this.setState({
      bookActiveKey: -1,
      renderToggle: !this.state.renderToggle
    });
  }

  componentDidMount() {
    ShelfStore.on(SHELF_ID, this._forceClose.bind(this));
  }

  componentWillUnmount() {
    ShelfStore.removeListener(SHELF_ID, this._forceClose.bind(this));
  }

  close() {
    this._forceClose();
  }

  handleShelfPanelSelect(bookActiveKey) {
    this.setState({
      bookActiveKey,
      renderToggle: !this.state.renderToggle
    });
    BookStore.emit(componentId(bookActiveKey));
  }

  shouldComponentUpdate(nextProps, nextState) {
    return (nextState.renderToggle != this.state.renderToggle) || (this.state.bookActiveKey == -1);
  }

  renderBooks() {
    if (this.props.stories.length == 0) {
      return 'No Stories on Shelf';
    } else {
      return (
        this.props.stories.map(book => {
          let bookKey = uid(book);
          return (
            <Book key={bookKey} bookKey={bookKey} {...book}
              published={this.props.published}
              deletable={this.props.deletable}/>
          );
        })
      );
    }
  }

  render() {
    return (
      <PanelGroup
        accordion
        id='factory-panel-group'
        activeKey={this.state.bookActiveKey}
        onSelect={this.handleShelfPanelSelect}
      >
      {this.renderBooks()}
      </PanelGroup>
    );
  }
}

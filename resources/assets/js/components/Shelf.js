import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import Book, { componentId } from './Book.js';
import FlipPage from 'react-flip-page';
import React from 'react';

import {uid} from 'react-uid';

import {
  PanelGroup,
} from 'react-bootstrap';

export default class Shelf extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.handleShelfPanelSelect = this.handleShelfPanelSelect.bind(this);

    this.state = {
      renderToggle: true,
      bookActiveKey: -1
    }
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

  render() {
    return (
      <PanelGroup
        accordion
        id='factory-panel-group'
        activeKey={this.state.bookActiveKey}
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

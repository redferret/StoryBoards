import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import EditTextModal from './EditTextModal.js';
import React from 'react';
import Shelf from './Shelf.js';

import { Button, Label } from 'react-bootstrap';

import {
  MAIN_ID,
  GET_STORIES,
} from '../constants.js';

export default class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      stories: []
    }
  }

  _onChange() {
    this.setState({
      stories: BookStore.getStories()
    });
  }

  componentDidMount() {
    BookStore.on(MAIN_ID, this._onChange.bind(this));
    AppDispatcher.dispatch({
      action: GET_STORIES,
      emitOn: [{
        store: BookStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  componentWillUnmount() {
    BookStore.removeListener(MAIN_ID, this._onChange.bind(this));
  }

  render() {
    return (
      <div className='shelf'>
        <EditTextModal />
        <div className='shelf-div'>
          <Shelf stories={this.state.stories} />
        </div>
        <div className='add-story-button'>
          <Button bsStyle='info'>Add a New Story</Button>
        </div>
      </div>
    );
  }
}

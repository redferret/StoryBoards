import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import EditTextModal from './EditTextModal.js';
import React from 'react';
import Shelf from './Shelf.js';

import { Button, Label } from 'react-bootstrap';

import {
  CREATE_STORY,
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

  loadStories() {
    AppDispatcher.dispatch({
      action: GET_STORIES,
      emitOn: [{
        store: BookStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  componentDidMount() {
    BookStore.on(MAIN_ID, this._onChange.bind(this));
    this.loadStories();
  }

  componentWillUnmount() {
    BookStore.removeListener(MAIN_ID, this._onChange.bind(this));
  }

  addNewStory() {
    let title = prompt('Enter the title of your new Story', 'New Story');
    AppDispatcher.dispatch({
      action: CREATE_STORY,
      title,
      emitOn: [{
        store: BookStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  render() {
    return (
      <div className='shelf'>
        <EditTextModal />
        <div className='shelf-div'>
          <Shelf stories={this.state.stories} />
        </div>
        <div className='add-story-button'>
          <Button bsStyle='info' onClick={this.addNewStory}>Add a New Story</Button>
        </div>
      </div>
    );
  }
}

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
    if (title != null) {
      if (/(.|\s)*\S(.|\s)*/.test(name)) {
        AppDispatcher.dispatch({
          action: CREATE_STORY,
          title,
          emitOn: [{
            store: BookStore,
            componentIds: [MAIN_ID]
          }]
        });
      } else {
        alert('The title you have entered is invalid. A title must not be empty and contain at least one character.');
      }
    }
  }

  render() {
    return (
      <div>
        <div className='shelf-container'>
          <div className='shelf'>
            <EditTextModal />
            <div className='shelf-div'>
              <Shelf stories={this.state.stories} />
            </div>
            <div className='add-story-button'>
              <Button bsStyle='info' onClick={this.addNewStory}>Add a New Story</Button>
            </div>
          </div>
        </div>
        <div className='shelf-container'>
          <div className='shelf'>
            <div className='watching-list'>
              List of Authors I'm watching
            </div>
            <div className='watched-by-list'>
              List of Authors watching me
            </div>
          </div>
        </div>
      </div>
    );
  }
}

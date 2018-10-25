import AppDispatcher from '../dispatcher.js';
import AuthorStore from '../stores/AuthorStore.js';
import BookStore from '../stores/BookStore.js';
import EditTextModal from './EditTextModal.js';
import React from 'react';
import Shelf from './Shelf.js';

import { Button, Label, Panel, } from 'react-bootstrap';

import {
  CREATE_STORY,
  LOAD_DATA,
  MAIN_ID,
} from '../constants.js';

class AuthorsList extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.renderAuthorList = this.renderAuthorList.bind(this);
  }

  renderAuthorList() {
    if (this.props.authors.length == 0) {
      return (
        <div>No Authors</div>
      );
    } else {
      return (
        <ul>
          {this.props.authors.map(author =>
            <li>
              {author.name}
            </li>
          )}
        </ul>
      )
    }
  }

  render() {
    return (
      <Panel bsStyle='primary'>
        <Panel.Heading>
          <Panel.Title toggle>
            {this.props.listTitle}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Collapse>
          <Panel.Body>
            {this.renderAuthorList()}
          </Panel.Body>
        </Panel.Collapse>
      </Panel>
    );
  }
}

export default class App extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {
      stories: [],
      publishedStories: []
    }
  }

  _onChange() {
    this.setState({
      stories: BookStore.getStories(),
      publishedStories: BookStore.getPublishedStories()
    });
  }

  loadData() {
    AppDispatcher.dispatch({
      action: LOAD_DATA,
      emitOn: [{
        store: BookStore,
        componentIds: [MAIN_ID]
      }]
    });
  }

  componentDidMount() {
    BookStore.on(MAIN_ID, this._onChange.bind(this));
    this.loadData();
  }

  componentWillUnmount() {
    BookStore.removeListener(MAIN_ID, this._onChange.bind(this));
  }

  addNewStory() {
    let title = prompt('Enter the title of your new Story', 'New Story');
    if (title != null) {
      if (/(.|\s)*\S(.|\s)*/.test(title)) {
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

  addToWatchList() {
    let name = prompt('Enter the pen name of the author you wish to watch', '');
    if (name != null) {
      if (/(.|\s)*\S(.|\s)*/.test(name)) {
        AppDispatcher.dispatch({
          action: ADD_TO_WATCH_LIST,
          name,
          emitOn: [{
            store: BookStore,
            componentIds: [MAIN_ID]
          }]
        });
      } else {
        alert('The name you have entered is invalid. A name must not be empty and contain at least one character.');
      }
    }
  }

  render() {
    let watching = AuthorStore.getWatching();
    let watchers = AuthorStore.getWatchers();
    return (
      <div>
        <div className='shelf-container'>
          <div className='shelf'>
            <EditTextModal />
            <div className='shelf-div'>
              <Shelf stories={this.state.stories} />
            </div>
            <div className='add-story-button'>
              <Button bsStyle='success' onClick={this.addNewStory}>Add a New Story</Button>
            </div>
          </div>
        </div>
        <div className='shelf-container'>
          <div className='shelf'>
            <EditTextModal />
            <div className='shelf-div'>
              <div className='shelf-title'>Published Stories</div>
              <Shelf published stories={this.state.publishedStories} />
            </div>
          </div>
        </div>
        <div className='shelf-container'>
          <div className='shelf'>
            <div className='authors-list'>
              <div className='shelf-title'># of Authors I'm watching: {watching.length}</div>
              <AuthorsList listTitle='My Watch List' authors={watching} />
              <Button bsStyle='success' onClick={this.addToWatchList}>Add to Watch List</Button>
            </div>
            <div className='authors-list'>
              <div className='shelf-title'># of Authors watching me: {watchers.length}</div>
              <AuthorsList listTitle='Authors Watching Me' authors={watchers} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

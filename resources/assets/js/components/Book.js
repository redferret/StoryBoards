import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import FlipPage from 'react-flip-page';
import Page from './Page.js';
import PageStore from '../stores/PageStore.js';
import React from 'react';
import Router from '../router.js';
import ShelfStore from '../stores/ShelfStore.js';

import { uid } from 'react-uid';

import {
  BOOK_ID,
  CREATE_PAGE,
  DELETE_PUBLISHED_STORY,
  DELETE_STORY,
  GET_STORY,
  IMAGE_ASSET,
  MAIN_ID,
  PUBLISH_STORY,
  SHELF_ID,
  UPDATE_STORY,
  UPLOAD_IMAGE,
} from '../constants.js';

import {
  Button,
  Panel,
} from 'react-bootstrap';

export function componentId(key) {
  return `LOAD_${BOOK_ID}_${key}`;
}

export default class Book extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
    this.publishStory = this.publishStory.bind(this);
    this.getTitle = this.getTitle.bind(this);
    this.deleteStory = this.deleteStory.bind(this);
    this.renderPages = this.renderPages.bind(this);
    this.editTitle = this.editTitle.bind(this);
    this.renderButtons = this.renderButtons.bind(this);

    this.state = {
      pages: []
    }
  }

  _loadBook() {
    AppDispatcher.dispatch({
      action: GET_STORY,
      story_id: this.props.id,
      emitOn: [{
        store: BookStore,
        componentIds: [componentId(this.props.id)]
      }]
    });
  }

  _bookLoaded() {
    let story = BookStore.getStory();
    if (story) {
      let pages = story.pages;
      this.setState({ pages });
    }
  }

  componentDidUpdate() {
    let pageIndex = PageStore.getPageIndexOfStory(this.props.id);
    if (pageIndex && pageIndex != 0) {
      try {
        this.bookRef.gotoPage(pageIndex);
      } catch (error) {
        console.error(`expected pageIndex = ${pageIndex}`, error);
      }
    } else {
      this.bookRef.gotoPreviousPage();
    }
  }

  componentDidMount() {
    BookStore.on(componentId(this.props.bookKey), this._loadBook.bind(this));
    BookStore.on(componentId(this.props.id), this._bookLoaded.bind(this));
  }

  componentWillUnmount() {
    BookStore.removeListener(componentId(this.props.bookKey), this._loadBook.bind(this));
    BookStore.removeListener(componentId(this.props.id), this._bookLoaded.bind(this));
  }

  updateCurrentPage(pageIndex) {
    PageStore.setCurrentlyViewedPage(this.props.id, pageIndex);
  }

  editTitle() {
    let title = prompt('Enter the new title');
    if (title != null) {
      if (/(.|\s)*\S(.|\s)*/.test(title)) {
        let story_id = this.props.id;
        AppDispatcher.dispatch({
          action: UPDATE_STORY,
          title,
          story_id,
          emitOn: [{
            store: BookStore,
            componentIds: [MAIN_ID]
          }, {
            store: ShelfStore,
            componentIds: [SHELF_ID]
          }]
        });
      } else {
        alert('The title you have entered is invalid. A title must not be empty and contain at least one character.');
      }
    }
  }

  publishStory() {
    if (confirm('Are you sure you want to publish this story?')) {
      AppDispatcher.dispatch({
        action: PUBLISH_STORY,
        story_id: this.props.id,
        emitOn: [{
          store: BookStore,
          componentIds: [MAIN_ID]
        }, {
          store: ShelfStore,
          componentIds: [SHELF_ID]
        }]
      });
    }
  }

  deleteStory() {
    if (confirm(`Are you sure you want to delete ${this.getTitle()}?`)) {
      let action = this.props.published? DELETE_PUBLISHED_STORY : DELETE_STORY;
      let story_id = this.props.id;
      AppDispatcher.dispatch({
        action,
        story_id,
        emitOn: [{
          store: BookStore,
          componentIds: [MAIN_ID]
        }, {
          store: ShelfStore,
          componentIds: [SHELF_ID]
        }]
      });
    }
  }

  getTitle() {
    if (this.props.published) {
      let edition = 'First Edition';
      if (this.props.edition > 1) {
        edition = `Edition ${this.props.edition}`
      }
      return `${this.props.title}, ${edition}`;
    } else {
      let draft = 'First Draft';
      if (this.props.edition > 0) {
        draft = `Draft ${this.props.edition}`
      }
      return `${this.props.title}, ${draft}`;
    }
  }

  renderPages() {
    return this.state.pages.map((page, index) =>
      <Page
        {...page}
        key={uid(page)}
        index={index}
        bookKey={this.props.bookKey}
        published={this.props.published}/>
    );
  }

  renderButtons() {
    if (!this.props.published) {
      return (
        <div>
          <Button bsStyle='info' onClick={this.editTitle}>
            Edit Title
          </Button> {' '}
          <Button bsStyle='success' onClick={this.publishStory}>
            Publish Story
          </Button> {' '}
          {this.props.deletable?
            <Button bsStyle='danger' onClick={this.deleteStory}>
              Delete {this.props.published? 'Published ' : '' }Story
            </Button> : null
          }
        </div>
      );
    } else {
      if (this.props.deletable) {
        return (
          <Button bsStyle='danger' onClick={this.deleteStory}>
            Delete {this.props.published? 'Published ' : '' }Story
          </Button>
        );
      } else {
        return null;
      }
    }
  }

  render() {
    return (
      <Panel bsStyle='primary' eventKey={this.props.bookKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            {this.getTitle()}
          </Panel.Title>
        </Panel.Heading>
        <Panel.Body collapsible>
          <div className='row'>
            <div className='page-nav col-sm-1'>
              <a onClick={()=>{this.bookRef.gotoPreviousPage()}}>
                Previous Page
              </a>
            </div>
            <div className='page col-sm-10'>
              <FlipPage
                className='flip-page'
                onPageChange={this.updateCurrentPage}
                ref={(ref) => {this.bookRef = ref}}
                orientation='horizontal'
                width={680} height={800}
                animationDuration={300}>
                {this.renderPages()}
              </FlipPage>
            </div>
            <div className='page-nav col-sm-1'>
              <a onClick={()=>{this.bookRef.gotoNextPage()}}>
                Next Page
              </a>
            </div>
          </div>
          <br/>
          {this.renderButtons()}
        </Panel.Body>
      </Panel>
    );
  }
}

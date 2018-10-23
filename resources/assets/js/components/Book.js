import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import FlipPage from 'react-flip-page';
import Page from './Page.js';
import PageStore from '../stores/PageStore.js';
import React from 'react';
import Router from '../router.js';
import ShelfStore from '../stores/ShelfStore.js';

import {uid} from 'react-uid';

import {
  BOOK_ID,
  CREATE_PAGE,
  GET_STORY,
  IMAGE_ASSET,
  MAIN_ID,
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

  render() {
    return (
      <Panel bsStyle='primary' eventKey={this.props.bookKey}>
        <Panel.Heading>
          <Panel.Title toggle>
            {this.props.title}
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
                width={740} height={800}
                animationDuration={300}>
                {this.state.pages.map((page, index) =>
                  <Page key={uid(page)} bookRef={this.bookRef} {...page} index={index} bookKey={this.props.bookKey}/>
                )}
              </FlipPage>
            </div>
            <div className='page-nav col-sm-1'>
              <a onClick={()=>{this.bookRef.gotoNextPage()}}>
                Next Page
              </a>
            </div>
          </div>
          <br/>
          <Button bsStyle='success'>Publish Story</Button>{' '}
          <Button bsStyle='danger'>Delete Story</Button>
        </Panel.Body>
      </Panel>
    );
  }
}

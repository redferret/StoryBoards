import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import FlipPage from 'react-flip-page';
import Page from './Page.js';
import PageStore from '../stores/PageStore.js';
import React from 'react';
import Router from '../router.js';

import {uid} from 'react-uid';

import {
  BOOK_ID,
  IMAGE_ASSET,
  UPLOAD_IMAGE,
} from '../constants.js';

import {
  Button,
  ButtonGroup,
  Panel,
} from 'react-bootstrap';

export default class Book extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.updateCurrentPage = this.updateCurrentPage.bind(this);
  }

  componentDidMount() {
    let pageIndex = PageStore.getPageIndexOfStory(this.props.id);

    if (pageIndex && pageIndex != 0) {
      this.bookRef.gotoPage(pageIndex);
    }
  }

  updateCurrentPage(pageIndex) {
    PageStore.setCurrentlyViewedStoryAndPage(this.props.id, pageIndex);
  }

  render() {
    return (
      <Panel eventKey={this.props.id}>
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
                onPageChange={this.updateCurrentPage}
                ref={(ref) => {this.bookRef = ref}}
                orientation='horizontal'
                width={740} height={800}
                animationDuration={300}
                showSwipeHint={true}>
                {this.props.pages.map((page, index) =>
                  <Page key={uid(page)} bookRef={this.bookRef} {...page} index={index} />
                )}
              </FlipPage>
            </div>
            <div className='page-nav col-sm-1'>
              <a onClick={()=>{this.bookRef.gotoNextPage()}}>
                Next Page
              </a>
            </div>
          </div>
        </Panel.Body>
      </Panel>
    );
  }
}

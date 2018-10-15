import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import FlipPage from 'react-flip-page';
import Page from './Page.js';
import Router from '../router.js';
import React from 'react';

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
                ref={(ref) => {this.bookRef = ref}}
                orientation='horizontal'
                width={740} height={800}
                animationDuration={400}
                showSwipeHint={true}>
                {this.props.pages.map((page, index) =>
                  <Page key={uid(page)} {...page} index={index} />
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
    )
  }
}

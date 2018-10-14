import AppDispatcher from '../dispatcher.js';
import BookStore from '../stores/BookStore.js';
import FlipPage from 'react-flip-page';
import React from 'react';

import {uid} from 'react-uid';

import {
  SHELF_ID,
} from '../constants.js';

export default class Shelf extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.flipBooks = {};
  }

  _onChange() {
    this.flipBooks = {};
  }

  componentDidMount() {
    BookStore.on(SHELF_ID, this._onChange.bind(this));
  }

  componentWillUnmount() {
    BookStore.removeListener(SHELF_ID, this._onChange.bind(this));
  }

  render() {
    return (
      <div>
        {this.props.stories.map(story =>
          <div className='centered'>
            <div className='story-title'>
              {story.title}
            </div>
            <FlipPage className='page' key={uid(story)}
              ref={(ref) => {this.flipBooks[story.title] = ref}}
              orientation='horizontal'
              width={740}
              height={800}
              flipOnTouch={true}>
              {story.pages.map(page =>
                <div key={uid(page)}>
                  <div>
                    <img width='100%' src='https://vignette.wikia.nocookie.net/subnautica/images/9/92/GL_Size_Comparison_Reaper.png/revision/latest/scale-to-width-down/640?cb=20170717170230'/>
                  </div>
                  <p>
                    {page.text}
                  </p>
                </div>
              )}
            </FlipPage>
          </div>
        )}
      </div>
    );
  }
}

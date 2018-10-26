import Actions from '../AppActions.js';
import Axios from 'axios';
import BookStore from '../../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../../router.js';

import {
  GET_AUTHORS_STORIES,
  GET_PUBLISHED_STORIES,
  GET_STORIES,
} from '../../constants.js';

Actions.register(GET_STORIES, payload => {
  Axios(Router.request('GET', GET_STORIES))
  .then(checkStatus)
  .then(response => {
    BookStore.setStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

Actions.register(GET_PUBLISHED_STORIES, payload => {
  let author_id = payload.author_id;
  Axios(Router.request('GET', GET_PUBLISHED_STORIES, {
    args: { author_id }
  }))
  .then(checkStatus)
  .then(response => {
    BookStore.setAuthorsPublishedStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

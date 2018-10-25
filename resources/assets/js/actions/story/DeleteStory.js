import Actions from '../AppActions.js';
import Axios from 'axios';
import BookStore from '../../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../../router.js';

import {
  DELETE_PUBLISHED_STORY,
  DELETE_STORY,
  GET_PUBLISHED_STORIES,
} from '../../constants.js';

Actions.register(DELETE_PUBLISHED_STORY, payload => {
  let story_id = payload.story_id;
  Axios(Router.request('DELETE', DELETE_PUBLISHED_STORY, {
    args: { story_id }
  }))
  .then(checkStatus)
  .then(response => {
    BookStore.setPublishedStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

Actions.register(DELETE_STORY, payload => {
  let story_id = payload.story_id;
  Axios(Router.request('DELETE', DELETE_STORY, {
    args: { story_id }
  }))
  .then(checkStatus)
  .then(response => {
    BookStore.setStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

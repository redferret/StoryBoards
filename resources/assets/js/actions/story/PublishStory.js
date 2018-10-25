import Actions from '../AppActions.js';
import Axios from 'axios';
import BookStore from '../../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../../router.js';

import {
  GET_STORIES,
  PUBLISH_STORY,
} from '../../constants.js';

Actions.register(PUBLISH_STORY, payload => {
  let story_id = payload.story_id;
  Axios(Router.request('POST', PUBLISH_STORY, {
    args: { story_id }
  }))
  .then(checkStatus)
  .then(response => {
    BookStore.setPublishedStories(response.data);
    return Axios(Router.request('GET', GET_STORIES));
  }).then(checkStatus)
  .then(response => {
    BookStore.setStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

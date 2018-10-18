import Actions from './AppActions.js';
import Axios from 'axios';
import BookStore from '../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../router.js';

import {
  GET_STORY,
} from '../constants.js';

Actions.register(GET_STORY, payload => {
  let story_id = payload.story_id;
  Axios(Router.request('GET', GET_STORY, {
    args: { story_id }
  }))
  .then(checkStatus)
  .then(response => {
    BookStore.setStory(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

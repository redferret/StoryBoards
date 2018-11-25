import Actions from '../AppActions.js';
import Axios from 'axios';
import BookStore from '../../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../../router.js';

import {
  GET_STORIES,
  UPDATE_STORY
} from '../../constants.js';

Actions.register(UPDATE_STORY, payload => {
  let story_id = payload.story_id;
  let title = payload.title;
  Axios(Router.request('PUT', UPDATE_STORY, {
    args: { story_id },
    data: { title }
  }))
  .then(checkStatus)
  .then(response => Axios(Router.request('GET', GET_STORIES)))
  .then(checkStatus)
  .then(response => {
    BookStore.setStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

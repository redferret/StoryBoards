import Actions from './AppActions.js';
import Axios from 'axios';
import BookStore from '../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../router.js';

import { DELETE_PAGE, GET_STORIES, REMOVE_IMAGE } from '../constants.js';

Actions.register(DELETE_PAGE, payload => {
  let story_id = payload.story_id;
  let page_id = payload.page_id;
  let photo_name = payload.photo_name;
  Axios(Router.request('DELETE', REMOVE_IMAGE, {
    data: { photo_name },
    args: { page_id }
  }))
  .then(response => Axios(Router.request('DELETE', DELETE_PAGE, {
    data: { story_id },
    args: { page_id }
  })))
  .then(checkStatus)
  .then(response => Axios(Router.request('GET', GET_STORIES)))
  .then(checkStatus)
  .then(response => {
    BookStore.setStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

import Actions from '../AppActions.js';
import Axios from 'axios';
import BookStore from '../../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../../router.js';

import { CREATE_PAGE, GET_STORIES } from '../../constants.js';

Actions.register(CREATE_PAGE, payload => {
  let story_id = payload.story_id;
  let page_number = payload.page_number;
  let text = '<p>New Page</p>';
  Axios(Router.request('POST', CREATE_PAGE, {
    data: { story_id, page_number, text }
  }))
  .then(checkStatus)
  .then(response => Axios(Router.request('GET', GET_STORIES)))
  .then(checkStatus)
  .then(response => {
    BookStore.setStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

import Actions from '../AppActions.js';
import Axios from 'axios';
import BookStore from '../../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../../router.js';

import { REMOVE_IMAGE, GET_STORIES } from '../../constants.js';

Actions.register(REMOVE_IMAGE, payload => {
  let page_id = payload.page_id;
  let photo_name = payload.photo_name;

  Axios(Router.request('DELETE', REMOVE_IMAGE, {
    data: { photo_name },
    args: { page_id }
  }))
  .then(checkStatus)
  .then(response => Axios(Router.request('GET', GET_STORIES)))
  .then(checkStatus)
  .then(response => {
    BookStore.setStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

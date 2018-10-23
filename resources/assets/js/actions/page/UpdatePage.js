import Actions from '../AppActions.js';
import Axios from 'axios';
import BookStore from '../../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../../router.js';

import { UPDATE_PAGE, GET_STORIES } from '../../constants.js';

Actions.register(UPDATE_PAGE, payload => {
  let page_id = payload.page_id;
  let text = payload.text;
  Axios(Router.request('PUT', UPDATE_PAGE, {
    data: { text },
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

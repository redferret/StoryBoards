import Actions from './AppActions.js';
import AuthorStore from '../stores/AuthorStore.js';
import Axios from 'axios';
import BookStore from '../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../router.js';

import {
  GET_CUR_AUTHOR,
  GET_STORIES,
  GET_WATCHERS,
  GET_WATCHING,
  LOAD_DATA,
} from '../constants.js';

Actions.register(LOAD_DATA, payload => {
  Axios(Router.request('GET', GET_STORIES))
  .then(checkStatus)
  .then(response => {
    BookStore.setStories(response.data);
    return Axios(Router.request('GET', GET_CUR_AUTHOR));
  })
  .then(checkStatus)
  .then(response => {
    AuthorStore.setAuthorId(response.data.id);
    let user_id = response.data.id;
    return Axios(Router.request('GET', GET_WATCHERS, {
      args: { user_id }
    }));
  })
  .then(checkStatus)
  .then(response => {
    let user_id = AuthorStore.getAuthorId();
    AuthorStore.setWatchers(response.data);
    return Axios(Router.request('GET', GET_WATCHING, {
      args: { user_id }
    }));
  })
  .then(checkStatus)
  .then(response => {
    AuthorStore.setWatching(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});
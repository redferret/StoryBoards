import Actions from './AppActions.js';
import AuthorStore from '../stores/AuthorStore.js';
import Axios from 'axios';
import BookStore from '../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../router.js';

import {
  GET_CUR_AUTHOR,
  GET_PUBLISHED_STORIES,
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
    let author_id = response.data.id;
    return Axios(Router.request('GET', GET_WATCHERS, {
      args: { author_id }
    }));
  })
  .then(checkStatus)
  .then(response => {
    AuthorStore.setWatchers(response.data);
    let author_id = AuthorStore.getAuthorId();
    return Axios(Router.request('GET', GET_WATCHING, {
      args: { author_id }
    }));
  })
  .then(checkStatus)
  .then(response => {
    AuthorStore.setWatching(response.data);
    let author_id = AuthorStore.getAuthorId();
    return Axios(Router.request('GET', GET_PUBLISHED_STORIES, {
      args: { author_id }
    }));
  })
  .then(checkStatus)
  .then(response => {
    BookStore.setPublishedStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

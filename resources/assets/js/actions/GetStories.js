import Actions from './AppActions.js';
import Axios from 'axios';
import BookStore from '../stores/BookStore.js';
import Router, { checkStatus, handleError } from '../router.js';

import {
  GET_STORIES,
} from '../constants.js';

Actions.register(GET_STORIES, payload => {
  Axios(Router.request('GET', GET_STORIES))
  .then(checkStatus)
  .then(response => {
    BookStore.setStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

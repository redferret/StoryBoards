import Actions from '../AppActions.js';
import AuthorStore from '../../stores/AuthorStore.js';
import Axios from 'axios';
import Router, { checkStatus, handleError } from '../../router.js';

import {
  WATCH_AUTHOR,
} from '../../constants.js';

Actions.register(WATCH_AUTHOR, payload => {
  let name = payload.name;
  Axios(Router.request('POST', WATCH_AUTHOR, {
    args: { name }
  }))
  .then(checkStatus)
  .then(response => {
    AuthorStore.setWatching(response.data);
    Actions.finish(payload);
  }).catch(error => {
    if (error.response.status == 404 || error.response.status == 400) {
      alert(error.response.data.errors.message);
    }
  });
});

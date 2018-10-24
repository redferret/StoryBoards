import Actions from '../AppActions.js';
import Axios from 'axios';
import Router, { checkStatus, handleError } from '../../router.js';

import {
  PUBLISH_STORY,
} from '../../constants.js';

Actions.register(PUBLISH_STORY, payload => {
  let story_id = payload.story_id;
  Axios(Router.request('POST', PUBLISH_STORY, {
    args: { story_id }
  }))
  .then(checkStatus)
  .then(response => {
    Actions.finish(payload);
  }).catch(handleError);
});
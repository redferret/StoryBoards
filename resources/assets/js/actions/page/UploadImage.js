import Actions from '../AppActions.js';
import Axios from 'axios';
import BookStore from '../../stores/BookStore.js';
import FormData from 'form-data';
import Router, { checkStatus, handleError, getCSRF } from '../../router.js';

import { UPLOAD_IMAGE, GET_STORIES } from '../../constants.js';

Actions.register(UPLOAD_IMAGE, payload => {
  let formData = new FormData();
  let page_id = payload.page_id;

  formData.append('page_photo', payload.page_photo);

  Axios(Router.request('POST', UPLOAD_IMAGE, {
    data: formData,
    args: { page_id }
  }, {
    'Accept': 'application/json',
    'Content-Type': `multipart/form-data`,
    'X-CSRF-TOKEN': getCSRF()
  }))
  .then(checkStatus)
  .then(response => Axios(Router.request('GET', GET_STORIES)))
  .then(checkStatus)
  .then(response => {
    BookStore.setStories(response.data);
    Actions.finish(payload);
  }).catch(handleError);
});

import Actions from './AppActions.js';
import Axios from 'axios';
import BookStore from '../stores/BookStore.js';
import FormData from 'form-data';
import Router, { checkStatus, handleError, getCSRF } from '../router.js';

import { UPLOAD_IMAGE } from '../constants.js';

Actions.register(UPLOAD_IMAGE, payload => {

  let formData = new FormData();
  formData.append('page_photo', payload.page_photo);
  formData.set('page_id', payload.page_id);

  Axios(Router.request('POST', UPLOAD_IMAGE, {
    data: formData
  }, {
    'Accept': 'application/json',
    'Content-Type': `multipart/form-data`,
    'X-CSRF-TOKEN': getCSRF()
  }))
  .then(checkStatus)
  .then(response => {
    BookStore.setNewImageName(response.data.photo_name);
    Actions.finish(payload);
  }).catch(handleError);
});

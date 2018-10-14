import * as Constants from './constants.js';
import Router from './router.js';

/**
 * Register the rest of your routes below. The following can be deleted or
 * used for future reference.
 */

Router.registerRoute(Constants.LOG_IN, args => {
  return `/login`;
});
Router.registerRoute(Constants.LOG_OUT, args => {
  return `/logout`;
});
Router.registerRoute(Constants.REGISTER, args => {
  return `/register`;
});
Router.registerRoute(Constants.SHOW_PASSWORD_RESET, args => {
  return `/password/reset`;
});
Router.registerRoute(Constants.SEND_PASSWORD_RESET, args => {
  return `/password/email`;
});
Router.registerRoute(Constants.RESET_PASSWORD_REQUEST, args => {
  return `/password/reset`;
});

/**
 * All Application Routes
 */
Router.registerRoute(Constants.DELETE_STORY, args => {
  return `/stories/${args.id}/delete`;
});
Router.registerRoute(Constants.GET_STORIES, () => {
  return '/stories';
});
Router.registerRoute(Constants.CREATE_STORY, () => {
  return '/stories/create';
});
Router.registerRoute(Constants.UPDATE_STORY, args => {
  return `/stories/${args.id}/update`;
});

Router.registerRoute(Constants.DELETE_PAGE, args => {
  return `/pages/${args.id}/delete`;
});
Router.registerRoute(Constants.GET_PAGES, () => {
  return '/pages';
});
Router.registerRoute(Constants.CREATE_PAGE, () => {
  return '/pages/create';
});
Router.registerRoute(Constants.UPDATE_PAGE, args => {
  return `/pages/${args.id}/update`;
});

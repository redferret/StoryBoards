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
 * Image Asset routes
 */

Router.registerRoute(Constants.REMOVE_IMAGE, args => {
  return `/pages/${args.page_id}/image/remove`;
});
Router.registerRoute(Constants.IMAGE_ASSET, args => {
  return `/image/${args.photo_name}`;
});
Router.registerRoute(Constants.UPLOAD_IMAGE, args => {
  return `/pages/${args.page_id}/image/store`;
});
Router.registerRoute(Constants.CHANGE_IMAGE, args => {
  return `/pages/${args.page_id}/image/change`;
});

/**
 * All Application Routes
 */

 /**
  * Story Routes
  */
Router.registerRoute(Constants.DELETE_STORY, args => {
  return `/stories/${args.story_id}/delete`;
});
Router.registerRoute(Constants.DELETE_PUBLISHED_STORY, args => {
  return `/stories/published/${args.story_id}/delete`;
});
Router.registerRoute(Constants.GET_STORIES, () => {
  return `/stories`;
});
Router.registerRoute(Constants.GET_STORY, args => {
  return `/stories/${args.story_id}`;
});
Router.registerRoute(Constants.CREATE_STORY, () => {
  return '/stories/create';
});
Router.registerRoute(Constants.UPDATE_STORY, args => {
  return `/stories/${args.story_id}/update`;
});
Router.registerRoute(Constants.PUBLISH_STORY, args => {
  return `/stories/${args.story_id}/publish`;
});

// Page Routes
Router.registerRoute(Constants.DELETE_PAGE, args => {
  return `/pages/${args.page_id}/delete`;
});
Router.registerRoute(Constants.GET_PAGES, () => {
  return '/pages';
});
Router.registerRoute(Constants.CREATE_PAGE, () => {
  return '/pages/create';
});
Router.registerRoute(Constants.UPDATE_PAGE, args => {
  return `/pages/${args.page_id}/update`;
});


// Author Routes
Router.registerRoute(Constants.GET_STORIES_FROM, args => {
  return `/author/${args.author_id}/stories`;
});
Router.registerRoute(Constants.GET_PUBLISHED_STORIES, args => {
  return `/author/${args.author_id}/stories/published`;
});
Router.registerRoute(Constants.GET_WATCHERS, args => {
  return `/author/${args.author_id}/watchers`;
});
Router.registerRoute(Constants.GET_WATCHING, args => {
  return `/author/${args.author_id}/watching`;
});
Router.registerRoute(Constants.GET_CUR_AUTHOR, () => {
  return '/author';
});
Router.registerRoute(Constants.WATCH_AUTHOR, args => {
  return `/author/${args.name}/watch`;
});

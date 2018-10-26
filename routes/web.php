<?php

/*
  |--------------------------------------------------------------------------
  | Web Routes
  |--------------------------------------------------------------------------
  |
  | Here is where you can register web routes for your application. These
  | routes are loaded by the RouteServiceProvider within a group which
  | contains the "web" middleware group. Now create something great!
  |
 */


Auth::routes();

Route::get('/', 'HomeController@index')->name('home');
Route::get('/author', 'HomeController@user');
Route::get('/author/{id}/stories/published', 'StoryController@getPublishedStories');
Route::get('/author/{id}/watchers', 'HomeController@getWatchers');
Route::get('/author/{id}/watching', 'HomeController@getWatching');
Route::get('/home', 'HomeController@index')->name('home');
Route::post('/author/{name}/watch', 'HomeController@addToWatchList');

Route::delete('/pages/{id}/delete', 'PageController@destroy');
Route::get('/pages/{id}', 'PageController@get');
Route::post('/pages/create', 'PageController@store');
Route::put('/pages/{id}/update', 'PageController@update');

Route::delete('/pages/{id}/image/remove', 'ImagesController@remove');
Route::get('/image/{name}', 'ImagesController@get');
Route::post('/pages/{id}/image/change', 'ImagesController@change');
Route::post('/pages/{id}/image/store', 'ImagesController@store');

Route::delete('/stories/{id}/delete', 'StoryController@destroy');
Route::delete('/stories/published/{id}/delete', 'StoryController@destroyPublished');
Route::get('/author/{id}/stories', 'StoryController@getAllFrom');
Route::get('/stories', 'StoryController@getAll');
Route::get('/stories/{id}', 'StoryController@get');
Route::post('/stories/{id}/publish', 'StoryController@publish');
Route::post('/stories/create', 'StoryController@store');
Route::put('/stories/{id}/update', 'StoryController@update');

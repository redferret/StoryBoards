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

Route::get('/home', 'HomeController@index')->name('home');
Route::get('/', 'HomeController@index')->name('home');

Route::delete('/pages/{id}/delete', 'PageController@destroy');
Route::get('/pages/{id}', 'PageController@get');
Route::post('/pages/create', 'PageController@store');
Route::put('/pages/{id}/update', 'PageController@update');

Route::delete('/stories/{id}/delete', 'StoryController@destroy');
Route::get('/stories/{id}', 'StoryController@get');
Route::post('/stories/create', 'StoryController@store');
Route::put('/stories/{id}/update', 'StoryController@update');

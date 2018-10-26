<?php

namespace App\Http\Controllers;

use Auth;
use App\User;
use Illuminate\Http\Request;

class HomeController extends Controller {

  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct() {
    $this->middleware('auth');
  }

  /**
   * Show the application dashboard.
   *
   * @return \Illuminate\Http\Response
   */
  public function index() {
    return view('home');
  }

  public function user() {
    return Auth::user();
  }

  public function addToWatchList($name) {
    $user = Auth::user();
    $test = $user->watchedUsers()->where('name', $name)->first();
    if ($test == null) {
      $watchedAuthor = User::where('name', $name)->first();
      if ($watchedAuthor != null) {
        if ($watchedAuthor->name != $user->name) {
          $user->watchedUsers()->save($watchedAuthor);
          return Auth::user()->watchedUsers;
        } else {
          return response()->json(['errors'=>['message'=>'Can\'t watch yourself.']], 400);
        }
      } else {
        return response()->json(['errors'=>['message'=>'The Author \''.$name.'\' was not found.']], 404);
      }
    } else {
      return response()->json(['errors'=>['message'=>'The author \''.$name.'\' is already being watched.']], 400);
    }
  }

  public function getWatchers($id) {
    $user = Auth::user();
    if ($user->id == $id) {
      return Auth::user()->watchedByUsers;
    } else {
      return response()->json(['errors'=>['message'=>'User Id mismatch, Authenticated user Id does not match.']], 400);
    }
  }

  public function getWatching($id) {
    $user = Auth::user();
    if ($user->id == $id) {
      return Auth::user()->watchedUsers;
    } else {
      return response()->json(['errors'=>['message'=>'User Id mismatch, Authenticated user Id does not match.']], 400);
    }
  }

}

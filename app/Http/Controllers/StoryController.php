<?php

namespace App\Http\Controllers;

use Auth;
use App\Story;
use Intervention\Image\Facades\Image;
use Illuminate\Http\Request;

class StoryController extends Controller {

  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct() {
    $this->middleware('auth');
  }

  /**
   * Show the form for creating a new resource.
   *
   * @return \Illuminate\Http\Response
   */
  public function getAll() {
    $stories = Auth::user()->stories;

    foreach ($stories as $story) {
      $pages = $story->pages;
    }
    return $stories;
  }

  public function get($id) {
    $story = Auth::user()->stories()->find($id);
    if ($story != null) {
      $story->pages;
      return $story;
    }
    return response()->json(['errors'=>['message'=>'Story not found']], 404);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {

  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request) {

  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Page  $page
   * @return \Illuminate\Http\Response
   */
  public function destroy(Page $page) {

  }
}

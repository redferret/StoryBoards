<?php

namespace App\Http\Controllers;

use Auth;
use App\Story;
use App\Page;
use App\User;
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
    return $stories;
  }

  public function getAllFrom($id) {
    return User::find($id)->stories;
  }

  public function get($id) {
    $story = Story::find($id);
    if ($story != null) {
      $story->pages = $story->pages()->orderBy('page_number')->get();
      return $story;
    }
    return response()->json(['errors'=>['message'=>'Story not found']], 404);
  }

  public function publish($id) {
    $user = Auth::user();
    if ($user->publish == null) {
      $publishment = $user->publish()->save(Publish::create());
    } else {
      $publishment = $user->publish;
    }
    $story = Story::find($id);
    $publishment->publishedStories()->save($story->replicate());
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $user = Auth::user();
    if ($request->input('title') == null || $request->input('title') == '') {
      return response()->json(['errors'=>['message'=>'Title is empty or null']], 400);
    }
    $story = Story::create($request->all());
    $story->pages()->save(Page::create([
      'text' => '<p>New Page</p>',
      'page_number' => 1
    ]));
    $user->stories()->save($story);
    return response()->json(['message'=>'Story Created'], 200);
  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $story = Story::find($id);
    $story->fill($request->all());
    $story->save();
    return response()->json(['message'=>'Story Updated'], 200);
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Page  $page
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    Story::find($id)->delete();
    return response()->json(['message'=>'Story Deleted'], 200);
  }
}

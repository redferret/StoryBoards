<?php

namespace App\Http\Controllers;

use App\Page;
use App\Story;
use Illuminate\Http\Request;
use Auth;

class PageController extends Controller {

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
  public function get($id) {
    return Page::find($id);
  }

  /**
   * Store a newly created resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function store(Request $request) {
    $story = Story::find($request->input('story_id'));
    if ($story != null) {
      $newPage = Page::create($request->all());
      $story->pages($newPage);
      return $newPage;
    } else {
      return array('errors' => array('message'=>'Story Not Found'));
    }

  }

  /**
   * Update the specified resource in storage.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return \Illuminate\Http\Response
   */
  public function update(Request $request, $id) {
    $page = Page::find($id);
    if ($page != null) {
      $page->fill($request->all());
      $page->save();
      return $page;
    } else {
      return array('errors' => array('message'=>'Page Not Found'));
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Page  $page
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    Page::find($id)->delete();
    return array('message'=>'success');
  }
}

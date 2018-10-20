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
      $pages = $story->pages;

      foreach ($pages as $page) {
        if ($page->page_number >= $request->input('page_number')) {
          $page->page_number++;
          $page->save();
        }
      }
      $story->pages()->save($newPage);
      return $newPage;
    } else {
      return response()->json(['errors'=>['message'=>'Unable to add a new Page, Story Not Found', 'story_id'=>$request->input('story_id')]], 404);
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
      if ($request->input('text') == '') {
        $page->fill(['text'=>' ']);
      } else {
        $page->fill($request->all());
      }
      $page->save();
      return $page;
    } else {
      return response()->json(['errors'=>['message'=>'Unable to updage Page, Page Not Found', 'page_id'=>$id]], 404);
    }
  }

  /**
   * Remove the specified resource from storage.
   *
   * @param  \App\Page  $page
   * @return \Illuminate\Http\Response
   */
  public function destroy($id) {
    $toRemove = Page::find($id);
    $story = $toRemove->story;
    if ($story != null) {
      $toRemove = $story->pages()->find($id);
      if ($toRemove != null) {
        $pages = $story->pages;
        foreach ($pages as $page) {
          if ($page->page_number >= $toRemove->page_number) {
            $page->page_number--;
            $page->save();
          }
        }
        $toRemove->delete();
        return response()->json(['message'=>'Removed Page'], 200);
      }
    } else {
      return response()->json(['errors'=>['message'=>'Unable to remove Page, Story Not Found']], 404);
    }
  }
}

<?php

namespace App\Http\Controllers;

use Auth;
use App\Page;
use Intervention\Image\Facades\Image;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
class ImagesController extends Controller {

  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct() {
    $this->middleware('auth');
  }

  public function store(Request $request) {
    if($request->hasFile('page_photo') && $request->has('page_id')) {
      //get filename with extension
      $filenamewithextension = $request->file('page_photo')->getClientOriginalName();

      //get filename without extension
      $filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);

      //get file extension
      $extension = $request->file('page_photo')->getClientOriginalExtension();

      //filename to store
      $filenametostore = $filename.'_'.time().'.'.$extension;

      //Upload File
      $request->file('page_photo')->storeAs('public/', $filenametostore);

      $page = Page::find($request->input('page_id'));

      $page->photo_name = $filenametostore;
      $page->save();

      return response()->json(['message'=>'Image stored successfully', 'photo_name'=>$filenametostore], 200);
    } else {
      return response()->json(['errors'=>['message'=>'Unable to store image', 'request'=>$request->all()]], 409);
    }
  }

  public function get($name) {
    if (file_exists(storage_path('app/public/'. $name))) {
      $storagePath = storage_path('app/public/'. $name);
      return Image::make($storagePath)->response();
    } else {
      return ['errors'=>['message'=>'No Image Found', 'name'=>$name]];
    }

  }
}

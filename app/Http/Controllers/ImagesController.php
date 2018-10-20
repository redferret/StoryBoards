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

  public function remove(Request $request, $id) {
    if($request->has('photo_name')) {

      $photoName = $request->input('photo_name');

      if (file_exists(storage_path('app/public/'. $photoName)) && $photoName != '') {
        unlink(storage_path('app/public/'.$photoName));
        $page = Page::find($id);
        if ($page != null) {
          $page->photo_name = null;
          $page->save();
        }
      }

      return response()->json(['message'=>'Request Complete'], 200);
    } else {
      return response()->json(['errors'=>['message'=>'Photo name is needed']], 400);
    }
  }

  public function change(Request $request, $id) {
    if($request->hasFile('page_photo') && $request->has('old_photo_name')) {

      $oldPhotoName = $request->input('old_photo_name');

      if (file_exists(storage_path('app/public/'. $oldPhotoName))) {
        unlink(storage_path('app/public/'.$oldPhotoName));
      }

      $filenametostore = $this->storeNewImage($request, $id);

      return response()->json(['message'=>'Image stored successfully', 'photo_name'=>$filenametostore], 200);
    } else {
      return response()->json(['errors'=>['message'=>'Unable to store image, must have a new photo and the old photo name', 'request'=>$request->all()]], 400);
    }
  }

  public function store(Request $request, $id) {
    if($request->hasFile('page_photo')) {
      $filenametostore = $this->storeNewImage($request, $id);
      return response()->json(['message'=>'Image stored successfully', 'photo_name'=>$filenametostore], 200);
    } else {
      return response()->json(['errors'=>['message'=>'Unable to store image, no image provided', 'request'=>$request->all()]], 400);
    }
  }

  private function storeNewImage(& $request, $id) {
    $filenamewithextension = $request->file('page_photo')->getClientOriginalName();
    $filename = pathinfo($filenamewithextension, PATHINFO_FILENAME);
    $extension = $request->file('page_photo')->getClientOriginalExtension();
    $filenametostore = $filename.'_'.time().'.'.$extension;
    $request->file('page_photo')->storeAs('public/', $filenametostore);

    $page = Page::find($id);
    $page->photo_name = $filenametostore;
    $page->save();

    return $filenametostore;
  }

  public function get($name) {
    if (file_exists(storage_path('app/public/'. $name))) {
      $storagePath = storage_path('app/public/'. $name);
      return Image::make($storagePath)->response();
    } else {
      return response()->json(['errors'=>['message'=>'No Image Found', 'photo_name'=>$name]], 404);
    }

  }
}

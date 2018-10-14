<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Page extends Model {

 protected $fillable = ['text', 'photo_name'];

 public function story() {
   return $this->belongsTo(Story::class);
 }
}

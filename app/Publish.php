<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Publish extends Model {

  public function publishedStories() {
    return $this->hasMany(Story::class);
  }

  public function publishedByUser() {
    return $this->belongsTo(User::class);
  }
}

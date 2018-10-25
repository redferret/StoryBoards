<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Story extends Model {

  protected $fillable = ['title', 'edition'];

  public function published() {
    return $this->belongsTo(Published::class);
  }

  public function user() {
    return $this->belongsTo(User::class);
  }

  public function pages() {
    return $this->hasMany(Page::class);
  }
}

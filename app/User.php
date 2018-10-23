<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable {

  use Notifiable;

  protected $fillable = [
    'name', 'email', 'password',
  ];

  protected $hidden = [
    'password', 'remember_token',
  ];

  public function publishedBooks() {
    return $this->hasOne(Publish::class);
  }

  public function watchedUsers() {
    return $this->belongsToMany(User::class, 'watched_users', 'user_id_a', 'user_id_b');
  }

  public function watchedByUsers() {
    return $this->belongsToMany(User::class, 'watched_users', 'user_id_b', 'user_id_a');
  }

  public function stories() {
    return $this->hasMany(Story::class);
  }

}

<?php

use App\User;
use App\Story;
use App\Page;
use Illuminate\Database\Seeder;

class BasicSeeder extends Seeder {
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run() {
      $user = User::create([
        'name'=>'Test User',
        'email'=>'TestEmail@gmail.com',
        'password'=>bcrypt('secret')
      ]);

      $story1 = Story::create([
        'title' => 'My Story Book'
      ]);

      $user->stories()->save($story1);

      $story1->pages()->save(Page::create([
        'text' => 'This is a page, here you will describe in great detail you\'re story with an image to aid the reader.',
        'page_number' => 1
      ]));

      $story1->pages()->save(Page::create([
        'text' => 'This is a another page, more interesting things will be happening.',
        'page_number' => 2
      ]));

      $story1->pages()->save(Page::create([
        'text' => 'It\'s also possible that a page doesn\'t contain any images',
        'page_number' => 3
      ]));
    }
}

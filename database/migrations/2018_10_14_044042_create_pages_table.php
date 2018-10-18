<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreatePagesTable extends Migration {
  /**
   * Run the migrations.
   *
   * @return void
   */
  public function up() {
    Schema::create('pages', function (Blueprint $table) {
      $table->increments('id');
      $table->text('text');
      $table->string('photo_name')->nullable();
      $table->integer('page_number')->unsigned();
      $table->integer('story_id')->unsigned()->nullable();
      $table->foreign('story_id')->references('id')->on('stories')->onDelete('cascade');
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   *
   * @return void
   */
  public function down() {
    Schema::dropIfExists('pages');
  }
}

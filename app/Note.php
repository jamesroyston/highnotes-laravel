<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\User;

/**
 * @method static findOrFail($noteId)
 */
class Note extends Model
{
    protected $fillable = [
        'title',
        'description',
        'user_id'
    ];

    public function user() {
        return $this->belongsTo('App\User');
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    use HasFactory;

    // Explicitly tell Laravel which table to use (good practice)
    protected $table = 'profiles';

    // Fields that are mass-assignable
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'address',
    ];
}

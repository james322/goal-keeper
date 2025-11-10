<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Motivation extends Model
{
    /** @use HasFactory<\Database\Factories\MotivationFactory> */
    use HasFactory, HasUlids;

    protected $hidden = ['user_prompt', 'assistant_prompt'];
}

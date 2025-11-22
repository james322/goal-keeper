<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUlids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WeeklyPrompt extends Model
{
    /** @use HasFactory<\Database\Factories\WeeklyPromptFactory> */
    use HasFactory, HasUlids;

    public function formattedAssistant(): string
    {
        return str_replace('%personality%', $this->personality, $this->assistant);
    }

    public function formattedUser(): string
    {
        return $this->user;
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;

class StoreGoalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return Auth::check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'intent' => ['required', 'string', 'min:1', 'max:500'],
        ];
    }

    public function messages(): array
    {
        return [
            'intent.required' => 'You cannot have an blank goal.',
            'intent.max' => 'Your goal must not exceed 500 characters.',
        ];
    }
}

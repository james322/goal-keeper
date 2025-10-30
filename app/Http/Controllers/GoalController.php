<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGoalRequest;

class GoalController extends Controller
{
    public function store(StoreGoalRequest $request)
    {
        $request->user()->goals()->create($request->validated());

        return to_route('dashboard');
    }
}

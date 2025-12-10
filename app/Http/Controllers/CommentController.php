<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommentRequest;
use App\Models\Comment;
use App\Models\Goal;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class CommentController extends Controller
{
    public function store(StoreCommentRequest $request, Goal $goal): RedirectResponse
    {
        $goal->comments()->create([
            'user_id' => Auth::check() ? $request->user()->id : null,
            'body' => $request->input('body'),
        ]);

        return back()->with('flash.message', 'Comment posted!');
    }

    public function destroy(Comment $comment): RedirectResponse
    {
        $comment->delete();

        return back()->with('flash.message', 'Comment deleted!');
    }
}

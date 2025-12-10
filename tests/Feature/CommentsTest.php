<?php

use App\Models\Comment;
use App\Models\Goal;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\post;

test('authenticated user can post comment on own private goal', function () {
    $user = User::factory()->create();
    $goal = Goal::factory()->state(['user_id' => $user->id, 'is_public' => false])->create();

    $comment = fake()->sentence();
    actingAs($user)->post(route('comments.store', ['goal' => $goal]), ['body' => $comment]);
    expect($goal->comments()->count())->toBe(1);
    expect($goal->comments()->first()->body)->toBe($comment);
    expect($goal->comments()->first()->user_id)->toBe($user->id);
});

test('authenticated users cannot post comment on others private goal', function () {
    $user = User::factory()->create();
    $user2 = User::factory()->has(Goal::factory()->state(['is_public' => false]))->create();
    $goal = $user2->goals()->first();

    $comment = fake()->sentence();
    actingAs($user)->post(route('comments.store', ['goal' => $goal]), ['body' => $comment])->assertForbidden();
    expect($goal->comments()->count())->toBe(0);
});

test('guest users cannot post comment on others private goal', function () {

    $user2 = User::factory()->has(Goal::factory()->state(['is_public' => false]))->create();
    $goal = $user2->goals()->first();

    $comment = fake()->sentence();
    post(route('comments.store', ['goal' => $goal]), ['body' => $comment])->assertForbidden();
    expect($goal->comments()->count())->toBe(0);
});

test('authenticated user can post comment on own public goal', function () {
    $user = User::factory()->create();
    $goal = Goal::factory()->state(['user_id' => $user->id, 'is_public' => true])->create();

    $comment = fake()->sentence();
    actingAs($user)->post(route('comments.store', ['goal' => $goal]), ['body' => $comment]);
    expect($goal->comments()->count())->toBe(1);
    expect($goal->comments()->first()->body)->toBe($comment);
    expect($goal->comments()->first()->user_id)->toBe($user->id);
});

test('authenticated users can post comment on others public goal', function () {
    $user = User::factory()->create();
    $user2 = User::factory()->has(Goal::factory()->state(['is_public' => true]))->create();
    $goal = $user2->goals()->first();

    $comment = fake()->sentence();
    actingAs($user)->post(route('comments.store', ['goal' => $goal]), ['body' => $comment])->assertRedirectBackWithoutErrors();
    expect($goal->comments()->count())->toBe(1);
    expect($goal->comments()->first()->body)->toBe($comment);
    expect($goal->comments()->first()->user_id)->toBe($user->id);
});

test('guest users can post comment on others public goal', function () {
    $user = User::factory()->has(Goal::factory()->state(['is_public' => true]))->create();
    $goal = $user->goals()->first();

    $comment = fake()->sentence();
    post(route('comments.store', ['goal' => $goal]), ['body' => $comment])->assertRedirectBackWithoutErrors();
    expect($goal->comments()->count())->toBe(1);
    expect($goal->comments()->first()->body)->toBe($comment);
    expect($goal->comments()->first()->user_id)->toBeNull();
});

test('authenticated user can delete their own comment on own goal', function () {
    $user = User::factory()->create();
    $goal = Goal::factory()->state(['user_id' => $user->id, 'is_public' => true])->create();
    $comment = Comment::factory()->state(['user_id' => $user->id, 'goal_id' => $goal->id])->create();

    expect($goal->comments()->count())->toBe(1);
    actingAs($user)->delete(route('comments.destroy', ['goal' => $goal, 'comment' => $comment]))->assertRedirectBackWithoutErrors();
    expect($goal->comments()->count())->toBe(0);
});

test('authenticated user can delete their own comment on others goal', function () {
    $user = User::factory()->create();
    $user2 = User::factory()->has(Goal::factory()->state(['is_public' => true]))->create();
    $goal = $user2->goals()->first();
    $comment = Comment::factory()->state(['user_id' => $user->id, 'goal_id' => $goal->id])->create();

    expect($goal->comments()->count())->toBe(1);
    actingAs($user)->delete(route('comments.destroy', ['goal' => $goal, 'comment' => $comment]))->assertRedirectBackWithoutErrors();
    expect($goal->comments()->count())->toBe(0);
});

test('authenticated user can delete others comment on thier goal', function () {
    $user = User::factory()->create();
    $user2 = User::factory()->has(Goal::factory()->state(['is_public' => true]))->create();
    $goal = $user2->goals()->first();
    $comment = Comment::factory()->state(['user_id' => $user->id, 'goal_id' => $goal->id])->create();

    expect($goal->comments()->count())->toBe(1);
    actingAs($user2)->delete(route('comments.destroy', ['goal' => $goal, 'comment' => $comment]))->assertRedirectBackWithoutErrors();
    expect($goal->comments()->count())->toBe(0);
});

test('authenticated user cannot delete others comments on others goal', function () {
    $user = User::factory()->create();
    $user2 = User::factory()->has(Goal::factory()->state(['is_public' => true]))->create();
    $user3 = User::factory()->create();
    $goal = $user2->goals()->first();
    $comment = Comment::factory()->state(['user_id' => $user->id, 'goal_id' => $goal->id])->create();

    expect($goal->comments()->count())->toBe(1);
    actingAs($user3)->delete(route('comments.destroy', ['goal' => $goal, 'comment' => $comment]))->assertForbidden();
    expect($goal->comments()->count())->toBe(1);
});

test('guest user cannot delete comments', function () {
    $user = User::factory()->create();
    $user2 = User::factory()->has(Goal::factory()->state(['is_public' => true]))->create();
    $user3 = User::factory()->create();
    $goal = $user2->goals()->first();
    $comment = Comment::factory()->state(['user_id' => $user->id, 'goal_id' => $goal->id])->create();
    $comment2 = Comment::factory()->state(['user_id' => $user2->id, 'goal_id' => $goal->id])->create();
    $comment3 = Comment::factory()->state(['user_id' => null, 'goal_id' => $goal->id])->create();

    expect($goal->comments()->count())->toBe(3);
    actingAs($user3)->delete(route('comments.destroy', ['goal' => $goal, 'comment' => $comment]))->assertForbidden();
    actingAs($user3)->delete(route('comments.destroy', ['goal' => $goal, 'comment' => $comment2]))->assertForbidden();
    actingAs($user3)->delete(route('comments.destroy', ['goal' => $goal, 'comment' => $comment3]))->assertForbidden();
    expect($goal->comments()->count())->toBe(3);
});

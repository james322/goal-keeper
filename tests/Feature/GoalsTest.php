<?php

use App\Mail\FirstGoal;
use App\Models\Goal;
use App\Models\Prompt;
use App\Models\User;
use OpenAI\Laravel\Facades\OpenAI;
use OpenAI\Responses\Chat\CreateResponse;

use function fake;
use function Pest\Laravel\actingAs;

it('user can create a goal', function () {
    $user = User::factory()->create();
    $goalIntent = fake()->sentence();

    actingAs($user)->post(route('goals.store'), ['intent' => $goalIntent]);

    expect($user->goals->count())->toBe(1);
    expect($user->goals()->first()->intent)->toBe($goalIntent);
});

it('user cannot create blank goal', function () {
    $user = User::factory()->create();

    actingAs($user)->post(route('goals.store'), ['intent' => ''])->assertInvalid('intent');
});

it('user cannot create a goal over 500 characters', function () {
    $user = User::factory()->create();

    actingAs($user)->post(route('goals.store'), ['intent' => str()->random(501)])->assertInvalid('intent');
});

it('user can mark goal as complete', function () {
    $user = User::factory()->create();
    $goal = Goal::factory()->incomplete()->for($user)->create();

    expect($goal->completed)->toBeFalsy();

    actingAs($user)->patch(route('goals.status.complete', ['goal' => $goal]), ['completed' => true]);

    expect($goal->fresh()->completed)->toBeTruthy();
});

it('user can mark goal as incomplete', function () {
    $user = User::factory()->create();
    $goal = Goal::factory()->completed()->for($user)->create();

    expect($goal->completed)->toBeTruthy();

    actingAs($user)->patch(route('goals.status.incomplete', ['goal' => $goal]), ['completed' => false]);

    expect($goal->fresh()->completed)->toBeFalsy();
});

it('user can delete goal', function () {
    $user = User::factory()->create();
    $goal = Goal::factory()->for($user)->create();

    expect($user->goals()->count())->toBe(1);

    actingAs($user)->delete(route('goals.destroy', ['goal' => $goal]));

    expect($user->fresh()->goals()->count())->toBe(0);
});

it('user cannot update another users goals', function () {
    $user = User::factory()->create();
    $stranger = User::factory()->create();

    $goal = Goal::factory()->for($stranger)->create();

    actingAs($user)->patch(route('goals.status.incomplete', ['goal' => $goal]), ['completed' => false])->assertForbidden();

    actingAs($user)->patch(route('goals.status.complete', ['goal' => $goal]), ['completed' => true])->assertForbidden();
});

it('user cannot delete another users goal', function () {
    $user = User::factory()->create();
    $stranger = User::factory()->create();

    $goal = Goal::factory()->for($stranger)->create();

    actingAs($user)->delete(route('goals.destroy', ['goal' => $goal]))->assertForbidden();
});

it('users cannot see others goals', function () {
    $user = User::factory()->has(Goal::factory()->state(['intent' => 'user 1 goal']))->create();
    User::factory()->has(Goal::factory()->state(['intent' => 'user 2 goal']))->create();

    actingAs($user)->get(route('dashboard'))->assertSee('user 1 goal')->assertDontSee('user 2 goal');
});

it('users first goal gets ai motivation email', function () {
    $user = User::factory()->create();
    $goal = Goal::factory()->for($user)->create();

    Prompt::factory()->create();

    Mail::fake();
    Queue::fake();
    OpenAI::fake([CreateResponse::fake([
        'choices' => [
            [
                'text' => 'awesome!',
            ],
        ],
    ]), ]);

    actingAs($user)->post(route('motivation.generate', ['goal' => $goal]));

    expect($user->goals->count())->toBe(1);

    Mail::assertQueued(FirstGoal::class);
});

it('users second goal does not get ai motivation email', function () {
    $user = User::factory()->create();
    Goal::factory()->for($user)->create();
    $goal = Goal::factory()->for($user)->create();

    Prompt::factory()->create();

    Mail::fake();
    Queue::fake();
    OpenAI::fake([CreateResponse::fake([
        'choices' => [
            [
                'text' => 'awesome!',
            ],
        ],
    ]), ]);

    actingAs($user)->post(route('motivation.generate', ['goal' => $goal]));

    expect($user->goals->count())->toBe(2);

    Mail::assertNotQueued(FirstGoal::class);
});

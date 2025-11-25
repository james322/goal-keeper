<x-mail::message>
Hi {{$user->name}}, you have some goals that haven't been completed. Have you made any progress on the following goals?

@foreach($user->weeklyIncompleteGoals as $goal)
- {{Str::limit($goal->intent, 200)}}

@endforeach

{{$motivation}}

<x-mail::button :url="route('dashboard')">
Your goals
</x-mail::button>

@include('mail.goal.footer')
</x-mail::message>

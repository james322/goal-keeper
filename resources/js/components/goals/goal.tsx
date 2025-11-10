import { useDeleteGoalContext } from '@/hooks/goals/use-delete-goal-context';
import { cn } from '@/lib/utils';
import { generate } from '@/routes/motivation';
import { SharedData, type Goal as GoalType } from '@/types';
import { usePage } from '@inertiajs/react';
import { formatDistanceToNowStrict } from 'date-fns';
import { Sparkles, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { AiMotivation } from './ai-motivation';
import { GoalStatus } from './goal-status';

function GoalDate({ goal }: { goal: GoalType }) {
    let title = '';
    let displayDate = '';

    if (goal.completed !== null) {
        title = new Date(goal.completed ?? new Date()).toDateString();
        displayDate = goal.completed !== null ? `Completed: ${formatDistanceToNowStrict(goal.completed)} ago` : '';
    } else if (goal.created_at !== goal.updated_at) {
        title = new Date(goal.updated_at).toDateString();
        displayDate = `Updated: ${formatDistanceToNowStrict(goal.updated_at)} ago`;
    } else {
        title = new Date(goal.created_at).toDateString();
        displayDate = `Created: ${formatDistanceToNowStrict(goal.created_at)} ago`;
    }
    return (
        <span title={title} className="pr-2">
            {displayDate}
        </span>
    );
}

export function Goal({ goal }: { goal: GoalType }) {
    const { setGoalToDelete, setIsOpen: setDeleteGoalIsOpen } = useDeleteGoalContext();
    const [motivation, setMotivation] = useState<string | null>(goal?.motivation?.motivation ?? null);
    const [busy, setBusy] = useState(false);
    const csrf_token = usePage<SharedData>().props.csrf_token;

    function deleteGoal() {
        setGoalToDelete(goal);
        setDeleteGoalIsOpen(true);
    }

    async function getMotivation() {
        if (busy) {
            return;
        }
        setBusy(true);
        try {
            const response = await fetch(generate(goal).url, {
                method: 'POST',
                headers: { 'X-CSRF-TOKEN': csrf_token },
            });

            const result = await response.json();

            setMotivation(result.message);
        } catch (error) {
            console.error(error);
        } finally {
            setBusy(false);
        }
    }

    return (
        <div className="flex flex-col border-b py-4">
            <div className="flex flex-row-reverse">
                <Button
                    title="AI motivation"
                    size="icon"
                    variant="ghost"
                    className="cursor-pointer place-self-center text-yellow-300 hover:text-yellow-300 focus:text-yellow-300"
                    disabled={busy || !!motivation}
                    onClick={() => getMotivation()}
                >
                    {<Sparkles className={cn(['size-6', { 'animate-pulse': busy }])} />}
                </Button>
            </div>
            <div className="grid w-full grid-cols-6 items-center pb-2">
                <span className="col-span-6 p-2">{goal.intent}</span>
            </div>
            {(busy || motivation) && <AiMotivation motivation={motivation} busy={busy} />}
            <div className="flex items-center justify-between pt-2 text-xs opacity-50">
                <div className="space-x-2">
                    <GoalStatus goal={goal} />

                    <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer place-self-center hover:text-red-600 focus:text-red-600"
                        onClick={deleteGoal}
                    >
                        <TrashIcon />
                    </Button>
                </div>
                <GoalDate goal={goal} />
            </div>
        </div>
    );
}

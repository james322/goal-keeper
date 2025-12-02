import { useDeleteGoalContext } from '@/hooks/goals/use-delete-goal-context';
import { cn } from '@/lib/utils';
import { generate } from '@/routes/motivation';
import type { GoalType, SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { formatDistanceToNowStrict } from 'date-fns';
import { Sparkles, TrashIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
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

export function Goal({ goal, firstGoal = false }: { goal: GoalType; firstGoal: boolean }) {
    const { setGoalToDelete, setIsOpen: setDeleteGoalIsOpen } = useDeleteGoalContext();
    const [motivation, setMotivation] = useState<string | null>(goal?.motivation?.motivation ?? null);
    const [busy, setBusy] = useState(false);
    const [collapsed, setCollapsed] = useState(true);
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
            setCollapsed(false);
        } catch (error) {
            console.error(error);
        } finally {
            setBusy(false);
        }
    }

    useEffect(() => {
        if (firstGoal && !goal.completed && !busy && !motivation) {
            getMotivation();
        }
    }, []);

    return (
        <div className="group flex flex-col border-b py-4">
            <div className="flex flex-row-reverse">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            title="AI motivation"
                            size="icon"
                            variant="ghost"
                            className={cn([
                                { 'animate-bounce': !motivation && !goal.completed && !busy, 'animate-spin': busy },
                                'cursor-pointer place-self-center text-yellow-500 hover:text-yellow-500 focus:text-yellow-500',
                            ])}
                            disabled={busy || !!motivation || !!goal.completed}
                            onClick={() => getMotivation()}
                        >
                            {<Sparkles className={cn(['size-6', { 'animate-pulse': busy }])} />}
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>AI motivation</TooltipContent>
                </Tooltip>
            </div>
            <div className="grid w-full items-center pb-2">
                <span
                    className={cn([{ 'line-through opacity-50 group-hover:no-underline group-hover:opacity-100': goal.completed }, 'col-span-6 p-2'])}
                >
                    {goal.intent}
                </span>
            </div>
            {(busy || motivation) && <AiMotivation motivation={motivation} busy={busy} collapsed={collapsed} setCollapsed={setCollapsed} />}
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

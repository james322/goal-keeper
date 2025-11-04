import { useDeleteGoalContext } from '@/hooks/goals/use-delete-goal-context';
import { type Goal as GoalType } from '@/types';
import { formatDistanceToNowStrict } from 'date-fns';
import { PencilIcon, TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { GoalStatus } from './goal-status';

export function Goal({ goal }: { goal: GoalType }) {
    const createdDisplay = formatDistanceToNowStrict(goal.created_at);
    const createdTitle = new Date(goal.created_at).toDateString();

    const { setGoalToDelete, setIsOpen: setDeleteGoalIsOpen } = useDeleteGoalContext();

    function deleteGoal() {
        setGoalToDelete(goal);
        setDeleteGoalIsOpen(true);
    }

    return (
        <div className="flex flex-col border-b py-4">
            <div className="grid w-full grid-cols-6 items-center pb-2">
                <span className="col-span-6 p-2">{goal.intent}</span>
            </div>
            <div className="flex items-center justify-between text-xs opacity-50">
                <div className="space-x-2">
                    <GoalStatus goal={goal} />
                    <Button size="icon" variant="ghost" className="cursor-pointer place-self-center hover:text-blue-600 focus:text-blue-600">
                        <PencilIcon />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="cursor-pointer place-self-center hover:text-red-600 focus:text-red-600"
                        onClick={deleteGoal}
                    >
                        <TrashIcon />
                    </Button>
                </div>
                <span title={createdTitle} className="pr-2">
                    Created: {createdDisplay}
                </span>
            </div>
        </div>
    );
}

import { useDeleteGoalContext } from '@/hooks/goals/use-delete-goal-context';
import { GoalType } from '@/types';
import { TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';

export function DeleteGoalButton({ goal }: { goal: GoalType }) {
    const { deleteGoal } = useDeleteGoalContext();
    return (
        <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer place-self-center hover:text-red-600 focus:text-red-600"
            onClick={() => deleteGoal(goal)}
        >
            <TrashIcon />
        </Button>
    );
}

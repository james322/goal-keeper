import { useGetMotivation } from '@/hooks/goals/use-get-motivation';
import { cn } from '@/lib/utils';
import { show } from '@/routes/goals';
import type { GoalType } from '@/types';
import { Link } from '@inertiajs/react';
import { useEffect } from 'react';
import { AiMotivation } from './ai-motivation';
import { DeleteGoalButton } from './delete-goal-button';
import { GenerateAiMotivation } from './generate-ai-motivation';
import { GoalDate } from './goal-date';
import { GoalStatus } from './goal-status';
import { ShareDropdown } from './ShareDropdown';

export function GoalListItem({ goal, firstGoal = false }: { goal: GoalType; firstGoal: boolean }) {
    const { busy, collapsed, setCollapsed, motivation, getMotivation } = useGetMotivation(goal);

    useEffect(() => {
        if (firstGoal && !goal.completed && !busy && !motivation) {
            getMotivation();
        }
    }, []);

    return (
        <div className="group flex flex-col border-b py-4">
            <div className="flex items-center justify-between">
                {goal.is_public ? <ShareDropdown goal={goal} /> : <span></span>}
                <GenerateAiMotivation motivation={motivation} busy={busy} goal={goal} getMotivation={getMotivation} />
            </div>
            <Link href={show(goal)}>
                <div className="grid w-full items-center pb-2">
                    <span className={cn([{ 'line-through opacity-50 group-hover:no-underline group-hover:opacity-100': goal.completed }, 'p-2'])}>
                        {goal.intent}
                    </span>
                </div>
            </Link>
            {(busy || motivation) && <AiMotivation motivation={motivation} busy={busy} collapsed={collapsed} setCollapsed={setCollapsed} />}
            <div className="flex items-center justify-between pt-2 text-xs opacity-50">
                <div className="space-x-2">
                    <GoalStatus goal={goal} />

                    <DeleteGoalButton goal={goal} />
                </div>
                <GoalDate goal={goal} />
            </div>
        </div>
    );
}

import { AiMotivation } from '@/components/goals/ai-motivation';
import { CommentForm } from '@/components/goals/comment-form';
import { CommentsList } from '@/components/goals/comments-list';
import { DeleteGoalButton } from '@/components/goals/delete-goal-button';
import { GenerateAiMotivation } from '@/components/goals/generate-ai-motivation';
import { GoalDate } from '@/components/goals/goal-date';
import { GoalStatus } from '@/components/goals/goal-status';
import { DeleteGoalProvider } from '@/hooks/goals/use-delete-goal-context';
import { useGetMotivation } from '@/hooks/goals/use-get-motivation';
import AppLayout from '@/layouts/app-layout';
import type { ShowGoalData } from '@/types';
import { Head } from '@inertiajs/react';

export default function Show({ goal, comments, can }: ShowGoalData) {
    const { busy, collapsed, setCollapsed, motivation, getMotivation } = useGetMotivation(goal);

    return (
        <AppLayout>
            <Head title="Goals" />

            <div className="mx-auto flex h-full w-full max-w-xl flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4">
                <DeleteGoalProvider>
                    <h1 className="text-4xl font-bold">Goal {goal?.user && <span>by {goal.user.name}</span>}</h1>
                    <div className="group flex flex-col border-b py-4">
                        <div className="flex flex-row-reverse">
                            {can.update_goal && (
                                <GenerateAiMotivation motivation={motivation} busy={busy} goal={goal} getMotivation={getMotivation} />
                            )}
                        </div>
                        <span className="pb-2 text-2xl">{goal.intent}</span>
                        {(busy || motivation) && (
                            <AiMotivation motivation={motivation} busy={busy} collapsed={collapsed} setCollapsed={setCollapsed} />
                        )}
                        <div className="flex items-center justify-between pt-2 text-xs opacity-50">
                            {can.update_goal && can.delete_goal ? (
                                <div className="space-x-2">
                                    <GoalStatus goal={goal} />

                                    <DeleteGoalButton goal={goal} />
                                </div>
                            ) : (
                                <span> </span>
                            )}
                            <GoalDate goal={goal} />
                        </div>
                    </div>
                </DeleteGoalProvider>
                <h2 className="text-xl">Comments</h2>
                <div>
                    <CommentForm goal={goal} />
                    <div className="pt-10">
                        <CommentsList comments={comments} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}

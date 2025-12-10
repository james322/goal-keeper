import { AiMotivation } from '@/components/goals/ai-motivation';
import { CommentForm } from '@/components/goals/comment-form';
import { CommentsList } from '@/components/goals/comments-list';
import { DeleteGoalButton } from '@/components/goals/delete-goal-button';
import { GenerateAiMotivation } from '@/components/goals/generate-ai-motivation';
import { GoalDate } from '@/components/goals/goal-date';
import { GoalStatus } from '@/components/goals/goal-status';
import { ShareDropdown } from '@/components/goals/ShareDropdown';
import { DeleteGoalProvider } from '@/hooks/goals/use-delete-goal-context';
import { useGetMotivation } from '@/hooks/goals/use-get-motivation';
import AppLayout from '@/layouts/app-layout';
import type { ShowGoalData } from '@/types';
import { Head } from '@inertiajs/react';
import { CircleAlert } from 'lucide-react';

type showProps = Pick<ShowGoalData, 'goal' | 'can'>;

function ShowHeading({ goal, can }: showProps) {
    return (
        <div className="flex items-center space-x-4">
            <h1 className="text-4xl font-bold">Goal {goal?.user && <span>by {goal.user.name}</span>}</h1>
            {goal.is_public && can.update_goal && (
                <span className="flex items-center space-x-1 text-base opacity-60">
                    <CircleAlert className="size-7" /> <span>This goal is public</span>
                </span>
            )}
        </div>
    );
}

function GoalActions({ goal, can }: showProps) {
    return (
        <>
            {can.update_goal && can.delete_goal ? (
                <div className="flex items-center space-x-2">
                    <GoalStatus goal={goal} />
                    <DeleteGoalButton goal={goal} />
                </div>
            ) : (
                <span> </span>
            )}
            <GoalDate goal={goal} />
        </>
    );
}

export default function Show({ goal, comments, can }: ShowGoalData) {
    const { busy, collapsed, setCollapsed, motivation, getMotivation } = useGetMotivation(goal);

    return (
        <AppLayout>
            <Head title="Goals" />

            <div className="mx-auto flex h-full w-full max-w-xl flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4">
                <DeleteGoalProvider>
                    <ShowHeading goal={goal} can={can} />
                    <div className="group flex flex-col border-b py-4">
                        <div className="flex items-center justify-between">
                            {goal.is_public ? <ShareDropdown goal={goal} /> : <span></span>}
                            {can.update_goal && (
                                <GenerateAiMotivation motivation={motivation} busy={busy} goal={goal} getMotivation={getMotivation} />
                            )}
                        </div>
                        <span className="py-2 text-2xl">{goal.intent}</span>
                        {(busy || motivation) && (
                            <AiMotivation motivation={motivation} busy={busy} collapsed={collapsed} setCollapsed={setCollapsed} />
                        )}
                        <div className="flex items-center justify-between pt-2 text-xs opacity-50">
                            <GoalActions goal={goal} can={can} />
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

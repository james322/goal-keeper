import { DeleteGoal } from '@/components/goals/delete-goal';
import { Goal } from '@/components/goals/goal';
import { GoalForm } from '@/components/goals/goal-form';
import { Separator } from '@/components/ui/separator';
import { DeleteGoalContext } from '@/hooks/goals/use-delete-goal-context';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type Goals, type Goal as GoalType } from '@/types';
import { Head, InfiniteScroll } from '@inertiajs/react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ goals }: { goals: Goals }) {
    const [goalToDelete, setGoalToDelete] = useState<GoalType | undefined>(undefined);
    const [isDeleteGoalOpen, setIsDeleteGoalOpen] = useState(false);
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="mx-auto flex h-full w-full max-w-xl flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4">
                <div className="text-2xl">
                    <GoalForm />
                </div>
                <div className="flex flex-1 flex-col pt-4">
                    <h3 className="py-2 text-2xl">Goals</h3>
                    <Separator />
                    <DeleteGoalContext value={{ goalToDelete, setGoalToDelete, isOpen: isDeleteGoalOpen, setIsOpen: setIsDeleteGoalOpen }}>
                        <InfiniteScroll data="goals" preserveUrl>
                            {goals.data.map((goal) => (
                                <Goal key={goal.id} goal={goal} />
                            ))}
                        </InfiniteScroll>
                        <DeleteGoal />
                    </DeleteGoalContext>
                </div>
            </div>
        </AppLayout>
    );
}

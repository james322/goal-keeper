import { DeleteGoal } from '@/components/goals/delete-goal';
import { GoalFilter } from '@/components/goals/goal-filter';
import { GoalForm } from '@/components/goals/goal-form';
import { GoalList } from '@/components/goals/goal-list';
import { Separator } from '@/components/ui/separator';
import { DeleteGoalContext } from '@/hooks/goals/use-delete-goal-context';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem, type Goals, type Goal as GoalType } from '@/types';
import { Head } from '@inertiajs/react';
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
            <Head title="Goals" />
            <div className="mx-auto flex h-full w-full max-w-xl flex-1 flex-col gap-4 overflow-x-auto rounded-xl py-4">
                <div className="text-2xl">
                    <GoalForm />
                </div>
                <div className="pt-4">
                    <div>
                        <h3 className="py-2 text-2xl">Goals</h3>
                        <div className="flex space-x-4">
                            <GoalFilter />
                        </div>
                    </div>
                    <Separator className="mt-2" />
                    <DeleteGoalContext value={{ goalToDelete, setGoalToDelete, isOpen: isDeleteGoalOpen, setIsOpen: setIsDeleteGoalOpen }}>
                        {goals.data.length ? <GoalList goals={goals} /> : <p className="py-4 text-center">No goals found</p>}
                        <DeleteGoal />
                    </DeleteGoalContext>
                </div>
            </div>
        </AppLayout>
    );
}

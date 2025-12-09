import { DeleteGoal } from '@/components/goals/delete-goal';
import { GoalFilter } from '@/components/goals/goal-filter';
import { GoalForm } from '@/components/goals/goal-form';
import { GoalList } from '@/components/goals/goal-list';
import { Separator } from '@/components/ui/separator';
import { DeleteGoalProvider } from '@/hooks/goals/use-delete-goal-context';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import type { BreadcrumbItem, GoalsType } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ goals }: { goals: GoalsType }) {
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
                    <DeleteGoalProvider>
                        {goals.data.length ? <GoalList goals={goals} /> : <p className="py-4 text-center">No goals found</p>}
                        <DeleteGoal />
                    </DeleteGoalProvider>
                </div>
            </div>
        </AppLayout>
    );
}

import { GoalForm } from '@/components/goals/goal-form';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { Goals, type BreadcrumbItem } from '@/types';
import { Head, InfiniteScroll } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

export default function Dashboard({ goals }: { goals: Goals }) {
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
                    <InfiniteScroll data="goals" preserveUrl>
                        {goals.data.map((goal) => (
                            <div className="flex flex-col border-b py-4" key={goal.id}>
                                <span>{goal.intent}</span>
                            </div>
                        ))}
                    </InfiniteScroll>
                </div>
            </div>
        </AppLayout>
    );
}

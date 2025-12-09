import type { GoalsType, SharedData } from '@/types';
import { InfiniteScroll, usePage } from '@inertiajs/react';
import { Button } from '../ui/button';
import { GoalListItem } from './goal-list-item';

function LoadMoreButton({ fetch, hasMore }: { fetch: () => void; hasMore: boolean }) {
    return hasMore ? (
        <Button className="mt-2" variant="ghost" size="lg" onClick={fetch}>
            Load More
        </Button>
    ) : null;
}

export function GoalList({ goals }: { goals: GoalsType }) {
    const firstGoal = usePage<SharedData>().props?.flash?.first_goal;

    return (
        <div className="flex flex-col items-center">
            <InfiniteScroll
                as="ul"
                className="w-full"
                data="goals"
                preserveUrl
                onlyNext
                manual
                next={({ fetch, hasMore }) => <LoadMoreButton hasMore={hasMore} fetch={fetch} />}
            >
                {goals.data.map((goal, index) => (
                    <li key={goal.id}>
                        <GoalListItem goal={goal} firstGoal={firstGoal == 1 && index == 0} />
                    </li>
                ))}
            </InfiniteScroll>
        </div>
    );
}

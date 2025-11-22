import { Goals as GoalsType } from '@/types';
import { InfiniteScroll } from '@inertiajs/react';
import { Button } from '../ui/button';
import { Goal } from './goal';

function LoadMoreButton({ fetch, hasMore }: { fetch: () => void; hasMore: boolean }) {
    return hasMore ? (
        <Button className="mt-2" variant="ghost" size="lg" onClick={fetch}>
            Load More
        </Button>
    ) : null;
}

export function GoalList({ goals }: { goals: GoalsType }) {
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
                {goals.data.map((goal) => (
                    <li key={goal.id}>
                        <Goal goal={goal} />
                    </li>
                ))}
            </InfiniteScroll>
        </div>
    );
}

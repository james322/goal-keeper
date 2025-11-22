import { dashboard } from '@/routes';
import { Link } from '@inertiajs/react';

export function GoalFilter() {
    let activeUrl: string | null;

    switch (new URLSearchParams(location.search).get('filter')) {
        case 'completed':
            activeUrl = 'completed';
            break;
        case 'incomplete':
            activeUrl = 'incomplete';
            break;
        default:
            activeUrl = 'all';
            break;
    }
    return (
        <>
            <Link href={dashboard()} className={activeUrl === 'all' ? 'font-bold' : 'opacity-50'}>
                All
            </Link>
            <Link href={dashboard({ query: { filter: 'completed' } })} className={activeUrl === 'completed' ? 'font-bold' : 'opacity-50'}>
                Completed
            </Link>
            <Link href={dashboard({ query: { filter: 'incomplete' } })} className={activeUrl === 'incomplete' ? 'font-bold' : 'opacity-50'}>
                Incomplete
            </Link>
        </>
    );
}

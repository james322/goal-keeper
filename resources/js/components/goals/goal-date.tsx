import { GoalType } from '@/types';
import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict';

export function GoalDate({ goal }: { goal: GoalType }) {
    let title = '';
    let displayDate = '';

    if (goal.completed !== null) {
        title = new Date(goal.completed ?? new Date()).toDateString();
        displayDate = goal.completed !== null ? `Completed: ${formatDistanceToNowStrict(goal.completed)} ago` : '';
    } else if (goal.created_at !== goal.updated_at) {
        title = new Date(goal.updated_at).toDateString();
        displayDate = `Updated: ${formatDistanceToNowStrict(goal.updated_at)} ago`;
    } else {
        title = new Date(goal.created_at).toDateString();
        displayDate = `Created: ${formatDistanceToNowStrict(goal.created_at)} ago`;
    }
    return (
        <span title={title} className="pr-2">
            {displayDate}
        </span>
    );
}

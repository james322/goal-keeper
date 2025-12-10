import { CommentType, ShowGoalData } from '@/types';
import { usePage } from '@inertiajs/react';
import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict';
import { DeleteCommentButton } from './delete-comment-button';

export function CommentsListItem({ comment }: { comment: CommentType }) {
    const { auth, goal } = usePage<ShowGoalData>().props;
    const canDeleteComment = auth.user?.id === comment.user_id || auth.user?.id === goal.user_id;
    return (
        <li className="border-b py-4">
            <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between opacity-60">
                    <span className="text-sm">{comment?.user?.name ? comment.user.name : 'Anonymous'}</span>
                    <span className="text-xs">{formatDistanceToNowStrict(comment.created_at)} ago</span>
                </div>
                <span>{comment.body}</span>
                {canDeleteComment && (
                    <span className="flex flex-row-reverse">
                        <DeleteCommentButton comment={comment} />
                    </span>
                )}
            </div>
        </li>
    );
}

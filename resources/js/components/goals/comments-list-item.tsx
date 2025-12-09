import { CommentType } from '@/types';
import { formatDistanceToNowStrict } from 'date-fns/formatDistanceToNowStrict';

export function CommentsListItem({ comment }: { comment: CommentType }) {
    return (
        <li className="border-b py-4">
            <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between opacity-60">
                    <span className="text-sm">{comment?.user?.name ? comment.user.name : 'Anonymous'}</span>
                    <span className="text-xs">{formatDistanceToNowStrict(comment.created_at)} ago</span>
                </div>
                <span>{comment.body}</span>
            </div>
        </li>
    );
}

import { CommentsType } from '@/types';
import { InfiniteScroll } from '@inertiajs/react';
import { CommentsListItem } from './comments-list-item';

export function CommentsList({ comments }: { comments: CommentsType }) {
    return (
        <InfiniteScroll as="ul" data="comments">
            {comments.data.map((comment) => {
                return <CommentsListItem key={comment.id} comment={comment} />;
            })}
        </InfiniteScroll>
    );
}

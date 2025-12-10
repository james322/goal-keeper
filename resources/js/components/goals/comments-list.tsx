import { DeleteCommentProvider } from '@/hooks/comments/use-delete-comment-context';
import { CommentsType } from '@/types';
import { InfiniteScroll } from '@inertiajs/react';
import { CommentsListItem } from './comments-list-item';
import { DeleteComment } from './delete-comment';

export function CommentsList({ comments }: { comments: CommentsType }) {
    return (
        <DeleteCommentProvider>
            <InfiniteScroll as="ul" data="comments">
                {comments.data.map((comment) => {
                    return <CommentsListItem key={comment.id} comment={comment} />;
                })}
            </InfiniteScroll>
            <DeleteComment />
        </DeleteCommentProvider>
    );
}

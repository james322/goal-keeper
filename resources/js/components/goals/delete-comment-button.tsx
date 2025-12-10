import { useDeleteCommentContext } from '@/hooks/comments/use-delete-comment-context';
import { CommentType } from '@/types';
import { TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';

export function DeleteCommentButton({ comment }: { comment: CommentType }) {
    const { deleteComment } = useDeleteCommentContext();
    return (
        <Button
            size="icon"
            variant="ghost"
            className="cursor-pointer place-self-center hover:text-red-600 focus:text-red-600"
            onClick={() => deleteComment(comment)}
        >
            <TrashIcon />
        </Button>
    );
}
